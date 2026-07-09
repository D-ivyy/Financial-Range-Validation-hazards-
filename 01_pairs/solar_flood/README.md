# Solar × flood — renewable loss reference source deep dive

**Version:** v0.3.1 (crosswalk resolved against canonical `Damage_Modeling` flood_solar cell)  
**Last researched:** 2026-07-09  
**Parent anchor:** [`../../README.md`](../../README.md)  
**Related repos:** [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling) (canonical subsystems + failure-unit damage curves) · [`Hazard_Modeling`](https://github.com/aamani-ai/Hazard_Modeling) (M0→M4 engine + RangeCompare dashboard)  
**Purpose:** document *where to get reference numbers* for solar PV flood loss validation. This file does **not** define calibration pass/fail rules. It only organizes the usable numbers and the pathways to stronger numbers.

---

## 0. Bottom line

Solar × flood is a **thin, honestly-scarce** pair. Unlike solar-hail, there is no open ecosystem of solar-specific `$/MW` flood severity numbers. Say so plainly:

```text
open flood-only $/MW severity numbers   -> essentially none (only derived/sensitivity/zero rows normalize)
open portfolio loss-share numbers       -> VDE/AXIS flood = 0.197% of solar ground-up losses (rare peril)
open modeled AAL case numbers           -> only relative deltas (Moody's/RMS +230%); absolute AAL is gated
open case/event severity numbers        -> litigation totals (First Solar/Zurich, South Alexander/Markel)
                                            without MW denominators, dominated by deductible/BI structure
strong gated PML/AAL pathway            -> VDE NatCat inland flood, Moody's/RMS, JBA, Fathom (all gated)
strong denominator pathway              -> USPVDB + EIA-860 + project value ledger
canonical damage grain (RESOLVED)       -> the canonical flood_solar cell in Damage_Modeling gives 8 named
                                            failure units + real per-unit depth->DR curves (engineering-
                                            parameterized: DOE/FEMP, NEMA, FEMA, USACE HEC-FIA)
```

Two findings dominate this pair:

```text
1. Isolated solar-flood $/MW physical severity is genuinely scarce. The most reliable open dollars are
   litigation totals that lack a MW denominator and are dominated by per-event flood deductibles and BI.
2. The flood failure unit is electrical / balance-of-system (inverters, collection, cabling, foundation),
   NOT PV module glass. Standing modules above the waterline are generally not the flood loss.
   Elevation / freeboard is the dominant mitigation knob (the flood analog of hail stow).
```

The value ladder is reusable, so denominators are known, and the depth→DR curve is now taken from the **canonical `flood_solar` cell** in `Damage_Modeling` (8 named failure units + real per-unit depth→DR ordinates). This pair is **`RESOLVED_FROM_DAMAGE_MODELING`** on the damage-artifact side (see the crosswalk).

> **Correction note (v0.3.1).** The v0.3 build invented a single `FLOOD_ELECTRICAL_BOS` bucket (~`$217,279/MWdc`, 19.4% TIV) and marked the crosswalk PENDING, mistakenly believing no solar-flood damage artifact existed. The canonical `flood_solar` cell **does** exist; the mechanism was right but the grain, IDs, and curve were non-canonical. They have been replaced with the canonical 8 failure units and real curve throughout this dossier and the crosswalk.

---

## 1. Normalization basis used in this dossier

The table below converts open `$ / MW` values into rough `% TIV` using the project default solar value basis (peril-agnostic, reused from solar_hail). These conversions are **not calibration conclusions**; they are just a way to place heterogeneous source numbers on one page.

| Basis | Value |
|---|---:|
| Project default installed value | `$1,120,000 / MWdc` |
| Project default physical replaceable value | `$877,800 / MWdc` |

Conversion:

```text
% installed TIV       = reported $/MW / 1,120,000
% physical value      = reported $/MW /   877,800
```

Important caveats:

```text
- Most open solar-flood dollars are litigation totals with NO MW denominator, so they cannot be
  normalized to $/MW at all — they are carried as event-loss anchors, not per-MW severity.
- Flood loss is dominated by financial-layer structure: per-event deductibles, sublimits, BI/CBI.
  A gross asserted loss and the net paid amount can differ by more than an order of magnitude.
- Some sources report gross claims; some report net loss after deductible obligations.
- Some use MW, some MWdc/MWac may be ambiguous.
- A claim/event severity number is an event anchor, not an annual loss metric.
- AAL numbers are annualized model outputs and should not be mixed with event claim severity.
```

### 1.1 Value/damage cross-reference (RESOLVED against canonical flood_solar)

The package includes a dedicated crosswalk, cross-mapped onto the canonical `flood_solar` cell:

```text
02_crosswalks/solar_flood_value_damage_crosswalk.md
```

Why it matters:

```text
The flood failure grain is 8 named canonical failure units, mostly electrical, NOT PV module glass (hail grain).
The canonical flood_solar depth->DR curves come from Damage_Modeling (engineering-parameterized, public-anchored).
Many benchmark numbers are litigation totals with no MW denominator and heavy deductible/BI content.
```

Using the canonical `flood_solar` failure-unit shares (from the `Damage_Modeling` value workbook and
curve artifact), the **primary depth-driven electrical bucket** (FS_INV + FS_SWG + FS_XFMR + FS_COMB +
FS_SCADA) is about **$146,947/MWdc**, or **13.12% of installed TIV**. Add FS_CABLE for conduit water
paths and FS_FOUND for scour, and include FS_PVMOD only for low-clearance / full-submersion cases; the
full **8-unit envelope** reaches about **$538,607/MWdc** (48.09% TIV).

Contrast the hail module-hardware cap of about **$291,215/MWdc** (26.00%): for hail a single PV_ARRAY
unit dominates, whereas for flood the loss is spread across several *electrical* units and the modules
are usually NOT the failure unit.

So the cross-reference adds value as a **normalization and comparability layer**, resolved against the
canonical `flood_solar` grain and its real per-failure-unit depth→DR curves.

---

## 2. Quick benchmark-number matrix

Only three rows normalize to `$/MW` at all, and all three are derived / sensitivity / zero. This thinness is itself the finding.

| Benchmark | Source | Reported | $/MW | % default installed TIV | % default physical value | Caveat |
| --- | --- | --- | --- | --- | --- | --- |
| Flood/Water group average per-claim severity (column reading A) | NREL_VERISK_PV_INSURANCE_2020 | $2,020/claim |  |  |  | Column-alignment ambiguity in source PDF; not per-MW; no capacity denominator. |
| Flood/Water group maximum per-claim severity (column reading A) | NREL_VERISK_PV_INSURANCE_2020 | $26,103/claim |  |  |  | Column-alignment ambiguity; carry both readings. Not per-MW. |
| Flood/Water group average per-claim severity (column reading B) | NREL_VERISK_PV_INSURANCE_2020 | $5,288/claim |  |  |  | Column-alignment ambiguity; original table must be re-checked. Not per-MW. |
| Flood/Water group maximum per-claim severity (column reading B) | NREL_VERISK_PV_INSURANCE_2020 | $94,921/claim |  |  |  | Column-alignment ambiguity; carry both readings. Not per-MW. |
| NatCat (incl. flood) share of solar claims quantum (Australia) | BMS_GCUBE_AUSTRALIA_2021 | 22% of claims quantum |  |  |  | NatCat bucket bundles flood with other perils; not flood-only. |
| Flood/heavy-rain share of weather construction claims by frequency | GCUBE_ARRESTED_DEVELOPMENT_2023 | 18% by count |  |  |  | Construction phase, mixed wind+solar; not operational solar. |
| Flood/heavy-rain share of weather construction claims by cost | GCUBE_ARRESTED_DEVELOPMENT_2023 | 46% by cost |  |  |  | Construction phase, mixed technology; pair with 18% frequency. |
| Implied flood severity multiplier (cost share / frequency share) | GCUBE_ARRESTED_DEVELOPMENT_2023 | 2.6x |  |  |  | Derived ratio of the two GCube shares; directional only. |
| Storm+hail share of solar PV claim values (bounds flood residual) | MARSH_RENEWABLE_CLAIMS_2024 | 80% of claim values |  |  |  | Flood is inside the ~20% residual, not separately quantified; upper bound only. |
| Flood share of solar ground-up portfolio losses | VDE_AXIS_PERIL_MIX_2025 | 0.197% of losses |  |  |  | Very small share; aggregate over 13 years, not per-event. |
| Derived flood aggregate loss (0.197% of ~$1.5B ground-up) | VDE_AXIS_PERIL_MIX_2025 | ~$3,000,000 |  |  |  | Portfolio 13-year aggregate, not per-event or per-project severity. |
| Derived flood loss per MW DC across portfolio (13-yr aggregate) | VDE_AXIS_PERIL_MIX_2025 | $32.61/MW | $32.61 | 0.003% | 0.004% | Illustrative only: 13-yr aggregate over full 92 GW DC; not per-event severity. |
| First Solar v. Zurich asserted flood loss | FIRSTSOLAR_ZURICH_LITIGATION_2023 | $10,146,341.29 |  |  |  | Asserted amount; no MW capacity to normalize; gross basis. |
| First Solar v. Zurich sum of five per-event amounts | FIRSTSOLAR_ZURICH_LITIGATION_2023 | ~$4,917,303 |  |  |  | Sum of five separately-adjusted events; per-event deductible each. |
| First Solar v. Zurich amount actually paid | FIRSTSOLAR_ZURICH_LITIGATION_2023 | $600,000 |  |  |  | Large gross loss, small net recovery: deductible structure dominates. |
| First Solar v. Zurich per-event flood deductible | FIRSTSOLAR_ZURICH_LITIGATION_2023 | $2,500,000 |  |  |  | Per-event flood deductible; central to why net recovery was small. |
| South Alexander v. Markel physical damage claim (Hurricane Ida) | SOUTH_ALEXANDER_MARKEL_2023 | $1,099,614.02 |  |  |  | No MW to normalize; physical-damage basis; hurricane-driven flood. |
| South Alexander v. Markel business-interruption limit | SOUTH_ALEXANDER_MARKEL_2023 | $210,000 |  |  |  | Policy limit, not incurred BI loss. |
| Puerto Rico solar contingent business interruption loss | AXIS_HAEE_LEGACY_2016 | ~$20,000,000 |  |  |  | Order-of-magnitude CBI figure; not physical damage; no MW. |
| DEPCOM 92-MW flood response avoided loss | DEPCOM_FLOOD_RESPONSE_CASE | $4,000,000 |  |  |  | Source cites $2.5M-$6.5M inconsistently; avoided loss ≠ incurred damage. |
| DEPCOM 92-MW flood response salvage value | DEPCOM_FLOOD_RESPONSE_CASE | $1,800,000 |  |  |  | Salvage figure, not a loss; internally inconsistent case narrative. |
| Derived avoided-loss per MW (DEPCOM 92 MW) | DEPCOM_FLOOD_RESPONSE_CASE | $43,478/MW | $43,478 | 3.88% | 4.95% | Illustrative only: avoided loss (not incurred damage) / nameplate MW. |
| New England Solar derived business-interruption loss per MW | NEW_ENGLAND_SOLAR_BI_2022 | A$75,000/MW |  |  |  | BI/delay basis, not physical damage; AUD not USD, not normalized to USD/MW. |
| Valdora 15-MW flood physical damage per MW (zero-loss anchor) | VALDORA_SOLAR_ZERO_LOSS_2022 | $0/MW | $0 | 0.00% | 0.00% | Genuine measured zero (not N/A): well-elevated site, major flood, no damage. |
| Solar farm flood AAL change from exposure disaggregation | MOODYS_RMS_SOLAR_FARM_FLOOD_CASE | +230% |  |  |  | Relative delta; absolute AAL is gated. Windstorm moved only +2% on same site. |
| Solar farm windstorm AAL change from exposure disaggregation | MOODYS_RMS_SOLAR_FARM_FLOOD_CASE | +2% |  |  |  | Context row: flood AAL is far more geolocation-sensitive than windstorm. |
| AAL reduction from +1 ft freeboard (generic curves) | USACE_FREEBOARD_DEPTH_DAMAGE | 82% reduction |  |  |  | Generic (non-solar) building curves; freeboard = flood analog to hail stow. |
| AAL reduction moving design inundation point -0.5 to 0 ft | USACE_FREEBOARD_DEPTH_DAMAGE | 86.3% reduction |  |  |  | Generic building curves; directional evidence for elevation benefit. |
| Modeled flood depth commonly treated as unsuitable for siting | FATHOM_FLOOD_HAZARD | >3 ft |  |  |  | Screening heuristic, not a loss; hazard-axis input to a damage function. |
| FM Global critical-equipment elevation guidance | FM_GLOBAL_DS_7106_FLOOD | 1-2 ft above 500-yr MRI |  |  |  | Engineering guidance; failure unit is electrical/BOS, not module glass. |
| IPX7 immersion survival threshold for enclosed equipment | IEC_60529_INGRESS_PROTECTION | 1 m / 30 min |  |  |  | Depth-and-duration threshold behind any solar flood damage assumption. |
| JRC North America Industrial damage factor at 1.0 m depth | JRC_GLOBAL_FLOOD_DEPTH_DAMAGE | 0.51 damage factor |  |  |  | Generic industrial curve, NOT solar-calibrated; mechanism-shape reference only. Superseded on the crosswalk hazard axis by the canonical `flood_solar` per-failure-unit depth→DR curve from `Damage_Modeling`. |
| First Street average property flood AAL (generic, non-solar) | FIRST_STREET_FLOOD_MODEL | $3,548/year |  |  |  | Residential/commercial buildings, not solar; do not treat as solar benchmark. |
| NFIP average flood claim severity (generic, non-solar) | NFIP_CLAIMS_STATISTICS | ~$68,000/claim |  |  |  | Building/contents flood claims, not solar; generic magnitude context only. |

### 2.1 Event / claim-severity anchors as `% installed TIV`

Using the project default installed value of `$1,120,000/MW`. Only the three normalizable rows can be plotted; everything else lacks a MW denominator and is deliberately left off the axis:

```text
Valdora zero-loss (elevated)    |                                                     0.00%
VDE/AXIS flood per-MW (13-yr)   |                                                     0.003%
DEPCOM avoided-loss per-MW      | ████                                                3.88%
```

This is an **anchor plot**, not a distribution. The DEPCOM and VDE/AXIS rows are sensitivity conversions only (avoided-loss / portfolio-aggregate), and Valdora is a genuine measured zero. **No open source provides a clean per-event physical-damage `$/MW` for solar flood** — the sparsity of this plot is the headline.

### 2.2 Modeled annual AAL anchors as `% installed TIV / year`

No open source provides an **absolute** modeled solar-flood AAL. The only modeled numbers are relative deltas and generic (non-solar) curves:

```text
Moody's/RMS flood AAL delta (geolocation disaggregation)   -> +230%  (relative only; absolute gated)
Moody's/RMS windstorm AAL delta (same site)                -> +2%    (contrast peril)
USACE +1 ft freeboard AAL reduction (generic building)     -> -82%   (mitigation knob, non-solar)
```

There is no `%/yr` bar to plot because no absolute solar-flood AAL is open. This is the single largest **benchmark** gap for the pair (the crosswalk itself is `RESOLVED_FROM_DAMAGE_MODELING` on the damage-curve side; the gap is on the open absolute-AAL benchmark side).

---

## 3. Source coverage matrix — what each pathway has and does not have

| Source / pathway | Status | Has | Does not have | Best use |
| --- | --- | --- | --- | --- |
| NREL_VERISK_PV_INSURANCE_2020 | HAS_OPEN_NUMBERS | Flood/Water peril group in a large PV insurance-claims study; per-claim average/max magnitudes (column-ambiguous). | Clean flood-only per-MW severity; capacity/TIV denominators; unambiguous column alignment. | Peril-shape and per-claim floor/tail; carry both column readings until the source table is re-verified. |
| BMS_GCUBE_AUSTRALIA_2021 | HAS_OPEN_NUMBERS | NatCat (incl. flood) ≈22% of Australian solar claims quantum; contractor error ~68% is the larger driver. | Flood-only share; per-MW severity; TIV. | Peril-share sanity that flood is bundled and secondary in this market. |
| GCUBE_ARRESTED_DEVELOPMENT_2023 | HAS_OPEN_NUMBERS | Flood/heavy-rain 18% of weather construction claims by frequency, 46% by cost (→2.6x severity multiplier). | Operational-phase solar flood; solar-only split; per-MW. | Frequency-vs-severity shape signal; construction-phase mixed-technology only. |
| AXIS_HAEE_LEGACY_2016 | HAS_OPEN_NUMBERS | ~$20M Puerto Rico solar contingent BI loss (order-of-magnitude). | Physical-damage split; MW capacity; deductible terms. | CBI/BI scale context; not a physical-damage benchmark. |
| SWISSRE_CATCHING_THE_SUN_2024 | HAS_GATED_NUMBERS | Screening/discovery of solar NatCat peril mix incl. flood. | Open flood-only numbers; per-MW; AAL/PML. | Source-discovery and screening only; request full report. |
| MARSH_RENEWABLE_CLAIMS_2024 | HAS_OPEN_NUMBERS | Storm+hail ≈80% of solar PV claim values (flood inside ~20% residual). | Flood-only quantification; per-MW; TIV. | Upper-bound peril-share sanity; flood is a residual share here. |
| GCUBE_HAIL_OR_HIGH_WATER_2023 | HAS_OPEN_NUMBERS | Mechanism framing that water/flood is a rising solar peril. | Numeric flood severity; per-MW; AAL/PML. | Mechanism-only narrative support. |
| ALLIANZ_GREENING_CLAIMS_2025 | HAS_PATHWAY_ONLY | Discovery pathway to NatCat/flood event-loss context and inundation-duration framing. | Open flood-only solar numbers. | Source-discovery pathway. |
| MOODYS_RMS_SOLAR_FARM_FLOOD_CASE | HAS_GATED_NUMBERS | Named 2,700-acre solar-farm flood case; +230% flood AAL vs +2% windstorm from geolocation disaggregation. | Absolute AAL dollars (gated); per-MW; PML. | Best open evidence that flood AAL is highly geolocation-sensitive; primary candidate if absolute values are acquired. |
| MOODYS_RMS_US_INLAND_FLOOD_HD | HAS_GATED_NUMBERS | High-definition US inland flood model AAL/PML/OEP/AEP capability. | Open solar-specific values. | Gated pathway to comparison-ready inland-flood AAL/PML. |
| VDE_NATCAT_INLAND_FLOOD | HAS_GATED_NUMBERS | Site/technology-specific solar NatCat inland-flood AAL/PML capability. | Open absolute values. | Best gated path to solar-specific flood AAL/PML; primary candidate. |
| FATHOM_FLOOD_HAZARD | HAS_GATED_NUMBERS | Global flood hazard depths/return periods; >3 ft siting-unsuitability heuristic. | Loss dollars; solar damage function. | Hazard-axis (depth/return-period) input; source-discovery/mechanism. |
| JBA_FLOOD_MODEL | HAS_GATED_NUMBERS | Flood AAL capability and depth-damage functions. | Open solar-specific values. | Gated hazard + depth-damage pathway. |
| FIRST_STREET_FLOOD_MODEL | HAS_OPEN_NUMBERS | Generic property flood AAL (~$3,548/yr) and PML framing at national scale. | Solar-specific losses; per-MW. | Generic AAL magnitude context; explicitly non-solar. |
| FEMA_HAZUS_FLOOD_CURVES | HAS_OPEN_NUMBERS | Open generic depth-damage curves (building/industrial). | Solar failure-unit calibration. | Generic mechanism-shape reference only; the canonical `flood_solar` per-failure-unit curve is used on the crosswalk hazard axis. |
| USACE_FREEBOARD_DEPTH_DAMAGE | HAS_OPEN_NUMBERS | Generic depth-damage curves; +1 ft freeboard cuts AAL ~82%; DIP shift ~86.3%. | Solar-specific curves; absolute solar AAL. | Mitigation-knob (freeboard/elevation) evidence; generic curves only. |
| JRC_GLOBAL_FLOOD_DEPTH_DAMAGE | HAS_OPEN_NUMBERS | JRC North America Industrial/Commercial/Residential depth-damage curves; industrial DR 0.51 at 1.0 m. | Solar-calibrated curve. | Generic mechanism-shape reference only; superseded on the crosswalk hazard axis by the canonical `flood_solar` per-failure-unit depth→DR curve. |
| FM_GLOBAL_DS_7106_FLOOD | HAS_OPEN_NUMBERS | Critical-equipment elevation 1-2 ft above 500-yr MRI; scour ~7 ft/s velocity guidance. | Loss dollars; per-MW. | Mitigation-threshold and failure-unit (electrical/BOS/foundation) mechanism. |
| RENEW_RISK_NO_FLOOD_PRODUCT | NO_PRODUCT_FOUND | Confirmation that Renew Risk's SCS solar model does not cover flood. | Any flood numbers. | Documents a dead-end so it is not re-searched. |
| FIRSTSOLAR_ZURICH_LITIGATION_2023 | HAS_OPEN_NUMBERS | Asserted $10,146,341.29; five per-event amounts (~$4.92M sum); $2.5M per-event deductible; $600k paid; ~13 ft depth; >$141.9M value in place. | MW capacity to normalize; clean gross/net bridge. | Best open event-severity + deductible-structure case; primary candidate if MW is recovered. |
| SOUTH_ALEXANDER_MARKEL_2023 | HAS_OPEN_NUMBERS | $1,099,614.02 physical-damage claim; $210,000 BI limit (Hurricane Ida). | MW capacity; net-of-deductible detail. | Event severity + BI pathway; hurricane-driven flood. |
| DEPCOM_FLOOD_RESPONSE_CASE | HAS_OPEN_NUMBERS | 92 MW site; 10 of 40 PCS in 12-18 in standing water; $4M avoided / $1.8M salvage (source-inconsistent). | Consistent incurred-damage dollars; TIV. | Avoided-loss/mitigation value + a derived $43,478/MW sensitivity; failure unit = PCS/inverters. |
| NEW_ENGLAND_SOLAR_BI_2022 | HAS_OPEN_NUMBERS | A$30M lost earnings / 400 MW → derived A$75,000/MW BI. | USD basis; physical-damage split. | BI/delay per-MW anchor (AUD); not physical damage. |
| VALDORA_SOLAR_ZERO_LOSS_2022 | HAS_OPEN_NUMBERS | 15 MW site; major flood; ~1.2 m freeboard; ~13-day precautionary outage; $0 physical damage. | Damage dollars (there were none). | Genuine measured lower bound: elevation/freeboard prevented physical loss. |
| VDE_AXIS_PERIL_MIX_2025 | HAS_OPEN_NUMBERS | Flood = 0.197% of solar ground-up losses over 13,000+ asset-years, 92 GW DC, ~$100B TIV, 2012-2025. | Per-event flood severity; absolute flood AAL. | Rare-peril anchor + derived ~$3M aggregate / $32.61/MW sensitivity. |
| NREL_PV_FLOOD_RESILIENCE | NO_DIRECT_RENEWABLE_NUMBERS_FOUND | Flood-resilience design guidance for PV (elevation, ingress, scour). | Financial reference numbers. | Mechanism-only; design/mitigation context. |
| IEC_60529_INGRESS_PROTECTION | HAS_OPEN_NUMBERS | IPX7 = 1 m / 30 min immersion survival threshold for enclosures. | Financial numbers. | Depth-and-duration mechanism behind any solar flood damage function. |
| DOE_FEMP_FLOOD_ELEVATION | NO_DIRECT_RENEWABLE_NUMBERS_FOUND | Federal flood-elevation/design guidance. | Financial reference numbers. | Mechanism-only mitigation context. |
| NFIP_CLAIMS_STATISTICS | HAS_OPEN_NUMBERS | ~$68,000 average flood claim (building/contents, 2016-2021); coverage caps. | Solar-specific losses; per-MW. | Generic claim-magnitude context; explicitly non-solar. |
| NOAA_BILLION_DOLLAR_FLOOD | HAS_OPEN_NUMBERS | Billion-dollar flood/inland-flood event totals and frequency. | Solar-specific split; per-MW. | Macro flood-severity context; not a solar benchmark. |
| USPVDB_V4_0_2026 | HAS_OPEN_NUMBERS | v4.0/April 2026; 6,611 facilities; array boundaries/locations and attributes. | Losses, claims, insured values, flood exposure. | Exposure denominator for flood-zone joins and $/MW aggregation. |
| EIA_860_2025_EARLY_RELEASE | HAS_OPEN_NUMBERS | Generator-level metadata for ≥1 MW plants; 2025 early release. | Insurance claims, AAL/PML, flood losses. | Capacity/status crosswalk; use with USPVDB for exposure reconciliation. |

---

## 4. The source pathways in detail

### 4.1 First Solar v. Zurich — best open event-severity + deductible-structure case

**Source ID:** `FIRSTSOLAR_ZURICH_LITIGATION_2023`  
**Status:** `HAS_OPEN_NUMBERS`  
**Use:** `PRIMARY_BENCHMARK_CANDIDATE`, `CASE_STUDY_ONLY`

This litigation is the most detailed open solar-flood dollar record found, but it is a **financial-layer** case, not a per-MW severity:

| Quantity | Reported |
|---|---:|
| Asserted flood loss | `$10,146,341.29` |
| Sum of five per-event amounts | `~$4,917,303` |
| Per-event flood deductible | `$2,500,000` |
| Amount actually paid | `$600,000` ($200,000 × 3 events) |
| Flood depth | `~13 ft` |
| Value in place | `>$141.9M` |

What this gives us:

```text
- event-severity plausibility for a large inundation;
- a vivid demonstration that per-event flood deductibles dominate net recovery;
- a multi-event pattern (five separately-adjusted floods on one asset).
```

What it does **not** give us:

```text
- MW capacity, so it cannot be normalized to $/MW or %TIV;
- a clean gross-to-net bridge;
- the split between electrical/BOS damage and other components.
```

Data request:

```text
For this and comparable solar flood claims, request anonymized rows with:
  claim_id, date, state/county, project MWdc/MWac, installed TIV, insured value,
  gross physical damage, BI gross, per-event deductible, sublimit, net paid/reserved,
  flood depth, inundation duration, flow velocity, which subsystems inundated
  (inverter/PCS, combiner, cabling, substation, foundation), IP rating of inundated equipment.
```

---

### 4.2 VDE / AXIS peril mix — rare-peril portfolio anchor

**Source ID:** `VDE_AXIS_PERIL_MIX_2025`  
**Status:** `HAS_OPEN_NUMBERS`  
**Use:** `PRIMARY_BENCHMARK_CANDIDATE`, `SECONDARY_BENCHMARK`

The single most useful open portfolio number for shape:

```text
flood = 0.197% of solar ground-up losses
portfolio: 13,000+ asset-years, 92 GW DC, ~$100B TIV, all 50 states, 2012-2025
```

Derived sensitivities (illustrative only):

| Derivation | Value |
|---|---:|
| 0.197% × ~$1.5B ground-up losses | `~$3,000,000` aggregate |
| ~$3M / 92,000 MW DC (13-yr aggregate) | `$32.61 / MW` |

Why this matters:

```text
Flood is a rare, small-share peril for solar in aggregate — the opposite of hail's low-count/high-cost
profile. The per-MW aggregate is near-zero because it spreads 13 years of losses over 92 GW.
This is a portfolio-scale check, NOT a per-event severity.
```

---

### 4.3 Valdora zero-loss — measured lower bound

**Source ID:** `VALDORA_SOLAR_ZERO_LOSS_2022`  
**Status:** `HAS_OPEN_NUMBERS`  
**Use:** `CASE_STUDY_ONLY`

```text
15 MW site; major flood; ~1.2 m freeboard; ~13-day precautionary outage; $0 physical damage.
```

This is a **genuine measured zero**, not an N/A. It anchors the lower bound of the flood damage range and directly demonstrates the dominant mitigation knob:

```text
A well-elevated site with adequate freeboard can take a major flood with no physical damage.
Elevation/freeboard is the flood analog of hail stow.
```

Kept as `$0/MW` (normalized 0.0 / 0.0 / 0.0) precisely because it is a real observation, not missing data.

---

### 4.4 DEPCOM flood response — avoided-loss and failure-unit evidence

**Source ID:** `DEPCOM_FLOOD_RESPONSE_CASE`  
**Status:** `HAS_OPEN_NUMBERS` (source-inconsistent)  
**Use:** `CASE_STUDY_ONLY`

```text
92 MW site; 10 of 40 PCS affected; PCS in 12-18 inches of standing water.
$4M avoided loss; $1.8M salvage (source cites $2.5M-$6.5M saved inconsistently).
```

Derived sensitivity (illustrative only):

| Derivation | Value | % installed TIV | % physical value |
|---|---:|---:|---:|
| $4M avoided / 92 MW | `$43,478 / MW` | `3.88%` | `4.95%` |

Why this matters:

```text
It confirms the flood failure unit directly: the loss concentrated in power electronics (PCS/inverters),
not in standing modules. The derived $43,478/MW sits at ~29.6% of the canonical PRIMARY depth-driven
electrical bucket (~$146,947/MWdc) and ~8.1% of the all-8-unit envelope; it exceeds FS_INV alone
(134.6%), correctly flagging that more than the inverters were involved (a grain warning, not DR>1),
consistent with partial inundation of a subset of PCS.
Avoided loss is NOT incurred damage, and the source dollars are internally inconsistent.
```

---

### 4.5 Moody's / RMS solar-farm flood case — geolocation-sensitivity of flood AAL

**Source IDs:** `MOODYS_RMS_SOLAR_FARM_FLOOD_CASE`, `MOODYS_RMS_US_INLAND_FLOOD_HD`  
**Status:** `HAS_GATED_NUMBERS`  
**Use:** `PRIMARY_BENCHMARK_CANDIDATE`, `CASE_STUDY_ONLY`

Open relative deltas from exposure disaggregation on a 2,700-acre reservoir-adjacent solar site:

```text
flood AAL     -> +230% when the site is properly geolocated/disaggregated
windstorm AAL -> +2% on the same site
```

Why this matters:

```text
Flood AAL is far more geolocation-sensitive than windstorm — accurate siting/elevation data changes
the flood answer by an order of magnitude while barely moving wind. Absolute AAL dollars are gated.
```

Data request:

```text
Ask Moody's/RMS for the absolute AAL/PML behind the +230% delta, plus:
  1 MWdc and 100 MWdc reference-project flood AAL/PML by flood zone and elevation,
  OEP/AEP at 100/250/500 years, BI included/excluded flag, TIV basis, deductible assumptions.
```

---

### 4.6 VDE NatCat inland flood / JBA / Fathom — best gated AAL/PML + hazard pathway

**Source IDs:** `VDE_NATCAT_INLAND_FLOOD`, `JBA_FLOOD_MODEL`, `FATHOM_FLOOD_HAZARD`  
**Status:** `HAS_GATED_NUMBERS`  
**Use:** `PRIMARY_BENCHMARK_CANDIDATE` (VDE), `SOURCE_DISCOVERY` / `MECHANISM_ONLY` (JBA, Fathom)

VDE's NatCat product advertises site/technology-specific solar inland-flood AAL/PML; JBA and Fathom provide the hazard axis (depth, return period, duration) and depth-damage functions.

```text
Open: product capability, hazard depths/return periods, >3 ft siting-unsuitability heuristic.
Gated: actual solar AAL/PML values and depth-damage calibration for the solar failure unit.
```

Recommended acquisition request:

```text
Ask VDE / JBA / Fathom for a solar flood benchmark export in non-client-confidential form:
  - 1 MWdc and 100 MWdc reference-project AAL/PML by flood zone;
  - depth-damage function keyed to the ELECTRICAL/BOS failure unit (not building curves);
  - PML return periods at 100/250/500 years;
  - inundation duration and flow-velocity sensitivity;
  - assumptions for TIV, deductible, BI inclusion/exclusion, equipment elevation.
```

---

### 4.7 Generic depth-damage curves (JRC / HAZUS / USACE / FM Global / IEC) — generic mechanism-shape only (superseded by canonical curve)

**Source IDs:** `JRC_GLOBAL_FLOOD_DEPTH_DAMAGE`, `FEMA_HAZUS_FLOOD_CURVES`, `USACE_FREEBOARD_DEPTH_DAMAGE`, `FM_GLOBAL_DS_7106_FLOOD`, `IEC_60529_INGRESS_PROTECTION`  
**Status:** `HAS_OPEN_NUMBERS`  
**Use:** `MECHANISM_ONLY`

These provide the *shape* of a depth→damage relationship and the mitigation/mechanism thresholds, but **none is solar-calibrated**:

```text
JRC North America Industrial DR: 0.03 @0m, 0.32 @0.5m, 0.51 @1.0m, 0.74 @2.0m, 1.00 @6.0m (generic)
USACE: +1 ft freeboard cuts AAL ~82%; design-inundation-point shift ~86.3%
FM Global DS 7-106: elevate critical equipment 1-2 ft above 500-yr MRI; scour above ~7 ft/s
IEC 60529 IPX7: enclosed equipment survives 1 m / 30 min immersion
```

Critical caveat:

```text
These are GENERIC building/industrial depth-damage ratios and engineering thresholds, NOT solar
failure-unit DRs. They are retained only as mechanism-shape context. The crosswalk hazard axis now
uses the CANONICAL flood_solar per-failure-unit depth->DR curve from Damage_Modeling (public-source-
anchored: DOE/FEMP, NEMA, FEMA, USACE HEC-FIA), not these generic curves. They must NOT be used to
tune a solar flood curve. The correct solar failure units are electrical/BOS (FS_INV/FS_SWG/FS_XFMR/
FS_COMB/FS_SCADA/FS_CABLE) plus conditional FS_FOUND/FS_PVMOD, whose vulnerability depends on
equipment elevation and IP rating, not on building-style depth curves.
```

---

### 4.8 NREL / Verisk PV insurance claims — peril-shape with a column caveat

**Source ID:** `NREL_VERISK_PV_INSURANCE_2020`  
**Status:** `HAS_OPEN_NUMBERS`  
**Use:** `PRIMARY_BENCHMARK_CANDIDATE`, `SECONDARY_BENCHMARK`

The study reports a Flood/Water peril group inside a large PV insurance-claims dataset. The source PDF has a **column-alignment ambiguity**, so both readings are carried rather than one guessed:

| Reading | Average per claim | Maximum per claim | n |
|---|---:|---:|---:|
| A | `$2,020` | `$26,103` | 197 |
| B | `$5,288` | `$94,921` | 79 |

```text
Neither reading is per-MW; there is no capacity denominator. Until the original table is visually
re-verified, both readings are retained and flagged column-ambiguous. Use only for peril-shape
(per-claim floor/tail), never as a per-MW severity.
```

---

### 4.9 USPVDB + EIA-860 — denominator path

**Source IDs:** `USPVDB_V4_0_2026`, `EIA_860_2025_EARLY_RELEASE`  
**Status:** `HAS_OPEN_NUMBERS`  
**Use:** `DENOMINATOR_ONLY`

These are not loss benchmarks, but they are required to make future flood reference numbers comparable — especially for joining assets to flood zones.

Use them to construct:

```text
asset_id
lat/lon and polygon (for flood-zone / depth-grid overlay)
county/state
MWdc / MWac
COD / vintage
owner/operator and generator metadata
exposure denominator for $/MW and %TIV aggregation
```

Without this denominator spine, and without site elevation relative to design flood level, flood loss comparisons will be unstable.

---

## 5. Data request templates

### 5.1 Claims-source request

```text
Please provide an anonymized solar PV flood loss extract with one row per claim/event:

Required:
  event_date
  state/county or rounded lat/lon
  project_capacity_MWdc and/or MWac
  installed_TIV
  insured_value
  physical_replacement_value
  physical_damage_gross
  business_interruption_gross
  per-event deductible and sublimit structure
  net_paid_or_reserved
  flood_depth (above grade)
  inundation_duration
  flow_velocity
  which subsystems inundated: inverter/PCS, combiner, cabling, substation, foundation
  IP rating of inundated equipment
  equipment_elevation and freeboard vs design flood elevation (100/500-yr)

Useful optional:
  inundated fraction of site polygon
  scour/washout observed
  cleanup / drying / re-termination / re-commissioning cost
  downtime_days
  repair duration and replacement lead time
```

### 5.2 Engineered PML/AAL source request

```text
Please provide a solar-flood benchmark export for reference designs:

Reference designs:
  1 MWdc, 100 MWdc
  fixed tilt and single-axis tracker
  equipment elevation: at grade, +1 ft, +2 ft, above 500-yr MRI
  freeboard: 0, 0.5, 1.0, 1.5 m

Metrics:
  AAL (absolute, not just relative delta)
  PML at 100/250/500 years
  OEP/AEP if available
  BI included/excluded flag
  deductible/retention assumptions
  TIV basis
  depth-damage function keyed to ELECTRICAL/BOS failure unit
  inundation-duration and flow-velocity sensitivity

Geography:
  CONUS grid or county bands by flood zone
  state summaries
  named sample sites
```

### 5.3 Depth-damage / mechanism request

```text
Please provide a solar-specific flood depth-damage function:

For the electrical/BOS failure unit:
  damage ratio vs flood_depth (above grade), by subsystem:
    inverter/PCS, combiner boxes, DC/AC cabling, substation transformer/switchgear, foundation
  sensitivity to inundation_duration
  sensitivity to flow_velocity (scour/washout)
  IP-rating survival thresholds (IEC 60529)
  elevation/freeboard credit curve
  gross physical repair-cost components (cleanup, drying, re-termination, re-commissioning)
```

---

## 6. Current retrieval priority for solar × flood

| Priority | Source/pathway | Why |
|---|---|---|
| P0 | VDE NatCat inland-flood sample AAL/PML export | best path to comparison-ready solar-specific flood AAL/PML by geography/design |
| P0 | Moody's/RMS absolute AAL behind the +230% delta | converts the relative flood-AAL delta into absolute $/MW |
| P1 | Empirical claims/forensic data by failure unit | tightens the canonical `flood_solar` engineering depth→DR ordinates (already RESOLVED) with real loss data |
| P1 | First Solar/Zurich + South Alexander case files with MW capacity | turns litigation totals into normalizable $/MW event severity |
| P1 | JBA / Fathom hazard + depth-damage export | provides the depth/return-period/duration hazard axis |
| P1 | DEPCOM / Valdora primary-source verification | firms up avoided-loss and zero-loss anchors and the electrical/BOS failure unit |
| P2 | USPVDB + EIA asset denominator + flood-zone overlay | required for aggregation and normalization but not a loss source |

---

## 7. Files in this pair folder

```text
README.md                            <-- this dossier
benchmark_number_matrix.csv          <-- normalized benchmark rows (blanks where no MW denominator)
source_matrix.csv                    <-- source × metric coverage matrix (flood columns added)
source_registry.json                 <-- machine-readable source-pathway records
damage_curve_intensity_reference.csv <-- CANONICAL flood_solar per-failure-unit depth->DR lookup (from Damage_Modeling curve artifact)
benchmark_value_damage_crosswalk.csv <-- benchmark rows recast onto canonical failure-unit buckets (primary electrical / all-8)
value_basis_from_damage_modeling.json<-- canonical value ladder + 8 flood failure units (FS_*) with shares/$-per-MWdc
```

The package-level copies live under `../../data/`.
