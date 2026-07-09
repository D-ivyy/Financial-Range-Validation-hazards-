# Range-Validation Review Dashboard

A read-only web app for **reviewing and interpretation-checking** the hazard × asset
loss-reference package in this repo. It scans the repository at request time and serves
the package's **own** artifact files (`01_pairs/<pair>/*.csv`, `*.json`) as parsed JSON.

> **Load-bearing epistemic rule.** This package is a **source-pathway / normalization
> layer, NOT a calibration harness.** The dashboard introduces no pass/fail bands, no
> "validated = correct" semantics, and tunes no curve. It visualizes ranges, denominators,
> grain, and comparability verdicts only. A persistent disclaimer appears on every view.

It never hardcodes or duplicates numbers — change a package CSV/JSON and reload, and the
dashboard reflects it. Blank source cells stay blank (never rendered as 0).

## Run (one command)

```bash
cd dashboard
pip install -r requirements.txt
uvicorn main:app --port 8000
```

Then open <http://localhost:8000>.

The backend reads the repo one level up from `dashboard/`, so it must stay inside the repo.

## Pair-aware & generic

Pairs are auto-discovered from `01_pairs/`. Nothing is hardcoded — new pairs
(`solar_strong_wind`, `wind_hurricane`, …) appear automatically, and pair-specific columns
(hail `STOW_PERFORMANCE`/`MODULE_TYPE`; flood `FLOOD_DEPTH`/`DEPTH_DAMAGE_FUNCTION`/…) render
dynamically from each CSV header. The damage-curve x-axis is taken as the first CSV column;
remaining columns each become a DR series.

## Endpoints

| Endpoint | Returns |
|---|---|
| `GET /api/meta` | package version, changelog highlights, related-repo links, disclaimer |
| `GET /api/pairs` | discovered pairs + status + one-line summary + row counts |
| `GET /api/pairs/{pair}/benchmarks` | parsed `benchmark_number_matrix.csv` (`{columns, rows}`) |
| `GET /api/pairs/{pair}/sources` | parsed `source_registry.json` |
| `GET /api/pairs/{pair}/coverage` | parsed `source_matrix.csv` |
| `GET /api/pairs/{pair}/crosswalk` | parsed `benchmark_value_damage_crosswalk.csv` |
| `GET /api/pairs/{pair}/curve` | parsed `damage_curve_intensity_reference.csv` (`{x_field, x, series}`) |
| `GET /api/pairs/{pair}/value_basis` | parsed `value_basis_from_damage_modeling*.json` |

## Views (7 tabs)

1. **Overview** — version, epistemic disclaimer, related-repo links, pairs as status cards.
2. **Coverage matrix** — sources × metric columns; availability_tag colored.
3. **Benchmark explorer** — every benchmark row; sortable/filterable; blanks stay blank; source_id links to its URL.
4. **Value ladder** — $/MWdc buckets bar chart + failure units + `important_rule`/`correction_note`/`comparison_guidance`.
5. **Damage curve** — intensity → DR line chart (engineering-parameterized, not claims-calibrated).
6. **Crosswalk** — dynamic `pct_*` bucket columns + comparability verdict + interpretation; grain warnings as informational chips.
7. **Correctness flags** — derived counts/distributions only (status, blank denominators, grain caveats, basis_confidence). Never labels anything validated/correct.

## Guardrails

- **Read-only** with respect to all package files. It never writes, regenerates, or cleans them.
- No fabricated numbers, no calibration thresholds.
- All dashboard code lives under `dashboard/`.
