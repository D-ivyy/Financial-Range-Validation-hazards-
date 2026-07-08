# Solar × hail — renewable loss reference source deep dive

**Version:** v0.2  
**Last researched:** 2026-06-26  
**Parent anchor:** [`../../README.md`](../../README.md)  
**Purpose:** document *where to get reference numbers* for solar PV hail loss validation. This file does **not** define calibration pass/fail rules. It only organizes the usable numbers and the pathways to stronger numbers.

---

## 0. Bottom line

Solar × hail is the right first pair because it has the strongest renewable-specific reference-number ecosystem found so far:

```text
open claim-severity numbers        -> AXIS $/MW by stow/fixed/failed-stow state
open portfolio loss-share numbers  -> kWh and GCube hail share vs incident count
open modeled AAL case numbers      -> kWh/POWER 100 MW standard vs resilient design
open case/event severity numbers   -> J.S. Held, Midway-style loss ranges, GCube average claim
strong gated PML/AAL pathway       -> VDE/Cirrus/GRC engineered reports and Hail Risk Atlas
strong denominator pathway         -> USPVDB + EIA-860 + project value ledger
```

The main limitation is that the best comparison-ready PML/AAL numbers are mostly **gated**. Public sources expose enough to build a serious benchmark-number registry, but not enough to claim clean historical backtesting.

---

## 1. Normalization basis used in this dossier

