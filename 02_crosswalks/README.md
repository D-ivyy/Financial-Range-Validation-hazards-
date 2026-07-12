# Crosswalks

**Version:** v0.6  
**Created:** 2026-06-26  
**Last updated:** 2026-07-11

This folder holds denominator / grain crosswalks between external renewable-loss reference numbers, the project value ledger, and the canonical damage-model artifacts.

Crosswalks are not calibration rules. They exist to prevent category errors such as comparing:

```text
net insured claim dollars  vs  M3 gross physical module damage
whole-plant TIV            vs  PV_ARRAY failure-unit value
event loss                 vs  annual AAL
BI / downtime              vs  physical replacement damage
all-cause / equipment fire vs  EXOGENOUS (landscape) wildfire physical damage
smoke / soiling revenue    vs  physical burn damage
farm-average $/MW           vs  per-struck-turbine tornado-corridor severity
hurricane / hail-SCS loss   vs  convective straight-line / tornado wind damage
```

Current crosswalks:

| Pair | File | Status |
|---|---|---|
| `solar_hail` | [`solar_hail_value_damage_crosswalk.md`](solar_hail_value_damage_crosswalk.md) | built in v0.2 |
| `solar_flood` | [`solar_flood_value_damage_crosswalk.md`](solar_flood_value_damage_crosswalk.md) | built v0.3, resolved v0.3.1 — `RESOLVED_FROM_DAMAGE_MODELING` (uses the canonical `flood_solar` cell: 8 named failure units FS_INV…FS_PVMOD + real depth→DR ordinates from `Damage_Modeling`) |
| `solar_wildfire` | [`solar_wildfire_value_damage_crosswalk.md`](solar_wildfire_value_damage_crosswalk.md) | built v0.4 — `RESOLVED_GRAIN_DR_WITHHELD` (uses the canonical `wildfire_solar` cell: 11 named failure units WS_MODULE_THERMAL…WS_SUPPORT_COST_ALLOCATION + value ladder; DR ordinates WITHHELD upstream `NO_RUNTIME_CURVE`). Fenced by the ignition-origin rule: only EXOGENOUS (landscape) fire is in scope; no open exogenous-wildfire $/MW severity exists to recast |
| `wind_convective_wind` | [`wind_convective_wind_value_damage_crosswalk.md`](wind_convective_wind_value_damage_crosswalk.md) | built v0.5 — `RESOLVED_FROM_DAMAGE_MODELING` (uses the canonical `wind_tornado_wind` cell: 5 named structural failure units WT_BLADE_STRUCT/WT_TOWER_STRUCT/WT_NACELLE_CONSEQ/WT_FOUNDATION_OT/WT_POWER_ELEC_ACCEL + value ladder + real speed-ratio→DR logistic ordinates). Onshore turbines; SLW/derecho = D50 baseline pathway, tornado = D50-shifted pathway; hurricane/TC and hail-SCS fenced out. Strongest open dollars (Flat Ridge 2 $7.25M net) are farm-level with no MW denominator → withheld from $/MW; best straight-line anchor is a measured null (2020 derecho) |
| `wind_convective_wind` — v2 preview | [`wind_convective_wind_v2_proposed_value_damage_crosswalk.md`](wind_convective_wind_v2_proposed_value_damage_crosswalk.md) | added v0.6 — `PROPOSED / NON-CANONICAL` preview only. Recasts the same 27 benchmark rows onto a staged, non-promoted v2.0 (docs r1) two-pathway `wind_tornado_wind` candidate (`straight_line_convective` + `tornado_direct_hit`, ordered damage states on a single `$1,090,000/MW` turbine-equipment atom, `beta_ln` 0.10/0.08). **Does not alter or supersede the v0.5 `RESOLVED_FROM_DAMAGE_MODELING` row above** — v1.0 docs r4 remains the canonical `Damage_Modeling` runtime; `promotion: not_performed` |
