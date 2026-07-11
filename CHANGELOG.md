# Changelog

## v0.5 — wind_convective_wind pair (first wind-asset pair; CONVECTIVE-only scope)

Created: 2026-07-11

Added the fourth hazard×asset deep-dive pair dossier and the **first wind-asset pair**, `wind_convective_wind`, mirroring the `solar_hail` / `solar_flood` / `solar_wildfire` structure. This pair covers onshore wind turbines under **CONVECTIVE wind only**: tornado [T] and straight-line/derecho [W]. The magnitude axis is the dimensionless speed ratio `X_SPEED_RATIO_TO_IEC` (`r = V_3s_hub / Ve50_class`, IEC class II default `Ve50 = 59.5 m/s = 133.1 mph`). Tornado = D50-shifted pathway + `0.10` core-exposure fraction; straight-line/derecho = SLW (D50-baseline) pathway of the **same** canonical curves (no separate strong-wind-for-wind cell exists upstream). **Hurricane/TC and hail-dominant SCS are named-and-quarantined** (`HURRICANE_TC`, `HAIL_CONTAMINATED_SCS`) so wrong-peril numbers are never averaged into a convective-wind figure.

```text
01_pairs/wind_convective_wind/README.md
01_pairs/wind_convective_wind/benchmark_number_matrix.csv/json     (27 rows, incl. sub_peril_family)
01_pairs/wind_convective_wind/source_matrix.csv                    (77 rows, wind-specific attribute cols)
01_pairs/wind_convective_wind/source_registry.csv/json             (77 sources, incl. sub_peril_family)
01_pairs/wind_convective_wind/value_basis_from_damage_modeling.json
01_pairs/wind_convective_wind/benchmark_value_damage_crosswalk.csv/json
01_pairs/wind_convective_wind/damage_curve_intensity_reference.csv/json   (20 speed-ratio rows)
02_crosswalks/wind_convective_wind_value_damage_crosswalk.md
data/benchmark_number_matrix_wind_convective_wind.csv/json
data/source_registry_wind_convective_wind.csv/json
data/wind_convective_wind_value_basis_from_damage_modeling.json
data/wind_convective_wind_value_damage_crosswalk.csv/json
data/wind_convective_wind_damage_curve_intensity_reference.csv/json
99_metadata/validation_v0_5.json
VALIDATION_REPORT_v0_5.md
```

Crosswalk status is **`RESOLVED_FROM_DAMAGE_MODELING`**: the canonical, PROMOTED `wind_tornado_wind` cell exists in [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling) (`docs/cells/wind_tornado_wind/current/`, `canonical_runtime_artifact=true`, `damage_code_id=WIND_TORNADO_WIND_V1`), so the **5 named WT_* structural failure units** (`WT_BLADE_STRUCT`, `WT_TOWER_STRUCT`, `WT_NACELLE_CONSEQ`, `WT_FOUNDATION_OT`, `WT_POWER_ELEC_ACCEL`), their per-unit value shares, AND the real speed-ratio→DR logistic ordinates (`DR = max_DR / (1 + exp(-k*(r - (D50 + tornado_shift))))`) are used verbatim. Value ladder = NREL CWER 2024 (installed TIV `$1,968,000/MW`; physical replaceable `$1,623,000/MW`). Primary structural aggregate `$1,215,627/MW` (61.77% TIV); all-5 envelope `$1,275,678/MW` (64.82% TIV); WT_NACELLE_CONSEQ alone `$559,935/MW` (28.45% TIV).

Key finding: **only 2 of 27 benchmark rows normalize to $/MW** (the two value-ladder denominators; every other `normalized_usd_per_MW` cell is blank, never zero). The strongest open dollars — Flat Ridge 2 v. Underwriters at Lloyd's (tornado, KS 2012-05-19: `$7.25M` net of a `$250K` deductible, adjuster `>$12M`, on a 204-turbine/66,000-acre farm) — are farm-level with no MW denominator or struck-turbine count and are WITHHELD from the $/MW axis. The best straight-line/derecho anchor is a **measured null** (2020 Midwest derecho: no significant turbine damage at ~126 mph gust because machines feathered/cut out) carried as a blank-$/MW empirical lower bound. Moody's hurricane-contaminated "US wind PML +58%" is tagged `QUARANTINED_OUT_OF_SCOPE`.

**Non-scope disclaimer (unchanged).** This package is a source-pathway / normalization layer, NOT a calibration harness. It defines no pass/fail bands, tunes no curve, and treats no raw number as a benchmark until its sub-peril frame, denominator, coverage, asset class, geography, and loss basis are understood. A $/MW exceeding a failure-unit hardware cap is a grain warning, not evidence that DR > 1.


