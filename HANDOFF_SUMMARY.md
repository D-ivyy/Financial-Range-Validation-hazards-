# Handoff summary — solar × hail reference-source package v0.2

Solar × hail is now the first deep-dive pair under Range Validation Hazard Modeling.

## Highest-value open numbers

| Source | Open number |
|---|---|
| AXIS | successful stow `$150k/MW`, fixed tilt `$340k/MW`, failed tracker stow `$380k/MW`, heat-strengthened glass `+$50k/MW` |
| kWh SRA 2025 | hail = `73%` of financial losses but `6%` of loss incidents |
| kWh/POWER | 100 MW standard design AAL `$1.063M/year`; resilient design AAL `$0.308M/year`; `71%` AAL reduction |
| GCube | hail = `54%` of incurred solar loss costs, `1.4%` of claims, average claim `~$58.4M` |
| VDE | gated PML/AAL, PRE, Hail Atlas, BI, return interval and tilt/module outputs |

## Main gap

The strongest comparison-ready AAL/PML values are gated: VDE/Cirrus/GRC, kWh full SRA/model exports, Renew Risk, AXIS/GCube loss-run detail.

## Output files

- `README.md` — anchor
- `01_pairs/solar_hail/README.md` — deep-dive dossier
- `data/benchmark_number_matrix_solar_hail.csv` — numeric table
- `data/source_registry_solar_hail.json` — source registry


## v0.2 value / damage-model cross-reference

Added:

```text
02_crosswalks/solar_hail_value_damage_crosswalk.md
01_pairs/solar_hail/benchmark_value_damage_crosswalk.csv
01_pairs/solar_hail/damage_curve_intensity_reference.csv
data/solar_hail_value_basis_from_damage_modeling_v2_5.json
data/solar_hail_value_damage_crosswalk.csv/json
data/solar_hail_damage_curve_intensity_reference.csv/json
```

Key takeaway:

```text
The hail damage curve is PV_MODULE / PV_ARRAY grain.
The value workbook gives PV_ARRAY hardware value of $291,215/MWdc.
PV_ARRAY + unallocated replacement fieldwork is $398,084/MWdc.
AXIS fixed-tilt and failed-stow gross claim severities exceed module hardware value but are coherent as gross repair-cost / fieldwork-inclusive benchmarks.
```

Use this crosswalk to classify comparability. Do not use it as independent evidence that a curve parameter is correct.
