# InfraSure Gen 1 hazard × asset pair-selection decision

**Version:** v0.9
**Decision date:** 2026-08-06
**Study type:** external market/loss-evidence scope decision — **not** calibration, a damage-function change, or an EAL rule.
**Asset scope:** utility-scale solar PV and onshore wind farms.

## Decision

| Verdict | Count | Pairs |
|---|---:|---|
| **IN_GEN1** | 7 | hail × solar; wildfire × solar; flood × solar; convective wind × onshore wind; hurricane/TC × onshore wind; convective wind × solar; hurricane/TC × solar |
| **DEGRADATION_CANDIDATE** | 1 | hail × onshore wind |
| **INSUFFICIENT_EVIDENCE** | 2 | wildfire × onshore wind; flood × onshore wind |
| **OUT_GEN1** | 0 | — |

**Critical metric statement.** No fetched source published an **exact-pair EAL/AAL expressed as % installed TIV per year**. The financial magnitudes below are claim shares, event/claim severity, repair estimates, insured payments, damage counts, coverage terms, or relative modelled-AAL changes; none should be relabelled as an EAL.

## Methodology and verdict rules

Evidence was admitted only where the supplied research record identified a fetched insurer/reinsurer, broker, cat-model, regulatory, government-forensic, or peer-reviewed source. A surfaced page whose body was not fetched in-session is omitted from the decision evidence and does not support a verdict.

**Evidence-field convention.** In each `evidence_found` bullet, the bold name is the **source**, the inline citation supplies the **url**, “source year” is the **publication year**, “underlying data” is the **year/data vintage**, and the reported/ranked statement is **what it states**.

* **IN_GEN1** requires either two independent credible exact-pair catastrophic-loss sources, including a financial/market source, or one unusually strong quantified insurer/reinsurer dataset; the pair must also receive demonstrable pricing, underwriting, claims, reserving, or cat-model attention.
* **DEGRADATION_CANDIDATE** applies when the best exact-pair evidence is gradual/cumulative degradation rather than sudden catastrophic replacement loss.
* **INSUFFICIENT_EVIDENCE** means the mechanism and/or market recognition is plausible, but published exact-pair financial evidence is absent, mixed with another asset/peril, or too ambiguous. It is not an assertion of immateriality.
* **OUT_GEN1** requires affirmative evidence that catastrophic physical loss is immaterial or belongs in another cell. No pair met that high bar.

## Ranked decision table

| Rank | Pair | Verdict | Materiality basis | Best external financial magnitude | Confidence | Recommended action |
|---:|---|---|---|---|---|---|
| 1 | hail × utility-scale solar PV | IN_GEN1 | Dominant: 72.5% of kWh loss dollars and 55% of AXIS US/Canada nat-cat gross claim amount. | AXIS average gross claim severity: $150k/$340k/$380k per MWac for successful stow/fixed tilt/failed stow. | High | Keep as Gen 1 anchor. |
| 2 | convective wind × utility-scale solar PV | IN_GEN1 | Secondary: 3.6% of kWh loss dollars for SCS-wind + tornado. | A $10m parametric example on a $50m limit at 20% damaged area; $20m–$50m sublimit/capacity context. | Medium-high | Build only after explicit separation from named storm. |
| 3 | hurricane/TC × utility-scale solar PV | IN_GEN1 | Secondary: 4.24% of kWh loss dollars. | FEMA observed <5%–75% panels damaged/removed by site; $40m Puerto Rico repair estimate. | Medium-high | Build jointly with convective solar; stratify design generation. |
| 4 | hurricane/TC × onshore wind farm | IN_GEN1 | No portfolio share; catastrophic site severity is documented. | $25m estimated repair on a 26 MW Puerto Rico wind farm; 13/13 turbines damaged. | Medium | New cell; keep offshore results quarantined. |
| 5 | convective wind × onshore wind farm | IN_GEN1 | Material qualitative evidence: named losses and a large damaged fleet. | $50m estimated insured payment in Iowa; Courtenay had 35/100 turbines severely damaged and 53 under assessment. | Medium-high | Separate tornado corridor and straight-line wind regimes; re-examine conditional severity. |
| 6 | wildfire × utility-scale solar PV | IN_GEN1 | Secondary but contaminated: fire is 4.81% of kWh loss dollars, while most fire events are equipment-driven. | Mainly-solar wildfire clusters exceeded $10m in 2020 and reached up to $100m in a 2023 wildfire-and-wind blend. | Medium | Build only with landscape-wildfire and equipment-brushfire partitioning. |
| 7 | flood × utility-scale solar PV | IN_GEN1 | Secondary in US operations: 0.197% of kWh loss dollars; construction exposure is larger. | Flood AAL changed +230% for one solar site after exposure disaggregation; no absolute AAL was published. | Medium | Require subsystem-level exposure representation. |
| 8 | flood × onshore wind farm | INSUFFICIENT_EVIDENCE | Unknown; sources conflict on frequency and give no exact-pair severity. | No exact-pair financial range; 46% construction-cost share is wind+solar mixed and unusable for wind alone. | Low-medium | Defer to Gen 1.5 pending one quantified exact-pair source. |
| 9 | hail × onshore wind farm | DEGRADATION_CANDIDATE | Not a cat-loss finding; material for blade-coating life, AEP, and O&M. | >$200k per blade replacement; 1–4% average AEP loss, up to 25% in extremes. | Medium-high | Route to degradation/O&M, never a Gen 1 catastrophe cell. |
| 10 | wildfire × onshore wind farm | INSUFFICIENT_EVIDENCE | Weak qualitative indication of low materiality, not an affirmative exclusion case. | No exact-pair monetary amount, claims share, damage ratio, or EAL. | Low | Do not build; retain an evidence-absence log. |

