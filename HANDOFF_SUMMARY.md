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


---

## v0.4 handoff — solar_wildfire pair (EXOGENOUS-only scope)

`solar_wildfire` is the third deep-dive pair. It is scoped to the **EXOGENOUS (landscape-originated)** wildfire physical-damage slice only. Endogenous/asset-originated fire (inverter, connector, combiner, module, transformer, BESS), smoke/soiling generation loss, PSPS, and BI are named-and-deferred distinct perils.

### Headline

The dominant finding is a scope-and-origin problem, not a number: **0 of 100 benchmark rows normalize to a $/MW basis.** No isolated, properly-scoped exogenous-wildfire solar $/MW physical severity exists in the open literature.

### What each fire-origin family gives us

| Fire origin family | Sources | Verdict |
|---|---:|---|
| `EXOGENOUS_WILDFIRE_DIRECT` (in scope) | 6 | Real events (DEPCOM Kern, Wellington North, Beryl, Canyon Fire 2, Kings County, Energy Safe Vic) but only unit-counts / avoided-cost — no $/MW severity |
| `ALL_CAUSE_PV_FIRE_BLENDED` (context only) | 12 | kWh 44% inverter / "84% equipment"; GCube 16% count/20% cost — blends origins, `CONTEXT_NOT_BENCHMARK` |
| `SMOKE_SOILING_GENERATION` (separate peril) | 9 | CAISO ~13-30%, NREL 7.7%/19%, FEMP/OSTI 9.4-37.8% — generation/revenue, never physical damage |
| `ENDOGENOUS_ASSET_ORIGINATED_FIRE` (out of scope) | 3 | CVSR 2019 (avian/arc), Mannum & Raywood (inverter) — excluded from exogenous count |
| `HAZARD_INTENSITY_ENGINEERING` | 20 | FSim/FARSITE intensity + material CHF thresholds — curve shape only |
| `EXPOSURE_DENOMINATOR` | 13 | USPVDB, EIA-860, USFS FSim/WHP, NIFC — denominators only |

### Damage grain

Crosswalk status `RESOLVED_GRAIN_DR_WITHHELD`: the canonical `wildfire_solar` cell exists (11 WS_* failure units + value shares used verbatim; direct-hardware envelope $656,981/MWdc = 58.66% TIV, PV module cap $291,215/MWdc = 26.00%) but the DR ordinates are WITHHELD upstream (NO_RUNTIME_CURVE). No damage ratio is provided.

### Main gap / next acquisition

A solar-only cat-model wildfire AAL/PML run (RMS/Verisk) is the only realistic path to an open, properly-scoped exogenous-wildfire severity. Second priority: an insurer loss database split by ignition ORIGIN with exposure denominators, to turn the all-cause kWh/GCube numbers into a usable external-landscape subset.

### Output files

- `01_pairs/solar_wildfire/README.md` — deep-dive dossier
- `01_pairs/solar_wildfire/{benchmark_number_matrix.csv, source_matrix.csv, source_registry.json}` — 100/63/63 rows
- `02_crosswalks/solar_wildfire_value_damage_crosswalk.md` — `RESOLVED_GRAIN_DR_WITHHELD`
- `99_metadata/validation_v0_4.json`, `VALIDATION_REPORT_v0_4.md`
- `data/*_solar_wildfire.{csv,json}` flat copies
