# Validation report — v0.4

Pair added: `solar_wildfire` (third deep-dive pair after `solar_hail` and `solar_flood`).

**Related repos:** [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling) (canonical subsystems + damage curves) · [`Hazard_Modeling`](https://github.com/aamani-ai/Hazard_Modeling) (M0→M4 engine + RangeCompare dashboard).

> **Scope fence (load-bearing).** This pair covers ONLY the **EXOGENOUS (landscape-originated)** wildfire physical-damage slice: fire ignites outside the site in vegetation, spreads, reaches the asset, and damages it via flame/radiant/ember/convective heat. The magnitude axis is **FSim conditional flame-length → fireline intensity**, NOT ecological burn severity (dNBR/MTBS = geography check only). Explicitly **OUT OF SCOPE** (named-and-deferred, distinct perils): endogenous/asset-originated fire (inverter, connector/wiring, combiner, module/junction-box, transformer, BESS thermal runaway), smoke/soiling optical generation loss, PSPS, and business interruption.

- Value workbook loaded with `artifact_tool` (peril-agnostic value ladder reused): PASS
- Wildfire damage artifact loaded: **PASS — canonical `wildfire_solar` cell** (`Damage_Modeling/docs/cells/wildfire_solar/proposed/wildfire_solar__model_v0_1__docs_r1__curve_artifact.json`)
- Wildfire DR ordinates available: **NO — withheld upstream** (`ordinate_status=withheld`, `withheld_reason_codes=[NO_RUNTIME_CURVE]`); crosswalk status is `RESOLVED_GRAIN_DR_WITHHELD`
- Benchmark number matrix rows: 100
- Source matrix rows: 63
- Source registry entries: 63
- Benchmark value/damage crosswalk rows: 3
- Canonical wildfire_solar failure units: 11
- FSim conditional flame-length intensity-reference bins: 6
- Benchmark rows that normalize to a $/MW basis: **0 of 100** (every `normalized_usd_per_MW` cell blank, never zero)
- Required files exist: PASS
- `data/` copies match pair-folder copies: PASS

Row counts above are computed directly from the CSV/JSON files and equal the values recorded in `99_metadata/validation_v0_4.json`.

## Key extracted values (canonical `wildfire_solar` failure units)

| Value | $/MWdc | % installed TIV |
|---|---:|---:|
| Installed TIV (denominator) | $1,120,000 | 100.00% |
| Physical replaceable value (denominator) | $877,796 | 78.37% |
| WS_MODULE_THERMAL (PV_ARRAY) | $291,215 | 26.001% |
| WS_RACKING_THERMAL (MOUNTING) | $109,990 | 9.820% |
| WS_MV_EQUIPMENT_SPLIT_REQUIRED (SUBSTATION_AND_MV) | $106,505 | 9.509% |
| WS_DC_CABLE_EXPOSED (ELECTRICAL_COLLECTION) | $69,320 | 6.189% |
| WS_INVERTER_CONTROL_DIRECT (INVERTER_SYSTEM) | $32,306 | 2.884% |
| WS_CIVIL_INFRA_SPLIT_REQUIRED (CIVIL_INFRA) | $31,224 | 2.788% |
| WS_FOUNDATION_REVIEW (FOUNDATION) | $31,124 | 2.779% |
| WS_GROUNDING_LIGHTNING_REVIEW (GROUNDING_LIGHTNING) | $8,385 | 0.749% |
| WS_COMBINER_CONNECTOR (ELECTRICAL_COLLECTION) | $6,826 | 0.609% |
| WS_SCADA_CONTROL_DIRECT (SCADA) | $1,310 | 0.117% |
| WS_SUPPORT_COST_ALLOCATION (field labor — allocation rule, not a curve) | $106,869 | 9.542% |
| **DIRECT-hardware envelope (rows 2–10)** | **$656,981** | **58.659%** |
| **PV module hardware cap (WS_MODULE_THERMAL)** | **$291,215** | **26.001%** |

## Normalized wildfire benchmarks

```text
NONE. 0 of 100 benchmark rows normalize to a $/MW basis. Every normalized_usd_per_MW cell is blank
(never zero). No isolated, properly-scoped EXOGENOUS-wildfire solar $/MW physical-severity figure exists
in the open literature. The closest in-scope physical anchor is a UNIT COUNT: the DEPCOM Kern County 2020
event, where ~1,000 of ~80,000 modules (~1.25%) were destroyed at a 20 MW site — an illustrative point,
not a $/MW, not a damage ratio, and mixed with firefighting-water damage.
```

## Fire-origin family census

```text
benchmark rows (100):                       sources (63):
  HAZARD_INTENSITY_ENGINEERING     30          HAZARD_INTENSITY_ENGINEERING     20
  EXPOSURE_DENOMINATOR             24          EXPOSURE_DENOMINATOR             13
  SMOKE_SOILING_GENERATION         20          ALL_CAUSE_PV_FIRE_BLENDED        12
  ALL_CAUSE_PV_FIRE_BLENDED        12          SMOKE_SOILING_GENERATION          9
  EXOGENOUS_WILDFIRE_DIRECT         8          EXOGENOUS_WILDFIRE_DIRECT         6
  ENDOGENOUS_ASSET_ORIGINATED_FIRE  6          ENDOGENOUS_ASSET_ORIGINATED_FIRE  3
```

## Findings / caveats

```text
- Isolated EXOGENOUS-wildfire solar $/MW physical severity is genuinely ABSENT. The in-scope family
  (EXOGENOUS_WILDFIRE_DIRECT) is the smallest group and none of its members carry an open $/MW severity;
  the members are unit-counts (acres, MW nameplate, modules destroyed, restoration days) or avoided-cost /
  vendor-success framings.
- The largest open fire families are the WRONG origin/peril for this cell. ALL_CAUSE_PV_FIRE_BLENDED
  (kWh Analytics inverter 44% / "84% equipment-driven"; GCube fires 16% count / 20% cost) blends
  endogenous + exogenous ignition and is tagged CONTEXT_NOT_BENCHMARK. SMOKE_SOILING_GENERATION
  (CAISO ~13-30%, NREL 7.7%/19%, FEMP/OSTI 9.4-37.8%) is a separate revenue peril, never blended with
  physical damage.
- kWh's "84% equipment-driven" headline is unsupported by its own chart: 84% = 100% - 16% wildfire, which
  sweeps 27% unknown + 3% other into "equipment". The defensible reading is ~16% external wildfire, ~55%
  identified equipment causes, ~27% unknown.
- Named "solar fire" events were origin-checked: DEPCOM Kern, Wellington North, Beryl, Canyon Fire 2,
  Kings County, Energy Safe Vic = EXOGENOUS; CVSR 2019 (avian/electrical arc), Mannum & Raywood (inverter)
  = ENDOGENOUS and excluded from the exogenous count.
- The wildfire failure grain is the canonical 11 named wildfire_solar WS_* failure units spanning module,
  mounting, electrical, MV, and civil subsystems plus a support-cost allocation rule — thermal attack
  touches nearly every subsystem, unlike hail (one module-glass unit) or flood (~8 mostly-electrical units).
  The value ladder is reused from solar_hail/solar_flood because it is peril-agnostic.
- The canonical wildfire_solar cell EXISTS but its DR ordinates are WITHHELD upstream (NO_RUNTIME_CURVE),
  so the crosswalk is RESOLVED_GRAIN_DR_WITHHELD: the value grain is resolved (11 WS_* units used verbatim),
  but no damage ratio is available and every DR ordinate cell is blank/WITHHELD. We do not invent the
  missing curve.
- A future $/MW that exceeds a failure unit's value share is a grain warning (more units involved), NOT a
  damage ratio above 1.0. This dossier organizes and normalizes evidence; it does not validate or calibrate.
```