The table below converts open `$ / MW` and AAL values into rough `% TIV` using the project default solar value basis. These conversions are **not calibration conclusions**; they are just a way to place heterogeneous source numbers on one page.

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
- Some sources report gross claims; some report net loss after deductible obligations.
- Some use MW, some MWdc/MWac may be ambiguous.
- Reported claim dollars may include BI, soft cost, mitigation, or coverage-specific effects.
- A claim severity number is an event/claim anchor, not an annual loss metric.
- AAL numbers are annualized model outputs and should not be mixed with event claim severity.
```



### 1.1 Value/damage cross-reference added in v0.2

The v0.2 package adds a dedicated crosswalk:

```text
02_crosswalks/solar_hail_value_damage_crosswalk.md
```

Why it matters:

```text
The canonical hail damage curve is PV_MODULE / PV_ARRAY grain.
Many benchmark numbers are gross claim dollars per MW.
Those are not the same denominator.
```

Using the damage-modeling value workbook, the direct PV_ARRAY module hardware bucket is about **$291,215/MWdc**, or **26.00% of installed TIV**. If unallocated replacement fieldwork is added as a gross physical repair-cost bucket, the comparable bucket becomes about **$398,084/MWdc**, or **35.54% of installed TIV**.

That makes the AXIS severity rows more interpretable:

```text
successful stow    $150k/MW  -> below PV_ARRAY hardware cap
fixed tilt         $340k/MW  -> above module hardware, within PV_ARRAY + fieldwork
failed stow $380k/MW  -> above module hardware, near PV_ARRAY + fieldwork
```

So the cross-reference adds value, but only as a **normalization and comparability layer**. It does not make the value workbook an external validation source.


---

## 2. Quick benchmark-number matrix

| Benchmark | Source | Reported | $/MW | % default installed TIV | % default physical value | Caveat |
| --- | --- | --- | --- | --- | --- | --- |
| Hail share of total gross NatCat/extreme-weather solar PV claim amount in U.S./Canada | AXIS_SOLAR_VS_HAIL_2025 | 55 % of total gross claims amount |  |  |  | Not normalized to exposure; claim universe and policy terms not fully public. |
| Successful stow average hail claim severity | AXIS_SOLAR_VS_HAIL_2025 | $150,000/MW gross claim dollars per MW | $150,000 | 13.39% | 17.09% | Gross claim basis; project TIV and deductible terms not public. |
| Fixed-tilt average hail claim severity | AXIS_SOLAR_VS_HAIL_2025 | $340,000/MW gross claim dollars per MW | $340,000 | 30.36% | 38.73% | Gross claim basis; project TIV and deductible terms not public. |
| Tracker failed-stow average hail claim severity | AXIS_SOLAR_VS_HAIL_2025 | $380,000/MW gross claim dollars per MW | $380,000 | 33.93% | 43.29% | Gross claim basis; project TIV and deductible terms not public. |
| Heat-strengthened glass average gross claim amount delta vs fully tempered | AXIS_SOLAR_VS_HAIL_2025 | +$50,000/MW gross claim dollars per MW delta | $50,000 | 4.46% | 5.70% | Delta only, not standalone total claim severity. |
| Global closed solar PV hail claims gross amount divided by reported affected capacity | AXIS_GALLAGHER_RE_RISK_INSURANCE_2026 | $342M / 2.7GW = $126,667/MW gross dollars per reported GW | $126,667 | 11.31% | 14.43% | Do not treat as per-project loss severity; denominator may be affected/project capacity, not damaged capacity or TIV. |
| Hail share of kWh Analytics loss database financial losses | KWH_SRA_2025_PDF | 73 % of total financial losses |  |  |  | No underlying loss ledger or TIV denominator open. |
| Hail share of kWh Analytics loss incidents | KWH_SRA_2025_PDF | 6 % of loss incidents |  |  |  | Should be paired with 73% loss-share number. |
| SRA 2026 pass/fail threshold for modeled 100-MW SAT configurations | KWH_SRA_2026_OPEN_PAGE | 1-in-100 hail loss >10% asset value = fail % asset value at return period | $112,000 | 10.00% | 12.76% | Not an actual loss; it is the threshold used to mark fail. |
| Standard design high-hail-risk 100-MW project net loss AAL | KWH_POWERMAG_RESILIENCY_CASE_2025 | $1,062,720/year for 100 MW net loss AAL dollars/year | $10,627 | 0.95% | 1.21% | Net loss includes deductible obligations; modeled case, not observed claims ledger. |
| Resilient design high-hail-risk 100-MW project net loss AAL | KWH_POWERMAG_RESILIENCY_CASE_2025 | $307,790/year for 100 MW net loss AAL dollars/year | $3,078 | 0.27% | 0.35% | Net loss includes deductible obligations; modeled case, not observed claims ledger. |
| AAL reduction from resilient design in kWh/POWER case | KWH_POWERMAG_RESILIENCY_CASE_2025 | 71 % reduction |  |  |  | Depends on specific high-hail-risk site and model assumptions. |
| GCube hail share of incurred costs of solar losses | GCUBE_HAIL_NO_2023_PUBLIC_SUMMARIES | 54 % incurred costs |  |  |  | Not a direct AAL/PML number. |
| GCube hail share of number of claims filed | GCUBE_HAIL_NO_2023_PUBLIC_SUMMARIES | 1.4 % of claims filed |  |  |  | Use with 54% incurred-cost share. |
| GCube $58.4M average claim if denominator were 100 MW | GCUBE_HAIL_NO_2023_PUBLIC_SUMMARIES | $584,000/MW sensitivity dollars/MW | $584,000 | 52.14% | 66.53% | Illustrative only; actual claim capacity unknown. |
| GCube $58.4M average claim if denominator were 200 MW | GCUBE_HAIL_NO_2023_PUBLIC_SUMMARIES | $292,000/MW sensitivity dollars/MW | $292,000 | 26.07% | 33.26% | Illustrative only; actual claim capacity unknown. |
| GCube $58.4M average claim if denominator were 350 MW | GCUBE_HAIL_NO_2023_PUBLIC_SUMMARIES | $166,857/MW sensitivity dollars/MW | $166,857 | 14.90% | 19.01% | Illustrative only; actual claim capacity unknown. |

### 2.1 Event / claim-severity anchors as `% installed TIV`

Using the project default installed value of `$1,120,000/MW`:

```text
AXIS successful stow            | ████████████                                        13.4%
GCube avg claim if 350 MW       | ██████████████                                      14.9%
AXIS fixed tilt                 | ████████████████████████████                        30.4%
AXIS failed tracker stow        | ███████████████████████████████                     33.9%
GCube avg claim if 200 MW       | ████████████████████████                            26.1%
GCube avg claim if 100 MW       | ███████████████████████████████████████████████     52.1%
```

This is an **anchor plot**, not a distribution. The GCube rows are sensitivity conversions only because the public average claim number does not include the capacity denominator.

### 2.2 Modeled annual AAL anchors as `% installed TIV / year`

```text
kWh/POWER standard 100 MW AAL        | ████████████████████████████████████████           0.949%/yr
kWh/POWER resilient 100 MW AAL       | ███████████                                        0.275%/yr
```

The kWh/POWER AAL rows are net-loss modeled case-study outputs, not observed ground-up losses.

---

## 3. Source coverage matrix — what each pathway has and does not have

| Source / pathway | Status | Has | Does not have | Best use |
| --- | --- | --- | --- | --- |
| KWH_SRA_2026_OPEN_PAGE | HAS_GATED_NUMBERS | Yes: 100 MW reference project, 1-in-100 hail loss, 10% asset-value fail threshold, 13% of U.S. headline. | Full geographic result table, by-state/county bands, all module/stow configuration results, underlying modeled AAL/PML values. | Open page exposes the solar-hail article title and the modeled pass/fail definition; full report values should be requested/downloaded. |
| KWH_SRA_2025_PDF | HAS_OPEN_NUMBERS | 73% of total financial losses by damage amount; 6% of loss incidents; 19% of hail-related losses in North Carolina; 23% sites with at least one partial loss in kWh database; 29% of loss sites with multiple events. | Project-level loss ledger; denominator/TIV for each record; AAL/PML by location. | Open portfolio-loss pattern: hail dominates financial losses despite low incident count; useful for shape and peril-share sanity. |
| KWH_POWERMAG_RESILIENCY_CASE_2025 | HAS_OPEN_NUMBERS | 100-MW project; standard design net loss AAL $1,062,720; resilient design net loss AAL $307,790; 71% AAL reduction; standard cost $100M, resilient $115M; deductible noted as 5% of property damage value at risk with min/max terms. | Exact site, detailed stochastic distribution, gross vs net bridge, full model assumptions. | Open modeled AAL for standard vs resilient 100-MW solar project in high hail-risk region. |
| KWH_NEXTPOWER_TELEMATICS_2026 | HAS_PATHWAY_ONLY | Open statement that resilient configurations materially reduce portfolio AAL and premiums; 2024 case reference that 75° stow reduces damage probability 87% vs 60°; kWh database size 300,000+ zero-carbon projects and $150B loss data. | Project-level stow compliance logs, loss runs, premium deltas by asset, AAL tables. | Pathway to real stow-performance data and insurer-modeled AAL/premium deltas for advanced stow assets. |
| AXIS_SOLAR_VS_HAIL_2025 | HAS_OPEN_NUMBERS | Hail = 55% of total gross NatCat/extreme-weather solar PV claim amount in U.S./Canada; global hail second most costly after strong wind; average claim severity $150k/MW successful stow, $340k/MW fixed tilt, $380k/MW failed tracker stow; heat-strengthened glass +$50k/MW vs fully tempered; NatCat/weather downtime 240 days average. | Full claim distribution; project TIV; location-level claim table; deductible/coverage terms. | Best open claim-severity source found for solar hail; directly gives $/MW severity by stow/fixed-tilt/module-glass state. |
| AXIS_GALLAGHER_RE_RISK_INSURANCE_2026 | HAS_OPEN_NUMBERS | Closed solar PV claims 2019–2025: hail 27% of NatCat/extreme-weather losses globally by total claim amount, >1M modules damaged, $342M accumulated gross claims; Texas gross claim amount order-of-magnitude greater than Nebraska; heat-strengthened glass +$50k/MW. | Full loss run; per-project TIV; event-level capacity affected; denominators needed to avoid over-normalization. | Adds global closed-claim context: module count, capacity, gross claims and geographic rank. |
| GCUBE_HAIL_NO_2023_PUBLIC_SUMMARIES | HAS_OPEN_NUMBERS | Hail = about 54% of incurred costs of total solar losses while only 1.4% of claims; average hail claim about $58.4M; GCube insures >100 GW renewables in 40 countries. | Capacity denominator per claim; TIV; project geography; full Hail No report details may require subscription/contact. | Open public summaries provide claim-count vs incurred-cost asymmetry and average claim size. |
| VDE_HAIL_RISK_INTELLIGENCE | HAS_GATED_NUMBERS | Product description exposes exact requested metrics: PML, AAL, downside PML, BI, return-interval curves, fixed-return-period hail size, multiple tracker tilts, sample outcome distributions, P50/P90/P95 cumulative losses, 1MW/100MW atlas scaling, portfolio PML/AAL and correlated PRE. | Actual project/county AAL and PML values unless report/subscription is acquired. | Best gated path to comparison-ready AAL/PML and return-period hail loss numbers for solar PV. |
| VDE_CIRRUS_NATCAT_REPORTS | HAS_GATED_NUMBERS | Open pages confirm site- and technology-specific financial loss/risk estimates based on lat/long and PV module/tracker technologies. | Actual report values; requires transaction/client report or commercial access. | Pathway for project-specific, technology-specific hail PML/AAL and broader NatCat comparison context. |
| VDE_2025_STOW_SUCCESS_CASES | HAS_OPEN_NUMBERS | Radar-estimated hail 40–50mm, 50–75mm, 75–100mm; all projects had 2.0mm/2.0mm dual glass; 52° stow; two no-damage outcomes and one minor-damage outcome tied to unstowed rows / motor issue. | Dollar loss; TIV; AAL/PML. | Open stow-performance case evidence: hail sizes, stow angles, damage/no-damage outcomes. |
| RENEW_RISK_SCS_SOLAR_MODEL_2026 | HAS_GATED_NUMBERS | Open summaries describe model scope, hail/tornado/wind coverage, glass thickness, stow angle, mechanical reliability, exposure database updated monthly with TIV and BI costs. | Actual loss tables, event sets, AAL/PML or county bands. | Gated/partner path to cat-model solar SCS loss outputs including hail, tornado, and wind. |
| JS_HELD_HAIL_DAMAGE_SOLAR_2024 | HAS_OPEN_NUMBERS | Midway Solar loss cited around $70–80M; annual hail claims $5M–$80M; 2022 renewable hail damages $300–400M; Pecos County hail-report undercount example. | Clean project capacity/TIV for each claim; formal loss-run distribution; coverage terms. | Useful named-event/event-range and forensic pathway, including report-bias warnings. |
| DOE_FEMP_HAIL_MITIGATION_PV | NO_DIRECT_RENEWABLE_NUMBERS_FOUND | Very large hail >1.75 in / 44mm can cause significant module damage; severe hail described as greatest contributor to insured losses on solar PV systems worldwide. | AAL, PML, claims, $/MW, %TIV. | Mechanism and threshold context for PV hail damage; not a financial benchmark. |
| USPVDB_V4_0_2026 | HAS_OPEN_NUMBERS | v4.0/April 2026; 6,611 facilities; 49 states plus DC; latest operation Q4 2025; front-of-meter PV facilities with direct-current capacity >=1 MW; array boundaries/locations and attributes. | Losses, claims, insured values, resilience configuration for every asset. | Exposure denominator for CONUS/state/county solar-hail aggregation and asset-location joins. |
| EIA_860_2025_EARLY_RELEASE | HAS_OPEN_NUMBERS | Form EIA-860 collects generator-level data for existing/planned generators at plants with >=1 MW combined nameplate capacity; 2025 early release posted June 9, 2026. | Insurance claims, AAL/PML, damage losses. | Generator-level metadata and capacity/status crosswalk; useful with USPVDB for exposure reconciliation. |

---

## 4. The source pathways in detail

### 4.1 AXIS — best open `$ / MW` claim-severity pathway

**Source ID:** `AXIS_SOLAR_VS_HAIL_2025`  
**Status:** `HAS_OPEN_NUMBERS`  
**Use:** `PRIMARY_BENCHMARK_CANDIDATE`

AXIS is the strongest open source for event-severity anchors because it publishes solar PV hail claim severity directly in `$ / MW` by mitigation/configuration state:

| State | Reported average claim severity | Normalized using project default installed TIV | Normalized using project default physical value |
|---|---:|---:|---:|
| Successful stow | `$150,000 / MW` | `13.39%` | `17.09%` |
| Fixed tilt | `$340,000 / MW` | `30.36%` | `38.73%` |
| Tracker failed to stow | `$380,000 / MW` | `33.93%` | `43.29%` |
| Heat-strengthened glass delta vs fully tempered | `+$50,000 / MW` | `4.46%` | `5.70%` |

What this gives us:

```text
- event-severity bands for cap checking;
- stow-state severity separation;
- module-glass material knob;
- qualitative support that low-frequency hail can dominate loss dollars;
- BI/downtime pathway: NatCat/extreme-weather claims average 240 days of downtime.
```

What it does **not** give us:

```text
- full claim distribution;
- location-specific loss table;
- project TIV and capacity for every claim;
- deductible / sublimit / coverage terms;
- AAL or PML by geography.
```

Data request to AXIS / broker / partner:

```text
For solar PV hail claims 2019-present, request anonymized rows with:
  claim_id, date, state/county, project MWdc/MWac, installed TIV, insured value,
  physical damage gross, BI gross, deductible, net paid/reserved,
  module glass, module format, mounting/tracker, stow command, stow success,
  hail size estimate, wind-at-hail estimate, damage fraction, downtime.
