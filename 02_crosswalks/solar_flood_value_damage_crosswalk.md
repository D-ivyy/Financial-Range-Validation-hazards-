# Solar × flood — value and damage-model cross-reference

**Version:** v0.3  
**Created:** 2026-07-09  
**Status:** `PENDING_UPSTREAM_ARTIFACTS`  
**Parent pair dossier:** [`../01_pairs/solar_flood/README.md`](../01_pairs/solar_flood/README.md)  
**Purpose:** make the solar-flood source research more useful by cross-referencing open benchmark numbers to the project value ledger and a *provisional* flood depth-damage grain. This file does **not** define calibration pass/fail rules.

---

## 0. The rule

This file is a **denominator / grain crosswalk**, not a validation source.

```text
External reports provide reference numbers.
The value workbook tells us what denominator those numbers imply.
The damage artifact tells us which failure-unit value the flood curve actually damages.
```

So this crosswalk helps answer:

```text
Does a benchmark $/MW number look like electrical/BOS physical damage?
Does it require replacement labor / fieldwork (cleanup, drying, re-termination)?
Does it probably include BI, deductibles, net/gross claim effects, or other costs?
Is it a direct-damage comparison or only a financial-layer comparison?
```

It should **not** be used to tune a curve by itself — and for solar flood it especially cannot, because the required artifacts are not yet available (see §1).

---

## 1. Upstream artifacts — WHY THIS CROSSWALK IS PENDING

This is a **Case B** crosswalk: the value ladder is available but the canonical damage artifact is **not**.

```text
value workbook:
  solar_wind_value_breakdown.xlsx      -> AVAILABLE (peril-agnostic value ladder, reused from solar_hail)

canonical flood damage artifact:
  <none>                               -> NOT AVAILABLE
```

Two things are missing before this crosswalk can become authoritative:

1. **No solar-specific flood depth-damage function exists publicly.** The hail pair has a purpose-built module-glass damage curve keyed on `mesh_diameter_mm`. There is no equivalent solar flood curve keyed on `flood_depth_m`. As a provisional stand-in we use **generic industrial** depth-damage curves (JRC North America Industrial, FEMA Hazus, USACE), explicitly labeled generic and **not** solar-calibrated.
2. **The flood failure unit is different from hail** and must be re-derived from the value ladder rather than copied from the hail artifact.

Until a solar flood damage artifact is authored, every depth→DR mapping here is provisional.

### 1.1 Flood failure unit differs from hail

```text
hail  failure unit: PV_MODULE_GLASS_CELL  (subsystem PV_ARRAY)      -> modules are the thing that breaks
flood failure unit: ELECTRICAL_BOS_INUNDATION                       -> inverters / collection / cabling / foundations
                    subsystems: INVERTER_SYSTEM + ELECTRICAL_COLLECTION + FOUNDATION
```

For flood, standing PV modules above the waterline are generally **not** the primary loss. The loss concentrates in power electronics (inverters/PCS), combiner boxes and cabling (ingress limited by IEC 60529), foundations (scour/washout above ~7 ft/s per FM Global DS 7-106), and — when not elevated — the substation transformer/switchgear. This is the single most important grain difference from the hail pair.

---

## 2. Solar value-basis crosswalk (flood failure-unit buckets)

The value ladder is peril-agnostic, so the installed/physical denominators are identical to solar_hail. The **failure-unit bucket** is re-rolled for flood.

| Bucket | $/MWdc | % installed TIV | How to use |
| --- | --- | --- | --- |
| Installed TIV | $1,120,000 | 100.00% | default project installed capex denominator |
| Physical replaceable value | $877,796 | 78.37% | physical-damage denominator; excludes sunk/soft/nonphysical |
| Excluded sunk/soft/nonphysical | $242,204 | 21.63% | not ignored; excluded from direct physical-damage denominator |
| INVERTER_SYSTEM | $39,133 | 3.49% | power-electronics flood failure sub-bucket |
| ELECTRICAL_COLLECTION | $147,022 | 13.13% | combiner/cabling flood failure sub-bucket |
| FOUNDATION | $31,124 | 2.78% | scour/washout flood failure sub-bucket |
| **FLOOD_ELECTRICAL_BOS** (inverter+electrical+foundation) | **$217,279** | **19.40%** | canonical provisional flood failure-unit bucket |
| FLOOD_ELECTRICAL_BOS + SUBSTATION | $323,783 | 28.91% | extended bucket when transformer/switchgear inundated |
| FLOOD_ELECTRICAL_BOS + replacement fieldwork | $324,147 | 28.94% | gross physical repair-cost bucket incl. cleanup/re-termination |

Key interpretation:

```text
A flood that inundates the electrical/BOS of a solar plant caps out near ~$217k/MWdc of
direct failure-unit value (19.4% of installed TIV), before adding substation or fieldwork.
Contrast the hail module-hardware cap of ~$291k/MWdc (26.0% of installed TIV).

If a flood benchmark $/MW is much smaller than this, it is consistent with partial inundation
(a subset of PCS/inverters), which is exactly what the DEPCOM case describes (10 of 40 PCS).
If it is larger, the number probably includes BI, deductible-driven claim structure, or substation loss.
```

---

## 3. Benchmark numbers recast onto damage-model buckets

Only three open solar-flood benchmarks currently normalize to a $/MW basis, and all three are derived / sensitivity / zero. This thinness is itself the finding: **isolated solar-flood $/MW severity is genuinely scarce.**

