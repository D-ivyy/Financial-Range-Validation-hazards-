# Solar × strong / straight-line convective wind — renewable loss reference source deep dive

**Version:** v0.7
**Last researched:** 2026-07-13
**Parent anchor:** [`../../00_anchor/renewable_loss_reference_source_pathways.md`](../../00_anchor/renewable_loss_reference_source_pathways.md)
**Related repos:** [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling) (canonical subsystems + damage curves) · [`Hazard_Modeling`](https://github.com/aamani-ai/Hazard_Modeling) (M0→M4 engine + RangeCompare dashboard)
**Purpose:** catalogue and normalize the public evidence for **utility-scale ground-mount PV physical damage under strong / straight-line convective wind** (synoptic gusts, derecho, microburst, gust-front outflow). This dossier is a **source-pathway / normalization layer, NOT a calibration harness** — it defines no pass/fail bands, tunes no curve, and treats no raw number as a benchmark until its frame is understood.

---

## 0. Bottom line

```text
No public source cleanly isolates pure straight-line / convective-wind $ severity for utility-scale solar.
```

Every open dollar figure is one of: **hail-stow framed** (AXIS stow-scenario `$/MW`), **hail-dominant** (GCube `54%` of solar claim cost is hail), **tornado-parametric** (Descartes `$70M` limit / `$7.5M` worked payout), **generic all-property SCS** (Gallagher Re / Aon / Swiss Re industry totals), or **gated** (Verisk/AIR, Moody's RMS, VDE/Cirrus, Renew Risk cat-model curves and PML/AAL runs).

The strongest **OPEN** solar-wind evidence is therefore **engineering / screening grade**, not clean loss benchmarks:

- **Stow-behavior severity swing** — AXIS `$380,000/MW` failed-stow vs `$150,000/MW` successful-stow; NEXTracker 25-yr cumulative failure probability `1.7%→14.6%` by stow strategy and site.
- **Aeroelastic onset** — CPP (2015) torsional galloping onset below `~40 m/s (~90 mph)` for un-stowed single-axis trackers.
- **Load ratings** — PVEL tracker-mounted module `±1800 Pa` vs fixed-tilt `±2400 Pa`.
- **Forensic damage states** — Cedar Rapids 2020 derecho ballasted-array liftoff at `~140 mph` vs `120 mph` design; Oakey (AU) `~2,000` modules at a `55 MW` plant; Soltec `~1–2%` tracker collapse concentrated in perimeter rows.

The installed-TIV basis `$1,120,000/MWdc` is **EXACT-confirmed** by the NREL/DOE Q1-2024 benchmark (`$1.12/W-dc`).

```text
Structural confirmation (important): Verisk/AIR (>70 damage functions incl. straight-line wind; solar codes 500-514/3001-3023),
Moody's RMS (convective wind "microbursts to derecho", renewable curves) and VDE/Cirrus (named-windstorm as its own PML/AAL peril line)
all confirm that straight-line wind IS modeled as a distinct solar peril — only the ordinates and magnitudes are gated.
So the sub-peril is isolable in principle; it is simply not published in the open.
```

---

## 1. Normalization basis used in this dossier

All `%` figures use the canonical solar value ladder (`Damage_Modeling/docs/method/value_basis/solar_wind_value_breakdown.xlsx`, Summary / Solar_Map):

```text
installed_TIV               = $1,120,000 / MWdc   (100%)   [NREL/DOE Q1-2024 exact cross-check: $1.12/W-dc]
physical_replaceable_value  =   $877,796 / MWdc   (78.4%)
excluded_sunk_soft/nonphys  =   $242,204 / MWdc   (21.6%)
```

`$/MW` normalization is applied **only** where a source gives a MW-denominated figure with a defensible scope. Where no MW denominator exists (e.g. the AXIS `$342M` gross-claim example), the `$/MW` cell is left **blank, not zero**, per the golden rule.

### 1.1 Value/damage cross-reference (RESOLVED against canonical strong_wind_solar)

This pair is a **Case A (RESOLVED)** crosswalk — the canonical `Damage_Modeling` cell exists:

```text
docs/cells/strong_wind_solar/current/
  strong_wind_solar__model_v1_0__docs_r3__curve_artifact.json   -> canonical_runtime_artifact = TRUE
  damage_curve_records_v1_0_strong_wind_solar.xlsx
```

The v1.0 cell uses a **thresholded-logistic demand curve** per failure unit on a 3-second-gust-at-array-height axis, `R_eff = (V_3s / V_design)^2 · mult`, `DR = max_DR/(1+exp(-k·(R_eff − R50)))` above the per-unit threshold `R0`. Five canonical failure units:

| Failure unit | Subsystem | share (phys) | `$/MWdc` | max_DR | R0 | R50 | k |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `SWS_TRACKER_STRUCT` | MOUNTING | `8%` | `$70,224` | `0.80` | `0.75` | `1.15` | `9` |
| `SWS_RACKING_STRUCT` | MOUNTING | `6%` | `$52,668` | `0.75` | `0.80` | `1.25` | `8` |
| `SWS_MODULE_ATTACH` | PV_ARRAY | `40%` | `$351,118` | `0.65` | `0.70` | `1.05` | `10` |
| `SWS_FOUNDATION_UPLIFT` | FOUNDATION | `8%` | `$70,224` | `0.45` | `0.90` | `1.35` | `7` |
| `SWS_SCADA_EXPOSED` | SCADA | `2%` | `$17,556` | `0.15` | `0.70` | `0.95` | `6` |

Full recast: [`../../02_crosswalks/solar_strong_wind_value_damage_crosswalk.md`](../../02_crosswalks/solar_strong_wind_value_damage_crosswalk.md). A separate **PROPOSED v2.0** two-architecture preview (non-canonical) is in [`../../02_crosswalks/solar_strong_wind_v2_proposed_value_damage_crosswalk.md`](../../02_crosswalks/solar_strong_wind_v2_proposed_value_damage_crosswalk.md).

> **Tracker vs racking are ALTERNATIVE architectures.** A plant is single-axis-tracker **or** fixed-tilt; summing both mounting buckets overstates a single-architecture plant. Module-attach (`40%`) is the dominant wind-exposed value on both.

---

## 2. Quick benchmark-number matrix

Full machine-readable version: [`benchmark_number_matrix.csv`](benchmark_number_matrix.csv) (30 rows). Highlights (all caveated — see the `caveats` column):

| Benchmark | Reported | `$/MWdc` | `% TIV` | Sub-peril | Grade |
| --- | --- | --- | --- | --- | --- |
| AXIS failed-stow | `$380,000/MW` | `$380,000` | `33.9%` | convective-blended | primary-candidate (blended) |
| AXIS fixed-tilt | `$340,000/MW` | `$340,000` | `30.4%` | convective-blended | primary-candidate (blended) |
| AXIS successful-hail-stow | `$150,000/MW` | `$150,000` | `13.4%` | convective-blended | primary-candidate (blended) |
| AXIS peril share | Hail 55 / Wildfire 23 / Tornado 18 | — | — | convective-blended | peril-share context |
| GCube hail avg claim | `$58.4M/claim` | — | — | convective-blended | hail (frequency vs cost signal) |
| Descartes tornado limit | `$70M` limit | — | — | tornado (quarantine) | market signal |
| Cedar Rapids derecho | liftoff @ `~140 mph` vs `120 mph` design | — | — | straight-line | case (no $) |
| Prescott AZ | destroyed @ `~70 mph` (below design) | — | — | straight-line | case, off-curve (workmanship) |
| NEXTracker stow | `1.7–14.6%` 25-yr failure prob | — | — | straight-line | screening (probability) |
| CPP galloping | onset `<~40 m/s (~90 mph)` | — | — | straight-line | mechanism / v2 axis |
| PVEL load | tracker `1800 Pa` vs fixed `2400 Pa` | — | — | straight-line | design-pressure split |
| Soltec | `~1–2%` tracker collapse (perimeter) | — | — | straight-line | fraction (no $) |
| Oakey (AU) | `~2,000` modules @ `55 MW` | — | — | straight-line | fraction (no $, non-US) |
| FEMP tiers | `$0.01–$1.50/W` (`~$10k–$1.5M/MW`) | blank | `0.9–134%` | straight-line | repair ladder (grain warning) |
| NREL/DOE TIV | `$1.12/W-dc` | `$1,120,000` | `100%` | — | TIV cross-check (exact) |

```text
The AXIS stow figures ($380k failed vs $150k successful) mostly measure a STOW-BEHAVIOR swing, not a wind-intensity DR.
The FEMP $1.5M/MW top tier (134% TIV) is a GRAIN WARNING (repair+debris+replace > asset TIV), NOT DR>1.
This is an anchor set, not a distribution.
```

---

## 3. Source coverage matrix — what each pathway has and does not have

Full machine-readable version: [`source_matrix.csv`](source_matrix.csv) (29 sources × 17 attribute columns). Availability tally:

```text
HAS_OPEN_NUMBERS        : 21
HAS_GATED_NUMBERS       :  6   (Verisk/AIR, Moody's RMS, VDE/Cirrus, Renew Risk, GCube body, SHELDUS)
GENERIC_ONLY            :  2   (NOAA Storm Events, SPC climatology)  [+ several open-but-generic reinsurer totals downgraded to GENERIC_ONLY in evidence-use]
```

By sub-peril: `STRAIGHT_LINE_CONVECTIVE` 13 · `CONVECTIVE_BLENDED` 10 · `TORNADO` 1 (quarantine) · `N/A` (denominator/cross-check) 5.

---

## 4. The source pathways in detail

### 4.1 R3 — case studies & forensic (the failure-mode anchors)

- **DOE SETO Severe Weather report** — the cleanest OPEN straight-line-wind / derecho solar case set: Cedar Rapids 2020 derecho ballasted-array liftoff at `~140 mph` (above the `120 mph` ASCE design → demand > capacity, consistent with DR rising past `R0`); Prescott AZ `~70 mph` destroyed an array **below** design → an installation/anchorage defect, an **off-curve** workmanship failure, not the design-demand curve. [escholarship / SETO](https://escholarship.org/content/qt5t8569hf/qt5t8569hf.pdf).
  - **Gives us:** damage-state + intensity anchors. **Does NOT give us:** any dollar figure.
- **Oakey (AU), pv magazine** — `~2,000` modules damaged at a `55 MW` plant; module-attachment failure. [pv magazine Australia](https://www.pv-magazine-australia.com/2019/12/07/long-read-what-broke-at-oakey/). Fraction context; non-US climate; no gust ordinate; no `$`.
- **Soltec presentation** — `~1%` trackers collapsed + `~1%` minor, concentrated in **perimeter rows** (aeroelastic edge loading). [pv magazine PDF](https://www.pv-magazine.com/wp-content/uploads/2019/03/Soltec-presentation.pdf). Vendor-authored; fraction, no `$`.

### 4.2 R4 — engineering & mechanism (the curve-form anchors)

- **CPP Wind (Rohr, Bourke, Banks 2015)** — torsional galloping / aeroelastic instability onset `<~40 m/s (~90 mph)` for un-stowed single-axis trackers; flat (0°) stow raises the critical speed. [CPP PDF](https://cppwind.com/wp-content/uploads/2014/01/Torsional-Instability-of-Single-Axis-Solar-Tracking-Systems-Rohr-Bourke-Banks-2015.pdf). The mechanism behind the v2 tracker `Ucrit` axis; system-specific, not a fleet plug-in.
- **NEXTracker stow white paper** — 25-yr cumulative failure probability by stow strategy: Central CA `1.7%` vs `7.4%`, Utah `2.7%` vs `14.6%`, Saudi `0.1%` vs `1.0%`. [NEXTracker PDF](https://cdn2.hubspot.net/hubfs/1856748/nextracker_assets/pdfs/NEXT_whitepaper_092018.pdf). Probability, not single-event DR; vendor-modeled; screening.
- **NREL PLR study** — no elevated performance-loss-rate below `~56 mph (~90 km/h)`; ~`1%` median annual PLR overall. [NREL docs](https://docs.nrel.gov/docs/fy24osti/86414.pdf). Supports the near-zero-DR-below-design threshold; degradation metric, not catastrophic DR.
- **PVEL MSS scorecard** — tracker module load rating `±1800 Pa` vs fixed-tilt `±2400 Pa`; BOM-material MSS failure rate `7% (2024) → 20% (2025)`. [PVEL scorecard](https://scorecard.pvel.com/mechanical-stress-sequence/). Basis for the v2 architecture split.
- **DOE FEMP PV Weather Vulnerabilities guide** — repair/replace cost tiers `$0.01–$1.50/W`. [DOE FEMP PDF](https://www.energy.gov/sites/default/files/2021-09/pv-system-owners-guide-to-weather-vulnerabilities.pdf). A partial-→-total `$/W` ladder; not tied to a gust ordinate.
- **ASCE 7-22** — §29.4.5 ground-mount solar wind-load procedure; Chapter 32 treats tornado as a **separate** load case (mirrors the sub-peril split). [ASCE 7](https://www.asce.org/publications-and-news/asce-7). Design threshold, not a loss.

### 4.3 R1/R2 — renewable claims & engineered PML / AAL / cat-model (mostly blended or gated)

- **AXIS Capital** — stow-scenario `$/MW` (`$380k` failed / `$340k` fixed-tilt / `$150k` successful-hail-stow; `+$50k/MW` heat-strengthened glass); peril share Hail `55%` / Wildfire `23%` / Tornado `18%`; `$342M` gross claim; `240-day` NatCat downtime; qualitative "hail 2nd most costly after strong winds." The single most useful open solar-wind-adjacent severity anchors, but **hail-stow framed** and blended.
- **GCube** — hail avg `$58.4M/claim`; hail = `54%` of solar claim **cost**; wind cited as a leading **frequency** driver. Hail-dominant cost; wind is a prevalence signal, not a severity number.
- **kWh Analytics Solar Risk Assessment** — free annual peril-mix + stow-behavior context. [kWh Analytics](https://www.kwhanalytics.com/solar-risk-assessment).
- **Descartes Underwriting** — tornado parametric `$70M` limit; `$50M × 15% = $7.5M` worked payout. Tornado, parametric, not straight-line-wind ground-up loss.
- **Verisk (AIR) / Moody's RMS / VDE-Cirrus / Renew Risk** — all confirm straight-line/convective wind is modeled as a **distinct solar peril** (Verisk solar codes `500-514`/`3001-3023`, `>70` damage functions; RMS "microbursts to derecho" renewable curves; VDE/Cirrus named-windstorm PML/AAL line). **Ordinates and magnitudes gated** — pathways, not benchmarks.

### 4.4 Exposure / denominator

- **USPVDB v4.0** — `6,611` plants, `131,573 MW-AC / ~162,802 MW-DC`; TX largest (`23,033 MW-AC`); **DERIVED** Plains/Midwest/TX convective corridor `~38.4%` of tracked capacity. [USGS/LBNL USPVDB](https://energy.usgs.gov/uspvdb/). Best public denominator; pure exposure, no loss.
- **EIA-860 / EPM** — utility-scale solar `149,798.5 MW` (2025); TX solar `24,549.1 MW`. [EIA-860](https://www.eia.gov/electricity/data/eia860/). Table-crossing risk flagged (wind vs solar columns).
- **NREL/DOE Q1-2024 cost benchmark** — utility-scale MMP `$1.12/W-dc` = **exact** match to the `$1,120,000/MWdc` TIV base. [DOE CEMI](https://www.energy.gov/cmei/systems/solar-photovoltaic-system-cost-benchmarks). Also NREL ATB 2024 (`~$1.07–1.16/W-dc`) and LBNL Utility-Scale Solar 2025 (`$1.08/W-dc`, 2023) as secondary cross-checks.

Generic reinsurer SCS totals (Gallagher Re `$60B`/`47%` 2025; Aon `$61B` 2025; Swiss Re `>$51B` 2024) are **GENERIC_ONLY** — all-property, all-SCS-sub-peril; never divided by solar MW.

---

## 5. Data request templates

```text
[Cat-model straight-line-wind solar damage function] — Verisk/AIR or Moody's RMS or Renew Risk
  Request: the DR-vs-3s-gust ordinates for the solar straight-line-wind vulnerability function
  (Verisk solar occupancy/construction codes 500-514 and 3001-3023), separated from hail and tornado.
  Owner: cat-model vendor (license). What to ask for: mean damage ratio at design, 1.25x, 1.5x, 2x design gust.

[Solar wind PML/AAL with peril line itemized] — VDE Americas / Cirrus, or placing broker
  Request: a portfolio PML/AAL run with the WIND (named-windstorm / convective-wind) peril line reported
  separately from hail, on a stated MWdc denominator and TIV basis.
  Owner: engineering advisory / broker. What to ask for: AAL ($/MWdc), 1-in-100 / 1-in-250 wind PML (%TIV).

[Forensic per-array derecho/microburst loss] — insurer / adjuster / owner
  Request: a NAMED straight-line-wind event with (a) plant MWdc, (b) measured peak 3s gust, (c) $ loss by subsystem
  (module / mounting / foundation), and (d) whether tracker stow succeeded.
  Owner: claims / forensic engineer. This is the single figure that would convert AXIS blended stow $/MW into isolated SLW $/MWdc.
```

---

## 6. Current retrieval priority for solar × strong-wind

```text
1. Cat-model straight-line-wind solar damage FUNCTION ordinates (Verisk/RMS/Renew Risk) — the highest-value gated target.
2. VDE/Cirrus or broker PML/AAL with the wind peril line itemized separately from hail.
3. Forensic per-array $ from a named derecho/microburst with stated MWdc + gust (to isolate SLW $ from hail-stow blends).
4. SHELDUS purchased "Wind"/"Severe Storm" county records as a generic frequency/severity overlay (never a solar benchmark).
```

---

## 7. Files in this pair folder

```text
README.md                                              (this dossier)
source_registry.json / .csv                            (29 sources, tagged)
source_matrix.csv                                      (29 x 17 coverage matrix)
benchmark_number_matrix.csv / .json                    (30 benchmark rows)
value_basis_from_damage_modeling.json                  (canonical v1.0 value + FU grain, RESOLVED)
benchmark_value_damage_crosswalk.csv / .json           (benchmark recast onto v1.0 FU buckets)
damage_curve_intensity_reference.csv / .json           (canonical demand->DR reference)
value_basis_from_damage_modeling_v2_PROPOSED.json      (PROPOSED v2 two-pathway preview, non-canonical)
benchmark_value_damage_crosswalk_v2_proposed.csv/.json (v2 preview recast)
damage_curve_intensity_reference_v2_proposed.csv/.json (v2 preview two-pathway reference)
```

**Non-scope reminder:** this dossier is a source-pathway / normalization layer, **not** a calibration harness. It defines no pass/fail bands, tunes no curve, and treats no raw number as a validated benchmark until its denominator, coverage basis, peril coding, asset class, geography, and loss basis are understood.
