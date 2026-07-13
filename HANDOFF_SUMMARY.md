# Handoff summary — v0.7 (solar_strong_wind added)

The package now holds **five hazard×asset pair dossiers**: `solar_hail` (v0.2), `solar_flood` (v0.3), `solar_wildfire` (v0.4), `wind_convective_wind` (v0.5–v0.6), and **`solar_strong_wind` (v0.7, NEW)**.

## v0.7 — solar_strong_wind (utility-scale PV × straight-line / severe-convective wind)

**Canonical crosswalk:** `RESOLVED_FROM_DAMAGE_MODELING` against the PROMOTED `strong_wind_solar` v1.0 cell (5 SWS_* failure units + thresholded-logistic demand→DR on the `SWS_GUST_3S_ARRAY_HEIGHT` axis). Solar value ladder: installed TIV `$1,120,000/MWdc` (exact-confirmed by NREL/DOE Q1-2024 `$1.12/W-dc`), physical replaceable `$877,796/MWdc` (78.4%). A staged, non-canonical two-architecture v2.0 screening preview accompanies it (does not alter the canonical crosswalk).

**Central finding:** no open public source isolates pure straight-line / convective-wind $ severity for utility-scale solar — every open dollar is hail-stow-framed, hail-dominant, tornado-parametric, generic-SCS, or gated.

### Highest-value open numbers (solar_strong_wind)

| Source | Open number | Caveat |
|---|---|---|
| AXIS | failed-stow `$380k/MW` · fixed-tilt `$340k/MW` · successful-hail-stow `$150k/MW` (+heat-strengthened glass `+$50k/MW`); peril share Hail 55 / Wildfire 23 / Tornado 18 | hail-stow framed, blended |
| GCube | hail avg `$58.4M/claim`; hail = `54%` of solar claim cost; wind a leading frequency driver | hail-dominant; wind is prevalence not severity |
| PVEL | tracker module `1800 Pa` vs fixed `2400 Pa`; MSS fail `7%→20%` | design-pressure split, not a loss |
| CPP | torsional galloping onset `<~40 m/s (~90 mph)` for un-stowed trackers | mechanism / v2 tracker axis |
| NEXTracker | 25-yr cumulative failure prob `1.7%–14.6%` by stow/site | probability, not single-event DR |
| Cedar Rapids 2020 derecho | ballasted liftoff `~140 mph` vs `120 mph` design | damage-state, no $ |
| NREL/DOE | utility-scale `$1.12/W-dc` = `$1,120,000/MWdc` TIV | EXACT TIV cross-check |

### Main gap (solar_strong_wind)

