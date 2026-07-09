# Build Workflow — New Hazard × Asset Dossier

This is the operational playbook for producing a new pair. Read `template_contract.md` first for the exact file/column/JSON specs; this file tells you *how to execute* each step. It mirrors the reconstructed build workflow that produced `solar_hail`.

Throughout, `<pair>` = `<asset>_<hazard>` lowercase slug (e.g. `solar_flood`), `<Asset>` / `<Hazard>` = display forms (e.g. "Solar × flood").

---

## Step 0 — Setup & orientation

1. Confirm you are in the `Financial-Range-Validation-hazards` repo (disable sparse-checkout if folders look missing: `git sparse-checkout disable`).
2. Read the live `solar_hail` files as your worked example: `01_pairs/solar_hail/README.md`, its CSVs/JSON, `02_crosswalks/solar_hail_value_damage_crosswalk.md`, `00_anchor/…md`, and the `99_metadata/` set.
3. Determine the next `v0.X` version number from `CHANGELOG.md`.
4. Set today's date as `Last researched` / `Created`.

## Step 1 — Anchor is peril-agnostic; reuse it

- Do **not** rewrite `00_anchor/renewable_loss_reference_source_pathways.md` wholesale. It is the shared backbone. You only:
  - Update the `## 3` coverage grid status for this cell.
  - Fill in / expand the `## 5.x` hazard-specific note for the pair (status line, "Source types that have numbers" table, "Best immediate extraction targets" and "Gaps to close" fenced blocks).
- Update the root `README.md` "Current deep-dive status" table row for `<pair>` from planned → built, with a one-line reason.

## Step 2 — Adapt the asset value basis (see "Per-asset constants" below)

Before extracting numbers you need the asset's default value bases so `%TIV` normalization is meaningful. For **solar** these are known (Appendix A of `template_contract.md`). For a **new asset** (e.g. onshore wind), you must establish new `$/MW` value buckets — see the per-asset section at the end of this file. If the internal value workbook is not available, use a clearly-labeled `provisional` basis and flag it.

## Step 3 — Deep source research (the heavy lift)

This is where the real work is, and it must be **exhaustive** (see the Depth Mandate in SKILL.md). Enumerate candidate sources **by class**, following the anchor's source hierarchy. Parallelize with research subagents — one per class — and have each write findings to a workspace file so you can assemble them.

**Depth bar for this step:** aim to catalogue **at least as many sources and benchmark numbers as `solar_hail`** (~15 sources, ~20+ benchmark rows), and more where the hazard has richer public data. Each research subagent must: run multiple queries, follow citations, **open and read the actual primary documents/PDFs** (not just snippets), extract verbatim numbers with units, and record dated URLs. A class that returns only 1–2 sources should be pushed harder before you accept it. Gated sources are documented as pathways, never skipped.

**Source classes to cover (in priority order):**

| Tier | Class | What to look for | Typical examples (generalize per hazard) |
|---|---|---|---|
| R1 | Renewable insurer/broker claims publications | claim share, claim severity `$/MW`, BI/downtime | kWh Analytics, AXIS, GCube/TMHCC, Marsh, Gallagher Re, J.S. Held |
| R2 | Engineered PML/AAL & cat-model products | modeled AAL, OEP/AEP PML, return-period loss | VDE, Cirrus, Renew Risk, Moody's RMS, Verisk/AIR, GRC |
| R3 | Project case studies & named-event losses | single-event $ losses, resilience deltas | POWER Magazine cases, named-storm/flood case write-ups |
| R4 | Engineering / reliability / forensic | damage mechanism, thresholds (mechanism-only) | DOE/FEMP, RETC/PVEL, national labs, forensic adjusters |
| R5 | Generic public loss/hazard (downgraded → secondary) | context only, never primary | NOAA Storm Events, SHELDUS, **NFIP (key for flood)**, FEMA NRI |
| — | Exposure / denominator | asset counts, MW, TIV denominators | USPVDB, USWTDB, EIA-860 |

