# Solar × wildfire — value and damage-model cross-reference

**Version:** v0.4
**Created:** 2026-07-10 (grain resolved against canonical `Damage_Modeling` `wildfire_solar` cell; DR ordinates withheld upstream)
**Status:** `RESOLVED_GRAIN_DR_WITHHELD`
**Parent pair dossier:** [`../01_pairs/solar_wildfire/README.md`](../01_pairs/solar_wildfire/README.md)
**Related repos:** [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling) (canonical subsystems + damage curves) · [`Hazard_Modeling`](https://github.com/aamani-ai/Hazard_Modeling) (M0→M4 engine + RangeCompare dashboard)
**Purpose:** cross-reference open solar-wildfire benchmark numbers to the project value ledger and the **canonical `wildfire_solar` failure-unit grain** from `Damage_Modeling`. The value grain is resolved; the DR ordinates are **withheld upstream** (`NO_RUNTIME_CURVE`). This file does **not** define calibration pass/fail rules and does **not** reconstruct the withheld curve.

---

## 0. The rule

This file is a **denominator / grain crosswalk**, not a validation source, and it is fenced twice over: once by the **normalization-layer** rule, and once by the **ignition-origin** rule.

```text
External reports provide reference numbers.
The value workbook tells us what denominator those numbers imply.
The canonical wildfire_solar damage artifact tells us which failure-unit value the wildfire curve would damage.
BUT the wildfire_solar DR ordinates are WITHHELD upstream (NO_RUNTIME_CURVE) — so no damage ratio is available.
AND the origin fence: only EXOGENOUS (landscape-originated) fire numbers may be recast; endogenous and
    all-cause-blended fire numbers are a different peril and are quarantined.
```

So this crosswalk helps answer:

```text
Is a fire benchmark EXOGENOUS-wildfire at all, or is it equipment-origin / all-cause / smoke (wrong family)?
Does an exogenous $/MW number, if one existed, look like thermal-attack physical damage across the WS_* units?
Which named failure units (module, racking, foundation, inverter, combiner, cable, MV, grounding, SCADA, civil) would it cover?
Does it require the support-cost allocation rule (field labor / site management) once damaged units are known?
```

It must **not** be used to tune a curve — and here it *cannot* be, because the DR ordinates are withheld. The crosswalk classifies comparability and resolves the value grain; it never tunes a curve.

---

## 1. Upstream artifacts used (this is a "cell exists, DR withheld" crosswalk)

The value workbook exists and is used verbatim. The wildfire damage cell **also exists**, but it is a v0.1 scaffold whose DR ordinates are deliberately withheld:

```text
value workbook:
  docs/method/value_basis/solar_wind_value_breakdown.xlsx / Solar_Map rows 2:17  -> AVAILABLE (peril-agnostic value ladder)

canonical wildfire damage artifact:
  docs/cells/wildfire_solar/proposed/
    wildfire_solar__model_v0_1__docs_r1__curve_artifact.json          -> AVAILABLE (11 WS_* failure units + value lineage)
      lifecycle_state = scaffold ; promotion_status = proposed
      canonical_runtime_artifact = false ; ordinate_status = withheld
      curve_records = [] ; withheld_reason_codes = [NO_RUNTIME_CURVE]
    VALUE_CROSSWALK_wildfire_solar__model_v0_1__docs_r1.csv           -> AVAILABLE (per-failure-unit $/kWdc value shares)
```

> **Why this is neither PENDING nor RESOLVED-with-curve.** The cell exists, so this is **not** `PENDING_UPSTREAM_ARTIFACTS` — the value grain is real and used verbatim. But the DR ordinates are governed **withheld** (`NO_RUNTIME_CURVE`), so it is **not** a fully-resolved (curve-bearing) crosswalk either. The correct status is **`RESOLVED_GRAIN_DR_WITHHELD`**: value grain resolved, damage ratios withheld. We do **not** invent the missing ordinates.

### 1.1 Wildfire failure grain differs from hail AND flood

```text
hail     failure unit: PV_MODULE_GLASS_CELL (PV_ARRAY)     -> one primary unit; material-share concentration
flood    failure units: ~8 mostly-electrical units          -> geometry/elevation exposure, depth->DR state curves
wildfire failure units: 11 WS_* units across module,         -> THERMAL ATTACK touches nearly every subsystem;
         mounting, electrical, MV, civil + a support-cost        gated by component setback/elevation geometry and
         allocation rule                                         local fuel/wind/slope; DR ordinates WITHHELD
```

The hazard x-axis is **`FSIM_CONDITIONAL_FLAME_LENGTH_PROBABILITY`** (USFS FSim, 270 m; six conditional flame-length bins `<2 ft … ≥12 ft`), `f_kind` is **thermal attack with setback/elevation geometry and fuel/wind/slope state**, and the proposed future y-axis (`conditional_direct_replacement_cost_ratio`) is itself **withheld**. Burn probability is a **frequency-layer** field, not a damage ordinate.

---

## 2. Canonical wildfire failure-unit value buckets

Taken verbatim from the `wildfire_solar` cell / value workbook (`$/MWdc` = `$/kWdc` × 1000). All eleven carry `ordinate_status = withheld`.

| Failure unit | Subsystem | `$/MWdc` (installed) | % installed TIV | Role / treatment |
|---|---|---:|---:|---|
| `WS_MODULE_THERMAL` | PV_ARRAY | `$291,215` | 26.00% | candidate primary (module glass/laminate/frame/J-box) |
| `WS_RACKING_THERMAL` | MOUNTING | `$109,990` | 9.82% | candidate (steel/aluminum racking + tracker) |
| `WS_MV_EQUIPMENT_SPLIT_REQUIRED` | SUBSTATION_AND_MV | `$106,505` | 9.51% | decomposition gate (transformer/switchgear/breaker) |
| `WS_DC_CABLE_EXPOSED` | ELECTRICAL_COLLECTION | `$69,320` | 6.19% | candidate (exposed DC cable; splits required) |
| `WS_INVERTER_CONTROL_DIRECT` | INVERTER_SYSTEM | `$32,306` | 2.88% | candidate primary (inverter + control enclosure) |
| `WS_CIVIL_INFRA_SPLIT_REQUIRED` | CIVIL_INFRA | `$31,224` | 2.79% | decomposition + consequence gate (roads/fencing/buildings) |
| `WS_FOUNDATION_REVIEW` | FOUNDATION | `$31,124` | 2.78% | deferred exception review (pile/pad) |
| `WS_GROUNDING_LIGHTNING_REVIEW` | GROUNDING_LIGHTNING | `$8,385` | 0.75% | deferred exception review |
| `WS_COMBINER_CONNECTOR` | ELECTRICAL_COLLECTION | `$6,826` | 0.61% | candidate (combiner/connector/J-box) |
| `WS_SCADA_CONTROL_DIRECT` | SCADA | `$1,310` | 0.12% | secondary (monitoring/comms) |
| `WS_SUPPORT_COST_ALLOCATION` | REPLACEMENT_FIELDWORK | `$106,869` | 9.54% | **allocation rule, not a failure-unit curve** |

Reconciliation (verbatim from the workbook SUMMARY rows):

```text
DIRECT-HARDWARE envelope (rows 2-10)      = $656,981 / MWdc  = 58.66% installed TIV
PHYSICAL replaceable (rows 2-10, 12-15)   = $877,796 / MWdc  = 78.37% installed TIV
INSTALLED TIV                             = $1,120,000 / MWdc = 100%
```

> ```text
> A value bucket is a DENOMINATOR, not a loss. At DR = 1.0 across every direct-hardware unit, a full
> burnover would reach $656,981/MWdc. That is the maximum conceivable direct loss, NOT an expected loss.
> The expected loss needs the WITHHELD severity curve x the exposed/burned fraction and cannot be produced
> from this cell.
> ```

---

## 3. Benchmark numbers recast onto the canonical failure-unit buckets

**Nothing valid to recast.** Across all 63 sources and 100 benchmark rows, **zero** provide an isolated, properly-scoped exogenous-wildfire solar `$/MW` physical-severity figure; every `normalized_usd_per_MW` cell is blank (never zero). The only in-scope physical anchor is a **unit-count**.

| Benchmark | Source | Origin family | `$/MWdc` | Mapped unit(s) | Grain comparability | Interpretation |
|---|---|---|:--:|---|---|---|
| No open exogenous-wildfire $/MW severity | ALL_63_SOURCES | EXOGENOUS_WILDFIRE_DIRECT |  | all 11 WS_* | not-comparable-no-open-number | Headline: nothing to recast; DR withheld anyway. |
| ~1,000 of ~80,000 modules destroyed (Kern) | DEPCOM_KERN_COUNTY_2020 | EXOGENOUS_WILDFIRE_DIRECT |  | `WS_MODULE_THERMAL` | physical-unit-count-only | ILLUSTRATIVE: ~1% module-population burned at one event; not a $/MW, not a DR. Fire+water mixed. |
| Restoration savings $2.6M + $1.4M (Kern) | DEPCOM_KERN_COUNTY_2020 | EXOGENOUS_WILDFIRE_DIRECT |  | `WS_SUPPORT_COST_ALLOCATION` | avoided-cost-not-gross-loss | Vendor avoided-cost framing (PORTFOLIO_BIAS); not normalizable; context only. |

The full machine-readable recast (with the same "nothing to recast" result) is in [`../01_pairs/solar_wildfire/benchmark_value_damage_crosswalk.csv`](../01_pairs/solar_wildfire/benchmark_value_damage_crosswalk.csv).

> ```text
> Origin quarantine: the kWh/GCube/AXIS/Marsh "solar fire" numbers are ALL_CAUSE_PV_FIRE_BLENDED and the
> CVSR/Mannum/Raywood events are ENDOGENOUS_ASSET_ORIGINATED_FIRE. None are recast here — they are a
> different peril/origin, not exogenous-wildfire physical severity.
> ```

---

## 4. Damage-curve intensity reference (CANONICAL `wildfire_solar` axis; DR withheld)

The canonical hazard axis and the ten curve-bearing failure units are recorded in [`../01_pairs/solar_wildfire/damage_curve_intensity_reference.csv`](../01_pairs/solar_wildfire/damage_curve_intensity_reference.csv), but **every DR cell is blank / `WITHHELD_NO_RUNTIME_CURVE`** — the ordinates are governed withheld upstream and are not reconstructed.

```text
hazard axis: FSIM_CONDITIONAL_FLAME_LENGTH_PROBABILITY (USFS FSim, 270 m)
  bins: <2 ft | 2-<4 ft | 4-<6 ft | 6-<8 ft | 8-<12 ft | >=12 ft   (conditional on burning; sum to 1)
DR ordinates per (bin x WS_* unit): WITHHELD (NO_RUNTIME_CURVE)

Guardrails on the axis:
  - Flame-length class / fireline intensity (kW/m) is NOT incident heat flux (kW/m^2). The material CHF
    ignition thresholds (PV glass ~26 kW/m^2, XLPE cable ~16 kW/m^2) live on a different axis.
  - Ecological burn severity (dNBR/MTBS) is a geography check only, never a damage-curve input.
  - Burn probability is a frequency-layer field, not a damage ordinate.
```

---

## 5. How this changes future source acquisition

```text
1. The value grain no longer needs discovery — it is canonical (11 WS_* units). Acquisition should target the
   DR side: a solar-only cat-model wildfire run (AAL + OEP/AEP PML) is the only realistic open severity path.
2. Any incoming "solar fire" number must be origin-tagged BEFORE use. Only the external-landscape subset is a
   candidate exogenous benchmark; equipment-origin and all-cause-blended numbers are quarantined.
3. Convert the DEPCOM/Wellington-North unit-counts into $/MW by requesting gross line-item damage + MW
   denominator (section 5.1 of the pair README).
4. Smoke/soiling generation numbers are already relatively rich but belong to a separate (revenue) peril and
   should be built out on their own track, never merged into physical damage.
```

---

## 6. Practical caveat to carry into the pair dossier

```text
- RESOLVED_GRAIN_DR_WITHHELD means: trust the 11 WS_* value buckets; do NOT quote any damage ratio from this
  cell — there is none (NO_RUNTIME_CURVE).
- A $/MW that ever exceeds a failure unit's value share is a grain warning (more units involved), NOT DR>1.
- Keep the four fire-origin families separate at all times: EXOGENOUS_WILDFIRE_DIRECT (in scope),
  ENDOGENOUS_ASSET_ORIGINATED_FIRE (deferred, separate model), ALL_CAUSE_PV_FIRE_BLENDED (context only),
  SMOKE_SOILING_GENERATION (separate revenue peril).
- This crosswalk organizes and normalizes evidence and resolves the value grain. It does NOT validate or
  calibrate anything.
```

---

## 7. Machine-readable files

```text
../01_pairs/solar_wildfire/value_basis_from_damage_modeling.json   canonical 11 WS_* units + value ladder (DR withheld)
../01_pairs/solar_wildfire/damage_curve_intensity_reference.csv     FSim 6-bin axis x WS_* units; DR cells withheld
../01_pairs/solar_wildfire/damage_curve_intensity_reference.json    JSON companion
../01_pairs/solar_wildfire/benchmark_value_damage_crosswalk.csv     recast attempt: nothing valid to recast
../01_pairs/solar_wildfire/benchmark_value_damage_crosswalk.json    JSON companion
```