```

---

### 4.2 kWh Analytics — strongest recurring solar-risk-assessment pathway

**Source IDs:** `KWH_SRA_2026_OPEN_PAGE`, `KWH_SRA_2025_PDF`, `KWH_POWERMAG_RESILIENCY_CASE_2025`, `KWH_NEXTPOWER_TELEMATICS_2026`  
**Status:** mix of `HAS_OPEN_NUMBERS`, `HAS_GATED_NUMBERS`, and `HAS_PATHWAY_ONLY`  
**Use:** `PRIMARY_BENCHMARK_CANDIDATE`

kWh is the most important recurring publication ecosystem for renewable-energy insurance risk. For solar hail, it gives four distinct pathways:

#### A. 2026 Solar Risk Assessment — pass/fail threshold pathway

The 2026 public page identifies a solar-hail article evaluating module-and-stow configurations for a 100 MW single-axis tracker across U.S. locations. The public page exposes the key threshold:

```text
fail if 1-in-100 hail loss > 10% of asset value
```

This is not an AAL number, but it is a useful PML-style reference threshold because it gives a source-backed loss ratio and return-period frame.

Derived thresholds:

| Value basis | 10% asset value equivalent |
|---|---:|
| $1.0M/MW generic project cost | `$100,000 / MW` |
| Project default installed value $1.12M/MW | `$112,000 / MW` |
| Project default physical value $0.8778M/MW | `$87,780 / MW` |

Open gap:

```text
The full report / result tables are gated behind the kWh download form. Request or download the report to extract:
  - by-configuration pass/fail map;
  - hail-hardened module-only result;
  - robust stow-only result;
  - combined module+stow result;
  - geography where each design clears/fails the 10% threshold.
