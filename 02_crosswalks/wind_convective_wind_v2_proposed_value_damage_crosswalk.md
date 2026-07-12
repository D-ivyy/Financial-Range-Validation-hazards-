# Wind × convective wind (tornado + straight-line) — PROPOSED v2 two-pathway preview (non-canonical)

**Version:** v0.6
**Status:** `PROPOSED / NON-CANONICAL` — this is a preview, not a resolution and not a replacement
**Created:** 2026-07-11
**Parent pair dossier:** [`../01_pairs/wind_convective_wind/README.md`](../01_pairs/wind_convective_wind/README.md)
**Canonical companion (unchanged, still RESOLVED):** [`wind_convective_wind_value_damage_crosswalk.md`](wind_convective_wind_value_damage_crosswalk.md)
**Related repos:** [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling) (canonical subsystems + damage curves) · [`Hazard_Modeling`](https://github.com/aamani-ai/Hazard_Modeling) (M0→M4 engine + RangeCompare dashboard)
**Purpose:** this file IS a side-by-side preview of a PROPOSED, NON-CANONICAL v2.0 (docs r1) two-pathway wind_tornado_wind model, recast onto the same benchmark rows as the canonical crosswalk, so a reader can see how the grain and denominator would change *if and only if* v2 is ever promoted. This file IS NOT a validation source, IS NOT a calibration harness, defines NO pass/fail bands, and does NOT alter, supersede, or downgrade the canonical v1.0 crosswalk. **v1.0 docs r4 is STILL the canonical `Damage_Modeling` runtime artifact for `wind_tornado_wind`.**

---

## 0. Bottom line

```text
v1.0 docs r4                        -> STILL CANONICAL, STILL THE RUNTIME ARTIFACT. Unchanged by this file.
v2.0 docs r1 (this file's subject)  -> PROPOSED, NON-CANONICAL, lifecycle_state=candidate, promotion=not_performed.
                                        Deliberately absent from the artifact index and portable library v2.5.
what v2 proposes                    -> replace one shared D50-shift curve family with TWO independently governed
                                        pathways (straight_line_convective, tornado_direct_hit) sharing one
                                        turbine-equipment assembly atom evaluated as mutually-exclusive ordered
                                        damage states, instead of v1.0's five independently-summed structural units.
why this file exists                -> so the package carries an explicit, clearly-tagged preview of the proposal
                                        ALONGSIDE the canonical crosswalk, without touching anything canonical.
```

This file is a **source-pathway / normalization layer, NOT a calibration harness.** It defines no pass/fail bands, tunes no curve, and treats no number as a benchmark until its frame is understood (the Golden Rule). Every number below is copied verbatim from the staged v2 proposed source artifacts.

---

## 1. v1.0-canonical vs v2-proposed distinction

| | v1.0 docs r4 (CANONICAL, runtime) | v2.0 docs r1 (PROPOSED, non-canonical) |
|---|---|---|
| Status | `canonical_runtime_artifact: true`, promoted | `canonical_runtime_artifact: false`, `promotion_status: proposed`, `lifecycle_state: candidate` |
| Pathway structure | One top-level `V_3s_hub / Ve50` axis, boolean `tornado_variant` | Required first-class `pathway_id`: `straight_line_convective` and `tornado_direct_hit`, independently governed |
| Damage-consuming units | Independent blade/tower/nacelle/foundation/power-electronics SUM (5 units) | Mutually-exclusive **ordered** damage states on ONE repeated turbine-equipment assembly |
| Value crosswalk | Unreconciled component shares | Row-complete NREL CWER value crosswalk (this file's `VALUE_CROSSWALK_...csv`) |
| Curve form | `wind_tornado_logistic_ratio` (DR = max_DR / (1+exp(-k·(r-(D50+shift))))) | `ordered_damage_state_lognormal` (Q_j = Φ(ln(x/θ_j)/β_ln); DR = ΣP_j·c_j) |
| Denominator | `$1,623,000/MW` physical base (5-unit sum) | `$1,090,000/MW` turbine-equipment atom (1 unit only) |
| Executable tests | None called out | Pathway, equation, state, bounds, rejection, value, and migration KATs (per staged README) |
| Package status | Bundle v2 / emit v1 / capability v2 | Proposed bundle v3 / emit v2 / capability v3 |
| Consumer action | Pin as-is; unchanged | **None required.** `promotion: not_performed`; current pin remains `wind_tornado_wind@model_v1_0__docs_r4` |

```text
current_model_v1_0: unchanged
current_artifact_index: unchanged
portable_package_v2_5: unchanged
Hazard_runtime: unchanged
hurricane_curve: not_created
annual_frequency_and_tail_engine: not_owned_or_modified
promotion: not_performed
```

---

## 2. Two-pathway architecture (the proposal's shared cell / "common spine")

```text
wind_tornado_wind
├─ straight_line_convective
│  └─ downburst / microburst / macroburst / gust-front / local derecho outflow
└─ tornado_direct_hit
   └─ conditional severity after Hazard has resolved turbine intersection and local demand
```

Tropical-cyclone, nonconvective synoptic, and downslope wind remain **outside both branches** — the same fencing rule as v1.0.

Each pathway carries its **own** hazard axis, extrapolation policy, and capacity scenarios, but both evaluate the **same** curve form on the **same** turbine-equipment atom:

```text
straight_line_convective:
  axis: X_CONVECTIVE_ROTOR_EFFECTIVE_GUST_RATIO_TO_VE50  (dimensionless; x = rotor/hub 3s gust / iec_ve50_mps)
  curve_id: WTW2_SLC_TURBINE_EQUIPMENT_ORDERED_STATES
  beta_ln = 0.10, zero_below ratio = 0.35
  evidence load-anchor range: 28-55 m/s; flag <28, flag >55, WITHHOLD >70 m/s
  scenario medians (ratio):  lower=[0.75,0.90,1.15]  central=[0.90,1.05,1.30]  upper=[1.05,1.20,1.45]

tornado_direct_hit:
  axis: X_TORNADO_ROTOR_EFFECTIVE_PEAK_HORIZONTAL_SPEED  (m/s, absolute)
  curve_id: WTW2_TOR_TURBINE_EQUIPMENT_ORDERED_STATES
  beta_ln = 0.08, zero_below_mps = 25
  field anchors: DS2 ~51 m/s (Jacksboro rotor damage), DS3 65-69 m/s bracket (Greenfield collapse)
  extrapolation: zero <25 mps, flag >80 mps terminal-saturation, REJECT EF class without a wind proxy
  scenario medians (m/s):   lower=[32,45,58]  central=[36,51,67]  upper=[40,56,80]
```

Curve form (shared by both pathways):

```text
Q_j(x) = Phi( ln(x/theta_j) / beta_ln )
P0 = 1 - Q1;  P1 = Q1 - Q2;  P2 = Q2 - Q3;  P3 = Q3
DR = P1*c1 + P2*c2 + P3*c3
```

State cost ratios (shared by both pathways — mutually exclusive, ordered):

| State | Description | Cost ratio | Fraction |
|---|---|---:|---|
| DS0 | No direct damage | `0` | — |
| DS1 | Pitch/control repair proxy | `0.0119266` | `13/1090` |
| DS2 | Rotor-assembly replacement | `0.3091743` | `337/1090` |
| DS3 | Terminal turbine-equipment replacement | `1.0` | `1090/1090` |

Denominator for all four states: **`$1,090/kW`** (`$1,090,000/MW`) turbine-equipment assembly (rotor+pitch `337` + nacelle/drivetrain/power/yaw `477` + tower `276`).

Why ordered states, not independent sums (verbatim rationale): *"observations distinguish rotor damage with intact tower from terminal tower collapse, and terminal collapse makes independent component sums invalid."*

---

## 3. Value atom & ladder reconciliation

The **value ladder itself is unchanged** — it is peril-agnostic and the same NREL CWER 2024 basis used everywhere in this package. What changes under v2 is **which slice of it carries a curve.**

```text
WT_TURBINE_EQUIPMENT_ASSEMBLY (mapped, ONLY unit with a curve)  =  $1,090 / kW  ($1,090,000 / MW)
  rotor/pitch 337 + nacelle/drivetrain/power/yaw 477 + tower 276 = 1090

WT_FOUNDATION            (withheld)               =    $120 / kW
WT_EXTERNAL_ELECTRICAL   (withheld, split req'd)  =     $72 / kW
WT_CIVIL_INFRA           (withheld, split req'd)  =     $47 / kW
  withheld direct-other total: 120 + 72 + 47 = 239

WT_REPLACEMENT_SUPPORT   (support_once, outside DR) =   $294 / kW
  fieldwork 100 + transport/logistics 194 = 294

Physical reference total:  1090 + 239 + 294 = 1,623 USD/kW   <- matches v1.0 physical base EXACTLY
Excluded sunk/soft/nonphysical:                     345 USD/kW
Installed reference total:  1,623 + 345 = 1,968 USD/kW        <- matches v1.0 installed TIV EXACTLY
```

Ladder reconciles: `1090 + 239 + 294 = 1623`; `1623 + 345 = 1968`.

Equipment share labels (reporting only — **never** an intrinsic DR cap):

```text
equipment share of physical base    = 1090 / 1623 = 0.671595810227973
equipment share of installed capex  = 1090 / 1968 = 0.553861788617886
```

**Key comparability caveat.** v2 uses a **DIFFERENT denominator** (the `1,090` turbine-equipment atom) than v1.0 (which summed 5 independent structural units on the `1,623` physical base). The staged `OLD_VS_NEW_COMPARISON` file flags **every row** `different_denominators_do_not_treat_as_regression_target`. v2 uses mutually-exclusive ordered damage states — **no component summation**. This distinction must never be collapsed.

---

## 4. DR intensity reference summary (both pathways)

Full 24-row grid (12 speed points × 2 pathways) is in `../01_pairs/wind_convective_wind/damage_curve_intensity_reference_v2_proposed.csv/json`, built directly from the staged `OLD_VS_NEW_COMPARISON_wind_tornado_wind__model_v2_0__docs_r1.csv`. Selected anchors:

| Pathway | Speed | Ratio | Lower DR | Central DR | Upper DR | Flag |
|---|---:|---:|---:|---:|---:|---|
| straight_line_convective | 28 m/s | 0.471 | `0.0000000019` | `0.0` | `0.0` | within_load_anchor |
| straight_line_convective | 51 m/s | 0.857 | `0.0100456` | `0.0003669` | `0.0067466` | within_load_anchor |
| straight_line_convective | 55 m/s | 0.924 | `0.0375470` | `0.0025572` | `0.0252164` | within_load_anchor |
| straight_line_convective | 70 m/s | 1.176 | `0.3810309` | `0.1483314` | `0.2558988` | above_55_high_extrapolation |
| straight_line_convective | 80 m/s | 1.345 | — | — | — | withheld_above_70_mps |
| tornado_direct_hit | 51 m/s | 0.857 | `0.1607741` | `0.0479348` | `0.1079752` | screening_range (Jacksboro DS2 anchor) |
| tornado_direct_hit | 67 m/s | 1.126 | `0.6544909` | `0.3146658` | `0.4395533` | screening_range (Greenfield DS3 anchor) |
| tornado_direct_hit | 80 m/s | 1.345 | `0.9907964` | `0.6545859` | `0.6654147` | terminal_saturation_boundary |

Field anchors carried verbatim: **DS2 rotor damage ≈ 51 m/s** (Jacksboro), **DS3 terminal transition 65–69 m/s bracket** (Greenfield). Straight-line evidence load-anchor range is **28–55 m/s**; above 55 m/s is high extrapolation and above 70 m/s is **withheld** (blank cells in the CSV/JSON, never zero).

---

## 5. Benchmark grain-comparability verdicts (v2 recast)

The **same 27 benchmark rows** used in the canonical crosswalk are recast in `../01_pairs/wind_convective_wind/benchmark_value_damage_crosswalk_v2_proposed.csv/json`, with an added `v2_direct_damage_grain_comparability` verdict and a `denominator_note`. Verdicts are structurally unchanged (v2 does not create new open $/MW severity data), but every row's `denominator_note` now explains it against the `$1,090,000/MW` turbine-equipment atom instead of the `$1,623,000/MW` five-unit physical base:

```text
Flat Ridge 2 (net paid $7.25M, adjuster >$12M)  -> still NOT_GRAIN_COMPARABLE: whole-farm, no struck-turbine
                                                    count, no confirmed MW denominator, under EITHER grain.
2020 Midwest derecho measured null              -> still GRAIN_ANCHOR_LOWER_BOUND: sits below v2's
                                                    zero_below ratio=0.35 threshold too (a real zero, not 0).
NREL CWER installed / physical value-ladder rows -> still DENOMINATOR_ONLY, and now ALSO anchor the v2
                                                    1,090,000 USD/MW turbine-equipment sub-denominator.
Qualitative blade/tower observations (Benton,    -> still QUALITATIVE_FAILURE_MODE_ONLY, but under v2 they
Harper, Arbor Hills)                                would map to ONE mutually-exclusive ordered state
                                                    (DS1/DS2/DS3) on the shared atom, not an independent
                                                    WT_BLADE_STRUCT-only bucket.
Bouchard & Romanic fragility / NIST tower method -> still CURVE_FORM_ANALOG, but the v2 curve family is
                                                    ordered_damage_state_lognormal, a different functional
                                                    form than v1.0's logistic-on-ratio -- shape analog only.
FEMA NRI EAL, Moody's PML trend                  -> still DIFFERENT_METRIC_FAMILY / QUARANTINED_OUT_OF_SCOPE;
                                                    v2 does not change downstream-metric or hurricane fencing.
```

No zeros where a value is unknown or withheld — blank cells only.

---

## 6. Caveats

```text
- This file is a PROPOSED / NON-CANONICAL preview. v1.0 docs r4 remains the canonical Damage_Modeling
  runtime artifact for wind_tornado_wind. Nothing here changes Hazard_runtime behavior.
- The package is a source-pathway / normalization layer, NOT a calibration harness. No pass/fail bands
  are defined anywhere in this file, and no curve is tuned by anything in this file.
- v2 and v1.0 use DIFFERENT denominators (1,090 turbine-equipment atom vs 1,623 five-unit physical base).
  The OLD_VS_NEW_COMPARISON source flags every row different_denominators_do_not_treat_as_regression_target.
  Never treat a v2 DR as a drop-in replacement for, or a regression test against, a v1.0 DR.
- Both v2 pathways remain screening engineering proxies: all parameters are Tier T4 (placeholder / expert
  judgment). Straight-line convective has strong transient-load evidence but no matched modern-turbine
  load-to-repair-cost dataset. Tornado has a field-supported blade-damage anchor near 51 m/s and a Greenfield
  collapse transition around 65-69 m/s, but turbine archetype, wind-height, control-state, debris, and
  capacity uncertainty remain material.
- Direct nacelle, foundation, collection/substation, civil, and support-cost fragilities remain WITHHELD
  under v2, same as the withheld/split-required units already named upstream.
- Equipment share labels (0.6716 physical, 0.5539 installed) are NOT DR caps. DS3 already reaches DR=1.0
  on the 1,090 USD/kW denominator regardless of these labels.
- promotion_gate.status = blocked. Required before any canonical use: complete workbook + independent
  formula verification, bundle v3/emit v2/capability v3 schema review, all pathway KATs passing, the
  Hazard adapter loading one pinned artifact (removing hardcoded curves), height-profile/exposure/frequency/
  event-overlap seam corrections, a legacy-headline-free old-vs-new review, and an explicit repository
  promotion decision. None of these gates have been passed. promotion: not_performed.
```

---

## 7. Files

```text
01_pairs/wind_convective_wind/value_basis_from_damage_modeling_v2_PROPOSED.json
  PROPOSED value ladder (same numbers) + v2 two-pathway failure-unit / curve mapping + equipment shares

01_pairs/wind_convective_wind/benchmark_value_damage_crosswalk_v2_proposed.csv / .json
  same 27 benchmark rows recast onto the v2 turbine-equipment atom, with v2 verdict + denominator_note

01_pairs/wind_convective_wind/damage_curve_intensity_reference_v2_proposed.csv / .json
  24-row (12 x 2 pathway) DR lookup built directly from OLD_VS_NEW_COMPARISON_wind_tornado_wind__model_v2_0__docs_r1.csv

02_crosswalks/wind_convective_wind_v2_proposed_value_damage_crosswalk.md
  this file

data/wind_convective_wind_value_basis_from_damage_modeling_v2_PROPOSED.json
data/wind_convective_wind_benchmark_value_damage_crosswalk_v2_proposed.csv / .json
data/wind_convective_wind_damage_curve_intensity_reference_v2_proposed.csv / .json
  flat pair-name-prefixed copies of the 3 files above
```

**v1.0 docs r4 is STILL the canonical `Damage_Modeling` runtime for `wind_tornado_wind`.** This file and its companion data files are an additive, explicitly-tagged **PROPOSED / NON-CANONICAL** preview and must never be read as a resolution, calibration, or replacement of the existing crosswalk.
