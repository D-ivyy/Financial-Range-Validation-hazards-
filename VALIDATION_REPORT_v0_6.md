# Validation report — v0.6

Addition: a **PROPOSED / NON-CANONICAL v2.0 (docs r1) two-pathway preview** for the `wind_convective_wind` pair's `wind_tornado_wind` damage cell. This is an **additive, parallel preview** — it does not alter, supersede, or downgrade the existing v0.5 `RESOLVED_FROM_DAMAGE_MODELING` crosswalk.

**Related repos:** [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling) (canonical subsystems + damage curves) · [`Hazard_Modeling`](https://github.com/aamani-ai/Hazard_Modeling) (M0→M4 engine + RangeCompare dashboard).

> **Non-canonical fence (load-bearing).** `v1.0 docs r4` is **STILL the canonical `Damage_Modeling` runtime artifact** for `wind_tornado_wind` (`current_pin = wind_tornado_wind@model_v1_0__docs_r4`). The staged `v2.0 docs r1` candidate previewed here is `canonical_runtime_artifact: false`, `promotion_status: proposed`, `lifecycle_state: candidate`, `promotion: not_performed`, and is deliberately absent from the artifact index and portable library v2.5. This report documents the preview only; it is not a validation of, or basis for promoting, v2.

- Staged v2 source artifacts read from `/home/user/workspace/v2_proposed_source/`: PASS (`OLD_VS_NEW_COMPARISON` CSV, `README`, `cell_CHANGELOG.json`, `VALUE_CROSSWALK` CSV, `curve_artifact.json`, `capability.json`, `SOURCE_REGISTER` CSV)
- v1.0-resolved pair files read to mirror schema: PASS (`value_basis_from_damage_modeling.json`, `benchmark_value_damage_crosswalk.csv/json`, `damage_curve_intensity_reference.csv/json`, pair `README.md`, crosswalk `.md`)
- v1.0-resolved files left byte-unchanged: **PASS** — no existing canonical file content was modified
- New `value_basis_from_damage_modeling_v2_PROPOSED.json` created: PASS — 5 failure units (1 curve-bearing, 4 withheld/support), mirrors v1.0 schema (`renewable_loss_value_damage_crosswalk.v1`)
- New `benchmark_value_damage_crosswalk_v2_proposed.csv/json` created: PASS — **27 rows**, same benchmark IDs as v1.0, `v2_direct_damage_grain_comparability` + `denominator_note` columns added
- New `damage_curve_intensity_reference_v2_proposed.csv/json` created: PASS — **24 rows** (12 speed points × 2 pathways: `straight_line_convective`, `tornado_direct_hit`), built directly from the staged `OLD_VS_NEW_COMPARISON_wind_tornado_wind__model_v2_0__docs_r1.csv`
- New crosswalk narrative `wind_convective_wind_v2_proposed_value_damage_crosswalk.md` created in `02_crosswalks/`: PASS
- `02_crosswalks/README.md` updated with a new v2-preview row (existing `wind_convective_wind` row unchanged): PASS
- Pair `README.md` updated with an additive "v2 two-pathway PROPOSED preview" section (existing content unchanged): PASS
- Anchor `00_anchor/renewable_loss_reference_source_pathways.md` §5.7 updated with an additive v0.6 paragraph (existing v0.5 note unchanged): PASS
- `data/` flat copies created (5 files: 1 JSON value-basis + 2 CSV/JSON pairs): PASS
- `99_metadata/manifest.md`, `bibliography.md` (33 new source-register entries), `HANDOFF_SUMMARY.md`, `CHANGELOG.md`, root `README.md` updated additively: PASS
- All new `*v2*.json` files parse as valid JSON: **PASS**
- No git commit/push performed; no writes outside `/tmp/frv`: PASS

Row counts above are computed directly from the new CSV/JSON files and equal the values recorded in `99_metadata/validation_v0_6.json`.

## v1.0 canonical vs v2 proposed — side-by-side

| | v1.0 docs r4 (CANONICAL) | v2.0 docs r1 (PROPOSED) |
|---|---|---|
| Runtime status | `canonical_runtime_artifact: true`, promoted | `canonical_runtime_artifact: false`, `proposed`, `candidate` |
| Pathways | 1 shared curve family, boolean `tornado_variant` | 2 independently governed: `straight_line_convective`, `tornado_direct_hit` |
| Damage-consuming units | 5 independent structural units, summed | 1 turbine-equipment atom, mutually-exclusive ordered states |
| Denominator | `$1,623,000/MW` physical base | `$1,090,000/MW` turbine-equipment assembly |
| Curve form | logistic-on-speed-ratio | `ordered_damage_state_lognormal` |
| Consumer action required | none (unchanged) | **none** — `promotion: not_performed` |

## Value ladder reconciliation (SAME under v1.0 and v2 — peril-agnostic)

```text
WT_TURBINE_EQUIPMENT_ASSEMBLY (v2, curve-bearing)  =  $1,090 / kW   ($1,090,000 / MW)
WT_FOUNDATION (withheld)                            =    $120 / kW
WT_EXTERNAL_ELECTRICAL (withheld)                   =     $72 / kW
WT_CIVIL_INFRA (withheld)                           =     $47 / kW
  withheld direct-other subtotal: 120 + 72 + 47 = 239
WT_REPLACEMENT_SUPPORT (support_once)               =    $294 / kW
  fieldwork 100 + transport/logistics 194 = 294

Physical reference total:  1090 + 239 + 294 = 1,623 USD/kW    [CHECK: PASSES — matches v1.0 physical base exactly]
Excluded sunk/soft/nonphysical:                       345 USD/kW
Installed reference total:  1,623 + 345 = 1,968 USD/kW        [CHECK: PASSES — matches v1.0 installed TIV exactly]

Equipment share of physical base:   1090/1623 = 0.671595810227973
Equipment share of installed capex: 1090/1968 = 0.553861788617886
```

## DR intensity reference (24 rows, 12 per pathway)

```text
straight_line_convective: 12 rows, speeds [25,28,36,45,51,55,59.5,65,67,69,70,80] m/s
  evidence load-anchor range 28-55 m/s; flag <28, flag >55, WITHHOLD >70 (blank cells at 80 m/s, never zero)

tornado_direct_hit: 12 rows, same 12 speeds
  field anchors: DS2 ~51 m/s (Jacksboro rotor damage), DS3 65-69 m/s bracket (Greenfield collapse transition)
  zero below 25 m/s; flag >80 m/s terminal-saturation; all 12 rows carry numeric v2 DR values (none withheld)

Every row is tagged different_denominators_do_not_treat_as_regression_target (copied verbatim from the
staged OLD_VS_NEW_COMPARISON source) — v2's turbine-equipment atom is not comparable to v1.0's 5-unit sum.
```

## Benchmark recast (27 rows, same IDs as v1.0)

```text
v1.0 verdict distribution (unchanged structurally under v2 — no new open $/MW severity data was created):
  NOT_GRAIN_COMPARABLE            5
  DENOMINATOR_ONLY                5
  INTENSITY_AXIS_ANCHOR           4
  CONTEXT_NOT_BENCHMARK           3
  QUALITATIVE_FAILURE_MODE_ONLY   3
  DIFFERENT_METRIC_FAMILY         3
  CURVE_FORM_ANALOG               2
  GRAIN_ANCHOR_LOWER_BOUND        1
  QUARANTINED_OUT_OF_SCOPE        1

25 of 27 usd_per_MW cells remain blank under the v2 recast (same 2 value-ladder denominator rows normalize).
Each row's new denominator_note explains its placement against the $1,090,000/MW turbine-equipment atom.
```

## Source register additions (33 entries, added to `99_metadata/bibliography.md`)

```text
SLC-S001..SLC-S016  (16)  straight_line_convective pathway sources (Buffalo Ridge, downburst LES/OpenFAST,
                          wind-tunnel microburst, IEC 61400-1, Storm Events climatology, NSSL taxonomy, etc.)
TOR-S001..TOR-S012  (12)  tornado_direct_hit pathway sources (ASCE 7-22 tornado profiles, EF-scale, Greenfield
                          2024 forensic/FEA, Jacksboro 2022 damage survey, Bouchard & Romanic 2023, etc.)
VAL-S001             (1)  NREL Cost of Wind Energy Review 2024 — defines the 1,090/239/294/345 USD/kW ladder
ADJ-S001..ADJ-S002   (2)  adjacent/deferred hurricane-TC sources (Rose et al. 2012 PNAS; NREL hurricane-resilient
                          design 2024) — explicitly defer_neighboring_cell, never used to calibrate convective/tornado
LEG-S001..LEG-S002   (2)  legacy-audit sources: the v1.0 docs r4 artifact itself, and the Hazard_Modeling M3/M4
                          notebooks — retained as archive/migration audit provenance, not v2 evidence

All 33 entries copied verbatim (citation, URL, accessed_on date, decision, notes) from the staged
SOURCE_REGISTER_wind_tornado_wind__model_v2_0__docs_r1.csv.
```

## Findings / caveats

```text
- This is a PREVIEW, not a resolution. v1.0 docs r4 remains the canonical Damage_Modeling runtime; nothing
  in this report or its underlying files changes Hazard_runtime behavior, the artifact index, or the
  portable package v2.5. promotion: not_performed. promotion_gate.status: blocked.
- v2 proposes a materially different grain: ONE turbine-equipment atom ($1,090,000/MW) evaluated with
  mutually-exclusive ordered damage states, replacing v1.0's independent five-unit structural sum
  ($1,623,000/MW). The staged OLD_VS_NEW_COMPARISON source flags every row
  different_denominators_do_not_treat_as_regression_target — this file preserves that flag verbatim.
- No new open convective-wind $/MW severity data exists under v2 either. The same Flat Ridge 2 farm-level
  figure ($7.25M net, no MW denominator, no struck-turbine count) and the same 2020 derecho measured null
  remain the strongest anchors; their v2 grain-comparability verdicts are unchanged from v1.0.
- Both v2 pathways remain screening engineering proxies (all parameters Tier T4: placeholder/expert judgment).
  Straight-line convective has strong transient-load physics evidence (downburst LES, wind-tunnel, IEC 61400-1
  design provisions) but no matched modern-turbine load-to-repair-cost dataset. Tornado has field-supported
  anchors (Jacksboro ~51 m/s rotor damage; Greenfield 65-69 m/s collapse bracket) but turbine archetype,
  wind-height, control-state, debris, and capacity dispersion remain material open uncertainties.
- Equipment share labels (0.6716 physical, 0.5539 installed) are reporting labels only — NEVER an intrinsic
  DR cap. DS3 already reaches DR=1.0 on the 1,090 USD/kW denominator independent of these labels.
- No pass/fail bands are defined anywhere in this addition, and no curve is tuned. This remains a
  source-pathway / normalization layer, consistent with the rest of the package.
```