```

#### B. 2025 Solar Risk Assessment — peril-share and shape pathway

Open numbers:

```text
hail = 73% of total financial losses by damage amount
hail = 6% of loss incidents
19% of hail-related losses occurred in North Carolina
23% of sites in the kWh database have experienced at least one partial loss
among loss sites, 29% experienced multiple events
```

This is important because it tells us the expected shape:

```text
hail should not be frequent in incident count,
but when it happens it can dominate total financial loss.
```

This supports the source registry, but it is not enough to produce a county/state AAL benchmark without the underlying loss ledger.

#### C. kWh/POWER high-hail-risk 100 MW AAL case

Open modeled AAL numbers:

| Scenario | Reported AAL | $/MW-year | % project default installed TIV / year | Source denominator note |
|---|---:|---:|---:|---|
| Standard design: 2mm untempered, no hail stow | `$1,062,720 / year` | `$10,627 / MW-year` | `0.949% / year` | source uses $100M standard project cost, so source-basis AAL is 1.063% |
| Resilient design: 3.2mm tempered, 52° stow | `$307,790 / year` | `$3,078 / MW-year` | `0.275% / year` | source uses $115M resilient project cost, so source-basis AAL is 0.268% |

This is one of the cleanest open AAL anchors, but it is still a modeled case study with deductible obligations included.

#### D. kWh/Nextpower telematics pilot — pathway to observed mitigation state

Open pathway:

```text
- real-time and historical hail stow performance data;
- 70+ degree tracker stowing;
- automated stow procedures;
- resilient configurations reducing portfolio AAL and premiums;
- potential premium differentiation as data quality improves.
```

This is valuable because stow success is usually one of the hardest hidden variables. The data-sharing program is a path to replace assumed stow state with observed stow behavior.

---

### 4.3 GCube / Tokio Marine HCC — claim-share and average-claim severity pathway

**Source ID:** `GCUBE_HAIL_NO_2023_PUBLIC_SUMMARIES`  
**Status:** `HAS_OPEN_NUMBERS`, with likely gated detail behind the full report / insurer access.  
**Use:** `PRIMARY_BENCHMARK_CANDIDATE`, but only after denominator recovery.

Open numbers from public summaries:

```text
hail = about 54% of incurred cost of solar losses
hail = about 1.4% of filed claims
average hail claim ≈ $58.4M per claim
GCube insures >100 GW renewables in 40 countries
```

Why this matters:

```text
This independently repeats the kWh/AXIS pattern: hail is a low-count, high-dollar peril for solar.
```

Why the average claim needs care:

```text
$58.4M / claim is not directly comparable until we know project capacity, TIV, claim basis, and coverage terms.
```

Illustrative capacity sensitivities only:

| If the affected project capacity were... | $58.4M claim becomes | % default installed TIV | % default physical value |
|---:|---:|---:|---:|
| 100 MW | `$584,000 / MW` | `52.14%` | `66.53%` |
| 200 MW | `$292,000 / MW` | `26.07%` | `33.26%` |
| 350 MW | `$166,857 / MW` | `14.90%` | `19.01%` |

Data request:

```text
For each hail claim in the Hail No dataset, request:
  project capacity, TIV, insured value, event date, location, gross PD, BI, net loss,
  mounting type, module glass, stow state, deductible, sublimit, and event hail proxy.
