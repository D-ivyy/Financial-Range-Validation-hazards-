---
name: hazard-loss-reference-dossier
description: "Build a deep-research financial loss reference dossier for a new hazard x asset pair (e.g. solar x flood, solar x wind, solar x wildfire, wind x hurricane) that mirrors the existing solar x hail dossier in the Financial-Range-Validation-hazards repo exactly. Use when the user wants to research and produce a new hazard-asset pair: source-pathway registry, benchmark-number matrix, source coverage matrix, machine-readable source registry, value/damage crosswalk, metadata/manifest/validation, and CHANGELOG. Produces a source-pathway + normalization dossier, NOT a calibration harness. Load whenever the task mentions a new hazard x asset pair, range validation, benchmark loss numbers, AAL/PML/TIV benchmarks, or extending the range-validation-hazard-modeling package."
license: MIT
metadata:
  author: divykumar-patel
  version: '1.0'
  template_source: "solar_hail dossier, Range Validation Hazard Modeling v0.2"
---

# Hazard × Asset Loss Reference Dossier

Build a new **hazard × asset** financial-loss reference dossier that mirrors the gold-standard `solar_hail` dossier in the `Financial-Range-Validation-hazards` repo, so a separate catastrophe damage model can later be sanity-checked against credible **ranges** of real-world benchmark numbers.

## When to Use This Skill

Use this skill when the user wants to:

- Research and produce a **new hazard × asset pair** (e.g. `solar_flood`, `solar_strong_wind`, `solar_wildfire`, `wind_hurricane`, offshore-wind pairs).
- Extend the `range-validation-hazard-modeling` package with a new pair's evidence tables, source registry, and crosswalk.
- Produce a source-pathway registry, benchmark-number matrix, coverage matrix, value/damage crosswalk, or the metadata/validation set for a pair.

**Scope boundary (load-bearing):** the output is a **source-pathway registry + normalization/crosswalk layer**, NEVER a calibration harness. It never defines pass/fail bands, never tunes a damage curve, and never treats a raw number as a benchmark until its frame is understood. Every file must restate this.

## Depth Mandate (non-negotiable)

This skill produces **deep, exhaustive research dossiers** on the level of the `solar_hail` gold standard (dozens of catalogued sources, a full benchmark-number matrix, a complete coverage matrix, a machine-readable registry, a prose bibliography, and a value/damage crosswalk). It is **NOT** a quick-lookup task.

- **Never** deliver a shallow or "10-minute" version. A thin pass with a handful of sources is a failed run.
- **Exhaustively enumerate sources across every class** (R1 renewable claims → R2 engineered PML/AAL & cat-models → R3 case studies/forensic → R4 engineering/mechanism → R5 generic downgraded → exposure/denominator). Do not stop at the first few open numbers.
- **Actively hunt and extract**: run broad web research, follow citations, open primary documents (insurer/broker reports, cat-model product pages, government/engineering PDFs, exposure databases), and pull the actual numbers with units and dated URLs. Fetch and read real pages/PDFs — do not rely on search snippets alone.
- **Match or exceed the `solar_hail` depth.** Aim for at least as many catalogued sources and benchmark rows as the reference pair, and go deeper where the hazard has richer public data.
- **Parallelize** the research with one subagent per source class (see `references/workflow.md` step 3) so breadth and depth are both covered; assemble their findings before writing artifacts.
- Treat gated/paywalled sources as **pathways to document**, not reasons to skip — capture the owner, access route, and exactly what to request.

If time or tokens are tight, go **narrower in scope (fewer pairs) but never shallower in depth**. Depth is the product.

## The Golden Rule

> A source that has a number is **not** automatically a benchmark. A source becomes a benchmark only after its **denominator, coverage basis, peril coding, asset class, geography, and loss basis** are understood.

If you internalize one thing, internalize this. It drives every tag, every caveat, and every crosswalk verdict.

## Reference Material (read before building)

This skill ships two reference files. **Read them before producing artifacts** — they are the exact replication contract:

1. `references/template_contract.md` — the complete reverse-engineered file/structure contract of the `solar_hail` dossier: full file tree, per-file markdown outlines + house-style boilerplate, verbatim CSV/JSON schemas, the four tag families, the metric-frame concept, the crosswalk value-bucket logic, versioning conventions, and canonical constants. **This is your primary spec.**
2. `references/workflow.md` — the step-by-step research + build workflow (11 steps) plus per-step checklists, plus guidance on adapting solar-specific constants to a new asset class.

Always mirror `solar_hail` structurally. When in doubt about a heading, column, or phrasing, copy the `solar_hail` pattern verbatim and only change pair-specific content.

## High-Level Process

