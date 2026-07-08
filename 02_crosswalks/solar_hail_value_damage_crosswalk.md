# Solar × hail — value and damage-model cross-reference

**Version:** v0.2  
**Created:** 2026-06-26  
**Parent pair dossier:** [`../01_pairs/solar_hail/README.md`](../01_pairs/solar_hail/README.md)  
**Purpose:** make the solar-hail source research more useful by cross-referencing open benchmark numbers to the project value ledger and canonical hail damage-curve grain.

---

## 0. The rule

This file is a **denominator / grain crosswalk**, not a validation source.

```text
External reports provide reference numbers.
The value workbook tells us what denominator those numbers imply.
The damage artifact tells us which failure-unit value the M3 curve actually damages.
```

So this crosswalk helps answer:

```text
Does a benchmark $/MW number look like module-only physical damage?
Does it require replacement labor / fieldwork?
Does it probably include BI, deductibles, net/gross claim effects, or other costs?
Is it an M3 direct-damage comparison or only an M4 / financial-layer comparison?
```

It should **not** be used to tune a curve by itself.

---

## 1. Upstream artifacts used

```text
value workbook:
  solar_wind_value_breakdown.xlsx

canonical hail damage artifact:
  DAMAGE_CURVE_LIBRARY_V2_5_IMPLEMENTATION_HARDENED_DELIVERABLE/
    01_cells/hail_solar/current/
      hail_solar__model_v1_0__docs_r5__curve_artifact.json
```

The canonical hail damage model emits a failure-unit damage ratio for:

```text
failure unit: PV_MODULE_GLASS_CELL
subsystem:    PV_ARRAY
component:    PV_MODULE
value bucket: PV_ARRAY_MODULE_EXPOSED
hazard axis:  mesh_diameter_mm
```

That means the cleanest M3 physical-damage comparison grain is **PV module / PV array value**, not whole-plant TIV and not net insurance loss.

---

## 2. Solar value-basis crosswalk

| Bucket | $/MWdc | % installed TIV | How to use |
| --- | --- | --- | --- |
| Installed TIV | $1,120,000 | 100.00% | default project installed capex denominator |
| Physical replaceable value | $877,796 | 78.37% | physical-damage denominator; excludes sunk/soft/nonphysical |
| Excluded sunk/soft/nonphysical | $242,204 | 21.63% | not ignored; excluded from direct physical-damage denominator |
| PV_ARRAY / PV_MODULE hardware | $291,215 | 26.00% | canonical hail M3 failure-unit value bucket |
| Unallocated replacement fieldwork | $106,869 | 9.54% | claim-time allocation bucket, not a runtime subsystem |
| PV_ARRAY + replacement fieldwork | $398,084 | 35.54% | useful gross physical repair-cost comparison bucket |
| PV_ARRAY + MOUNTING + replacement fieldwork | $551,347 | 49.23% | extended physical bucket; only if benchmark includes non-module physical costs |

Key interpretation:

```text
The hail curve can drive PV_ARRAY/PV_MODULE DR up to 100% of exposed module value.
At the project default value basis, that direct module hardware cap is about $291,215/MWdc,
or 26.00% of installed TIV.

Several published gross claim severities are higher than the module hardware cap.
That is not automatically a curve problem: it usually means the benchmark is a gross claim / repair-cost / insurance-basis number,
not pure module hardware damage.
```

---

## 3. Benchmark numbers recast onto damage-model buckets

| Benchmark row | $/MWdc | % installed TIV | % PV_ARRAY hardware | % PV_ARRAY + fieldwork | Comparison grain |
| --- | --- | --- | --- | --- | --- |
| AXIS SUCCESSFUL STOW EVENT SEVERITY | $150,000 | 13.39% | 51.51% | 37.68% | module-hardware-comparable-if-PD-only |
| AXIS FIXED TILT EVENT SEVERITY | $340,000 | 30.36% | 116.75% | 85.41% | requires-fieldwork-or-claim-cost-allocation |
| AXIS FAILED STOW EVENT SEVERITY | $380,000 | 33.93% | 130.49% | 95.46% | requires-fieldwork-or-claim-cost-allocation |
| AXIS HEAT STRENGTHENED GLASS DELTA | $50,000 | 4.46% | 17.17% | 12.56% | delta-only-module-cost-signal |
| AXIS GLOBAL CLOSED CLAIMS 2019 2025 GROSS PER AFFECTED CAPACITY | $126,667 | 11.31% | 43.50% | 31.82% | normalization-only |
| KWH 2026 100YR FAIL THRESHOLD | $112,000 | 10.00% | 38.46% | 28.13% | M4-or-tail-metric-only |
| KWH POWERMAG STANDARD AAL | $10,627 | 0.95% | 3.65% | 2.67% | M4-or-tail-metric-only |
| KWH POWERMAG RESILIENT AAL | $3,078 | 0.27% | 1.06% | 0.77% | M4-or-tail-metric-only |
| GCUBE AVG CLAIM 350MW SENSITIVITY | $166,857 | 14.90% | 57.30% | 41.92% | capacity-denominator-sensitive |
| GCUBE AVG CLAIM 200MW SENSITIVITY | $292,000 | 26.07% | 100.27% | 73.35% | capacity-denominator-sensitive |
| GCUBE AVG CLAIM 100MW SENSITIVITY | $584,000 | 52.14% | 200.54% | 146.70% | capacity-denominator-sensitive |