```

---

### 4.4 VDE / Cirrus / GRC — best gated PML/AAL path

**Source IDs:** `VDE_HAIL_RISK_INTELLIGENCE`, `VDE_CIRRUS_NATCAT_REPORTS`  
**Status:** `HAS_GATED_NUMBERS`  
**Use:** `PRIMARY_BENCHMARK_CANDIDATE`

This is the most comparison-ready pathway because the products explicitly advertise the metrics we eventually need:

```text
PML
AAL
downside PML
BI loss estimates
return interval curves of naturally occurring hail
fixed-return-period hail size, e.g. 500-year
annual and diurnal hail frequency
multiple tracker tilt angles
P50/P90/P95 cumulative total hail losses over hold period
sample outcome distributions
medians, standard deviations, confidence intervals
CONUS Hail Risk Atlas maps for 1 MWdc and 100 MWdc scalable projects
portfolio-level PML/AAL and correlated PRE within 200 km
```

Open/gated distinction:

```text
Open: product capability, metric list, geography, technology-specific design.
Gated: actual AAL/PML values and map bands.
```

Recommended acquisition request:

```text
Ask VDE/Cirrus/GRC for a benchmark export in non-client-confidential form:
  - 1 MWdc reference project AAL/PML grid bands for CONUS;
  - 100 MWdc reference project bands by tilt/module construction;
  - PML return periods at 100/250/500 years;
  - AAL by module-glass and stow angle;
  - assumptions for TIV, deductible, BI inclusion/exclusion.
