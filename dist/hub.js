// Trang Workspace (#/workspace) và Hồ sơ trải nghiệm (#/ho-so) — feedback 16–17/11.
// Nạp TRƯỚC app.js; dùng missions, roles, missionInfo, missionActions, workspacePath, escape của app.js khi được gọi.
// Mọi dữ liệu đọc từ localStorage của từng Workspace, không có số liệu giả.

const INDUSTRY_TONES = {
  HR: { hue: "#2f6fe0", soft: "#e8f0fe", label: "Nhân sự" },
  MKT: { hue: "#d4467e", soft: "#fdeaf2", label: "Marketing" },
  FIN: { hue: "#0f9a6a", soft: "#e2f6ee", label: "Tài chính" },
  OPS: { hue: "#d9821a", soft: "#fdf1e1", label: "Kinh doanh & Vận hành" },
  SC: { hue: "#7a5bd1", soft: "#efeafc", label: "Chuỗi cung ứng" },
  DATA: { hue: "#0c95ad", soft: "#e0f5f8", label: "Dữ liệu" }
};
const INTEREST_LEVELS = ["Rất hứng thú", "Khá hứng thú", "Muốn tìm hiểu thêm", "Chưa phù hợp với mình"];
const MODE_LABELS = { guided: "Làm quen", self: "Thử sức" };

// Hình minh hoạ nhỏ cho từng case: khung cửa sổ ứng dụng + nội dung đặc trưng của nghề.
const ILLUS = {
  MISSION_001: c => `${[28, 78, 128].map((x, i) => `<g transform="translate(${x} 40)"><rect width="44" height="56" rx="7" fill="${i === 1 ? c.soft : "#fff"}" stroke="${i === 1 ? c.hue : "#d5e1f2"}" stroke-width="${i === 1 ? 2 : 1.2}"/><circle cx="22" cy="18" r="8" fill="${i === 1 ? c.hue : "#c9d7ec"}"/><rect x="10" y="32" width="24" height="4" rx="2" fill="#c9d7ec"/><rect x="13" y="40" width="18" height="4" rx="2" fill="#dde7f5"/></g>`).join("")}<circle cx="122" cy="94" r="9" fill="${c.hue}"/><path d="m117.5 94 3 3 5.5-6" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`,
  MISSION_002: c => `<rect x="44" y="34" width="112" height="72" rx="9" fill="#fff" stroke="#d5e1f2"/><circle cx="60" cy="49" r="7" fill="${c.hue}"/><rect x="72" y="45" width="40" height="4" rx="2" fill="#c9d7ec"/><rect x="72" y="52" width="26" height="3" rx="1.5" fill="#dde7f5"/><rect x="54" y="63" width="92" height="26" rx="5" fill="${c.soft}"/><path d="M84 76h32M84 70h20" stroke="${c.hue}" stroke-width="3" stroke-linecap="round" opacity=".55"/><path d="M62 98c0-3 3-5 5-3 2-2 5 0 5 3 0 3-5 6-5 6s-5-3-5-6Z" fill="#e2557a"/><text x="140" y="100" font-size="8" font-weight="800" fill="${c.hue}" text-anchor="end" font-family="system-ui">EVP</text>`,
  MISSION_003: c => `<rect x="34" y="40" width="82" height="58" rx="8" fill="#fff" stroke="#d5e1f2"/><path d="m36 44 39 28 39-28" fill="none" stroke="${c.hue}" stroke-width="2.4" stroke-linejoin="round"/><rect x="118" y="58" width="48" height="40" rx="5" fill="${c.hue}"/><rect x="114" y="50" width="56" height="12" rx="3" fill="${c.hue}" opacity=".85"/><rect x="138" y="50" width="8" height="48" fill="#fff" opacity=".9"/><path d="M142 50c-8-12-18-6-12 0M142 50c8-12 18-6 12 0" fill="none" stroke="${c.hue}" stroke-width="2.4" stroke-linecap="round"/>`,
  MISSION_004: c => `<rect x="70" y="26" width="60" height="84" rx="11" fill="#fff" stroke="#d5e1f2"/><rect x="77" y="36" width="46" height="34" rx="6" fill="${c.soft}"/><path d="M92 46h16l-2 16H94Z" fill="${c.hue}" opacity=".85"/><rect x="95" y="42" width="10" height="4" rx="2" fill="${c.hue}"/><circle cx="100" cy="53" r="9" fill="#fff" opacity=".0"/><rect x="78" y="77" width="44" height="4" rx="2" fill="#c9d7ec"/><rect x="78" y="85" width="30" height="4" rx="2" fill="#dde7f5"/><circle cx="148" cy="52" r="13" fill="${c.hue}"/><path d="m145 46 9 6-9 6Z" fill="#fff"/><path d="M40 70c6-6 12-6 18 0" stroke="${c.hue}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".5"/><path d="M36 80c9-9 19-9 28 0" stroke="${c.hue}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".3"/>`,
  MISSION_005: c => `<rect x="34" y="30" width="132" height="78" rx="9" fill="#fff" stroke="#d5e1f2"/>${[[52, 46], [72, 50], [92, 40], [112, 66], [132, 58]].map(([x, y], i) => `<rect x="${x}" y="${y}" width="13" height="${96 - y}" rx="3" fill="${i === 3 ? "#e2557a" : c.hue}" opacity="${i === 3 ? 1 : .35 + i * .12}"/>`).join("")}<path d="M48 96h108" stroke="#c9d7ec" stroke-width="1.5"/><circle cx="146" cy="44" r="12" fill="none" stroke="${c.hue}" stroke-width="3"/><path d="m155 53 8 8" stroke="${c.hue}" stroke-width="3.4" stroke-linecap="round"/>`,
  MISSION_006: c => `<rect x="30" y="32" width="96" height="74" rx="8" fill="#fff" stroke="#d5e1f2"/>${[46, 60, 74, 88].map((y, i) => `<rect x="40" y="${y - 3}" width="40" height="5" rx="2.5" fill="#c9d7ec"/><text x="116" y="${y + 2}" font-size="9" font-weight="800" text-anchor="end" fill="${i === 1 || i === 3 ? "#d6455d" : c.hue}" font-family="system-ui">${["+90", "−115", "+60", "−120"][i]}</text>`).join("")}<circle cx="150" cy="70" r="22" fill="${c.soft}"/><path d="M150 70V48a22 22 0 0 1 21 28Z" fill="${c.hue}"/><path d="M150 70l21 6a22 22 0 0 1-12 14Z" fill="${c.hue}" opacity=".55"/>`,
  MISSION_007: c => `<rect x="30" y="28" width="140" height="80" rx="9" fill="#fff" stroke="#d5e1f2"/>${[[48,62,74,52,80,1],[64,56,70,50,76,1],[80,64,78,58,84,0],[96,50,64,44,70,1],[112,46,58,40,62,1],[128,52,62,46,68,0]].map(([x,o,cl,hi,lo,up])=>`<path d="M${x} ${hi}V${lo}" stroke="${up?c.hue:"#d6455d"}" stroke-width="1.6"/><rect x="${x-4}" y="${Math.min(o,cl)}" width="8" height="${Math.abs(cl-o)||2}" rx="1.5" fill="${up?c.hue:"#d6455d"}"/>`).join("")}<path d="M40 92 70 84 96 88 124 74 150 70" fill="none" stroke="${c.hue}" stroke-width="2" stroke-dasharray="4 4" opacity=".6"/><circle cx="152" cy="94" r="12" fill="#fff" stroke="${c.hue}" stroke-width="3"/><path d="m161 103 7 7" stroke="${c.hue}" stroke-width="3.4" stroke-linecap="round"/><text x="152" y="98" font-size="9" font-weight="800" text-anchor="middle" fill="${c.hue}" font-family="system-ui">P/E</text>`
};
function illus(mission, id) {
  const c = toneOf(id);
  return `<svg class="hub-illus" viewBox="0 0 200 130" aria-hidden="true" focusable="false">
    <rect width="200" height="130" rx="16" fill="${c.soft}"/>
    <circle cx="176" cy="18" r="34" fill="${c.hue}" opacity=".08"/><circle cx="18" cy="122" r="28" fill="${c.hue}" opacity=".07"/>
    <g>${(ILLUS[id] ?? ILLUS.MISSION_001)(c)}</g>
  </svg>`;
}

