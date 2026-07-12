# Manifest — Range Validation Hazard Modeling v0.4

Generated: 2026-07-10

## Files

| Path | Role |
|---|---|
| `README.md` | Anchor source-pathway registry and package front door |
| `loss_aggregation_discussion/` | Local symlink to cross-hazard M3-to-M4 aggregation methodology notes |
| `00_anchor/renewable_loss_reference_source_pathways.md` | Copy of the root source-pathway registry anchor |
| `01_pairs/solar_hail/README.md` | Deep-dive solar × hail source-pathway dossier |
| `01_pairs/solar_hail/benchmark_number_matrix.csv` | Normalized benchmark-number table for solar × hail |
| `01_pairs/solar_hail/source_matrix.csv` | Source × metric coverage matrix |
| `01_pairs/solar_hail/source_registry.json` | Machine-readable source registry for solar × hail |
| `data/benchmark_number_matrix_solar_hail.csv` | Package-level copy of benchmark matrix |
| `data/benchmark_number_matrix_solar_hail.json` | JSON benchmark matrix |
| `data/source_registry_solar_hail.csv` | Package-level source registry CSV |
| `data/source_registry_solar_hail.json` | Package-level source registry JSON |
| `99_metadata/bibliography.md` | Source URLs and notes |
| `99_metadata/manifest.md` | This manifest |

## Value basis used for normalization

- Installed value: `$1,120,000/MWdc`
- Physical replaceable value: `$877,800/MWdc`

## Validation scope

This package does not implement calibration or pass/fail comparison. It only organizes where the reference numbers come from and how they can be normalized later.


## v0.2 added files

```text
02_crosswalks/README.md
02_crosswalks/solar_hail_value_damage_crosswalk.md
data/solar_hail_value_basis_from_damage_modeling_v2_5.json
data/solar_hail_value_damage_crosswalk.csv
data/solar_hail_value_damage_crosswalk.json
data/solar_hail_damage_curve_intensity_reference.csv
data/solar_hail_damage_curve_intensity_reference.json
01_pairs/solar_hail/benchmark_value_damage_crosswalk.csv
01_pairs/solar_hail/damage_curve_intensity_reference.csv
01_pairs/solar_hail/value_basis_from_damage_modeling_v2_5.json
```

## v0.3 added files — solar_flood pair

```text
01_pairs/solar_flood/README.md
01_pairs/solar_flood/benchmark_number_matrix.csv
01_pairs/solar_flood/source_matrix.csv
01_pairs/solar_flood/source_registry.json
01_pairs/solar_flood/benchmark_value_damage_crosswalk.csv
01_pairs/solar_flood/damage_curve_intensity_reference.csv
01_pairs/solar_flood/value_basis_from_damage_modeling.json
02_crosswalks/solar_flood_value_damage_crosswalk.md
data/benchmark_number_matrix_solar_flood.csv
data/benchmark_number_matrix_solar_flood.json
data/source_registry_solar_flood.csv
data/source_registry_solar_flood.json
data/solar_flood_value_damage_crosswalk.csv
data/solar_flood_value_damage_crosswalk.json
data/solar_flood_damage_curve_intensity_reference.csv
data/solar_flood_damage_curve_intensity_reference.json
data/solar_flood_value_basis_from_damage_modeling.json
99_metadata/validation_v0_3.json
VALIDATION_REPORT_v0_3.md
```

