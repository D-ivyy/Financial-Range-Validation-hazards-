"use strict";

// ---------------------------------------------------------------------------
// Range-Validation review dashboard — frontend.
// Reads parsed package artifacts from the backend API. Renders ranges,
// denominators, grain, and comparability verdicts only. It introduces NO
// pass/fail bands and computes no calibration. Blanks stay blank.
// ---------------------------------------------------------------------------

const state = {
  meta: null,
  pairs: [],
  pair: null,
  tab: "overview",
  chart: null,
};

const TABS = [
  { id: "overview", label: "Overview", pairScoped: false },
  { id: "coverage", label: "Coverage matrix", pairScoped: true },
  { id: "benchmarks", label: "Benchmark explorer", pairScoped: true },
  { id: "value", label: "Value ladder", pairScoped: true },
  { id: "curve", label: "Damage curve", pairScoped: true },
  { id: "crosswalk", label: "Crosswalk", pairScoped: true },
  { id: "flags", label: "Correctness flags", pairScoped: true },
];

// ---- api ----
async function api(path) {
  const r = await fetch(path);
  if (!r.ok) throw new Error(`${path} -> ${r.status}`);
  return r.json();
}

// ---- utils ----
const el = (tag, attrs = {}, ...kids) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") n.className = v;
    else if (k === "html") n.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
    else if (v !== null && v !== undefined) n.setAttribute(k, v);
  }
  for (const kid of kids) {
    if (kid === null || kid === undefined) continue;
    n.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
  }
  return n;
};

const isBlank = (v) => v === null || v === undefined || v === "";
const NUM_RE = /^-?\d[\d,]*\.?\d*$/;
const looksNumeric = (v) => typeof v === "string" && NUM_RE.test(v.replace(/,/g, ""));
const fmtUsd = (n) =>
  "$" + Math.round(n).toLocaleString("en-US");
const pct = (n) => n.toFixed(2) + "%";

function statusBadge(status) {
  if (!status) return el("span", { class: "badge unknown" }, "STATUS UNSPECIFIED");
  const cls = /RESOLVED/i.test(status) ? "resolved" : /PENDING/i.test(status) ? "pending" : "unknown";
  return el("span", { class: `badge ${cls}` }, status);
}

// ---- shell ----
function renderShell() {
  const m = state.meta;
  document.getElementById("meta-line").textContent =
    `package ${m.package} · version ${m.version || "?"} · ${state.pairs.length} pair(s) discovered`;
  document.getElementById("disclaimer").innerHTML =
    `<strong>Epistemic rule:</strong> ${m.disclaimer}`;

  const links = document.getElementById("repo-links");
  links.innerHTML = "";
  const rr = m.related_repos || {};
  const labelMap = {
    damage_modeling: "Damage_Modeling ↗",
    hazard_modeling: "Hazard_Modeling ↗",
    this_package: "This package ↗",
  };
  for (const [k, url] of Object.entries(rr)) {
    links.append(el("a", { href: url, target: "_blank", rel: "noopener" }, labelMap[k] || k));
  }

  const tabs = document.getElementById("tabs");
  tabs.innerHTML = "";
  for (const t of TABS) {
    tabs.append(
      el("button", {
        class: state.tab === t.id ? "active" : "",
        onclick: () => selectTab(t.id),
      }, t.label)
    );
  }

  const sel = document.getElementById("pair-select");
  sel.innerHTML = "";
  for (const p of state.pairs) {
    sel.append(el("option", { value: p.pair, selected: p.pair === state.pair ? "" : null }, p.pair));
  }
  sel.onchange = () => { state.pair = sel.value; render(); };

  document.getElementById("footer").innerHTML =
    `<strong>Not a calibration harness.</strong> This dashboard visualizes source ranges, ` +
    `denominators, grain, and comparability verdicts drawn live from the package's own ` +
    `artifact files. It defines no pass/fail thresholds and tunes no curve. ` +
    `Blank source cells are shown blank, never as zero.`;
}

function selectTab(id) {
  state.tab = id;
  render();
}

function currentTab() {
  return TABS.find((t) => t.id === state.tab) || TABS[0];
}

