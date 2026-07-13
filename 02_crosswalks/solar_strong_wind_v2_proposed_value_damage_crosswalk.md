# Solar × strong wind — PROPOSED v2.0 value/damage cross-reference (PREVIEW, NON-CANONICAL)

**Version:** v0.7 (preview)
**Created:** 2026-07-13
**Status:** `PROPOSED_NONCANONICAL_FROM_DAMAGE_MODELING_V2`
**Canonical crosswalk (use this instead):** [`solar_strong_wind_value_damage_crosswalk.md`](solar_strong_wind_value_damage_crosswalk.md)
**Parent pair dossier:** [`../01_pairs/solar_strong_wind/README.md`](../01_pairs/solar_strong_wind/README.md)
**Related repos:** [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling) · [`Hazard_Modeling`](https://github.com/aamani-ai/Hazard_Modeling)
**Purpose:** preview the PROPOSED `strong_wind_solar` **v2.0** two-architecture screening curves and how the same benchmark evidence would recast onto them. This is a **PREVIEW**, mirroring an upstream artifact whose `canonical_runtime_artifact = FALSE` and `promotion = not_performed`.

---

> ## ⚠️ Non-canonical preview
> ```text
> The upstream strong_wind_solar v2.0 artifact lives in Damage_Modeling/docs/cells/strong_wind_solar/proposed/.
> It has canonical_runtime_artifact = FALSE and promotion = not_performed.
> Do NOT use this file as the runtime crosswalk. The canonical crosswalk is the v1.0 file.
> The lower/central/upper state medians are an EPISTEMIC ENVELOPE (screening uncertainty), NOT statistical percentiles.
> This is still a source-pathway / normalization layer, NOT a calibration harness — no pass/fail bands, no curve tuning.
> ```

---

## 1. What changes from v1.0

```text
v1.0 (canonical):  one thresholded-logistic demand curve per failure unit on a single R_eff = (V/V_design)^2 axis; 5 FUs.
v2.0 (proposed):   one straight-line-convective hazard input, ROUTED by array_architecture into TWO screening pathways,
                   each an ordered_damage_state_lognormal curve (beta_ln~0.3, zero_below~0.1). Grade: SCREENING_ENGINEERING_PROXY.
```

| Pathway | Demand x-axis | Curve-bearing failure units |
| --- | --- | --- |
| `fixed_tilt_ground_mount_screening_v1` | `x_fixed = event net-pressure demand / qualified design net-pressure` (proxy `(gust/design_gust)^2`) | `PV_FIXED_TILT_MODULE_FIELD`, `PV_FIXED_TILT_SUPPORT_STRUCTURE` |
| `single_axis_tracker_qualified_screening_v1` | `x_tracker = tracker-normal 3s gust / exact-system Ucrit` (CPP 2015 galloping) | `PV_TRACKER_MODULE_FIELD`, `PV_TRACKER_SBOS_ASSEMBLY` |

**Withheld failure units** (carried but not curve-bearing in v2.0): `PV_FOUNDATION`, `PV_POWER_CONVERSION_AND_ELECTRICAL`, `PV_SCADA_COMMUNICATIONS`, `PV_CIVIL_INFRA`, `PV_REPLACEMENT_SUPPORT`.

**Value atoms** (`$/kWdc`): module hardware `291.21`; mounting hardware `109.99`; array direct reference `401.20` = `45.71%` physical / `35.82%` installed.

---

## 2. The two pathways are NOT on a common axis

```text
fixed_tilt uses a NET-PRESSURE ratio; single_axis_tracker uses a GUST/Ucrit ratio.
These denominators are different. Never regress one pathway against the other,
and never regress either against the v1.0 R_eff axis. They answer different questions.
```

The machine-readable reference is [`../01_pairs/solar_strong_wind/damage_curve_intensity_reference_v2_proposed.csv`](../01_pairs/solar_strong_wind/damage_curve_intensity_reference_v2_proposed.csv), with `lower / central / upper` damage-ratio columns per pathway (the epistemic envelope) and an `extrapolation_flag`.

---

## 3. Benchmark recast onto the v2 pathways

The machine-readable recast is [`../01_pairs/solar_strong_wind/benchmark_value_damage_crosswalk_v2_proposed.csv`](../01_pairs/solar_strong_wind/benchmark_value_damage_crosswalk_v2_proposed.csv).

```text
AXIS failed-stow ($380k/MW)        -> TRACKER pathway (stow failure is a tracker phenomenon); gust/Ucrit denominator; blended, LOW_GRAIN_MISMATCH.
AXIS fixed-tilt ($340k/MW)         -> FIXED pathway; net-pressure denominator; architecture-appropriate but blended.
PVEL 1800 vs 2400 Pa               -> the engineering BASIS for splitting the two pathways (tracker modules rated lower).
CPP galloping ~40 m/s              -> DEFINES the tracker Ucrit axis (system-specific; not a fleet plug-in; not a loss).
NEXTracker 25-yr failure prob      -> PROBABILITY, not a single-event state DR; screening context for tracker pathway.
Cedar Rapids derecho liftoff       -> damage-state; touches foundation/support, but PV_FOUNDATION is WITHHELD in v2.
```

The same golden-rule caveats from the canonical crosswalk still hold: no open source isolates pure straight-line-wind $ severity for solar; every $/MW figure is blended.

---

## 4. Machine-readable files

```text
../01_pairs/solar_strong_wind/value_basis_from_damage_modeling_v2_PROPOSED.json
../01_pairs/solar_strong_wind/benchmark_value_damage_crosswalk_v2_proposed.csv/.json
../01_pairs/solar_strong_wind/damage_curve_intensity_reference_v2_proposed.csv/.json
```

**Non-scope reminder:** PROPOSED preview, non-canonical. Source-pathway / normalization layer, **not** a calibration harness. Defines no pass/fail bands and tunes no curve.