```

---

### 4.5 Renew Risk / solar SCS cat model — gated catastrophe-model path

**Source ID:** `RENEW_RISK_SCS_SOLAR_MODEL_2026`  
**Status:** `HAS_GATED_NUMBERS` / `HAS_PATHWAY_ONLY`  
**Use:** `PRIMARY_BENCHMARK_CANDIDATE` if access is available.

Open summaries describe a utility-scale solar severe-convective-storm model that includes hail, tornado, and wind; accounts for glass thickness, tracker stow angle, mechanical reliability; and uses exposure data with TIV and BI costs.

For this solar-hail deep dive, this is less immediately useful than AXIS/kWh/VDE because open financial values were not found. But it is potentially very valuable as a commercial-cat-model benchmark if a demo, sample portfolio, or API access becomes available.

Data request:

```text
Ask for an anonymized or synthetic portfolio export with:
  annual event set, hail-only loss, tornado-only loss, wind-only loss,
  ground-up PD, BI, insured/net loss, AAL, OEP, AEP, PML, and TIV basis.
```

---

### 4.6 J.S. Held / forensic-adjuster path — named event and claim-range context

**Source ID:** `JS_HELD_HAIL_DAMAGE_SOLAR_2024`  
**Status:** `HAS_OPEN_NUMBERS`  
**Use:** `CASE_STUDY_ONLY`, `SECONDARY_BENCHMARK`

Open numbers:

```text
Midway Solar loss cited around $70M-$80M
annual hail claims cited around $5M-$80M
a 2022 renewable-industry hail-damage year cited around $300M-$400M
```

Open warning that is especially important:

```text
public hail reports can undercount actual hail occurrence at solar sites, especially in open areas.
```

Use this source to flag named-event loss ranges, forensic inspection needs, and hail-reporting bias. Do not turn the numbers into AAL without exposure and event-frequency context.

---

### 4.7 DOE/FEMP — mechanism, not benchmark

**Source ID:** `DOE_FEMP_HAIL_MITIGATION_PV`  
**Status:** `NO_DIRECT_RENEWABLE_NUMBERS_FOUND` for financial reference numbers.  
**Use:** `MECHANISM_ONLY`

DOE/FEMP is useful because it gives an official engineering anchor:

```text
very large hail > 1.75 in / 44 mm can cause significant PV module damage
severe hail is described as the greatest contributor to insured losses on solar PV systems worldwide
hail risk should be evaluated before design and during O&M planning
module selection and stow practices are key mitigation paths
```

It does not provide `$ / MW`, `% TIV`, AAL, PML, or claim distributions.

---

### 4.8 USPVDB + EIA-860 — denominator path

**Source IDs:** `USPVDB_V4_0_2026`, `EIA_860_2025_EARLY_RELEASE`  
**Status:** `HAS_OPEN_NUMBERS`  
**Use:** `DENOMINATOR_ONLY`

These are not loss benchmarks, but they are required to make future reference numbers comparable.

Use them to construct:

```text
asset_id
lat/lon and polygon
county/state
MWdc / MWac
COD / vintage
panel type / site type where available
owner/operator and generator metadata
exposure denominator for $/MW and %TIV aggregation
```

Without this denominator spine, state/county aggregate loss comparisons will be unstable.

---

## 5. Data request templates

### 5.1 Claims-source request

```text
Please provide an anonymized solar PV hail loss extract with one row per claim/event:

