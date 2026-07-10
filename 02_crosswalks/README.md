# Crosswalks

**Version:** v0.4  
**Created:** 2026-06-26  
**Last updated:** 2026-07-10

This folder holds denominator / grain crosswalks between external renewable-loss reference numbers, the project value ledger, and the canonical damage-model artifacts.

Crosswalks are not calibration rules. They exist to prevent category errors such as comparing:

```text
net insured claim dollars  vs  M3 gross physical module damage
whole-plant TIV            vs  PV_ARRAY failure-unit value
event loss                 vs  annual AAL
BI / downtime              vs  physical replacement damage
all-cause / equipment fire vs  EXOGENOUS (landscape) wildfire physical damage
smoke / soiling revenue    vs  physical burn damage
```

Current crosswalks:

| Pair | File | Status |
|---|---|---|
| `solar_hail` | [`solar_hail_value_damage_crosswalk.md`](solar_hail_value_damage_crosswalk.md) | built in v0.2 |
| `solar_flood` | [`solar_flood_value_damage_crosswalk.md`](solar_flood_value_damage_crosswalk.md) | built v0.3, resolved v0.3.1 — `RESOLVED_FROM_DAMAGE_MODELING` (uses the canonical `flood_solar` cell: 8 named failure units FS_INV…FS_PVMOD + real depth→DR ordinates from `Damage_Modeling`) |
| `solar_wildfire` | [`solar_wildfire_value_damage_crosswalk.md`](solar_wildfire_value_damage_crosswalk.md) | built v0.4 — `RESOLVED_GRAIN_DR_WITHHELD` (uses the canonical `wildfire_solar` cell: 11 named failure units WS_MODULE_THERMAL…WS_SUPPORT_COST_ALLOCATION + value ladder; DR ordinates WITHHELD upstream `NO_RUNTIME_CURVE`). Fenced by the ignition-origin rule: only EXOGENOUS (landscape) fire is in scope; no open exogenous-wildfire $/MW severity exists to recast |