## v0.4 — solar_wildfire pair (EXOGENOUS-only scope)

Created: 2026-07-10

Added a third hazard×asset deep-dive pair dossier, `solar_wildfire`, mirroring the `solar_hail` / `solar_flood` structure. This pair is deliberately scoped to the **EXOGENOUS (landscape-originated) wildfire physical-damage slice only**: fire ignites outside the site in vegetation, spreads, reaches the asset, and damages it via flame/radiant/ember/convective heat. The magnitude axis is **FSim conditional flame-length → fireline intensity**, not ecological burn severity (dNBR/MTBS = geography check only). Explicitly out of scope (named-and-deferred, distinct perils): endogenous/asset-originated fire (inverter, connector/wiring, combiner, module/junction-box, transformer, BESS thermal runaway), smoke/soiling optical generation loss, PSPS, and business interruption.

```text
01_pairs/solar_wildfire/README.md
01_pairs/solar_wildfire/benchmark_number_matrix.csv          (100 rows, incl. fire_origin_family)
01_pairs/solar_wildfire/source_matrix.csv                     (63 rows)
01_pairs/solar_wildfire/source_registry.json                 (63 sources, incl. fire_origin_family)
01_pairs/solar_wildfire/benchmark_value_damage_crosswalk.csv/json
01_pairs/solar_wildfire/damage_curve_intensity_reference.csv/json
01_pairs/solar_wildfire/value_basis_from_damage_modeling.json
02_crosswalks/solar_wildfire_value_damage_crosswalk.md
data/benchmark_number_matrix_solar_wildfire.csv/json
data/source_registry_solar_wildfire.csv/json
data/solar_wildfire_value_damage_crosswalk.csv/json
data/solar_wildfire_damage_curve_intensity_reference.csv/json
data/solar_wildfire_value_basis_from_damage_modeling.json
99_metadata/validation_v0_4.json
VALIDATION_REPORT_v0_4.md
```

Crosswalk status is **`RESOLVED_GRAIN_DR_WITHHELD`**: the canonical `wildfire_solar` cell exists in [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling) (`docs/cells/wildfire_solar/proposed/`), so the **11 named WS_* failure units** (`WS_MODULE_THERMAL`, `WS_RACKING_THERMAL`, `WS_MV_EQUIPMENT_SPLIT_REQUIRED`, `WS_DC_CABLE_EXPOSED`, `WS_INVERTER_CONTROL_DIRECT`, `WS_CIVIL_INFRA_SPLIT_REQUIRED`, `WS_FOUNDATION_REVIEW`, `WS_GROUNDING_LIGHTNING_REVIEW`, `WS_COMBINER_CONNECTOR`, `WS_SCADA_CONTROL_DIRECT`, `WS_SUPPORT_COST_ALLOCATION`) and their value shares are used verbatim (direct-hardware envelope ≈`$656,981/MWdc` = 58.66% TIV; PV module cap `$291,215/MWdc` = 26.00%). BUT the cell is a v0.1 scaffold with `ordinate_status=withheld` / `withheld_reason_codes=[NO_RUNTIME_CURVE]`, so **no damage ratio is available** and every DR ordinate cell is blank/`WITHHELD`. This is neither `PENDING` (the cell exists) nor curve-resolved.

Key finding: **0 of 100 benchmark rows normalize to a $/MW basis** — no isolated, properly-scoped exogenous-wildfire solar $/MW physical severity exists in the open literature. Every fire number carries a `fire_origin_family` tag so wrong-origin numbers are quarantined: the plentiful `ALL_CAUSE_PV_FIRE_BLENDED` (kWh/GCube) and `SMOKE_SOILING_GENERATION` numbers are tagged `CONTEXT_NOT_BENCHMARK` and never averaged into a wildfire figure. kWh's "84% equipment-driven" headline is flagged as unsupported by its own chart (= 100% − 16% wildfire, sweeping 27% unknown into "equipment"). Named events are origin-checked: CVSR 2019 (avian/electrical) and Mannum/Raywood (inverter) are `ENDOGENOUS_ASSET_ORIGINATED_FIRE` and excluded from the exogenous count.

This release does not change any existing benchmark source numbers, does not fabricate values, and does not define calibration pass/fail rules. Damage cells own severity curves only; EAL/PML/VaR/TVaR remain downstream.

## v0.3.1 — Resolve solar_flood crosswalk against canonical Damage_Modeling flood_solar cell

Created: 2026-07-09

