# Solar × wildfire — renewable loss reference source deep dive

**Version:** v0.4 (new pair; crosswalk grain resolved against canonical `Damage_Modeling` `wildfire_solar` cell, DR ordinates withheld upstream)  
**Last researched:** 2026-07-10  
**Parent anchor:** [`../../README.md`](../../README.md)  
**Related repos:** [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling) (canonical subsystems + failure-unit damage curves) · [`Hazard_Modeling`](https://github.com/aamani-ai/Hazard_Modeling) (M0→M4 engine + RangeCompare dashboard)  
**Purpose:** document *where to get reference numbers* for solar PV **exogenous-wildfire** physical-damage loss validation. This file does **not** define calibration pass/fail rules, and it does **not** tune a curve. It is a **source-pathway / normalization layer** that organizes the usable numbers and the pathways to stronger numbers, and it is scrupulous about *which fire* each number describes.

---

## 0. Bottom line

Solar × wildfire is the **thinnest and most frame-sensitive** pair in the package so far. The dominant finding is not a number — it is a **scope-and-origin** problem:

```text
open EXOGENOUS-wildfire solar $/MW severity numbers -> essentially NONE
  (0 of 100 catalogued benchmark rows normalize to $/MW; every normalized_usd_per_MW cell is blank, never zero)
open ALL-CAUSE PV fire numbers                       -> plentiful but MIS-SCOPED for wildfire
  (kWh Analytics inverter 44% / "84% equipment-driven"; GCube "fires = 16% of claims") — these BLEND
   endogenous (equipment-origin) + exogenous ignition and are NOT wildfire benchmarks
open SMOKE / SOILING generation numbers              -> plentiful, but a DIFFERENT peril (revenue, not damage)
  (CAISO ~13-30% smoke; NREL 7.7% monthly / 19% daily; FEMP/OSTI 9.4-37.8% at PM2.5 50-200)
strong gated PML pathway                             -> RMS/Moody's, Verisk/AIR, PCS wildfire designations (all gated,
                                                        and property-wide, not solar-specific)
strong denominator pathway                           -> USPVDB + EIA-860 + USFS FSim/WHP exposure layers
canonical damage grain (RESOLVED)                    -> the canonical wildfire_solar cell gives 11 named WS_* failure
                                                        units + value shares; BUT its DR ordinates are WITHHELD
                                                        upstream (NO_RUNTIME_CURVE)
```

Three findings dominate this pair:

```text
1. THE ORIGIN FENCE. "Solar fire" is not "solar wildfire". The canonical cell models ONLY exogenous
   (landscape-originated) fire that reaches the asset and damages it. Endogenous / asset-originated fire
   (inverter, connector, combiner, module, transformer, BESS) is a DISTINCT peril, deferred, NOT this cell.
   Most open "solar fire" statistics blend the two and therefore cannot validate a wildfire model.
2. ISOLATED EXOGENOUS-WILDFIRE $/MW PHYSICAL SEVERITY IS ABSENT from the open literature. The named events
   that exist are unit-counts (acres, MW nameplate, modules destroyed, restoration-days) or avoided-cost /
   vendor-success framings — none an isolated gross $/MW physical-damage figure.
3. THE DAMAGE GRAIN IS RESOLVED BUT THE CURVE IS WITHHELD. The canonical wildfire_solar cell exists (so the
   11 failure units + value shares are used verbatim), but it is a v0.1 scaffold with ordinate_status=withheld
   and withheld_reason_codes=[NO_RUNTIME_CURVE]. So this crosswalk resolves the VALUE grain and flags every DR
   ordinate as withheld. Status token: RESOLVED_GRAIN_DR_WITHHELD (not PENDING, not invented).
```

> **Golden Rule, applied to ignition origin.** A source with a fire number is **not** an exogenous-wildfire benchmark until its **ignition-origin frame** (external landscape vs equipment-origin vs blended), denominator, coverage, asset class, geography, and loss basis are understood. This dossier tags every fire number with a `fire_origin_family` precisely so that the wrong-origin numbers are visibly quarantined instead of silently averaged into a "wildfire" figure.

---

## 1. Normalization basis used in this dossier

The table below converts open `$ / MW` values into rough `% TIV` using the project default solar value basis (peril-agnostic, reused from solar_hail and solar_flood). These conversions are **not calibration conclusions**; they are just a way to place heterogeneous source numbers on one page. For wildfire the table is nearly empty — that emptiness is the finding.

| Basis | Value |
|---|---:|
| Project default installed value | `$1,120,000 / MWdc` |
| Project default physical replaceable value | `$877,800 / MWdc` |
| Canonical direct-hardware envelope (rows 2–10) | `$656,981 / MWdc` (58.66% TIV) |
| PV module hardware cap (`WS_MODULE_THERMAL`) | `$291,215 / MWdc` (26.00% TIV) |

Conversion:

```text
% installed TIV       = reported $/MW / 1,120,000
% physical value      = reported $/MW /   877,800
```

Important caveats:

```text
- ZERO open exogenous-wildfire dollars normalize to $/MW; the section-2 matrix is intentionally blank in
  the $/MW column. Blanks, not zeros.
- Origin frame first: do NOT normalize an all-cause-blended or endogenous fire number onto these buckets;
  it is not an exogenous-wildfire severity.
- Intensity, not severity: the magnitude spine is FSim flame length -> fireline intensity (kW/m), NOT
  ecological burn severity (dNBR/MTBS). A high-intensity grass fire can be low ecological severity and
  vice versa; MTBS is a geography check only, never a damage-curve input.
- Fireline intensity (kW/m) is NOT incident heat flux (kW/m^2). The engineering ignition thresholds
  (PV glass ~26 kW/m^2, XLPE cable ~16 kW/m^2) are material critical-heat-flux, a different axis from FSim
  flame-length class; do not equate them.
- Smoke/soiling numbers are a generation/revenue metric, kept in a separate family and never blended with
  physical damage.
- Burn probability is a FREQUENCY-layer field (belongs downstream, M4), not a damage ordinate.
```

### 1.1 Value/damage cross-reference (RESOLVED_GRAIN_DR_WITHHELD against canonical wildfire_solar)

The package includes a dedicated crosswalk, cross-mapped onto the canonical `wildfire_solar` cell:

```text
02_crosswalks/solar_wildfire_value_damage_crosswalk.md
```

Why it matters:

```text
The wildfire DIRECT failure grain is 11 named canonical WS_* failure units spanning module, mounting,
electrical, MV, civil AND a support-cost allocation rule — thermal attack touches almost every subsystem,
unlike hail (module glass only) or flood (electrical/BOS only).
The canonical wildfire_solar cell EXISTS, so value shares are used verbatim, BUT its DR ordinates are
WITHHELD upstream (NO_RUNTIME_CURVE) — a deliberate governance state, not a gap we fill.
There is no open exogenous-wildfire $/MW to recast onto the grain anyway; the crosswalk documents that.
```

Using the canonical `wildfire_solar` failure-unit shares (from the `Damage_Modeling` value workbook and
curve artifact), the **direct-hardware envelope** (rows 2–10: module + racking + foundation + inverter +
combiner + cable + MV equipment + grounding + SCADA) is about **$656,981/MWdc**, or **58.66% of installed
TIV**. This is the *value denominator* for a full burnover, **not** a loss: it is what the direct hardware
would cost to replace at DR = 1.0 across every unit. The single largest unit is `WS_MODULE_THERMAL` at
**$291,215/MWdc** (26.00% TIV).

Contrast with the other pairs: for **hail** a single PV_ARRAY module-glass unit dominates; for **flood** the
loss is a handful of *electrical* units gated by elevation; for **wildfire** the DIRECT envelope spans nearly
every subsystem via thermal attack, gated by component setback/elevation geometry and local fuel/wind/slope.

Because the DR ordinates are withheld, the cross-reference is a **value-grain / denominator layer only**. It
tells you *what fraction of which unit's replacement value* a future number could represent; it does **not**
provide a damage ratio and must never be read as one.

---

## 2. Quick benchmark-number matrix

**No row normalizes to `$/MW` at all.** All 100 benchmark rows carry a blank `$/MW` column; the closest
in-scope evidence is unit-counts and avoided-cost framings. This thinness — and the fact that most open
"solar fire" numbers are the *wrong origin family* — is itself the headline finding.

| Benchmark | Source | Reported | $/MW | Origin family | Caveat |
| --- | --- | --- | :--: | --- | --- |
| ~1,000 modules destroyed at 20 MW plant | DEPCOM_KERN_COUNTY_2020 | ~1,000 modules |  | EXOGENOUS_WILDFIRE_DIRECT | ~1% module-population burned at this event; unit-count anchor, NOT $/MW. Fire + firefighting-water pathways blended. |
| Restoration savings / avoided revenue | DEPCOM_KERN_COUNTY_2020 | $2.6M + $1.4M |  | EXOGENOUS_WILDFIRE_DIRECT | Avoided-cost / vendor success framing (PORTFOLIO_BIAS), not gross incurred loss. |
| Wellington North post-fire operating capacity | WELLINGTON_NORTH_FIRE_2025 | ~90% of 400 MW |  | EXOGENOUS_WILDFIRE_DIRECT | Operating-capacity outcome, not a $ severity; ~10% reduction is qualitative. |
| Kings County grass fire footprint | KINGS_COUNTY_GRASS_FIRE_2023 | ~267 acres |  | EXOGENOUS_WILDFIRE_DIRECT | Acres burned; cause under investigation; no asset $ loss reported. |
| Beryl solar farm fire under panels | BERYL_SOLAR_FIRE_2023 | 110 MW farm |  | EXOGENOUS_WILDFIRE_DIRECT | Qualitative outcome; cause undetermined; no $ loss. |
| Canyon Fire 2 solar grid trip | CANYON_FIRE_2_GRID_2017 | ~900 MW tripped |  | EXOGENOUS_WILDFIRE_DIRECT | Near-instantaneous grid-protection trip (frequency-response), NOT sustained loss or physical burn damage. |
| kWh inverter share of PV fires | KWH_SRA_2025_2026_FIRE | 44% inverter |  | ALL_CAUSE_PV_FIRE_BLENDED | NOT an exogenous-wildfire benchmark; blends endogenous + exogenous ignition. Context only. |
| kWh "equipment-driven" share | KWH_SRA_2025_2026_FIRE | "84%" |  | ALL_CAUSE_PV_FIRE_BLENDED | Unsupported by the source's own chart (= 100% − 16% wildfire); sweeps 27% unknown into "equipment". Context only. |
| GCube fires as share of claims | GCUBE_CELL_INTERRUPTED_2016 | 16% count / 20% cost |  | ALL_CAUSE_PV_FIRE_BLENDED | All-cause fire; not wildfire-only. Context only. |
| Inverter-origin site fire (Mannum) | MANNUM_SOLAR_FIRE_2024 | ~$250K inverter |  | ENDOGENOUS_ASSET_ORIGINATED_FIRE | Equipment-origin (inverter) fire — OUT OF SCOPE of the exogenous-wildfire cell. |
| CVSR fire (2019) | CVSR_AVIAN_FIRE_2019 | $8–9M, 250 MW |  | ENDOGENOUS_ASSET_ORIGINATED_FIRE | Avian/electrical-arc equipment origin — OUT OF SCOPE; NOT a landscape-wildfire loss. |
| CAISO smoke generation loss (2020) | CAISO_2020_SMOKE_EIA_REUTERS | ~13–30% |  | SMOKE_SOILING_GENERATION | Generation/revenue loss, DIFFERENT peril; never blended with physical damage. |
| FEMP/OSTI smoke derate | ENERGY_GOV_FEMP_PVROM_WILDFIRE | 9.4–37.8% |  | SMOKE_SOILING_GENERATION | Optical/production loss at PM2.5 50–200; separate family. |

(Full 100-row detail with denominators, basis-confidence, and per-row caveats is in
[`benchmark_number_matrix.csv`](benchmark_number_matrix.csv).)

### 2.1 Event / case anchors as `% installed TIV`

There is **no** exogenous-wildfire event with an isolated gross $/MW physical-damage figure to plot. The
only physical anchor is a **unit-count**:

```text
DEPCOM Kern County 2020 (exogenous fire reaches a 20 MW site):
  ~1,000 of ~80,000 modules destroyed  ->  ~1% module-population burned fraction AT THIS EVENT

  This is an anchor plot, not a distribution.

  module-population burned fraction (this single event):
  0% .|.......... 100%
      ^~1%
  (one point, one event; NOT a severity curve; NOT generalizable; fire+water pathways mixed)
```

### 2.2 Modeled annual AAL / PML anchors as `% installed TIV / year`

```text
No solar-specific exogenous-wildfire AAL or PML is open. The modeled cat products (RMS NAWF-HD, Verisk/AIR
US Wildfire, PCS wildfire designations) are PROPERTY-WIDE and gated:
  - 2025 LA firestorm insured loss ~$28-40B (all property; NOT solar) [RMS/Verisk/PCS/Swiss Re/Munich Re]
  - PCS wildfire loss-designation threshold = $25M (industry, all property)
These bound the industry event size but say nothing about a solar $/MW severity.

  This is an anchor plot, not a distribution.

  solar-specific exogenous-wildfire AAL (% installed TIV / yr):
  [ ---- no open value ---- ]   (gated pathway only; see section 4)
```

---

## 3. Source coverage matrix — what each pathway has and does not have

Full machine-readable coverage is in [`source_matrix.csv`](source_matrix.csv) (63 sources × metric/attribute
columns). The attribute columns include wildfire-specific fields: `BURN_PROBABILITY`, `FLAME_LENGTH`,
`SMOKE_AOD`, `IGNITION_CHF`, `DEFENSIBLE_SPACE`, `TRIGGER_BURN`, alongside the standard loss columns
(`EVENT_LOSS`, `CLAIM_SEVERITY`, `AAL`, `PML`, `PCT_TIV`) and `DENOMINATOR` / `GATED_ACTUAL_VALUES`.

Origin-family census of the 63 catalogued sources:

```text
HAZARD_INTENSITY_ENGINEERING     20   FSim/FARSITE intensity, material CHF ignition thresholds, smoke physics
EXPOSURE_DENOMINATOR             13   USPVDB, EIA-860, USFS WHP/FSim, NIFC acres, project-value ledgers
ALL_CAUSE_PV_FIRE_BLENDED        12   kWh, GCube, AXIS, Marsh — MIS-SCOPED for wildfire (context only)
SMOKE_SOILING_GENERATION          9   CAISO, NREL, FEMP/OSTI, NCAR, Amperon, 60Hertz — separate peril
EXOGENOUS_WILDFIRE_DIRECT         6   DEPCOM, Wellington North, Beryl, Canyon Fire 2, Kings County, Energy Safe Vic
ENDOGENOUS_ASSET_ORIGINATED_FIRE  3   CVSR (avian/arc), Mannum (inverter), Raywood (inverter) — OUT OF SCOPE
```

The single most important reading of this census: the **in-scope** family (`EXOGENOUS_WILDFIRE_DIRECT`) is
the *smallest* group and **none** of its members carry an open $/MW severity. The *largest* fire groups
(`ALL_CAUSE_PV_FIRE_BLENDED`, `SMOKE_SOILING_GENERATION`) are the **wrong peril or wrong origin** for
validating a landscape-wildfire physical-damage curve.

---

## 4. The source pathways in detail

Each entry follows the house pattern: **what it gives us / what it does *not* give us / how to get more**.

### 4.1 DEPCOM Kern County 2020 — best open exogenous-fire physical anchor (still not a $/MW)

**What this gives us:**

```text
- A genuine exogenous event: an external wildfire reached a ~20 MW / ~200-acre solar site.
- A physical-unit anchor: ~1,000 modules destroyed (~1% of the ~80,000-module population at this plant).
- Directional restoration economics: $2.6M + $1.4M restoration savings, avoided revenue $0.4-1.2M.
```

**What it does *not* give us:**

```text
- No isolated gross $/MW physical-damage severity. The dollars are avoided-cost / vendor success framing.
- Mixed pathways: firefighting-helicopter water flooded inverters, so even the physical damage is
  fire + water, not pure thermal attack.
- A single point; not a curve, not generalizable, not a DR ordinate.
```

**How to get more:** request the underlying loss adjuster / OEM restoration invoice with a gross-damage
line-item split (modules vs inverters vs BOS) and the nameplate denominator; see section 5.1.

### 4.2 kWh Analytics Solar Risk Assessment — all-cause PV fire (mis-scoped for wildfire)

**What this gives us:**

```text
- The clearest open decomposition of PV FIRE-LOSS ignition sources: inverter 44%, module 4%, connectors/
  wiring 3%, combiner 3%; wildfire 16%; unknown 27%; other 3%.
- A loss-first DISCOVERY that most PV fire claims are NOT external wildfire — an important scope insight.
```

**What it does *not* give us:**

```text
- An exogenous-wildfire benchmark. It BLENDS endogenous (equipment-origin) + exogenous ignition.
- Support for its own "84% equipment-driven" headline: 84% is just 100% - 16% wildfire, sweeping the 27%
  unknown and 3% other into "equipment" without evidence. The defensible statement is "~16% attributed to
  external wildfire; ~55% to identified equipment causes".
- Any exposure denominator: "only 4% of events in high-wildfire-risk areas" lacks the site-years / MW-years
  in each risk band needed to judge whether the wildfire map performed well.
```

> ```text
> This is an ALL-CAUSE PV fire source. It is recorded as CONTEXT_NOT_BENCHMARK with
> fire_origin_family = ALL_CAUSE_PV_FIRE_BLENDED. It must NOT be averaged into a wildfire figure.
> ```

**How to get more:** request kWh's loss database split by *ignition origin* (external-landscape vs
equipment) with exposure denominators per wildfire-risk band; only the external-landscape subset is a
candidate exogenous-wildfire benchmark.

