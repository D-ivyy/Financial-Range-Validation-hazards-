# Renewable energy loss reference numbers — source pathways registry

**Purpose:** identify where we can get renewable-energy-specific financial reference numbers for validating or calibrating hazard × asset loss outputs.

**Scope:** solar PV and wind first; other energy assets later. Current emphasis is not on how to compare model outputs, but on how to obtain credible reference numbers that could later be compared against M4 annual loss distributions or M3/M4 event losses.

**Last researched:** 2026-07-09  
**Prepared for:** Damage Modeling / Hazard Modeling interface  
**Recommended home:** `docs/validation/renewable_loss_reference_source_pathways.md`  
**Related repos:** [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling) — the canonical subsystem breakdown, value ladder, and per-hazard failure-unit damage curves every pair crosswalk in this package cross-maps onto (always consult its `docs/method/value_basis/solar_wind_value_breakdown.xlsx` Summary sheet and the relevant `docs/cells/<hazard>_<asset>/current/` curve artifact before writing a crosswalk) · [`Hazard_Modeling`](https://github.com/aamani-ai/Hazard_Modeling) — the M0→M4 modeling engine + compare dashboard (RangeCompare view) that consumes these validation ranges

---

## 0. Working thesis

For renewable energy assets, traditional real-estate insurance loss data is not a good primary validation target. Solar and wind assets have different geometry, value distribution, exposure concentration, failure modes, replacement logistics, coverage structures, and business-interruption behavior than buildings. Generic property data can still help with hazard context or county-level public-loss background, but it should not be the main evidence spine for energy-asset loss calibration.

The strongest reference-number layer is therefore:

```text
renewable-specific claims, broker / insurer publications, engineered PML-AAL reports,
renewable catastrophe-model outputs, project case studies, parametric-trigger burn analyses,
forensic-adjuster summaries, and energy-specific engineering studies.
```

This file is a **source-pathway registry**, not a calibration protocol. It answers:

```text
Where can we get numbers?
What kind of numbers can each source produce?
Which hazard × asset cells have a credible source path today?
Which cells are still weak, gated, or missing?
What should we request from each source owner?
```

It intentionally does **not** define pass/fail thresholds, benchmark envelopes, or model-comparison rules.

---

## 1. Source status tags

Use these tags consistently in future source-selection and validation files.

### 1.1 Availability tags

| Tag | Meaning |
|---|---|
| `HAS_OPEN_NUMBERS` | Public source already exposes usable numeric reference values. |
| `HAS_GATED_NUMBERS` | Source explicitly offers or references the desired numbers, but full values require a form download, paid report, client report, API, demo, subscription, or partner access. |
| `HAS_PATHWAY_ONLY` | A plausible owner of the numbers exists, but open materials do not expose the numbers. Requires outreach, NDA, broker/insurer relationship, or internal data access. |
| `NO_DIRECT_RENEWABLE_NUMBERS_FOUND` | No credible renewable-specific financial reference-number path found yet. |
| `GENERIC_ONLY` | Public loss data exists, but it is not renewable-energy-asset-specific. Use as secondary context only. |

### 1.2 Metric-type tags

| Tag | Reference number type |
|---|---|
| `CLAIM_SHARE` | Share of incidents, claim count, incurred costs, gross claim dollars, or total loss dollars by cause/peril. |
| `CLAIM_SEVERITY` | Average / median / range of claim size, often dollars per claim or dollars per MW. |
| `EVENT_LOSS` | Named event or case-study loss amount. |
| `DOLLARS_PER_MW` | Loss normalized by project capacity. |
| `PERCENT_TIV` | Loss expressed as percent of insured value, installed value, asset value, or physical replaceable value. |
| `AAL` | Average annual loss / annual average loss. |
| `EAL` | Expected annual loss / mean annual loss, typically normalized as `% TIV / year`. |
| `OEP_PML` | Occurrence-exceedance return-period loss: largest single event in a year. |
| `AEP_PML` | Aggregate-exceedance return-period loss: total annual loss at a return period. |
| `VAR` | Quantile of the annual aggregate loss distribution, usually equivalent to AEP-PML at a stated return period. |
| `TVAR` | Tail value at risk: mean annual aggregate loss beyond the VaR threshold. |
| `PML` | Probable maximum loss or return-period loss; must be labelled as OEP or AEP. |
| `OEP_AEP` | Occurrence or aggregate exceedance probability curve or event-year loss distribution. |
| `BI_DOWNTIME` | Business interruption, downtime, revenue loss, or generation loss. |
| `DEDUCTIBLE_SUBLIMIT` | Deductible, sublimit, policy cap, or payout cap value. |
| `TRIGGER_BURN` | Parametric-trigger frequency / payout burn analysis. |
| `COMPONENT_COST` | Component-level replacement, repair, remediation, or forensic cost. |
| `DENOMINATOR` | Exposure, capacity, TIV, physical value, project location, or asset count denominator. |
| `LOSS_BASIS` | Whether the value is physical destruction, repair spend, gross claim, net insured loss, or revenue/BI. |
| `REINSTATEMENT_ASSUMPTION` | Whether annual aggregation assumes no reinstatement, partial reinstatement, full reinstatement, or unknown. |

### 1.3 Evidence-use tags

| Tag | How the source can be used later |
|---|---|
| `PRIMARY_BENCHMARK_CANDIDATE` | Strong enough to anchor a benchmark range if denominator and coverage are known. |
| `SECONDARY_BENCHMARK` | Useful support, but not enough alone to define a range. |
| `CASE_STUDY_ONLY` | Useful for event severity and cap checks, not annual calibration by itself. |
| `MECHANISM_ONLY` | Useful for damage mechanisms, but not financial calibration. |
| `DENOMINATOR_ONLY` | Used to normalize or aggregate losses, not a loss source. |
| `SCREENING_ONLY` | Useful for source discovery, geography, or context; not a renewable-loss benchmark. |

### 1.4 Coverage caveat tags

| Tag | Caveat |
|---|---|
| `GROSS_VS_NET_UNKNOWN` | Unclear whether loss is ground-up, gross claim, net of deductible, net of sublimit, or insured payout. |
| `BI_INCLUDED_UNKNOWN` | Unclear whether BI / downtime / revenue loss is included. |
| `TIV_BASIS_UNKNOWN` | Unclear whether denominator is insured TIV, installed capex, physical replacement value, module value, or exposed component value. |
| `GEOGRAPHY_AMBIGUOUS` | Geography is aggregated, anonymized, global, or not disclosed. |
| `CAUSE_CODING_AMBIGUOUS` | Cause categories mix hail, SCS, wind, tornado, wildfire, fire, equipment failure, or weather-related operational losses. |
| `PORTFOLIO_BIAS` | Source reflects one insurer / broker / vendor portfolio and may not represent the full market. |
| `COMMERCIAL_LICENSE` | Access requires paid product/API/subscription/report. |

---

## 2. The source hierarchy we should use

### 2.1 Preferred hierarchy

The validation evidence hierarchy should be renewable-first:

```text
Tier R1 — Renewable claims / loss databases with actual financial numbers
Tier R2 — Renewable-specific engineered PML/AAL/cat-model outputs
Tier R3 — Renewable-specific event case studies and forensic reports
Tier R4 — Renewable-specific engineering studies with financial or repair implications
Tier R5 — Generic public hazard/loss data, used only as secondary context
```

Generic real-estate loss sources should not become the lead benchmark unless a renewable-specific pathway is missing and the limitation is explicit.

### 2.2 What counts as a usable number

A source becomes useful when it gives, or can be made to give, at least one of the following:

```text
claim share by peril
claim count by peril
incurred cost share by peril
average claim size
loss dollars per MW
loss dollars per project
loss percent of TIV / asset value
AAL / AEP / OEP / PML / return-period loss
VaR / TVaR / tail conditional loss
business interruption or downtime days
annual revenue loss
policy sublimit / deductible / payout cap
component replacement or repair cost
```

A source is less useful if it only says “hail is risky” or “flooding matters” without giving a retrieval path to numbers.

---

## 3. Coverage status by current / likely hazard × asset cells

Legend:

```text
GREEN  = direct renewable-specific numbers exist now or source explicitly offers them
YELLOW = credible pathway exists, but numbers are gated, partial, or not fully public
ORANGE = mechanism / case-study numbers exist, but aggregate reference numbers are weak
RED    = no direct renewable-specific financial reference path found yet
GRAY   = generic-only public context exists; not enough for renewable validation
```

| Hazard × asset cell | Renewable-specific claims publications | Engineered / cat-model PML-AAL path | Event / case-study path | Parametric / trigger path | Engineering / component path | Current status |
|---|---|---|---|---|---|---|
| `solar_hail` | **GREEN** — kWh, AXIS, GCube/TMHCC, Marsh, J.S. Held | **GREEN/YELLOW** — VDE Hail Risk, VDE/Cirrus, Renew Risk | **GREEN** — Midway, Fighting Jays, VDE stow case | **YELLOW** — Descartes, VDE PREP, weather-trigger products | **GREEN** — DOE/FEMP, RETC/PVEL/Kiwa/GroundWork | **Strongest V1 candidate** |
| `solar_flood` | **RED/YELLOW** — no broad open solar flood claims database found; broker/insurer loss runs likely | **YELLOW** — VDE/Cirrus all-cat reports; Moody's solar-farm flood/wind case; Fathom renewable flood assessments | **ORANGE** — storm / hurricane / flooded-equipment cases exist but sparse | **YELLOW** — parametric flood could be sourced but not solar-specific by default | **GREEN** — DOE/FEMP flood PV guidance; component replacement logic | **Dossier built in v0.3, resolved v0.3.1 (`01_pairs/solar_flood`); isolated flood-only $/MW severity confirmed scarce; crosswalk `RESOLVED_FROM_DAMAGE_MODELING` against the canonical `flood_solar` cell** |
| `solar_strong_wind` | **YELLOW** — AXIS notes strong wind ranking; RETC says high wind is frequent for fielded solar; Alpine/adjuster sources | **YELLOW** — Renew Risk U.S. SCS model, VDE/Cirrus severe convective / named windstorm, Verisk SCS if exposure coding is renewable-aware | **ORANGE** — hurricane / straight-line-wind case material, but financial values sparse | **YELLOW** — wind/hail co-probability and storm-response triggers | **GREEN** — FEMP / NREL storm-resilience engineering, tracker/racking studies | **Partial; source path credible but not as strong as hail** |
| `solar_tornado` | **RED/ORANGE** — scattered mentions of rows damaged, no robust open loss series | **YELLOW** — Renew Risk SCS and Verisk SCS can model tornado, but direct solar tornado numbers likely gated | **ORANGE** — individual event news / adjuster files possible | **YELLOW** — parametric SCS products may include tornado | **YELLOW** — debris / wind engineering exists, but not financial | **Weak; pathway exists mostly through SCS models and private claims** |
| `solar_hurricane` | **YELLOW** — GCube/PF summaries say hurricanes are material in U.S. renewables; solar ranking available but aggregate values limited | **YELLOW** — VDE/Cirrus named windstorm; Moody's/RMS windstorm; Renew Risk hurricane products | **ORANGE** — Hurricane Maria / Caribbean solar resilience cases | **YELLOW** — parametric wind/rain products possible | **GREEN** — DOE/FEMP storm-resilience and wind-driven-rain mechanisms | **Moderate, but peril splitting required** |
| `solar_wildfire_physical` (EXOGENOUS) | **RED/YELLOW** — no open isolated exogenous-wildfire $/MW severity; kWh/GCube "solar fire" numbers blend origins (`CONTEXT_NOT_BENCHMARK`) | **YELLOW** — VDE/Cirrus wildfire PML; RMS/Verisk wildfire cat models (property-wide, gated) | **ORANGE** — exogenous events exist (DEPCOM Kern, Wellington North) but only unit-counts / avoided-cost | **YELLOW** — parametric wildfire products possible | **GREEN** — DOE/FEMP wildfire PV guidance; FSim intensity + material CHF thresholds | **Dossier built in v0.4 (`01_pairs/solar_wildfire`), EXOGENOUS-only; crosswalk `RESOLVED_GRAIN_DR_WITHHELD` against canonical `wildfire_solar` cell; 0/100 rows normalize to $/MW; endogenous fire + smoke/revenue quarantined as different origin/peril** |
| `solar_wildfire_smoke_revenue` | **GREEN/YELLOW** — kWh/60Hertz and academic smoke-production-loss studies | **YELLOW** — not classic property cat PML; performance / revenue models needed | **ORANGE** — 2020/2023 smoke events | **YELLOW** — smoke/irradiance triggers possible | **GREEN** — irradiance / aerosol / production-loss research | **Good pathway for BI/revenue, not physical damage** |
| `wind_tornado_onshore` | **RED/ORANGE** — limited open wind-turbine tornado claims by peril | **YELLOW** — wind-cat models and tornado hazard studies; likely commercial | **ORANGE** — event case studies possible | **YELLOW** — parametric wind/tornado triggers possible | **YELLOW** — structural / fragility research exists | **Weak-to-moderate; likely private data needed** |
| `wind_strong_wind_onshore` | **YELLOW** — GCube/PF summaries for hurricanes/weather at wind farms; limited open claims tables | **YELLOW** — RMS/Moody's, Verisk, Renew Risk, broker cat modeling | **ORANGE** — hurricanes / derecho / wind-farm event reports | **YELLOW** — parametric wind products | **YELLOW** — design-class / turbine studies | **Moderate but not open enough** |
| `wind_hurricane_onshore` | **YELLOW** — GCube/PF summary is important: hurricanes dominate U.S. wind-farm weather claims in one 2010–2020 source path | **YELLOW** — commercial hurricane models with wind-farm exposure coding | **ORANGE** — named storm wind-farm cases | **YELLOW** — hurricane parametric products | **YELLOW** — turbine survival-margin studies | **Moderate, gated** |
| `offshore_wind_non_natcat_and_natcat` | **GREEN/YELLOW** — AXIS 2026, Allianz 2023 expose claim drivers | **YELLOW** — Renew Risk offshore models, RMS/Moody's, broker models | **ORANGE** — cable, turbine, foundation cases | **YELLOW** — marine/weather parametric possible | **GREEN** — insurer engineering reports | **Good source path, but not same as onshore NatCat** |

---

## 4. Source-pathway categories

## 4.1 Renewable-specific claims publications and insurer / broker reports

These are the most important source class. They are not always clean datasets, but they often expose exactly the kind of financial anchors we need: claim shares, average claim severity, dollars per MW, downtime days, loss rankings, and sometimes event-specific claim amounts.

### Source group status

| Source group | Direct renewable financial numbers? | Best hazards/assets | Access | Usefulness |
|---|---:|---|---|---|
| kWh Analytics Solar Risk Assessment series | Yes | Solar hail, solar fire/wildfire-smoke, solar operational loss, BESS fire | Open page + gated/downloaded report | High |
| AXIS Global Energy solar severe-weather report | Yes | Solar hail, solar strong wind, NatCat/weather downtime | Open press release + full report link | High |
| GCube / Tokio Marine HCC renewable claims reports | Yes, but sometimes via summaries | Solar hail, solar/wind hurricanes, extreme weather/NatCat | Some report PDFs / articles / client reports | High |
| Marsh renewable insurance materials | Yes, aggregate claim-value share | Solar storm/hail, global NatCat claims | Open web articles + broker relationship | Medium-high |
| WTW / Aon / broker market reviews | Usually pathway, less public numeric detail | Solar/wind insurance terms, policy wording, market view | Open summaries + broker access | Medium |
| J.S. Held / forensic accounting / adjuster publications | Yes for event ranges; mechanism rich | Solar hail, storm damage, claim workflow | Open articles + private assignments | Medium-high |
| AXIS offshore wind claims report | Yes | Offshore wind turbine, cable, foundation claims | Open press release + full report | High for offshore wind, indirect for onshore |
| Allianz offshore wind report | Yes | Offshore wind cable/turbine/foundation claim drivers | Open report PDF / summaries | High for offshore wind, indirect for onshore |

### 4.1.1 kWh Analytics — Solar Risk Assessment series

**Source IDs:**

```text
RS_CLAIMS_KWH_SRA_2025
RS_CLAIMS_KWH_SRA_2026
```

**Primary path:** annual Solar Risk Assessment reports and kWh loss / insurance research.  
**Access:** public landing pages; some full reports require form download.  
**Tags:** `HAS_OPEN_NUMBERS`, `HAS_GATED_NUMBERS`, `CLAIM_SHARE`, `EVENT_LOSS`, `BI_DOWNTIME`, `PERCENT_TIV`, `PRIMARY_BENCHMARK_CANDIDATE`, `PORTFOLIO_BIAS`.

**Numbers already visible publicly:**

- 2025 SRA public materials state that hail accounts for **73% of total losses by damage amount** while representing **6% of loss incidents** for solar.
- 2025 SRA public materials also cite Central Michigan University, Kiwa PI Berlin, 60Hertz, VDE, and GroundWork/kWh articles as source leads for hail, wildfire-smoke, module quality, stow, and operational-risk numbers.
- 2026 SRA public page says the report is organized around resilience, reliability, and emerging risks. It includes a hail article using a **1-in-100 hail loss >10% of asset value** pass/fail criterion for a 100 MW single-axis tracker, and a fire article based on **over $150B in renewable energy loss data** showing fire as the second-largest PV loss driver with **84% of fire events equipment-driven brushfires**.

**Best hazard/asset coverage:**

```text
solar_hail                    strong
solar_wildfire_fire           strong / evolving
solar_wildfire_smoke_revenue  strong for revenue-loss path
solar_operational_loss        strong but not pure physical damage
BESS_fire                     future useful path
wind                          weaker; SRA is solar-led despite broader renewable framing
```

**How to obtain comparison numbers later:**

1. Download the full SRA PDFs for 2025 and 2026.
2. Extract all charts/tables that contain:
   - loss share by peril,
   - incident share by peril,
   - dollars by peril,
   - fire cause shares,
   - hail loss threshold logic,
   - stow / module / tracker loss modifiers,
   - production or revenue loss values.
3. Ask kWh, if relationship is available, for an anonymized benchmark extract:

```text
fields requested:
  event_date
  loss_cause_primary
  loss_cause_secondary
  asset_type
  state / region
  MWdc or MWac
  insured_value / asset_value bucket
  gross_loss
  net_loss
  physical_damage_loss
  BI_loss
  downtime_days
  module type
  tracker type
  stow status / stow angle
  deductible / sublimit bucket
  claim_status
```

**Caveats:** likely portfolio-biased to kWh insured / monitored projects; exact loss basis may differ across articles; fire category may mix wildfire, equipment-driven brushfire, and electrical fire unless cause coding is explicit.

**References:**

- kWh Analytics, *Solar Risk Assessment 2026*, https://kwhanalytics.com/industry-reports/2026-solar-risk-assessment/
- kWh Analytics / Business Wire, *2025 Solar Risk Assessment announcement*, https://www.businesswire.com/news/home/20250610934841/en/kWh-Analytics-Reveals-Top-Risk-Management-Challenges-for-Renewable-Energy-and-Battery-Energy-Storage-Systems
- Energy Global summary of 2025 SRA, https://www.energyglobal.com/special-reports/12062025/kwh-analytics-reveals-top-risk-management-challenges-for-renewable-energy-and-bess/

---

### 4.1.2 AXIS Global Energy — solar severe-weather / hail claims report

**Source ID:** `RS_CLAIMS_AXIS_SOLAR_HAIL_2025`

**Primary path:** AXIS Global Energy special report on severe weather impact on solar technology.  
**Access:** public press release; full report linked from AXIS.  
**Tags:** `HAS_OPEN_NUMBERS`, `CLAIM_SHARE`, `CLAIM_SEVERITY`, `DOLLARS_PER_MW`, `BI_DOWNTIME`, `PRIMARY_BENCHMARK_CANDIDATE`, `PORTFOLIO_BIAS`.

**Numbers already visible publicly:**

- AXIS reviewed five years of its hail-damage claims data.
- Hail accounts for **55% of total gross claims amount** for solar PV NatCat and extreme-weather claims in the U.S. and Canada.
- NatCat and extreme weather produce average ground-up downtime of **240 days** for solar PV claims, versus **136 days** for mechanical/electrical breakdown and **78 days** for theft/vandalism.
- Globally, hail claims are described as the second most costly NatCat/weather-related claims after strong winds, despite low frequency.
- Heat-strengthened glass claims averaged **$50,000/MW** higher than fully tempered glass claims.
- Tracker systems that failed to stow averaged **$380,000/MW** losses; fixed-tilt systems averaged **$340,000/MW**; successful stow averaged **$150,000/MW**.
- Increasing hail stow angle from 60° to 75° can reduce breakage probability by nearly 50% in AXIS-cited lab/model tests.

**Best hazard/asset coverage:**

```text
solar_hail          very strong
solar_strong_wind   partial; ranked as costly globally but less detail in public excerpt
solar_NatCat        useful for downtime and cause shares
```

**How to obtain comparison numbers later:**

1. Download the full AXIS report and extract all tables/charts by peril, geography, module type, stow status, and claim severity.
2. Ask AXIS, if possible, for an anonymized solar NatCat loss extract or portfolio summary with bins:

```text
hail claim severity by $/MW bucket
claim severity by glass type
claim severity by fixed tilt vs tracker
claim severity by stow success / failure / unknown
claim severity by hail size bucket
claim severity by state / hail region
claim severity by gross vs net basis
BI days and BI dollars by cause
```

**Caveats:** AXIS portfolio may be biased by underwriting appetite and insured portfolio composition; public numbers are gross claims unless otherwise specified; full geography and denominator are not public.

**Reference:**

- AXIS Capital, *AXIS Global Energy Special Report Highlights Extent of Severe Weather Impact on Solar Technology*, https://investor.axiscapital.com/investors/press-releases/news-details/2025/AXIS-Global-Energy-Special-Report-Highlights-Extent-of-Severe-Weather-Impact-on-Solar-Technology-2025-hbZw1R8iIJ/default.aspx

---

### 4.1.3 GCube / Tokio Marine HCC — renewable insurance claims reports

**Source IDs:**

```text
RS_CLAIMS_GCUBE_HAIL_OR_HIGH_WATER_2021
RS_CLAIMS_GCUBE_HAIL_NO_2023
```

**Primary path:** GCube client reports and market summaries, now associated with Tokio Marine HCC ownership.  
**Access:** report pages, PDFs, secondary summaries, broker/client access.  
**Tags:** `HAS_OPEN_NUMBERS`, `HAS_GATED_NUMBERS`, `CLAIM_SHARE`, `CLAIM_SEVERITY`, `EVENT_LOSS`, `PRIMARY_BENCHMARK_CANDIDATE`, `GROSS_VS_NET_UNKNOWN`, `PORTFOLIO_BIAS`.

**Numbers already visible publicly through report pages / summaries:**

- GCube's *Hail or High Water* assembled claims data over a 10-year period from 2010 to 2020 across renewable energy assets worldwide.
- The report page states that average weather-related solar loss in 2019 was almost **2400% higher** than average non-weather-related solar loss.
- The report page also states that claims caused by emerging, unmodelled extreme weather threats were **twice as high** as traditional NatCat claims since 2015.
- PV Tech's 2023 summary of GCube's *Hail No!* report says hail claims averaged nearly **US$58.4 million per claim** and hail accounted for **54%** of incurred costs of total solar loss claims attributable to hailstorms.
- Other industry summaries citing GCube say 2019 Midway Solar hail losses were roughly **$70–80M** and the 2022 U.S./Texas hail season produced **$300–400M** in renewable-energy hail damages.

**Best hazard/asset coverage:**

```text
solar_hail             very strong
solar_extreme_weather  strong
wind_hurricane         useful via Hail-or-High-Water summaries
solar_hurricane        useful but more aggregated
wind_solar_NatCat      strong portfolio-level context
```

**How to obtain comparison numbers later:**

1. Locate original GCube PDFs and any Tokio Marine HCC archive copies.
2. Ask GCube/TMHCC for anonymized aggregate tables by asset/peril/year:

```text
asset_type: solar / onshore wind / offshore wind / BESS
peril: hail / hurricane / flood / wildfire / windstorm / tornado / lightning / snow
period: year of loss
region: country / state / broad region
claim_count
incurred_loss_sum
gross_loss_sum
net_loss_sum
average_claim
median_claim
p90_claim
largest_claim
BI share
coverage basis
```

**Caveats:** public excerpts often come through secondary articles; some reports are client-facing; cause categories such as NatCat vs extreme weather may not map cleanly to our hazard taxonomy.

**References:**

- GCube / TMGX report page, *Hail or High Water*, https://tmgx.com/Insights/Reports/HAIL-OR-HIGH-WATER
- PV Tech, *Hail claims now average around US$58.4 million per claim, says GCube Insurance*, https://www.pv-tech.org/hail-claims-now-average-around-us58-4-million-per-claim-says-gcube-insurance/
- Power Factors summary citing GCube, *It’s Hurricane Season: Here’s How to Prepare Your Wind and Solar Assets*, https://www.powerfactors.com/blog/its-hurricane-season-heres-how-to-prepare-your-wind-and-solar-assets

---

### 4.1.4 Marsh renewable-energy insurance materials

**Source ID:** `RS_BROKER_MARSH_RENEWABLE_CLAIMS_2025`

**Primary path:** Marsh renewable energy insurance and risk-management publications.  
**Access:** open articles; deeper broker data likely relationship-based.  
**Tags:** `HAS_OPEN_NUMBERS`, `CLAIM_SHARE`, `SECONDARY_BENCHMARK`, `GEOGRAPHY_AMBIGUOUS`, `PORTFOLIO_BIAS`.

**Numbers already visible publicly:**

- Marsh says NatCat events such as storm and hail damage make up **80% of claim values** for solar PV projects globally.
- Marsh materials also flag BESS fire as a major loss cause, useful for future storage assets.

**Best hazard/asset coverage:**

```text
solar_hail / solar_storm  medium-high as claim-value share context
BESS_fire                 useful future source
```

**How to obtain comparison numbers later:**

Ask Marsh / broker contacts for aggregate, anonymized renewable claims views by region and peril:

```text
claim values by cause of loss
claim count by cause of loss
NatCat vs non-NatCat split
solar vs wind vs BESS
PD vs BI split
insured value denominators or value bands
policy terms: deductible, sublimit, hail/windstorm/wildfire wording
```

**Caveats:** global aggregate; not necessarily U.S. only; claim-value share does not give AAL without exposure denominator.

**Reference:**

- Marsh, *Streamline your renewable energy insurance process in Asia*, https://www.marsh.com/hk/en/industries/energy-and-power/insights/secure-renewable-energy-insurance-in-asia.html

---

### 4.1.5 J.S. Held — solar hail forensic / claim-range article

**Source ID:** `RS_FORENSIC_JSHELD_SOLAR_HAIL_2024`

**Primary path:** forensic accounting / damage assessment article.  
**Access:** open article.  
**Tags:** `HAS_OPEN_NUMBERS`, `EVENT_LOSS`, `CASE_STUDY_ONLY`, `SECONDARY_BENCHMARK`, `GROSS_VS_NET_UNKNOWN`.

**Numbers already visible publicly:**

- Midway Solar hail claim: approximately **$70–80M** in West Texas from hail over two inches.
- Ongoing industry reports of solar-farm hail claims totaling **$5M to $80M**.
- 2022 renewable-energy insurance industry hail damage losses upward of **$300–400M**.
- The article also documents underreporting in rural hail archives, including a Pecos County example where observed reports may capture only about one in three severe events.

**Best hazard/asset coverage:**

```text
solar_hail  high for event severity and source-discovery
```

**How to obtain comparison numbers later:**

1. Use public article numbers as named-event severity anchors.
2. If forensic / adjuster relationship exists, request anonymized claim severity distributions:

```text
loss range by event
module counts damaged
MW affected
forensic repair estimate
visible vs microcrack damage counts
remediation / recycling cost
BI / lost production if available
stow status / module construction
```

**Caveats:** not a statistical portfolio; event values may be reported industry figures; gross/net and BI status may be unclear.

**Reference:**

- J.S. Held, *Solar Farm Hail Damage: The Perfect Storm*, https://www.jsheld.com/insights/articles/solar-farm-hail-damage-the-perfect-storm

---

### 4.1.6 AXIS — offshore wind claims report

**Source ID:** `RS_CLAIMS_AXIS_OFFSHORE_WIND_2026`

**Primary path:** AXIS offshore wind claims analysis.  
**Access:** open press release; full report linked.  
**Tags:** `HAS_OPEN_NUMBERS`, `CLAIM_SHARE`, `CLAIM_SEVERITY`, `BI_DOWNTIME`, `COMPONENT_COST`, `PRIMARY_BENCHMARK_CANDIDATE` for offshore wind, `INDIRECT` for onshore wind.

**Numbers already visible publicly:**

- Based on open and closed construction and operational offshore wind claims from January 2021 through September 2025.
- Wind turbines represent **57% of claim count** and **37% of total incurred claims**.
- More than two-thirds of turbine-related claims are drivetrain-component damage: generators, gearboxes, main bearings.
- Export cables account for **6% of claim count** but have the highest average claim at **$18.8M**, largely due to generation loss and BI.
- Inter-array cables account for **14% of claim count** and **14% of total claims**, with **$6.7M** average claim.
- Foundation claims average **$7.4M**.

**Best hazard/asset coverage:**

```text
offshore_wind_cable           strong
offshore_wind_turbine         strong
offshore_wind_foundation      strong
onshore_wind_natcat           indirect only
```

**How to obtain comparison numbers later:**

Ask AXIS for split tables by construction vs operation and by natural hazard vs mechanical / installation cause:

```text
claim count and incurred loss by component
claim count and incurred loss by cause
weather / marine / mechanical / construction split
PD vs BI split
average, median, p90 claim by component
capacity or TIV denominator bands
```

**Caveats:** offshore wind loss drivers differ materially from onshore wind and solar; many losses are construction / mechanical / marine rather than NatCat hazard damage.

**Reference:**

- AXIS Capital, *AXIS Offshore Wind Report Highlights Technical Risks and Evolving Challenges*, https://investor.axiscapital.com/investors/press-releases/news-details/2026/AXIS-Offshore-Wind-Report-Highlights-Technical-Risks-and-Evolving-Challenges-2026-yWZF4CzKrj/default.aspx

---

### 4.1.7 Allianz Commercial — offshore wind report

**Source ID:** `RS_CLAIMS_ALLIANZ_OFFSHORE_WIND_2023`

**Primary path:** Allianz Commercial offshore wind risk / claims report.  
**Access:** open PDF and industry summaries.  
**Tags:** `HAS_OPEN_NUMBERS`, `CLAIM_SHARE`, `COMPONENT_COST`, `SECONDARY_BENCHMARK`, `INDIRECT` for current onshore wind cells.

**Numbers publicly visible in summaries / report snippets:**

- Offshore wind claims by value in one Allianz market experience: cable damage/failure accounted for roughly **53%** of offshore wind claims by value over six years.
- Wind turbine claims accounted for roughly **20%** by value over the same period; common turbine loss causes include rotor blades, main bearings, gearboxes, and generators.

**Best hazard/asset coverage:**

```text
offshore_wind_cable       strong
offshore_wind_turbine     strong
offshore_wind_natcat      limited / indirect
```

**How to obtain comparison numbers later:**

Request region/period split and weather-cause tagging if possible. Treat as component-loss benchmark more than hazard-peril benchmark unless cause-of-loss is available.

**References:**

- Allianz Commercial report summary / PDF, *A turning point for offshore wind*, https://commercial.allianz.com/content/dam/onemarketing/commercial/commercial/reports/offshore-wind-opportunities-risks.pdf
- gCaptain / industry summary, https://gcaptain.com/rapid-growth-in-offshore-wind-poses-risks-and-challenges-says-allianz/

---

## 4.2 Renewable-specific engineered PML/AAL reports and cat-model products

This is the second most important source class because it can produce the same metric family we ultimately want: AAL, PML, return-period losses, and sometimes distribution outputs. These are often commercial or gated, but they may be the cleanest way to get benchmark envelopes.

### Source group status

| Source | Direct renewable financial numbers? | Best cells | Access | Priority |
|---|---:|---|---|---|
| VDE Hail Risk Intelligence | Yes, explicitly offers PML/AAL, PRE, loss distributions, maps | Solar hail | Commercial reports / maps | P0 |
| VDE/Cirrus all-NatCat risk reports | Yes, explicitly offers site/technology-specific engineered PML/AAL for hail and 1-in-500 PML for multiple NatCats | Solar hail, flood, windstorm, wildfire, SCS | Commercial due-diligence reports | P0 |
| Renew Risk U.S. Solar SCS model | Yes, model claims to produce solar-specific financial risk for hail/tornado/wind | Solar hail, SCS wind, tornado | Commercial model / demo | P0/P1 |
| Moody's RMS specialized solar-farm treatment | Yes, case study gives AAL changes, but not full public values | Solar flood/wind, wind farms | Commercial analytical services | P1 |
| GRC + VDE partnership | Yes, integrates VDE hail PML into GRC natural hazard reports | Solar hail | Risk engineering reports | P1 |
| Verisk / AIR / PCS / commercial cat models | Likely yes, but generic unless renewable exposure/vulnerability is coded | SCS, flood, hurricane, wildfire | API/license/Prashant path | P1 |
| Fathom flood + renewable flood assessments | Pathway yes | Solar/wind flood | Commercial flood modeling | P1 |

---

### 4.2.1 VDE Hail Risk Intelligence

**Source ID:** `RS_MODEL_VDE_HAIL_RISK_INTELLIGENCE`

**Primary path:** VDE hail risk reports, ArcGIS Hail Risk Atlas, PML/AAL reports, pro-forma risk exposure reports, and hail resiliency testing.  
**Access:** commercial product/report; product descriptions public.  
**Tags:** `HAS_GATED_NUMBERS`, `AAL`, `PML`, `OEP_AEP`, `TRIGGER_BURN`, `PERCENT_TIV`, `DOLLARS_PER_MW`, `PRIMARY_BENCHMARK_CANDIDATE`, `COMMERCIAL_LICENSE`.

**Numbers explicitly offered by product description:**

- PML, AAL, and downside PML financial loss estimates.
- BI loss estimates.
- Historical hail observations within 50 km of project site.
- P50/P90/P95 cumulative total hail losses for client-specified hold periods.
- Sample outcome distributions, medians, standard deviations, and 95% confidence intervals.
- Analysis across multiple tilt angles.
- ArcGIS contour maps of PML and AAL ranges for a **1 MWdc reference project**, scalable to project capacity.
- CONUS coverage and tilt/module-construction variations.
- Co-probability of hail with wind: co-occurring gust velocity with naturally occurring hail size and return intervals.
- PREP reports for parametric insurance trigger points.

**Best hazard/asset coverage:**

```text
solar_hail                  strongest possible engineered benchmark path
solar_hail_plus_wind        useful through co-probability report
solar_strong_wind           indirect only unless tied to hail co-probability / SCS
```

**How to obtain comparison numbers later:**

1. Request sample PML/AAL report for a generic 1 MWdc reference project and one real project.
2. Request Hail Risk Atlas contour exports or screenshots/tables for:

```text
AAL range by location
PML range by return period
module construction
fixed tilt / tracker tilt / stow angle
1 MWdc and 100 MWdc reference cases
hold-period cumulative loss distribution
```

3. Ask whether output basis is:

```text
ground-up physical damage
insured loss
BI included/excluded
physical replacement value or insured TIV
project-specific deductible/sublimit applied or not
```

**Caveats:** commercial model; exact methodology proprietary; may require reconciliation to our value basis and curve assumptions.

**References:**

- VDE Americas, *Hail Risk Intelligence advisory products*, https://www.vde.com/en/vde-americas/hail-risk/hail-risk-advisory-products
- VDE Americas, *Hail Risk Atlas*, https://www.vde.com/en/vde-americas/hail-risk/arcgis-based-hail-risk-maps

---

### 4.2.2 VDE / Cirrus all-natural-catastrophe risk and insurability reports

**Source ID:** `RS_MODEL_VDE_CIRRUS_NATCAT_SOLAR`

**Primary path:** Cirrus Advisers / CAC Specialty / VDE all-cat project risk and insurability reports.  
**Access:** commercial due-diligence report.  
**Tags:** `HAS_GATED_NUMBERS`, `AAL`, `PML`, `PRIMARY_BENCHMARK_CANDIDATE`, `COMMERCIAL_LICENSE`.

**Numbers explicitly offered by source description:**

- Site- and technology-specific engineered PML and AAL estimates for hail.
- 1-in-500-year PML estimates for hail, earthquakes, named windstorms, inland floods, severe convective storms, and wildfires.
- Report services for solar, wind, battery storage, and other clean-tech projects.

**Best hazard/asset coverage:**

```text
solar_hail             strong
solar_flood            gated but promising
solar_strong_wind/SCS  gated but promising
solar_hurricane        named windstorm path
solar_wildfire         gated but promising
wind / BESS            path exists, details unknown
```

**How to obtain comparison numbers later:**

Request a sample report and data dictionary. Specifically ask for machine-readable extracts:

```text
site_id
asset_type
lat/lon / region
technology assumptions
TIV basis
AAL by peril
PML by peril and return period
1-in-500 PML by peril
BI inclusion
insurance pricing / deductible assumptions
model source / vendor used per peril
VDE hail-specific assumptions
```

**Caveats:** commercial due diligence; values are model outputs, not observed claims; methodology and vulnerability assumptions may differ from our model.

**Reference:**

- VDE Americas, *All-Natural Catastrophe Risk Reports*, https://www.vde.com/en/vde-americas/hail-risk/natural-catastrophe-risk-and-insurability-report

---

### 4.2.3 Renew Risk U.S. solar severe-convective-storm model

**Source ID:** `RS_MODEL_RENEWRISK_US_SOLAR_SCS_2026`

**Primary path:** Renew Risk U.S. solar model for severe convective storms / hail.  
**Access:** commercial model / demo; public launch notes.  
**Tags:** `HAS_GATED_NUMBERS`, `AAL`, `PML`, `OEP_AEP`, `CLAIM_SEVERITY`, `DOLLARS_PER_MW`, `PRIMARY_BENCHMARK_CANDIDATE`, `COMMERCIAL_LICENSE`.

**Numbers / capabilities publicly described:**

- High-risk states such as Texas, Oklahoma, and Kansas completed by February 2026; full U.S. model targeted for Q2 2026.
- Model tailored to hail's characteristics for utility-scale solar farms, including hailstone size, impact energy and angle, wind speed, and event duration.
- Captures solar-specific characteristics: panel stowage, stow angles, glass thickness/materials, cables, transformers, and other critical infrastructure.
- Explicitly incorporates business interruption and uses an industry exposure database with TIV and BI calculations.
- Public launch article cites Midway Solar estimated **$70M** loss and Fighting Jays **$50M sublimit** case.
- May 2026 pv magazine article says the U.S. SCS model addresses hail, tornadoes, and wind for utility-scale solar assets, using machine learning and physics-based AI, with an industry exposure database updated monthly.

**Best hazard/asset coverage:**

```text
solar_hail          strong
solar_strong_wind   promising
solar_tornado       promising
solar_SCS_bundle    strong path, if peril split can be obtained
```

**How to obtain comparison numbers later:**

Ask Renew Risk for:

```text
AAL and return-period loss outputs by peril: hail / tornado / straight-line wind
PD vs BI split
TIV basis
exposure database fields
engineering attributes supported
sample portfolio output
sample single-site output
assumptions for stow, glass, tracker reliability
output format / API schema
```

**Caveats:** model is new; commercial access; must ensure peril components can be separated because our cells distinguish hail, strong wind, and tornado.

**References:**

- Renew Risk, *Renew Risk completes hail risk model for solar farms in high-risk U.S. States*, https://www.renew-risk.com/resources/high-risk-hail-solar-model
- pv magazine USA, *Renew Risk launches storm catastrophe model for U.S. solar projects*, https://pv-magazine-usa.com/2026/05/06/renew-risk-launches-storm-catastrophe-model-for-u-s-solar-projects/

---

### 4.2.4 Moody's RMS / Analytical Services renewable treatment

**Source IDs:**

```text
RS_MODEL_MOODYS_RMS_RENEWABLES_2022
RS_CASE_MOODYS_SOLAR_FLOOD_WIND_AAL_2022
```

**Primary path:** Moody's RMS renewable infrastructure modeling and specialized exposure treatment.  
**Access:** public case-study articles; commercial model / advisory services for actual outputs.  
**Tags:** `HAS_OPEN_NUMBERS`, `HAS_GATED_NUMBERS`, `AAL`, `PML`, `DENOMINATOR`, `SECONDARY_BENCHMARK`, `COMMERCIAL_LICENSE`.

**Numbers / capabilities publicly visible:**

- Moody's notes renewable sites are spatially expansive and can have high hazard gradients; TIV distribution across the site matters.
- In a solar-farm flood/windstorm case, moving from centroid-style treatment to disaggregated solar-farm exposure increased the flood AAL by nearly **230%**; windstorm AAL increased by **2%**.
- Moody's/RMS materials discuss defining wind farms with individual turbines and buildings and note that individual turbine AALs can vary by up to **30%** due to location on site in an example.

**Best hazard/asset coverage:**

```text
solar_flood        strong as methodology / disaggregation proof; values gated
solar_windstorm    useful
wind_hurricane     useful
wind_flood/coastal useful for site-gradient handling
```

**How to obtain comparison numbers later:**

Ask Moody's / RMS / broker for output extracts:

```text
single-centroid vs disaggregated AAL
peril-specific AAL and PML
component-level exposure coding
TIV distribution across solar arrays / switchyard / substation / inverters
flood defended vs undefended losses
windstorm model assumptions
```

**Caveats:** public case does not reveal absolute AAL values; model may be building/industrial-facility oriented unless renewable-specific vulnerability is used.

**References:**

- Moody's, *Risk modeling and the rise of renewables*, https://www.moodys.com/web/en/us/insights/insurance/risk-modeling-and-the-rise-of-renewables.html
- Moody's, *Applying specialized risk treatment to a solar farm*, https://www.moodys.com/web/en/us/insights/insurance/applying-specialized-risk-treatment-to-a-solar-farm.html

---

### 4.2.5 Global Risk Consultants + VDE partnership

**Source ID:** `RS_MODEL_GRC_VDE_HAIL_PML_2025`

**Primary path:** natural hazards risk engineering reports integrating VDE hail PML analytics for solar.  
**Access:** commercial risk engineering reports.  
**Tags:** `HAS_GATED_NUMBERS`, `PML`, `AAL`, `COMPONENT_COST`, `PRIMARY_BENCHMARK_CANDIDATE`, `COMMERCIAL_LICENSE`.

**Numbers / capabilities publicly described:**

- GRC and VDE announced integration of VDE hail PML analytics into GRC Natural Hazards risk assessment reports for the solar power industry.
- VDE methodology is described as integrating radar and ground-based meteorological data with hail-resilience characteristics of project equipment to produce site-specific financial loss estimates.

**Best hazard/asset coverage:**

```text
solar_hail  strong, gated
```

**How to obtain comparison numbers later:**

Ask for a sample GRC/VDE Natural Hazards report and whether outputs include:

```text
hail PML by return period
AAL or expected loss
equipment-specific assumptions
risk engineering recommendations tied to loss change
policy-relevant values
```

**Reference:**

- VDE Americas, *VDE and GRC partner to enhance hail risk assessment for solar projects*, https://www.vde.com/en/vde-americas/newsroom/vde-and-grc-partner-to-enhance-hail-risk-assessment-for-solar-projects

---

### 4.2.6 Verisk / AIR / PCS and other commercial cat-model sources

**Source ID:** `RS_MODEL_VERISK_AIR_PCS_PATHWAY`

**Primary path:** commercial catastrophe-model outputs and insurance-industry event loss data.  
**Access:** API/license / partner access; Prashant pursuing API mentioned in project context.  
**Tags:** `HAS_PATHWAY_ONLY`, `AAL`, `PML`, `OEP_AEP`, `CLAIM_SHARE`, `COMMERCIAL_LICENSE`, `GENERIC_UNLESS_RENEWABLE_CODED`.

**Potential numbers:**

```text
AAL by peril
return-period losses
OEP/AEP curves
industry event loss / PCS event serial values
severe-convective-storm model outputs
flood / hurricane / wildfire model outputs
```

**Best hazard/asset coverage:**

```text
hail / SCS / tornado / wind / hurricane / flood / wildfire  potentially broad
solar / wind                                             depends on exposure coding and vulnerability
```

**How to obtain comparison numbers later:**

For any Verisk/AIR/PCS path, the key is to prevent generic property vulnerability from becoming the benchmark. Ask for:

```text
renewable-energy occupancy / class support
solar PV vulnerability functions by hail / wind / flood / wildfire
wind-farm turbine vulnerability functions
model assumptions for solar arrays, substations, transformers, inverters
outputs by asset class, not generic real estate
industry event loss split by renewable energy, if available
```

**Caveats:** traditional cat models may be strong on hazard but weak on renewable vulnerability unless specialized coding exists; outputs may reflect insured loss, not ground-up loss.

**Reference leads:**

- Verisk catastrophe research publications, https://www.verisk.com/resources/research-publications/
- AM Best / Verisk event coverage on solar hail insurance challenges, https://www.ambest.com/video/MediaArchive.aspx?lid=1826330280569203090&vid=6371234044112

---

## 4.3 Project case studies and named-event loss sources

Case studies are not enough for annual calibration, but they are extremely useful for event severity, loss cap reasonableness, component share, BI duration, sublimits, and model anomaly debugging.

### 4.3.1 Midway Solar hail loss

**Source ID:** `RS_CASE_MIDWAY_SOLAR_HAIL_2019`

**Tags:** `HAS_OPEN_NUMBERS`, `EVENT_LOSS`, `CASE_STUDY_ONLY`, `solar_hail`.

**Public numbers:**

- Midway Solar, Pecos County / West Texas, May 2019.
- Public reports repeatedly cite roughly **400,000 modules** damaged and **$70–80M** in losses / insurance claim.
- Project size often cited around **178 MW**.

**How to use as source path later:**

- Build a named-event record with event date, location, project capacity, estimated module count damaged, loss estimate, hail size range, and source count.
- Search for insurer litigation, project-owner statements, repair/recycling contracts, and local filings to clarify gross vs insured loss.

**Caveats:** reported values vary; BI inclusion unclear; not an annual benchmark.

**Reference leads:**

- J.S. Held, *Solar Farm Hail Damage: The Perfect Storm*, https://www.jsheld.com/insights/articles/solar-farm-hail-damage-the-perfect-storm
- VDE Americas, *Understanding Hail Risk*, https://www.vde.com/en/vde-americas/hail-risk/understanding-hail-risk
- pv magazine USA, *Storm season has the US solar industry looking to protect assets from costly hail damage*, https://www.pv-magazine.com/2021/03/19/storm-season-has-the-us-solar-industry-looking-to-protect-assets-from-costly-hail-damage/

---

### 4.3.2 Fighting Jays Solar hail loss and hail sublimit

**Source ID:** `RS_CASE_FIGHTING_JAYS_SOLAR_HAIL_2024`

**Tags:** `HAS_OPEN_NUMBERS`, `EVENT_LOSS`, `DEDUCTIBLE_SUBLIMIT`, `CASE_STUDY_ONLY`, `solar_hail`, `parametric_path`.

**Public numbers / source leads:**

- Fighting Jays Solar Farm, Fort Bend County, Texas, March 2024.
- Public reports cite a **350 MW** project.
- Descartes Underwriting case-study material states the insurance program had a **$50M hail sublimit**, and actual damage likely exceeded that cap.
- VDE's reevaluation found nearby sites exposed to severe hail had very different damage outcomes based on hail stow success, with direct hail-related damage limited at a studied site to rows where a tracker motor issue prevented full stow.

**How to use as source path later:**

- Record both physical damage and insurance structure:

```text
event loss estimate
sublimit
actual payout if available
MW affected
stow status
module construction
hail size / radar-estimated hail
neighboring-site contrast
```

- This is one of the best public pathways for checking whether the model captures stow / tracker operational state.

**Caveats:** actual full loss may not be public; some reports mix initial rumor, panel replacement expectations, and later reassessment.

**References:**

- Descartes Underwriting, *How a Texas Solar Farm Reduced Exposure to Severe Weather with Parametric Hail Insurance*, https://descartesunderwriting.com/case-studies/how-texas-solar-farm-reduced-exposure-severe-weather-parametric-hail-insurance
- VDE Americas, *Reevaluating hailstorm damage at the Fighting Jays solar farm*, https://www.vde.com/en/vde-americas/newsroom/250114-reevaluating-fighting-jays
- POWER Magazine, *Best Practices for Mitigating Hail Damage to Solar Projects*, https://www.powermag.com/best-practices-for-mitigating-hail-damage-to-solar-projects/

---

### 4.3.3 Hurricane / tropical-storm solar PV resilience cases

**Source ID:** `RS_CASE_SOLAR_HURRICANE_STORM_RESILIENCE`

**Tags:** `HAS_PATHWAY_ONLY`, `EVENT_LOSS`, `MECHANISM_ONLY`, `solar_strong_wind`, `solar_hurricane`, `solar_flood`.

**Pathway:** DOE/FEMP and NREL storm-resilience material includes post-event lessons from hurricane-damaged PV systems. Public material is rich for mechanisms, but event financial numbers are sparse.

**Numbers to seek:**

```text
project repair cost
total loss vs partial loss percentage
wind speed experienced
component replacement quantities
flooded inverter / switchgear costs
wind-driven rain remediation
BI / downtime days
```

**Best use:** case-level damage mechanism, cap sanity, and component failure modes for strong wind / hurricane / flood cells.

**Caveats:** not a broad claims dataset.

**Reference leads:**

- DOE/FEMP, *Severe Weather Resilience in Solar Photovoltaic System Design*, https://www.energy.gov/cmei/femp/severe-weather-resilience-solar-photovoltaic-system-design
- DOE/FEMP, *Preventing and Mitigating Flood Damage to Solar Photovoltaic Systems*, https://www.energy.gov/cmei/femp/preventing-and-mitigating-flood-damage-solar-photovoltaic-systems

---

## 4.4 Parametric insurance, trigger studies, and payout-burn sources

Parametric sources are not direct indemnity-loss databases, but they can expose reference numbers that are highly useful:

```text
trigger thresholds
trigger frequency
payout distributions
modeled event severity
coverage gap / sublimit gap
historical burn cost
basis-risk narratives
```

### 4.4.1 Descartes Underwriting — Fighting Jays parametric hail case

**Source ID:** `RS_PARAM_DESCARTES_FIGHTING_JAYS_HAIL`

**Tags:** `HAS_OPEN_NUMBERS`, `TRIGGER_BURN`, `DEDUCTIBLE_SUBLIMIT`, `EVENT_LOSS`, `solar_hail`.

**Public numbers/pathway:**

- Fighting Jays had a **$50M hail sublimit**; actual damage likely exceeded that amount according to Descartes' public case-study framing.
- Descartes' product pathway measures hail-event impact with advanced radar data and can provide excess coverage and liquidity.

**How to obtain comparison numbers later:**

Request anonymized trigger-burn studies:

```text
historical trigger count
trigger size distribution
modeled payout amount by year
payout return periods
hail size / kinetic energy trigger thresholds
maximum payout limit
basis-risk examples
project-specific TIV / MW denominator
```

**Caveats:** payout is not the same as indemnity loss; parametric trigger may over- or under-pay relative to physical loss.

**Reference:**

- Descartes Underwriting, *How a Texas Solar Farm Reduced Exposure to Severe Weather with Parametric Hail Insurance*, https://descartesunderwriting.com/case-studies/how-texas-solar-farm-reduced-exposure-severe-weather-parametric-hail-insurance

---

### 4.4.2 VDE PRE / PREP and hail-wind co-probability reports

**Source ID:** `RS_PARAM_VDE_PRE_PREP_HAIL`

**Tags:** `HAS_GATED_NUMBERS`, `TRIGGER_BURN`, `AAL`, `PML`, `OEP_AEP`, `solar_hail`, `solar_strong_wind`.

**Pathway:** VDE Hail Risk Intelligence explicitly offers PRE / PREP reports for cumulative total hail losses, sample distributions, P50/P90/P95, and parametric trigger points. It also offers co-probability of hail with wind reports.

**How to obtain comparison numbers later:**

Request:

```text
PRE output table
PREP output table
trigger points
return intervals by hail size and wind speed
payout distribution
annual burn cost
sample event set or scenario table
```

**Reference:**

- VDE Americas, *Hail Risk Intelligence advisory products*, https://www.vde.com/en/vde-americas/hail-risk/hail-risk-advisory-products

---

## 4.5 Engineering, reliability, and forensic sources with financial implications

These are not benchmark datasets by themselves, but they are critical for translating physical mechanisms into reference-number requests. They tell us what variables to ask for in claims and model reports.

### 4.5.1 DOE/FEMP — hail damage mitigation for PV systems

**Source ID:** `RS_ENGINEERING_DOE_FEMP_HAIL_PV`

**Tags:** `MECHANISM_ONLY`, `solar_hail`, `COMPONENT_COST`, `SECONDARY_BENCHMARK`.

**Useful content:**

- Solar PV hail risk resources, including NOAA SPC, FEMA NRI, and historical severe hail databases.
- PV-specific mitigation discussion for module selection, stow, and operations.
- Useful for identifying variables that must accompany loss numbers: hail size, module type, glass type, stow angle, stow success, tracker protocol, inspection method.

**How to obtain reference numbers later:**

Not a financial source by itself. Use it to define fields in claims-data requests and to interpret why two projects in the same storm can show very different loss amounts.

**Reference:**

- DOE/FEMP, *Hail Damage Mitigation for PV Systems*, https://www.energy.gov/cmei/femp/hail-damage-mitigation-pv-systems

---

### 4.5.2 DOE/FEMP — flood damage prevention and mitigation for PV systems

**Source ID:** `RS_ENGINEERING_DOE_FEMP_FLOOD_PV`

**Tags:** `MECHANISM_ONLY`, `solar_flood`, `COMPONENT_COST`, `SECONDARY_BENCHMARK`.

**Useful content:**

- FEMA flood maps, 100-year / 500-year flood levels, BFE, sea-level rise, and stormwater inundation guidance.
- Engineering finding that if modules and electrical equipment become submerged, even partially, the system is likely a total loss.
- Conduit water pathways can convey floodwater into inverters, switchgear, and electrical equipment.
- Foundation piles and equipment pads need wet-soil design for structural integrity and corrosion.

**How to obtain reference numbers later:**

Use this source to define component-level claim request fields:

```text
depth above ground
depth at inverter / switchgear / transformer
submersion duration
component replacement quantities
conduit flooding path
foundation scour / wet soil damage
repair vs replacement decision
```

**Caveats:** strong mechanism source; weak financial benchmark alone.

**Reference:**

- DOE/FEMP, *Preventing and Mitigating Flood Damage to Solar Photovoltaic Systems*, https://www.energy.gov/cmei/femp/preventing-and-mitigating-flood-damage-solar-photovoltaic-systems

---

### 4.5.3 DOE/FEMP — wildfire resilience for PV systems

**Source ID:** `RS_ENGINEERING_DOE_FEMP_WILDFIRE_PV`

**Tags:** `MECHANISM_ONLY`, `BI_DOWNTIME`, `solar_wildfire`, `solar_smoke_revenue`.

**Useful content:**

- Separates two PV wildfire risks:
  - smoke / ash / particulate effects reducing power generation and revenue;
  - physical destruction if wildfire engulfs the site.
- Gives observed production-loss references: PVROM western U.S. sites saw measured drops from **9.4% to 37.8%** in power production from wildfire smoke; California September 2020 research shows statewide PV declines **10% to 30%** and local declines up to **58%**.

**How to obtain reference numbers later:**

Use for two separate source pathways:

```text
physical wildfire loss: claims / repair / replacement / burnover case studies
smoke revenue loss: production data, irradiance data, PM2.5/AOD, revenue rate, curtailment, BI coverage
```

**Caveats:** production loss is not physical damage; do not mix smoke revenue loss with physical replacement loss.

**Reference:**

- DOE/FEMP, *Solar Photovoltaic Hardening for Resilience – Wildfire*, https://www.energy.gov/cmei/femp/solar-photovoltaic-hardening-resilience-wildfire

---

### 4.5.4 RETC / PVEL / Kiwa / GroundWork / module-testing ecosystem

**Source ID:** `RS_ENGINEERING_PV_MODULE_RESILIENCE_ECOSYSTEM`

**Tags:** `MECHANISM_ONLY`, `COMPONENT_COST`, `solar_hail`, `solar_strong_wind`, `SECONDARY_BENCHMARK`.

**Useful content:**

- RETC says high wind events are a leading cause of insured losses by claims frequency for fielded solar assets, while hail is a major severity driver.
- Module comparative testing can identify products better suited for hail, wind, snow, and dynamic mechanical loading.
- kWh/GroundWork and VDE materials discuss hail stow, stow angle, and possible overestimation/underestimation of stow benefits.
- These sources can support source fields and curve rationale but generally do not expose portfolio financial losses by themselves.

**How to obtain reference numbers later:**

Ask labs / advisors for:

```text
hail resiliency curve test outputs
breakage probability by hail size / impact energy / angle
module replacement cost assumptions
stow-angle effect size
wind dynamic mechanical load failure results
claims-linked product performance summaries
```

**References:**

- RETC, *Mitigating Extreme Weather Risks*, https://retc-ca.com/news/mitigating-extreme-weather-risks
- VDE / RETC Hail Resiliency Curve product page, https://www.vde.com/en/vde-americas/hail-risk/hail-risk-advisory-products

---

## 4.6 Exposure and denominator sources

These do not provide losses, but without them we cannot interpret any reference number. They are required for converting event losses into `$ / MW`, `%TIV`, state totals, county totals, or portfolio aggregate values.

### 4.6.1 U.S. Large-Scale Solar Photovoltaic Database

**Source ID:** `RS_EXPOSURE_USPVDB`

**Tags:** `DENOMINATOR_ONLY`, `HAS_OPEN_NUMBERS`, `solar_all_hazards`.

**What it provides:**

- Locations and array boundaries of U.S. PV facilities with capacity **1 MW or more**.
- Facility information including panel type, site type, and initial year of operation.
- Latest public release identified during research: **USPVDB v4.0, April 2026**, with **6,611 facilities** covering 49 states plus D.C.; most recent facilities operational as recently as Q4 2025.
- Facilities are collected from EIA and other sources, position-verified and digitized from aerial imagery, and quality checked.

**How to use later:**

```text
join claims / case studies / modeled outputs to asset polygons
build state/county exposure denominators
assign MWdc, site vintage, panel/site attributes
calculate exposed-array area and hazard overlap
scale 1 MWdc benchmark maps to real projects
```

**Reference:**

- USGS/LBNL, *U.S. Large-Scale Solar Photovoltaic Database*, https://energy.usgs.gov/uspvdb/

---

### 4.6.2 U.S. Wind Turbine Database

**Source ID:** `RS_EXPOSURE_USWTDB`

**Tags:** `DENOMINATOR_ONLY`, `HAS_OPEN_NUMBERS`, `wind_all_hazards`.

**What it provides:**

- U.S. land-based and offshore wind turbine locations, project information, and turbine technical specifications.
- Latest public release identified during research: **USWTDB v8.3, March 25, 2026**, with **75,727 turbines** across 45 states plus Guam and Puerto Rico.
- Records include location and technical data; locations visually verified to within 10 meters.

**How to use later:**

```text
join hazard footprints to individual turbine points
assign turbine make/model/hub/rotor/rated capacity where available
build project-level and turbine-level exposure denominators
avoid single-centroid wind-farm modeling
```

**Reference:**

- USGS/LBNL/ACP, *U.S. Wind Turbine Database*, https://energy.usgs.gov/uswtdb/

---

### 4.6.3 EIA Form 860 / 860M

**Source ID:** `RS_EXPOSURE_EIA_860`

**Tags:** `DENOMINATOR_ONLY`, `HAS_OPEN_NUMBERS`, `solar_all_hazards`, `wind_all_hazards`, `BESS_future`.

**What it provides:**

- Generator-level information for existing and planned generators at electric plants with **1 MW or greater** combined nameplate capacity.
- Early-release 2025 data release date: **June 9, 2026**.
- Detailed files include utility, plant, generator, wind, solar, owner/operator, environmental equipment, and related data.

**How to use later:**

```text
generator nameplate capacity
plant/operator/owner
commercial operation date
tracking / technology fields where available
status / retired / proposed / operable
crosswalk with USPVDB and USWTDB
capacity denominator for $/MW and state aggregate loss
```

**Reference:**

- EIA, *Form EIA-860 detailed data*, https://www.eia.gov/electricity/data/eia860/

---

## 4.7 Generic public loss / hazard sources — downgraded to secondary context

These sources are useful, but they should not drive the renewable-specific financial benchmark. Use them for source discovery, event matching, hazard sanity checks, and public-loss geography only.

### 4.7.1 NOAA Storm Events Database

**Source ID:** `RS_GENERIC_NOAA_STORM_EVENTS`

**Tags:** `GENERIC_ONLY`, `SCREENING_ONLY`, `HAS_OPEN_NUMBERS`, `hazard_context`.

**What it provides:**

- Storm events from January 1950 to March 2026 at time of research.
- Event narratives, magnitudes, fatalities, injuries, property damage, crop damage, and event locations.
- Covers hail, tornado, thunderstorm wind, flood, hurricane, wildfire-adjacent weather records, etc.

**Use:**

```text
find candidate damaging events near assets
get event date / magnitude / narrative
join to case studies and claims if asset is named
build hazard event context
```

**Do not use as:** renewable-project loss ground truth.

**Reference:**

- NOAA NCEI, *Storm Events Database*, https://www.ncei.noaa.gov/stormevents/

---

### 4.7.2 SHELDUS

**Source ID:** `RS_GENERIC_SHELDUS`

**Tags:** `GENERIC_ONLY`, `SCREENING_ONLY`, `HAS_OPEN_NUMBERS`, `hazard_loss_context`.

**What it provides:**

- County-level U.S. hazard losses.
- Version 24 launched February 16, 2026; metadata says coverage is January 1960 through December 2024.
- Includes direct property and crop losses, injuries, fatalities, and insured crop indemnity payments.
- Hazard types include flood, hail, hurricane/tropical storm, tornado, wildfire, wind, severe thunderstorm, and others.

**Use:**

```text
public-loss geography
county-level event loss context
source discovery for named events
sanity check of public hazard loss hotspots
```

**Do not use as:** renewable-project claims or asset-specific loss calibration.

**References:**

- ASU CEMHS, *SHELDUS 24 is here*, https://cemhs.asu.edu/sheldus
- ASU CEMHS, *SHELDUS Metadata*, https://cemhs.asu.edu/sheldus/metadata

---

### 4.7.3 FEMA / OpenFEMA NFIP claims

**Source ID:** `RS_GENERIC_NFIP_CLAIMS`

**Tags:** `GENERIC_ONLY`, `SCREENING_ONLY`, `HAS_OPEN_NUMBERS`, `flood_context`.

**What it provides:**

- Public anonymized policy-level and claims-level NFIP data through OpenFEMA.
- FEMA states data are refreshed every 40–60 days.
- Useful for flood loss geography and claims context.

**Use:**

```text
county / census-tract flood claim context
flood event source discovery
public flood-insurance intensity by geography
```

**Do not use as:** solar/wind flood loss benchmark without explicit caveat; NFIP mostly reflects building property policies, not utility-scale renewable assets.

**Reference:**

- FEMA FloodSmart, *FAQs About NFIP Data*, https://agents.floodsmart.gov/flood-maps-and-data/faqs-about-nfip-data

---

## 5. Hazard-specific source-pathway notes

## 5.1 Solar × hail

**Status:** strongest source path.

### Source types that have numbers

| Source type | Has numbers? | Best sources | Numbers available/pathway |
|---|---:|---|---|
| Renewable claims publications | Yes | AXIS, kWh, GCube, Marsh, J.S. Held | claim shares, average claims, $/MW, event losses, downtime |
| Engineered PML/AAL reports | Yes, gated | VDE Hail Risk, VDE/Cirrus, Renew Risk, GRC/VDE | AAL, PML, PRE, distributions, maps, return periods |
| Event case studies | Yes | Midway, Fighting Jays, VDE reevaluation | $70–80M, $50M sublimit, damaged module counts, stow contrast |
| Parametric products | Yes, gated/partial | Descartes, VDE PREP | trigger/payout logic, sublimit gap, burn analysis |
| Engineering/lab | Yes for mechanism | DOE/FEMP, RETC, PVEL, Kiwa, GroundWork | glass/stow/module/hail-size failure inputs |
| Generic public loss | Yes, but generic | NOAA, SHELDUS, FEMA NRI | event discovery and geography only |

### Best immediate extraction targets

```text
AXIS: $150k/MW stowed, $340k/MW fixed tilt, $380k/MW failed stow; 55% gross claim share.
kWh: 73% loss amount vs 6% incident count; 1-in-100 loss >10% value threshold from 2026 SRA.
GCube: $58.4M average hail claim; 54% incurred cost share; Hail-or-High-Water aggregate claims.
VDE: AAL/PML maps for 1 MWdc and project-specific reports.
Midway: $70–80M named-event loss.
Fighting Jays: $50M sublimit and actual damage likely above sublimit; stow/no-stow contrast.
```

### Gaps to close

```text
gross vs net claim basis
BI inclusion
exact TIV denominator
per-state or per-county exposure denominator
claim severity distribution, not just averages
how repeated losses are represented
```

---

## 5.2 Solar × flood

**Status:** credible but financially gated. Public solar-specific claims are sparse.

> **v0.3 update (2026-07-09):** the solar × flood pair dossier has been built at
> [`../01_pairs/solar_flood/README.md`](../01_pairs/solar_flood/README.md) with a companion
> crosswalk at [`../02_crosswalks/solar_flood_value_damage_crosswalk.md`](../02_crosswalks/solar_flood_value_damage_crosswalk.md).
> Key findings from that build, to carry back into this anchor:
>
> ```text
> - Isolated solar-flood $/MW physical severity is genuinely scarce. Of ~34 benchmark rows, only three
>   normalize to $/MW at all, and all three are derived/sensitivity/zero:
>     DEPCOM avoided-loss   ~$43,478/MW (avoided, not incurred; inside the electrical/BOS bucket)
>     VDE/AXIS portfolio    ~$32.61/MW (13-yr aggregate over 92 GW DC)
>     Valdora               $0/MW      (genuine measured zero; elevated site, ~1.2 m freeboard)
> - The most reliable open dollars are litigation totals (First Solar/Zurich asserted ~$10.1M;
>   South Alexander/Markel ~$1.1M) that LACK a MW denominator and are dominated by per-event
>   flood deductibles and BI structure.
> - The flood failure grain is the canonical 8 named flood_solar failure units (FS_INV, FS_SWG,
>   FS_XFMR, FS_COMB, FS_SCADA, FS_CABLE, FS_FOUND, FS_PVMOD) — mostly electrical / balance-of-system,
>   NOT PV module glass. Standing modules above the waterline are generally not the loss.
> - CORRECTION (v0.3.1): the canonical flood_solar damage cell DOES exist in Damage_Modeling. The
>   crosswalk is RESOLVED_FROM_DAMAGE_MODELING and uses the real per-failure-unit depth->DR curve
>   (public-source-anchored engineering parameterization: DOE/FEMP, NEMA, FEMA, USACE HEC-FIA).
>   The primary depth-driven electrical bucket (INV+SWG+XFMR+COMB+SCADA) is ~$146,947/MWdc (13.12% TIV);
>   the all-8-unit envelope is ~$538,607/MWdc (48.09% TIV). The earlier PENDING_UPSTREAM_ARTIFACTS
>   status and the invented ~$217,279/MWdc FLOOD_ELECTRICAL_BOS bucket were wrong and have been removed.
> - Elevation/freeboard is the dominant mitigation knob (flood analog of hail stow): USACE generic
>   curves show +1 ft freeboard cuts AAL ~82%, and Valdora is a real zero-loss confirmation.
> ```

### Source types that have numbers

| Source type | Has numbers? | Best sources | Numbers available/pathway |
|---|---:|---|---|
| Renewable claims publications | Weak | Broker/insurer loss runs likely; little open public evidence | ask brokers/insurers for anonymized solar flood claims |
| Engineered PML/AAL reports | Yes, gated | VDE/Cirrus, Moody's RMS, Fathom | AAL/PML, flood loss estimates, exposure-disaggregation effects |
| Event case studies | Partial | DOE/FEMP/NREL storm cases, local news, insurance files | component loss, flood-depth cases, but not broad distribution |
| Parametric products | Pathway | FloodFlash, Descartes-style flood parametric, broker products | trigger-burn and payout distributions, not indemnity claims |
| Engineering/lab | Yes for component logic | DOE/FEMP flood PV guidance | total-loss logic for submerged modules/electrical equipment |
| Generic public loss | Yes, generic | NFIP, SHELDUS, NOAA | flood context only |

### Best immediate extraction targets

```text
Moody's solar farm case: obtain absolute AAL values if possible; public source reports +230% flood AAL after exposure disaggregation.
VDE/Cirrus: request 1-in-500 inland flood PML report sample and AAL if available.
DOE/FEMP: extract component exposure fields, not benchmark dollars.
Fathom / flood consultants: ask for renewable-development flood risk assessment outputs.
Broker loss runs: ask for solar flood claims binned by depth, component, and PD/BI.
```

### Gaps to close

```text
actual solar flood claim severity distribution
component-level repair/replacement costs after submersion
flood depth / duration attached to claim records
BI inclusion
coastal vs riverine vs pluvial split
```

---

## 5.3 Solar × strong wind / severe convective wind

**Status:** partial; credible source path, but direct open numbers are weaker than hail.

### Source types that have numbers

| Source type | Has numbers? | Best sources | Numbers available/pathway |
|---|---:|---|---|
| Renewable claims publications | Partial | AXIS, RETC, Alpine/adjuster publications, GCube summaries | high-wind frequency statements, strong-wind ranking, some claim notes |
| Engineered PML/AAL reports | Yes, gated | Renew Risk SCS, VDE/Cirrus, Moody's/RMS, Verisk SCS | PML/AAL if renewable vulnerability is coded |
| Event case studies | Partial | FEMP/NREL storm resilience, hurricane PV cases | mechanism and partial/total loss behavior |
| Parametric products | Pathway | wind/hail co-probability, SCS parametric | gust/hail trigger, payout burn |
| Engineering/lab | Strong | NREL/FEMP, RETC, tracker/racking aeroelastic work | mechanism, x-axis, failure-unit fields |
| Generic public loss | Yes, generic | NOAA, SHELDUS, PCS, Aon SCS | context only |

### Best immediate extraction targets

```text
Renew Risk SCS model: ask for peril-separated hail / tornado / straight-line wind outputs.
VDE/Cirrus: ask for named windstorm / severe convective storm solar PML outputs.
AXIS solar report: extract strong-wind claim ranking and ask for $/MW or claim share by wind.
RETC / PVEL / forensic adjusters: ask for high-wind claim frequency/severity summaries.
FEMP/NREL storm resilience: use for event mechanism and cap logic.
```

### Gaps to close

```text
straight-line wind separated from hail and tornado
array-height gust and design-standard basis
claim severity by tracker/racking/module/foundation failure
BI inclusion
wind-driven rain separated from structural wind
```

---

## 5.4 Solar × tornado

**Status:** weak as a standalone open source path; best path is through severe-convective-storm models and private claims.

### Source types that have numbers

| Source type | Has numbers? | Best sources | Numbers available/pathway |
|---|---:|---|---|
| Renewable claims publications | Weak | AM Best / GCube mentions, insurer loss runs | scattered mentions of damaged rows; little numeric detail |
| Engineered PML/AAL reports | Yes, gated | Renew Risk SCS, Verisk SCS, VDE/Cirrus severe convective storm | PML/AAL possible if tornado separated |
| Event case studies | Partial | local news, adjuster files | event-level severity if assets named |
| Parametric products | Pathway | SCS parametric | trigger/payout distributions |
| Engineering/lab | Partial | ASCE, debris, tracker/racking wind | mechanism, not financial |
| Generic public loss | Yes, generic | NOAA, SHELDUS | event discovery only |

### Best immediate extraction targets

```text
Renew Risk SCS: ask explicitly for tornado-only solar vulnerability and output.
Verisk/AIR SCS: ask whether solar occupancy/vulnerability exists and can separate tornado/hail/wind.
Insurers/brokers: ask for tornado-coded solar claims separate from straight-line wind.
Case search: identify named solar projects hit by tornadoes in NJ, MN, VA, etc.
```

### Gaps to close

```text
tornado vs straight-line wind cause coding
debris/missile damage records
swath/exposure fraction
actual solar tornado claim dollars
```

---

## 5.5 Solar × hurricane / named windstorm

**Status:** moderate, but only if peril components are separated.

### Source types that have numbers

| Source type | Has numbers? | Best sources | Numbers available/pathway |
|---|---:|---|---|
| Renewable claims publications | Partial | GCube, Power Factors summary, AXIS/RCG reports | hurricanes material in U.S. renewables; wind-farm strongest; solar rankings |
| Engineered PML/AAL reports | Yes, gated | VDE/Cirrus named windstorm, Moody's/RMS hurricane, Renew Risk hurricane | PML/AAL possible |
| Event case studies | Partial | DOE/FEMP/NREL storm-resilience cases | mechanism, partial loss, total loss examples |
| Parametric products | Pathway | hurricane wind / rain parametric | trigger burn and payout |
| Engineering/lab | Strong | FEMP/NREL, design codes, storm hardening | mechanism |
| Generic public loss | Yes, generic | NOAA, SHELDUS, PCS, Aon | context only |

### Best immediate extraction targets

```text
GCube Hail-or-High-Water: extract hurricane claim statistics by asset.
VDE/Cirrus: request named windstorm PML for solar.
Moody's/RMS: request solar-farm hurricane/windstorm outputs with distributed exposure.
FEMP storm resilience: extract mechanism and loss-state examples.
```

### Gaps to close

```text
hurricane wind vs flood vs wind-driven rain vs debris split
PD vs BI split
solar vs wind split
TIV / insured value denominator
```

---

## 5.6 Solar × wildfire / fire / smoke

> **v0.4 dossier note (EXOGENOUS-only scope).** The `solar_wildfire` pair dossier is now built at [`../01_pairs/solar_wildfire/README.md`](../01_pairs/solar_wildfire/README.md), scoped to the **EXOGENOUS (landscape-originated) wildfire physical-damage slice only**: fire ignites outside the site in vegetation, spreads, reaches the asset, and damages it via flame/radiant/ember/convective heat, on an **FSim conditional flame-length → fireline-intensity** axis (NOT ecological burn severity dNBR/MTBS, which is a geography check only). The crosswalk is `RESOLVED_GRAIN_DR_WITHHELD` against the canonical `wildfire_solar` cell (11 WS_* failure units + value ladder; DR ordinates WITHHELD upstream, `NO_RUNTIME_CURVE`).
>
> **The origin fence (load-bearing).** "Solar fire" is not "solar wildfire." Fire risk decomposes on three independent axes: (1) **ignition source** (external landscape vs equipment vs other), (2) **fire medium/state** (vegetation/brush vs electrical/component), and (3) **direction of risk** (outside-in / inside-contained / inside-out). This cell owns **only the outside-in exogenous slice.** Endogenous / asset-originated fire (inverter, connector/wiring, combiner, module/junction-box, transformer, BESS thermal runaway) is a **distinct, deferred peril**; smoke/soiling optical generation loss is a **separate revenue peril**; PSPS and BI are also out of scope.
>
> **Consequence for the numbers.** The plentiful open "solar fire" statistics are the *wrong origin/peril* and are tagged `ALL_CAUSE_PV_FIRE_BLENDED` (`CONTEXT_NOT_BENCHMARK`) or `SMOKE_SOILING_GENERATION`. kWh Analytics is **loss-first** (blends all-cause PV fire); the InfraSure package is **causal-process-first** (M0→M4, separates causes / intensities / vulnerabilities). kWh's "84% equipment-driven" headline is unsupported by its own chart (= 100% − 16% wildfire, sweeping 27% unknown + 3% other into "equipment"); the defensible reading is ~16% external wildfire, ~55% identified equipment, ~27% unknown. Named events are origin-checked: DEPCOM Kern, Wellington North, Beryl, Canyon Fire 2, Kings County, Energy Safe Vic = EXOGENOUS; CVSR 2019 (avian/electrical arc), Mannum & Raywood (inverter) = ENDOGENOUS, excluded from the exogenous count. **0 of 100 catalogued benchmark rows normalize to $/MW** — no isolated, properly-scoped exogenous-wildfire solar $/MW physical severity exists in the open literature.

**Status:** good source path for fire and smoke revenue loss; weaker for pure offsite wildfire physical burnover. **EXOGENOUS-wildfire $/MW physical severity is confirmed absent in the open literature (v0.4).**

### Source types that have numbers

| Source type | Has numbers? | Best sources | Numbers available/pathway |
|---|---:|---|---|
| Renewable claims publications | Yes / partial | kWh 2026, Marsh, broker roundtables | fire as PV loss driver, equipment-driven brushfire shares |
| Engineered PML/AAL reports | Yes, gated | VDE/Cirrus wildfire, general wildfire cat models | PML possible |
| Event case studies | Partial | project fire reports, insurer files, local news | likely source-specific |
| Parametric products | Pathway | wildfire/smoke parametric | trigger burn and payout |
| Engineering/revenue studies | Strong | DOE/FEMP, 60Hertz, academic smoke studies | power/revenue loss percentages |
| Generic public loss | Yes, generic | NOAA/SHELDUS/FEMA wildfire | context only |

### Best immediate extraction targets

```text
kWh 2026 SRA: over $150B loss data; fire second-largest PV loss driver; 84% equipment-driven brushfires.
PV Magazine / broker summary: inverters 44% of all PV fires; 73% of inverter-driven brushfires tied to one manufacturer, according to report summary.
60Hertz / kWh 2025: up to 6% annual revenue loss from far-away wildfire smoke.
DOE/FEMP: production drop and physical destruction split.
Academic smoke study: PV production decline and financial losses in Alberta.
VDE/Cirrus: wildfire PML outputs if available.
```

### Gaps to close

```text
wildfire burnover physical PD claim dollars
on-site equipment-driven fire vs external wildfire cause coding
smoke revenue loss vs physical damage split
manufacturer / inverter confidentiality
BI and outage terms
```

---

## 5.7 Wind × onshore tornado / strong wind / hurricane

**Status:** harder than solar hail; likely needs private claims and commercial models.

### Source types that have numbers

| Source type | Has numbers? | Best sources | Numbers available/pathway |
|---|---:|---|---|
| Renewable claims publications | Partial | GCube/PF summaries, insurer loss runs | weather-related wind-farm claims, hurricanes |
| Engineered PML/AAL reports | Yes, gated | RMS/Moody's, Verisk/AIR, Renew Risk, broker models | AAL/PML if turbine vulnerability exists |
| Event case studies | Partial | named storm/tornado wind-farm reports | event severity, but sparse |
| Parametric products | Pathway | wind-speed / hurricane parametric | burn and payout |
| Engineering/lab | Partial | IEC class, turbine fragility, tornado hazard studies | mechanism |
| Generic public loss | Yes, generic | NOAA, SHELDUS | event context only |

### Best immediate extraction targets

```text
GCube Hail-or-High-Water / Power Factors: hurricanes as leading U.S. wind-farm weather claim driver; wind-farm weather losses much larger than solar in one summary.
RMS/Moody's: wind farm site disaggregation and turbine-level AAL outputs.
USWTDB + EIA: denominator and turbine specification.
Insurer/broker loss runs: cause-coded onshore wind NatCat claims.
```

### Gaps to close

```text
direct onshore wind tornado claim dollars
hub-height intensity and design-class basis
component replacement cost by blade/tower/nacelle/foundation
BI / lost-generation claims
construction vs operations split
```

---

## 5.8 Offshore wind

**Status:** good claim-driver sources exist, but this is a different asset class and not the same as onshore wind NatCat.

### Best immediate extraction targets

```text
AXIS 2026 offshore wind report: claim shares and average claims by turbine / cable / foundation.
Allianz 2023 offshore wind report: cable and turbine claim shares by value.
Renew Risk offshore wind models: windstorm, typhoon, earthquake models for offshore wind.
```

### Use caution

Offshore wind claim reports are valuable for understanding energy asset specificity, but many losses are cable, foundation, drivetrain, installation, marine, or BI-driven. They should not be imported directly into onshore tornado or hurricane damage curves without cause separation.

---

## 6. Private / semi-private pathways that may be higher value than public reports

Public reports are useful, but the best reference numbers are likely behind relationships. These should become explicit outreach tracks.

### 6.1 Insurer / underwriter anonymized loss runs

**Potential owners:** AXIS, kWh/Solar Energy Insurance Services, GCube/Tokio Marine HCC, Munich Re, Swiss Re Corporate Solutions, Travelers, Allianz, Beazley/kWh, specialty renewable markets.

**Ask for:**

```text
anonymized claim table
cause of loss
asset type
project capacity bucket
state/region bucket
loss date bucket
claim count
incurred loss
paid loss
gross ground-up loss
BI loss
PD loss
deductible / sublimit / attachment bucket
claim status
component damaged
```

**Most important governance requirement:** preserve confidentiality while still retaining enough denominator and cause coding to be useful.

### 6.2 Broker placement and renewal analytics

**Potential owners:** Marsh, WTW, Aon, Lockton, CAC Specialty / Cirrus, Brown & Brown, Miller, Nardac, McGill and Partners.

**Ask for:**

```text
renewable property insurance benchmark rate-on-line by region/peril
hail / wind / wildfire sublimits
deductible trends by peril
required risk engineering reports
aggregate loss history by peril and asset
client anonymized PML/AAL reports
```

**Caveat:** premiums are not expected loss. They can be used for market context and insurance-condition validation, not as direct EAL unless loads are modeled.

### 6.3 Independent engineer / lender due-diligence reports

**Potential owners:** VDE, DNV, UL, Black & Veatch, Sargent & Lundy, Leidos, Leeward / sponsor teams, lenders, tax equity providers.

**Ask for:**

```text
NatCat review section
PML/AAL values
hazard reports attached to financing
mitigation assumptions
module / tracker / inverter equipment schedules
insurance adviser outputs
```

**Caveat:** reports are transaction-confidential; public availability is low.

### 6.4 Claims adjuster / forensic engineering files

**Potential owners:** J.S. Held, Sedgwick, Crawford, Alpine Intel / StrikeCheck, Envista, Haag, forensic accountants.

**Ask for:**

```text
claim cause
project type
component damage count
repair estimate
replacement cost
BI estimate
downtime
scope of inspection
hail size / wind speed / flood depth
```

**Caveat:** excellent for event severity; not always good for annual frequency.

### 6.5 Parametric insurers and weather intelligence vendors

**Potential owners:** Descartes, FloodFlash, AXA Climate, Swiss Re Corporate Solutions, Munich Re, Vaisala Xweather, DTN, Tomorrow.io, StormGeo.

**Ask for:**

```text
historical trigger burn
payout curve
trigger event count
trigger metric and threshold
project-specific basis-risk study
modeled payout distribution
comparison of payout vs estimated physical loss, if available
```

**Caveat:** trigger payout is not the same as physical damage; useful as a financial envelope and event-frequency check.

### 6.6 Public legal / regulatory / transaction documents

**Potential sources:** court filings, insurance disputes, SEC filings, bond offering memoranda, county planning files, interconnection / outage reports, public commission dockets, procurement records for public agencies.

**Search strategy:**

```text
"<project name>" hail insurance claim
"<project name>" storm damage repair
"<project name>" force majeure hail
"<project name>" insurance proceeds
"<project name>" property damage renewable
"solar farm" "hail" "claim" "sublimit"
"solar project" "flood" "insurance"
"wind farm" "tornado" "insurance claim"
```

**Caveat:** high effort, inconsistent, but can reveal real financial values.

---

## 7. Minimum fields to store for every benchmark source row

When this becomes a machine-readable registry, each row should use a schema like this:

```yaml
benchmark_source_id: string
source_name: string
source_owner: string
source_type:
  - insurer_claims_publication
  - broker_report
  - engineered_pml_aal_report
  - catastrophe_model
  - parametric_insurance
  - forensic_case_study
  - engineering_guidance
  - exposure_denominator
  - generic_public_loss
hazard_tags: []
asset_tags: []
renewable_specificity:
  - direct_hazard_asset
  - direct_asset_class_but_peril_aggregated
  - renewable_general
  - generic_property
availability_status:
  - HAS_OPEN_NUMBERS
  - HAS_GATED_NUMBERS
  - HAS_PATHWAY_ONLY
  - NO_DIRECT_RENEWABLE_NUMBERS_FOUND
metric_tags: []
values_visible_publicly: string
numbers_to_extract: []
access_path: string
expected_request_owner: string
coverage_basis_known: boolean
gross_vs_net_known: boolean
bi_inclusion_known: boolean
tiv_basis_known: boolean
geography_resolution: string
time_period: string
known_bias_flags: []
usable_for:
  - source_discovery
  - event_severity
  - annual_loss_reference
  - pml_reference
  - cap_check
  - denominator
  - mechanism_only
notes: string
url: string
last_checked: YYYY-MM-DD
```

---

## 8. Data-request templates

### 8.1 Claims-data request template

Ask insurers / brokers / adjusters for a binned or anonymized table with at least:

```text
claim_id_anonymized
date_of_loss_year_month
country
state_or_region
county_or_region_bucket
asset_type: solar_pv / onshore_wind / offshore_wind / BESS / other
project_capacity_bucket
commercial_operation_year_bucket
cause_of_loss_primary
cause_of_loss_secondary
peril_taxonomy_original
peril_taxonomy_mapped
claim_count_or_record_flag
gross_ground_up_loss
insured_loss
paid_loss
incurred_loss
physical_damage_loss
business_interruption_loss
extra_expense_loss
deductible_amount_or_bucket
sublimit_amount_or_bucket
policy_limit_bucket
TIV_bucket
insured_value_bucket
component_group_damaged
repair_or_replace_flag
downtime_days
claim_open_closed_flag
```

Additional solar fields:

```text
module_type
module_glass_type
tracker_or_fixed_tilt
stow_capability
stow_status
stow_angle
hail_size_or_wind_speed_or_flood_depth
array_exposure_fraction_if_known
```

Additional wind fields:

```text
turbine_make_model_bucket
hub_height_bucket
rotor_diameter_bucket
turbine_class
component_damaged: blade / tower / nacelle / drivetrain / foundation / cable / substation
construction_or_operation_phase
```

### 8.2 Engineered PML/AAL report request template

Ask model vendors / risk engineers for:

```text
site_id
asset_type
report_date
model_version
hazard/peril
AAL by peril
PML by return period
OEP curve points
AEP curve points
PD / BI split
TIV basis
replacement value basis
insured value basis
deductible / sublimit treatment
input exposure granularity
technology assumptions
mitigation assumptions
output uncertainty / confidence interval
```

### 8.3 Parametric trigger request template

Ask parametric providers for:

```text
trigger variable
trigger threshold
trigger footprint resolution
historical burn period
annual trigger frequency
payout curve
maximum payout
modeled payout by historical year
modeled payout by synthetic year
known basis-risk examples
comparison to indemnity loss if available
```

---

## 9. Retrieval priority list

### P0 — highest value, do first

1. **Download and parse kWh Solar Risk Assessment 2025 and 2026.**  
   Target numbers: hail loss share, incident share, fire loss share, smoke revenue loss, PV fire cause shares, 1-in-100 loss >10% threshold logic.

2. **Download AXIS Global Energy solar severe-weather / hail report.**  
   Target numbers: $/MW by stow state and fixed-tilt/tracker state; downtime; gross claim share; glass-type differential.

3. **Acquire VDE Hail Risk Intelligence sample or subscription output.**  
   Target numbers: 1 MWdc AAL/PML map bands, PML/AAL report outputs, PRE/PREP distributions, hail-wind co-probability tables.

4. **Acquire VDE/Cirrus all-NatCat sample report.**  
   Target numbers: 1-in-500 PML for hail, inland flood, named windstorm, severe convective storm, wildfire; AAL if available.

5. **Find original GCube reports: `Hail or High Water` and `Hail No!`.**  
   Target numbers: claim severity, claim shares, asset/peril split, 2010–2020 / 2018–2023 trend tables.

6. **Request Renew Risk U.S. Solar SCS model sample output.**  
   Target numbers: solar-specific hail/tornado/wind AAL/PML, BI, TIV, peril separation, engineering modifiers.

### P1 — important, after P0

7. **Moody's RMS / broker solar flood-wind case details.**  
   Target numbers: absolute flood and windstorm AAL before/after exposure disaggregation.

8. **GRC + VDE Natural Hazards report sample.**  
   Target numbers: hail PML integration and risk engineering recommendations.

9. **Marsh / WTW / Aon / Lockton broker data request.**  
   Target numbers: claim shares, sublimits, deductibles, rate movement by peril, anonymized loss histories.

10. **AXIS offshore wind full report.**  
    Target numbers: component-level claim severity and BI splits for offshore wind; useful for future offshore wind and energy-asset specificity.

### P2 — useful supporting tracks

11. **Public case-study expansion.**  
    Build named-event records for Midway, Fighting Jays, hurricane-damaged PV, wildfire-affected PV, tornado-damaged solar rows, wind-farm hurricane losses.

12. **DOE/FEMP / NREL engineering extraction.**  
    Extract component-level failure-state logic and fields for claims-data requests.

13. **Generic public sources.**  
    Use NOAA/SHELDUS/NFIP only for event matching, geography, and source discovery.

---

## 10. What the future Markdown / registry should not do

Do not let the source registry become a calibration method. Keep it to:

```text
source owner
source type
numbers available
hazard/asset coverage
access path
known caveats
next retrieval action
```

Do not rank model outputs here. Do not define pass/fail bands here. Do not compare generic real-estate loss ratios to renewable energy assets except in a clearly downgraded secondary context.

Most importantly:

```text
A source that has a number is not automatically a benchmark.
A source becomes a benchmark only after its denominator, coverage basis, peril coding,
asset class, geography, and loss basis are understood.
```

---

## 11. One-page summary table

| Cell | Current source depth | Best source pathway | Main missing piece |
|---|---|---|---|
| Solar × hail | Strong | AXIS + kWh + GCube + VDE/Cirrus + Renew Risk + Midway/Fighting Jays | Denominator and full claim distributions |
| Solar × flood | Partial/gated | VDE/Cirrus + Moody's/RMS + DOE/FEMP + broker loss runs | Actual solar flood claims |
| Solar × strong wind | Partial/gated | Renew Risk SCS + VDE/Cirrus + AXIS/RETC + FEMP storm cases | Peril-separated wind claim severity |
| Solar × tornado | Weak/gated | Renew Risk SCS + Verisk/AIR SCS + private claims | Actual tornado-coded solar losses |
| Solar × hurricane | Moderate/gated | GCube + VDE/Cirrus + Moody's/RMS + FEMP storm cases | Wind/flood/rain split and solar-specific dollars |
| Solar × wildfire/fire | Moderate | kWh 2026 + DOE/FEMP + broker/fire loss data | Offsite wildfire physical loss vs equipment-driven fire split |
| Solar × smoke revenue | Moderate/strong | kWh/60Hertz + DOE/FEMP + academic production-loss studies | Mapping revenue loss to insurable BI basis |
| Onshore wind × tornado/strong wind | Partial/private | GCube + RMS/Moody's + Verisk/AIR + USWTDB + insurer loss runs | Direct onshore wind NatCat claims by peril |
| Offshore wind | Strong but different asset | AXIS offshore + Allianz offshore + Renew Risk offshore | Separate NatCat/weather from construction/mechanical/marine losses |

---

## 12. References index

### Renewable claims / reports

- kWh Analytics, *Solar Risk Assessment 2026*: https://kwhanalytics.com/industry-reports/2026-solar-risk-assessment/
- kWh Analytics / Business Wire, *2025 Solar Risk Assessment announcement*: https://www.businesswire.com/news/home/20250610934841/en/kWh-Analytics-Reveals-Top-Risk-Management-Challenges-for-Renewable-Energy-and-Battery-Energy-Storage-Systems
- Energy Global, 2025 SRA summary: https://www.energyglobal.com/special-reports/12062025/kwh-analytics-reveals-top-risk-management-challenges-for-renewable-energy-and-bess/
- AXIS Capital, solar severe-weather report press release: https://investor.axiscapital.com/investors/press-releases/news-details/2025/AXIS-Global-Energy-Special-Report-Highlights-Extent-of-Severe-Weather-Impact-on-Solar-Technology-2025-hbZw1R8iIJ/default.aspx
- GCube / TMGX, *Hail or High Water*: https://tmgx.com/Insights/Reports/HAIL-OR-HIGH-WATER
- PV Tech, GCube *Hail No!* summary: https://www.pv-tech.org/hail-claims-now-average-around-us58-4-million-per-claim-says-gcube-insurance/
- Marsh, renewable insurance claims article: https://www.marsh.com/hk/en/industries/energy-and-power/insights/secure-renewable-energy-insurance-in-asia.html
- J.S. Held, solar hail claims article: https://www.jsheld.com/insights/articles/solar-farm-hail-damage-the-perfect-storm
- AXIS Capital, offshore wind claims report press release: https://investor.axiscapital.com/investors/press-releases/news-details/2026/AXIS-Offshore-Wind-Report-Highlights-Technical-Risks-and-Evolving-Challenges-2026-yWZF4CzKrj/default.aspx

### Engineered PML/AAL / cat model paths

- VDE Hail Risk Intelligence advisory products: https://www.vde.com/en/vde-americas/hail-risk/hail-risk-advisory-products
- VDE all-natural-catastrophe risk reports: https://www.vde.com/en/vde-americas/hail-risk/natural-catastrophe-risk-and-insurability-report
- VDE Hail Risk Atlas: https://www.vde.com/en/vde-americas/hail-risk/arcgis-based-hail-risk-maps
- Renew Risk U.S. solar model launch: https://www.renew-risk.com/resources/high-risk-hail-solar-model
- pv magazine USA, Renew Risk U.S. SCS model: https://pv-magazine-usa.com/2026/05/06/renew-risk-launches-storm-catastrophe-model-for-u-s-solar-projects/
- Moody's, renewables risk modeling: https://www.moodys.com/web/en/us/insights/insurance/risk-modeling-and-the-rise-of-renewables.html
- Moody's, specialized solar farm flood/wind case: https://www.moodys.com/web/en/us/insights/insurance/applying-specialized-risk-treatment-to-a-solar-farm.html
- VDE/GRC partnership: https://www.vde.com/en/vde-americas/newsroom/vde-and-grc-partner-to-enhance-hail-risk-assessment-for-solar-projects

### Engineering / mechanism sources

- DOE/FEMP, hail damage mitigation for PV systems: https://www.energy.gov/cmei/femp/hail-damage-mitigation-pv-systems
- DOE/FEMP, flood damage mitigation for PV systems: https://www.energy.gov/cmei/femp/preventing-and-mitigating-flood-damage-solar-photovoltaic-systems
- DOE/FEMP, wildfire resilience for PV systems: https://www.energy.gov/cmei/femp/solar-photovoltaic-hardening-resilience-wildfire
- DOE/FEMP, severe-weather PV resilience: https://www.energy.gov/cmei/femp/severe-weather-resilience-solar-photovoltaic-system-design
- RETC, extreme weather risks: https://retc-ca.com/news/mitigating-extreme-weather-risks
- Alpine Intel / StrikeCheck, storm-impacted solar power systems: https://alpineintel.com/resource/what-adjusters-should-expect-to-see-from-storm-impacted-solar-power-systems/

### Exposure / denominator sources

- USGS/LBNL, U.S. Large-Scale Solar Photovoltaic Database: https://energy.usgs.gov/uspvdb/
- USGS/LBNL/ACP, U.S. Wind Turbine Database: https://energy.usgs.gov/uswtdb/
- EIA, Form EIA-860 detailed data: https://www.eia.gov/electricity/data/eia860/
- SEIA, Major Solar Projects List: https://seia.org/research-resources/major-solar-projects-list/

### Generic public context sources

- NOAA NCEI, Storm Events Database: https://www.ncei.noaa.gov/stormevents/
- SHELDUS / ASU CEMHS: https://cemhs.asu.edu/sheldus
- SHELDUS metadata: https://cemhs.asu.edu/sheldus/metadata
- FEMA / FloodSmart, NFIP data FAQ: https://agents.floodsmart.gov/flood-maps-and-data/faqs-about-nfip-data
- OpenFEMA data sets: https://www.fema.gov/about/openfema/data-sets
