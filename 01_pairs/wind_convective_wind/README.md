# Wind × convective wind (tornado + straight-line/derecho) — renewable loss reference source deep dive

**Version:** v0.5 (crosswalk resolved against the canonical, promoted `Damage_Modeling` `wind_tornado_wind` cell)
**Last researched:** 2026-07-11
**Parent anchor:** [`../../README.md`](../../README.md)
**Related repos:** [`Damage_Modeling`](https://github.com/aamani-ai/Damage_Modeling) (canonical subsystems + failure-unit damage curves) · [`Hazard_Modeling`](https://github.com/aamani-ai/Hazard_Modeling) (M0→M4 engine + RangeCompare dashboard)
**Purpose:** document *where to get reference numbers* for onshore wind-turbine convective-wind (tornado + straight-line/derecho) loss validation. This file does **not** define calibration pass/fail rules. It only organizes the usable numbers and the pathways to stronger numbers.

---

## 0. Bottom line

Wind × convective-wind is a **grain-hard, honestly-scarce** pair. The peril is well documented in the aggregate (NOAA/NCEI event catalogs, insurer SCS narratives), but **isolated per-turbine `$/MW` physical severity for convective wind is essentially absent from the open literature**, and the largest open dollar figures cannot be placed on a per-MW axis without a struck-turbine count. Say so plainly:

```text
open convective-wind per-turbine $/MW severity -> essentially none (only the value-ladder denominators normalize)
open event/claim dollar anchors                 -> litigation/claim totals (Flat Ridge 2 tornado: $7.25M net /
                                                   >$12M adjuster) WITHOUT a MW denominator or struck-turbine count
open straight-line/derecho severity             -> best anchor is a MEASURED NULL (2020 Midwest derecho: no
                                                   significant turbine damage at ~126 mph gust)
open AAL / EAL numbers                           -> FEMA NRI keeps Tornado ($146.6M) and Strong-Wind ($5.35M) EAL
                                                   separate, but these are annualized and DOWNSTREAM of this cell
open PML trend numbers                           -> Moody's "US wind PML +58%" is HURRICANE-contaminated -> quarantined
strong gated pathway                             -> insurer/broker per-turbine convective-wind claims by failure unit
strong denominator pathway                       -> USWTDB + LBNL/NREL value ledger
canonical damage grain (RESOLVED)                -> the canonical, PROMOTED wind_tornado_wind cell gives 5 named
                                                   structural failure units + REAL speed-ratio->DR logistic curves
```

Two findings dominate this pair:

```text
1. The strongest open convective-wind dollars are FARM-LEVEL and lack a MW denominator / struck-turbine count.
   A tornado damages a NARROW CORRIDOR of a farm, so dividing a claim by nameplate MW understates per-struck-
   turbine severity by an order of magnitude. These are carried as event anchors, NOT per-MW severity.
2. The convective-wind failure unit is STRUCTURAL (blade, tower, nacelle, foundation), driven by a dimensionless
   speed ratio r = V_3s_hub / Ve50_class. Feathering / yawing / cut-out is the dominant mitigation knob — it is
   what turned the 2020 Midwest derecho into a measured near-zero at 126 mph.
```

The value ladder is reusable (NREL CWER 2024), so denominators are known, and the speed-ratio→DR curve is taken from the **canonical, promoted `wind_tornado_wind` cell** in `Damage_Modeling` (5 named failure units + real logistic ordinates). This pair is **`RESOLVED_FROM_DAMAGE_MODELING`** on the damage-artifact side (see the crosswalk).

> **Naming note.** The canonical cell is named `wind_tornado_wind`, but its curve family spans the full speed-ratio axis. There is **no separate strong-wind-for-wind cell** upstream, so **straight-line/derecho convective wind is the SLW (D50-baseline) pathway** of these curves and **tornado is the D50-shifted pathway** (plus a `0.10` core-exposure fraction). Hurricane/TC and hail-dominant SCS are named-and-quarantined.

---

## 1. Normalization basis used in this dossier

The table below converts open `$ / MW` values into rough `% TIV` using the project default onshore-wind value basis (peril-agnostic, from NREL CWER 2024, 2023 USD, 200 MW reference farm). These conversions are **not calibration conclusions**; they are just a way to place heterogeneous source numbers on one page.

| Basis | Value |
|---|---:|
| Project default installed value (TIV) | `$1,968,000 / MW` |
| Project default physical replaceable value | `$1,623,000 / MW` |
| Excluded sunk/soft/nonphysical | `$345,000 / MW` |

Conversion:

```text
% installed TIV    = reported $/MW / 1,968,000
% physical value   = reported $/MW / 1,623,000
```

Important caveats:

```text
- The strongest open convective-wind dollars (Flat Ridge 2) are farm-level claims with NO MW denominator and
  NO struck-turbine count, so they CANNOT be normalized to $/MW at all — carried as event anchors, not $/MW.
- A tornado hits a narrow corridor; a straight-line/derecho hits a broad footprint. A farm-average $/MW mixes
  struck and untouched turbines and understates per-struck-turbine severity. Grain matters more than for any
  other pair in this package.
- Some sources report gross claims; some report net paid after deductible.
- IEC turbine class sets the ratio denominator (Ve50: I 70 / II 59.5 / III 52.5 m/s). Class II is the default.
- A claim/event severity number is an event anchor, not an annual loss metric.
- AAL / EAL / PML numbers are annualized or tail model outputs and are DOWNSTREAM of this severity cell — never
  mix them with event claim severity or fold them into the DR curve.
```

### 1.1 Value/damage cross-reference (RESOLVED against canonical wind_tornado_wind)

The package includes a dedicated crosswalk, cross-mapped onto the canonical `wind_tornado_wind` cell:

```text
02_crosswalks/wind_convective_wind_value_damage_crosswalk.md
```

Why it matters:

```text
The convective-wind failure grain is 5 named canonical STRUCTURAL failure units (blade, tower, nacelle,
foundation, power-electronics), NOT the flood electrical units or the hail PV-module unit.
The canonical speed-ratio->DR curves come from Damage_Modeling (logistic on r = V_3s_hub / Ve50, promoted cell).
Many benchmark numbers are farm-level litigation/claim totals with no MW denominator or struck-turbine count.
```

Using the canonical `wind_tornado_wind` failure-unit shares (from the `Damage_Modeling` value workbook and
curve artifact), the **primary structural aggregate** (WT_BLADE + WT_TOWER + WT_NACELLE + WT_FOUNDATION) is
`$1,215,627/MW` (61.77% installed TIV); the **all-5-unit envelope** is `$1,275,678/MW` (64.82% TIV). The
`WT_NACELLE_CONSEQ` unit alone is `$559,935/MW` (28.45% TIV) because the drivetrain is the costliest subsystem.

---

## 2. Quick benchmark-number matrix

This is the compact view; the machine-readable version with full frames is in `benchmark_number_matrix.csv/json` (27 rows). **Only the two value-ladder rows normalize to `$/MW`** — everything else is blank per the golden rule (no valid denominator, wrong metric family, intensity-only, or quarantined).

| Benchmark | Sub-peril | Reported value | Metric family | $/MW | Grain verdict |
|---|---|---|---:|---|
| NREL CWER installed value ladder | N/A | `$1,968/kW` | VALUE_BASIS | `$1,968,000` | DENOMINATOR_ONLY |
| NREL CWER physical replaceable | N/A | `$1,623/kW` | VALUE_BASIS | `$1,623,000` | DENOMINATOR_ONLY |
| Flat Ridge 2 v. Lloyd's — net paid | TORNADO | `$7,250,000` net | EVENT_LOSS | — | NOT_GRAIN_COMPARABLE (no MW denom / struck count) |
| Flat Ridge 2 — adjuster estimate | TORNADO | `>$12,000,000` | EVENT_LOSS | — | NOT_GRAIN_COMPARABLE |
| Flat Ridge 2 — premium | TORNADO | `$1,800,000` | PREMIUM | — | CONTEXT_NOT_BENCHMARK |
| Greenfield IA EF4 — whole event | TORNADO | `$31,800,000` | EVENT_LOSS | — | NOT_GRAIN_COMPARABLE (residential-dominated) |
| 2020 Midwest derecho — measured null | STRAIGHT_LINE_WIND | `~$0` @126 mph | EVENT_LOSS | — | GRAIN_ANCHOR_LOWER_BOUND (real zero → blank) |
| Bouchard & Romanic — fragility | TORNADO | `v_m=49.1 m/s, k=0.504` | FRAGILITY_PARAM | — | CURVE_FORM_ANALOG (German, not a plug-in) |
| FEMA NRI — Tornado EAL (Atlanta 11-cty) | TORNADO | `$146,600,000` | EAL | — | DIFFERENT_METRIC_FAMILY (downstream) |
| FEMA NRI — Strong-Wind EAL (same) | STRAIGHT_LINE_WIND | `$5,350,000` | EAL | — | DIFFERENT_METRIC_FAMILY |
| Moody's "US wind PML" trend | HURRICANE_TC | `+58%` | PML | — | QUARANTINED_OUT_OF_SCOPE |
| Benton EF2 forensic | TORNADO | EF2, blade/tower obs | DAMAGE_STATE | — | QUALITATIVE_FAILURE_MODE_ONLY |
| Arbor Hills blade loss | TORNADO | blade thrown | DAMAGE_STATE | — | QUALITATIVE_FAILURE_MODE_ONLY |
| Greenfield DOW measured gust | TORNADO | `309–318 mph` DOW | INTENSITY | — | INTENSITY_AXIS_ANCHOR |
| USWTDB fleet exposure | N/A | ~75,000 turbines | EXPOSURE | — | DENOMINATOR_ONLY |

ASCII anchor (this is an anchor plot, not a distribution):

```text
per-turbine ALL-5 replacement cap  |████████████████████████████████████████| $1,275,678/MW (64.8% TIV)
per-turbine PRIMARY struct agg      |██████████████████████████████████▏      | $1,215,627/MW (61.8% TIV)
per-turbine NACELLE bucket          |█████████████████▌                       |   $559,935/MW (28.5% TIV)
Flat Ridge 2 net paid ($7.25M)      |  ??? no confirmed MW denominator — WITHHELD from $/MW axis
2020 derecho measured null          |· (empirical lower bound at r well below D50)
```

---

## 3. Source coverage matrix — what each pathway has and does not have

Full grid in `source_matrix.csv` (77 sources × 26 coverage columns, including wind-specific attribute columns: `WIND_SPEED_INTENSITY`, `TORNADO_EF_RATING`, `IEC_CLASS_VE50`, `FRAGILITY_CURVE`, `TOWER_FAILURE`, `BLADE_FAILURE`, `NACELLE_FAILURE`, `FOUNDATION_FAILURE`, `DEBRIS_THROW`, `EXPOSURE_COUNT`, `VALUE_LADDER`, `GATED_ACTUAL_VALUES`). Coverage census:

```text
sources by availability : HAS_OPEN_NUMBERS 60 | HAS_GATED_NUMBERS 16 | HAS_PATHWAY_ONLY 1
sources by sub-peril    : TORNADO 21 | CONVECTIVE_BLENDED 19 | N/A 19 | STRAIGHT_LINE_WIND 13 | HURRICANE_TC 3 | HAIL_CONTAMINATED_SCS 2
strongest coverage cols : EVENT_LOSS 38 | WIND_SPEED_INTENSITY 17 | DENOMINATOR 16 | EXPOSURE_COUNT 16 | GATED 16 | TORNADO_EF 12 | BLADE_FAIL 12 | CLAIM_SHARE 11
thin coverage cols      : FOUNDATION_FAILURE 1 | DEBRIS_THROW 1 | MITIGATION_STATE 1 | EAL 1 | PML 1 | PERCENT_TIV 2 | OEP_AEP 2
```

The pattern mirrors the bottom line: broad intensity/event/exposure coverage, but almost nothing on `$/MW`, `%TIV`, or clean per-failure-unit dollars.

---

## 4. The source pathways in detail

Grouped by the anchor's source classes (R1 renewable claims → R2 engineered PML/AAL/cat-model → R3 case/forensic → R4 engineering/mechanism → R5 generic downgraded → exposure/denominator). Full per-source "Has / Does-not-have / data-request" entries are in `../../99_metadata/bibliography.md` (wind_convective_wind section, 77 entries). Highlights:

### 4.1 R3 — case studies & forensic (the dollar and failure-mode anchors)

```text
Flat Ridge 2 v. Underwriters at Lloyd's (JUSTIA_FLAT_RIDGE_2_2014) — TORNADO, KS 2012-05-19
  Has: premium $1.8M; claim submitted $9,728,755.38; adjuster estimate >$12M; paid $7.25M net of $250K
       deductible (two partial payments $3.5M + $3.75M); 204 GE WTGs across 66,000 acres.
  Does NOT have: MW capacity in the primary filing; struck-turbine count; per-turbine or per-subsystem split.
  Verdict: strongest open dollar figure in the pair, but NOT grain-comparable — WITHHELD from the $/MW axis.
  Data request: obtain the turbine-level loss schedule (struck count + per-unit) to convert to per-struck $/MW.

Greenfield IA EF4 (R3_NASA_GREENFIELD_EO) — TORNADO 2024-05-21
  Has: 5-10 turbines collapsed; whole-event ~$31.8M; 185 mph official / 309-318 mph DOW / 120-170 mph forensic.
  Does NOT have: turbine-only dollar split (the $31.8M is residential-dominated).
  Verdict: strong INTENSITY anchor (DOW gusts) + qualitative structural failure; event dollars not turbine-specific.

2020 Midwest derecho (R3_MIDAM_DERECHO2020) — STRAIGHT_LINE_WIND
  Has: MidAmerican "no significant wind farm damage" at ~126 mph gust; a MEASURED NULL.
  Does NOT have: any positive turbine loss (the Sept/Oct blade failures were LIGHTNING, not wind).
  Verdict: the single best straight-line/derecho anchor — an empirical LOWER BOUND at r well below the SLW D50.

Benton EF2 (R3_NOAA_NCEI_BENTON), Harper/EPRI (R3_EPRI_TCTORNADO), Arbor Hills blade (R3_CRESTON_ARBORHILLS)
  Has: qualitative failure modes (blade throw, tower observations) + EF ratings.
  Verdict: QUALITATIVE_FAILURE_MODE_ONLY — map to WT_BLADE_STRUCT / WT_TOWER_STRUCT but carry no dollars/DR.
```

### 4.2 R4 — engineering & mechanism (the curve-form anchors)

```text
Bouchard & Romanic 2023 (SRC_BOUCHARD_ROMANIC_2023) — peer-reviewed German tornado fragility
  Has: logistic vulnerability v_m=49.1 m/s, k=0.504; DOD collapse threshold ~58 m/s; 1,250 EUR/kW; AGG/OCC ~EUR25M.
  Verdict: CURVE_FORM_ANALOG — corroborates the logistic-on-speed shape; NOT a US plug-in (different geography/fleet).

IEC 61400-1 (SRC_IEC_61400_1) + DTU/WAsP cut-out (SRC_DTU_WASP_IEC) + tower fragility (SRC_STEEL_CONCRETE_TOWER_FRAGILITY)
  Has: the IEC class Ve50 table (I 70 / II 59.5 / III 52.5 m/s) that defines the ratio denominator; cut-out behavior;
       steel/concrete tower fragility functions.
  Verdict: define and corroborate the X_SPEED_RATIO_TO_IEC hazard axis and the tower curve form.
```

### 4.3 R2 — engineered PML / AAL / cat-model (mostly gated or wrong-peril)

```text
Moody's/RMS SCS North America (SRC_RMS_SCS_NA), Moody's US wind PML (SRC_MOODYS_PML_USWIND_TREND)
  Has: modeled SCS framing; +58% "US wind PML" trend.
  Verdict: the +58% is HURRICANE-contaminated -> QUARANTINED. RMS SCS is blended (hail-heavy) -> context only.

GCube renewable-insurer reports (GCUBE_HAIL_HIGH_WATER_2021, GCUBE_KNOWN_UNKNOWNS_2025, ...)
  Has: peril-share narratives; gated actual values.
  Verdict: HAS_GATED_NUMBERS / blended SCS -> pathways to document, not benchmarks.
```

### 4.4 Exposure / denominator

```text
USGS USWTDB (SRC_USGS_USWTDB_VIEWER), NREL CWER 2024 (SRC_NREL_CWER_2024), LBNL Land-Based Wind (SRC_LBNL_LANDBASED_WIND_2024)
  Has: ~75,000-turbine national fleet database; installed CapEx = $1,968/kW; physical replaceable = $1,623/kW;
       subsystem cost split (blades $282/kW, tower $276/kW, foundation $120/kW, drivetrain $236/kW, ...).
  Verdict: the DENOMINATOR and VALUE LADDER backbone — anchors every $/MW conversion in this dossier.
```

---

## 5. Data request templates

Fields to request when acquiring a stronger convective-wind source:

```text
required to normalize a claim to per-turbine $/MW:
  project_MW (nameplate), struck_turbine_count, per_turbine_or_per_subsystem_loss_schedule
required to resolve the denominator:
  installed_TIV, insured_value, physical_replacement_value
required to separate physical from financial-layer loss:
  gross_physical_damage, BI, net_paid, deductible, sublimit
required to place the event on the hazard axis:
  hub_height_3s_gust_mps (or 10 m gust), EF_rating, IEC_class of the struck machines
required to map dollars to the right failure unit:
  which of WT_BLADE_STRUCT / WT_TOWER_STRUCT / WT_NACELLE_CONSEQ / WT_FOUNDATION_OT / WT_POWER_ELEC_ACCEL
required to explain a null / low loss:
  mitigation_state (feathered / yawed / cut-out at time of event)
required to keep the tags clean:
  sub_peril_family (tornado / straight-line-derecho / hurricane / hail-SCS)
```

---

## 6. Current retrieval priority for wind × convective-wind

```text
1. Flat Ridge 2 turbine-level loss schedule (struck count + per-unit)  -> converts $7.25M net into per-struck $/MW
2. Insurer/broker per-turbine convective-wind claims by failure unit    -> first clean per-turbine $/MW severity
3. GCube / Moody's RMS SCS-specific (non-hurricane, non-hail) absolutes  -> isolates convective-wind AAL/PML
4. Forensic reports with hub-height gusts (NCEI/EPRI/NREL DOW)           -> tightens the intensity-axis anchors
5. USWTDB + LBNL/NREL refresh                                            -> keeps the denominator/value ladder current
```

---

## 7. Files in this pair folder

```text
README.md                               this dossier narrative
benchmark_number_matrix.csv / .json     27 benchmark rows (2 normalized to $/MW; rest blank per golden rule)
source_matrix.csv                       77 sources × 26 coverage columns (wind-specific attribute cols included)
source_registry.csv / .json             77 catalogued sources with availability / metric / evidence / sub-peril tags
value_basis_from_damage_modeling.json   canonical value ladder + 5 WT_* failure units + derived aggregate buckets
benchmark_value_damage_crosswalk.csv / .json   benchmark rows recast with value-basis label + grain-comparability verdict
damage_curve_intensity_reference.csv / .json   canonical wind_tornado_wind speed-ratio -> DR lookup (SLW + tornado)
```

Flat copies of the machine-readable files are distributed to `../../data/` with pair-name prefixes.

---

## v2 two-pathway PROPOSED preview (non-canonical) — added v0.6

A staged, **PROPOSED / NON-CANONICAL** v2.0 (docs r1) candidate for the `wind_tornado_wind` cell has been previewed alongside this dossier. It replaces the single shared D50-shift curve family with **two independently governed pathways** on a shared cell ("common spine"):

```text
wind_tornado_wind
├─ straight_line_convective  (downburst / microburst / macroburst / gust-front / local derecho outflow)
└─ tornado_direct_hit        (conditional severity after Hazard resolves turbine intersection)
```

Both pathways evaluate mutually-exclusive **ordered damage states** (`ordered_damage_state_lognormal`) on a single `$1,090,000/MW` turbine-equipment-assembly atom, rather than v1.0's independent 5-unit structural sum on the `$1,623,000/MW` physical base. **This is a preview only** — `canonical_runtime_artifact: false`, `promotion_status: proposed`, `lifecycle_state: candidate`, `promotion: not_performed`. The cell's `current_pin` remains `wind_tornado_wind@model_v1_0__docs_r4`, and **v1.0 is still the canonical `Damage_Modeling` runtime** used everywhere else in this dossier. No content above this section has been altered.

See the full preview narrative at [`../../02_crosswalks/wind_convective_wind_v2_proposed_value_damage_crosswalk.md`](../../02_crosswalks/wind_convective_wind_v2_proposed_value_damage_crosswalk.md) and the parallel machine-readable files:

```text
value_basis_from_damage_modeling_v2_PROPOSED.json          PROPOSED value ladder + two-pathway failure-unit mapping
benchmark_value_damage_crosswalk_v2_proposed.csv / .json    same 27 benchmark rows recast onto the v2 atom
damage_curve_intensity_reference_v2_proposed.csv / .json    24-row (12 speeds x 2 pathways) DR lookup, built directly
                                                             from the staged OLD_VS_NEW_COMPARISON source
```

Flat copies are distributed to `../../data/` with pair-name prefixes, same as the canonical files.