### 4.3 GCube / AXIS / Marsh — all-cause fire and peril-mix shares (bounds, not wildfire severity)

**What this gives us:** directional peril-mix context — GCube "fires = 16% of claims / 20% of cost"; AXIS
wildfire ~23% vs hail ~55% of NA nat-cat; Marsh renewable nat-cat ~80% hail/storm (wildfire in the residual).

**What it does *not* give us:** any wildfire-only, exogenous, $/MW physical severity. All are all-cause or
peril-share, tagged `ALL_CAUSE_PV_FIRE_BLENDED`, `CONTEXT_NOT_BENCHMARK`.

### 4.4 CVSR / Mannum / Raywood — endogenous (equipment-origin) fires — OUT OF SCOPE

**What this gives us:** confirmation that several widely-cited "solar fire" events are **equipment-origin**:
CVSR 2019 (avian/electrical arc, $8–9M at 250 MW), Mannum 2024 (inverter, ~$250K), Raywood 2024 (inverter).

**What it does *not* give us:** any exogenous-wildfire evidence. These are `ENDOGENOUS_ASSET_ORIGINATED_FIRE`
and are **excluded** from the exogenous count. They belong to the *deferred* asset-originated-fire peril
(a separate model with a reliability/O&M/ignition-probability upstream), not to the wildfire cell.

