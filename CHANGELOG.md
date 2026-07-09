# Changelog

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