The solar_flood crosswalk is `RESOLVED_FROM_DAMAGE_MODELING` (v0.3.1) — it uses the canonical `flood_solar` cell from `Damage_Modeling`: 8 named failure units (FS_INV, FS_SWG, FS_XFMR, FS_COMB, FS_SCADA, FS_CABLE, FS_FOUND, FS_PVMOD) with per-unit value shares and the real piecewise-linear depth→DR ordinates. Related repos: [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling), [`Hazard_Modeling`](https://github.com/aamani-ai/Hazard_Modeling).

## v0.4 added files — solar_wildfire pair (EXOGENOUS-only scope)

```text
01_pairs/solar_wildfire/README.md
01_pairs/solar_wildfire/benchmark_number_matrix.csv
01_pairs/solar_wildfire/source_matrix.csv
01_pairs/solar_wildfire/source_registry.json
01_pairs/solar_wildfire/benchmark_value_damage_crosswalk.csv
01_pairs/solar_wildfire/benchmark_value_damage_crosswalk.json
01_pairs/solar_wildfire/damage_curve_intensity_reference.csv
01_pairs/solar_wildfire/damage_curve_intensity_reference.json
01_pairs/solar_wildfire/value_basis_from_damage_modeling.json
02_crosswalks/solar_wildfire_value_damage_crosswalk.md
data/benchmark_number_matrix_solar_wildfire.csv
data/benchmark_number_matrix_solar_wildfire.json
data/source_registry_solar_wildfire.csv
data/source_registry_solar_wildfire.json
data/solar_wildfire_value_damage_crosswalk.csv
data/solar_wildfire_value_damage_crosswalk.json
data/solar_wildfire_damage_curve_intensity_reference.csv
data/solar_wildfire_damage_curve_intensity_reference.json
data/solar_wildfire_value_basis_from_damage_modeling.json
99_metadata/validation_v0_4.json
VALIDATION_REPORT_v0_4.md
```

The solar_wildfire crosswalk is `RESOLVED_GRAIN_DR_WITHHELD` (v0.4) — it uses the canonical `wildfire_solar` cell from `Damage_Modeling` (`docs/cells/wildfire_solar/proposed/`): 11 named WS_* failure units (WS_MODULE_THERMAL, WS_RACKING_THERMAL, WS_MV_EQUIPMENT_SPLIT_REQUIRED, WS_DC_CABLE_EXPOSED, WS_INVERTER_CONTROL_DIRECT, WS_CIVIL_INFRA_SPLIT_REQUIRED, WS_FOUNDATION_REVIEW, WS_GROUNDING_LIGHTNING_REVIEW, WS_COMBINER_CONNECTOR, WS_SCADA_CONTROL_DIRECT, WS_SUPPORT_COST_ALLOCATION) with per-unit value shares used verbatim, but the DR ordinates are WITHHELD upstream (NO_RUNTIME_CURVE), so no damage ratio is provided. Scope is the EXOGENOUS (landscape-originated) wildfire physical-damage slice only; endogenous/asset-originated fire, smoke/soiling generation loss, PSPS, and BI are named-and-deferred. 0 of 100 benchmark rows normalize to $/MW. Related repos: [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling), [`Hazard_Modeling`](https://github.com/aamani-ai/Hazard_Modeling).

## v0.5 added files — wind_convective_wind pair (onshore turbines; convective sub-perils, hurricane/hail fenced out)

```text
01_pairs/wind_convective_wind/README.md
01_pairs/wind_convective_wind/benchmark_number_matrix.csv
01_pairs/wind_convective_wind/benchmark_number_matrix.json
01_pairs/wind_convective_wind/source_matrix.csv
01_pairs/wind_convective_wind/source_registry.csv
01_pairs/wind_convective_wind/source_registry.json
01_pairs/wind_convective_wind/value_basis_from_damage_modeling.json
01_pairs/wind_convective_wind/benchmark_value_damage_crosswalk.csv
01_pairs/wind_convective_wind/benchmark_value_damage_crosswalk.json
01_pairs/wind_convective_wind/damage_curve_intensity_reference.csv
01_pairs/wind_convective_wind/damage_curve_intensity_reference.json
02_crosswalks/wind_convective_wind_value_damage_crosswalk.md
data/benchmark_number_matrix_wind_convective_wind.csv
data/benchmark_number_matrix_wind_convective_wind.json
data/source_registry_wind_convective_wind.csv
data/source_registry_wind_convective_wind.json
data/wind_convective_wind_value_basis_from_damage_modeling.json
data/wind_convective_wind_value_damage_crosswalk.csv
data/wind_convective_wind_value_damage_crosswalk.json
data/wind_convective_wind_damage_curve_intensity_reference.csv
data/wind_convective_wind_damage_curve_intensity_reference.json
99_metadata/validation_v0_5.json
VALIDATION_REPORT_v0_5.md
```

The wind_convective_wind crosswalk is `RESOLVED_FROM_DAMAGE_MODELING` (v0.5) — it uses the canonical, PROMOTED `wind_tornado_wind` cell from `Damage_Modeling` (`docs/cells/wind_tornado_wind/current/`, `canonical_runtime_artifact=true`): 5 named WT_* failure units (WT_BLADE_STRUCT, WT_TOWER_STRUCT, WT_NACELLE_CONSEQ, WT_FOUNDATION_OT, WT_POWER_ELEC_ACCEL) with per-unit value shares AND the real speed-ratio→DR logistic ordinates (hazard axis `X_SPEED_RATIO_TO_IEC`, r = V_3s_hub / Ve50_class). Scope is onshore wind turbines under CONVECTIVE wind: tornado [T] = D50-shifted pathway + 0.10 core-exposure fraction; straight-line/derecho [W] = SLW (D50-baseline) pathway of the same curves. HURRICANE/TC and HAIL-dominant SCS are named-and-quarantined. 2 of 27 benchmark rows normalize to $/MW (the value-ladder denominators only); the strongest open dollars (Flat Ridge 2 $7.25M net) are farm-level without an MW denominator and are withheld; the best straight-line anchor is a measured null (2020 Midwest derecho). Value ladder = NREL CWER 2024 (installed TIV $1,968,000/MW; physical replaceable $1,623,000/MW). Related repos: [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling), [`Hazard_Modeling`](https://github.com/aamani-ai/Hazard_Modeling).

## v0.6 added files — wind_convective_wind v2 PROPOSED / NON-CANONICAL preview (two-pathway candidate; does not alter v0.5)

```text
01_pairs/wind_convective_wind/value_basis_from_damage_modeling_v2_PROPOSED.json
01_pairs/wind_convective_wind/benchmark_value_damage_crosswalk_v2_proposed.csv
01_pairs/wind_convective_wind/benchmark_value_damage_crosswalk_v2_proposed.json
01_pairs/wind_convective_wind/damage_curve_intensity_reference_v2_proposed.csv
01_pairs/wind_convective_wind/damage_curve_intensity_reference_v2_proposed.json
02_crosswalks/wind_convective_wind_v2_proposed_value_damage_crosswalk.md
data/wind_convective_wind_value_basis_from_damage_modeling_v2_PROPOSED.json
data/wind_convective_wind_benchmark_value_damage_crosswalk_v2_proposed.csv
data/wind_convective_wind_benchmark_value_damage_crosswalk_v2_proposed.json
data/wind_convective_wind_damage_curve_intensity_reference_v2_proposed.csv
data/wind_convective_wind_damage_curve_intensity_reference_v2_proposed.json
99_metadata/validation_v0_6.json
VALIDATION_REPORT_v0_6.md
```

The v0.6 addition previews a staged, **PROPOSED / NON-CANONICAL** v2.0 (docs r1) candidate for the `wind_tornado_wind` cell (`canonical_runtime_artifact=false`, `promotion_status=proposed`, `lifecycle_state=candidate`, `promotion=not_performed`, deliberately absent from the artifact index and portable library v2.5). It splits the single shared D50-shift curve into **two independently governed pathways** — `straight_line_convective` and `tornado_direct_hit` — both evaluated as mutually-exclusive ordered damage states (`ordered_damage_state_lognormal`) on a single `$1,090,000/MW` turbine-equipment-assembly atom, rather than v1.0's independent 5-unit structural sum on the `$1,623,000/MW` physical base. The same 27 benchmark rows are recast with a `v2_direct_damage_grain_comparability` verdict; the intensity reference has 24 rows (12 speed points × 2 pathways), built directly from the staged `OLD_VS_NEW_COMPARISON_wind_tornado_wind__model_v2_0__docs_r1.csv`. **The v0.5 `RESOLVED_FROM_DAMAGE_MODELING` files above are UNCHANGED and remain canonical** — the cell's `current_pin` is still `wind_tornado_wind@model_v1_0__docs_r4`.