**Per-hazard hints:**
- **Flood:** NFIP claims data and FEMA flood maps become *primary-adjacent* denominators; depth-damage functions (FEMA/USACE HAZUS) are the R4 mechanism backbone; look for solar-site inundation case studies and reinsurer flood cat reports.
- **Strong / convective wind:** racking & tracker uplift failures, IBHS/ASCE wind pressure studies, tornado/derecho case losses; separate straight-line wind from tornado/hurricane cells.
- **Wildfire:** direct flame vs smoke-soiling loss distinction is critical; look for utility/WUI loss data, module soiling studies, and parametric wildfire triggers (Descartes-style).

**For each candidate source, capture:** exact name, source_type, URL, retrieval date (ISO), any open numbers (verbatim, with units), what is gated, and the tags. Do NOT fabricate — gated is fine, mark it.

**Research subagent pattern:** spawn `subagent_type="research"` (or a wide-search fanout) per class with a brief telling it to return sourced numbers with URLs and a per-source has/does-not-have split, writing to `/home/user/workspace/<pair>_sources_<class>.md`. Preload this skill so they honor the frame discipline.

## Step 4 — Classify sources & emit registry + bibliography

For every source, assign:
- exactly one **availability tag** (`HAS_OPEN_NUMBERS` / `HAS_GATED_NUMBERS` / `HAS_PATHWAY_ONLY` / `NO_DIRECT_RENEWABLE_NUMBERS_FOUND` / `GENERIC_ONLY`),
- ≥1 **metric-type tag**, ≥1 **evidence-use tag**, and any **coverage-caveat tags** (see `template_contract.md` §5).

Assign a descriptive uppercase `source_id` (join key), e.g. `NFIP_SOLAR_FLOOD_CLAIMS_2025`, `VDE_FLOOD_RISK_INTELLIGENCE`.

Emit `source_registry.json` (array of source objects; the pair-use key is `<pair>_use`), plus `data/source_registry_<pair>.{csv,json}`, and the prose `bibliography.md` (one section per source ID: Name / Type / Availability / URL / Retrieved / Has / Does not have / Notes).

## Step 5 — Source coverage matrix

`source_matrix.csv`: first columns `source_id, availability_tag, primary_use`, then one `Y`/blank column per metric/attribute. Reuse the anchor metric columns and **add pair-specific attribute columns** the hazard needs (solar_hail used `MITIGATION_STATE, STOW_PERFORMANCE, MODULE_TYPE, GATED_ACTUAL_VALUES`; flood might use `FLOOD_DEPTH, INUNDATION_DURATION, FIRST_FLOOR_ELEV, DRAINAGE_DESIGN`).

## Step 6 — Benchmark-number matrix

`benchmark_number_matrix.csv` (+ JSON), 15 columns exactly as in `template_contract.md` §3.1. One row per datum:
- `benchmark_id`, `source_id` (FK), `label`, `metric_family`, verbatim `reported_value` + `reported_unit`.
- `normalized_usd_per_MW` only when a valid conversion exists; `pct_installed_TIV_default_*` = normalized / installed-TIV × 100; `pct_physical_replaceable_default_*` similarly. **Blank when not applicable.**
- `source_denominator_or_scope`, `source_pct_TIV_or_asset_value`, `basis_confidence`, `source_status`, `useful_for`, `caveats`.
- Add derived-sensitivity rows when the capacity denominator is unknown (the GCube `100/200/350 MW` pattern).

## Step 7 — Dossier narrative

`01_pairs/<pair>/README.md`, section order identical to `solar_hail` (`template_contract.md` §2.3): `## 0 Bottom line` → `## 1 Normalization basis` (`### 1.1` crosswalk intro) → `## 2 Quick benchmark-number matrix` (`### 2.1` severity anchor-plot, `### 2.2` AAL anchor-plot) → `## 3 Source coverage matrix` → `## 4 Source pathways in detail` → `## 5 Data request templates` → `## 6 Retrieval priority` → `## 7 Files in this pair folder`. Keep the Has/Does-not-have rhythm and fenced caveats.

## Step 8 — Value/damage crosswalk