function roleOfMission(id) { return roles.find(r => r.mission_id === id && r.simulation_status === "available"); }
function toneOf(id) { return INDUSTRY_TONES[roleOfMission(id)?.industry_id] ?? INDUSTRY_TONES.HR; }
function playableMissions() {
  return Object.entries(missions).map(([id, mission]) => {
    const role = roleOfMission(id);
    return role ? { id, mission, role, info: missionInfo(mission), tone: toneOf(id) } : null;
  }).filter(Boolean);
}
function ago(ts) {
  if (!ts) return "";
  const m = Math.round((Date.now() - ts) / 60000);
  if (m < 1) return "vừa xong";
  if (m < 60) return `${m} phút trước`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} giờ trước`;
  const d = Math.round(h / 24);
  if (d === 1) return "hôm qua";
  if (d < 7) return `${d} ngày trước`;
  return new Date(ts).toLocaleDateString("vi-VN");
}
const chip = (text, tone) => `<span class="hub-chip"${tone ? ` style="--tone:${tone.hue};--tone-soft:${tone.soft}"` : ""}>${escape(text)}</span>`;
function progressBar(info) {
  const p = info.progress;
  const pct = p ? Math.round(p.done / p.total * 100) : 8;
  const text = p ? `Bước ${Math.min(p.done + 1, p.total)}/${p.total} · Tiếp theo: ${p.label}` : "Đã bắt đầu";
  return `<div class="hub-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" aria-label="Tiến độ ${pct}%"><i style="width:${pct}%"></i></div>
    <p class="hub-step">${escape(text)}</p>`;
}
function scoreBadge(score, size = "") {
  if (!score) return `<span class="hub-score pending ${size}" title="Chưa có kết quả AI">…</span>`;
  const full = score.pass === score.total;
  return `<span class="hub-score ${full ? "full" : score.pass >= 2 ? "mid" : "low"} ${size}" style="--p:${score.pass / score.total}" aria-label="${score.pass}/${score.total} tiêu chí Đạt"><b>${score.pass}</b><small>/${score.total}</small></span>`;
}

// ---------- #/workspace ----------
// Nâng cấp 19/11: tìm kiếm, lọc theo trạng thái / lĩnh vực / yêu thích, xem dạng lưới hoặc danh sách,
// hoạt động gần đây và gợi ý nhiệm vụ liên quan. Luồng làm nhiệm vụ không đổi.
const hubState = { q: "", status: "all", field: "", view: (() => { try { return localStorage.getItem("vaoviec-hub-view") || "grid"; } catch { return "grid"; } })() };
const favM = () => window.vv?.fav("mission");
const starBtn = (id, name) => {
  const on = favM()?.has(id);
  return `<button type="button" class="vv-icon-btn sm hub-star${on ? " on" : ""}" data-fav-mission="${escape(id)}" aria-pressed="${!!on}" aria-label="${on ? "Bỏ yêu thích" : "Yêu thích"} ${escape(name)}">${window.vv ? vv.icon(vv.I.star) : "★"}</button>`;
};
function matchItem(x, q) {
  if (!q) return true;
  const hay = normalize([x.role.role_name, x.role.role_name_vi, x.mission.company, x.mission.caseName, x.tone.label, x.mission.description].join(" "));
  return normalize(q).split(" ").every(w => hay.includes(w));
}
function activityLog(items) {
  const ev = [];
  const attempts = readJSON("vaoviec-user-attempts")?.items ?? {};
  for (const x of items) {
    const url = workspacePath(x.mission, x.role);
    for (const v of [...x.info.past, ...x.info.versions]) {
      if (v.at) ev.push({ at: v.at, ic: "trophy", text: `Nộp bản ${v.version} · <strong>${escape(x.role.role_name)}</strong>`, sub: v.score ? `${v.score.pass}/${v.score.total} tiêu chí Đạt` : v.pending ? "AI đang chấm" : "", url: v.past ? "#/ho-so" : url + "#result=" + encodeURIComponent(v.id) });
    }
    if (x.info.status === "progress" && x.info.updatedAt) ev.push({ at: x.info.updatedAt, ic: "laptop", text: `Làm tiếp <strong>${escape(x.role.role_name)}</strong>`, sub: x.info.progress?.label ? "Tiếp theo: " + x.info.progress.label : "", url });
  }
  for (const a of Object.values(attempts)) {
    const x = items.find(i => i.id === a.mission);
    if (x && a.start) ev.push({ at: a.start, ic: "play", text: `Bắt đầu <strong>${escape(x.role.role_name)}</strong>`, sub: "", url: workspacePath(x.mission, x.role) });
  }
  return ev.sort((a, b) => b.at - a.at).slice(0, 8);
}
function suggestions(items) {
  const tried = items.filter(x => x.info.status !== "new" || x.info.everSubmitted);
  const fields = new Set(tried.map(x => x.role.industry_id));
  const related = new Set(tried.flatMap(x => x.role.related_role_ids));
  return items.filter(x => !tried.includes(x)).map(x => {
    const reason = related.has(x.role.role_id) ? "Liên quan nghề bạn đã thử" : fields.has(x.role.industry_id) ? `Cùng lĩnh vực ${x.tone.label}` : tried.length ? "Mở rộng sang lĩnh vực mới" : "Bắt đầu nhanh trong 15–20 phút";
    const rank = related.has(x.role.role_id) ? 0 : fields.has(x.role.industry_id) ? 1 : 2;
    return { ...x, reason, rank };
  }).sort((a, b) => a.rank - b.rank).slice(0, 3);
}
function renderHub() {
  const hub = document.querySelector("#hub");
  const all = playableMissions();
  const s = hubState;
  const fav = favM();
  const pass = x => matchItem(x, s.q) && (!s.field || x.role.industry_id === s.field) &&
    (s.status === "all" || (s.status === "fav" ? fav?.has(x.id) : s.status === "progress" ? x.info.status === "progress" : s.status === "submitted" ? x.info.status === "submitted" : x.info.status === "new"));
  const items = all.filter(pass);
  const active = items.filter(x => x.info.status === "progress").sort((a, b) => b.info.updatedAt - a.info.updatedAt);
  const done = items.filter(x => x.info.status === "submitted").sort((a, b) => b.info.updatedAt - a.info.updatedAt);
  const fresh = items.filter(x => x.info.status === "new");
  const counts = { all: all.length, progress: all.filter(x => x.info.status === "progress").length, submitted: all.filter(x => x.info.status === "submitted").length, new: all.filter(x => x.info.status === "new").length, fav: all.filter(x => fav?.has(x.id)).length };
  const filtered = !!(s.q || s.field || s.status !== "all");
  const activeCard = ({ id, mission, role, info, tone }) => `
    <article class="hub-card hub-active" style="--tone:${tone.hue};--tone-soft:${tone.soft}">
      <a class="hub-art" href="${escape(workspacePath(mission, role))}" tabindex="-1" aria-hidden="true">${illus(mission, id)}</a>
      <div class="hub-body">
        <div class="hub-chips">${chip(tone.label, tone)}${info.mode ? chip("Chế độ " + MODE_LABELS[info.mode]) : ""}${starBtn(id, role.role_name)}</div>
        <h3><a href="${escape(workspacePath(mission, role))}">${escape(role.role_name)}</a></h3>
        <p class="hub-sub">${escape(mission.company)} · ${escape(mission.caseName)}</p>
        ${progressBar(info)}
        ${info.updatedAt ? `<p class="hub-meta">Cập nhật ${ago(info.updatedAt)}</p>` : ""}
      </div>
      <div class="hub-side">
        <a class="hub-btn" href="${escape(workspacePath(mission, role))}">Tiếp tục <span aria-hidden="true">→</span></a>
        ${restartButton(mission, role)}
      </div>
    </article>`;
  const doneCard = ({ id, mission, role, info, tone }) => `
    <article class="hub-card hub-done" style="--tone:${tone.hue};--tone-soft:${tone.soft}">
      ${scoreBadge(info.latest)}
      <div class="hub-body">
        <div class="hub-chips">${chip(tone.label, tone)}${starBtn(id, role.role_name)}</div>
        <h3><a href="${escape(workspacePath(mission, role))}#result">${escape(role.role_name)}</a></h3>
        <p class="hub-sub">${escape(mission.caseName)}</p>
        <p class="hub-meta">${info.versions.length} phiên bản · nộp lần cuối ${escape(fullDate(info.lastSubmittedAt || info.updatedAt))}</p>
      </div>
      <div class="hub-actions"><a class="hub-btn" href="${escape(workspacePath(mission, role))}#result">Xem kết quả</a><a class="hub-link" href="${escape(workspacePath(mission, role))}">Sửa & nộp lại</a>${restartButton(mission, role)}</div>
    </article>`;
  const freshCard = ({ id, mission, role, tone }) => `
    <article class="hub-card hub-fresh" style="--tone:${tone.hue};--tone-soft:${tone.soft}">
      <a class="hub-fresh-link" href="${escape(workspacePath(mission, role))}">
        ${illus(mission, id)}
        <div class="hub-chips">${chip(tone.label, tone)}<span class="hub-time">⏱ ${escape(mission.duration)}</span></div>
        <h3>${escape(role.role_name)}</h3>
        <p>${escape(mission.description)}</p>
        <span class="hub-start">Bắt đầu mô phỏng <span aria-hidden="true">→</span></span>
      </a>
      ${starBtn(id, role.role_name).replace("hub-star", "hub-star hub-star-float")}
    </article>`;
  const log = activityLog(all);
  const sugg = suggestions(all);
  const fields = [...new Set(all.map(x => x.role.industry_id))];
  hub.innerHTML = `
    <div class="hub-hero">
      <p class="hub-eyebrow">Workspace</p>
      <h1>Bàn làm việc của bạn</h1>
      <p class="hub-lead">Tiếp tục các mô phỏng đang làm dở, xem lại kết quả hoặc thử sức với một nghề mới.</p>
      <ul class="hub-stats" aria-label="Tổng quan">
        <li><b>${counts.progress}</b><span>đang làm</span></li>
        <li><b>${counts.submitted}</b><span>đã nộp</span></li>
        <li><b>${counts.new}</b><span>chưa thử</span></li>
      </ul>
    </div>
    <div class="vv-toolbar hub-toolbar">
      <label class="vv-field">${window.vv ? vv.icon(vv.I.search) : ""}<span class="vv-sr">Tìm nhiệm vụ</span><input id="hub-q" type="search" placeholder="Tìm nhiệm vụ, công ty, nghề…" value="${escape(s.q)}"></label>
      <div class="vv-seg" role="group" aria-label="Lọc theo trạng thái">${[["all", "Tất cả"], ["progress", "Đang làm"], ["submitted", "Đã nộp"], ["new", "Chưa thử"], ["fav", "Yêu thích"]].map(([k, l]) => `<button type="button" data-hub-status="${k}" aria-pressed="${s.status === k}">${l}<b>${counts[k]}</b></button>`).join("")}</div>
      <select class="vv-select" id="hub-field" aria-label="Lọc theo lĩnh vực"><option value="">Mọi lĩnh vực</option>${fields.map(f => `<option value="${f}"${s.field === f ? " selected" : ""}>${escape(INDUSTRY_TONES[f]?.label ?? f)}</option>`).join("")}</select>
      <span class="vv-grow"></span>
      <div class="vv-seg hub-view" role="group" aria-label="Kiểu hiển thị"><button type="button" data-hub-view="grid" aria-pressed="${s.view === "grid"}" aria-label="Dạng lưới">${window.vv ? vv.icon('<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>') : "▦"}</button><button type="button" data-hub-view="list" aria-pressed="${s.view === "list"}" aria-label="Dạng danh sách">${window.vv ? vv.icon('<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>') : "☰"}</button></div>
    </div>
    <div class="hub-sections ${s.view === "list" && innerWidth > 640 ? "is-list" : ""}">
    ${!items.length ? `<div class="vv-empty hub-empty"><strong>Không có nhiệm vụ nào khớp bộ lọc.</strong><span>${s.status === "fav" && !counts.fav ? "Bấm biểu tượng ☆ trên thẻ nhiệm vụ để thêm vào Yêu thích." : "Thử bỏ bớt bộ lọc hoặc đổi từ khoá."}</span><button type="button" class="hub-btn" data-hub-reset>Xoá bộ lọc</button></div>` : ""}
    ${(!filtered || active.length) && items.length ? `<section class="hub-section" aria-labelledby="hub-active">
      <h2 id="hub-active">Đang thực hiện <span class="hub-count">${active.length}</span></h2>
      ${active.length ? `<div class="hub-list">${active.map(activeCard).join("")}</div>` : `
        <div class="vv-empty hub-empty"><strong>Bạn chưa có mô phỏng nào đang làm dở.</strong><span>${done.length ? "Mọi mô phỏng đã bắt đầu đều đã nộp. Thử thêm một nghề mới bên dưới nhé." : "Chọn một mô phỏng bên dưới, mỗi nhiệm vụ chỉ mất 15–20 phút."}</span></div>`}
    </section>` : ""}
    ${done.length ? `<section class="hub-section" aria-labelledby="hub-done">
      <h2 id="hub-done">Đã nộp <span class="hub-count">${done.length}</span><a class="hub-more" href="#/ho-so">Xem hồ sơ trải nghiệm →</a></h2>
      <div class="hub-grid two">${done.map(doneCard).join("")}</div>
    </section>` : ""}
    ${fresh.length ? `<section class="hub-section" aria-labelledby="hub-fresh">
      <h2 id="hub-fresh">Mô phỏng có thể thử <span class="hub-count">${fresh.length}</span></h2>
      <div class="hub-grid">${fresh.map(freshCard).join("")}</div>
    </section>` : ""}
    </div>
    <div class="hub-aside-row">
      <section class="hub-panel" aria-labelledby="hub-log"><h2 id="hub-log">Hoạt động gần đây</h2>
        ${log.length ? `<ol class="hub-log">${log.map(e => `<li><a href="${escape(e.url)}"><span class="hub-log-ic">${window.vv ? vv.icon(vv.I[e.ic]) : ""}</span><span><span>${e.text}</span>${e.sub ? `<small>${escape(e.sub)}</small>` : ""}</span><time>${ago(e.at)}</time></a></li>`).join("")}</ol>` : `<p class="hub-meta">Chưa có hoạt động nào. Bắt đầu một mô phỏng để thấy lịch sử ở đây.</p>`}
      </section>
      ${sugg.length ? `<section class="hub-panel" aria-labelledby="hub-sugg"><h2 id="hub-sugg">Gợi ý cho bạn</h2>
        <div class="hub-sugg">${sugg.map(x => `<a href="${escape(workspacePath(x.mission, x.role))}" style="--tone:${x.tone.hue};--tone-soft:${x.tone.soft}"><i aria-hidden="true"></i><span><strong>${escape(x.role.role_name)}</strong><small>${escape(x.reason)} · ${escape(x.mission.duration)}</small></span><span aria-hidden="true">→</span></a>`).join("")}</div>
      </section>` : ""}
    </div>
    <p class="hub-foot"><a class="text-link" href="#/career-map?playable">Khám phá thêm nghề trên Career Map →</a></p>`;
}
function rerenderHub(focusSel) {
  const y = scrollY;
  const caret = document.activeElement?.id === "hub-q" ? document.activeElement.selectionEnd : null;
  renderHub();
  scrollTo(0, y);
  const el = document.querySelector(focusSel);
  if (el) { el.focus({ preventScroll: true }); if (caret != null && el.setSelectionRange) el.setSelectionRange(caret, caret); }
}
document.addEventListener("input", e => {
  if (e.target.id === "hub-q") { hubState.q = e.target.value; rerenderHub("#hub-q"); }
  if (e.target.id === "pf-q") { pfState.q = e.target.value; rerenderProfile("#pf-q", true); }
});
document.addEventListener("change", e => {
  if (e.target.id === "hub-field") { hubState.field = e.target.value; rerenderHub("#hub-field"); }
  if (e.target.id === "pf-field") { pfState.field = e.target.value; rerenderProfile("#pf-field"); }
  if (e.target.id === "pf-sort") { pfState.sort = e.target.value; rerenderProfile("#pf-sort"); }
});

// ---------- #/ho-so ----------
// Feedback 18/11: đếm "đã nộp" theo mọi lượt chơi; bỏ ô tiêu chí Đạt; bấm phiên bản xem được chi tiết;
// mô phỏng đang làm xếp trên, đã nộp xếp dưới kèm ngày giờ nộp cuối; có Làm lại từ đầu ở mọi thẻ.
// Nâng cấp 19/11: hồ sơ cá nhân (ảnh, bìa, giới thiệu, kỹ năng, liên kết, CV), mức hoàn thiện,
// dự án nổi bật (sắp xếp được), yêu thích, tìm / lọc / sắp xếp bài làm, xem như người khác, xuất PDF, chia sẻ công khai.
const pickedVersion = {};
const pfState = { q: "", field: "", status: "all", sort: "recent" };
const fullDate = ts => ts ? new Date(ts).toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" }) : "";
const restartButton = (mission, role, cls = "restart-link") => `<button type="button" class="${cls}" data-restart="${escape(workspacePath(mission, role))}" data-name="${escape(role.role_name)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4.5h4.5"/></svg>Làm lại từ đầu</button>`;
const pfPrefs = () => window.vv ? vv.portfolio.get() : { favorites: [], featured: [] };
function pfSave(patch) { if (!window.vv) return; vv.portfolio.set({ ...pfPrefs(), ...patch }); }
function minutesOf(mission) {
  const st = readJSON(mission.storageKey);
  const id = st?.submission?.attemptId ?? st?.history?.at(-1)?.attemptId ?? st?.attemptId;
  return id && window.vv ? vv.duration(id) : 0;
}

function versionDetail(v, url) {
  const s = v.score;
  const head = `<p class="pf-vhead"><strong>${v.past ? `Lượt trước · ` : ""}Bản ${v.version}</strong><span>Nộp lúc ${escape(fullDate(v.at))}${v.mode ? ` · Chế độ ${escape(MODE_LABELS[v.mode] ?? v.mode)}` : ""}</span></p>`;
  if (v.pending) return `${head}<p class="hub-meta">AI đang chấm bản này. Mở Workspace để xem khi có kết quả.</p>`;
  if (!s) return `${head}<p class="hub-meta">Bản này chưa có kết quả AI${v.past ? "." : ". Mở trong Workspace để chấm lại."}</p>${v.past ? "" : `<a class="hub-link" href="${escape(url)}#result=${encodeURIComponent(v.id)}">Mở trong Workspace →</a>`}`;
  return `${head}
    <ul class="pf-criteria">${s.criteria.map(c => `<li class="${c.ok ? "ok" : "no"}"><span aria-hidden="true">${c.ok ? "✓" : "!"}</span>${escape(c.title)}<span class="sr-only">: ${c.ok ? "Đạt" : "Cần bổ sung"}</span></li>`).join("")}</ul>
    ${s.summary ? `<p class="pf-summary">${escape(s.summary)}</p>` : ""}
    ${s.priority && s.pass < s.total ? `<p class="pf-priority"><strong>Ưu tiên sửa:</strong> ${escape(s.priority)}</p>` : ""}
    <p class="pf-vfoot">${s.effort ? `<span>Mức độ đầu tư: <strong>${escape(s.effort)}</strong></span>` : ""}${v.past ? "" : `<a class="hub-link" href="${escape(url)}#result=${encodeURIComponent(v.id)}">Mở nhận xét đầy đủ →</a>`}</p>`;
}

// Ảnh chụp hồ sơ để xem như người khác / chia sẻ công khai / in: chỉ gồm thông tin người dùng đã nhập và bài đã nộp.
function profileSnapshot() {
  const p = window.vv ? vv.profile() : {};
  const prefs = pfPrefs();
  const items = playableMissions().filter(x => x.info.everSubmitted);
  const versions = items.reduce((n, x) => n + x.info.versions.length + x.info.pastVersions, 0);
  const best = x => { const all = [...x.info.past, ...x.info.versions].filter(v => v.score); return all.sort((a, b) => b.score.pass - a.score.pass || b.at - a.at)[0]; };
  const order = x => { const i = prefs.featured.indexOf(x.mission.storageKey); return i < 0 ? 999 : i; };
  const projects = items.sort((a, b) => order(a) - order(b) || b.info.lastSubmittedAt - a.info.lastSubmittedAt).map(x => {
    const v = best(x);
    return { title: x.role.role_name, company: x.mission.company, caseName: x.mission.caseName, field: x.tone.label, pass: v?.score.pass ?? 0, total: v?.score.total ?? 0, summary: v?.score.summary ?? "", versions: x.info.versions.length + x.info.pastVersions, at: x.info.lastSubmittedAt, minutes: minutesOf(x.mission), featured: prefs.featured.includes(x.mission.storageKey) };
  });
  return { name: window.vv ? vv.displayName() : "", avatar: window.vv ? vv.avatarSrc() : "", cover: p.cover ?? "", bio: p.bio ?? "", university: p.university ?? "", major: p.major ?? "", cohort: p.cohort ?? "", skills: p.skills ?? [], links: p.links ?? {}, stats: { submitted: items.length, fields: new Set(items.map(x => x.role.industry_id)).size, versions }, projects };
}

function renderProfile() {
  const page = document.querySelector("#profile");
  const items = playableMissions();
  const tried = items.filter(x => x.info.status !== "new" || x.info.everSubmitted);
  const everSubmitted = items.filter(x => x.info.everSubmitted);
  const versions = items.reduce((n, x) => n + x.info.versions.length + x.info.pastVersions, 0);
  const fields = new Set(tried.map(x => x.role.industry_id));
  const account = typeof readAccount === "function" ? readAccount() : null;
  const prefs = pfPrefs();
  const vvOk = !!window.vv;
  const p = vvOk ? vv.profile() : {};
  const name = vvOk ? vv.displayName() : account?.name?.trim();
  const comp = vvOk ? vv.completion() : null;

  const card = ({ id, mission, role, info, tone }, featured = false, idx = 0, total = 0) => {
    const url = workspacePath(mission, role);
    const all = [...info.past, ...info.versions].sort((a, b) => a.at - b.at);
    const chosen = all.find(v => v.id === pickedVersion[mission.storageKey]) ?? all.at(-1);
    const status = info.status === "progress"
      ? `<span class="hub-pill warn">${info.everSubmitted ? "Đang làm lại" : "Đang làm"}</span>`
      : `<span class="hub-pill ok">Đã nộp</span>`;
    const mins = minutesOf(mission);
    const when = info.lastSubmittedAt
      ? `<p class="pf-when"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>Nộp lần cuối ${escape(fullDate(info.lastSubmittedAt))}${mins ? ` · làm trong ${mins} phút` : ""}</p>`
      : info.updatedAt ? `<p class="pf-when">Cập nhật ${ago(info.updatedAt)}</p>` : "";
    const key = mission.storageKey;
    const isFav = prefs.favorites.includes(key), isFeat = prefs.featured.includes(key);
    return `<article class="pf-card${isFeat ? " is-featured" : ""}" style="--tone:${tone.hue};--tone-soft:${tone.soft}">
      <div class="pf-head">
        ${illus(mission, id)}
        <div class="pf-title">
          <div class="hub-chips">${isFeat ? `<span class="hub-pill feat">${vvOk ? vv.icon(vv.I.star) : ""}Nổi bật</span>` : ""}${chip(tone.label, tone)}${status}${info.mode ? chip("Chế độ " + MODE_LABELS[info.mode]) : ""}</div>
          <h3>${escape(role.role_name)}</h3>
          <p class="hub-sub">${escape(mission.company)} · ${escape(mission.caseName)}</p>
          ${when}
        </div>
        ${chosen ? scoreBadge(chosen.score, "lg") : ""}
      </div>
      <div class="pf-tools pf-noprint">
        <button type="button" class="pf-tool${isFav ? " on" : ""}" data-pf-fav="${escape(key)}" aria-pressed="${isFav}">${vvOk ? vv.icon(vv.I.star) : ""}${isFav ? "Đã yêu thích" : "Yêu thích"}</button>
        ${info.everSubmitted ? `<button type="button" class="pf-tool${isFeat ? " on" : ""}" data-pf-feat="${escape(key)}" aria-pressed="${isFeat}">${vvOk ? vv.icon(vv.I.pin) : ""}${isFeat ? "Bỏ nổi bật" : "Đánh dấu nổi bật"}</button>` : ""}
        ${featured && total > 1 ? `<span class="pf-order"><button type="button" class="vv-icon-btn sm" data-pf-move="${escape(key)}" data-dir="-1" ${idx === 0 ? "disabled" : ""} aria-label="Đưa ${escape(role.role_name)} lên trên">${vvOk ? vv.icon(vv.I.up) : "↑"}</button><button type="button" class="vv-icon-btn sm" data-pf-move="${escape(key)}" data-dir="1" ${idx === total - 1 ? "disabled" : ""} aria-label="Đưa ${escape(role.role_name)} xuống dưới">${vvOk ? vv.icon(vv.I.down) : "↓"}</button></span>` : ""}
      </div>
      ${info.status === "progress" ? progressBar(info) : ""}
      ${all.length ? `<div class="pf-vblock">
        <p class="pf-vtitle">${info.status === "progress" ? "Các bản đã nộp trước đó" : "Lịch sử phiên bản"} <span>· bấm để xem</span></p>
        <div class="pf-versions" role="group" aria-label="Chọn phiên bản để xem">${all.map(v => `<button type="button" class="pf-version${v.past ? " past" : ""}" aria-pressed="${v === chosen}" data-pick-version="${escape(v.id)}" data-key="${escape(key)}">${v.past ? "Lượt trước · " : ""}Bản ${v.version}<b>${v.score ? `${v.score.pass}/${v.score.total}` : v.pending ? "…" : "–"}</b></button>`).join("")}</div>
        <div class="pf-vdetail" aria-live="polite">${versionDetail(chosen, url)}</div>
      </div>` : ""}
      <div class="pf-interest pf-noprint">
        <span>Bạn thấy công việc này thế nào?</span>
        <div role="radiogroup" aria-label="Mức độ hứng thú với ${escape(role.role_name)}">${INTEREST_LEVELS.map(level => `<button type="button" role="radio" aria-checked="${info.interest === level}" data-interest="${escape(level)}" data-key="${escape(key)}">${escape(level)}</button>`).join("")}</div>
      </div>
      <div class="pf-actions pf-noprint">
        ${info.status === "progress"
          ? `<a class="hub-btn" href="${escape(url)}">Tiếp tục <span aria-hidden="true">→</span></a>`
          : `<a class="hub-btn" href="${escape(url)}#result">Xem nhận xét chi tiết</a><a class="hub-link" href="${escape(url)}">Sửa & nộp lại</a>`}
        <a class="hub-link" href="#/roles/${escape(role.role_slug)}">Về nghề này</a>
        ${restartButton(mission, role)}
      </div>
    </article>`;
  };

  // Phân cấp: Dự án nổi bật (thứ tự do người dùng chọn) → Bài làm (lọc / tìm / sắp xếp) → Nghề chưa thử.
  const featuredItems = prefs.featured.map(k => tried.find(x => x.mission.storageKey === k)).filter(Boolean);
  const scoreOf = x => (x.info.latest ? x.info.latest.pass / x.info.latest.total : -1);
  const s = pfState;
  const rest = tried.filter(x => !featuredItems.includes(x))
    .filter(x => matchItem(x, s.q) && (!s.field || x.role.industry_id === s.field) &&
      (s.status === "all" || (s.status === "fav" ? prefs.favorites.includes(x.mission.storageKey) : x.info.status === s.status)))
    .sort((a, b) => s.sort === "oldest" ? (a.info.lastSubmittedAt || a.info.updatedAt) - (b.info.lastSubmittedAt || b.info.updatedAt)
      : s.sort === "score" ? scoreOf(b) - scoreOf(a)
      : s.sort === "name" ? a.role.role_name.localeCompare(b.role.role_name, "vi")
      : (b.info.status === "progress") - (a.info.status === "progress") || Math.max(b.info.lastSubmittedAt, b.info.updatedAt) - Math.max(a.info.lastSubmittedAt, a.info.updatedAt));
  const counts = { all: tried.length - featuredItems.length, progress: tried.filter(x => !featuredItems.includes(x) && x.info.status === "progress").length, submitted: tried.filter(x => !featuredItems.includes(x) && x.info.status === "submitted").length, fav: tried.filter(x => !featuredItems.includes(x) && prefs.favorites.includes(x.mission.storageKey)).length };
  const untried = items.filter(x => !tried.includes(x));
  const headline = [p.major, p.university, p.cohort].filter(Boolean).join(" · ");
  const linkIcons = { linkedin: ["LinkedIn", '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>'], github: ["GitHub", '<path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.5 11.5 0 0 0-6 0C6.8 2.8 5.8 3.1 5.8 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>'], portfolio: ["Portfolio", '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'] };
  const shareOn = !!account?.shareId;

  page.innerHTML = `
    <nav class="vv-crumbs pf-noprint" aria-label="Breadcrumb"><a href="/">Trang chủ</a><span aria-hidden="true">/</span><span aria-current="page">Hồ sơ trải nghiệm</span></nav>
    <section class="pp-card pf-identity" aria-label="Hồ sơ cá nhân">
      <div class="pp-cover"${p.cover ? ` style="background-image:url('${escape(p.cover)}')"` : ""}>
        <button type="button" class="pf-cover-btn pf-noprint" data-vv="edit-profile" data-section="photo">${vvOk ? vv.icon(vv.I.camera) : ""}${p.cover ? "Đổi ảnh bìa" : "Thêm ảnh bìa"}</button>
      </div>
      <div class="pp-main">
        <div class="pp-who">
          <button type="button" class="pf-avatar-btn" data-vv="edit-profile" data-section="photo" aria-label="Đổi ảnh đại diện">${vvOk ? vv.avatarHTML() : ""}<span class="pf-avatar-cam pf-noprint" aria-hidden="true">${vvOk ? vv.icon(vv.I.camera) : ""}</span></button>
          <div class="pp-id">
            <p class="hub-eyebrow">Hồ sơ trải nghiệm</p>
            <h1>${name ? escape(name) : "Hành trình thử nghề của bạn"}</h1>
            <p>${headline ? escape(headline) : `<button type="button" class="vv-btn vv-btn-text pf-noprint" data-vv="edit-profile" data-section="info">+ Thêm trường, chuyên ngành, khoá học</button>`}</p>
          </div>
          <div class="pf-id-actions pf-noprint">
            <button type="button" class="vv-btn vv-btn-primary" data-vv="edit-profile" data-section="info">Chỉnh sửa hồ sơ</button>
            <button type="button" class="vv-btn vv-btn-ghost" data-pf="preview">Xem như người khác</button>
            <button type="button" class="vv-btn vv-btn-ghost" data-pf="share">${vvOk ? vv.icon(vv.I.share) : ""}${shareOn ? "Liên kết công khai" : "Chia sẻ hồ sơ"}</button>
            <button type="button" class="vv-btn vv-btn-ghost" data-pf="pdf">Xuất PDF</button>
          </div>
        </div>
        ${p.bio ? `<p class="pp-bio">${escape(p.bio)}</p>` : `<p class="pp-bio pf-empty-line pf-noprint"><button type="button" class="vv-btn vv-btn-text" data-vv="edit-profile" data-section="bio">+ Viết vài câu giới thiệu bản thân</button></p>`}
        ${p.skills?.length ? `<div class="pp-skills" aria-label="Kỹ năng">${p.skills.map(x => `<span>${escape(x)}</span>`).join("")}</div>` : ""}
        <div class="pp-links">
          ${Object.entries(linkIcons).filter(([k]) => p.links?.[k]).map(([k, [l, ic]]) => `<a href="${escape(p.links[k])}" target="_blank" rel="noopener noreferrer">${vvOk ? vv.icon(ic) : ""}${l}</a>`).join("")}
          ${p.cv ? `<button type="button" class="pf-cv-chip" data-pf="cv">${vvOk ? vv.icon(vv.I.file) : ""}CV: ${escape(p.cv.name)}</button>` : ""}
        </div>
      </div>
    </section>
    ${comp && comp.pct < 100 ? `<section class="pf-complete pf-noprint" aria-labelledby="pf-comp">
      <div class="pf-comp-head"><h2 id="pf-comp">Hồ sơ hoàn thiện <b>${comp.pct}%</b></h2><span class="hub-meta">Không bắt buộc, nhưng hồ sơ đầy đủ thuyết phục hơn khi chia sẻ.</span></div>
      <div class="pf-comp-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${comp.pct}" aria-label="Mức hoàn thiện hồ sơ"><i style="width:${comp.pct}%"></i></div>
      <div class="pf-comp-todo">${comp.missing.map(m => `<button type="button" data-vv="edit-profile" data-section="${m.go}">+ ${escape(m.label)} <small>${m.w}%</small></button>`).join("")}</div>
    </section>` : comp ? `<p class="pf-sync on pf-noprint"><span>Hồ sơ đã hoàn thiện 100%. Tuyệt vời!</span></p>` : ""}
    ${account?.id
      ? `<p class="pf-sync on pf-noprint"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5.5 14.5h9a3.5 3.5 0 0 0 .4-7A5 5 0 0 0 5.3 8.6a3 3 0 0 0 .2 5.9z"/><path d="m7.6 11 1.7 1.7 3.2-3.4"/></svg><span>Hồ sơ đang lưu vào tài khoản <strong>${escape(account.email)}</strong>, mở lại được trên mọi thiết bị.</span></p>`
      : `<div class="pf-sync pf-noprint"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5.5 14.5h9a3.5 3.5 0 0 0 .4-7A5 5 0 0 0 5.3 8.6a3 3 0 0 0 .2 5.9z"/><path d="M10 9.2v4M8.2 11l1.8-1.8 1.8 1.8"/></svg><span><strong>Hồ sơ đang chỉ lưu trên trình duyệt này.</strong> Đăng nhập để giữ tiến độ, bài nộp và nhận xét khi đổi máy.</span><button type="button" class="pf-sync-btn" data-account="login">Đăng nhập</button></div>`}
    <ul class="pf-stats" aria-label="Tổng quan hồ sơ">
      <li><b>${everSubmitted.length}<small>/${items.length}</small></b><span>mô phỏng đã nộp</span></li>
      <li><b>${tried.filter(x => x.info.status === "progress").length}</b><span>đang làm dở</span></li>
      <li><b>${versions}</b><span>phiên bản đã nộp</span></li>
      <li><b>${fields.size}<small>/${Object.keys(INDUSTRY_TONES).length}</small></b><span>lĩnh vực đã thử</span></li>
    </ul>
    ${tried.length ? "" : `<div class="vv-empty hub-empty"><strong>Portfolio của bạn đang trống.</strong><span>Hoàn thành một mô phỏng, kết quả và nhận xét sẽ tự xuất hiện ở đây.</span><a class="hub-btn" href="#/workspace">Chọn mô phỏng đầu tiên</a></div>`}
    ${featuredItems.length ? `<section class="hub-section pf-featured" aria-labelledby="pf-feat"><h2 id="pf-feat">Dự án nổi bật <span class="hub-count">${featuredItems.length}</span><span class="hub-meta pf-noprint">Dùng ↑ ↓ để sắp xếp thứ tự hiển thị khi chia sẻ.</span></h2><div class="pf-list">${featuredItems.map((x, i) => card(x, true, i, featuredItems.length)).join("")}</div></section>` : ""}
    ${tried.length > featuredItems.length ? `<section class="hub-section" aria-labelledby="pf-all"><h2 id="pf-all">${featuredItems.length ? "Bài làm khác" : "Bài làm gần đây"} <span class="hub-count">${rest.length}</span></h2>
      <div class="vv-toolbar pf-noprint">
        <label class="vv-field">${vvOk ? vv.icon(vv.I.search) : ""}<span class="vv-sr">Tìm bài làm</span><input id="pf-q" type="search" placeholder="Tìm bài làm…" value="${escape(s.q)}"></label>
        <div class="vv-seg" role="group" aria-label="Lọc trạng thái">${[["all", "Tất cả"], ["progress", "Đang làm"], ["submitted", "Đã nộp"], ["fav", "Yêu thích"]].map(([k, l]) => `<button type="button" data-pf-status="${k}" aria-pressed="${s.status === k}">${l}<b>${counts[k]}</b></button>`).join("")}</div>
        <select class="vv-select" id="pf-field" aria-label="Lọc theo lĩnh vực"><option value="">Mọi lĩnh vực</option>${[...fields].map(f => `<option value="${f}"${s.field === f ? " selected" : ""}>${escape(INDUSTRY_TONES[f]?.label ?? f)}</option>`).join("")}</select>
        <select class="vv-select" id="pf-sort" aria-label="Sắp xếp"><option value="recent"${s.sort === "recent" ? " selected" : ""}>Mới nhất</option><option value="oldest"${s.sort === "oldest" ? " selected" : ""}>Cũ nhất</option><option value="score"${s.sort === "score" ? " selected" : ""}>Điểm cao nhất</option><option value="name"${s.sort === "name" ? " selected" : ""}>Tên A–Z</option></select>
      </div>
      ${rest.length ? `<div class="pf-list">${rest.map(x => card(x)).join("")}</div>` : `<div class="vv-empty hub-empty"><strong>Không có bài làm khớp bộ lọc.</strong><span>${s.status === "fav" ? "Bấm “Yêu thích” trên thẻ bài làm để lưu vào đây." : "Thử đổi từ khoá hoặc bỏ bớt bộ lọc."}</span><button type="button" class="hub-btn" data-pf-reset>Xoá bộ lọc</button></div>`}
    </section>` : ""}
    ${untried.length ? `<section class="hub-section pf-noprint" aria-labelledby="pf-next"><h2 id="pf-next">Nghề bạn chưa thử</h2>
      <div class="pf-next">${untried.map(({ mission, role, tone }) => `<a href="${escape(workspacePath(mission, role))}" style="--tone:${tone.hue};--tone-soft:${tone.soft}"><i aria-hidden="true"></i><span><strong>${escape(role.role_name)}</strong><small>${escape(tone.label)} · ${escape(mission.duration)}</small></span><span aria-hidden="true">→</span></a>`).join("")}</div></section>` : ""}
    <p class="pf-note pf-noprint">${account?.id ? "Hồ sơ, ảnh và bài làm được lưu trên trình duyệt và đồng bộ với tài khoản." : "Hồ sơ được lưu trên trình duyệt này. Đổi máy hoặc xoá dữ liệu trình duyệt sẽ làm mất hồ sơ, trừ khi bạn đăng nhập."}</p>`;
}

// Vẽ lại hồ sơ mà không nhảy trang, rồi trả focus về đúng nút vừa bấm.
function rerenderProfile(selector, keepCaret = false) {
  const y = scrollY;
  const caret = keepCaret ? document.activeElement?.selectionEnd : null;
  renderProfile();
  scrollTo(0, y);
  const el = document.querySelector(selector);
  el?.focus({ preventScroll: true });
  if (caret != null && el?.setSelectionRange) el.setSelectionRange(caret, caret);
}

async function pfShare() {
  const account = typeof readAccount === "function" ? readAccount() : null;
  if (!account?.id) {
    window.vvToast?.("Đăng nhập để tạo liên kết hồ sơ công khai.", "info");
    document.querySelector('[data-account="login"]')?.click();
    return;
  }
  const post = (action, body) => fetch("/api/auth?action=" + action, { method: "POST", credentials: "same-origin", headers: { "x-vaoviec": "1", "Content-Type": "text/plain;charset=UTF-8" }, body: JSON.stringify(body) }).then(async r => { const d = await r.json().catch(() => ({})); if (!r.ok) throw new Error(d.error || "Không kết nối được máy chủ."); return d; });
  const dlg = document.createElement("dialog");
  dlg.className = "vv-dialog";
  const paint = shareId => {
    const url = shareId ? `${location.origin}/ho-so-cong-khai?id=${shareId}` : "";
    dlg.innerHTML = `<div class="vv-dialog-body"><header class="vv-dialog-head"><h2>${vv.icon(vv.I.share)} Chia sẻ hồ sơ</h2><button type="button" class="vv-icon-btn" data-x aria-label="Đóng">${vv.icon(vv.I.close)}</button></header>
      <div class="pf-share-body">${shareId ? `<p>Ai có liên kết này đều xem được hồ sơ công khai của bạn: ảnh, giới thiệu, kỹ năng, liên kết và các bài đã nộp kèm kết quả. <strong>Không gồm email và CV.</strong></p>
        <div class="pf-share-url"><input readonly value="${escape(url)}" aria-label="Liên kết công khai"><button type="button" class="vv-btn vv-btn-primary" data-act="copy">${vv.icon(vv.I.link)} Sao chép</button></div>
        <p class="vv-hint">Liên kết hiển thị hồ sơ tại thời điểm bấm “Cập nhật”. Sửa hồ sơ xong, bấm “Cập nhật nội dung” để người xem thấy bản mới.</p>`
        : `<p>Tạo một liên kết để gửi hồ sơ thực hành cho nhà tuyển dụng, giảng viên hoặc bạn bè. Liên kết chỉ hiện những gì bạn thấy trong “Xem như người khác”, <strong>không gồm email và CV</strong>.</p>`}</div>
      <p class="vv-error" role="alert" hidden></p>
      <footer class="vv-dialog-foot">${shareId ? `<button type="button" class="vv-btn vv-btn-text danger" data-act="off">Tắt chia sẻ</button><span></span><a class="vv-btn vv-btn-ghost" href="${escape(url)}" target="_blank" rel="noopener">Mở trang công khai</a><button type="button" class="vv-btn vv-btn-primary" data-act="publish">Cập nhật nội dung</button>`
        : `<span></span><button type="button" class="vv-btn vv-btn-ghost" data-x>Để sau</button><button type="button" class="vv-btn vv-btn-primary" data-act="publish">Tạo liên kết công khai</button>`}</footer></div>`;
  };
  paint(account.shareId);
  document.body.append(dlg);
  const close = () => { dlg.close(); dlg.remove(); };
  const fail = m => { const e = dlg.querySelector(".vv-error"); e.hidden = false; e.textContent = m; };
  dlg.addEventListener("cancel", e => { e.preventDefault(); close(); });
  dlg.addEventListener("click", async e => {
    if (e.target.closest("[data-x]")) return close();
    const act = e.target.closest("[data-act]")?.dataset.act;
    if (!act) return;
    const btn = e.target.closest("button");
    if (act === "copy") return vv.copy(dlg.querySelector("input").value, "Đã sao chép liên kết hồ sơ.");
    btn.disabled = true; btn.classList.add("is-busy");
    try {
      if (act === "publish") {
        const d = await post("share", { snapshot: profileSnapshot() });
        const acc = readAccount(); writeAccount({ ...acc, shareId: d.shareId }); refreshAccount();
        paint(d.shareId);
        window.vvToast?.("Đã cập nhật hồ sơ công khai.", "success");
      }
      if (act === "off") {
        const ok = await window.vvConfirm({ title: "Tắt chia sẻ hồ sơ?", message: "Liên kết hiện tại sẽ ngừng hoạt động. Bạn có thể tạo liên kết mới sau.", confirmLabel: "Tắt chia sẻ", tone: "danger" });
        if (!ok) { btn.disabled = false; btn.classList.remove("is-busy"); return; }
        await post("share-off", {});
        const acc = readAccount(); delete acc.shareId; writeAccount(acc); refreshAccount();
        paint("");
        window.vvToast?.("Đã tắt chia sẻ hồ sơ.", "success");
      }
    } catch (ex) { fail(ex.message); btn.disabled = false; btn.classList.remove("is-busy"); }
  });
  dlg.showModal();
}
function pfPreview() {
  const dlg = document.createElement("dialog");
  dlg.className = "vv-dialog vv-preview";
  dlg.innerHTML = `<div class="vv-dialog-body"><header class="vv-dialog-head"><h2>Xem như người khác</h2><button type="button" class="vv-icon-btn" data-x aria-label="Đóng">${vv.icon(vv.I.close)}</button></header>
    <div class="vv-dialog-scroll"><p class="pp-note">Đây là cách người khác thấy hồ sơ khi bạn chia sẻ liên kết công khai hoặc xuất PDF. Email và CV không hiển thị.</p>${vv.publicCard(profileSnapshot())}</div>
    <footer class="vv-dialog-foot"><button type="button" class="vv-btn vv-btn-ghost" data-vv="edit-profile" data-section="info">Chỉnh sửa hồ sơ</button><button type="button" class="vv-btn vv-btn-primary" data-x>Đóng</button></footer></div>`;
  document.body.append(dlg);
  const close = () => { dlg.close(); dlg.remove(); };
  dlg.addEventListener("click", e => { if (e.target.closest("[data-x], [data-vv]")) close(); });
  dlg.addEventListener("cancel", e => { e.preventDefault(); close(); });
  dlg.showModal();
}

document.addEventListener("click", event => {
  // Workspace: lọc, chế độ xem, yêu thích.
  const hs = event.target.closest("[data-hub-status]");
  if (hs) { hubState.status = hs.dataset.hubStatus; rerenderHub(`[data-hub-status="${hs.dataset.hubStatus}"]`); return; }
  const hv = event.target.closest("[data-hub-view]");
  if (hv) { hubState.view = hv.dataset.hubView; try { localStorage.setItem("vaoviec-hub-view", hubState.view); } catch {} rerenderHub(`[data-hub-view="${hubState.view}"]`); return; }
  if (event.target.closest("[data-hub-reset]")) { Object.assign(hubState, { q: "", status: "all", field: "" }); rerenderHub("#hub-q"); return; }
  const fm = event.target.closest("[data-fav-mission]");
  if (fm && window.vv) {
    const on = vv.fav("mission").toggle(fm.dataset.favMission);
    window.vvToast?.(on ? "Đã thêm vào nhiệm vụ yêu thích." : "Đã bỏ khỏi yêu thích.", "success", 2200);
    if (location.hash === "#/workspace") rerenderHub(`[data-fav-mission="${CSS.escape(fm.dataset.favMission)}"]`);
    return;
  }
  // Hồ sơ: yêu thích, nổi bật, sắp xếp nổi bật, lọc, xem trước, chia sẻ, PDF, CV.
  const pfs = event.target.closest("[data-pf-status]");
  if (pfs) { pfState.status = pfs.dataset.pfStatus; rerenderProfile(`[data-pf-status="${pfs.dataset.pfStatus}"]`); return; }
  if (event.target.closest("[data-pf-reset]")) { Object.assign(pfState, { q: "", field: "", status: "all" }); rerenderProfile("#pf-q"); return; }
  const pff = event.target.closest("[data-pf-fav]");
  if (pff) {
    const k = pff.dataset.pfFav, list = pfPrefs().favorites, on = !list.includes(k);
    pfSave({ favorites: on ? [...list, k] : list.filter(x => x !== k) });
    window.vvToast?.(on ? "Đã đánh dấu yêu thích." : "Đã bỏ yêu thích.", "success", 2200);
    rerenderProfile(`[data-pf-fav="${CSS.escape(k)}"]`); return;
  }
  const pft = event.target.closest("[data-pf-feat]");
  if (pft) {
    const k = pft.dataset.pfFeat, list = pfPrefs().featured, on = !list.includes(k);
    pfSave({ featured: on ? [...list, k] : list.filter(x => x !== k) });
    window.vvToast?.(on ? "Đã thêm vào Dự án nổi bật." : "Đã bỏ khỏi Dự án nổi bật.", "success", 2200);
    rerenderProfile(`[data-pf-feat="${CSS.escape(k)}"]`); return;
  }
  const mv = event.target.closest("[data-pf-move]");
  if (mv) {
    const k = mv.dataset.pfMove, list = [...pfPrefs().featured], i = list.indexOf(k), j = i + Number(mv.dataset.dir);
    if (i < 0 || j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j], list[i]];
    pfSave({ featured: list });
    rerenderProfile(`[data-pf-move="${CSS.escape(k)}"][data-dir="${mv.dataset.dir}"]`); return;
  }
  const pf = event.target.closest("[data-pf]");
  if (pf && window.vv) {
    const a = pf.dataset.pf;
    if (a === "preview") pfPreview();
    if (a === "share") pfShare();
    if (a === "cv") vv.cv.preview();
    if (a === "pdf") { window.vvToast?.("Chọn “Lưu dưới dạng PDF” trong hộp in để xuất hồ sơ.", "info", 5000); setTimeout(() => print(), 300); }
    return;
  }
  const pick = event.target.closest("#profile [data-pick-version]");
  if (pick) {
    pickedVersion[pick.dataset.key] = pick.dataset.pickVersion;
    rerenderProfile(`#profile [data-key="${CSS.escape(pick.dataset.key)}"][data-pick-version="${CSS.escape(pick.dataset.pickVersion)}"]`);
    return;
  }
  const btn = event.target.closest("#profile [data-interest]");
  if (btn) {
    const key = btn.dataset.key + "-interest";
    const level = btn.dataset.interest;
    const current = readJSON(key)?.level;
    try {
      if (current === level) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify({ level, updatedAt: Date.now() }));
    } catch { /* Trình duyệt chặn lưu. */ }
    rerenderProfile(`#profile [data-key="${CSS.escape(btn.dataset.key)}"][data-interest="${CSS.escape(level)}"]`);
    window.vvToast?.(current === level ? "Đã bỏ chọn mức hứng thú." : "Đã ghi nhận cảm nhận của bạn.", "success");
    return;
  }
  // Làm lại từ đầu (Career Map, trang Workspace, Hồ sơ): xác nhận ở đây, Workspace nhận #restart và bắt đầu lượt mới.
  const restart = event.target.closest("[data-restart]");
  if (restart) {
    const go = () => { location.href = restart.dataset.restart + "#restart"; };
    const ask = window.vvConfirm
      ? window.vvConfirm({ title: "Làm lại từ đầu?", message: `Bài đang làm của ${restart.dataset.name} sẽ được xoá để bạn bắt đầu lại từ đầu. Các bản đã nộp vẫn được giữ trong Hồ sơ trải nghiệm.`, confirmLabel: "Làm lại từ đầu", tone: "danger" })
      : Promise.resolve(confirm("Làm lại từ đầu? Các bản đã nộp vẫn được giữ trong Hồ sơ trải nghiệm."));
    ask.then(ok => { if (ok) go(); });
  }
});

// Đăng nhập/đăng xuất/sửa hồ sơ/đồng bộ: vẽ lại trang đang mở.
const redrawOpenPage = () => { if (location.hash === "#/ho-so") rerenderProfile("body"); if (location.hash === "#/workspace") rerenderHub("body"); };
addEventListener("vaoviec:account", redrawOpenPage);
addEventListener("vaoviec:profile", redrawOpenPage);