The single figure that would convert the AXIS blended stow `$/MW` into isolated straight-line-wind `$/MWdc` is a forensic per-array loss from a NAMED derecho/microburst with a stated MWdc denominator, measured peak 3s gust, and $ split by subsystem. That, plus the gated cat-model straight-line-wind solar damage functions (Verisk/AIR solar codes `500-514`/`3001-3023`; Moody's RMS; Renew Risk) and a VDE/Cirrus PML/AAL run with the wind peril line itemized, are the top retrieval targets.

---

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

---

## v0.5 handoff — wind_convective_wind pair (first wind-asset pair; CONVECTIVE-only scope)

`wind_convective_wind` is the fourth deep-dive pair and the **first wind-asset** pair. It covers onshore wind turbines under **CONVECTIVE wind only**: tornado [T] and straight-line/derecho [W], on the dimensionless speed-ratio axis `X_SPEED_RATIO_TO_IEC` (`r = V_3s_hub / Ve50_class`). Tornado = D50-shifted + `0.10` core-exposure fraction; straight-line/derecho = SLW (D50-baseline) pathway of the same canonical curves. **Hurricane/TC and hail-dominant SCS are quarantined** (`HURRICANE_TC`, `HAIL_CONTAMINATED_SCS`).

### Headline

The dominant finding is a grain problem, not a number: **only 2 of 27 benchmark rows normalize to $/MW** (the two value-ladder denominators). No isolated per-turbine convective-wind $/MW physical severity exists in the open literature. A tornado hits a narrow corridor, so farm-level dollars divided by full nameplate MW understate per-struck-turbine severity by an order of magnitude.

### Highest-value open evidence

| Source | Open number | Verdict |
|---|---|---|
| Flat Ridge 2 v. Underwriters at Lloyd's (tornado, KS 2012) | claim `$9.73M`; adjuster `>$12M`; paid `$7.25M` net of `$250K` deductible; 204 turbines / 66,000 acres | strongest open dollars, but no MW denom / struck count → WITHHELD (`NOT_GRAIN_COMPARABLE`) |
| 2020 Midwest derecho (MidAmerican) | no significant damage at `~126 mph` gust | measured NULL — empirical lower bound (`GRAIN_ANCHOR_LOWER_BOUND`) |
| Greenfield IA EF4 (2024) | 5–10 turbines collapsed; whole-event `$31.8M`; DOW gust `309–318 mph` | residential-dominated dollars + strong intensity anchor |
| Bouchard & Romanic 2023 (German tornado fragility) | logistic `v_m=49.1 m/s, k=0.504` | `CURVE_FORM_ANALOG` — shape only |
| FEMA NRI (Atlanta 11-county) | Tornado EAL `$146.6M` vs Strong-Wind EAL `$5.35M` | `DIFFERENT_METRIC_FAMILY` — annualized, downstream |
| Moody's "US wind PML" | `+58%` | `QUARANTINED_OUT_OF_SCOPE` — hurricane-contaminated |

### Damage grain

Crosswalk status `RESOLVED_FROM_DAMAGE_MODELING`: the canonical, PROMOTED `wind_tornado_wind` cell (`canonical_runtime_artifact=true`) gives 5 named WT_* structural failure units + real speed-ratio→DR logistic ordinates, all used verbatim. WT_NACELLE_CONSEQ `$559,935/MW` (28.45% TIV), WT_BLADE_STRUCT `$280,779/MW` (14.27%), WT_TOWER_STRUCT `$274,287/MW` (13.94%), WT_FOUNDATION_OT `$100,626/MW` (5.11%), WT_POWER_ELEC_ACCEL `$60,051/MW` (3.05%, secondary seam). Primary structural aggregate `$1,215,627/MW` (61.77% TIV); all-5 envelope `$1,275,678/MW` (64.82%). Value ladder = NREL CWER 2024 (installed TIV `$1,968,000/MW`; physical replaceable `$1,623,000/MW`).

### Main gap / next acquisition

The Flat Ridge 2 turbine-level loss schedule (struck count + per-unit split) is the single highest-value acquisition — it would convert the `$7.25M` net into the first clean per-struck-turbine `$/MW`. Second priority: insurer/broker per-turbine convective-wind claims coded by failure unit and IEC class.

### Output files

- `01_pairs/wind_convective_wind/README.md` — deep-dive dossier
- `01_pairs/wind_convective_wind/{benchmark_number_matrix.csv/json, source_matrix.csv, source_registry.csv/json}` — 27/77/77 rows
- `01_pairs/wind_convective_wind/{value_basis_from_damage_modeling.json, benchmark_value_damage_crosswalk.csv/json, damage_curve_intensity_reference.csv/json}`
- `02_crosswalks/wind_convective_wind_value_damage_crosswalk.md` — `RESOLVED_FROM_DAMAGE_MODELING`
- `99_metadata/validation_v0_5.json`, `VALIDATION_REPORT_v0_5.md`
- `data/*_wind_convective_wind.{csv,json}` flat copies

## v0.6 handoff — wind_convective_wind v2 PROPOSED / NON-CANONICAL preview (two-pathway candidate; does not alter v0.5)

A staged, **PROPOSED / NON-CANONICAL** v2.0 (docs r1) candidate for the `wind_tornado_wind` cell has been previewed alongside the v0.5 dossier, without touching it. v2 replaces the single shared D50-shift curve with **two independently governed pathways** — `straight_line_convective` and `tornado_direct_hit` — both evaluated as mutually-exclusive ordered damage states on a single `$1,090,000/MW` turbine-equipment-assembly atom, instead of v1.0's independent 5-unit structural sum on the `$1,623,000/MW` physical base. **`canonical_runtime_artifact: false`, `promotion_status: proposed`, `lifecycle_state: candidate`, `promotion: not_performed`** — the cell's `current_pin` remains `wind_tornado_wind@model_v1_0__docs_r4`, and v1.0 is still the canonical `Damage_Modeling` runtime.

### Headline

The value ladder is unchanged and reconciles identically under v2 (`1090+239+294=1623`; `1623+345=1968`). What changes is the grain: v2 evaluates ONE curve-bearing failure unit (`WT_TURBINE_EQUIPMENT_ASSEMBLY`, `$1,090,000/MW`) with ordered damage states, versus v1.0's five independently-summed structural units. Every DR row and every recast benchmark row is tagged `different_denominators_do_not_treat_as_regression_target`, copied verbatim from the staged `OLD_VS_NEW_COMPARISON` source.

### Damage grain (v2 proposed)

`WT_TURBINE_EQUIPMENT_ASSEMBLY` (curve-bearing) `$1,090/kW` = rotor/pitch `337` + nacelle/drivetrain/power/yaw `477` + tower `276`. Withheld direct-other: `WT_FOUNDATION` `$120/kW`, `WT_EXTERNAL_ELECTRICAL` `$72/kW`, `WT_CIVIL_INFRA` `$47/kW` (sum `239`). Support (`support_once`, outside DR): `WT_REPLACEMENT_SUPPORT` `$294/kW` (fieldwork `100` + transport/logistics `194`). State cost ratios shared by both pathways: DS0 `0`, DS1 `0.0119266` (`13/1090`), DS2 `0.3091743` (`337/1090`), DS3 `1.0`.

### Main gap / next steps (unchanged from v1.0's perspective)

No new open convective-wind `$/MW` severity data exists under v2 either — the same Flat Ridge 2 farm-level figure and the same 2020 derecho measured null remain the strongest anchors. The v2 candidate's `promotion_gate.status` is `blocked`: canonical use would require independent formula verification, schema review (bundle v3/emit v2/capability v3), all pathway KATs passing, Hazard-adapter migration to a single pinned artifact, and an explicit repository promotion decision. None of these gates have been passed.

### Output files (v0.6, additive)

- `01_pairs/wind_convective_wind/value_basis_from_damage_modeling_v2_PROPOSED.json`
- `01_pairs/wind_convective_wind/{benchmark_value_damage_crosswalk_v2_proposed.csv/json}` — 27 rows
- `01_pairs/wind_convective_wind/{damage_curve_intensity_reference_v2_proposed.csv/json}` — 24 rows (12 speeds × 2 pathways)
- `02_crosswalks/wind_convective_wind_v2_proposed_value_damage_crosswalk.md` — `PROPOSED_NONCANONICAL_FROM_DAMAGE_MODELING_V2`
- `99_metadata/validation_v0_6.json`, `VALIDATION_REPORT_v0_6.md`
- `data/wind_convective_wind_{value_basis_from_damage_modeling_v2_PROPOSED.json, benchmark_value_damage_crosswalk_v2_proposed.csv/json, damage_curve_intensity_reference_v2_proposed.csv/json}` flat copies
- 33 new source-register entries added to `99_metadata/bibliography.md` under a new "wind_convective_wind v2 proposed pathway sources" heading

**The v0.5 files listed above remain byte-unchanged and canonical.**
