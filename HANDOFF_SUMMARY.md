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

## v0.3 — solar_flood pair

Solar × flood is now the second deep-dive pair. See `01_pairs/solar_flood/README.md`.

### The only open numbers that normalize to $/MW

| Source | Open number | On the value ladder |
|---|---|---|
| DEPCOM flood response case | avoided loss `~$43,478/MW` (92 MW) | 3.88% installed TIV; 29.6% of the PRIMARY electrical failure-unit bucket |
| VDE/AXIS peril-mix | `~$32.61/MW` (13-yr portfolio aggregate) | 0.003% installed TIV — near zero per MW |
| Valdora 15 MW | `$0/MW` measured physical damage | genuine measured zero; well-elevated site, major flood, no damage |

### Main gap / scarcity finding

```text
Isolated solar-flood $/MW physical severity is genuinely scarce. There is NO clean
per-event physical-damage $/MW in open sources. The most reliable open dollars are
litigation totals (First Solar/Zurich ~$10.1M asserted; South Alexander ~$1.1M) that
lack a MW denominator and are dominated by deductible/BI structure. We say this plainly
rather than manufacturing a severity.
```

### Crosswalk is RESOLVED against Damage_Modeling (v0.3.1)

```text
02_crosswalks/solar_flood_value_damage_crosswalk.md is RESOLVED_FROM_DAMAGE_MODELING.
- The value ladder is reusable (peril-agnostic), so denominators are known.
- The canonical flood_solar cell in Damage_Modeling DOES exist and is used here verbatim.
- The flood grain is 8 named failure units (mostly electrical): FS_INV, FS_SWG, FS_XFMR,
  FS_COMB, FS_SCADA, FS_CABLE, FS_FOUND, FS_PVMOD — NOT PV module glass.
- Derived buckets: PRIMARY depth-driven electrical (INV+SWG+XFMR+COMB+SCADA) ~$146,947/MWdc
  (13.12% TIV); ALL 8 failure units ~$538,607/MWdc (48.09% TIV).
- The depth->DR table now uses the REAL piecewise-linear ordinates from the flood_solar curve
  artifact (public-source-anchored engineering parameterization, NOT claims-calibrated).
- Elevation / freeboard is the dominant mitigation knob (USACE: +1 ft freeboard cuts AAL ~82%).
- NOTE: v0.3 originally invented a single FLOOD_ELECTRICAL_BOS bucket (~$217,279/MWdc) and marked
  the crosswalk PENDING; v0.3.1 corrects this to the canonical grain.
```

### Output files

```text
01_pairs/solar_flood/README.md — deep-dive dossier
01_pairs/solar_flood/benchmark_number_matrix.csv — 34-row numeric table (3 rows normalize to $/MW)
01_pairs/solar_flood/source_matrix.csv — 32-source coverage matrix
01_pairs/solar_flood/source_registry.json — 32-source registry
02_crosswalks/solar_flood_value_damage_crosswalk.md — RESOLVED crosswalk (canonical flood_solar grain)
data/*_solar_flood.* — package-level copies
```
