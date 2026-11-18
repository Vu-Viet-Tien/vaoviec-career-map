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
function renderHub() {
  const hub = document.querySelector("#hub");
  const items = playableMissions();
  const active = items.filter(x => x.info.status === "progress").sort((a, b) => b.info.updatedAt - a.info.updatedAt);
  const done = items.filter(x => x.info.status === "submitted").sort((a, b) => b.info.updatedAt - a.info.updatedAt);
  const fresh = items.filter(x => x.info.status === "new");
  const activeCard = ({ id, mission, role, info, tone }) => `
    <article class="hub-card hub-active" style="--tone:${tone.hue};--tone-soft:${tone.soft}">
      <a class="hub-art" href="${escape(workspacePath(mission, role))}" tabindex="-1" aria-hidden="true">${illus(mission, id)}</a>
      <div class="hub-body">
        <div class="hub-chips">${chip(tone.label, tone)}${info.mode ? chip("Chế độ " + MODE_LABELS[info.mode]) : ""}</div>
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
        <div class="hub-chips">${chip(tone.label, tone)}</div>
        <h3><a href="${escape(workspacePath(mission, role))}#result">${escape(role.role_name)}</a></h3>
        <p class="hub-sub">${escape(mission.caseName)}</p>
        <p class="hub-meta">${info.versions.length} phiên bản · nộp lần cuối ${escape(fullDate(info.lastSubmittedAt || info.updatedAt))}</p>
      </div>
      <div class="hub-actions"><a class="hub-btn" href="${escape(workspacePath(mission, role))}#result">Xem kết quả</a><a class="hub-link" href="${escape(workspacePath(mission, role))}">Sửa & nộp lại</a>${restartButton(mission, role)}</div>
    </article>`;
  const freshCard = ({ id, mission, role, tone }) => `
    <a class="hub-card hub-fresh" href="${escape(workspacePath(mission, role))}" style="--tone:${tone.hue};--tone-soft:${tone.soft}">
      ${illus(mission, id)}
      <div class="hub-chips">${chip(tone.label, tone)}<span class="hub-time">⏱ ${escape(mission.duration)}</span></div>
      <h3>${escape(role.role_name)}</h3>
      <p>${escape(mission.description)}</p>
      <span class="hub-start">Bắt đầu mô phỏng <span aria-hidden="true">→</span></span>
    </a>`;
  hub.innerHTML = `
    <div class="hub-hero">
      <p class="hub-eyebrow">Workspace</p>
      <h1>Bàn làm việc của bạn</h1>
      <p class="hub-lead">Tiếp tục các mô phỏng đang làm dở, xem lại kết quả hoặc thử sức với một nghề mới.</p>
      <ul class="hub-stats" aria-label="Tổng quan">
        <li><b>${active.length}</b><span>đang làm</span></li>
        <li><b>${done.length}</b><span>đã nộp</span></li>
        <li><b>${fresh.length}</b><span>chưa thử</span></li>
      </ul>
    </div>
    <section class="hub-section" aria-labelledby="hub-active">
      <h2 id="hub-active">Đang thực hiện <span class="hub-count">${active.length}</span></h2>
      ${active.length ? `<div class="hub-list">${active.map(activeCard).join("")}</div>` : `
        <div class="vv-empty hub-empty"><strong>Bạn chưa có mô phỏng nào đang làm dở.</strong><span>${done.length ? "Mọi mô phỏng đã bắt đầu đều đã nộp. Thử thêm một nghề mới bên dưới nhé." : "Chọn một mô phỏng bên dưới, mỗi nhiệm vụ chỉ mất 15–20 phút."}</span></div>`}
    </section>
    ${done.length ? `<section class="hub-section" aria-labelledby="hub-done">
      <h2 id="hub-done">Đã nộp <span class="hub-count">${done.length}</span><a class="hub-more" href="#/ho-so">Xem hồ sơ trải nghiệm →</a></h2>
      <div class="hub-grid two">${done.map(doneCard).join("")}</div>
    </section>` : ""}
    ${fresh.length ? `<section class="hub-section" aria-labelledby="hub-fresh">
      <h2 id="hub-fresh">Mô phỏng có thể thử <span class="hub-count">${fresh.length}</span></h2>
      <div class="hub-grid">${fresh.map(freshCard).join("")}</div>
    </section>` : ""}
    <p class="hub-foot"><a class="text-link" href="#/career-map?playable">Khám phá thêm nghề trên Career Map →</a></p>`;
}