> ```text
> An inverter fire is not a wildfire. If it ignites site grass it becomes an inside-out asset-originated
> WILDLAND fire — but its ignition probability and liability need a SEPARATE model, not this cell.
> ```

### 4.5 Wellington North / Beryl / Canyon Fire 2 / Kings County / Energy Safe Vic — exogenous, but unit-counts only

**What this gives us:** real exogenous events with *unit-count / operational* outcomes — Wellington North
(~90% of 400 MW operating post-fire), Beryl (110 MW farm, fire under panels), Canyon Fire 2 (~900 MW solar
tripped by grid protection), Kings County (~267 acres), Energy Safe Vic (5 farms ordered offline, preventive).

**What it does *not* give us:** any $/MW physical-damage severity. Canyon Fire 2 is a *grid-frequency*
response, not physical burn damage; Energy Safe Vic is *regulatory/preventive*, not a loss. All are
`EXOGENOUS_WILDFIRE_DIRECT` but `CONTEXT_NOT_BENCHMARK`.

### 4.6 RMS / Verisk / PCS wildfire cat products — best gated PML pathway (property-wide, not solar)

**What this gives us:** the strongest *modeled* wildfire severity pathway — RMS North America Wildfire HD,
Verisk/AIR US Wildfire, PCS wildfire loss designations ($25M threshold), anchoring the 2025 LA firestorm at
~$28–40B insured (all property). 

