# Solar × Hail Dossier — Template / File Contract

> Reverse-engineered reference for building a reusable "hazard × asset renewable loss reference-source dossier" skill.
> Source repo: `Financial-Range-Validation-hazards-` (branch tip `196d9f0`), package **Range Validation Hazard Modeling v0.2**, last researched **2026-06-26**.
> This document is a *replication contract*: it captures the exact file tree, per-file outlines, CSV/JSON schemas, tag vocabularies, metric-frame concept, crosswalk logic, versioning, and the implied research workflow, so a new pair (e.g. `solar_flood`) can be produced that mirrors `solar_hail` exactly.

---

## 0. High-level mental model

The package answers one question: **"Where can we get renewable-energy-specific financial reference numbers for a given hazard × asset pair, and how comparable are they to our internal damage model?"** It is explicitly **NOT** a calibration harness — it never defines pass/fail bands. It is a *source-pathway registry* + *deep-dive dossier* + *value/damage crosswalk*.

Three conceptual layers, each with its own folder:

1. **Anchor** (`00_anchor/` + root `README.md`): the cross-pair source-pathway registry, tag vocabulary, source hierarchy, coverage grid, and retrieval priorities. Peril-agnostic scaffolding reused by every pair.
2. **Pair dossier** (`01_pairs/<pair>/`): the deep dive for one hazard × asset cell — the normalized benchmark-number matrix, source coverage matrix, machine-readable source registry, and (v0.2) the value/damage crosswalk artifacts.
3. **Crosswalk** (`02_crosswalks/`): denominator/grain reconciliation between external benchmark numbers, the internal value ledger, and the internal damage-curve artifact.

Supporting: `data/` (package-level flat copies of all machine-readable artifacts, CSV+JSON), `99_metadata/` (manifest, bibliography, validation JSON), and top-level `CHANGELOG.md`, `HANDOFF_SUMMARY.md`, `VALIDATION_REPORT_v0_2.md`.

---

## 1. Full file tree

```text
range-validation-hazard-modeling/            (repo root)
  .gitignore
  README.md                                  <-- package front-matter + FULL copy of anchor registry
  CHANGELOG.md
  HANDOFF_SUMMARY.md
  VALIDATION_REPORT_v0_2.md
  loss_aggregation_discussion/               <-- (referenced) local symlink to M3->M4 aggregation notes; NOT present in repo tree
  00_anchor/
    renewable_loss_reference_source_pathways.md   <-- standalone copy of the anchor registry (2047 lines)
  01_pairs/
    solar_hail/
      README.md                              <-- deep-dive pair dossier (572 lines)
      benchmark_number_matrix.csv            <-- normalized benchmark rows
      source_matrix.csv                      <-- source × metric coverage grid
      source_registry.json                   <-- machine-readable source-pathway records
      benchmark_value_damage_crosswalk.csv   <-- (v0.2) benchmark rows recast onto value buckets
      damage_curve_intensity_reference.csv   <-- (v0.2) hail-diameter -> failure-unit DR lookup
      value_basis_from_damage_modeling_v2_5.json  <-- (v0.2) value-bucket + damage-grain constants
  02_crosswalks/
    README.md                                <-- crosswalk folder intro + index
    solar_hail_value_damage_crosswalk.md     <-- (v0.2) value/damage denominator crosswalk narrative
  data/                                       <-- package-level FLAT copies (CSV + JSON) of all artifacts
    benchmark_number_matrix_solar_hail.csv
    benchmark_number_matrix_solar_hail.json
    source_registry_solar_hail.csv
    source_registry_solar_hail.json
    solar_hail_value_basis_from_damage_modeling_v2_5.json
    solar_hail_value_damage_crosswalk.csv
    solar_hail_value_damage_crosswalk.json
    solar_hail_damage_curve_intensity_reference.csv
    solar_hail_damage_curve_intensity_reference.json
  99_metadata/
    bibliography.md
    manifest.md
    validation_v0_2.json
```

**Relationship notes (important for replication):**
- Root `README.md` = ~110 lines of package front-matter (folder layout, metric-frame emphasis, v0.2 addition note, deep-dive status table) **followed by a verbatim copy** of the anchor registry (from `# Renewable energy loss reference numbers — source pathways registry` onward). `00_anchor/…md` is the same registry as a standalone file.
- `data/` copies are **byte-identical** to the `01_pairs/solar_hail/` copies (confirmed by diff). The pair folder holds the "authored" copy; `data/` holds a flat, pair-name-prefixed distribution copy in **both CSV and JSON**. JSON exists for every tabular artifact.
- `source_matrix.csv` exists only in the pair folder (no `data/` copy in this build), and `source_registry` exists as JSON in the pair folder but as **both** CSV and JSON in `data/`.

---

## 2. Markdown files — outlines, section meaning, and writing conventions

### 2.0 Global writing conventions (apply to every MD file)

These conventions are the "house style" and must be replicated:

- **Front-matter block** at top of each dossier/crosswalk file:
  ```
  **Version:** v0.2
  **Last researched:** 2026-06-26   (or **Created:** for crosswalk/changelog)
  **Parent anchor / Parent pair dossier:** [`relative/path`](relative/path)
  **Purpose:** one sentence, always stating what the file is AND is not.
  ```
- **Epistemic-honesty framing is mandatory and repeated.** Every file restates: *"This is a source-pathway/normalization layer, NOT a calibration rule / pass-fail definition."* The phrase "This file does **not** define calibration pass/fail rules" (or close variant) appears in the anchor, the pair README, and both crosswalk files.
- **"What this gives us" vs "What it does NOT give us"** paired lists appear per source. Reusable boilerplate verbatim:
  > What this gives us: … / What it does **not** give us: …
- **Caveats are always fenced** in a ` ```text ` block, never inline prose only. Standard caveat lines reused across sources:
  - `Gross claim basis; project TIV and deductible terms not public.`
  - `Illustrative only; actual claim capacity unknown.`
  - `Net loss includes deductible obligations; modeled case, not observed claims ledger.`
- **Numbers are always rendered in backticks** with unit, e.g. `` `$150,000 / MW` ``, `` `13.39%` ``.
- **ASCII bar-chart "anchor plots"** (not distributions) are used to visualize `%TIV` bands: `█` blocks with a right-aligned value; always captioned "This is an **anchor plot**, not a distribution."
- **Tone:** technical, hedged, insurer/actuarial vocabulary (AAL, PML, OEP/AEP, TIV, BI, sublimit, gross/net). Confident about *provenance and availability*, deliberately cautious about *comparability*.
- **The load-bearing disclaimer**, reused near the end of most files:
  > A source that has a number is not automatically a benchmark. A source becomes a benchmark only after its denominator, coverage basis, peril coding, asset class, geography, and loss basis are understood.

---

### 2.1 `README.md` (root) — package front-door + anchor registry

Two parts.

**Part A — package front matter (H1 `# Range Validation Hazard Modeling — anchor README`):**
- (front-matter block: Version v0.2 / Last researched / Project)
- Intro fenced block: the 4 questions the package answers ("Where can we get renewable-energy-specific financial reference numbers? …").
- `## Folder layout` — fenced tree of the package.
- `## Metric-frame emphasis` — states `% EL / TIV` must not be the only target; lists the metric-frame vocabulary (EAL/AAL, OEP-PML, AEP-PML/VaR, TVaR, event/claim severity) and the per-metric qualifiers (EP frame, loss basis, denominator, aggregation stance). **This is the metric-frame contract (see §6).**
- `## v0.2 addition — value and damage-model cross-reference` — explains the crosswalk is a *normalization layer, not a calibration rule*; lists the 5 normalization buckets.
- `## Current deep-dive status` — table `| Pair | Status | Reason |` listing solar_hail (built), solar_flood (next), solar_strong_wind, solar_wildfire.