| Benchmark row | $/MWdc | % installed TIV | % FLOOD_ELECTRICAL_BOS | % BOS+fieldwork | Comparison grain |
| --- | --- | --- | --- | --- | --- |
| DEPCOM AVOIDED LOSS PER MW SENSITIVITY | $43,478 | 3.88% | 20.01% | 13.41% | capacity-denominator-sensitive-and-avoided-loss |
| VDE/AXIS FLOOD PER MW SENSITIVITY | $32.61 | 0.003% | 0.02% | 0.01% | portfolio-aggregate-only |
| VALDORA ZERO LOSS PER MW | $0 | 0.00% | 0.00% | 0.00% | measured-zero-lower-bound |

ASCII anchor (share of the FLOOD_ELECTRICAL_BOS failure-unit bucket):

```text
Valdora zero-loss anchor       |                                                     0.0%  of FLOOD_ELECTRICAL_BOS
VDE/AXIS portfolio per-MW       |                                                     0.02% of FLOOD_ELECTRICAL_BOS
DEPCOM avoided-loss per-MW      | ██████████                                          20.0% of FLOOD_ELECTRICAL_BOS
```

Read this as:

```text
- The only positive per-MW solar-flood anchors are a portfolio aggregate (~$33/MW over 13 years)
  and an avoided-loss figure ($43,478/MW), which sits neatly inside the electrical/BOS bucket.
- Valdora shows the physical-damage floor is a genuine zero when a site is elevated with freeboard.
- No open source gives a clean per-event physical-damage $/MW for solar flood. The most reliable
  open dollars are litigation totals (First Solar/Zurich ~$10.1M asserted; South Alexander ~$1.1M)
  that lack a MW denominator and are dominated by deductible/BI structure.
```

---

## 4. Damage-curve intensity reference (PROVISIONAL, generic)

There is no solar flood curve. The table below is a **generic industrial** depth-damage function (JRC North America, 2017) used only to bound the shape of a flood loss vs depth relationship. It is **not** solar-calibrated and must not be used to tune a solar flood curve.

| Flood depth m | Industrial DR (generic) | Commercial DR (generic) | Residential DR (generic) |
| --- | --- | --- | --- |
| 0.0 | 3% | 2% | 20% |
| 0.5 | 32% | 24% | 44% |
| 1.0 | 51% | 37% | 58% |
| 1.5 | 64% | | |
| 2.0 | 74% | | |
| 3.0 | 86% | | |
| 4.0 | 94% | | |
| 5.0 | 98% | | |
| 6.0 | 100% | | |

Important caveats:

```text
- These are GENERIC building depth-damage ratios, not solar failure-unit DRs.
- The correct solar failure unit is electrical/BOS, whose vulnerability depends on equipment
  elevation and IP rating (IEC 60529 IPX7 = 1 m / 30 min), not on building-style depth curves.
- Elevation/freeboard is the dominant mitigation knob: USACE shows +1 ft freeboard cuts AAL ~82%.
- Whole-plant loss also needs the exposed/inundated fraction and value-bucket selection.
```

---

## 5. How this changes future source acquisition

Every solar-flood benchmark request should now ask for enough fields to land on this crosswalk:

| Needed field | Why it matters |
|---|---|
| `project_MWdc` and `project_MWac` | converts claims to $/MW and avoids DC/AC ambiguity |
| `installed_TIV`, `insured_value`, `physical_replacement_value` | resolves denominator ambiguity |
| `gross_physical_damage`, `BI`, `net_paid_or_reserved`, `deductible`, `sublimit` | separates physical damage from financial-layer loss (dominant for flood) |
| `flood_depth`, `flood_duration`, `flow_velocity`, `date`, `site polygon / inundated fraction` | maps to hazard axis and exposed fraction |
| `equipment_elevation`, `freeboard`, `design_flood_elevation (100/500-yr)` | maps to the primary flood mitigation knob |
| `which subsystems inundated: inverter/PCS, combiner, cabling, substation, foundation` | maps benchmark dollars to the correct failure-unit bucket |
| `IP rating of inundated equipment` | determines whether submerged equipment survived (IEC 60529) |

| Future source to acquire | What it would unlock |
|---|---|
| VDE Americas All-NatCat report (inland flood component) | site/technology-specific solar flood AAL/PML absolute values |
| Moody's RMS solar farm flood case (absolute values) | converts the +230% AAL delta into absolute $/MW |
| A purpose-built solar flood depth-damage artifact | replaces the generic industrial proxy in §4 |

---

## 6. Practical caveat to carry into the pair dossier

Use this language when summarizing the cross-reference:

```text
The solar flood crosswalk is PENDING because no solar-specific flood depth-damage artifact exists,
and because the flood failure unit (electrical/BOS/foundation) differs from the hail failure unit
(PV module glass). The value ladder is reusable, so denominators are known, but the depth->DR curve
is only a generic industrial proxy. Benchmark rows are therefore normalized to installed TIV,
physical replaceable value, and a re-rolled FLOOD_ELECTRICAL_BOS failure-unit bucket. The crosswalk
classifies comparability; it does not tune a curve. Isolated solar flood $/MW severity is scarce:
the most reliable open dollars are litigation totals without MW denominators, dominated by deductible
and BI structure.
```

---

## 7. Machine-readable files

```text
data/solar_flood_value_basis_from_damage_modeling.json
  denominator and value-bucket values from the value workbook + re-rolled flood failure-unit bucket (provisional)

data/solar_flood_value_damage_crosswalk.csv/json
  benchmark rows recast onto installed, physical, and FLOOD_ELECTRICAL_BOS denominators

data/solar_flood_damage_curve_intensity_reference.csv/json
  provisional generic-industrial flood depth -> DR lookup (JRC North America), NOT solar-calibrated
```
