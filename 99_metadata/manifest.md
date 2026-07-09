# Manifest — Range Validation Hazard Modeling v0.3

Generated: 2026-07-09

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

The solar_flood crosswalk is `PENDING_UPSTREAM_ARTIFACTS` — no solar-specific flood depth-damage artifact exists; the depth→DR reference is a generic-industrial proxy and the flood failure unit is electrical/BOS/foundation, not PV module glass.