**What it does *not* give us:** a solar-specific AAL/PML. All are property-wide and gated. They bound the
industry event size, not a solar $/MW.

**How to get more:** request a solar-only exposure run (AAL and OEP/AEP PML at defined return periods) with
the explicit peril-region and gross/net loss basis; see section 5.2.

### 4.7 CAISO / NREL / FEMP-OSTI / NCAR / Amperon / 60Hertz — smoke/soiling generation (separate peril)

**What this gives us:** the richest *quantified* wildfire-adjacent numbers in the whole pair — CAISO 2020
smoke ~13–30% generation loss; NREL 7.7% monthly / 19% daily and +53–64% reserves; FEMP/OSTI 9.4–37.8% at
PM2.5 50–200; NCAR/Nature 2–5% GHI; Amperon/AEMO ~4.1% mean; 60Hertz ~6% average annual revenue.

**What it does *not* give us:** any *physical-damage* number. Smoke/soiling is a **generation/revenue**
metric — a `SMOKE_SOILING_GENERATION` family that the canonical physical cell explicitly **excludes**. It is
kept fully separate and must never be blended with physical damage.

### 4.8 Engineering ignition thresholds (Yang / Wang / Zhang / SSRN / FSim / FARSITE) — mechanism shape only

**What this gives us:** material critical-heat-flux ignition thresholds — PV glass/module ~26 kW/m²,
XLPE DC cable ~16.24 kW/m² — and the FSim/FARSITE flame-length → fireline-intensity mechanism.