function render() {
  renderShell();
  const tab = currentTab();
  const pairBar = document.getElementById("pair-bar");
  pairBar.style.display = tab.pairScoped ? "flex" : "none";

  const statusSpan = document.getElementById("pair-status");
  const pairObj = state.pairs.find((p) => p.pair === state.pair);
  statusSpan.innerHTML = "";
  if (tab.pairScoped && pairObj) statusSpan.append(statusBadge(pairObj.status));

  const view = document.getElementById("view");
  if (state.chart) { state.chart.destroy(); state.chart = null; }
  view.innerHTML = `<div class="loading">loading ${tab.label}…</div>`;

  const render_fn = VIEWS[tab.id];
  Promise.resolve()
    .then(() => render_fn(view))
    .catch((e) => { view.innerHTML = ""; view.append(el("div", { class: "error" }, "Error: " + e.message)); });
}

// ---------------------------------------------------------------------------
// Views
// ---------------------------------------------------------------------------
const VIEWS = {};

VIEWS.overview = async (view) => {
  const m = state.meta;
  view.innerHTML = "";

  const intro = el("div", { class: "panel" },
    el("h2", {}, "Package overview"),
    el("p", { class: "sub" },
      "A source-pathway / normalization reference for hazard × asset financial loss. " +
      "This tool is for review and interpretation-correctness only."),
  );
  const kv = el("dl", { class: "kv" });
  kv.append(el("dt", {}, "package"), el("dd", {}, m.package));
  kv.append(el("dt", {}, "version"), el("dd", {}, m.version || "?"));
  kv.append(el("dt", {}, "pairs"), el("dd", {}, String(state.pairs.length)));
  intro.append(kv);
  view.append(intro);

  const banner = el("div", { class: "note-box warn" },
    el("span", { class: "label" }, "Load-bearing epistemic rule"),
    m.disclaimer);
  view.append(banner);

  if (m.changelog_highlights && m.changelog_highlights.length) {
    const cl = el("div", { class: "panel" }, el("h2", {}, "Changelog highlights"));
    const ul = el("ul", { class: "guidance" });
    for (const h of m.changelog_highlights) ul.append(el("li", {}, h));
    cl.append(ul);
    view.append(cl);
  }

  const repoPanel = el("div", { class: "panel" }, el("h2", {}, "Related repositories"));
  const rul = el("ul", { class: "guidance" });
  const rr = m.related_repos || {};
  for (const [k, url] of Object.entries(rr)) {
    rul.append(el("li", {}, el("a", { class: "src-link", href: url, target: "_blank", rel: "noopener" }, `${k}: ${url}`)));
  }
  repoPanel.append(rul);
  view.append(repoPanel);

  const cardsPanel = el("div", { class: "panel" }, el("h2", {}, "Discovered pairs"),
    el("p", { class: "sub" }, "Click a pair to open its coverage matrix."));
  const cards = el("div", { class: "cards" });
  for (const p of state.pairs) {
    const card = el("div", { class: "card", onclick: () => { state.pair = p.pair; selectTab("coverage"); } },
      el("h3", {}, p.pair),
      statusBadge(p.status),
      el("p", {}, p.summary || "—"),
      el("div", { class: "counts" }, `${p.n_benchmarks} benchmarks · ${p.n_sources} sources`),
    );
    cards.append(card);
  }
  cardsPanel.append(cards);
  view.append(cardsPanel);
};

VIEWS.coverage = async (view) => {
  const data = await api(`/api/pairs/${state.pair}/coverage`);
  view.innerHTML = "";
  const panel = el("div", { class: "panel" },
    el("h2", {}, `Coverage matrix — ${state.pair}`),
    el("p", { class: "sub" }, "Sources (rows) × metric columns from source_matrix.csv. " +
      "Y = source carries that metric. The availability_tag column shows where the open-number holes are."));
  const cols = data.columns;
  const table = el("table");
  const thead = el("tr");
  for (const c of cols) thead.append(el("th", { class: "sortable", onclick: () => sortAndRerender(data, c, view, VIEWS.coverage) }, c));
  table.append(el("thead", {}, thead));
  const tbody = el("tbody");
  for (const row of data.rows) {
    const tr = el("tr");
    for (const c of cols) {
      const v = row[c];
      if (c === "availability_tag" && v) {
        tr.append(el("td", {}, el("span", { class: "tag tag-" + v }, v)));
      } else if (v === "Y" || v === "y") {
        tr.append(el("td", { class: "mark-y" }, "Y"));
      } else if (isBlank(v)) {
        tr.append(el("td", { class: "mark-n" }, "·"));
      } else {
        tr.append(el("td", { class: c === "source_id" ? "mono" : "wrap" }, v));
      }
    }
    tbody.append(tr);
  }
  table.append(tbody);
  panel.append(el("div", { class: "table-wrap" }, table));
  view.append(panel);
};

