# Changelog

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

The solar_flood crosswalk is `PENDING_UPSTREAM_ARTIFACTS`: the peril-agnostic value ladder is reusable, but no solar-specific flood depth-damage artifact exists, and the flood failure unit is electrical/BOS/foundation rather than PV module glass. The depth→DR reference is a generic-industrial proxy (JRC/HAZUS/USACE), explicitly labeled generic.

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