**What it does *not* give us:** any $/MW, any DR ordinate, and — importantly — a directly usable damage axis:
material CHF (kW/m²) is **incident heat flux**, a different quantity from FSim flame-length class / fireline
intensity (kW/m). They inform curve *shape* and ordering of subsystem vulnerability, not a calibrated curve.

### 4.9 USPVDB + EIA-860 + USFS FSim/WHP + NIFC — denominator / exposure path

**What this gives us:** the exposure denominators — USPVDB v4 (6,611 facilities / 131,573 MW AC),
EIA-860 (utility PV 152,542 MW, Jan 2026), USFS FSim (270 m BP + FLP1–6, the canonical hazard axis),
USFS Wildfire Hazard Potential, NIFC acres/suppression. 

**What it does *not* give us:** any solar loss dollars. These are pure denominators — essential for turning a
future numerator into a rate, useless as a severity by themselves.

---

## 5. Data request templates

### 5.1 Claims / event-severity request (exogenous only)

```text
To: renewable insurer / loss adjuster / EPC restoration lead
Ask for, per exogenous-wildfire event (external landscape fire that reached the site):
  - gross incurred physical damage, split module / racking / inverter / combiner / cable / MV / civil
  - nameplate MWdc and MWac denominator; module count destroyed vs total
  - ignition ORIGIN confirmation (external landscape vs equipment) — exclude equipment-origin events
  - FSim/WRC flame-length class or fireline intensity at the site, if known
  - deductible / sublimit / BI structure so gross vs net is unambiguous
  - explicit exclusion of smoke/soiling generation loss from the physical figure
```