1. **Confirm the pair & repo context.** Identify `<pair>` slug (`<asset>_<hazard>`, lowercase, e.g. `solar_flood`). Confirm you are working inside the `Financial-Range-Validation-hazards` repo. Read the existing `solar_hail` files as live examples.
2. **Instantiate/refresh the anchor.** The anchor (`00_anchor/` + root `README.md` front-matter) is peril-agnostic — reuse it. Add/refresh the pair's row in the root "Current deep-dive status" table and its `## 5.x` hazard-specific note in the anchor.
3. **Deep source research (the heavy lift).** Walk the anchor's source classes (R1 renewable claims → R2 engineered PML/AAL/cat-model → R3 case studies/forensic → R4 engineering/mechanism → R5 generic, downgraded → exposure/denominator). For each candidate source: find it, capture URL + retrieval date, extract any open numbers, and note what is gated. Spawn parallel research subagents by source class; save each class's findings to a workspace file. See `references/workflow.md` step 3.
4. **Classify every source.** Assign availability + metric-type + evidence-use + coverage-caveat tags. Write both `has_open_numbers` and `does_not_have_open`. Produce `source_registry.json` (+ `data/` CSV+JSON copies) and the prose `bibliography.md` (same IDs).
5. **Build the source coverage matrix** (`source_matrix.csv`): sources × metric/attribute columns with `Y` marks. Add pair-specific attribute columns where the hazard demands them (e.g. flood: `FLOOD_DEPTH`, `INUNDATION_DURATION`, `FIRST_FLOOR_ELEV`; wind: `WIND_SPEED`, `RACKING_FAILURE`).
6. **Extract benchmark numbers** into `benchmark_number_matrix.csv` (+ JSON): one row per datum with `metric_family`, exact `reported_value`/`reported_unit`, `source_denominator_or_scope`, `basis_confidence`, `caveats`. Normalize to `$/MW` and `%TIV` against the asset's default value bases **only where valid** — leave blanks (never zeros) otherwise. Add derived-sensitivity rows when a denominator is missing.
7. **Author the dossier narrative** (`01_pairs/<pair>/README.md`) following the `solar_hail` section order: Bottom line → Normalization basis → Quick benchmark matrix + anchor-plots → Source coverage matrix → per-source detail → data-request templates → retrieval priority → files list. Keep the "Has / Does-not-have / data-request" rhythm and fenced caveats.
8. **Build the value/damage crosswalk.** Establish the asset's value ladder ($/MW buckets) and the hazard's failure-unit grain + intensity→DR reference. Recast the $/MW-normalizable benchmarks onto the buckets with a `direct_damage_grain_comparability` verdict. Emit `value_basis_from_damage_modeling_*.json`, `benchmark_value_damage_crosswalk.csv/json`, `damage_curve_intensity_reference.csv/json`, `02_crosswalks/<pair>_value_damage_crosswalk.md`, and update `02_crosswalks/README.md`. If the internal value workbook / damage-curve artifact for the pair is unavailable, mark the crosswalk explicitly as `PENDING_UPSTREAM_ARTIFACTS` rather than inventing numbers — see `references/workflow.md` step 8.
9. **Distribute flat copies** to `data/`, pair-name-prefixed, in both CSV and JSON.
10. **Generate metadata & validation.** Update `manifest.md`, write `validation_vX_Y.json` (checks + row counts + key numbers) and `VALIDATION_REPORT_vX_Y.md`, refresh `HANDOFF_SUMMARY.md`, and add a `CHANGELOG.md` entry with the non-scope disclaimer. Row-count checks in the validation JSON must match the actual CSV row counts.
11. **Version bump.** A new pair or crosswalk is a version bump (`v0.X`), not an in-place edit. Surface the version in every new file's front-matter and in versioned filenames.

## Guardrails (never violate)

- **Never** define calibration pass/fail bands or tune a curve. This is a normalization layer.
- **Never** mix metric families on one axis — event/claim severity ($/MW event anchor) and AAL (annualized) go in separate anchor-plots. Guard the family boundary everywhere.
- **Always** record the full metric frame (family, EP frame OEP/AEP, loss basis gross/net, denominator/value basis, aggregation stance) for every number.
- **Always** treat gated numbers as *pathways*, not benchmarks; capture how to obtain them, not fabricated values.
- **Never** fabricate a number. If a value is not public, leave the cell blank and tag the source `HAS_GATED_NUMBERS` / `HAS_PATHWAY_ONLY`. Every number must carry a real, dated source URL.
- **Blanks, not zeros**, when a normalization/conversion does not apply.
- **A `$/MW` exceeding the failure-unit hardware cap is a grain warning, not evidence that DR > 1.**
- **Never** claim the dossier validates or calibrates anything — it *organizes and normalizes evidence*.

## House Style (replicate exactly)

- Front-matter block on every dossier/crosswalk file: `Version`, `Last researched` (or `Created`), parent-anchor/parent-pair link, and a one-sentence `Purpose` that states what the file IS and IS NOT.
- Repeated epistemic-honesty framing: "source-pathway / normalization layer, NOT a calibration rule."
- Per-source "What this gives us / What it does **not** give us" paired lists.
- Caveats fenced in ` ```text ` blocks, not inline-only.
- Numbers rendered in backticks with units: `` `$150,000 / MW` ``, `` `13.39%` ``.
- ASCII "anchor plots" (captioned "This is an anchor plot, not a distribution") for `%TIV` bands.
- Technical, hedged, actuarial tone (AAL, PML, OEP/AEP, TIV, BI, sublimit, gross/net).

## Output Contract (files to produce for a pair)

```
00_anchor/renewable_loss_reference_source_pathways.md   (update pair note + coverage grid)
README.md                                               (update deep-dive status table)
01_pairs/<pair>/README.md                               (new dossier narrative)
01_pairs/<pair>/benchmark_number_matrix.csv
01_pairs/<pair>/source_matrix.csv
01_pairs/<pair>/source_registry.json
01_pairs/<pair>/benchmark_value_damage_crosswalk.csv    (crosswalk; or PENDING marker)
01_pairs/<pair>/damage_curve_intensity_reference.csv
01_pairs/<pair>/value_basis_from_damage_modeling_*.json
02_crosswalks/<pair>_value_damage_crosswalk.md
02_crosswalks/README.md                                 (add pair row)
data/*_<pair>.csv + .json                               (flat copies, CSV+JSON)
99_metadata/{manifest.md, bibliography.md, validation_vX_Y.json}
VALIDATION_REPORT_vX_Y.md, HANDOFF_SUMMARY.md, CHANGELOG.md   (update)
```

See `references/template_contract.md` for the exact columns/keys of every file and `references/workflow.md` for how to execute each step (including parallel research subagents and per-asset constant adaptation).