**Part B — anchor registry (H1 `# Renewable energy loss reference numbers — source pathways registry`):** identical to `00_anchor/…md`, outlined in §2.2.

---

### 2.2 `00_anchor/renewable_loss_reference_source_pathways.md` — the anchor registry

The peril-agnostic backbone. Section outline (H1/H2/H3):

- `# Renewable energy loss reference numbers — source pathways registry`
  - front-matter: Purpose / Scope / Last researched / Prepared for / Recommended home
- `## 0. Working thesis` — argues renewable assets need renewable-specific evidence, not generic real-estate loss data; defines the file as a *source-pathway registry, not a calibration protocol*.
- `## 1. Source status tags` — **the tag vocabulary (see §5).** Sub-tables:
  - `### 1.1 Availability tags` (HAS_OPEN_NUMBERS, HAS_GATED_NUMBERS, HAS_PATHWAY_ONLY, NO_DIRECT_RENEWABLE_NUMBERS_FOUND, GENERIC_ONLY)
  - `### 1.2 Metric-type tags` (CLAIM_SHARE, CLAIM_SEVERITY, EVENT_LOSS, DOLLARS_PER_MW, PERCENT_TIV, AAL, EAL, OEP_PML, AEP_PML, VAR, TVAR, PML, OEP_AEP, BI_DOWNTIME, DEDUCTIBLE_SUBLIMIT, TRIGGER_BURN, COMPONENT_COST, DENOMINATOR, LOSS_BASIS, REINSTATEMENT_ASSUMPTION)
  - `### 1.3 Evidence-use tags` (PRIMARY_BENCHMARK_CANDIDATE, SECONDARY_BENCHMARK, CASE_STUDY_ONLY, MECHANISM_ONLY, DENOMINATOR_ONLY, SCREENING_ONLY)
  - `### 1.4 Coverage caveat tags` (GROSS_VS_NET_UNKNOWN, BI_INCLUDED_UNKNOWN, TIV_BASIS_UNKNOWN, GEOGRAPHY_AMBIGUOUS, CAUSE_CODING_AMBIGUOUS, PORTFOLIO_BIAS, COMMERCIAL_LICENSE)