### 5.2 Engineered PML/AAL (cat-model) request

```text
To: RMS/Moody's, Verisk/AIR, or broker cat team
Ask for a SOLAR-ONLY exposure run:
  - AAL ($/MWdc/yr) and OEP + AEP PML at 50/100/200/250-yr return periods
  - peril = wildfire, DIRECT physical damage only (exclude smoke, PSPS, BI)
  - gross vs net-of-reinsurance loss basis stated
  - geography / fuel-region and vintage of the wildfire module
  - confirmation the exposure is utility-scale ground-mounted PV, not property-wide
```

### 5.3 Hazard-intensity / mechanism request

```text
To: USFS FSim team / fire-lab / PV materials lab
Ask for:
  - site-local FSim FLP1-6 histogram + BP at 270 m for candidate coordinates
  - fireline-intensity (kW/m) per flame-length class for the local fuel model
  - material ignition thresholds (module glass, backsheet, cable) as incident heat flux (kW/m^2)
  - explicit note on the kW/m (fireline intensity) vs kW/m^2 (incident flux) distinction
```

---

## 6. Current retrieval priority for solar × wildfire

```text
1. HIGHEST VALUE: a solar-only cat-model wildfire AAL/PML run (section 5.2). This is the only realistic path
   to an open, properly-scoped exogenous-wildfire solar severity. Everything else is context.
2. HIGH: insurer loss-database split by IGNITION ORIGIN with exposure denominators per wildfire-risk band
   (turns the kWh/GCube all-cause numbers into a usable external-landscape subset).
3. MEDIUM: gross-damage line-item + MW denominator for the DEPCOM Kern event and any newer exogenous event
   (Wellington North), to convert a unit-count anchor into a $/MW anchor.
4. LOWER: FSim site profiles + material CHF thresholds to inform curve SHAPE (not calibration).
5. SEPARATE TRACK: smoke/soiling generation-loss numbers are already relatively rich — but they belong to a
   DIFFERENT (revenue) peril and should be developed as their own reference, not merged here.
```

---

## 7. Files in this pair folder

```text
README.md                                  this narrative
source_registry.json                       63 sources, machine-readable, with fire_origin_family
source_matrix.csv                           63 x coverage attributes (Y marks)
benchmark_number_matrix.csv                 100 rows x 16 cols (incl. fire_origin_family); all $/MW blank
value_basis_from_damage_modeling.json       canonical 11 WS_* failure units + value ladder (DR withheld)
damage_curve_intensity_reference.csv         FSim 6-bin flame-length axis x WS_* units; DR cells withheld
damage_curve_intensity_reference.json        JSON companion of the intensity reference
benchmark_value_damage_crosswalk.csv         recast attempt: nothing valid to recast (DR withheld)
benchmark_value_damage_crosswalk.json        JSON companion of the crosswalk
```

> This dossier is a **source-pathway / normalization layer, not a calibration harness.** It never defines
> pass/fail bands, never tunes a curve, and never treats a raw number as a benchmark until its frame —
> especially its **ignition origin** — is understood. A source with a fire number is not automatically a
> wildfire benchmark.