Required:
  event_date
  state/county or rounded lat/lon
  project_capacity_MWdc and/or MWac
  installed_TIV
  insured_value
  physical_damage_gross
  business_interruption_gross
  net_paid_or_reserved
  deductible and sublimit structure
  module glass construction
  module format
  mounting / tracker type
  hail stow command issued? yes/no
  stow achieved? yes/no/partial
  maximum stow angle achieved
  hail size proxy/source
  wind-at-hail proxy/source
  downtime_days

Useful optional:
  affected acreage
  damaged module count
  modules replaced
  damage fraction
  forensic report category
  repair duration
  replacement lead time
```

### 5.2 Engineered PML/AAL source request

```text
Please provide a solar-hail benchmark export for reference designs:

Reference designs:
  1 MWdc, 100 MWdc
  fixed tilt and single-axis tracker
  2.0/2.0 glass, 3.2mm tempered, hail-hardened modules
  stow angles: 0, 45, 52, 60, 70, 75 degrees

Metrics:
  AAL
  PML at 100/250/500 years
  OEP/AEP if available
  BI included/excluded flag
  deductible/retention assumptions
  TIV basis
  return-period hail size
  confidence interval or model uncertainty band

Geography:
  CONUS grid or county bands
  state summaries
  named sample sites
```

### 5.3 Telematics / stow-performance request

```text
Please provide project-level hail stow performance history:

For each hail alert / hail event:
  event_date_time
  alert source and lead time
  commanded stow angle
  achieved stow angle by tracker block
  % rows at target stow before hail arrival
  tracker motor or communication failures
  hail size proxy
  wind speed and direction during hail
  damage observed
  claim amount if any
```

---

## 6. Current retrieval priority for solar × hail

| Priority | Source/pathway | Why |
|---|---|---|
| P0 | AXIS source report / broker-access detail | converts open `$ / MW` averages into distributions and denominators |
| P0 | kWh 2026 full SRA download | likely contains configuration/geography results behind the public 10% / 1-in-100 threshold |
| P0 | VDE Hail Risk Atlas / sample PML-AAL export | best path to comparison-ready AAL/PML by geography and design |
| P1 | GCube Hail No full report or insurer summary | validates low-count/high-cost pattern and average claim severity with better denominator |
| P1 | Renew Risk sample portfolio / demo output | independent SCS solar cat-model benchmark |
| P1 | J.S. Held event files / adjuster summaries | severe-event loss and forensic cap checks |
| P2 | USPVDB + EIA asset denominator build | required for aggregation and normalization but not a loss source |

---

## 7. Files in this pair folder

```text
README.md                         <-- this dossier
benchmark_number_matrix.csv       <-- normalized benchmark rows
source_matrix.csv                 <-- source × metric coverage matrix
source_registry.json              <-- machine-readable source-pathway records
```

The package-level copies live under `../../data/`.