- `## 2. The source hierarchy we should use` — `### 2.1 Preferred hierarchy` (Tier R1–R5, renewable-first) and `### 2.2 What counts as a usable number`.
- `## 3. Coverage status by current / likely hazard × asset cells` — legend (GREEN/YELLOW/ORANGE/RED/GRAY) + a large grid table: rows = hazard×asset cells, columns = 5 source-class pathways + current status. **This is the cross-pair coverage map.**
- `## 4. Source-pathway categories` — the master source catalog, grouped by class:
  - `## 4.1 Renewable-specific claims publications and insurer/broker reports` — group-status table, then `### 4.1.1 … 4.1.7` per-source entries (kWh, AXIS solar, GCube/TMHCC, Marsh, J.S. Held, AXIS offshore, Allianz offshore).
  - `## 4.2 Renewable-specific engineered PML/AAL reports and cat-model products` — `### 4.2.1 … 4.2.6` (VDE Hail Risk, VDE/Cirrus, Renew Risk, Moody's RMS, GRC+VDE, Verisk/AIR/PCS).
  - `## 4.3 Project case studies and named-event loss sources` — Midway, Fighting Jays, hurricane resilience.
  - `## 4.4 Parametric insurance, trigger studies, payout-burn` — Descartes, VDE PRE/PREP.
  - `## 4.5 Engineering, reliability, forensic sources` — DOE/FEMP hail/flood/wildfire, RETC/PVEL/Kiwa/GroundWork.
  - `## 4.6 Exposure and denominator sources` — USPVDB, USWTDB, EIA-860.
  - `## 4.7 Generic public loss/hazard sources — downgraded to secondary` — NOAA Storm Events, SHELDUS, NFIP.
- `## 5. Hazard-specific source-pathway notes` — `## 5.1 … 5.8` per-cell notes (solar×hail, ×flood, ×strong wind, ×tornado, ×hurricane, ×wildfire, wind onshore, offshore wind). Each has: status line, "Source types that have numbers" table, "Best immediate extraction targets" fenced block, "Gaps to close" fenced block.
- `## 6. Private / semi-private pathways` — insurer loss runs, broker analytics, IE/lender diligence, adjuster files, parametric vendors, legal/regulatory docs. Each lists "Potential owners" + "Ask for" fenced block.
- `## 7. Minimum fields to store for every benchmark source row` — a **YAML schema** (the registry field contract, see §3/§8).
- `## 8. Data-request templates` — `### 8.1` claims-data, `### 8.2` engineered PML/AAL, `### 8.3` parametric trigger. Fenced field lists.
- `## 9. Retrieval priority list` — P0/P1/P2 numbered actions.
- `## 10. What the future Markdown/registry should not do` — the anti-scope-creep section; ends with the load-bearing "a source that has a number is not automatically a benchmark" disclaimer.
- `## 11. One-page summary table` — `| Cell | Current source depth | Best source pathway | Main missing piece |`.
- `## 12. References index` — URLs grouped by class (Renewable claims / Engineered PML-AAL / Engineering / Exposure / Generic).

**Per-source entry template (used throughout §4) — replicate verbatim structure:**
```
### 4.x.y <Source name>

**Source ID:** `RS_<CLASS>_<NAME>_<YEAR>`
**Primary path:** …
**Access:** open / gated / commercial …
**Tags:** `TAG1`, `TAG2`, … (availability + metric + evidence-use + caveat tags)

**Numbers already visible publicly:** (bulleted, bold key figures)
**Best hazard/asset coverage:** (fenced block, cell -> qualitative strength)
**How to obtain comparison numbers later:** (numbered steps + fenced "fields requested" block)
**Caveats:** (prose or fenced)
**References / Reference leads:** (markdown links)
```
Source-ID convention in the anchor: `RS_` prefix + class token (`CLAIMS`, `MODEL`, `BROKER`, `FORENSIC`, `CASE`, `PARAM`, `ENGINEERING`, `EXPOSURE`, `GENERIC`) + name + year.

---

### 2.3 `01_pairs/solar_hail/README.md` — the pair deep-dive dossier

Section outline:

- `# Solar × hail — renewable loss reference source deep dive`
  - front-matter: Version / Last researched / Parent anchor link / Purpose (states it does NOT define calibration).
- `## 0. Bottom line` — fenced "why this is the right first pair" map: open claim-severity → AXIS $/MW; open portfolio share → kWh/GCube; open modeled AAL → kWh/POWER; case severity → J.S.Held/Midway/GCube; gated PML/AAL → VDE/Cirrus/GRC; denominator → USPVDB+EIA. Then the "main limitation is gated" caveat.
- `## 1. Normalization basis used in this dossier` — the two default value bases (`$1,120,000/MWdc` installed, `$877,800/MWdc` physical); the conversion formulas; a fenced "Important caveats" block. `### 1.1 Value/damage cross-reference added in v0.2` — introduces the crosswalk, the `$291,215/MWdc` (26.00%) module cap and `$398,084/MWdc` (35.54%) module+fieldwork bucket, and maps the three AXIS severities against them.
- `## 2. Quick benchmark-number matrix` — the human-readable version of `benchmark_number_matrix.csv`: `| Benchmark | Source | Reported | $/MW | % default installed TIV | % default physical value | Caveat |`. Then:
  - `### 2.1 Event / claim-severity anchors as % installed TIV` — ASCII anchor-plot.
  - `### 2.2 Modeled annual AAL anchors as % installed TIV / year` — ASCII anchor-plot.
- `## 3. Source coverage matrix — what each pathway has and does not have` — human-readable version of the per-source "Has / Does not have / Best use" contract; `| Source/pathway | Status | Has | Does not have | Best use |`.
- `## 4. The source pathways in detail` — `### 4.1 … 4.8` per-source narratives (AXIS, kWh with sub-parts A–D, GCube, VDE/Cirrus/GRC, Renew Risk, J.S. Held, DOE/FEMP, USPVDB+EIA). Each restates Source ID / Status / Use and the Has/Does-not-have + data-request block.
- `## 5. Data request templates` — `### 5.1` claims-source, `### 5.2` engineered PML/AAL, `### 5.3` telematics/stow-performance. Fenced field lists tailored to the pair.
- `## 6. Current retrieval priority for solar × hail` — `| Priority | Source/pathway | Why |` (P0/P1/P2).
- `## 7. Files in this pair folder` — fenced list of the pair's files, noting `data/` copies.

**Pair Source-ID convention** (differs from anchor's `RS_` scheme): descriptive uppercase tokens, e.g. `AXIS_SOLAR_VS_HAIL_2025`, `KWH_SRA_2025_PDF`, `KWH_POWERMAG_RESILIENCY_CASE_2025`, `GCUBE_HAIL_NO_2023_PUBLIC_SUMMARIES`, `VDE_HAIL_RISK_INTELLIGENCE`, `USPVDB_V4_0_2026`. These IDs are the join key across CSV/JSON/bibliography.

---

### 2.4 `02_crosswalks/README.md` — crosswalk folder intro

- `# Crosswalks` — front-matter (Version/Created).
- Prose: crosswalks reconcile denominator/grain; fenced list of the four category errors they prevent (net insured $ vs M3 gross module damage; whole-plant TIV vs PV_ARRAY failure-unit value; event loss vs annual AAL; BI/downtime vs physical replacement).
- `Current crosswalks:` table `| Pair | File | Status |`.

---

### 2.5 `02_crosswalks/solar_hail_value_damage_crosswalk.md` — value/damage crosswalk narrative

- `# Solar × hail — value and damage-model cross-reference` — front-matter incl. Parent pair dossier link + Purpose.
- `## 0. The rule` — fenced statement: external reports give reference numbers; value workbook gives implied denominator; damage artifact gives the failure-unit value the M3 curve damages. "It should **not** be used to tune a curve by itself."
- `## 1. Upstream artifacts used` — names the value workbook (`solar_wind_value_breakdown.xlsx`) and canonical damage artifact path; lists the failure-unit grain (PV_MODULE_GLASS_CELL / PV_ARRAY / PV_MODULE / PV_ARRAY_MODULE_EXPOSED / hazard axis `mesh_diameter_mm`).
- `## 2. Solar value-basis crosswalk` — the value-bucket table `| Bucket | $/MWdc | % installed TIV | How to use |` (7 buckets). Then key-interpretation fenced block.
- `## 3. Benchmark numbers recast onto damage-model buckets` — human-readable version of `benchmark_value_damage_crosswalk.csv`; `| Benchmark row | $/MWdc | % installed TIV | % PV_ARRAY hardware | % PV_ARRAY + fieldwork | Comparison grain |`. Plus AXIS severity ASCII band + "Read this as" interpretation.
- `## 4. Damage-curve intensity reference` — human-readable version of `damage_curve_intensity_reference.csv`; `| Hail diameter mm | Fragile unstowed DR | Default unstowed DR | Default fully-stowed adjusted DR | Hardened unstowed DR |` (12 rows). Plus "Important caveats" fenced block (failure-unit DRs not whole-plant; stow uses v2.5 placeholder D50+8mm, max_DR 0.90; T4 not-claims-calibrated).
- `## 5. How this changes future source acquisition` — `| Needed field | Why it matters |` mapping acquisition fields to crosswalk landing.
- `## 6. Practical caveat to carry into the pair dossier` — fenced boilerplate language to reuse when summarizing.
- `## 7. Machine-readable files` — fenced list of the three `data/` artifacts and what each holds.

---

### 2.6 `99_metadata/manifest.md`

- `# Manifest — Range Validation Hazard Modeling v0.2`, Generated date.
- `## Files` — `| Path | Role |` for every file.
- `## Value basis used for normalization` — the two default $/MWdc bases.
- `## Validation scope` — restates "does not implement calibration or pass/fail".
- `## v0.2 added files` — fenced list of the 9 files added in v0.2.

### 2.7 `99_metadata/bibliography.md`

- `# Bibliography and source notes`, Retrieved date.
- One `## <SOURCE_ID>` section per source (same IDs as pair registry). Each has bolded fields: **Name / Type / Availability / URL / Retrieved / Has / Does not have / Notes.** This is the prose mirror of `source_registry.json` (same 15 sources).

---

## 3. CSV files — verbatim headers, column meaning, sample rows

### 3.1 `benchmark_number_matrix.csv` (= `data/benchmark_number_matrix_solar_hail.csv`)

**Header (verbatim, 15 columns):**
```
benchmark_id,source_id,label,metric_family,reported_value,reported_unit,normalized_usd_per_MW,pct_installed_TIV_default_1_12M_per_MW,pct_physical_replaceable_default_0_8778M_per_MW,source_denominator_or_scope,source_pct_TIV_or_asset_value,basis_confidence,source_status,useful_for,caveats
```

| Column | Meaning |
|---|---|
| `benchmark_id` | Unique row key for the benchmark datum (e.g. `AXIS_SUCCESSFUL_STOW_EVENT_SEVERITY`). |
| `source_id` | FK to the source registry / bibliography ID (e.g. `AXIS_SOLAR_VS_HAIL_2025`). |
| `label` | Human sentence describing the number. |
| `metric_family` | The metric class: CLAIM_SHARE, CLAIM_SEVERITY, CLAIM_SEVERITY_DELTA, INCIDENT_SHARE, BI_DOWNTIME, AGGREGATE_CLAIM_INTENSITY, RETURN_PERIOD_LOSS_THRESHOLD, AAL, AAL_REDUCTION, PREMIUM_REDUCTION, CLAIM_SEVERITY_SENSITIVITY, EVENT_LOSS, CLAIM_RANGE, ANNUAL_INDUSTRY_LOSS, DAMAGE_THRESHOLD. |
| `reported_value` | The number exactly as published (may be a range or string, e.g. `$150,000/MW`, `55`, `$70M-$80M`). |
| `reported_unit` | Unit/basis text (e.g. `gross claim dollars per MW`, `% of total financial losses`). |
| `normalized_usd_per_MW` | Reported value converted to $/MW when possible, else blank. |
| `pct_installed_TIV_default_1_12M_per_MW` | `normalized_usd_per_MW / 1,120,000` × 100. Blank when not $/MW. |
| `pct_physical_replaceable_default_0_8778M_per_MW` | `normalized_usd_per_MW / 877,800` × 100. |
| `source_denominator_or_scope` | What population/denominator the source number actually covers. |
| `source_pct_TIV_or_asset_value` | The %TIV/asset-value the *source itself* states (if any), kept separate from our normalization. |
| `basis_confidence` | Qualitative confidence: high / medium-high / medium / medium-low / low-medium / low. |
| `source_status` | open / open summary / open threshold; gated results / derived sensitivity / open case study. |
| `useful_for` | Intended analytic use (e.g. `event severity / cap check / stow conditioner`). |
| `caveats` | The comparability warning for this row. |

**Sample rows (verbatim):**
```
AXIS_SUCCESSFUL_STOW_EVENT_SEVERITY,AXIS_SOLAR_VS_HAIL_2025,Successful stow average hail claim severity,CLAIM_SEVERITY,"$150,000/MW",gross claim dollars per MW,150000,13.392857142857142,17.088174982911823,reported MW; successful stow deployments,,high,open,event severity / cap check / stow conditioner,Gross claim basis; project TIV and deductible terms not public.
KWH_2025_HAIL_LOSS_SHARE,KWH_SRA_2025_PDF,Hail share of kWh Analytics loss database financial losses,CLAIM_SHARE,73,% of total financial losses,,,,kWh loss database; solar installations; damage amount,,high,open,peril-share / shape sanity,No underlying loss ledger or TIV denominator open.
```
23 data rows total. Numeric cells left blank (not zero) when a conversion does not apply — a deliberate epistemic choice.

---

### 3.2 `source_matrix.csv` (pair folder only)

**Header (verbatim, 19 columns):**
```
source_id,availability_tag,primary_use,CLAIM_SHARE,CLAIM_SEVERITY,EVENT_LOSS,DOLLARS_PER_MW,PERCENT_TIV,AAL,PML,OEP_AEP,BI_DOWNTIME,DEDUCTIBLE_SUBLIMIT,COMPONENT_COST,DENOMINATOR,MITIGATION_STATE,STOW_PERFORMANCE,MODULE_TYPE,GATED_ACTUAL_VALUES
```

- `source_id` — FK to registry.
- `availability_tag` — one of the availability tags (§5.1).
- `primary_use` — evidence-use tag(s), comma-joined in one quoted cell.
- Remaining columns are a **coverage matrix**: each metric/attribute column holds `Y` if the source supplies it, else blank. Columns = the metric-type + attribute vocabulary specialized to this pair (note `MITIGATION_STATE`, `STOW_PERFORMANCE`, `MODULE_TYPE`, `GATED_ACTUAL_VALUES` are pair-specific additions beyond the anchor's metric tags).

**Sample rows (verbatim):**
```
AXIS_SOLAR_VS_HAIL_2025,HAS_OPEN_NUMBERS,PRIMARY_BENCHMARK_CANDIDATE,Y,Y,,Y,,,,,Y,,,,Y,,Y,
VDE_HAIL_RISK_INTELLIGENCE,HAS_GATED_NUMBERS,PRIMARY_BENCHMARK_CANDIDATE,,,,,,Y,Y,Y,Y,,,,,,Y,Y
```
16 data rows (one per source).

---

### 3.3 `benchmark_value_damage_crosswalk.csv` (= `data/…`)

**Header (verbatim, 12 columns):**
```
benchmark_id,source_id,label,metric_family,reported_value,normalized_usd_per_MWdc,pct_installed_TIV,pct_physical_replaceable_value,pct_PV_ARRAY_module_hardware,pct_PV_ARRAY_plus_fieldwork,pct_PV_ARRAY_plus_mounting_plus_fieldwork,direct_damage_grain_comparability,interpretation
```

- First five columns mirror the benchmark matrix.
- `normalized_usd_per_MWdc` — $/MWdc value being recast.
- `pct_*` columns — the same $/MWdc expressed as % of each **value bucket**: installed TIV, physical replaceable value, PV_ARRAY module hardware, PV_ARRAY+fieldwork, PV_ARRAY+mounting+fieldwork. Values can exceed 100% (signals grain mismatch, not a curve error).
- `direct_damage_grain_comparability` — verdict token: `module-hardware-comparable-if-PD-only`, `requires-fieldwork-or-claim-cost-allocation`, `delta-only-module-cost-signal`, `normalization-only`, `M4-or-tail-metric-only`, `capacity-denominator-sensitive`.
- `interpretation` — one-sentence rationale.

**Sample rows (verbatim):**
```
AXIS_SUCCESSFUL_STOW_EVENT_SEVERITY,AXIS_SOLAR_VS_HAIL_2025,Successful stow average hail claim severity,CLAIM_SEVERITY,"$150,000/MW",150000.0,13.392857142857146,17.088258645634898,51.50836204208621,37.68052564970874,27.20608141589944,module-hardware-comparable-if-PD-only,Below the PV_ARRAY hardware cap; may be comparable to direct module failure-unit loss if BI/deductible/coverage effects are excluded.
AXIS_FIXED_TILT_EVENT_SEVERITY,AXIS_SOLAR_VS_HAIL_2025,Fixed-tilt average hail claim severity,CLAIM_SEVERITY,"$340,000/MW",340000.0,30.357142857142865,38.7333862634391,116.75228729539542,85.40919147267316,61.66711787603874,requires-fieldwork-or-claim-cost-allocation,Above PV_ARRAY hardware cap but within PV_ARRAY + unallocated replacement fieldwork; likely gross-claim/repair-cost grain rather than pure module DR.
```
11 data rows (matches `crosswalk_rows: 11` in validation JSON — only the $/MWdc-normalizable subset of benchmarks).

---

### 3.4 `damage_curve_intensity_reference.csv` (= `data/…`)

**Header (verbatim, 7 columns):**
```
hail_diameter_mm,HAIL_SOLAR_FRAGILE_THIN_GG_unstowed_DR,HAIL_SOLAR_FRAGILE_THIN_GG_fully_stowed_DR_adjusted,HAIL_SOLAR_DEFAULT_3P2_GBS_unstowed_DR,HAIL_SOLAR_DEFAULT_3P2_GBS_fully_stowed_DR_adjusted,HAIL_SOLAR_HARDENED_THICKER_unstowed_DR,HAIL_SOLAR_HARDENED_THICKER_fully_stowed_DR_adjusted
```

- `hail_diameter_mm` — hazard-axis intensity (25 → 90 mm, 12 rows).
- Six DR columns: three module archetypes (`FRAGILE_THIN_GG`, `DEFAULT_3P2_GBS`, `HARDENED_THICKER`) × two stow states (`unstowed`, `fully_stowed_DR_adjusted`). Values are **failure-unit damage ratios (0–1)**, not whole-plant.

**Sample rows (verbatim):**
```
25,0.028018960877552106,0.004419177661279811,0.010000208873691786,0.002404458723833401,0.004999841253861766,0.0015291461886110696
50,0.8775434458525238,0.4958096512157374,0.39000320357653323,0.13047467110554667,0.1289739168117034,0.04298068064255116
```
12 data rows (matches `intensity_reference_rows: 12`). The MD table (§2.5 `## 4`) is a rounded % rendering of this CSV.

---

### 3.5 `data/source_registry_solar_hail.csv`

Flat CSV serialization of `source_registry.json`. **Header (verbatim, 12 columns):**
```
source_id,source_name,source_type,availability_tag,metric_tags,evidence_use_tags,solar_hail_use,has_open_numbers,does_not_have_open,url,retrieved,notes
```
- `metric_tags` and `evidence_use_tags` are Python-list-style strings in one quoted cell (e.g. `"['CLAIM_SHARE', 'CLAIM_SEVERITY']"`).
- `solar_hail_use` is the pair-specific use column — **its name is pair-derived** (`<pair>_use`), a thing to templatize.
- All other columns map 1:1 to JSON keys.

**Sample row (verbatim, truncated):**
```
AXIS_SOLAR_VS_HAIL_2025,AXIS Global Energy — Solar vs. Hail / severe weather claims report,renewable_insurer_claims_publication,HAS_OPEN_NUMBERS,"['CLAIM_SHARE', 'CLAIM_SEVERITY', 'DOLLARS_PER_MW', 'BI_DOWNTIME', 'MITIGATION_STATE', 'MODULE_TYPE']",['PRIMARY_BENCHMARK_CANDIDATE'],Best open claim-severity source found for solar hail; …,Hail = 55% of total gross NatCat/extreme-weather solar PV claim amount…,Full claim distribution; project TIV; …,https://investor.axiscapital.com/…,2026-06-26,Most immediately actionable open source for $/MW event-severity bands.
```
16 data rows.

---

## 4. JSON files — top-level schema/shape

### 4.1 `source_registry.json` (= `data/source_registry_solar_hail.json`)
Top level: **array of source objects.** One example element (shape):
```json
{
  "source_id": "AXIS_SOLAR_VS_HAIL_2025",
  "source_name": "AXIS Global Energy — Solar vs. Hail / severe weather claims report",
  "source_type": "renewable_insurer_claims_publication",
  "availability_tag": "HAS_OPEN_NUMBERS",
  "metric_tags": ["CLAIM_SHARE", "CLAIM_SEVERITY", "DOLLARS_PER_MW", "BI_DOWNTIME", "MITIGATION_STATE", "MODULE_TYPE"],
  "evidence_use_tags": ["PRIMARY_BENCHMARK_CANDIDATE"],
  "solar_hail_use": "Best open claim-severity source found for solar hail; …",
  "has_open_numbers": "Hail = 55% of total gross …",
  "does_not_have_open": "Full claim distribution; project TIV; …",
  "url": "https://investor.axiscapital.com/…",
  "retrieved": "2026-06-26",
  "notes": "Most immediately actionable open source for $/MW event-severity bands."
}
```
15 elements. `source_type` controlled vocabulary observed: `renewable_insurer_research_report`, `…_pdf`, `renewable_insurer_broker_case_study`, `renewable_insurance_data_program`, `renewable_insurer_claims_publication`, `renewable_insurer_reinsurance_article`, `renewable_insurer_claims_publication_summary`, `engineered_pml_aal_product`, `engineered_case_study`, `renewable_cat_model_product`, `forensic_adjuster_engineering_case_study`, `government_engineering_guidance`, `public_exposure_denominator`. The pair-use key is `<pair>_use`.

### 4.2 `benchmark_number_matrix_solar_hail.json` (data only)
Top level: **array of benchmark objects**; keys = the 15 CSV columns of §3.1 (same names). Nulls used where CSV is blank. 23 elements.

### 4.3 `solar_hail_value_damage_crosswalk.json` (= pair `benchmark_value_damage_crosswalk.csv` as JSON)
Top level: **array of recast-benchmark objects**; keys = the 12 columns of §3.3. 11 elements.

### 4.4 `solar_hail_damage_curve_intensity_reference.json` (= intensity CSV as JSON)
Top level: **array of row objects**; keys = the 7 columns of §3.4. 12 elements.

### 4.5 `value_basis_from_damage_modeling_v2_5.json` (= `data/solar_hail_value_basis_from_damage_modeling_v2_5.json`)
Top level: **object** — the value/damage constants used by the crosswalk. Keys:
```json
{
  "schema_version": "renewable_loss_value_damage_crosswalk.v1",
  "created": "2026-06-26",
  "source_value_workbook": "solar_wind_value_breakdown.xlsx / Summary + Solar_Map",
  "source_damage_artifact": "DAMAGE_CURVE_LIBRARY_V2_5_.../hail_solar/current/hail_solar__model_v1_0__docs_r5__curve_artifact.json",
  "important_rule": "This crosswalk normalizes and reconciles denominator/grain only; it is not external validation evidence.",
  "solar_default_basis_usd_per_MWdc": {
    "installed_TIV": 1119999.99…, "physical_replaceable_value": 877795.70…,
    "excluded_sunk_soft_nonphysical": 242204.29…,
    "physical_as_pct_installed": 78.37…, "excluded_as_pct_installed": 21.62…
  },
  "hail_damage_grain": {
    "cell_id": "hail_solar",
    "hazard_axis": {"id":"HAIL_DIAMETER_MESH_EQUIV","input_field":"mesh_diameter_mm","unit":"mm","source_units_allowed":["mm","in"],"valid_range":[0,100],"extrapolation_policy":"clamp_or_warn"},
    "failure_unit": {"id":"PV_MODULE_GLASS_CELL","subsystem":"PV_ARRAY","component":"PV_MODULE","treatment":"primary_nonzero","y_axis":"module replacement damage ratio approximated by glass breakage probability","value_bucket":"PV_ARRAY_MODULE_EXPOSED","f_kind":"material_share"},
    "canonical_runtime_value_bucket": "PV_ARRAY_MODULE_EXPOSED",
    "curve_ids": ["HAIL_SOLAR_FRAGILE_THIN_GG","HAIL_SOLAR_DEFAULT_3P2_GBS","HAIL_SOLAR_HARDENED_THICKER"],
    "max_DR_runtime_failure_unit": 1.0,
    "direct_module_hardware_cap_usd_per_MWdc_before_exposure": 291214.85…,
    "direct_module_hardware_cap_pct_installed_TIV": 26.00…,
    "direct_module_hardware_cap_pct_physical_value": 33.17…
  },
  "normalization_buckets_usd_per_MWdc": { installed_TIV, physical_replaceable_value, PV_ARRAY_module_hardware, REPLACEMENT_FIELDWORK_unallocated, PV_ARRAY_plus_REPLACEMENT_FIELDWORK, MOUNTING_tracker_racking, PV_ARRAY_plus_MOUNTING_plus_REPLACEMENT_FIELDWORK },
  "subsystem_rollup_from_value_workbook": { "<SUBSYSTEM>": {subsystem, installed_usd_per_kWdc, physical_usd_per_kWdc, installed_share, physical_share, default_installed_usd_mm, default_physical_usd_mm}, … },
  "comparison_guidance": [ "Compare M3 direct hail damage to PV_ARRAY_module_hardware unless …", … 4 rules ]
}
```
Subsystems in `subsystem_rollup_from_value_workbook`: PV_ARRAY, MOUNTING, FOUNDATION, INVERTER_SYSTEM, ELECTRICAL_COLLECTION, SUBSTATION, GROUNDING_LIGHTNING, SCADA, CIVIL_INFRA, REPLACEMENT_FIELDWORK, SUNK_SOFT_NONPHYSICAL.

### 4.6 `99_metadata/validation_v0_2.json`
Top level: **object** — a build/QA record:
```json
{
  "package": "range-validation-hazard-modeling",
  "created": "2026-06-26",
  "checks": {
    "source_dir_exists": true,
    "value_workbook_loaded_with_artifact_tool": true,
    "damage_json_loaded": true,
    "crosswalk_rows": 11,
    "intensity_reference_rows": 12,
    "required_files_exist": true,
    "key_numbers": {
      "installed_usd_per_MWdc": 1119999.99…,
      "physical_usd_per_MWdc": 877795.70…,
      "PV_ARRAY_hardware_usd_per_MWdc": 291214.85…,
      "PV_ARRAY_plus_fieldwork_usd_per_MWdc": 398083.61…
    }
  }
}
```

---

## 5. Source-tagging system (from `00_anchor`)

Four tag families. **Every source in the registry is classified with at least one availability tag, ≥1 metric-type tag, ≥1 evidence-use tag, and any relevant caveat tags.**

**5.1 Availability tags** (the primary classification axis):
| Tag | Meaning |
|---|---|
| `HAS_OPEN_NUMBERS` | Public source already exposes usable numeric reference values. |
| `HAS_GATED_NUMBERS` | Source references/offers the numbers, but values need form/paid/client/API/subscription access. |
| `HAS_PATHWAY_ONLY` | Plausible owner exists, but open materials don't expose numbers; needs outreach/NDA/relationship. |
| `NO_DIRECT_RENEWABLE_NUMBERS_FOUND` | No credible renewable-specific financial path found yet. |
| `GENERIC_ONLY` | Public loss data exists but not renewable-asset-specific; secondary context only. |

**5.2 Metric-type tags:** CLAIM_SHARE, CLAIM_SEVERITY, EVENT_LOSS, DOLLARS_PER_MW, PERCENT_TIV, AAL, EAL, OEP_PML, AEP_PML, VAR, TVAR, PML, OEP_AEP, BI_DOWNTIME, DEDUCTIBLE_SUBLIMIT, TRIGGER_BURN, COMPONENT_COST, DENOMINATOR, LOSS_BASIS, REINSTATEMENT_ASSUMPTION. (Registry JSON also uses extended tags: RETURN_PERIOD, MITIGATION_STATE, SOURCE_DISCOVERY, INCIDENT_SHARE, PORTFOLIO_LOSS_PATTERN, P50_P90_P95, HAIL_SIZE, TILT_ANGLE, MODULE_TYPE, etc. — pair-specific extensions are allowed.)

**5.3 Evidence-use tags:** PRIMARY_BENCHMARK_CANDIDATE, SECONDARY_BENCHMARK, CASE_STUDY_ONLY, MECHANISM_ONLY, DENOMINATOR_ONLY, SCREENING_ONLY.

**5.4 Coverage-caveat tags:** GROSS_VS_NET_UNKNOWN, BI_INCLUDED_UNKNOWN, TIV_BASIS_UNKNOWN, GEOGRAPHY_AMBIGUOUS, CAUSE_CODING_AMBIGUOUS, PORTFOLIO_BIAS, COMMERCIAL_LICENSE.

Classification also uses a **renewable-specificity ladder** (from §7 schema): `direct_hazard_asset` → `direct_asset_class_but_peril_aggregated` → `renewable_general` → `generic_property`; and a **source hierarchy** R1 (renewable claims/loss databases) → R2 (engineered PML/AAL/cat-model) → R3 (case studies/forensic) → R4 (engineering studies) → R5 (generic public, secondary only).

---

## 6. The "metric frame" concept

Every benchmark number must carry its **metric frame** so heterogeneous numbers are not silently mixed. The frame has five dimensions (defined in root README `## Metric-frame emphasis`):

1. **Metric family** — EAL/AAL (mean annual, % TIV/yr) · OEP-PML (largest single occurrence at return period) · AEP-PML/VaR (annual aggregate at return period) · TVaR (mean beyond tail threshold) · event/claim severity ($/MW or %TIV). Recorded in `metric_family` (benchmark CSV) and `metric_tags` (registry).
2. **EP frame** — OEP vs AEP.
3. **Loss basis** — physical destruction vs repair spend vs insured/net loss vs gross claim vs revenue/BI. Recorded in `reported_unit`, `caveats`, and caveat tags `GROSS_VS_NET_UNKNOWN`, `BI_INCLUDED_UNKNOWN`.
4. **Denominator / value basis** — installed TIV vs physical value vs vulnerable-stock vs component value; $/MW vs %TIV. Recorded in `source_denominator_or_scope`, `source_pct_TIV_or_asset_value`, and the `pct_*` normalization columns; caveat tag `TIV_BASIS_UNKNOWN`.
5. **Aggregation stance** — no / partial / full / unknown reinstatement. Tag `REINSTATEMENT_ASSUMPTION`.

Where recorded: benchmark matrix columns (`metric_family`, `reported_unit`, `source_denominator_or_scope`, `basis_confidence`, `caveats`), registry `metric_tags`, and the crosswalk's `direct_damage_grain_comparability` verdict. **Rule:** never mix claim severity (event anchor) with AAL (annualized) on the same axis; the dossier keeps them in separate anchor-plots (§2.1 vs §2.2).

---

## 7. Crosswalk logic (external number → internal value bucket)

**Problem:** external benchmarks are usually **gross claim $/MW** at whole-plant grain, but the internal M3 hail damage curve damages a **PV_MODULE / PV_ARRAY failure unit**. Comparing them naively is a category error.

**Value ladder (solar, $/MWdc), from `value_basis_…json` + crosswalk MD `## 2`:**
| Bucket | $/MWdc | % installed TIV |
|---|---|---|
| Installed TIV | 1,120,000 | 100.00% |
| Physical replaceable value | 877,796 | 78.37% |
| Excluded sunk/soft/nonphysical | 242,204 | 21.63% |
| PV_ARRAY / PV_MODULE hardware (**M3 failure-unit value**) | 291,215 | **26.00%** |
| Unallocated replacement fieldwork | 106,869 | 9.54% |
| PV_ARRAY + replacement fieldwork | 398,084 | **35.54%** |
| PV_ARRAY + mounting + replacement fieldwork | 551,347 | 49.23% |

**Mapping procedure (per benchmark row):**
1. Normalize the reported number to `$/MWdc`.
2. Compute it as % of each value bucket (`pct_installed_TIV`, `pct_PV_ARRAY_module_hardware`, `pct_PV_ARRAY_plus_fieldwork`, `pct_PV_ARRAY_plus_mounting_plus_fieldwork`).
3. Assign a `direct_damage_grain_comparability` verdict:
   - ≤ module-hardware cap → `module-hardware-comparable-if-PD-only`
   - > hardware cap but ≤ hardware+fieldwork → `requires-fieldwork-or-claim-cost-allocation`
   - annual/return-period → `M4-or-tail-metric-only`
   - lacks capacity denominator → `capacity-denominator-sensitive`
   - delta figure → `delta-only-module-cost-signal`; aggregate → `normalization-only`
4. Write the one-line `interpretation`.

**Worked figures (the canonical example):** AXIS successful stow `$150k/MW` = 51.5% of module hardware / 37.7% of module+fieldwork → fits inside module bucket. Fixed tilt `$340k/MW` (116.8% hardware / 85.4% module+fieldwork) and failed stow `$380k/MW` (130.5% / 95.5%) **exceed** pure module hardware but fit within module+fieldwork → they are gross-repair-cost grain, not evidence that module DR should exceed 1. GCube `$58.4M` avg claim is shown as 100/200/350 MW sensitivities (`$584k`/`$292k`/`$167k` per MW) because the capacity denominator is unknown.

**The invariant rule (verbatim):** *"If a benchmark $/MW exceeds PV_ARRAY_module_hardware, that is a grain warning, not automatic evidence that module DR should exceed 1."* The crosswalk classifies comparability; it never tunes the curve.

---

## 8. Metadata / manifest / validation contract

- **`manifest.md`** — regenerate per version: Files table (Path|Role for every file), value-basis block, validation-scope disclaimer, and a "v0.X added files" fenced list.
- **`bibliography.md`** — one section per source ID with **Name / Type / Availability / URL / Retrieved / Has / Does not have / Notes**. Mirror of `source_registry.json`.
- **`validation_v0_2.json`** — build QA object: `package`, `created`, `checks{source_dir_exists, value_workbook_loaded_with_artifact_tool, damage_json_loaded, crosswalk_rows, intensity_reference_rows, required_files_exist, key_numbers{…}}`. `crosswalk_rows`/`intensity_reference_rows` must equal the row counts in the corresponding CSVs (11 / 12).
- **`VALIDATION_REPORT_v0_2.md`** — human report: bulleted PASS checklist (source package copied, value workbook loaded, hail JSON loaded, crosswalk rows written = 11, intensity rows = 12, required files exist, zip integrity) + "Key extracted values" table (installed TIV, physical replaceable value, PV_ARRAY hardware, PV_ARRAY+fieldwork).
- **`HANDOFF_SUMMARY.md`** — exec summary: "Highest-value open numbers" table, "Main gap" (gated PML/AAL), "Output files" list, and a "v0.2 value/damage cross-reference" section with the key-takeaway fenced block.

---

## 9. Versioning / changelog conventions

- **Version scheme:** `v0.X` (currently `v0.2`), surfaced in every file's front-matter, in filenames (`VALIDATION_REPORT_v0_2.md`, `validation_v0_2.json`), the package title, and the manifest.
- **Dates:** ISO `YYYY-MM-DD`; two labels — `Last researched:` (dossier/anchor) and `Created:`/`Generated:` (crosswalk/manifest/changelog). All 2026-06-26 in this build.
- **`CHANGELOG.md` entry shape:**
  ```
  ## vX.Y — <short title>
  Created: YYYY-MM-DD
  <prose: what was added>
  ```text
  <the artifacts/linkage this release introduced>
  ```
  <explicit statement of what the release does NOT change (no benchmark numbers changed; no calibration rules)>
  ```
  The v0.2 entry states it "does not change any benchmark source numbers and does not define calibration pass/fail rules" — every release carries this non-scope disclaimer.
- **Version bump = new artifact set**, not edits in place: v0.2 *added* the `02_crosswalks/` folder, the three crosswalk artifacts (×CSV/JSON/pair copies), and their `data/` copies, all listed in manifest "v0.2 added files".

---

## 10. Reconstructed build workflow (turn into skill steps)

The implied research pipeline that produced `solar_hail`:

1. **Start from the anchor.** Copy/instantiate the peril-agnostic source-pathway registry (`00_anchor` + root README front-matter). Confirm the tag vocabulary (§5), source hierarchy R1–R5, and metric-frame contract (§6) are in place.
2. **Pick the pair & justify it.** Add/select a row in the root "Current deep-dive status" table with a one-line reason (strength of open/gated renewable-specific numbers).
3. **Enumerate sources by class** for the pair, walking the anchor's §4 categories: claims publications → engineered PML/AAL/cat-models → case studies → parametric → engineering/mechanism → exposure/denominator → generic (downgraded). For each, run web research, capture URL + retrieval date.
4. **Classify every source** with availability + metric + evidence-use + caveat tags; write both `has_open_numbers` and `does_not_have_open`. Emit `source_registry.json` (+ CSV copy) and the prose `bibliography.md` (same IDs).
5. **Build the source coverage matrix** (`source_matrix.csv`): sources × metric/attribute columns with `Y` marks; include pair-specific attribute columns (for solar_hail: MITIGATION_STATE, STOW_PERFORMANCE, MODULE_TYPE, GATED_ACTUAL_VALUES).
6. **Extract the actual numbers** into `benchmark_number_matrix.csv` (+ JSON): one row per datum, with `metric_family`, exact `reported_value`/`reported_unit`, `source_denominator_or_scope`, `basis_confidence`, and a `caveats` line. Normalize to $/MW and to %TIV against the two default value bases **only where valid** (leave blanks otherwise). Add derived sensitivity rows where a denominator is missing (GCube 100/200/350 MW pattern).
7. **Author the dossier narrative** (`01_pairs/<pair>/README.md`): Bottom line → Normalization basis → Quick benchmark matrix + anchor-plots → Source coverage matrix → per-source detail → data-request templates → retrieval priority → files list. Maintain the "Has / Does-not-have / data-request" rhythm and epistemic caveats.
8. **(v0.2) Build the value/damage crosswalk.** Load the internal value workbook (`solar_wind_value_breakdown.xlsx`) and the canonical damage-curve artifact for the cell; extract value buckets + failure-unit grain + curve intensity table into `value_basis_from_damage_modeling_v2_5.json`. Recast the $/MWdc-normalizable benchmarks onto the buckets (`benchmark_value_damage_crosswalk.csv/json`) with a comparability verdict. Emit the hail-size→DR lookup (`damage_curve_intensity_reference.csv/json`). Write `02_crosswalks/<pair>_value_damage_crosswalk.md` + `02_crosswalks/README.md`.
9. **Distribute flat copies** to `data/` in both CSV and JSON, pair-name-prefixed.
10. **Generate metadata & validation.** Write `manifest.md` (files table + value basis + added-files), `validation_vX_Y.json` (checks + row counts + key numbers), `VALIDATION_REPORT_vX_Y.md` (PASS checklist + key values), `HANDOFF_SUMMARY.md` (highest-value numbers + main gap), and a `CHANGELOG.md` entry with the non-scope disclaimer.
11. **Guardrails throughout:** never define pass/fail bands; always separate event severity from annual AAL; always record the metric frame; treat gated numbers as pathways not benchmarks; keep the "a number is not automatically a benchmark" discipline.

---

## Appendix A — Canonical constants (reuse or re-derive per pair)

```
Solar default installed TIV:            $1,120,000 / MWdc   (100.00%)
Solar default physical replaceable:     $  877,796 / MWdc   ( 78.37%)   (README rounds to $877,800)
Excluded sunk/soft/nonphysical:         $  242,204 / MWdc   ( 21.63%)
PV_ARRAY module hardware (M3 cap):      $  291,215 / MWdc   ( 26.00% installed / 33.18% physical)
Unallocated replacement fieldwork:      $  106,869 / MWdc   (  9.54%)
PV_ARRAY + fieldwork:                   $  398,084 / MWdc   ( 35.54%)
MOUNTING (tracker/racking):             $  153,264 / MWdc   ( 13.68%)
PV_ARRAY + mounting + fieldwork:        $  551,347 / MWdc   ( 49.23%)
Hail curve max_DR (failure unit):       1.0
Stow adjustment (v2.5 placeholder):     D50 + 8mm, max_DR = 0.90  (T4 / not claims-calibrated)
Hazard axis:                            mesh_diameter_mm, valid 0–100, clamp_or_warn
Module archetype curve IDs:             HAIL_SOLAR_FRAGILE_THIN_GG, HAIL_SOLAR_DEFAULT_3P2_GBS, HAIL_SOLAR_HARDENED_THICKER
```

## Appendix B — The 15 solar_hail sources (ID → availability → primary use)

```
KWH_SRA_2026_OPEN_PAGE            HAS_GATED_NUMBERS      PRIMARY_BENCHMARK_CANDIDATE / SCREENING
KWH_SRA_2025_PDF                  HAS_OPEN_NUMBERS       PRIMARY / SECONDARY
KWH_POWERMAG_RESILIENCY_CASE_2025 HAS_OPEN_NUMBERS      PRIMARY / CASE_STUDY_ONLY
KWH_NEXTPOWER_TELEMATICS_2026     HAS_PATHWAY_ONLY       PRIMARY / SOURCE_DISCOVERY
AXIS_SOLAR_VS_HAIL_2025           HAS_OPEN_NUMBERS       PRIMARY_BENCHMARK_CANDIDATE
AXIS_GALLAGHER_RE_RISK_INSURANCE_2026 HAS_OPEN_NUMBERS  SECONDARY_BENCHMARK
GCUBE_HAIL_NO_2023_PUBLIC_SUMMARIES  HAS_OPEN_NUMBERS   PRIMARY / SECONDARY
VDE_HAIL_RISK_INTELLIGENCE        HAS_GATED_NUMBERS      PRIMARY_BENCHMARK_CANDIDATE
VDE_CIRRUS_NATCAT_REPORTS         HAS_GATED_NUMBERS      PRIMARY_BENCHMARK_CANDIDATE
VDE_2025_STOW_SUCCESS_CASES       HAS_OPEN_NUMBERS       CASE_STUDY_ONLY / MECHANISM_ONLY
RENEW_RISK_SCS_SOLAR_MODEL_2026   HAS_GATED_NUMBERS      PRIMARY / SOURCE_DISCOVERY
JS_HELD_HAIL_DAMAGE_SOLAR_2024    HAS_OPEN_NUMBERS       CASE_STUDY_ONLY / SECONDARY
DOE_FEMP_HAIL_MITIGATION_PV       NO_DIRECT_RENEWABLE_NUMBERS_FOUND  MECHANISM_ONLY
USPVDB_V4_0_2026                  HAS_OPEN_NUMBERS       DENOMINATOR_ONLY
EIA_860_2025_EARLY_RELEASE        HAS_OPEN_NUMBERS       DENOMINATOR_ONLY
```