// generic sortable state per view
const sortState = {};
function sortAndRerender(data, col, view, fn) {
  const key = fn.name + ":" + col;
  const dir = sortState.lastKey === key && sortState.dir === "asc" ? "desc" : "asc";
  sortState.lastKey = key; sortState.dir = dir;
  data.rows.sort((a, b) => cmp(a[col], b[col], dir));
  // re-render inline using cached data
  view.innerHTML = "";
  fn._rerender ? fn._rerender(view, data) : fn(view);
}

function cmp(a, b, dir) {
  const bl = isBlank(a), blb = isBlank(b);
  if (bl && blb) return 0;
  if (bl) return 1;      // blanks always sink
  if (blb) return -1;
  let x = a, y = b;
  if (looksNumeric(a) && looksNumeric(b)) {
    x = parseFloat(a.replace(/,/g, "")); y = parseFloat(b.replace(/,/g, ""));
  }
  const r = x < y ? -1 : x > y ? 1 : 0;
  return dir === "asc" ? r : -r;
}

VIEWS.benchmarks = async (view) => {
  const [data, sources] = await Promise.all([
    api(`/api/pairs/${state.pair}/benchmarks`),
    api(`/api/pairs/${state.pair}/sources`).catch(() => null),
  ]);
  const srcIndex = {};
  if (sources && sources.rows) {
    for (const s of sources.rows) if (s.source_id) srcIndex[s.source_id] = s.url || null;
  }
  view.innerHTML = "";
  const panel = el("div", { class: "panel" },
    el("h2", {}, `Benchmark explorer — ${state.pair}`),
    el("p", { class: "sub" }, "Every benchmark_number_matrix row. Sort by any column; filter by text. " +
      "Blank cells are shown blank (never 0). source_id links to its registry URL."));

  const cols = data.columns;
  const numCols = new Set(["reported_value", "normalized_usd_per_MW",
    "pct_installed_TIV_default_1_12M_per_MW", "pct_physical_replaceable_default_0_8778M_per_MW",
    "source_pct_TIV_or_asset_value"]);
  const wrapCols = new Set(["label", "source_denominator_or_scope", "useful_for", "caveats"]);

  const controls = el("div", { class: "controls" });
  const search = el("input", { type: "text", placeholder: "filter rows…" });
  const familySel = el("select");
  familySel.append(el("option", { value: "" }, "all metric_family"));
  const families = [...new Set(data.rows.map((r) => r.metric_family).filter(Boolean))].sort();
  for (const f of families) familySel.append(el("option", { value: f }, f));
  const countSpan = el("span", { class: "count" });
  controls.append(search, familySel, countSpan);
  panel.append(controls);

  const tableWrap = el("div", { class: "table-wrap" });
  panel.append(tableWrap);
  view.append(panel);

  const draw = () => {
    const q = search.value.trim().toLowerCase();
    const fam = familySel.value;
    let rows = data.rows;
    if (fam) rows = rows.filter((r) => r.metric_family === fam);
    if (q) rows = rows.filter((r) => cols.some((c) => !isBlank(r[c]) && String(r[c]).toLowerCase().includes(q)));
    countSpan.textContent = `${rows.length} / ${data.rows.length} rows`;

    const table = el("table");
    const thead = el("tr");
    for (const c of cols) {
      thead.append(el("th", { class: "sortable", onclick: () => {
        const dir = sortState.lastKey === "bm:" + c && sortState.dir === "asc" ? "desc" : "asc";
        sortState.lastKey = "bm:" + c; sortState.dir = dir;
        data.rows.sort((a, b) => cmp(a[c], b[c], dir));
        draw();
      } }, c));
    }
    table.append(el("thead", {}, thead));
    const tbody = el("tbody");
    for (const r of rows) {
      const tr = el("tr");
      for (const c of cols) {
        const v = r[c];
        if (isBlank(v)) { tr.append(el("td", { class: "blank" })); continue; }
        if (c === "source_id" && srcIndex[v]) {
          tr.append(el("td", { class: "mono" }, el("a", { class: "src-link", href: srcIndex[v], target: "_blank", rel: "noopener" }, v)));
        } else if (numCols.has(c)) {
          tr.append(el("td", { class: "num" }, v));
        } else if (wrapCols.has(c)) {
          tr.append(el("td", { class: "wrap" }, v));
        } else {
          tr.append(el("td", {}, v));
        }
      }
      tbody.append(tr);
    }
    table.append(tbody);
    tableWrap.innerHTML = "";
    tableWrap.append(table);
  };
  search.oninput = draw; familySel.onchange = draw;
  draw();
};

