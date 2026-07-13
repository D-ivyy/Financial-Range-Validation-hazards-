# Validation report — v0.7

Addition: a **new gold-standard deep-dive pair dossier** for **`solar_strong_wind`** (utility-scale ground-mount PV under straight-line / severe-convective wind — derecho, microburst, gust-front outflow), plus its **canonical `RESOLVED_FROM_DAMAGE_MODELING` value/damage crosswalk** and a clearly-labeled **PROPOSED / NON-CANONICAL two-architecture v2.0 preview**. `wind_convective_wind` is refreshed with version cross-links only (its upstream cell is unchanged).

**Related repos:** [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling) (canonical subsystems + damage curves) · [`Hazard_Modeling`](https://github.com/aamani-ai/Hazard_Modeling) (M0→M4 engine + RangeCompare dashboard).

> **Non-scope fence (load-bearing).** This package is a **source-pathway / normalization layer, NOT a calibration harness.** It defines no pass/fail bands, tunes no curve, and treats no raw number as a validated benchmark until its denominator, coverage basis, peril coding, asset class, geography, and loss basis are understood.

## Canonical crosswalk (Case A — RESOLVED)

- Upstream cell located in `Damage_Modeling` (`docs/cells/strong_wind_solar/current/`, commit `f8b5ec3`), `canonical_runtime_artifact: true`, promoted: **PASS**
- 5 canonical failure units used verbatim (`SWS_TRACKER_STRUCT`, `SWS_RACKING_STRUCT`, `SWS_MODULE_ATTACH`, `SWS_FOUNDATION_UPLIFT`, `SWS_SCADA_EXPOSED`) — no invented buckets: **PASS**
- Hazard axis `SWS_GUST_3S_ARRAY_HEIGHT` (`R_eff = (V_3s/V_design)^2`) and thresholded-logistic demand→DR ordinates copied verbatim: **PASS**
- Solar value ladder from `solar_wind_value_breakdown.xlsx` (installed TIV `$1,120,000/MWdc`, physical replaceable `$877,796/MWdc` = 78.4%): **PASS**
- TIV base EXACT-confirmed by NREL/DOE Q1-2024 utility-scale MMP `$1.12/W-dc`: **PASS**

## New pair files created

- `01_pairs/solar_strong_wind/source_registry.json/.csv` — **29 sources** (21 `HAS_OPEN_NUMBERS`, 6 `HAS_GATED_NUMBERS`, 2 `GENERIC_ONLY`): PASS
- `01_pairs/solar_strong_wind/source_matrix.csv` — **29 sources × 17 attribute columns**: PASS
- `01_pairs/solar_strong_wind/benchmark_number_matrix.csv/.json` — **30 benchmark rows** (6 normalize to `$/MW`, all blended; 24 blank-not-zero where no denominator): PASS
- `01_pairs/solar_strong_wind/value_basis_from_damage_modeling.json` — canonical v1.0, `status: RESOLVED_FROM_DAMAGE_MODELING`, 5 FUs: PASS
- `01_pairs/solar_strong_wind/benchmark_value_damage_crosswalk.csv/.json` — **13 rows** recast onto the canonical FU buckets: PASS
- `01_pairs/solar_strong_wind/damage_curve_intensity_reference.csv/.json` — **29 rows** demand→DR reference: PASS
- `02_crosswalks/solar_strong_wind_value_damage_crosswalk.md` — canonical narrative (7 sections, solar_hail order): PASS

## PROPOSED / NON-CANONICAL v2.0 preview

> **Non-canonical fence.** The upstream `strong_wind_solar` v2.0 artifact (`docs/cells/strong_wind_solar/proposed/`) is `canonical_runtime_artifact: false`, `promotion: not_performed`. The v1.0 cell remains the canonical runtime. This preview does not alter the canonical crosswalk.

- `value_basis_from_damage_modeling_v2_PROPOSED.json` — 4 curve-bearing FUs + 5 withheld FUs, two-architecture split: PASS
- `benchmark_value_damage_crosswalk_v2_proposed.csv/.json` — **8 rows** recast onto the v2 pathways: PASS
- `damage_curve_intensity_reference_v2_proposed.csv/.json` — **30 rows** (15 intensity points × 2 pathways: `fixed_tilt_ground_mount_screening_v1`, `single_axis_tracker_qualified_screening_v1`): PASS
- lower/central/upper state medians documented as an **EPISTEMIC ENVELOPE, not percentiles**: PASS
- fixed_tilt (net-pressure) and tracker (gust/Ucrit) pathways use **different denominators**, flagged never-cross-regress: PASS
- `02_crosswalks/solar_strong_wind_v2_proposed_value_damage_crosswalk.md` created: PASS

## v1.0 canonical vs v2 proposed — side-by-side

| | v1.0 docs r3 (CANONICAL) | v2.0 (PROPOSED) |
|---|---|---|
| Runtime status | `canonical_runtime_artifact: true`, promoted | `canonical_runtime_artifact: false`, `promotion: not_performed` |
| Structure | 5 independent failure units on one gust-ratio axis | 1 input routed by `array_architecture` into 2 pathways |
| Hazard axis | `SWS_GUST_3S_ARRAY_HEIGHT` (`R_eff`) | fixed: net-pressure ratio · tracker: gust/Ucrit ratio |
| Curve form | thresholded logistic on `R_eff` | `ordered_damage_state_lognormal` (envelope) |
| Grade | promoted runtime | `SCREENING_ENGINEERING_PROXY` |
| Consumer action required | none | **none** — `promotion: not_performed` |

## Package-wide updates

- `02_crosswalks/README.md` — 2 new rows (canonical + v2 preview), category-error list extended: PASS
- Root `README.md` — v0.7 addition section + 2 status-table rows; stale planning row removed: PASS
- Anchor `00_anchor/renewable_loss_reference_source_pathways.md` — §5.3 v0.7 dossier note + grid row marked BUILT: PASS
- `data/` flat copies — **14 pair-prefixed files** (CSV+JSON): PASS
- `99_metadata/manifest.md`, `bibliography.md`, `HANDOFF_SUMMARY.md`, `CHANGELOG.md` updated additively: PASS
- All new JSON files parse: **PASS**
- `wind_convective_wind` v0.5 + v0.6 files **byte-unchanged** (refresh = cross-links only; upstream `wind_tornado_wind` cell unchanged): PASS
- No writes outside `/tmp/frv`: PASS

Row counts above are computed directly from the new CSV/JSON files and equal the values recorded in `99_metadata/validation_v0_7.json`.

## Central finding

```text
No public source cleanly isolates pure straight-line / convective-wind $ severity for utility-scale solar.
Every open dollar figure is hail-stow-framed (AXIS), hail-dominant (GCube), tornado-parametric (Descartes),
generic all-property SCS (Gallagher Re/Aon/Swiss Re), or gated (Verisk/AIR, Moody's RMS, VDE/Cirrus, Renew Risk).
Strongest OPEN evidence is engineering/screening grade. The $1,120,000/MWdc TIV base is exact-confirmed by NREL/DOE.
This dossier ORGANIZES and NORMALIZES that evidence; it validates and calibrates nothing.
```
