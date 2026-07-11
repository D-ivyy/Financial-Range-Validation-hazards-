# Validation report — v0.5

Pair added: `wind_convective_wind` (fourth deep-dive pair, and the **first wind-asset** pair, after `solar_hail`, `solar_flood`, and `solar_wildfire`).

**Related repos:** [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling) (canonical subsystems + damage curves) · [`Hazard_Modeling`](https://github.com/aamani-ai/Hazard_Modeling) (M0→M4 engine + RangeCompare dashboard).

> **Scope fence (load-bearing).** This pair covers onshore wind turbines under **CONVECTIVE wind only**: tornado [T] and straight-line/derecho [W]. The magnitude axis is the dimensionless speed ratio `X_SPEED_RATIO_TO_IEC` (`r = V_3s_hub / Ve50_class`, IEC class II default `Ve50 = 59.5 m/s = 133.1 mph`). Tornado is the **D50-shifted** pathway plus a `0.10` core-exposure fraction; straight-line/derecho is the **SLW (D50-baseline)** pathway of the **same** canonical curves (there is no separate strong-wind-for-wind cell upstream). Explicitly **OUT OF SCOPE** (named-and-quarantined, distinct perils): hurricane/tropical-cyclone wind (`HURRICANE_TC`) and hail-dominant SCS (`HAIL_CONTAMINATED_SCS`).

- Value workbook loaded with `artifact_tool` (`Damage_Modeling/docs/method/value_basis/solar_wind_value_breakdown.xlsx`, Wind_Map/Summary): PASS
- Wind damage artifact loaded: **PASS — canonical, PROMOTED `wind_tornado_wind` cell** (`Damage_Modeling/docs/cells/wind_tornado_wind/current/`, `canonical_runtime_artifact=true`, `damage_code_id=WIND_TORNADO_WIND_V1`)
- Wind DR ordinates available: **YES — real logistic-on-speed-ratio curves** used verbatim (`DR = max_DR / (1 + exp(-k*(r - (D50 + tornado_shift))))`); crosswalk status is `RESOLVED_FROM_DAMAGE_MODELING`
- Benchmark number matrix rows: 27
- Source matrix rows: 77
- Source registry entries: 77
- Benchmark value/damage crosswalk rows: 27
- Canonical wind_tornado_wind failure units: 5
- Speed-ratio → DR intensity-reference rows: 20 (V = 20…115 m/s, step 5; per-FU SLW + tornado DR + structural aggregate)
- Benchmark rows that normalize to a $/MW basis: **2 of 27** (the two value-ladder denominators only; every other `normalized_usd_per_MW` cell blank, never zero)
- Required files exist: PASS
- `data/` copies match pair-folder copies: PASS

Row counts above are computed directly from the CSV/JSON files and equal the values recorded in `99_metadata/validation_v0_5.json`.

## Key extracted values (canonical `wind_tornado_wind` failure units)

Value basis: NREL CWER 2024 (2023 USD, 200 MW reference farm). Installed TIV `$1,968,000/MW`; physical replaceable `$1,623,000/MW`; excluded sunk/soft/nonphysical `$345,000/MW`.

| Value | $/MW | % installed TIV |
|---|---:|---:|
| Installed TIV (denominator) | $1,968,000 | 100.000% |
| Physical replaceable value (denominator) | $1,623,000 | 82.470% |
| WT_NACELLE_CONSEQ (NACELLE — gearbox/generator/yaw; maxDR 0.85) | $559,935 | 28.452% |
| WT_BLADE_STRUCT (ROTOR_ASSEMBLY — blade; maxDR 1.0) | $280,779 | 14.267% |
| WT_TOWER_STRUCT (TOWER — tower section; maxDR 1.0) | $274,287 | 13.937% |
| WT_FOUNDATION_OT (FOUNDATION — overturning; maxDR 0.65) | $100,626 | 5.113% |
| WT_POWER_ELEC_ACCEL (POWER_ELECTRONICS — converter; maxDR 0.30; secondary open seam, NOT in default aggregate) | $60,051 | 3.051% |
| **PRIMARY structural aggregate (blade + tower + nacelle + foundation)** | **$1,215,627** | **61.77%** |
| **ALL-5 envelope (adds power-electronics seam)** | **$1,275,678** | **64.82%** |

## Normalized wind benchmarks

```text
Only the 2 value-ladder denominators (installed TIV $1,968,000/MW and physical replaceable $1,623,000/MW)
carry a $/MW value, and they are DENOMINATORS, not severity. 0 of the remaining 25 benchmark rows normalize
to a $/MW severity basis — every normalized_usd_per_MW cell is blank (never zero).

The strongest open dollar figure — Flat Ridge 2 v. Underwriters at Lloyd's (tornado, Kansas 2012-05-19):
claim submitted $9,728,755.38; adjuster estimate >$12M; paid $7,250,000 net of a $250,000 deductible on a
204-turbine, 66,000-acre farm — has NO MW denominator and NO struck-turbine count in the filing, so it is
WITHHELD from the $/MW axis (a tornado hits a narrow corridor; dividing by full nameplate MW would understate
per-struck-turbine severity by an order of magnitude).

The best straight-line/derecho anchor is a MEASURED NULL: MidAmerican reported no significant wind-farm damage
in the 2020 Midwest derecho at a ~126 mph gust, because turbines feathered / cut out. It is a real empirical
lower bound (blank $/MW), not a fabricated zero.
```

## Sub-peril family census

```text
benchmark rows (27):                        sources (77):
  TORNADO                14                    TORNADO                21
  N/A                     7                    CONVECTIVE_BLENDED     19
  STRAIGHT_LINE_WIND      3                    N/A                    19
  CONVECTIVE_BLENDED      1                    STRAIGHT_LINE_WIND     13
  HURRICANE_TC            1                    HURRICANE_TC            3
  HAIL_CONTAMINATED_SCS   1                    HAIL_CONTAMINATED_SCS   2

source availability (77): HAS_OPEN_NUMBERS 60 | HAS_GATED_NUMBERS 16 | HAS_PATHWAY_ONLY 1
```

## Crosswalk grain-comparability verdicts (27 rows)

```text
NOT_GRAIN_COMPARABLE            5   (farm-level dollars without a struck-turbine count, e.g. Flat Ridge 2)
DENOMINATOR_ONLY               5   (value-ladder / exposure numbers — a denominator, not severity)
INTENSITY_AXIS_ANCHOR          4   (measured gusts / EF ratings that place an event on the speed axis)
CONTEXT_NOT_BENCHMARK          3   (blended SCS narratives, premiums)
QUALITATIVE_FAILURE_MODE_ONLY  3   (forensic blade/tower observations — map to a failure unit, no dollars)
DIFFERENT_METRIC_FAMILY        3   (FEMA NRI EAL — annualized, downstream of this severity cell)
CURVE_FORM_ANALOG              2   (Bouchard & Romanic logistic fragility — shape only, not a US plug-in)
GRAIN_ANCHOR_LOWER_BOUND       1   (2020 derecho measured null)
QUARANTINED_OUT_OF_SCOPE       1   (Moody's hurricane-contaminated "US wind PML +58%")
```

## Findings / caveats

```text
- Isolated per-turbine convective-wind $/MW severity is genuinely ABSENT from the open literature. The
  strongest open dollars are FARM-LEVEL litigation/claim totals (Flat Ridge 2 $7.25M net) with no MW
  denominator and no struck-turbine count. Grain matters more here than in any other pair: a tornado hits
  a narrow corridor, so a farm-average $/MW mixes struck and untouched turbines.
- The best straight-line/derecho evidence is a MEASURED NULL (2020 Midwest derecho: no significant damage
  at ~126 mph because machines feathered/cut out). This is an empirical lower bound, carried as blank $/MW.
- Wrong-peril numbers are quarantined, not averaged in. Moody's "US wind PML +58%" is hurricane-contaminated
  (HURRICANE_TC) and RMS SCS is hail-heavy blended (HAIL_CONTAMINATED_SCS); both are kept out of the
  convective-wind figure.
- The convective-wind failure grain is the canonical 5 named wind_tornado_wind WT_* structural failure units
  (blade, tower, nacelle, foundation, power-electronics), driven by a dimensionless speed ratio
  r = V_3s_hub / Ve50_class, NOT the flood electrical units or the hail PV-module unit. WT_NACELLE_CONSEQ is
  the costliest single unit (28.45% TIV) because the drivetrain dominates turbine value.
- Tornado is the D50-SHIFTED pathway (each unit's D50 lowered by its tornado_shift) plus a 0.10 core-exposure
  fraction; straight-line/derecho is the D50-BASELINE (SLW) pathway of the SAME curves. There is no separate
  strong-wind-for-wind cell upstream, so the two sub-perils share one curve family with different D50s.
- FEMA NRI Tornado EAL ($146.6M) vs Strong-Wind EAL ($5.35M) for the Atlanta 11-county area are ANNUALIZED
  and DOWNSTREAM of this severity cell (owned by the hazard catalog + financial model). They are never mixed
  with event claim severity or folded into the DR curve.
- A future $/MW that exceeds a failure unit's value share is a grain warning (more units involved), NOT a
  damage ratio above 1.0. This dossier organizes and normalizes evidence; it does not validate or calibrate.
```