VIEWS.value = async (view) => {
  const vb = await api(`/api/pairs/${state.pair}/value_basis`);
  view.innerHTML = "";
  const buckets = vb.normalization_buckets_usd_per_MWdc || {};
  const installed = buckets.installed_TIV || vb.solar_default_basis_usd_per_MWdc?.installed_TIV || null;

  const panel = el("div", { class: "panel" },
    el("h2", {}, `Value ladder + failure-unit buckets — ${state.pair}`),
    el("p", { class: "sub" }, "From value_basis normalization_buckets_usd_per_MWdc. " +
      "Bars are $/MWdc; the % label is share of installed TIV where installed TIV is known."));

  // chart
  const entries = Object.entries(buckets).filter(([, v]) => typeof v === "number");
  const labels = entries.map(([k]) => k);
  const values = entries.map(([, v]) => v);
  const canvas = el("canvas");
  panel.append(el("div", { class: "bar-box" }, canvas));
  view.append(panel);

  state.chart = new Chart(canvas, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "$/MWdc",
        data: values,
        backgroundColor: "#2b5d8a",
        borderColor: "#1c4568",
        borderWidth: 1,
      }],
    },
    options: {
      indexAxis: "y",
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const v = ctx.parsed.x;
              let s = fmtUsd(v) + " /MWdc";
              if (installed) s += "  (" + pct((v / installed) * 100) + " installed TIV)";
              return s;
            },
          },
        },
      },
      scales: {
        x: { ticks: { callback: (v) => "$" + (v / 1000).toFixed(0) + "k" } },
      },
    },
  });

  // derived shares
  if (vb.derived_bucket_shares) {
    const dp = el("div", { class: "panel" }, el("h3", {}, "Derived bucket shares (from file)"));
    const kv = el("dl", { class: "kv" });
    for (const [k, v] of Object.entries(vb.derived_bucket_shares)) {
      kv.append(el("dt", {}, k), el("dd", {}, typeof v === "number" ? pct(v) : String(v)));
    }
    dp.append(kv);
    view.append(dp);
  }

  // failure-unit detail table if present
  const fu = vb.hail_damage_grain?.failure_units || vb.flood_damage_grain?.failure_units;
  if (fu && fu.length) {
    const grain = vb.flood_damage_grain || vb.hail_damage_grain;
    const fp = el("div", { class: "panel" }, el("h3", {}, `Failure units (${grain.cell_id || "cell"})`));
    const table = el("table");
    const hdr = ["value_id", "failure_unit", "subsystem", "component", "role", "installed_share", "usd_per_MWdc_installed"];
    table.append(el("thead", {}, el("tr", {}, ...hdr.map((h) => el("th", {}, h)))));
    const tb = el("tbody");
    for (const u of fu) {
      tb.append(el("tr", {},
        el("td", { class: "mono" }, u.value_id || ""),
        el("td", { class: "wrap" }, u.failure_unit || ""),
        el("td", {}, u.subsystem || ""),
        el("td", {}, u.component || ""),
        el("td", {}, u.role || ""),
        el("td", { class: "num" }, u.installed_share != null ? (u.installed_share * 100).toFixed(2) + "%" : ""),
        el("td", { class: "num" }, u.usd_per_MWdc_installed != null ? fmtUsd(u.usd_per_MWdc_installed) : ""),
      ));
    }
    table.append(tb);
    fp.append(el("div", { class: "table-wrap" }, table));
    view.append(fp);
  }

  // text: important_rule + correction_note + comparison_guidance
  const textPanel = el("div", { class: "panel" }, el("h3", {}, "Value-basis notes (verbatim)"));
  if (vb.important_rule)
    textPanel.append(el("div", { class: "note-box" }, el("span", { class: "label" }, "important_rule"), vb.important_rule));
  if (vb.correction_note)
    textPanel.append(el("div", { class: "note-box warn" }, el("span", { class: "label" }, "correction_note"), vb.correction_note));
  if (vb.comparison_guidance && vb.comparison_guidance.length) {
    textPanel.append(el("h3", {}, "comparison_guidance"));
    const ul = el("ul", { class: "guidance" });
    for (const g of vb.comparison_guidance) ul.append(el("li", {}, g));
    textPanel.append(ul);
  }
  view.append(textPanel);
};