Corrected the `solar_flood` crosswalk to the **canonical `flood_solar` grain** in [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling). The v0.3 build had shipped a single invented `FLOOD_ELECTRICAL_BOS` failure-unit bucket (~`$217,279/MWdc`, 19.4% installed TIV) and marked the crosswalk `PENDING_UPSTREAM_ARTIFACTS`, on the mistaken belief that no solar-flood damage artifact existed. It does: the canonical `flood_solar` v1.0 cell (`Damage_Modeling/docs/cells/flood_solar/current/`). The earlier *mechanism* (electrical / BOS / foundation inundation) was correct, but the grain, IDs, value numbers, and depth→DR curve were non-canonical.

This version replaces them with the canonical **8 named failure units** (`FS_INV`, `FS_SWG`, `FS_XFMR`, `FS_COMB`, `FS_SCADA`, `FS_CABLE`, `FS_FOUND`, `FS_PVMOD`), their exact value shares (primary depth-driven electrical bucket ≈`$146,947/MWdc` = 13.12% TIV; all-8-unit envelope ≈`$538,607/MWdc` = 48.09% TIV), and the **real per-failure-unit depth→DR ordinates** from the `flood_solar` curve artifact. Crosswalk status is now `RESOLVED_FROM_DAMAGE_MODELING`. Files rebuilt: `01_pairs/solar_flood/{value_basis_from_damage_modeling.json, benchmark_value_damage_crosswalk.csv, damage_curve_intensity_reference.csv}`, their `data/` copies, `02_crosswalks/solar_flood_value_damage_crosswalk.md`, `02_crosswalks/README.md`, `99_metadata/{manifest.md, validation_v0_3.json}`, `VALIDATION_REPORT_v0_3.md`, `HANDOFF_SUMMARY.md`, and the root `README.md` / anchor status rows. Added `Damage_Modeling` and [`Hazard_Modeling`](https://github.com/aamani-ai/Hazard_Modeling) related-repo links across the package.

This release does not change any benchmark source numbers, does not fabricate values, and does not define calibration pass/fail rules. Damage cells own severity curves only; EAL/PML/VaR/TVaR remain downstream.

## v0.3 — solar_flood pair

Created: 2026-07-09

Added a second hazard×asset deep-dive pair dossier, `solar_flood`, mirroring the `solar_hail` structure:

```text
01_pairs/solar_flood/README.md
01_pairs/solar_flood/benchmark_number_matrix.csv
01_pairs/solar_flood/source_matrix.csv
01_pairs/solar_flood/source_registry.json
01_pairs/solar_flood/benchmark_value_damage_crosswalk.csv
01_pairs/solar_flood/damage_curve_intensity_reference.csv
01_pairs/solar_flood/value_basis_from_damage_modeling.json
02_crosswalks/solar_flood_value_damage_crosswalk.md
data/benchmark_number_matrix_solar_flood.csv/json
data/source_registry_solar_flood.csv/json
data/solar_flood_value_damage_crosswalk.csv/json
data/solar_flood_damage_curve_intensity_reference.csv/json
data/solar_flood_value_basis_from_damage_modeling.json
```

The solar_flood crosswalk was originally shipped as `PENDING_UPSTREAM_ARTIFACTS` with a re-rolled electrical/BOS/foundation failure-unit bucket and a generic-industrial depth→DR proxy (JRC/HAZUS/USACE), on the mistaken belief that no solar-specific flood depth-damage artifact existed. **This was corrected in v0.3.1** (see above): the canonical `flood_solar` cell exists in `Damage_Modeling`, so the crosswalk is now `RESOLVED_FROM_DAMAGE_MODELING` against the canonical 8 failure units and real depth→DR curve. This v0.3 entry is retained as a historical record of the original build.

This release does not change any existing benchmark source numbers and does not define calibration pass/fail rules. Where isolated solar-flood $/MW severity is scarce, that scarcity is stated plainly (only 3 of 34 benchmark rows normalize to $/MW). No numbers were fabricated; every benchmark row traces to a real source in the findings.

## v0.2 — solar-hail value/damage cross-reference

Created: 2026-06-26

Added a denominator and grain crosswalk that links:

```text
external solar-hail benchmark numbers
solar_wind_value_breakdown.xlsx value buckets
hail_solar__model_v1_0__docs_r5__curve_artifact.json failure-unit grain
```

This release does not change any benchmark source numbers and does not define calibration pass/fail rules.
It makes the existing research more useful by showing which reference numbers are M3 module-damage-comparable versus which require M4 / gross claim / fieldwork / insurance-basis treatment.
