# Validation report — v0.3 (corrected in v0.3.1)

Pair added: `solar_flood` (second deep-dive pair after `solar_hail`).

**Related repos:** [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling) (canonical subsystems + damage curves) · [`Hazard_Modeling`](https://github.com/aamani-ai/Hazard_Modeling) (M0→M4 engine + RangeCompare dashboard).

> **Correction note (v0.3.1).** The original v0.3 report recorded the solar_flood damage artifact as N/A, marked the crosswalk `PENDING_UPSTREAM_ARTIFACTS`, and used a single invented `FLOOD_ELECTRICAL_BOS` bucket (~`$217,279/MWdc`). That was wrong: the canonical `flood_solar` cell exists in `Damage_Modeling`. This report has been rewritten to the canonical grain (8 named failure units + real depth→DR ordinates); the crosswalk status is now `RESOLVED_FROM_DAMAGE_MODELING`.

- Value workbook loaded with `artifact_tool` (peril-agnostic value ladder reused): PASS
- Solar flood damage artifact loaded: **PASS — canonical `flood_solar` cell** (`Damage_Modeling/docs/cells/flood_solar/current/flood_solar__model_v1_0__docs_r3__curve_artifact.json`); crosswalk is `RESOLVED_FROM_DAMAGE_MODELING`
- Benchmark number matrix rows: 34
- Source matrix rows: 32
- Source registry entries: 32
- Benchmark value/damage crosswalk rows: 3
- Canonical flood_solar failure units: 8
- Canonical per-failure-unit depth→DR intensity reference rows: 12
- Benchmark rows that normalize to a $/MW basis: **3 of 34**
- Required files exist: PASS
- `data/` copies match pair-folder copies: PASS

Row counts above are computed directly from the CSV/JSON files and equal the values recorded in `99_metadata/validation_v0_3.json`.

## Key extracted values

| Value | $/MWdc | % installed TIV |
|---|---:|---:|
| Installed TIV (denominator) | $1,120,000 | 100.00% |
| Physical replaceable value (denominator) | $877,796 | 78.37% |
| FS_INV (INVERTER_SYSTEM/INVERTER) | $32,306 | 2.884% |
| FS_SWG (SUBSTATION/SWITCHGEAR) | $68,385 | 6.106% |
| FS_XFMR (SUBSTATION/TRANSFORMER_MAIN) | $38,119 | 3.404% |
| FS_COMB (INVERTER_SYSTEM/COMBINER+DC_PROTECTION) | $6,826 | 0.609% |
| FS_SCADA (SCADA/MONITORING_SYSTEM) | $1,310 | 0.117% |
| FS_CABLE (ELECTRICAL_COLLECTION/CABLE_AC+DC) | $69,320 | 6.189% |
| FS_FOUND (FOUNDATION/FOUNDATION_BASE) | $31,124 | 2.779% |
| FS_PVMOD (PV_ARRAY/PV_MODULE) | $291,215 | 26.001% |
| **PRIMARY depth-driven electrical** (INV+SWG+XFMR+COMB+SCADA) | **$146,947** | **13.120%** |
| **ALL 8 flood failure units** | **$538,607** | **48.090%** |

## Normalized flood benchmarks (the only three that land on a $/MW basis)

| Benchmark | $/MWdc | % installed TIV | % PRIMARY electrical | % ALL-8 units | % FS_INV |
|---|---:|---:|---:|---:|---:|
| DEPCOM avoided-loss per MW (sensitivity) | $43,478 | 3.88% | 29.59% | 8.07% | 134.6% |
| VDE/AXIS flood per MW (13-yr portfolio aggregate) | $32.61 | 0.003% | 0.02% | 0.01% | 0.10% |
| Valdora zero-loss per MW (measured zero) | $0 | 0.00% | 0.00% | 0.00% | 0.00% |

## Findings / caveats

```text
- Isolated solar-flood $/MW physical severity is genuinely scarce. Only three open
  benchmarks normalize to $/MW, and they are an avoided-loss figure, a portfolio
  aggregate, and a measured zero — none is a clean per-event physical-damage $/MW.
- The most reliable open dollars are litigation totals (First Solar/Zurich ~$10.1M
  asserted; South Alexander ~$1.1M) that lack a MW denominator and are dominated by
  deductible/BI structure.
- The flood failure grain is the canonical 8 named flood_solar failure units (mostly
  electrical: FS_INV, FS_SWG, FS_XFMR, FS_COMB, FS_SCADA, FS_CABLE; plus conditional
  FS_FOUND and FS_PVMOD), NOT PV module glass. The value ladder is reused from solar_hail
  because it is peril-agnostic; the failure-unit buckets are the canonical flood_solar units.
- The canonical flood_solar cell EXISTS in Damage_Modeling, so the crosswalk is
  RESOLVED_FROM_DAMAGE_MODELING. The depth->DR ordinates are the real per-failure-unit
  piecewise-linear curves from the flood_solar curve artifact — public-source-anchored
  engineering parameterizations (DOE/FEMP, NEMA, FEMA, USACE HEC-FIA), NOT claims-calibrated.
  The crosswalk classifies comparability; it does not tune a curve.
- DEPCOM's $43,478/MW avoided-loss sits at ~30% of the primary electrical bucket and ~8%
  of the full 8-unit envelope; it exceeds FS_INV alone (134.6%), correctly flagging that
  more than the inverters were involved (a grain warning, not DR>1).
```
