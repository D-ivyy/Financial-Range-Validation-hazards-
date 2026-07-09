"""
Range-Validation review dashboard — backend.

Read-only viewer over the hazard x asset loss-reference package. It scans the
repository one level up from this file at REQUEST time and serves the package's
own artifact files (CSV / JSON) as parsed JSON. It never hardcodes, duplicates,
or recomputes any package number. Blank CSV cells are preserved as null.

This package is a source-pathway / normalization layer, NOT a calibration
harness. This backend introduces no pass/fail bands and tunes nothing.
"""

from __future__ import annotations

import csv
import io
import json
import re
from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

# Repo root = one level up from dashboard/
REPO_ROOT = Path(__file__).resolve().parent.parent
PAIRS_DIR = REPO_ROOT / "01_pairs"
STATIC_DIR = Path(__file__).resolve().parent / "static"

app = FastAPI(title="Range-Validation Review Dashboard", version="0.3.1")

DISCLAIMER = (
    "This package is a source-pathway / normalization layer, NOT a calibration "
    "harness. Ranges, denominators, grain, and comparability verdicts are "
    "visualized as-is. No pass/fail bands, no tuning, no 'validated = correct' "
    "semantics."
)

RELATED_REPOS = {
    "damage_modeling": "https://github.com/aamani-ai/Damage_Modeling",
    "hazard_modeling": "https://github.com/aamani-ai/Hazard_Modeling",
    "this_package": "https://github.com/D-ivyy/Financial-Range-Validation-hazards-",
}


# ---------------------------------------------------------------------------
# File helpers — everything is read fresh on each request (live reflection).
# ---------------------------------------------------------------------------
def _read_csv(path: Path) -> dict[str, Any]:
    """Parse a CSV into {columns, rows}. Blank cells become None (never 0)."""
    with path.open(newline="", encoding="utf-8-sig") as fh:
        reader = csv.reader(fh)
        try:
            header = next(reader)
        except StopIteration:
            return {"columns": [], "rows": []}
        columns = [c.strip() for c in header]
        rows: list[dict[str, Any]] = []
        for raw in reader:
            if not any(cell.strip() for cell in raw):
                continue  # skip fully-empty lines
            row: dict[str, Any] = {}
            for i, col in enumerate(columns):
                val = raw[i].strip() if i < len(raw) else ""
                row[col] = None if val == "" else val
            rows.append(row)
    return {"columns": columns, "rows": rows}


def _read_json(path: Path) -> Any:
    with path.open(encoding="utf-8") as fh:
        return json.load(fh)


def _safe_pair(pair: str) -> str:
    """Prevent path traversal; only allow discovered pair directory names."""
    if not re.fullmatch(r"[A-Za-z0-9_\-]+", pair or ""):
        raise HTTPException(status_code=400, detail="invalid pair name")
    if not (PAIRS_DIR / pair).is_dir():
        raise HTTPException(status_code=404, detail=f"pair not found: {pair}")
    return pair


def _pair_file(pair: str, *candidates: str) -> Path | None:
    """Return the first existing file among candidate names / glob patterns."""
    base = PAIRS_DIR / pair
    for name in candidates:
        if "*" in name:
            matches = sorted(base.glob(name))
            if matches:
                return matches[0]
        else:
            p = base / name
            if p.exists():
                return p
    return None


def _value_basis_path(pair: str) -> Path | None:
    return _pair_file(pair, "value_basis_from_damage_modeling*.json")


def _list_pairs() -> list[str]:
    if not PAIRS_DIR.is_dir():
        return []
    return sorted(p.name for p in PAIRS_DIR.iterdir() if p.is_dir())


# ---------------------------------------------------------------------------
# API
# ---------------------------------------------------------------------------
@app.get("/api/meta")
def meta() -> dict[str, Any]:
    version = None
    changelog_highlights: list[str] = []
    changelog = REPO_ROOT / "CHANGELOG.md"
    if changelog.exists():
        text = changelog.read_text(encoding="utf-8")
        for line in text.splitlines():
            m = re.match(r"^##\s+(v[\d.]+)", line.strip())
            if m:
                if version is None:
                    version = m.group(1)
                changelog_highlights.append(line.strip().lstrip("# ").strip())
            if len(changelog_highlights) >= 6:
                break
    return {
        "package": "Financial-Range-Validation-hazards-",
        "version": version,
        "disclaimer": DISCLAIMER,
        "related_repos": RELATED_REPOS,
        "changelog_highlights": changelog_highlights,
        "pairs": _list_pairs(),
    }