// ---------- #/ho-so ----------
// Feedback 18/11: đếm "đã nộp" theo mọi lượt chơi; bỏ ô tiêu chí Đạt; bấm phiên bản xem được chi tiết;
// mô phỏng đang làm xếp trên, đã nộp xếp dưới kèm ngày giờ nộp cuối; có Làm lại từ đầu ở mọi thẻ.
const pickedVersion = {};
const fullDate = ts => ts ? new Date(ts).toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" }) : "";
const restartButton = (mission, role, cls = "restart-link") => `<button type="button" class="${cls}" data-restart="${escape(workspacePath(mission, role))}" data-name="${escape(role.role_name)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4.5h4.5"/></svg>Làm lại từ đầu</button>`;

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

function renderProfile() {
  const page = document.querySelector("#profile");
  const items = playableMissions();
  const tried = items.filter(x => x.info.status !== "new" || x.info.everSubmitted);
  const everSubmitted = items.filter(x => x.info.everSubmitted);
  const active = tried.filter(x => x.info.status === "progress").sort((a, b) => b.info.updatedAt - a.info.updatedAt);
  const done = tried.filter(x => x.info.status !== "progress").sort((a, b) => b.info.lastSubmittedAt - a.info.lastSubmittedAt);
  const versions = items.reduce((n, x) => n + x.info.versions.length + x.info.pastVersions, 0);
  const fields = new Set(tried.map(x => x.role.industry_id));
  const account = typeof readAccount === "function" ? readAccount() : null;
  const name = account?.name?.trim();
  const initials = name ? name.split(/\s+/).map(w => w[0]).slice(-2).join("").toUpperCase() : "";

  const card = ({ id, mission, role, info, tone }) => {
    const url = workspacePath(mission, role);
    const all = [...info.past, ...info.versions].sort((a, b) => a.at - b.at);
    const chosen = all.find(v => v.id === pickedVersion[mission.storageKey]) ?? all.at(-1);
    const status = info.status === "progress"
      ? `<span class="hub-pill warn">${info.everSubmitted ? "Đang làm lại" : "Đang làm"}</span>`
      : `<span class="hub-pill ok">Đã nộp</span>`;
    const when = info.lastSubmittedAt
      ? `<p class="pf-when"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>Nộp lần cuối ${escape(fullDate(info.lastSubmittedAt))}</p>`
      : info.updatedAt ? `<p class="pf-when">Cập nhật ${ago(info.updatedAt)}</p>` : "";
    return `<article class="pf-card" style="--tone:${tone.hue};--tone-soft:${tone.soft}">
      <div class="pf-head">
        ${illus(mission, id)}
        <div class="pf-title">
          <div class="hub-chips">${chip(tone.label, tone)}${status}${info.mode ? chip("Chế độ " + MODE_LABELS[info.mode]) : ""}</div>
          <h3>${escape(role.role_name)}</h3>
          <p class="hub-sub">${escape(mission.company)} · ${escape(mission.caseName)}</p>
          ${when}
        </div>
        ${chosen ? scoreBadge(chosen.score, "lg") : ""}
      </div>
      ${info.status === "progress" ? progressBar(info) : ""}
      ${all.length ? `<div class="pf-vblock">
        <p class="pf-vtitle">${info.status === "progress" ? "Các bản đã nộp trước đó" : "Các phiên bản đã nộp"} <span>· bấm để xem</span></p>
        <div class="pf-versions" role="group" aria-label="Chọn phiên bản để xem">${all.map(v => `<button type="button" class="pf-version${v.past ? " past" : ""}" aria-pressed="${v === chosen}" data-pick-version="${escape(v.id)}" data-key="${escape(mission.storageKey)}">${v.past ? "Lượt trước · " : ""}Bản ${v.version}<b>${v.score ? `${v.score.pass}/${v.score.total}` : v.pending ? "…" : "–"}</b></button>`).join("")}</div>
        <div class="pf-vdetail" aria-live="polite">${versionDetail(chosen, url)}</div>
      </div>` : ""}
      <div class="pf-interest">
        <span>Bạn thấy công việc này thế nào?</span>
        <div role="radiogroup" aria-label="Mức độ hứng thú với ${escape(role.role_name)}">${INTEREST_LEVELS.map(level => `<button type="button" role="radio" aria-checked="${info.interest === level}" data-interest="${escape(level)}" data-key="${escape(mission.storageKey)}">${escape(level)}</button>`).join("")}</div>
      </div>
      <div class="pf-actions">
        ${info.status === "progress"
          ? `<a class="hub-btn" href="${escape(url)}">Tiếp tục <span aria-hidden="true">→</span></a>`
          : `<a class="hub-btn" href="${escape(url)}#result">Xem nhận xét chi tiết</a><a class="hub-link" href="${escape(url)}">Sửa & nộp lại</a>`}
        <a class="hub-link" href="#/roles/${escape(role.role_slug)}">Về nghề này</a>
        ${restartButton(mission, role)}
      </div>
    </article>`;
  };
  const untried = items.filter(x => !tried.includes(x));
  page.innerHTML = `
    <div class="pf-hero">
      <div class="pf-avatar" aria-hidden="true">${initials ? escape(initials) : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></svg>`}</div>
      <div>
        <p class="hub-eyebrow">Hồ sơ trải nghiệm</p>
        <h1>${name ? escape(name) : "Hành trình thử nghề của bạn"}</h1>
        <p class="hub-lead">Tổng hợp mọi mô phỏng bạn đã làm: tiến độ, từng phiên bản đã nộp kèm nhận xét, và cảm nhận của bạn về từng nghề.</p>
      </div>
    </div>
    ${account?.id
      ? `<p class="pf-sync on"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5.5 14.5h9a3.5 3.5 0 0 0 .4-7A5 5 0 0 0 5.3 8.6a3 3 0 0 0 .2 5.9z"/><path d="m7.6 11 1.7 1.7 3.2-3.4"/></svg><span>Hồ sơ đang lưu vào tài khoản <strong>${escape(account.email)}</strong>, mở lại được trên mọi thiết bị.</span></p>`
      : `<div class="pf-sync"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5.5 14.5h9a3.5 3.5 0 0 0 .4-7A5 5 0 0 0 5.3 8.6a3 3 0 0 0 .2 5.9z"/><path d="M10 9.2v4M8.2 11l1.8-1.8 1.8 1.8"/></svg><span><strong>Hồ sơ đang chỉ lưu trên trình duyệt này.</strong> Đăng nhập để giữ tiến độ, bài nộp và nhận xét khi đổi máy.</span><button type="button" class="pf-sync-btn" data-account="login">Đăng nhập</button></div>`}
    <ul class="pf-stats" aria-label="Tổng quan hồ sơ">
      <li><b>${everSubmitted.length}<small>/${items.length}</small></b><span>mô phỏng đã nộp</span></li>
      <li><b>${active.length}</b><span>đang làm dở</span></li>
      <li><b>${versions}</b><span>phiên bản đã nộp</span></li>
      <li><b>${fields.size}<small>/${Object.keys(INDUSTRY_TONES).length}</small></b><span>lĩnh vực đã thử</span></li>
    </ul>
    ${tried.length ? "" : `<div class="vv-empty hub-empty"><strong>Hồ sơ của bạn đang trống.</strong><span>Hoàn thành một mô phỏng, kết quả và nhận xét sẽ tự xuất hiện ở đây.</span><a class="hub-btn" href="#/workspace">Chọn mô phỏng đầu tiên</a></div>`}
    ${active.length ? `<section class="hub-section" aria-labelledby="pf-active"><h2 id="pf-active">Đang làm dở <span class="hub-count">${active.length}</span></h2><div class="pf-list">${active.map(card).join("")}</div></section>` : ""}
    ${done.length ? `<section class="hub-section" aria-labelledby="pf-done"><h2 id="pf-done">Đã nộp <span class="hub-count">${done.length}</span></h2><div class="pf-list">${done.map(card).join("")}</div></section>` : ""}
    ${untried.length ? `<section class="hub-section" aria-labelledby="pf-next"><h2 id="pf-next">Nghề bạn chưa thử</h2>
      <div class="pf-next">${untried.map(({ mission, role, tone }) => `<a href="${escape(workspacePath(mission, role))}" style="--tone:${tone.hue};--tone-soft:${tone.soft}"><i aria-hidden="true"></i><span><strong>${escape(role.role_name)}</strong><small>${escape(tone.label)} · ${escape(mission.duration)}</small></span><span aria-hidden="true">→</span></a>`).join("")}</div></section>` : ""}
    <p class="pf-note">Hồ sơ được lưu trên trình duyệt này. Đổi máy hoặc xoá dữ liệu trình duyệt sẽ làm mất hồ sơ.</p>`;
}

// Vẽ lại hồ sơ mà không nhảy trang, rồi trả focus về đúng nút vừa bấm.
function rerenderProfile(selector) {
  const y = scrollY;
  renderProfile();
  scrollTo(0, y);
  document.querySelector(selector)?.focus({ preventScroll: true });
}

document.addEventListener("click", event => {
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

// Đăng nhập/đăng xuất/sửa tên: vẽ lại trang Hồ sơ nếu đang mở.
addEventListener("vaoviec:account", () => { if (location.hash === "#/ho-so") renderProfile(); });