The most useful observation is the AXIS severity band:

```text
Successful Stow                  | ███████████████████                                 37.7% of PV_ARRAY+fieldwork
Fixed Tilt                       | ███████████████████████████████████████████         85.4% of PV_ARRAY+fieldwork
Failed Stow                      | ████████████████████████████████████████████████    95.5% of PV_ARRAY+fieldwork
```

Read this as:

```text
- Successful-stow average severity can fit inside the module-hardware bucket.
- Fixed-tilt and failed-stow average severities exceed pure PV_ARRAY hardware value.
- Fixed-tilt and failed-stow severities are much more coherent if replacement fieldwork / gross physical claim costs are included.
```

This is exactly why the cost/value workbook adds value: it prevents us from accidentally saying,
"the hail curve needs max_DR > 1," when the actual issue may be that the benchmark number includes cost buckets outside the M3 module failure unit.

---

## 4. Damage-curve intensity reference

If a case study or report gives hail size, this table maps that hail diameter into the canonical damage artifact's failure-unit DRs before any exposure scaling or M4 aggregation.

| Hail diameter mm | Fragile unstowed DR | Default unstowed DR | Default fully-stowed adjusted DR | Hardened unstowed DR |
| --- | --- | --- | --- | --- |
| 25 | 2.8% | 1.0% | 0.2% | 0.5% |
| 35 | 20.7% | 5.0% | 1.2% | 1.9% |
| 40 | 44.1% | 10.8% | 2.8% | 3.7% |
| 44 | 65.6% | 19.1% | 5.3% | 6.2% |
| 50 | 87.8% | 39.0% | 13.0% | 12.9% |
| 55 | 95.6% | 59.4% | 25.2% | 22.6% |
| 60 | 98.5% | 77.1% | 42.4% | 36.4% |
| 64 | 99.4% | 86.7% | 57.0% | 49.6% |
| 70 | 99.8% | 94.6% | 74.2% | 68.9% |
| 75 | 99.9% | 97.6% | 82.3% | 81.4% |
| 80 | 100.0% | 98.9% | 86.5% | 89.6% |
| 90 | 100.0% | 99.8% | 89.3% | 97.1% |

Important caveats:

```text
- These are failure-unit DRs, not whole-plant DRs.
- The stowed values use the current v2.5 placeholder adjustment: D50 + 8mm and max_DR = 0.90.
- The stow adjustment is documented as T4 / not claims-calibrated in the damage artifact.
- Whole-plant loss also needs exposed fraction and value-bucket selection.
```

---

## 5. How this changes future source acquisition

Every solar-hail benchmark request should now ask for enough fields to land on this crosswalk:

| Needed field | Why it matters |
|---|---|
| `project_MWdc` and `project_MWac` | converts claims to $/MW and avoids DC/AC ambiguity |
| `installed_TIV`, `insured_value`, and `physical_replacement_value` if available | resolves denominator ambiguity |
| `gross_physical_damage`, `BI`, `net_paid_or_reserved`, `deductible`, `sublimit` | separates M3 physical damage from M4/insurance-layer loss |
| `module_make/model`, `front_glass_thickness_mm`, `glass_glass_vs_backsheet`, `hail_rating` | maps to damage selector / module archetype |
| `tracker/fixed`, `stow_command`, `stow_angle`, `stow_success`, `stow_failure_reason` | maps to conditioner and explains AXIS-style severity separation |
| `event hail size`, `MESH/MRMS source`, `date`, `site polygon/exposed array fraction` | maps to hazard axis and exposure fraction |
| `repair scope: modules only vs modules+mounting+labor+electrical` | maps benchmark dollars to the correct value bucket |

---

## 6. Practical caveat to carry into the pair dossier

Use this language when summarizing the cross-reference:

```text
The value workbook materially improves the benchmark registry because it exposes the denominator and grain mismatch.
For solar hail, the M3 damage curve is module/PV_ARRAY-grain, while many insurer/broker numbers are gross claim-grain.
Therefore benchmark rows are normalized to whole-plant installed TIV, physical replaceable value, PV_ARRAY module value,
and PV_ARRAY-plus-fieldwork value. The crosswalk is used to classify comparability, not to tune the curve directly.
```

---

## 7. Machine-readable files

```text
data/solar_hail_value_basis_from_damage_modeling_v2_5.json
  denominator and value-bucket values copied from the value workbook + hail damage artifact

data/solar_hail_value_damage_crosswalk.csv/json
  benchmark rows recast onto installed, physical, PV_ARRAY, and PV_ARRAY+fieldwork denominators

data/solar_hail_damage_curve_intensity_reference.csv/json
  hail diameter to failure-unit DR lookup for the canonical hail damage curves
```