VIEWS.curve = async (view) => {
  const data = await api(`/api/pairs/${state.pair}/curve`);
  view.innerHTML = "";
  const panel = el("div", { class: "panel" },
    el("h2", {}, `Damage curve — ${state.pair}`),
    el("p", { class: "sub" }, `Intensity → damage ratio. x-axis = ${data.x_field}; one line per DR series column.`));
  const canvas = el("canvas");
  panel.append(el("div", { class: "chart-box" }, canvas));
  panel.append(el("p", { class: "caption" },
    "Canonical failure-unit DRs from Damage_Modeling; engineering-parameterized, NOT claims-calibrated. " +
    "Anchor reference, not a distribution."));
  view.append(panel);

  const palette = ["#2b5d8a", "#c0562b", "#3f8a5b", "#8a5a2b", "#6a4c93", "#2b8a86",
    "#a83f5b", "#5b6675", "#8a832b", "#2b3f8a"];
  const datasets = Object.entries(data.series).map(([name, arr], i) => ({
    label: name,
    data: arr,
    borderColor: palette[i % palette.length],
    backgroundColor: palette[i % palette.length],
    borderWidth: 1.8,
    pointRadius: 2,
    tension: 0.15,
    fill: false,
  }));

  state.chart = new Chart(canvas, {
    type: "line",
    data: { labels: data.x, datasets },
    options: {
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: { legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } } },
      scales: {
        x: { title: { display: true, text: data.x_field } },
        y: { title: { display: true, text: "damage ratio (DR)" }, min: 0 },
      },
    },
  });
};

VIEWS.crosswalk = async (view) => {
  const data = await api(`/api/pairs/${state.pair}/crosswalk`);
  view.innerHTML = "";
  const panel = el("div", { class: "panel" },
    el("h2", {}, `Crosswalk — ${state.pair}`),
    el("p", { class: "sub" }, "value_damage_crosswalk rows with dynamic pct_* bucket columns, the " +
      "direct_damage_grain_comparability verdict, and interpretation. Grain warnings are informational chips " +
      "read from the existing interpretation/comparability fields — not new verdicts."));
  const cols = data.columns;
  const numCols = new Set(cols.filter((c) => c.startsWith("pct_") || c === "reported_value" || c === "normalized_usd_per_MWdc"));
  const table = el("table");
  table.append(el("thead", {}, el("tr", {}, ...cols.map((c) => el("th", {}, c)))));
  const tb = el("tbody");
  for (const r of data.rows) {
    const tr = el("tr");
    for (const c of cols) {
      const v = r[c];
      if (isBlank(v)) { tr.append(el("td", { class: "blank" })); continue; }
      if (c === "direct_damage_grain_comparability") {
        const warn = /requires-failure-unit-allocation|grain|exceed|cap/i.test(v);
        tr.append(el("td", {}, el("span", { class: warn ? "chip" : "chip neutral" }, v)));
      } else if (c === "interpretation") {
        tr.append(el("td", { class: "wrap" }, v));
      } else if (numCols.has(c)) {
        tr.append(el("td", { class: "num" }, v));
      } else if (c === "source_id" || c === "benchmark_id") {
        tr.append(el("td", { class: "mono" }, v));
      } else {
        tr.append(el("td", { class: "wrap" }, v));
      }
    }
    tb.append(tr);
  }
  table.append(tb);
  panel.append(el("div", { class: "table-wrap" }, table));
  view.append(panel);
};