@app.get("/api/pairs")
def pairs() -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    for pair in _list_pairs():
        status = None
        summary = None
        vb_path = _value_basis_path(pair)
        if vb_path:
            try:
                vb = _read_json(vb_path)
                status = vb.get("status")
                summary = (
                    vb.get("correction_note")
                    or vb.get("important_rule")
                )
            except Exception:
                summary = None
        # count benchmark + source rows for the card without shipping numbers
        bm = _pair_file(pair, "benchmark_number_matrix.csv")
        n_benchmarks = len(_read_csv(bm)["rows"]) if bm else 0
        sm = _pair_file(pair, "source_matrix.csv")
        n_sources = len(_read_csv(sm)["rows"]) if sm else 0
        out.append(
            {
                "pair": pair,
                "status": status,
                "summary": summary,
                "n_benchmarks": n_benchmarks,
                "n_sources": n_sources,
            }
        )
    return out


@app.get("/api/pairs/{pair}/benchmarks")
def benchmarks(pair: str) -> dict[str, Any]:
    pair = _safe_pair(pair)
    path = _pair_file(pair, "benchmark_number_matrix.csv")
    if not path:
        raise HTTPException(status_code=404, detail="benchmark_number_matrix.csv not found")
    return _read_csv(path)


@app.get("/api/pairs/{pair}/sources")
def sources(pair: str) -> Any:
    pair = _safe_pair(pair)
    # Prefer machine-readable JSON registry; fall back to a data/ CSV copy.
    jpath = _pair_file(pair, "source_registry.json")
    if jpath:
        return {"format": "json", "rows": _read_json(jpath)}
    cpath = REPO_ROOT / "data" / f"source_registry_{pair}.csv"
    if cpath.exists():
        parsed = _read_csv(cpath)
        return {"format": "csv", **parsed}
    raise HTTPException(status_code=404, detail="source_registry not found")


@app.get("/api/pairs/{pair}/coverage")
def coverage(pair: str) -> dict[str, Any]:
    pair = _safe_pair(pair)
    path = _pair_file(pair, "source_matrix.csv")
    if not path:
        raise HTTPException(status_code=404, detail="source_matrix.csv not found")
    return _read_csv(path)


@app.get("/api/pairs/{pair}/crosswalk")
def crosswalk(pair: str) -> dict[str, Any]:
    pair = _safe_pair(pair)
    path = _pair_file(pair, "benchmark_value_damage_crosswalk.csv")
    if not path:
        raise HTTPException(status_code=404, detail="crosswalk csv not found")
    return _read_csv(path)


@app.get("/api/pairs/{pair}/curve")
def curve(pair: str) -> dict[str, Any]:
    pair = _safe_pair(pair)
    path = _pair_file(pair, "damage_curve_intensity_reference.csv")
    if not path:
        raise HTTPException(status_code=404, detail="damage curve csv not found")
    parsed = _read_csv(path)
    columns = parsed["columns"]
    if not columns:
        return {"x_field": None, "x": [], "series": {}, "columns": [], "rows": []}
    x_field = columns[0]
    series_fields = columns[1:]
    x_vals = [
        _to_num(r.get(x_field)) for r in parsed["rows"]
    ]
    series = {
        f: [_to_num(r.get(f)) for r in parsed["rows"]] for f in series_fields
    }
    return {
        "x_field": x_field,
        "x": x_vals,
        "series": series,
        "columns": columns,
        "rows": parsed["rows"],
    }


@app.get("/api/pairs/{pair}/value_basis")
def value_basis(pair: str) -> Any:
    pair = _safe_pair(pair)
    path = _value_basis_path(pair)
    if not path:
        raise HTTPException(status_code=404, detail="value_basis json not found")
    return _read_json(path)


def _to_num(v: Any) -> float | None:
    if v is None:
        return None
    try:
        return float(v)
    except (TypeError, ValueError):
        return None


# ---------------------------------------------------------------------------
# Static frontend
# ---------------------------------------------------------------------------
@app.get("/")
def index() -> FileResponse:
    return FileResponse(STATIC_DIR / "index.html")


app.mount("/", StaticFiles(directory=str(STATIC_DIR), html=True), name="static")
