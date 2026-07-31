# Plausible Financial Range — Expected Annual Loss (EAL) by Hazard × Asset

Version: v0.8
Created: 2026-07-31
Parent anchor: `00_anchor/renewable_loss_reference_source_pathways.md`
Metric family: **EAL / AAL only** (annualized expectation)

**Purpose.** This file expresses, for each built hazard × asset pair, a *plausible range* of
**Expected Annual Loss** as a percentage of **installed TIV**, split into low / mid / high
exposure tiers, with the reasoning and the source reference behind each band.

**What this file IS NOT.** It is not a calibration harness. These bands are a
**source-pathway / normalization layer**: they organize and normalize evidence so a separate
catastrophe damage model can be sanity-checked against credible ranges. They define no
pass/fail criteria, they do not tune any damage curve, and a model landing outside a band is
**not** thereby "wrong" — it is a prompt to inspect the frame.

**Scope boundary — EAL only.** Tail metrics (PML, OEP/AEP at return period, VaR, TVaR) are a
**separate deliverable** and are deliberately excluded here. Damage cells own severity curves
only; tail metrics are downstream and owned by the hazard catalog / financial model. A tail
table is tracked as the next artifact.

---

## 1. Denominator and metric frame

| Frame element | Solar | Wind (onshore) |
|---|---|---|
| Value basis | `installed_TIV` | `installed_TIV` |
| Denominator | `$1,120,000 / MWdc` | `$1,968,000 / MW` |
| Physical replaceable | `$877,796 / MWdc` (78.375%) | `$1,623,000 / MW` (82.470%) |
| Source | [NREL/DOE PV Cost Benchmark Q1 2024](https://www.nrel.gov/docs/fy24osti/89303.pdf) | [NREL Cost of Wind Energy Review 2024](https://www.nrel.gov/docs/fy25osti/91775.pdf) |
| Loss basis | Gross, pre-deductible, direct physical damage | same |
| Aggregation | Site-level, per MW of nameplate | same |
| EP frame | Annualized expectation (AAL/EAL). **Not** OEP/AEP. | same |

Business interruption, contingent BI, and revenue loss are **out of scope** — physical damage only.

---

## 2. How each band was derived

Two independent evidence streams, cross-checked against each other:

**Stream A — empirical (preferred where it exists).** Open, dated benchmark rows from
`01_pairs/<pair>/benchmark_number_matrix.csv`, normalized to %TIV against the denominators above.

**Stream B — engineering-derived (used where Stream A is thin).**

```text
EAL contribution  ≈  conditional severity (%TIV)  ×  annual exceedance probability (1 / RP)
```

Conditional severity is read from the **canonical Damage_Modeling DR curve** for the cell
(`01_pairs/<pair>/damage_curve_intensity_reference.csv`), value-weighted by the canonical
failure-unit shares. Return periods are stated explicitly per tier and are **assumptions, not
measurements** — they are the judgment layer and are flagged as such in every row.

Where both streams exist (solar × hail), they are reported together and the convergence is noted.
Where only Stream B exists, the row is tagged `ENGINEERING_DERIVED` and must not be cited as
observed loss experience.

**Tier definition.** Tiers are **exposure/design regimes**, not return periods:

- **Low** — favourable siting + hardened/mitigated design
- **Mid** — typical siting, standard design, moderate hazard region
- **High** — adverse siting (hazard-alley / floodplain / WUI) + unmitigated design

---

## 3. The table

| Hazard × Asset | Tier | Per-event conditional severity (%TIV) | **Annual EAL (%TIV/yr)** | Reasoning | Reference |
|---|---|---|---|---|---|
| **SOLAR × HAIL**<br>*evidence: strong*<br>`solar_hail` v0.2 | Low | `1.5 – 5%`<br>hardened 3.2mm+ glass, fully stowed, 2.0–2.4″ | **`0.05 – 0.30%`** | Stowing plus thicker glass collapses DR by ~5–10× at the same stone size. Upper bound is pinned to the *observed* resilient-design AAL, not extrapolated. | Empirical: kWh/POWER Mag resilient case `$307,790/yr per 100MW` = **0.275%TIV/yr**. Curve: `HAIL_SOLAR_HARDENED_THICKER` stowed, 50–60mm → 1.53–5.20%TIV. |
| | Mid | `9 – 21%`<br>default 3.2mm glass, stowed, 2.2″ | **`0.30 – 1.00%`** | Central case. Stream A and Stream B independently land here: empirical baseline AAL 0.949% sits at the top of the band; `8.95% ÷ 30yr = 0.298%` sits at the bottom. Convergence of two independent methods on the same interval. | Empirical: kWh/POWER Mag baseline `$1,062,720/yr per 100MW` = **0.949%TIV/yr**. Curve: `HAIL_SOLAR_DEFAULT_3P2_GBS` stowed @55mm = 8.95%TIV. |
| | High | `27 – 35%`<br>unstowed, hail alley, 2.4–3.5″ | **`1.00 – 2.50%`** | Hail alley sites take repeated sub-catastrophic strikes, so annual losses *stack* — EAL is not one event. Derivation `27.39% ÷ 25yr = 1.10%` sets the floor; upper bound respects the observed 1-in-100 >10%TIV threshold without extrapolating past it. | Empirical: AXIS `$340k–$380k/MW` = **30.4–33.9%TIV** event severity; GCube sensitivity `$584k/MW` = 52.1%TIV; kWh SRA 1-in-100 hail loss **>10% asset value**. Curve: unstowed default @60mm = 27.39%TIV. |
| **SOLAR × FLOOD**<br>*evidence: thin (3 normalized rows)*<br>`solar_flood` v0.3.1 | Low | `~17%`<br>well-sited, 0.15m nuisance depth | **`0.01 – 0.03%`**<br>`ENGINEERING_DERIVED` | Solar is preferentially sited off floodplain, so exposure probability dominates and is very small. `17.53% ÷ 1000yr = 0.018%`. | Curve: value-weighted FS units @0.15m = **17.53%TIV**. Empirical corroboration: Valdora Solar **$0/MW** — a real flood event with zero physical loss. |
| | Mid | `~29%`<br>standard setback, 0.3m | **`0.03 – 0.10%`**<br>`ENGINEERING_DERIVED` | `28.56% ÷ 500yr = 0.057%`. Consistent in order of magnitude with the peril-mix derived figure, which implies flood is a rounding error in aggregate solar loss. | Curve: @0.30m = **28.56%TIV**. Empirical: VDE/AXIS peril mix derived `$32.61/MW` = **0.003%TIV** aggregate. |
| | High | `29 – 42%`<br>floodplain-sited, 0.3–1.0m | **`0.10 – 0.50%`**<br>`ENGINEERING_DERIVED` | Only meaningful for genuinely floodplain-sited plant. `28.56% ÷ 100yr = 0.286%`. Note the asymmetry: conditional severity is *high* (inverters/switchgear drown at ankle depth) but annual expectation stays small. | Curve: @0.3m = 28.56%TIV, @1.0m = **41.98%TIV**. Empirical: DEPCOM avoided-loss `$43,478/MW` = **3.88%TIV** event-scale. |
| **SOLAR × STRONG WIND**<br>*evidence: moderate*<br>`solar_strong_wind` v0.7 | Low | `~5%`<br>low-convective region, 110mph gust | **`0.01 – 0.03%`**<br>`ENGINEERING_DERIVED` | The DR curve is **exactly zero below 100mph** — sub-design gusts contribute nothing to EAL. `5.09% ÷ 250yr = 0.020%`. | Curve: `struct_agg_pct_installed_TIV` @110mph = **5.087%TIV** (V_design 115mph). |
| | Mid | `~9%`<br>at design gust, 115mph | **`0.03 – 0.15%`**<br>`ENGINEERING_DERIVED` | `9.37% ÷ 100yr = 0.094%`. Empirical support is indirect: no open source isolates pure straight-line-wind $ severity for solar. | Curve: @115mph (= V_design) = **9.37%TIV**. Empirical: Soltec 2019 `~2% of trackers` collapsed/damaged — a low-severity real outcome. |
| | High | `15 – 25%`<br>derecho-prone plains, 120–130mph | **`0.15 – 0.60%`**<br>`ENGINEERING_DERIVED` | `15.13% ÷ 50yr = 0.303%`. Tracker stow reliability is the swing factor — NEXTracker 25-yr failure probability spans **1.7–14.6%**, an ~8× spread that maps directly onto this band's width. | Curve: @120mph = **15.13%TIV**, @130mph = 25.32%TIV. Empirical: AXIS `$150k–$380k/MW` = **13.4–33.9%TIV** (stow scenarios, hail-framed — blended use). DOE FEMP repair range `0.9%–134%TIV`. |
| **WIND × CONVECTIVE WIND**<br>*evidence: thin (no loss rows)*<br>`wind_convective_wind` v0.5/v0.6 | Low | `~1.4%`<br>straight-line 145mph | **`< 0.01%`**<br>`ENGINEERING_DERIVED` | Turbines are engineered to IEC Ve50 survival, so straight-line convective wind essentially never governs. `1.39% ÷ 200yr = 0.007%`. | Curve: `struct_agg_pct_TIV_SLW` @145.4mph = **1.39%TIV**. |
| | Mid | `~2.9%`<br>tornado core, 179mph | **`0.01 – 0.05%`**<br>`ENGINEERING_DERIVED` | `2.90% ÷ 100yr = 0.029%`. Tornado severity is capped by geometry, not strength: only ~10% of farm footprint sits in the damage corridor, so even violent tornadoes cap near 5.5%TIV. | Curve: `struct_agg_pct_TIV_TOR` @179mph = **2.90%TIV**; asymptote 5.55%TIV @257mph. |
| | High | `4.0 – 5.5%`<br>tornado alley core, 190mph+ | **`0.05 – 0.15%`**<br>`ENGINEERING_DERIVED` | `3.97% ÷ 40yr = 0.099%`. This is the **lowest-EAL pair in the package** — both severity (corridor-capped) and frequency (point-strike probability) are small. | Curve: TOR @190.1mph = **3.97%TIV**, asymptote **5.55%TIV**. No open empirical loss row exists; only the NREL value basis is populated. |
| **SOLAR × WILDFIRE**<br>*evidence: DR withheld upstream*<br>`solar_wildfire` v0.4 | Low | *not publishable* | **`< 0.01%`**<br>`ENGINEERING_DERIVED`, low confidence | Non-WUI siting. Band is an order-of-magnitude placeholder only. | Upstream status `RESOLVED_GRAIN_DR_WITHHELD` — **no runtime DR curve**; zero normalized benchmark rows out of 100 catalogued. |
| | Mid | *not publishable* | **`0.01 – 0.05%`**<br>`ENGINEERING_DERIVED`, low confidence | Burnover of a utility-scale PV site is rare; gravel pads and vegetation management create fuel breaks. Value at risk if burnover occurs is the thermal-exposed stack. | Value basis available (`WS_MODULE_THERMAL` `$291,215/MW` = 26.0%TIV; `WS_RACKING_THERMAL` `$109,990/MW` = 9.8%TIV) but **no DR ordinates to apply to it**. |
| | High | *not publishable* | **`0.05 – 0.30%`**<br>`ENGINEERING_DERIVED`, low confidence | WUI-sited plant in a high-FSIM-probability cell. **Caveat that materially changes interpretation:** much of the reported "fire" loss in PV portfolios is *equipment-origin* (combiner/connector arcing), not regional wildfire burnover — those are a different peril and must not be pooled into a wildfire EAL. | Hazard axis is `FSIM_CONDITIONAL_FLAME_LENGTH_PROBABILITY` (USFS FSIM RDS 2023, 270m) — a *conditional* probability given burning, which still requires an unconditional burn probability to become an EAL. That second term is not in the dossier. |

---

## 4. Where to focus — PML vs AAL

This falls directly out of the table. The diagnostic is the ratio of tail severity to annual
expectation: when a pair's EAL is small but its conditional severity is large, the annual number
tells you almost nothing and the tail governs.

| Hazard × Asset | High-tier EAL | High-tier conditional severity | Severity ÷ EAL | Focus |
|---|---|---|---|---|
| Solar × Hail | `1.00 – 2.50%/yr` | `27 – 35%` | ~14× | **AAL-driven.** The only pair where annual expectation is material on its own. Losses stack from repeated sub-catastrophic strikes, so an AAL view captures most of the risk. Still carry a PML for the 3″+ scenario. |
| Solar × Strong wind | `0.15 – 0.60%/yr` | `15 – 25%` | ~50× | **PML-driven.** Curve is zero below 100mph — all risk is concentrated in rare events. AAL will look deceptively benign. |
| Solar × Flood | `0.10 – 0.50%/yr` | `29 – 42%` | ~120× | **PML-driven, strongly.** The widest severity-to-EAL gap in the package. Ankle-deep water destroys the electrical stack, but it almost never happens. AAL is actively misleading here. |
| Wind × Convective wind | `0.05 – 0.15%/yr` | `4.0 – 5.5%` | ~45× | **PML-driven, but low priority overall.** Both terms are small; corridor geometry caps severity near 5.5%TIV. Least material pair in the package. |
| Solar × Wildfire | `0.05 – 0.30%/yr` | *unknown* | *unknown* | **Cannot be assigned.** No DR curve upstream and no unconditional burn probability. Any PML/AAL split here would be fabricated. Treat as an open research item. |

**Reading it in one line:** hail is the pair where the annual number is the right lens; flood and
strong wind are pairs where the annual number will lull you and the tail is the real story;
convective wind is small on both axes; wildfire is not yet answerable.

---

## 5. Confidence and known gaps

| Pair | Empirical rows normalized to %TIV | Canonical DR curve | Band confidence |
|---|---|---|---|
| `solar_hail` | 11 of 24 | Yes (3 archetypes × stow states) | **High** — two independent streams converge |
| `solar_strong_wind` | 8 of 30 (6 loss-bearing) | Yes (`struct_agg_pct_installed_TIV`) | **Medium** — strong curve, blended/hail-framed empirical |
| `solar_flood` | 3 of 34 | Yes (8 failure units) | **Medium-low** — strong curve, near-absent loss experience |
| `wind_convective_wind` | 2 of 27 (both value basis, no losses) | Yes (SLW + TOR pathways) | **Low** — curve-only, no empirical anchor |
| `solar_wildfire` | 0 of 100 | **No** — withheld upstream | **Very low** — order-of-magnitude placeholder only |

**Gaps that would most improve these bands, in priority order:**

1. **Unconditional burn probability for `solar_wildfire`** plus release of the withheld DR
   ordinates from the `wildfire_solar` cell. Without both, wildfire EAL stays a placeholder.
2. **Any open straight-line-wind loss row for onshore wind.** `wind_convective_wind` currently has
   zero loss-bearing normalized rows; the band rests entirely on the engineering curve.
3. **Return-period grounding.** Every `ENGINEERING_DERIVED` band uses an assumed RP. Replacing
   those assumptions with site-specific hazard-catalog exceedance curves would move four of five
   pairs from judgment to measurement.
4. **A flood exposure denominator** — what fraction of operating solar capacity actually sits in
   the 100/500-yr floodplain. This single number would tighten the flood band substantially.

---

## 6. Non-scope disclaimer

This table normalizes and organizes evidence. It does not validate, calibrate, or certify any
model. No band here is a pass/fail criterion. Bands tagged `ENGINEERING_DERIVED` embed explicit
return-period assumptions that are judgment, not observation, and must be re-examined before any
downstream use. Tail metrics (PML, OEP/AEP, VaR, TVaR) are out of scope and are the subject of a
separate forthcoming artifact.
