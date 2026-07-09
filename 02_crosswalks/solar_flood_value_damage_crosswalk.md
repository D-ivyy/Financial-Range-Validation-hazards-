# Solar × flood — value and damage-model cross-reference

**Version:** v0.3.1
**Created:** 2026-07-09 (corrected 2026-07-09 against canonical `Damage_Modeling` artifacts)
**Status:** `RESOLVED_FROM_DAMAGE_MODELING`
**Parent pair dossier:** [`../01_pairs/solar_flood/README.md`](../01_pairs/solar_flood/README.md)
**Related repos:** [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling) (canonical subsystems + damage curves) · [`Hazard_Modeling`](https://github.com/aamani-ai/Hazard_Modeling) (M0→M4 engine + RangeCompare dashboard)
**Purpose:** cross-reference open solar-flood benchmark numbers to the project value ledger and the **canonical `flood_solar` failure-unit grain + depth→DR curve** from `Damage_Modeling`. This file does **not** define calibration pass/fail rules.

---

## 0. The rule

This file is a **denominator / grain crosswalk**, not a validation source.

```text
External reports provide reference numbers.
The value workbook tells us what denominator those numbers imply.
The canonical flood_solar damage artifact tells us which failure-unit value the flood curve actually damages.
```

So this crosswalk helps answer:

```text
Does a benchmark $/MW number look like electrical-inundation physical damage?
Which named failure units (inverter, switchgear, transformer, combiner, SCADA, cable, foundation, module) does it cover?
Does it require replacement labor / fieldwork (cleanup, drying, re-termination)?
Does it probably include BI, deductibles, net/gross claim effects?
```

It should **not** be used to tune a curve by itself. The crosswalk classifies comparability; it never tunes a curve.

---

## 1. Upstream artifacts used (this is a Case A — RESOLVED — crosswalk)

Both required upstream artifacts exist in `Damage_Modeling` and are used here verbatim:

```text
value workbook:
  docs/method/value_basis/solar_wind_value_breakdown.xlsx / Summary   -> AVAILABLE (peril-agnostic value ladder)

canonical flood damage artifact:
  docs/cells/flood_solar/current/
    flood_solar__model_v1_0__docs_r3__curve_artifact.json             -> AVAILABLE (8 failure units + depth->DR ordinates)
    damage_curve_records_v1_0_flood_solar.xlsx / Value_Link sheet     -> AVAILABLE (per-failure-unit value shares)
```

> **Correction note (v0.3.1).** The v0.3 build shipped a single invented `FLOOD_ELECTRICAL_BOS` bucket (~`$217,279/MWdc`, 19.4% TIV) and marked this crosswalk `PENDING_UPSTREAM_ARTIFACTS`, on the mistaken belief that no solar-flood damage artifact existed. That was wrong. The canonical `flood_solar` cell **does** exist. The earlier *mechanism* (electrical / BOS / foundation inundation) was correct, but the grain, IDs, value numbers, and depth→DR curve were non-canonical. This version replaces them with the canonical **8 named failure units** and the **real depth→DR ordinates**, and lifts the crosswalk out of PENDING.

### 1.1 Flood failure grain differs from hail

```text
hail  failure unit: PV_MODULE_GLASS_CELL  (subsystem PV_ARRAY)   -> modules are the thing that breaks; material-share concentration
flood failure units: 8 named units, mostly electrical              -> geometry/elevation exposure, threshold-like state curves
```

`Damage_Modeling` states this explicitly: *"same framework as hail × solar, but not the same physical pattern. Hail × solar had one primary failure-unit and material-share concentration. Flood × solar has multiple electrical failure-units and geometry/elevation exposure."* The curve form is **piecewise-linear / state** (flood damage is threshold-like), the hazard x-axis is **`FLOOD_LOCAL_DEPTH_COMPONENT_DATUM`** (`h_i = max(0, WSE − z_i_crit)`, unit m), and `f_kind` is **geometry/elevation**, not material/BOM share.

---

## 2. Canonical flood failure-unit value buckets

Value ladder is peril-agnostic (identical denominators to solar_hail). The **failure-unit buckets are the canonical `flood_solar` units**, with `$/MWdc = installed_share × $1,120,000`.

| Failure unit | Subsystem / component | Role | $/MWdc | % installed TIV | Hazard axis |
| --- | --- | --- | ---: | ---: | --- |
| Installed TIV | — | denominator | $1,120,000 | 100.00% | — |
| Physical replaceable value | — | denominator | $877,796 | 78.37% | — |
| **FS_INV** | INVERTER_SYSTEM / INVERTER | primary | $32,306 | 2.884% | depth |
| **FS_SWG** | SUBSTATION / SWITCHGEAR | primary | $68,385 | 6.106% | depth |
| **FS_XFMR** | SUBSTATION / TRANSFORMER_MAIN | primary | $38,119 | 3.404% | depth |
| **FS_COMB** | INVERTER_SYSTEM / COMBINER_BOX + DC_PROTECTION | primary/secondary | $6,826 | 0.609% | depth |
| **FS_SCADA** | SCADA / MONITORING_SYSTEM | secondary | $1,310 | 0.117% | depth |
| **FS_CABLE** | ELECTRICAL_COLLECTION / CABLE_AC + CABLE_DC | conditional/secondary | $69,320 | 6.189% | depth/pathway |
| **FS_FOUND** | FOUNDATION / FOUNDATION_BASE | conditional/secondary | $31,124 | 2.779% | velocity/scour |
| **FS_PVMOD** | PV_ARRAY / PV_MODULE | conditional/secondary | $291,215 | 26.001% | depth (submersion) |
| **PRIMARY depth-driven electrical** (INV+SWG+XFMR+COMB+SCADA) | — | derived sum | **$146,947** | **13.120%** | — |
| **ALL 8 flood failure-units** | — | derived sum | **$538,607** | **48.090%** | — |

Key interpretation:

```text
The first-order flood cap for a typical ELEVATED utility array is the PRIMARY depth-driven electrical bucket:
  FS_INV + FS_SWG + FS_XFMR + FS_COMB + FS_SCADA = ~$146,947/MWdc (13.12% of installed TIV).
Add FS_CABLE for conduit water paths, FS_FOUND for scour narratives, and FS_PVMOD only for
low-clearance / full-submersion cases; the full 8-unit envelope reaches ~$538,607/MWdc (48.09% TIV).

Contrast the hail module-hardware cap of ~$291,215/MWdc (26.0% TIV): for hail the single PV_ARRAY
unit dominates; for flood the loss is spread across several electrical units and the modules are
usually NOT the failure unit.
```

---

## 3. Benchmark numbers recast onto the canonical failure-unit buckets

Only three open solar-flood benchmarks normalize to a $/MW basis, and all three are derived / sensitivity / zero. This thinness is itself the finding: **isolated solar-flood $/MW severity is genuinely scarce.**

| Benchmark row | $/MWdc | % installed TIV | % PRIMARY electrical | % ALL-8 units | % FS_INV | Comparison grain |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| DEPCOM AVOIDED LOSS PER MW SENSITIVITY | $43,478 | 3.88% | 29.59% | 8.07% | 134.6% | requires-failure-unit-allocation |
| VDE/AXIS FLOOD PER MW SENSITIVITY | $32.61 | 0.003% | 0.02% | 0.01% | 0.10% | portfolio-aggregate-only |
| VALDORA ZERO LOSS PER MW | $0 | 0.00% | 0.00% | 0.00% | 0.00% | measured-zero-lower-bound |

ASCII anchor (share of the PRIMARY depth-driven electrical bucket):

```text
Valdora zero-loss anchor        |                                                     0.0%   of PRIMARY electrical
VDE/AXIS portfolio per-MW        |                                                     0.02%  of PRIMARY electrical
DEPCOM avoided-loss per-MW       | ██████████████▊                                     29.6%  of PRIMARY electrical
```

Read this as:

```text
- DEPCOM's $43,478/MW avoided-loss sits at ~30% of the primary electrical bucket and ~8% of the full
  8-unit envelope — consistent with flood damaging a subset of PCS/inverters/switchgear (the DEPCOM
  case describes 10 of 40 PCS), NOT the modules. It exceeds FS_INV alone (134.6%), which correctly
  flags that more than the inverters were involved (a grain warning, not DR>1).
- Valdora shows the physical-damage floor is a genuine zero when a site is elevated with freeboard.
- VDE/AXIS portfolio aggregate (~$33/MW over 13 yr) confirms flood is a rare, small-share peril.
- No open source gives a clean per-event physical-damage $/MW. The most reliable open dollars are
  litigation totals (First Solar/Zurich ~$10.1M asserted; South Alexander ~$1.1M) without MW
  denominators, dominated by deductible/BI structure.
```

---

## 4. Damage-curve intensity reference (CANONICAL flood_solar depth→DR)

These are the **real** per-failure-unit damage ratios from the canonical `flood_solar` curve artifact (piecewise-linear, hazard axis = local depth above component datum, m). They are **failure-unit DRs, not whole-plant**.

| Depth m | FS_INV | FS_SWG | FS_XFMR | FS_COMB | FS_SCADA | FS_CABLE | FS_PVMOD | FS_FOUND |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 0.02 | 0.05 | 0.10 | 0.03 | 0.10 | 0.15 | 0.02 | 0.05 | 0.00 |
| 0.05 | 0.25 | 0.40 | 0.10 | 0.35 | 0.45 | 0.05 | 0.10 | 0.00 |
| 0.15 | 0.75 | 0.85 | 0.25 | 0.80 | 0.90 | 0.15 | 0.30 | 0.00 |
| 0.30 | 0.95 | 1.00 | 0.45 | 1.00 | 1.00 | 0.30 | 0.60 | 0.00 |
| 0.60 | 1.00 | 1.00 | 0.65 | 1.00 | 1.00 | 0.45 | 0.85 | 0.00 |
| 1.00 | 1.00 | 1.00 | 0.80 | 1.00 | 1.00 | 0.55 | 1.00 | 0.05 |
| 2.00 | 1.00 | 1.00 | 1.00 | 1.00 | 1.00 | 0.65 | 1.00 | 0.35 |
| 4.00 | 1.00 | 1.00 | 1.00 | 1.00 | 1.00 | 0.65 | 1.00 | 1.00 |

Important caveats:

```text
- These are CANONICAL failure-unit DRs from Damage_Modeling, not generic building depth-damage curves.
- SCADA/switchgear/combiner saturate fast (shallow-inundation threshold ~0.15–0.30 m); transformers
  and cables degrade more gradually; foundations use a velocity/scour proxy (depth shown as a proxy grid).
- FS_FOUND should be driven by FLOOD_VELOCITY_SCOUR_PROXY, not a simple depth curve.
- Whole-plant loss still needs the exposed/inundated fraction and equipment-elevation (freeboard) inputs.
- The flood_solar curves are public-source-anchored engineering parameterizations
  (DOE/FEMP, NEMA, FEMA, USACE HEC-FIA), NOT claims-calibrated.
```

---

## 5. How this changes future source acquisition

| Needed field | Why it matters |
|---|---|
| `project_MWdc` and `project_MWac` | converts claims to $/MW; avoids DC/AC ambiguity |
| `installed_TIV`, `insured_value`, `physical_replacement_value` | resolves denominator ambiguity |
| `gross_physical_damage`, `BI`, `net_paid`, `deductible`, `sublimit` | separates physical damage from financial-layer loss (dominant for flood) |
| `local_depth_above_component_datum`, `flow_velocity`, `date`, `inundated fraction` | maps to `FLOOD_LOCAL_DEPTH_COMPONENT_DATUM` / velocity-scour axis |
| `equipment_elevation`, `freeboard`, `design_flood_elevation (100/500-yr)` | primary flood mitigation knob |
| `which failure units inundated: FS_INV / FS_SWG / FS_XFMR / FS_COMB / FS_SCADA / FS_CABLE / FS_FOUND / FS_PVMOD` | maps benchmark dollars to the correct canonical unit |
| `IP / NEMA rating of inundated equipment` | determines whether submerged equipment survived (IEC 60529 / NEMA) |

| Future source to acquire | What it would unlock |
|---|---|
| VDE Americas All-NatCat report (inland flood component) | site/technology-specific solar flood AAL/PML absolute values |
| Moody's RMS solar farm flood case (absolute values) | converts the +230% AAL delta into absolute $/MW |
| Claims/forensic data by failure unit | tightens the canonical engineering DR ordinates with empirical loss data |

---

## 6. Practical caveat to carry into the pair dossier

```text
The solar flood crosswalk is RESOLVED against the canonical flood_solar cell in Damage_Modeling.
The flood failure grain is 8 named units (mostly electrical: inverter, switchgear, transformer,
combiner, SCADA, cable; plus conditional foundation and module), NOT the hail PV-module-glass unit.
Benchmarks are normalized to installed TIV, physical replaceable value, and the canonical failure-unit
buckets (primary electrical ~$146,947/MWdc; all-8 ~$538,607/MWdc). Depth->DR ordinates are the real
piecewise-linear curves from the flood_solar artifact, which are engineering parameterizations, not
claims-calibrated. The crosswalk classifies comparability; it does not tune a curve. Isolated solar
flood $/MW severity is scarce: the most reliable open dollars are litigation totals without MW
denominators, dominated by deductible and BI structure.
```

---

## 7. Machine-readable files

```text
data/solar_flood_value_basis_from_damage_modeling.json
  canonical value ladder + 8 flood failure units (FS_*) with shares/$-per-MWdc + derived buckets

data/solar_flood_value_damage_crosswalk.csv/json
  benchmark rows recast onto installed, physical, primary-electrical and all-8 canonical denominators

data/solar_flood_damage_curve_intensity_reference.csv/json
  canonical flood_solar per-failure-unit depth -> DR lookup (from the flood_solar curve artifact)
```
