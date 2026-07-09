# Validation report — v0.3

Pair added: `solar_flood` (second deep-dive pair after `solar_hail`).

- Value workbook loaded with `artifact_tool` (peril-agnostic value ladder reused): PASS
- Solar flood damage artifact loaded: **N/A — no solar-specific flood depth-damage artifact exists** (crosswalk is `PENDING_UPSTREAM_ARTIFACTS`)
- Benchmark number matrix rows: 34
- Source matrix rows: 32
- Source registry entries: 32
- Benchmark value/damage crosswalk rows: 3
- Provisional (generic-industrial) intensity reference rows: 9
- Benchmark rows that normalize to a $/MW basis: **3 of 34**
- Required files exist: PASS
- `data/` copies match pair-folder copies: PASS

Row counts above are computed directly from the CSV/JSON files and equal the values recorded in `99_metadata/validation_v0_3.json`.

## Key extracted values

| Value | $/MWdc |
|---|---:|
| Installed TIV | $1,120,000 |
| Physical replaceable value | $877,796 |
| FLOOD_ELECTRICAL_BOS (inverter+electrical+foundation) | $217,279 |
| FLOOD_ELECTRICAL_BOS + substation | $323,783 |
| FLOOD_ELECTRICAL_BOS + replacement fieldwork | $324,147 |

## Normalized flood benchmarks (the only three that land on a $/MW basis)

| Benchmark | $/MWdc | % installed TIV | % FLOOD_ELECTRICAL_BOS |
|---|---:|---:|---:|
| DEPCOM avoided-loss per MW (sensitivity) | $43,478 | 3.88% | 20.01% |
| VDE/AXIS flood per MW (13-yr portfolio aggregate) | $32.61 | 0.003% | 0.02% |
| Valdora zero-loss per MW (measured zero) | $0 | 0.00% | 0.00% |

## Findings / caveats

```text
- Isolated solar-flood $/MW physical severity is genuinely scarce. Only three open
  benchmarks normalize to $/MW, and they are an avoided-loss figure, a portfolio
  aggregate, and a measured zero — none is a clean per-event physical-damage $/MW.
- The most reliable open dollars are litigation totals (First Solar/Zurich ~$10.1M
  asserted; South Alexander ~$1.1M) that lack a MW denominator and are dominated by
  deductible/BI structure.
- The flood failure unit is electrical/BOS/foundation, NOT PV module glass. The value
  ladder is reused from solar_hail because it is peril-agnostic; only the failure-unit
  bucket is re-rolled.
- No solar-specific flood depth-damage function exists publicly. The depth->DR table is
  a generic industrial proxy (JRC North America Industrial) and is NOT solar-calibrated.
  Therefore the crosswalk is PENDING_UPSTREAM_ARTIFACTS and must not be used to tune a
  solar flood curve.
```
