# Wind × convective wind (tornado + straight-line) — value and damage-model cross-reference

**Version:** v0.5
**Created:** 2026-07-11 (resolved against canonical `Damage_Modeling` artifacts)
**Status:** `RESOLVED_FROM_DAMAGE_MODELING`
**Parent pair dossier:** [`../01_pairs/wind_convective_wind/README.md`](../01_pairs/wind_convective_wind/README.md)
**Related repos:** [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling) (canonical subsystems + damage curves) · [`Hazard_Modeling`](https://github.com/aamani-ai/Hazard_Modeling) (M0→M4 engine + RangeCompare dashboard)
**Purpose:** cross-reference open onshore-wind convective-wind benchmark numbers to the project value ledger and the **canonical `wind_tornado_wind` failure-unit grain + speed-ratio→DR curve** from `Damage_Modeling`. This file does **not** define calibration pass/fail rules.

---

## 0. The rule

This file is a **denominator / grain crosswalk**, not a validation source.

```text
External reports provide reference numbers.
The value workbook tells us what denominator those numbers imply.
The canonical wind_tornado_wind damage artifact tells us which failure-unit value the wind curve actually damages.
```

So this crosswalk helps answer:

```text
Does a benchmark $/MW number look like per-turbine convective-wind physical damage, or a farm-average?
Which named failure units (blade, tower, nacelle, foundation, power-electronics) does it cover?
Is it a tornado (narrow-corridor, few struck turbines) or a straight-line/derecho (broad-footprint) loss?
Does it probably include BI, deductibles, net/gross claim effects?
Is it contaminated by hurricane/TC or hail (out of this cell's scope)?
```

It should **not** be used to tune a curve by itself. The crosswalk classifies comparability; it never tunes a curve.

---

## 1. Upstream artifacts used (this is a Case A — RESOLVED — crosswalk)

Both required upstream artifacts exist in `Damage_Modeling` and are used here verbatim:

```text
value workbook:
  docs/method/value_basis/solar_wind_value_breakdown.xlsx / Summary + Wind_Map  -> AVAILABLE (peril-agnostic value ladder)

canonical wind damage artifact:
  docs/cells/wind_tornado_wind/current/
    wind_tornado_wind__model_v1_0__docs_r4__curve_artifact.json                 -> AVAILABLE (5 failure units + logistic-ratio DR parameters)
    damage_curve_records_v1_0_wind_tornado_wind.xlsx                            -> AVAILABLE (per-failure-unit value shares + DR ordinates)
```

> **Scope / naming note.** The canonical cell is named `wind_tornado_wind`, but its curve family already spans the **full speed-ratio axis**. The straight-line-wind (SLW) pathway **is** the `D50` baseline, and tornado is a **leftward `D50` shift** of the *same* curves (plus a `0.10` tornado core-exposure fraction on the tornado pathway). There is **no separate strong-wind-for-wind cell** upstream, so in this crosswalk **straight-line/derecho convective wind is represented by the SLW (unshifted) pathway** and **tornado by the D50-shifted pathway** of these curves. Hurricane/TC is **fenced out** (quarantined) — it is a different peril family and is never folded into these curves.

### 1.1 Convective-wind failure grain differs from flood and hail

```text
hail  failure unit:  PV_MODULE_GLASS_CELL (subsystem PV_ARRAY)     -> modules break; material-share concentration
flood failure units: 8 named units, mostly electrical              -> geometry/elevation exposure, threshold-like state curves
wind  failure units: 5 named units, structural + consequential     -> material/structural capacity vs speed ratio, logistic curves
```

The wind curve form is a **logistic on the dimensionless speed ratio** `r = V_3s_hub / Ve50_class` (default IEC class **II**, `Ve50 = 59.5 m/s = 133.1 mph`), `f_kind` is **material/structural capacity** (not geometry/elevation, not material-BOM-share), and the cell **owns severity only** — EAL / PML / VaR / TVaR are downstream (hazard catalog + financial model), never in this cell.

---

## 2. Canonical convective-wind failure-unit value buckets

Value ladder is peril-agnostic (NREL CWER 2024, 2023 USD; installed TIV `$1,968,000/MW`, physical replaceable `$1,623,000/MW`, reference farm 200 MW). The **failure-unit buckets are the canonical `wind_tornado_wind` units**, with `$/MW = value_share_physical × $1,623,000`.

| Failure unit | Subsystem / component | Treatment | $/MW (phys) | % installed TIV | max DR | D50 (SLW) | k | tornado shift |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Installed TIV | — | denominator | $1,968,000 | 100.00% | — | — | — | — |
| Physical replaceable value | — | denominator | $1,623,000 | 82.47% | — | — | — | — |
| **WT_BLADE_STRUCT** | ROTOR_ASSEMBLY / BLADE | primary | $280,779 | 14.267% | 1.00 | 1.38 | 12 | −0.10 |
| **WT_TOWER_STRUCT** | TOWER / TOWER_SECTION | primary | $274,287 | 13.937% | 1.00 | 1.48 | 11 | −0.12 |
| **WT_NACELLE_CONSEQ** | NACELLE / GEARBOX·GEN·YAW | primary | $559,935 | 28.452% | 0.85 | 1.44 | 10 | −0.10 |
| **WT_FOUNDATION_OT** | FOUNDATION / FOUNDATION_BASE | primary | $100,626 | 5.113% | 0.65 | 1.62 | 9 | −0.08 |
| **WT_POWER_ELEC_ACCEL** | POWER_ELECTRONICS / POWER_CONVERTER | secondary (open seam) | $60,051 | 3.051% | 0.30 | 1.20 | 8 | −0.05 |
| **PRIMARY structural aggregate** (BLADE+TOWER+NACELLE+FOUNDATION) | — | derived sum | **$1,215,627** | **61.77%** | — | — | — | — |
| **ALL 5 failure-units** | — | derived sum | **$1,275,678** | **64.82%** | — | — | — | — |

Key interpretation:

```text
The default structural aggregate is the 4 include-in-aggregate units:
  BLADE + TOWER + NACELLE + FOUNDATION = ~$1,215,627/MW (61.77% of installed TIV, 74.9% of physical base).
POWER_ELECTRONICS is a SECONDARY conditional "open seam" and is EXCLUDED from the default aggregate;
it fires only in acceleration-sensitive scenarios, adding ~$60,051/MW (3.05% TIV) when included.

The NACELLE dominates the value ladder (~28% TIV) because the drivetrain (gearbox + generator) is the
single most expensive subsystem; a nacelle-consequential loss is therefore the largest single per-turbine
dollar bucket even though its max DR is capped at 0.85.

Contrast the flood grain (loss spread across ~8 electrical units, first-order cap ~$146,947/MWdc) and the
hail grain (single PV-module unit ~$291,215/MWdc): for convective wind the loss is STRUCTURAL and, at high
enough speed ratios, can approach whole-turbine replacement (~$1.28M/MW across all 5 units).
```

---

## 3. Benchmark numbers recast onto the canonical failure-unit buckets

Only the value-ladder anchors normalize cleanly to `$/MW`. **No open convective-wind benchmark provides a clean per-turbine physical-damage `$/MW`** — this thinness is itself the finding. The strongest dollar figure (Flat Ridge 2) is a **whole-farm** claim with no confirmed MW denominator and no struck-turbine count, so it is **withheld** from `$/MW` normalization.

| Benchmark row | sub-peril | reported | value-basis label | grain-comparability verdict |
| --- | --- | --- | --- | --- |
| NREL CWER installed value ladder | N/A | $1,968/kW | `installed_TIV` | `DENOMINATOR_ONLY` (anchors all $/MW) |
| NREL CWER physical replaceable | N/A | $1,623/kW | `physical_replaceable_value` | `DENOMINATOR_ONLY` |
| Flat Ridge 2 net paid claim | TORNADO | $7.25M net | `net_claim_after_deductible` | `NOT_GRAIN_COMPARABLE` (no MW denominator, no struck-turbine count) |
| Flat Ridge 2 adjuster estimate | TORNADO | >$12M | `gross_claim` | `NOT_GRAIN_COMPARABLE` |
| Greenfield IA EF4 whole-event | TORNADO | $31.8M | `gross_claim` | `NOT_GRAIN_COMPARABLE` (residential-dominated, not turbine-specific) |
| 2020 Midwest derecho — measured null | STRAIGHT_LINE_WIND | ~$0 turbine damage @126 mph | `gross_claim` | `GRAIN_ANCHOR_LOWER_BOUND` (real measured zero → blank not 0) |
| Bouchard & Romanic logistic params | TORNADO | v_m=49.1 m/s, k=0.504 | `unknown` | `CURVE_FORM_ANALOG` (German; shape only, not a US plug-in) |
| Moody's US wind PML trend | HURRICANE_TC | +58% | `unknown` | `QUARANTINED_OUT_OF_SCOPE` |
| GCube hail-contaminated SCS share | HAIL_CONTAMINATED_SCS | — | `unknown` | `CONTEXT_NOT_BENCHMARK` |
| FEMA NRI Tornado vs Strong-Wind EAL | TORNADO / SLW | $146.6M vs $5.35M | `unknown` | `DIFFERENT_METRIC_FAMILY` (annualized EAL, downstream) |

ASCII anchor — where the strongest open dollars sit relative to the per-turbine failure-unit ladder:

```text
This is an anchor plot, not a distribution.

per-turbine ALL-5 replacement cap  |████████████████████████████████████████| $1,275,678/MW (64.8% TIV)
per-turbine PRIMARY struct agg      |██████████████████████████████████▏      | $1,215,627/MW (61.8% TIV)
per-turbine NACELLE bucket          |█████████████████▌                       |   $559,935/MW (28.5% TIV)
Flat Ridge 2 net paid ($7.25M)      |  ??? no confirmed MW denominator — WITHHELD from $/MW axis
2020 derecho measured null          |· (empirical lower bound at r well below D50)
```

Read this as:

```text
- The ONLY grain-honest placements are (a) the value-ladder denominators and (b) the measured-zero
  derecho lower bound. Everything else is farm-level, annualized, intensity-only, or quarantined.
- Flat Ridge 2 ($7.25M net / >$12M adjuster) is a real, well-documented TORNADO loss, but a tornado
  damages a NARROW CORRIDOR of a farm, not the whole farm. Dividing by nameplate MW would understate
  per-struck-turbine severity by an order of magnitude. Without the struck-turbine count it CANNOT be
  placed on the per-MW failure-unit DR axis. (MW capacity is not even in the primary court filing.)
- The 2020 Midwest derecho is the single most useful straight-line anchor precisely because it is a
  measured near-ZERO: at ~126 mph gust (r well below the SLW D50) modern IEC-II turbines that feathered
  and yawed took no significant structural damage. That is the empirical low end of the SLW pathway.
- A $/MW that exceeds a failure-unit hardware cap is a GRAIN WARNING (wrong denominator / corridor
  effect), never evidence that DR > 1.
```

---

## 4. Damage-curve intensity reference (CANONICAL wind_tornado_wind speed-ratio→DR)

These are the **real** per-failure-unit damage ratios computed from the canonical `wind_tornado_wind` logistic-ratio parameters (hazard axis = speed ratio `r = V_3s_hub / Ve50`, IEC class II `Ve50 = 59.5 m/s`). They are **failure-unit DRs, not whole-turbine**. The **SLW** columns are the unshifted (straight-line/derecho) pathway; the **TOR** aggregate additionally bakes in the `0.10` tornado core-exposure fraction.

| V (m/s) | V (mph) | ratio r | BLADE (SLW) | TOWER (SLW) | NACELLE (SLW) | FOUND (SLW) | struct agg DR (phys, SLW) | struct agg %TIV (SLW) |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 20 | 44.7 | 0.336 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| 45 | 100.7 | 0.756 | 0.0006 | 0.0003 | 0.0009 | 0.0004 | 0.0004 | 0.0003 |
| 55 | 123.0 | 0.924 | 0.0038 | 0.0018 | 0.0055 | 0.0018 | 0.0027 | 0.0022 |
| 65 | 145.4 | 1.092 | 0.0246 | 0.0119 | 0.0325 | 0.0089 | 0.0182 | 0.0150 |
| 75 | 167.8 | 1.261 | 0.1925 | 0.0821 | 0.1211 | 0.0246 | 0.1148 | 0.0947 |
| 85 | 190.1 | 1.429 | 0.6417 | 0.3622 | 0.4007 | 0.0985 | 0.4079 | 0.3363 |
| 95 | 212.5 | 1.597 | 0.9308 | 0.7830 | 0.7032 | 0.2910 | 0.6884 | 0.5677 |
| 105 | 234.9 | 1.765 | 0.9909 | 0.9560 | 0.7994 | 0.5232 | 0.8072 | 0.6656 |
| 115 | 257.2 | 1.933 | 0.9987 | 0.9932 | 0.8439 | 0.6133 | 0.8489 | 0.7000 |

(Full grid `V = 20…115 m/s step 5`, with per-unit SLW **and** TOR columns, is in `data/wind_convective_wind_damage_curve_intensity_reference.csv/json`.)

Important caveats:

```text
- These are CANONICAL failure-unit DRs computed from the wind_tornado_wind v1.0 logistic-ratio parameters,
  NOT generic building wind vulnerability curves.
- The SLW (straight-line / derecho) pathway is the D50 baseline. Tornado is the SAME curve family shifted
  LEFT by the per-unit tornado_D50_shift (−0.08 to −0.12 in ratio units) and multiplied by the 0.10
  tornado core-exposure fraction (a tornado only strikes a narrow corridor of a farm).
- struct agg = physical-base-weighted sum over the 4 include-in-aggregate units (BLADE+TOWER+NACELLE+
  FOUNDATION). POWER_ELECTRONICS (secondary open-seam) is EXCLUDED from this aggregate.
- IEC class sets the denominator Ve50 (I 70 / II 59.5 / III 52.5 m/s). Class II is the default; a class-I
  machine sees a LOWER ratio at the same wind speed and therefore lower DR.
- The cell owns SEVERITY only. EAL / PML / VaR / TVaR are downstream — never derive a tail metric here.
- A per-MW dollar exceeding a failure-unit hardware cap is a grain warning, not DR > 1.
```

---

## 5. How this changes future source acquisition

| Needed field | Why it matters |
|---|---|
| `project_MW` (nameplate) **and** `struck_turbine_count` | converts a farm claim to per-turbine $/MW; without the struck count a tornado corridor loss cannot be placed on the DR axis |
| `installed_TIV`, `insured_value`, `physical_replacement_value` | resolves denominator ambiguity |
| `gross_physical_damage`, `BI`, `net_paid`, `deductible`, `sublimit` | separates physical damage from financial-layer loss |
| `hub_height_3s_gust_mps` (or 10 m gust), `EF_rating`, `IEC_class` | maps to `X_SPEED_RATIO_TO_IEC` (r = V_3s / Ve50) |
| `which failure units: WT_BLADE / WT_TOWER / WT_NACELLE / WT_FOUNDATION / WT_POWER_ELEC` | maps benchmark dollars to the correct canonical unit |
| `mitigation state: feathered / yawed / cut-out at time of event` | primary convective-wind mitigation knob (explains the derecho null) |
| `sub-peril tag: tornado vs straight-line/derecho vs hurricane vs hail-SCS` | keeps the [T]/[W] curves apart and quarantines hurricane/hail |

| Future source to acquire | What it would unlock |
|---|---|
| Insurer/broker per-turbine convective-wind claims by failure unit | first clean per-turbine $/MW severity, ties dollars to the DR curve |
| Flat Ridge 2 turbine-level loss breakout (struck count + per-unit) | converts the $7.25M net into a per-struck-turbine $/MW anchor |
| GCube / Moody's RMS SCS-specific (non-hurricane, non-hail) absolute values | isolates convective-wind AAL/PML from blended SCS |
| Forensic reports (NCEI/EPRI/NREL DOW) with hub-height gusts | tightens the intensity-axis anchors with measured speed ratios |

---

## 6. Practical caveat to carry into the pair dossier

```text
The wind × convective-wind crosswalk is RESOLVED against the canonical wind_tornado_wind cell in
Damage_Modeling. The failure grain is 5 named STRUCTURAL/consequential units (blade, tower, nacelle,
foundation; plus secondary power-electronics), NOT the flood electrical units or the hail PV-module unit.
Straight-line/derecho wind is the SLW (D50-baseline) pathway of these logistic-on-speed-ratio curves;
tornado is the same curves shifted left with a 0.10 core-exposure fraction; hurricane/TC and hail-SCS are
FENCED OUT. Benchmarks are normalized to installed TIV ($1,968,000/MW), physical replaceable value
($1,623,000/MW), and the canonical failure-unit buckets (primary structural aggregate ~$1,215,627/MW;
all-5 ~$1,275,678/MW). Speed-ratio->DR ordinates are the real logistic curves from the wind_tornado_wind
artifact — engineering parameterizations, not claims-calibrated. The crosswalk classifies comparability;
it does not tune a curve. Isolated convective-wind per-turbine $/MW severity is scarce: the strongest open
dollars are farm-level litigation/claim totals without MW denominators or struck-turbine counts (Flat
Ridge 2 $7.25M net), and the single best straight-line anchor is a MEASURED NULL (2020 Midwest derecho).
```

---

## 7. Machine-readable files

```text
data/wind_convective_wind_value_basis_from_damage_modeling.json
  canonical value ladder + 5 wind failure units (WT_*) with shares/$-per-MW + derived aggregate buckets

data/wind_convective_wind_value_damage_crosswalk.csv/json
  benchmark rows recast with value-basis label + grain-comparability verdict (golden-rule enforced)

data/wind_convective_wind_damage_curve_intensity_reference.csv/json
  canonical wind_tornado_wind per-failure-unit speed-ratio -> DR lookup (SLW + tornado pathways)
```
