# Crosswalks

**Version:** v0.2  
**Created:** 2026-06-26

This folder holds denominator / grain crosswalks between external renewable-loss reference numbers, the project value ledger, and the canonical damage-model artifacts.

Crosswalks are not calibration rules. They exist to prevent category errors such as comparing:

```text
net insured claim dollars  vs  M3 gross physical module damage
whole-plant TIV            vs  PV_ARRAY failure-unit value
event loss                 vs  annual AAL
BI / downtime              vs  physical replacement damage
```

Current crosswalks:

| Pair | File | Status |
|---|---|---|
| `solar_hail` | [`solar_hail_value_damage_crosswalk.md`](solar_hail_value_damage_crosswalk.md) | built in v0.2 |