This step needs internal artifacts (the value workbook + the pair's damage-curve artifact). Two cases:

**A. Artifacts available:** extract the value ladder ($/MW buckets), failure-unit grain, and intensity→DR table into `value_basis_from_damage_modeling_*.json`; recast the $/MW-normalizable benchmarks onto buckets in `benchmark_value_damage_crosswalk.csv/json` with a `direct_damage_grain_comparability` verdict per row (`template_contract.md` §7 for the verdict vocabulary and mapping procedure); emit `damage_curve_intensity_reference.csv/json` for the hazard axis (flood → `flood_depth_m`; wind → `wind_speed_ms`); write `02_crosswalks/<pair>_value_damage_crosswalk.md` (sections `## 0` The rule → `## 7` Machine-readable files) and add the pair row to `02_crosswalks/README.md`.

**B. Artifacts NOT yet available:** do NOT invent value buckets or DR curves. Create the crosswalk MD with a clearly-marked `Status: PENDING_UPSTREAM_ARTIFACTS` front-matter, document the value ladder and failure-unit grain you *expect* (with placeholders labeled provisional), and list exactly which upstream artifacts are needed. Still emit the `%TIV` normalization in the benchmark matrix using the best available asset value basis. Note the gap in `HANDOFF_SUMMARY.md`.

**Invariant:** a `$/MW` above the failure-unit hardware cap is a grain warning, never evidence DR > 1. The crosswalk classifies comparability; it never tunes a curve.

## Step 9 — Flat data copies

Copy every machine-readable artifact into `data/`, pair-name-prefixed, in **both** CSV and JSON, byte-consistent with the pair-folder copies.

## Step 10 — Metadata & validation

- `manifest.md`: Files table (Path | Role) for every file, value-basis block, validation-scope disclaimer, `## vX.Y added files` list.
- `validation_vX_Y.json`: `package`, `created`, `checks{ … , crosswalk_rows, intensity_reference_rows, required_files_exist, key_numbers{…}}`. **Row counts must equal the actual CSV row counts** — compute them, don't guess.
- `VALIDATION_REPORT_vX_Y.md`: PASS checklist + "Key extracted values" table.
- `HANDOFF_SUMMARY.md`: highest-value open numbers table + main gap + output files + any PENDING crosswalk note.
- `CHANGELOG.md`: new `## vX.Y — <title>` entry, `Created: YYYY-MM-DD`, prose of what was added, and the explicit non-scope disclaimer ("does not change benchmark numbers; does not define calibration pass/fail rules").

## Step 11 — Self-check before finishing

- [ ] Every number has a real, dated source URL. No fabricated values.
- [ ] Metric families never mixed on one axis.
- [ ] Blanks (not zeros) where normalization doesn't apply.
- [ ] Every file has the front-matter block + epistemic-honesty disclaimer.
- [ ] CSV row counts match `validation_*.json`.
- [ ] `data/` copies present in CSV **and** JSON, pair-prefixed.
- [ ] Version bumped; CHANGELOG entry with non-scope disclaimer.
- [ ] Anchor coverage grid + root status table updated.

---

## Per-asset constants — adapting beyond solar

The `solar_hail` value ladder (Appendix A of `template_contract.md`) is **solar-specific**. Reuse it verbatim only for `solar_*` pairs. The value basis depends on **asset**, the failure-unit and intensity axis depend on **hazard**:

- **Same asset, new hazard (e.g. `solar_flood`, `solar_strong_wind`, `solar_wildfire`):** reuse the solar `$/MW` value ladder (installed TIV `$1,120,000/MWdc`, physical `$877,796/MWdc`, PV_ARRAY hardware `$291,215/MWdc` = 26%, +fieldwork `$398,084/MWdc` = 35.54%). Only the **failure unit** and **hazard axis** change:
  - flood → failure unit likely `INVERTER_SYSTEM` / `ELECTRICAL_COLLECTION` / foundation scour (water damages electronics/BOS more than glass); hazard axis `flood_depth_m` (+ `inundation_duration_hr`).
  - wind → `MOUNTING` (tracker/racking uplift) + module detachment; hazard axis `wind_speed_ms` / 3-s gust.
  - wildfire → module `soiling`/encapsulant + wiring; distinguish direct flame vs smoke-soiling; hazard axis intensity/burn-probability.
- **New asset (e.g. `wind_*`):** you must build a **new value ladder** from the wind value workbook (turbine, tower, foundation, BOP), with its own `$/MW` denominators and failure units. Do not reuse solar numbers. Mark provisional if the workbook is unavailable.

Whenever you change constants, record the source of the value basis in `value_basis_from_damage_modeling_*.json` and the manifest, and label anything provisional.