VIEWS.flags = async (view) => {
  const [bm, cw, vb] = await Promise.all([
    api(`/api/pairs/${state.pair}/benchmarks`),
    api(`/api/pairs/${state.pair}/crosswalk`).catch(() => ({ rows: [] })),
    api(`/api/pairs/${state.pair}/value_basis`).catch(() => ({})),
  ]);
  view.innerHTML = "";
  const panel = el("div", { class: "panel" },
    el("h2", {}, `Correctness flags — ${state.pair}`),
    el("p", { class: "sub" }, "Derived views of existing fields only. These are counts and distributions, " +
      "not judgments. Nothing here is labeled validated or correct."));

  const nBlankNorm = bm.rows.filter((r) => isBlank(r.normalized_usd_per_MW)).length;
  const grainRows = cw.rows.filter((r) => {
    const c = (r.direct_damage_grain_comparability || "") + " " + (r.interpretation || "");
    return /requires-failure-unit-allocation|grain|exceed|cap/i.test(c);
  }).length;

  const ul = el("ul", { class: "flag-list" });
  const addFlag = (label, val, node) => {
    ul.append(el("li", {},
      el("span", { class: "flag-label" }, label),
      node || el("span", { class: "flag-val" }, String(val))));
  };
  addFlag("value_basis status", null, statusBadge(vb.status));
  addFlag("benchmarks total", bm.rows.length);
  addFlag("benchmarks with blank normalized_usd_per_MW", nBlankNorm);
  addFlag("crosswalk rows", cw.rows.length);
  addFlag("crosswalk rows with grain / allocation caveat", grainRows);
  panel.append(ul);
  view.append(panel);

  // basis_confidence distribution
  const dist = {};
  for (const r of bm.rows) {
    const k = isBlank(r.basis_confidence) ? "(blank)" : r.basis_confidence;
    dist[k] = (dist[k] || 0) + 1;
  }
  const dp = el("div", { class: "panel" }, el("h3", {}, "basis_confidence distribution"));
  const table = el("table");
  table.append(el("thead", {}, el("tr", {}, el("th", {}, "basis_confidence"), el("th", {}, "count"))));
  const tb = el("tbody");
  for (const [k, v] of Object.entries(dist).sort((a, b) => b[1] - a[1])) {
    tb.append(el("tr", {}, el("td", { class: "mono" }, k), el("td", { class: "num" }, String(v))));
  }
  table.append(tb);
  dp.append(el("div", { class: "table-wrap" }, table));
  view.append(dp);

  // source_status distribution
  const sdist = {};
  for (const r of bm.rows) {
    const k = isBlank(r.source_status) ? "(blank)" : r.source_status;
    sdist[k] = (sdist[k] || 0) + 1;
  }
  const sp = el("div", { class: "panel" }, el("h3", {}, "source_status distribution"));
  const st = el("table");
  st.append(el("thead", {}, el("tr", {}, el("th", {}, "source_status"), el("th", {}, "count"))));
  const stb = el("tbody");
  for (const [k, v] of Object.entries(sdist).sort((a, b) => b[1] - a[1])) {
    stb.append(el("tr", {}, el("td", { class: "mono" }, k), el("td", { class: "num" }, String(v))));
  }
  st.append(stb);
  sp.append(el("div", { class: "table-wrap" }, st));
  view.append(sp);
};

// ---------------------------------------------------------------------------
// boot
// ---------------------------------------------------------------------------
(async function boot() {
  try {
    state.meta = await api("/api/meta");
    state.pairs = await api("/api/pairs");
    state.pair = state.pairs.length ? state.pairs[0].pair : null;
    render();
  } catch (e) {
    document.getElementById("view").innerHTML =
      `<div class="error">Failed to load: ${e.message}</div>`;
  }
})();