## Pair cards

### 1. Hail × utility-scale solar PV

**pair:** hail × utility-scale solar PV
**verdict:** **IN_GEN1**
**materiality:** **Dominant.** Hail is 72.5% of ground-up solar loss dollars in the kWh database presented by FM, 55% of AXIS US/Canada nat-cat/extreme-weather solar gross claim amount, and 27% globally. [FM/ARRAY webinar deck](https://www.pv-magazine.com/wp-content/uploads/2025/07/All-presentations-2.pdf) [AXIS claims analysis](https://axiscapital.foleon.com/thought-leadership/solarvshail/what-the-claims-data-is-telling-us)

**evidence_found**
* **kWh Analytics / FM deck** — source year **2025**; underlying data **2012–2025, 13k+ asset-years, $100bn TIV-years, 92 GWdc, all 50 states**; reports hail as **72.5% of damage amount** and $1.5bn total ground-up losses. [FM/ARRAY webinar deck](https://www.pv-magazine.com/wp-content/uploads/2025/07/All-presentations-2.pdf)
* **AXIS Capital** — source year **2025**; underlying data **2019–2025 closed or open-and-closed claims**; reports $150k/MWac successful-stow, $340k/MWac fixed-tilt, and $380k/MWac failed-stow average gross claims. [AXIS claims analysis](https://axiscapital.foleon.com/thought-leadership/solarvshail/what-the-claims-data-is-telling-us)
* **kWh Solar Risk Assessment** — source year **2026**; underlying model vintage **not disclosed**; treats a 1-in-100 hail loss above 10% of asset value as a failed configuration. [kWh SRA 2026](https://kwhanalytics.com/industry-reports/2026-solar-risk-assessment/)

**financial_range:** $150k–$380k/MWac **average gross claim amount**, conditional on stow/design; $29m–$120m insured payments in listed event/cluster examples; and a 1-in-100 >10%-of-asset-value model threshold. These are not EALs.
**metric_identity:** gross claim amount per installed MWac (including PD, BI, and DSU before deductibles/excesses/waiting periods); loss-dollar share; event insured payment; and return-period loss threshold.
**data_vintage:** kWh 2012–2025; AXIS 2019–2025; FM event list 2016–2024; kWh 2026 model vintage undisclosed.
**loss_pathway:** physical module damage first; tracker/racking failure and BI are secondary.
**confidence:** **High.**
**reasoning:** Multiple independent insurer/reinsurer datasets quantify the exact pair, with claim shares, severity by controllable stow state, and return-period underwriting attention. [AXIS claims analysis](https://axiscapital.foleon.com/thought-leadership/solarvshail/what-the-claims-data-is-telling-us) [FM/ARRAY webinar deck](https://www.pv-magazine.com/wp-content/uploads/2025/07/All-presentations-2.pdf) It is the most decision-ready Gen 1 pair and should remain the validation anchor.
**contradicting:** Loss shares range from 27% globally to 72.5% in the US-focused kWh population because geography, period, and denominator differ. [AXIS claims analysis](https://axiscapital.foleon.com/thought-leadership/solarvshail/what-the-claims-data-is-telling-us) [FM/ARRAY webinar deck](https://www.pv-magazine.com/wp-content/uploads/2025/07/All-presentations-2.pdf)

### 2. Wildfire × utility-scale solar PV

**pair:** wildfire × utility-scale solar PV
**verdict:** **IN_GEN1**
**materiality:** **Secondary, but materially contaminated by ignition type.** Fire is 4.81% of kWh solar loss dollars, while AXIS calls wildfire second to hail in its US/Canada nat-cat claim amount; the kWh fire bucket combines landscape wildfire and equipment-origin brushfire. [FM/ARRAY webinar deck](https://www.pv-magazine.com/wp-content/uploads/2025/07/All-presentations-2.pdf) [AXIS claims analysis](https://axiscapital.foleon.com/thought-leadership/solarvshail/what-the-claims-data-is-telling-us)

**evidence_found**
* **AXIS Capital** — source year **2025**; underlying data **2019–2025 closed claims**; ranks wildfire shortly behind hail in US/Canada solar nat-cat gross claim amount. [AXIS claims analysis](https://axiscapital.foleon.com/thought-leadership/solarvshail/what-the-claims-data-is-telling-us)
* **FM large-loss table** — source year **2025**; underlying events **2020 and 2023**; reports mainly-solar wildfire clusters with several multi-million-dollar losses, some above $10m, and a 2023 wildfire-and-wind blend up to $100m. [FM/ARRAY webinar deck](https://www.pv-magazine.com/wp-content/uploads/2025/07/All-presentations-2.pdf)
* **kWh Solar Risk Assessment** — source year **2026**; underlying data window **not disclosed**; reports only 4% of PV fire loss events in high-wildfire-risk areas and 84% equipment-driven brushfires. [kWh SRA 2026](https://kwhanalytics.com/industry-reports/2026-solar-risk-assessment/)

**financial_range:** several multi-million-dollar to >$10m mainly-solar wildfire losses and a blended wildfire/wind cluster up to $100m; 4.81% fire share of loss dollars. No exact-pair EAL or damage-ratio range was published.
**metric_identity:** event insured amount paid, loss-dollar share, and fire-event share by ignition/hazard geography.
**data_vintage:** AXIS 2019–2025; FM events 2020 and 2023; kWh 2012–2025 for portfolio share and undisclosed window for the 2026 fire study.
**loss_pathway:** physical loss supports inclusion; smoke/soiling revenue loss is a separate degradation/BI channel.
**confidence:** **Medium.**
**reasoning:** Market sources identify meaningful solar physical-loss events and specific underwriting treatment, which clears the inclusion rule. [FM/ARRAY webinar deck](https://www.pv-magazine.com/wp-content/uploads/2025/07/All-presentations-2.pdf) [Insurance Journal / GCube](https://www.insurancejournal.com/news/national/2021/07/20/623476.htm) Gen 1 must, however, model **landscape-wildfire encroachment** separately from **equipment-origin brushfire**; a hazard-map-only wildfire cell would misattribute most observed fire events. [kWh SRA 2026](https://kwhanalytics.com/industry-reports/2026-solar-risk-assessment/)
**contradicting:** The 4% high-wildfire-risk / 84% equipment-driven split is strong evidence that the broad “fire” category is not a pure wildfire metric. [kWh SRA 2026](https://kwhanalytics.com/industry-reports/2026-solar-risk-assessment/)

### 3. Flood × utility-scale solar PV

**pair:** flood × utility-scale solar PV
**verdict:** **IN_GEN1**
**materiality:** **Secondary in US operations.** Flood is 0.197% of kWh solar loss dollars, but a solar-specific cat-model case showed flood AAL changing nearly 230% after correct exposure disaggregation. [FM/ARRAY webinar deck](https://www.pv-magazine.com/wp-content/uploads/2025/07/All-presentations-2.pdf) [Moody’s RMS case study](https://www.moodys.com/web/en/us/insights/insurance/applying-specialized-risk-treatment-to-a-solar-farm.html)

**evidence_found**
* **Moody’s (RMS) Analytical Services** — source year **2025**; underlying case vintage **not disclosed**; reports that modelling panels as gridded exposure and switchyard/substations as points increased flood AAL by nearly 230% and informed premium loading. [Moody’s RMS case study](https://www.moodys.com/web/en/us/insights/insurance/applying-specialized-risk-treatment-to-a-solar-farm.html)
* **kWh Analytics / FM deck** — source year **2025**; underlying data **2012–2025**; reports flood as 0.197% of solar loss dollars. [FM/ARRAY webinar deck](https://www.pv-magazine.com/wp-content/uploads/2025/07/All-presentations-2.pdf)
* **FM Data Sheet 7-106** — source year **2026 interim revision**; underlying claims vintage **not disclosed**; requires equipment and access roads 1–2 ft above the 500-year MRI and addresses scour. [FM DS 7-106](https://www.fm.com/-/media/project/publicwebsites/fmglobal/documentum-new/data-sheet-individual/07-hazards/fmds07106.pdf)

**financial_range:** a relative **+230%** flood-AAL change for one 2,700-acre solar plant; 0.197% portfolio loss-dollar share; and adjacent construction evidence only. No absolute AAL, %TIV EAL, or PV flood depth-damage range was published.
**metric_identity:** relative modelled AAL change; portfolio loss-dollar share; and prescriptive siting return period.
**data_vintage:** Moody’s case vintage undisclosed; kWh 2012–2025; FM guidance current April 2026.
**loss_pathway:** physical damage to switchyard, substations, inverters/cabling, foundations, and support frames; BI is not separately quantified.
**confidence:** **Medium.**
**reasoning:** A cat modeller documents direct flood-AAL and premium-loading use for a named solar plant, and FM’s solar-specific 500-year siting guidance confirms underwriting recognition. [Moody’s RMS case study](https://www.moodys.com/web/en/us/insights/insurance/applying-specialized-risk-treatment-to-a-solar-farm.html) [FM DS 7-106](https://www.fm.com/-/media/project/publicwebsites/fmglobal/documentum-new/data-sheet-individual/07-hazards/fmds07106.pdf) The cell is in scope, but it is useful only if the exposure is split beyond a single plant centroid.
**contradicting:** The operational US loss share is tiny, while the most dramatic published construction loss is a Dubai CSP heliostat field rather than utility-scale PV; neither supports transferring construction/CSP severity to the operating PV cell. [FM/ARRAY webinar deck](https://www.pv-magazine.com/wp-content/uploads/2025/07/All-presentations-2.pdf)

### 4. Convective wind × onshore wind farm

**pair:** convective wind × onshore wind farm
**verdict:** **IN_GEN1**
**materiality:** **Material, qualitatively.** A 2024 Iowa tornado item carried a $50m estimated insured payment, and a 2025 EF-5/high-speed-wind event left 35 of 100 turbines severely damaged and totally inoperable, with 53 still under assessment. [FM/ARRAY webinar deck](https://www.pv-magazine.com/wp-content/uploads/2025/07/All-presentations-2.pdf) [North Dakota PSC filing](https://www.psc.nd.gov/webdocs/case/15-0174/139-010.pdf)

**evidence_found**
* **Northern States Power/Xcel filing to the North Dakota PSC** — source year **2026**; underlying event **June 2025, status February 2026**; reports the Courtenay EF-5/high-speed-wind damage, 13 operating turbines, 35 severely damaged/inoperable, 53 under assessment, and insurer claims started. [North Dakota PSC filing](https://www.psc.nd.gov/webdocs/case/15-0174/139-010.pdf)
* **FM large-loss table** — source year **2025**; underlying event **2024**; lists Iowa wind projects, tornado, $50m estimated insured amount paid. [FM/ARRAY webinar deck](https://www.pv-magazine.com/wp-content/uploads/2025/07/All-presentations-2.pdf)
* **FM Data Sheet 13-10** — source year **2025 interim revision**; underlying claims vintage **not disclosed**; describes extreme-wind blade, tower, and tower-foundation failure mechanisms. [FM DS 13-10](https://www.fm.com/-/media/project/publicwebsites/fmglobal/documentum-new/data-sheet-individual/13-mechanical/fmds1310.pdf)

**financial_range:** $50m event insured amount paid; no comparable EAL, portfolio share, or turbine-%TIV severity range was published. **35/100 damaged turbines is event breadth/asset-count damage, not 35% TIV.**
**metric_identity:** event insured payment; number/fraction of turbines impaired; and design-load guidance.
**data_vintage:** Courtenay June 2025 / status February 2026; Iowa event 2024; FM guidance October 2025.
**loss_pathway:** physical damage to blades, tower/upper-tower, foundation, and occasionally interconnection assets; long BI can follow.
**confidence:** **Medium-high.**
**reasoning:** A regulated utility filing and an insurer loss list independently establish exact-pair catastrophic evidence, including a financial loss. [North Dakota PSC filing](https://www.psc.nd.gov/webdocs/case/15-0174/139-010.pdf) [FM/ARRAY webinar deck](https://www.pv-magazine.com/wp-content/uploads/2025/07/All-presentations-2.pdf) Build tornado-corridor and straight-line/derecho pathways separately because the public record does not supply a reliable blended conditional-severity metric.
**contradicting:** A tornado can cross only part of a farm, and a 2023 Texas tornado reportedly left the turbines themselves unharmed while damaging transmission poles; both facts argue against applying a uniform farm-wide severity. [FM/ARRAY webinar deck](https://www.pv-magazine.com/wp-content/uploads/2025/07/All-presentations-2.pdf)

### 5. Hurricane / tropical cyclone × onshore wind farm

**pair:** hurricane / tropical cyclone × onshore wind farm
**verdict:** **IN_GEN1**
**materiality:** **Unknown portfolio share; catastrophic conditional severity at exposed sites.** Puerto Rico government sources record a 26 MW, 13-turbine farm with severe Maria damage and a $25m repair estimate. [FEMA MAT report](https://www.fema.gov/sites/default/files/2020-07/mat-report_hurricane-irma-maria-puerto-rico_2.pdf) [Puerto Rico recovery report](https://www.governor.ny.gov/sites/default/files/atoms/files/PRERWG_Report_PR_Grid_Resiliency_Report.pdf)

**evidence_found**
* **FEMA Mitigation Assessment Team** — source year **2018/2020**; underlying event **September 2017**; reports ~130 mph winds, broken/shredded blades, and cases where all three blades and the upper tower were severed at Punta de Lima. [FEMA MAT report](https://www.fema.gov/sites/default/files/2020-07/mat-report_hurricane-irma-maria-puerto-rico_2.pdf)
* **Puerto Rico Energy Resiliency Working Group** — source year **2017/2018**; underlying event **September 2017**; reports approximately half the blades lost, vertical-post damage, $25m wind-farm repair estimate, and 9–12 months repair/replacement. [Puerto Rico recovery report](https://www.governor.ny.gov/sites/default/files/atoms/files/PRERWG_Report_PR_Grid_Resiliency_Report.pdf)
* **FM Data Sheet 13-10** — source year **2025 interim revision**; underlying claims vintage **not disclosed**; specifies a 1.15 wind-load importance factor and 12 hours independent yaw power in TC-prone regions. [FM DS 13-10](https://www.fm.com/-/media/project/publicwebsites/fmglobal/documentum-new/data-sheet-individual/13-mechanical/fmds1310.pdf)

**financial_range:** $25m estimated repair for the 26 MW/13-turbine farm; $28m project-value context for a Hurricane Ike wind project; catastrophe cover commonly described as 30–50% of asset value. No exact-pair EAL or onshore wind TC vulnerability range was published.
**metric_identity:** estimated repair cost, component/turbine damage count, project-value context, coverage limit practice, and design requirements.
**data_vintage:** events 2008, 2013, 2015, and 2017; publications 2011–2025.
**loss_pathway:** blades, nacelle covers/electrical components, upper tower and support, with yaw-power availability as a control.
**confidence:** **Medium.**
**reasoning:** Government forensic and recovery sources provide exact-pair physical destruction and repair cost, while FM separately prescribes TC-specific turbine requirements. [FEMA MAT report](https://www.fema.gov/sites/default/files/2020-07/mat-report_hurricane-irma-maria-puerto-rico_2.pdf) [FM DS 13-10](https://www.fm.com/-/media/project/publicwebsites/fmglobal/documentum-new/data-sheet-individual/13-mechanical/fmds1310.pdf) It belongs in Gen 1 despite the lack of an existing internal cell; offshore windstorm ranges must not be borrowed.
**contradicting:** Santa Isabel was seemingly intact in the same Puerto Rico storm, and Hurricane Ike produced mainly non-structural damage despite winds above 140 mph, showing strong design/site heterogeneity. [Puerto Rico recovery report](https://www.governor.ny.gov/sites/default/files/atoms/files/PRERWG_Report_PR_Grid_Resiliency_Report.pdf) [Windpower Engineering / GCube](https://www.windpowerengineering.com/catastrophic-insurance-for-wind-farms-2/)

### 6. Convective wind × utility-scale solar PV

**pair:** convective wind × utility-scale solar PV
**verdict:** **IN_GEN1**
**materiality:** **Secondary.** kWh assigns 3.6% of solar loss dollars to SCS-wind + tornado; AXIS reports a larger 45% strong-wind claim-amount share, but its category blends named storm, SCS, sandstorm, and other wind. [FM/ARRAY webinar deck](https://www.pv-magazine.com/wp-content/uploads/2025/07/All-presentations-2.pdf) [AXIS claims analysis](https://axiscapital.foleon.com/thought-leadership/solarvshail/what-the-claims-data-is-telling-us)

**evidence_found**
* **kWh Analytics / FM deck** — source year **2025**; underlying data **2012–2025**; assigns **3.6%** of loss dollars to SCS-wind + tornado, with hail shown separately. [FM/ARRAY webinar deck](https://www.pv-magazine.com/wp-content/uploads/2025/07/All-presentations-2.pdf)
* **Descartes Underwriting** — source year **2025/2026 page**; underlying product/model vintage **not disclosed**; gives a tornado parametric example: 20% of a $50m-insured farm damaged yields a $10m payout and names panel shattering, microcracking, and cascading rack failure. [Descartes white paper](https://descartesunderwriting.com/white-papers/satellite-powered-protection-parametric-tornado-insurance-us-utility-scale-solar-farms)
* **FM Data Sheet 7-106** — source year **2026 interim revision**; underlying claims vintage **not disclosed**; specifies tracker wind-stow interlock at 25% below the wind-tunnel instability speed. [FM DS 7-106](https://www.fm.com/-/media/project/publicwebsites/fmglobal/documentum-new/data-sheet-individual/07-hazards/fmds07106.pdf)

**financial_range:** 3.6% loss-dollar share for SCS-wind + tornado; $10m parametric worked payout at 20% damaged area on a $50m limit; $20m capacity constraint and up-to-$50m sublimit context. No exact-pair EAL or pure straight-line-wind severity range was published.
**metric_identity:** loss-dollar share, parametric payout function, insurance limits/sublimits, and stow-control threshold.
**data_vintage:** kWh 2012–2025; AXIS 2019–2025; published market examples 2020–2026.
**loss_pathway:** tracker/racking torsional galloping, module attachment/liberation, pile/foundation loading, and cascading rack failure.
**confidence:** **Medium-high.**
**reasoning:** Dedicated sublimits, a purpose-built solar tornado product, quantified loss share, and prescriptive wind-stow controls show the exact pair is distinctly underwritten. [Descartes white paper](https://descartesunderwriting.com/white-papers/satellite-powered-protection-parametric-tornado-insurance-us-utility-scale-solar-farms) [FM DS 7-106](https://www.fm.com/-/media/project/publicwebsites/fmglobal/documentum-new/data-sheet-individual/07-hazards/fmds07106.pdf) Build it only after a source-to-cell mapping explicitly removes hurricane/TC and hail-contaminated losses.
**contradicting:** **Scope contamination warning:** AXIS “strong wind” is not a convective-only metric; it explicitly includes named storm, SCS, sandstorm, and other wind, and many SCS losses are categorized as hail when hail is primary. [AXIS claims analysis](https://axiscapital.foleon.com/thought-leadership/solarvshail/what-the-claims-data-is-telling-us)

### 7. Hurricane / tropical cyclone × utility-scale solar PV

**pair:** hurricane / tropical cyclone × utility-scale solar PV
**verdict:** **IN_GEN1**
**materiality:** **Secondary.** Hurricane represents 4.24% of loss dollars in the kWh solar database, while AXIS does not separate named storm from its broader strong-wind category. [FM/ARRAY webinar deck](https://www.pv-magazine.com/wp-content/uploads/2025/07/All-presentations-2.pdf) [AXIS claims analysis](https://axiscapital.foleon.com/thought-leadership/solarvshail/what-the-claims-data-is-telling-us)

**evidence_found**
* **FEMA Mitigation Assessment Team** — source year **2018/2020**; underlying event **September 2017**; records <5%, 10%, 25%, and 75% panel damage/removal at individual sites exposed to roughly 90–140 mph wind, with progressive attachment/debris failures. [FEMA MAT report](https://www.fema.gov/sites/default/files/2020-07/mat-report_hurricane-irma-maria-puerto-rico_2.pdf)
* **Puerto Rico recovery report** — source year **2017/2018**; underlying event **September 2017**; estimates $40m of solar farm repairs and 9–12 months repair/replacement. [Puerto Rico recovery report](https://www.governor.ny.gov/sites/default/files/atoms/files/PRERWG_Report_PR_Grid_Resiliency_Report.pdf)
* **FM Data Sheet 7-106** — source year **2026 interim revision**; underlying claims vintage **not disclosed**; advises avoiding ground-mounted PV in tropical-storm-prone and large-windborne-debris locations. [FM DS 7-106](https://www.fm.com/-/media/project/publicwebsites/fmglobal/documentum-new/data-sheet-individual/07-hazards/fmds07106.pdf)

**financial_range:** <5%–75% panels damaged/removed by observed site; $40m estimate across Puerto Rico solar repairs; 4.24% loss-dollar share. Damage fractions are panel counts, not dollar/TIV damage ratios, and no EAL was published.
**metric_identity:** panel-count damage fraction, estimated repair cost, loss-dollar share, and prescriptive siting threshold.
**data_vintage:** Hurricane Maria 2017 (2014–2017-vintage arrays); kWh 2012–2025; FM guidance April 2026.
**loss_pathway:** module-to-rail attachment and rail-to-beam failure, uplift, and windborne-debris cascade; BI can be lengthy.
**confidence:** **Medium-high.**
**reasoning:** FEMA gives unusually useful exact-pair damage observations, FM treats tropical-storm solar exposure as a distinct siting concern, and kWh quantifies a separate hurricane loss share. [FEMA MAT report](https://www.fema.gov/sites/default/files/2020-07/mat-report_hurricane-irma-maria-puerto-rico_2.pdf) [FM DS 7-106](https://www.fm.com/-/media/project/publicwebsites/fmglobal/documentum-new/data-sheet-individual/07-hazards/fmds07106.pdf) The build must capture design-generation variation rather than treating the 2017 sites as representative of all current PV.
**contradicting:** FPL reported fewer than 0.05% of almost 16m panels across 66 sites damaged in Helene/Milton, and the visible Lake Placid damage was attributed to an EF2 tornado in Milton’s outer bands rather than hurricane core winds. [The Invading Sea](https://www.theinvadingsea.com/2024/12/17/solar-farms-utilities-hurricane-helene-milton-florida-power-and-light-duke-energy-resilience/)

### 8. Hail × onshore wind farm

**pair:** hail × onshore wind farm
**verdict:** **DEGRADATION_CANDIDATE**
**materiality:** **Immaterial as a demonstrated catastrophe peril; material for blade degradation/O&M.** Hail contributes 28% of 18-year accumulated blade-coating damage nationally and 38% in the south-central region, where 44% of US wind assets are located. [Pryor & Barthelmie, *iScience*](https://pmc.ncbi.nlm.nih.gov/articles/PMC12811466/)

**evidence_found**
* **Pryor & Barthelmie** — source year **2025/2026 collection**; underlying data **2005–2022 meteorology and radar, 883 stations**; reports 21-year mean coating life, >$200k blade replacement, 1–4% average AEP loss, and up to 25% in extremes. [Pryor & Barthelmie, *iScience*](https://pmc.ncbi.nlm.nih.gov/articles/PMC12811466/)
* **FM Data Sheet 13-10** — source year **2025 interim revision**; underlying claims vintage **not disclosed**; describes long-term, difficult-to-detect blade delamination and removed hail-protection recommendations in the October 2025 changes. [FM DS 13-10](https://www.fm.com/-/media/project/publicwebsites/fmglobal/documentum-new/data-sheet-individual/13-mechanical/fmds1310.pdf)

**financial_range:** >$200k per blade replacement plus about seven days lost production; 1–4% average AEP loss, up to 25% extreme; no catastrophic loss, claims-share, or EAL range.
**metric_identity:** accumulated distance-to-failure contribution, coating lifetime, AEP loss, component replacement cost.
**data_vintage:** 2005–2022 meteorology; FM guidance October 2025.
**loss_pathway:** cumulative leading-edge erosion/coating damage, then AEP loss and scheduled maintenance; sensors/instrumentation are secondary.
**confidence:** **Medium-high.**
**reasoning:** The best exact-pair quantitative evidence is explicitly a multi-year degradation mechanism, not a catastrophe loss distribution. [Pryor & Barthelmie, *iScience*](https://pmc.ncbi.nlm.nih.gov/articles/PMC12811466/) It should be handled in a degradation/O&M module and must never inherit solar-hail severity, loss-share, or EAL assumptions.
**contradicting:** FM still calls for hail-resilient blades/sensors and post-hail inspection, so hail is a real trigger event even though the external record does not establish a catastrophe cell. [FM DS 13-10](https://www.fm.com/-/media/project/publicwebsites/fmglobal/documentum-new/data-sheet-individual/13-mechanical/fmds1310.pdf)

### 9. Wildfire × onshore wind farm

**pair:** wildfire × onshore wind farm
**verdict:** **INSUFFICIENT_EVIDENCE**
**materiality:** **Weakly supported qualitative low materiality.** FM says towers are not known to have significant structural wildfire damage, and its listed wildfire losses are “mainly solar,” but neither statement is a quantified wind-loss result. [FM DS 13-10](https://www.fm.com/-/media/project/publicwebsites/fmglobal/documentum-new/data-sheet-individual/13-mechanical/fmds1310.pdf) [FM/ARRAY webinar deck](https://www.pv-magazine.com/wp-content/uploads/2025/07/All-presentations-2.pdf)

**evidence_found**
* **FM Data Sheet 13-10** — source year **2025 interim revision**; underlying claims vintage **not disclosed**; identifies collector substations and FRP blades as vulnerable, not steel/concrete towers, and sets 500 ft woodland and 195 ft-plus brush/grassland clearance. [FM DS 13-10](https://www.fm.com/-/media/project/publicwebsites/fmglobal/documentum-new/data-sheet-individual/13-mechanical/fmds1310.pdf)
* **Swiss Re** — source year **2017**; underlying vintage **not disclosed**; names wildfire in wind-farm nat-cat coverage, without publishing a loss metric. [Swiss Re wind farms report](https://www.swissre.com/dam/jcr:dd24316a-aab5-446a-9758-7d58215e24df/Windfarms+Harvesting+energy+on+shaky+grounds+EN.pdf)
* **BBC named-event report** — source year **2019**; underlying event **April 2019**; reports a >20-square-mile Moray grassland fire where the turbines were not affected and the farm was temporarily depowered as a precaution. [BBC News](https://www.bbc.co.uk/news/uk-scotland-north-east-orkney-shetland-48051279)

**financial_range:** **n.a.** No exact-pair monetary loss, loss share, damage ratio, deductible, PML, or EAL was found.
**metric_identity:** clearance distance and qualitative hazard characterization only.
**data_vintage:** FM October 2025; BBC event April 2019; Swiss Re 2017.
**loss_pathway:** potential thermal damage to collector substations and FRP blades, plus precautionary BI; not tower collapse.
**confidence:** **Low.**
**reasoning:** The mechanism is recognised and underwritten, but no fetched source gives an exact-pair financial magnitude or a material-damage event with a loss amount. [FM DS 13-10](https://www.fm.com/-/media/project/publicwebsites/fmglobal/documentum-new/data-sheet-individual/13-mechanical/fmds1310.pdf) Retain an evidence-absence log rather than fabricate a placeholder EAL.
**contradicting:** The large clearance zones and named wildfire coverage support plausible exposure, whereas the FM tower statement and Moray outcome point in the opposite direction. [FM DS 13-10](https://www.fm.com/-/media/project/publicwebsites/fmglobal/documentum-new/data-sheet-individual/13-mechanical/fmds1310.pdf) [BBC News](https://www.bbc.co.uk/news/uk-scotland-north-east-orkney-shetland-48051279)

### 10. Flood × onshore wind farm

**pair:** flood × onshore wind farm
**verdict:** **INSUFFICIENT_EVIDENCE**
**materiality:** **Unknown.** GCube describes flooding as the most frequent damage cause for wind projects, while FM calls flood not currently a common hazard for most land-based wind farms; neither source publishes exact-pair severity. [Insurance Journal / GCube](https://www.insurancejournal.com/news/national/2021/07/20/623476.htm) [FM DS 13-10](https://www.fm.com/-/media/project/publicwebsites/fmglobal/documentum-new/data-sheet-individual/13-mechanical/fmds1310.pdf)

**evidence_found**
* **Allianz Commercial** — source year **2025**; underlying claim date **not disclosed**; identifies a construction-stage onshore-wind flood/heavy-rain claim damaging access roads, foundations, and earthworks, without a quantum. [Allianz Commercial](https://commercial.allianz.com/news-and-insights/expert-risk-articles/global-risk-dialogue-2025-net-zero-transition-claims.html)
* **GCube / Claims Journal** — source year **2024**; underlying data **2013–2022, $275m onshore CAR/DSU claims**; gives 18% frequency and 46% claim-cost share for flooding/heavy rain across mixed onshore wind-and-solar construction, not wind alone. [Claims Journal / GCube](https://www.claimsjournal.com/news/national/2024/09/19/326185.htm)
* **FM Data Sheet 13-10** — source year **2025 interim revision**; underlying claims vintage **not disclosed**; explains inundation, base-equipment damage, scour, undermining, saturation, and foundation overturning risk while calling flood uncommon for most land-based wind farms. [FM DS 13-10](https://www.fm.com/-/media/project/publicwebsites/fmglobal/documentum-new/data-sheet-individual/13-mechanical/fmds1310.pdf)

**financial_range:** **n.a.** The 46% cost/18% frequency result is construction-only and wind+solar mixed, so it is not an onshore-wind financial range.
**metric_identity:** mixed-asset construction claim share/frequency, qualitative rank and frequency statement, and prescriptive guidance.
**data_vintage:** GCube 2013–2022; Allianz claim date undisclosed; FM October 2025.
**loss_pathway:** foundation scour/undermining and saturation; collector-substation/tower-base equipment inundation; access-road damage amplifies BI.
**confidence:** **Low-medium.**
**reasoning:** The physical mechanism and underwriting attention are clear, but there is no exact-pair monetary loss, damage ratio, portfolio share, EAL, PML, or rate treatment. [Allianz Commercial](https://commercial.allianz.com/news-and-insights/expert-risk-articles/global-risk-dialogue-2025-net-zero-transition-claims.html) [FM DS 13-10](https://www.fm.com/-/media/project/publicwebsites/fmglobal/documentum-new/data-sheet-individual/13-mechanical/fmds1310.pdf) It is the closest deferred pair and should enter Gen 1.5 only after a quantified exact-pair disclosure.
**contradicting:** FM’s “not currently a common hazard” statement conflicts with GCube’s relative-ranking statement that wind projects are most frequently damaged by flooding; the available evidence cannot reconcile absolute prevalence with within-claims ranking. [FM DS 13-10](https://www.fm.com/-/media/project/publicwebsites/fmglobal/documentum-new/data-sheet-individual/13-mechanical/fmds1310.pdf) [Insurance Journal / GCube](https://www.insurancejournal.com/news/national/2021/07/20/623476.htm)

## Metric-family limitations

1. **No like-for-like external EAL comparator exists.** Do not treat loss shares, event payments, claims per MW, panel/turbine counts, repair estimates, deductibles, or a relative AAL change as `%TIV/year`.
2. **Denominators differ.** The same apparent “share of loss” can mean ground-up portfolio dollars, gross claim amount including PD/BI/DSU, incurred-cost share, or claim-count share; it cannot be averaged across sources.
3. **Loss basis differs.** AXIS $/MW figures are gross claims, while FM large-loss entries are insured amounts paid; claims can differ materially from physical damage because deductibles, sublimits, BI, and DSU differ.
4. **Counts are not value ratios.** FEMA panel damage fractions and Courtenay turbine counts demonstrate event breadth and affected equipment, but they do not measure %TIV damage.
5. **Construction and operating assets differ.** Mixed construction CAR/DSU results and the Dubai CSP flood event provide market context only; they must not be moved into operating PV or operating wind metrics.

## Scope-contamination warnings

* **Wind taxonomy:** AXIS “strong wind” blends named storm, SCS, sandstorm, and other wind; use neither its 45% claim-amount share nor any blended severity as a convective-only metric. [AXIS claims analysis](https://axiscapital.foleon.com/thought-leadership/solarvshail/what-the-claims-data-is-telling-us)
* **Solar fire taxonomy:** a “Fire” loss share blends **landscape wildfire** with **equipment-driven brushfire**. Gen 1 wildfire requires an ignition-source field and must not use equipment-fire losses as wildfire-hazard calibration evidence. [kWh SRA 2026](https://kwhanalytics.com/industry-reports/2026-solar-risk-assessment/)
* **Storm attribution:** do not classify a tornado in a hurricane’s outer bands as hurricane core-wind damage; that error exists in publicly reported solar loss discussion. [The Invading Sea](https://www.theinvadingsea.com/2024/12/17/solar-farms-utilities-hurricane-helene-milton-florida-power-and-light-duke-energy-resilience/)
* **Wind hail:** do not transfer solar-hail shares or $/MW severity to turbine blade erosion. The exact-pair evidence family is degradation/O&M, not catastrophe insurance.
* **Offshore quarantine:** offshore wind hurricane/PML literature is not evidence for onshore turbine TC severity.

## Recommended build order

1. **Hail × solar:** validate/retain as the anchor cell; preserve stow-conditioned severity.
2. **Convective wind × solar:** first produce a source-category-to-cell mapping that excludes named storm and hail-primary claims.
3. **Hurricane/TC × solar:** build jointly with item 2, with a design-generation/attachment-stratification dimension.
4. **Hurricane/TC × onshore wind:** add the new cell with farm/site-fraction logic; do not borrow offshore ranges.
5. **Convective wind × onshore wind:** follow item 4 and separate tornado-corridor from straight-line/derecho subcells; review the existing conditional-severity evidence base without tuning it from this report.
6. **Wildfire × solar:** build only with a landscape-wildfire versus equipment-brushfire partition; otherwise defer.
7. **Flood × solar:** require panels, switchyard, substation, electrical, foundation, and access exposure disaggregation.
8. **Flood × onshore wind:** defer to Gen 1.5; revisit on one quantified operating or construction exact-pair disclosure.
9. **Hail × onshore wind:** route to degradation/O&M; do not build as a catastrophe cell.
10. **Wildfire × onshore wind:** do not build; retain the evidence-absence log and revisit only on a quantified wind-farm wildfire loss.

## Non-scope statement

This is a source-evidence and scope-decision layer. It does not calibrate a damage curve, define a benchmark acceptance band, alter an EAL comparator, or tune any model output.
