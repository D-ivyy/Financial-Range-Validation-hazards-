# Solar × strong / straight-line convective wind — value and damage-model cross-reference

**Version:** v0.7
**Created:** 2026-07-13 (resolved against canonical `Damage_Modeling` artifacts)
**Status:** `RESOLVED_FROM_DAMAGE_MODELING`
**Parent pair dossier:** [`../01_pairs/solar_strong_wind/README.md`](../01_pairs/solar_strong_wind/README.md)
**Related repos:** [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling) (canonical subsystems + damage curves) · [`Hazard_Modeling`](https://github.com/aamani-ai/Hazard_Modeling) (M0→M4 engine + RangeCompare dashboard)
**Purpose:** cross-reference open utility-scale-PV strong-wind benchmark numbers to the project value ledger and the **canonical `strong_wind_solar` failure-unit grain + gust-demand→DR curve** from `Damage_Modeling`. This file does **not** define calibration pass/fail rules.

---

## 0. The rule

This file is a **denominator / grain crosswalk**, not a validation source.

```text
External reports provide reference numbers.
The value workbook tells us what denominator those numbers imply.
The canonical strong_wind_solar damage artifact tells us which failure-unit value the wind curve actually damages.
```

So this crosswalk helps answer:

```text
Does a benchmark $/MW number look like per-array straight-line-wind physical damage, or a blended NatCat/hail loss?
Which named failure units (tracker, racking, module-attach, foundation, exposed-SCADA) does it cover?
Is it a tracker (single-axis) or a fixed-tilt architecture loss?
Is it straight-line/derecho wind, or is it contaminated by hail / tornado / TC (out of this cell's scope)?
Does it probably include BI, deductibles, net/gross claim effects?
```

It should **not** be used to tune a curve by itself. The crosswalk classifies comparability; it never tunes a curve.

---

## 1. Upstream artifacts used (this is a Case A — RESOLVED — crosswalk)

Both required upstream artifacts exist in `Damage_Modeling` and are used here verbatim:

```text
value workbook:
  docs/method/value_basis/solar_wind_value_breakdown.xlsx / Summary + Solar_Map  -> AVAILABLE (peril-agnostic value ladder)

canonical strong-wind damage artifact:
  docs/cells/strong_wind_solar/current/
    strong_wind_solar__model_v1_0__docs_r3__curve_artifact.json                  -> AVAILABLE (5 failure units + thresholded-logistic demand DR parameters)
    damage_curve_records_v1_0_strong_wind_solar.xlsx                             -> AVAILABLE (per-failure-unit value shares + DR ordinates)
```

> **Scope / naming note.** The canonical cell is named `strong_wind_solar` (hazard_asset); this FRV pair is slugged `solar_strong_wind` (asset_hazard) — same cell. Its v1.0 curve family is a **thresholded-logistic demand curve** on a 3-second-gust-at-array-height axis, `R_eff = (V_3s / V_design)^2 · mult`. It represents **straight-line / synoptic / derecho / microburst** convective wind only. **Tornado and hurricane/TC are fenced out** (quarantined) — the v1.0 cell does not carry tornado-vortex or TC-duration loading. A separate **PROPOSED v2.0** artifact (non-canonical, promotion not performed) splits fixed-tilt vs single-axis-tracker into two screening pathways; it is handled in the companion [`solar_strong_wind_v2_proposed_value_damage_crosswalk.md`](solar_strong_wind_v2_proposed_value_damage_crosswalk.md) and is **NOT** used here.

### 1.1 Strong-wind failure grain differs from flood and hail

```text
hail  failure unit:  PV_MODULE_GLASS_CELL (subsystem PV_ARRAY)          -> modules break; material-share concentration
flood failure units: 8 named units, mostly electrical                  -> geometry/elevation exposure, threshold-like state curves
wind  failure units: 5 named units, structural + attachment            -> material/structural capacity vs gust-demand ratio, thresholded-logistic curves
```

The strong-wind curve form is a **thresholded logistic on the dimensionless demand ratio** `R_eff = (V_3s / V_design)^2 · mult` (DR = 0 below the per-unit `R0` threshold, then `max_DR / (1 + exp(-k·(R_eff − R50)))`), `f_kind` is **material/structural capacity** (not geometry/elevation, not material-BOM-share), and the cell **owns severity only** — EAL / PML / VaR / TVaR are downstream (hazard catalog + financial model), never in this cell.

---

## 2. Canonical strong-wind failure-unit value buckets

From the canonical `strong_wind_solar` v1.0 artifact and the solar value ladder (physical replaceable base `$877,796 / MWdc`, installed TIV `$1,120,000 / MWdc`):

| Failure unit | Subsystem | Value share (physical) | `$/MWdc` (physical) | max_DR | R0 | R50 | k |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `SWS_TRACKER_STRUCT` | MOUNTING | `8%` | `$70,224` | `0.80` | `0.75` | `1.15` | `9.0` |
| `SWS_RACKING_STRUCT` | MOUNTING | `6%` | `$52,668` | `0.75` | `0.80` | `1.25` | `8.0` |
| `SWS_MODULE_ATTACH` | PV_ARRAY | `40%` | `$351,118` | `0.65` | `0.70` | `1.05` | `10.0` |
| `SWS_FOUNDATION_UPLIFT` | FOUNDATION | `8%` | `$70,224` | `0.45` | `0.90` | `1.35` | `7.0` |
| `SWS_SCADA_EXPOSED` | SCADA | `2%` | `$17,556` | `0.15` | `0.70` | `0.95` | `6.0` |

```text
primary structural aggregate (TRACKER + RACKING + MODULE_ATTACH + FOUNDATION) = $544,234 / MWdc = 62.0% of physical replaceable value.
SWS_SCADA_EXPOSED is a secondary open-seam and is EXCLUDED from the default aggregate.
```

> **Architecture caveat (load-bearing).** `SWS_TRACKER_STRUCT` and `SWS_RACKING_STRUCT` are **alternative** mounting architectures on any given plant — a site is either single-axis-tracker **or** fixed-tilt, not both. Summing the two mounting buckets (`$122,892 / MWdc`) overstates a single-architecture plant. `SWS_MODULE_ATTACH` (`40%`, `$351,118 / MWdc`) is the dominant wind-exposed value and applies to both architectures.

---

## 3. Benchmark numbers recast onto the canonical failure-unit buckets

The machine-readable recast is [`../01_pairs/solar_strong_wind/benchmark_value_damage_crosswalk.csv`](../01_pairs/solar_strong_wind/benchmark_value_damage_crosswalk.csv). Only **six** rows carry a valid `$/MWdc` normalization; the rest are blank-by-design (no MW denominator, a fraction/probability, a damage-state, or a mitigation cost).

| Benchmark | `$/MWdc` | `% installed TIV` | Maps to | Grain verdict |
| --- | --- | --- | --- | --- |
| AXIS failed-stow | `$380,000` | `33.9%` | MODULE_ATTACH + TRACKER (blended) | `LOW_GRAIN_MISMATCH` |
| AXIS fixed-tilt | `$340,000` | `30.4%` | RACKING + MODULE_ATTACH (blended) | `LOW_GRAIN_MISMATCH` |
| AXIS successful-hail-stow | `$150,000` | `13.4%` | MODULE_ATTACH (hail-mitigated residual) | `LOW_GRAIN_MISMATCH` |
| AXIS glass upgrade | `$50,000` | `4.5%` | (mitigation cost) | `NOT_A_LOSS` |
| NREL/DOE Q1-2024 TIV | `$1,120,000` | `100%` | (installed-TIV cross-check) | `NOT_A_LOSS` |
| Solar physical-replaceable | `$877,796` | `78.4%` | (physical-replaceable cross-check) | `NOT_A_LOSS` |

```text
Every AXIS $/MW figure is HAIL-STOW framed and blends module + mounting (+ downtime), so none isolates straight-line-wind DR.
The two AXIS stow figures ($380k failed vs $150k successful) mostly measure a STOW-BEHAVIOR swing, not a wind-intensity DR.
The $342M AXIS gross-claim example has NO MW denominator -> $/MW is WITHHELD (blank), per the golden rule.
The FEMP-derived $1.5M/MW top tier exceeds installed TIV -> a GRAIN WARNING (repair+debris+replace > TIV), NOT evidence of DR>1.
```

Damage-state and fraction rows (Cedar Rapids derecho liftoff at ~140 mph vs 120 mph design; Soltec ~1–2% tracker collapse; Oakey ~2,000 modules; NEXTracker 25-yr failure probability) inform the **shape** of the tracker / module-attach / foundation curves but carry **no dollars** and are not normalizable.

---

## 4. Damage-curve intensity reference (CANONICAL strong_wind_solar demand→DR)

The machine-readable table is [`../01_pairs/solar_strong_wind/damage_curve_intensity_reference.csv`](../01_pairs/solar_strong_wind/damage_curve_intensity_reference.csv). Using a reference ground-mount design gust `V_design = 115 mph` (ASCE 7-22 §29.4.5, Risk Category II, `mult = 1.0`):

```text
gust 3s   R_eff   MODULE_ATTACH DR   struct-agg %TIV
 115 mph   1.00       0.245              9.4%
 130 mph   1.28       0.590             25.3%
 150 mph   1.70       0.649             31.4%
 170 mph   2.19       0.650             31.7%
 200 mph   3.02       0.650             31.7%

This is an anchor plot, not a distribution.
```

The struct-aggregate damage ratio plateaus near `~31.7%` of installed TIV at extreme gusts because each failure unit is capped at its own `max_DR` (module-attach `0.65`, tracker `0.80`, foundation `0.45`). The plateau is a **hardware cap**, not a probability ceiling.

---

## 5. How this changes future source acquisition

```text
1. The single highest-value acquisition is a cat-model straight-line-wind damage function for solar
   (Verisk/AIR solar codes 500-514/3001-3023, or Moody's RMS renewable convective-wind curves, or Renew Risk).
   These CONFIRM SLW is modeled as a distinct solar function; only the ordinates are gated.
2. Second: a VDE/Cirrus or broker PML/AAL run with the WIND peril line itemized separately from hail.
3. Third: forensic per-array $ losses from a NAMED derecho/microburst event with a stated MW and gust,
   to convert the AXIS blended stow figures into an isolated straight-line-wind $/MWdc.
```

---

## 6. Practical caveat to carry into the pair dossier

```text
No public source cleanly isolates pure straight-line / convective-wind $ severity for utility-scale solar.
Every open $/MW figure is either hail-stow framed (AXIS), hail-dominant (GCube), tornado-parametric (Descartes),
generic all-property SCS (Gallagher/Aon/Swiss Re), or gated (cat models, VDE/Cirrus).
The strongest OPEN solar-wind evidence is engineering/screening grade: stow-behavior failure probabilities
(NEXTracker), aeroelastic onset (~40 m/s galloping, CPP), load ratings (PVEL tracker 1800 Pa vs fixed 2400 Pa),
and forensic damage states (Cedar Rapids derecho, Oakey, Soltec). The installed-TIV basis $1,120,000/MWdc is
EXACT-confirmed by NREL/DOE Q1-2024 ($1.12/W-dc).
```

---

## 7. Machine-readable files

```text
../01_pairs/solar_strong_wind/value_basis_from_damage_modeling.json       (canonical value + FU grain, RESOLVED)
../01_pairs/solar_strong_wind/benchmark_value_damage_crosswalk.csv/.json  (benchmark recast onto FU buckets)
../01_pairs/solar_strong_wind/damage_curve_intensity_reference.csv/.json  (canonical demand->DR reference)
```

**Non-scope reminder:** this crosswalk is a source-pathway / normalization layer, **not** a calibration harness. It defines no pass/fail bands, tunes no curve, and treats no raw number as a validated benchmark.
