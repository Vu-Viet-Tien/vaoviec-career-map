const missions = {
  MISSION_001: {
    company: "NOVA Commerce",
    caseName: "Tuyển nhân viên CSKH ca chiều",
    description: "Hỗ trợ tuyển nhân viên Chăm sóc khách hàng. Đọc JD, đăng tin, sàng lọc CV và đề xuất ứng viên phỏng vấn.",
    duration: "10–15 phút",
    deliverable: "Tối đa 3 ứng viên đề xuất phỏng vấn, mỗi người kèm lý do, lịch làm đã xác nhận và một câu hỏi phỏng vấn.",
    url: "/workspace/talent-acquisition",
    // Trùng khóa lưu tiến độ trong workspace/talent-acquisition-assets/app.js.
    storageKey: "vaoviec-workspace-mission-001-v1"
  },
  MISSION_002: {
    company: "NOVA Commerce",
    caseName: "Truyền thông tuyển CSKH",
    description: "Tin tuyển CSKH đăng 3 tuần chỉ có 11 hồ sơ. Đọc dữ liệu nhân viên và ứng viên, chọn 3 trụ cột EVP, viết bài đăng tuyển dụng, chọn kênh và chỉ số đo.",
    duration: "15–20 phút",
    deliverable: "3 trụ cột EVP có bằng chứng, 1 bài đăng tuyển dụng, kế hoạch kênh kèm 2 chỉ số và khuyến nghị cho trưởng nhóm.",
    url: "/workspace/employer-branding",
    // Trùng khóa lưu tiến độ trong workspace/employer-branding-assets/app.js.
    storageKey: "vaoviec-workspace-mission-002-v1"
  },
  MISSION_003: {
    company: "NOVA Commerce",
    caseName: "Quà Tết doanh nghiệp",
    description: "Mùa quà Tết doanh nghiệp: sàng lọc 8 khách hàng tiềm năng, chọn 3 lead ưu tiên, viết email tiếp cận và lên kế hoạch theo dõi để ký 2 đơn trước 20/12.",
    duration: "15–20 phút",
    deliverable: "3 lead ưu tiên kèm lý do, 1 email tiếp cận cá nhân hoá, kế hoạch theo dõi kèm 2 chỉ số và khuyến nghị cho trưởng nhóm.",
    url: "/workspace/business-development",
    // Trùng CASE.ui.storageKey trong workspace/business-development-assets/case.js.
    storageKey: "vaoviec-workspace-mission-003-v1"
  },
  MISSION_004: {
    company: "NOVA Commerce",
    caseName: "Ra mắt nồi chiên AirFry 5L",
    description: "Ra mắt nồi chiên AirFry 5L: đọc dữ liệu từ khoá và câu hỏi của khách, chọn 3 chủ đề nội dung, viết bài đăng đầu tiên và chọn kênh phân phối để bán 300 nồi trong tháng 12.",
    duration: "15–20 phút",
    deliverable: "3 chủ đề nội dung có căn cứ, 1 bài đăng đúng thông tin sản phẩm, kế hoạch kênh kèm 2 chỉ số và khuyến nghị cho trưởng nhóm.",
    url: "/workspace/content-marketing",
    // Trùng CASE.ui.storageKey trong workspace/content-marketing-assets/case.js.
    storageKey: "vaoviec-workspace-mission-004-v1"
  },
  MISSION_005: {
    company: "NOVA Commerce",
    caseName: "Doanh thu tuần 45 giảm 18%",
    description: "Doanh thu tuần 45 giảm 18%: đọc dữ liệu theo kênh, phễu mua hàng và nhật ký hệ thống, chọn 3 phát hiện có bằng chứng, viết email báo cáo và đề xuất chỉ số theo dõi.",
    duration: "15–20 phút",
    deliverable: "3 phát hiện có số liệu chứng minh, 1 email báo cáo ngắn, các bước tiếp theo kèm 2 chỉ số theo dõi và khuyến nghị cho trưởng phòng.",
    url: "/workspace/data-analyst",
    // Trùng CASE.ui.storageKey trong workspace/data-analyst-assets/case.js.
    storageKey: "vaoviec-workspace-mission-005-v1"
  },
  MISSION_006: {
    company: "NOVA Commerce",
    caseName: "Chênh lệch ngân sách tháng 10",
    description: "Tháng 10 lỗ 20 triệu thay vì lãi 350 triệu: đọc báo cáo chênh lệch và ghi chú các phòng, chọn 3 khoản quan trọng nhất, viết bản ghi nhớ và đề xuất hành động bảo vệ lợi nhuận quý IV.",
    duration: "15–20 phút",
    deliverable: "3 khoản chênh lệch kèm nguyên nhân và tính lặp lại, 1 bản ghi nhớ cho Giám đốc Tài chính, hành động đề xuất kèm 2 chỉ số và ước tính tác động.",
    url: "/workspace/fpa-analyst",
    // Trùng CASE.ui.storageKey trong workspace/fpa-analyst-assets/case.js.
    storageKey: "vaoviec-workspace-mission-006-v1"
  }
};

// Đọc tiến độ Workspace đã lưu trên trình duyệt (mỗi Workspace tự ghi updatedAt và progress khi lưu).
const readJSON = key => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
const scoreOf = sub => {
  const r = sub?.ai?.status === "done" ? sub.ai.review : null;
  if (!r) return null;
  return {
    pass: r.criteria.filter(c => c.status === "Đạt").length,
    total: r.criteria.length,
    effort: r.effort_level ?? "",
    criteria: r.criteria.map(c => ({ ok: c.status === "Đạt", title: r.criteria_titles?.[c.id] ?? c.id }))
  };
};
function missionInfo(mission) {
  const state = readJSON(mission.storageKey);
  const subs = state ? [...(state.history ?? []), ...(state.submission ? [state.submission] : [])] : [];
  // Talent Acquisition cất các lượt cũ (khi bấm "Chơi lại case") ở khoá -portfolio.
  const pastRuns = readJSON(mission.storageKey + "-portfolio") ?? [];
  const pastVersions = pastRuns.reduce((n, run) => n + (run.versions?.length ?? 1), 0);
  const started = !!(state && (state.introSeen || state.posts?.length || Object.keys(state.people ?? {}).length));
  const status = !state ? "new" : state.submission ? "submitted" : started ? "progress" : "new";
  const versions = subs.map((sub, i) => ({ version: sub.version ?? i + 1, at: sub.at ?? sub.submittedAt ?? 0, score: scoreOf(sub), pending: sub.ai?.status === "pending" }));
  return {
    status,
    mode: state?.mode ?? "",
    updatedAt: state?.updatedAt ?? state?.submission?.at ?? state?.submission?.submittedAt ?? 0,
    progress: state?.progress ?? null,
    versions,
    pastVersions,
    latest: scoreOf(state?.submission),
    interest: readJSON(mission.storageKey + "-interest")?.level ?? ""
  };
}
const missionProgress = mission => missionInfo(mission).status;

// Nút chính của nhiệm vụ theo tiến độ, dùng chung cho Chi tiết nghề và Trang chủ.
function missionActions(mission, role) {
  const url = workspacePath(mission, role);
  const status = missionProgress(mission);
  if (status === "submitted") return { status, label: "Xem kết quả", url: url + "#result", secondary: { label: "Mở lại Workspace", url } };
  if (status === "progress") return { status, label: "Tiếp tục trải nghiệm", url };
  return { status, label: "Trải nghiệm thử", url };
}

const { branches, roles } = careerData;
const industries = new Map(branches.map(branch => [branch.industry_id, branch.industry_group]));
const rolesById = new Map(roles.map(role => [role.role_id, role]));
const levels = { intern: "Thực tập", junior: "Đầu sự nghiệp", experienced: "Có kinh nghiệm" };

const home = document.querySelector("#home");
const explore = document.querySelector("#explore");
const tabs = document.querySelector("#tabs");
const tree = document.querySelector("#tree");
const search = document.querySelector("#search");
const detail = document.querySelector("#detail");

let industry = industries.keys().next().value;
// Bộ lọc "Có thể trải nghiệm" (feedback 17/11): chỉ hiện nghề đã có mô phỏng, gom theo lĩnh vực.
let playableOnly = false;
const isPlayable = role => role.simulation_status === "available" && !!missions[role.mission_id];
let selected = null;
let focusRole = false;

const escape = value => String(value ?? "").replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[character]);

const normalize = value => String(value ?? "").toLowerCase().normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/\s+/g, " ").trim();
const careerMapPath = "#/career-map";
const rolePath = role => "#/roles/" + role.role_slug;
const workspacePath = (mission, role) => mission.url + (role ? "?from=" + encodeURIComponent(role.role_slug) : "");
const defaultMission = Object.values(missions)[0];

const words = value => normalize(value).split(/[^a-z0-9&]+/).filter(Boolean);

// Từ khóa ngắn (TA, DA, BA, C&B…) chỉ khớp nguyên từ, tránh "ta" khớp nhầm "tài", "tạo".
// Từ khóa dài khớp khi mọi từ trong câu tìm là phần đầu của một từ trong tên, tên tiếng Việt, từ khóa, nhánh hoặc lĩnh vực.
function matchesRole(role, query) {
  const queryWords = words(query);
  if (!queryWords.length) return true;
  if (queryWords.length === 1 && queryWords[0].length <= 3) {
    const short = queryWords[0];
    return role.search_aliases.some(alias => normalize(alias) === short) ||
      [role.role_name, role.role_name_vi, ...role.search_aliases].some(value => words(value).includes(short));
  }
  const haystack = [role.role_name, role.role_name_vi, role.industry_group, role.function, ...role.search_aliases].flatMap(words);
  return queryWords.every(word => haystack.some(token => token.startsWith(word)));
}

function treeMarkup(industryId, matches) {
  const groups = branches.filter(branch => branch.industry_id === industryId)
    .map(branch => ({ branch, roles: matches.filter(role => role.function_id === branch.function_id) }))
    .filter(group => group.roles.length);
  return `
    <div class="tree">
      <div class="root">${escape(industries.get(industryId))}</div>
      <div class="groups">${groups.map(group => `
        <div class="group">
          <div class="branch">${escape(group.branch.function)}</div>
          <div class="roles">${group.roles.map(role => `
            <a class="role${role === selected ? " selected" : ""}${isPlayable(role) ? " playable" : ""}" href="${escape(rolePath(role))}"
              data-role="${escape(role.role_id)}"${role === selected ? ' aria-current="true"' : ""}>
              ${escape(role.role_name)}${isPlayable(role) ? '<span class="role-play" title="Có thể trải nghiệm"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2.6v6.8L9.4 6Z"/></svg><span class="sr-only"> (có thể trải nghiệm)</span></span>' : ""}
            </a>`).join("")}</div>
        </div>`).join("")}</div>
    </div>`;
}

function renderTree() {
  const query = search.value.trim();
  renderFilter();
  if (!normalize(query) && !playableOnly) {
    tree.innerHTML = treeMarkup(industry, roles.filter(role => role.industry_id === industry));
    drawTreeLinks();
    return;
  }

  // Có từ khóa hoặc đang lọc: tìm trên toàn bộ danh mục, gom kết quả theo lĩnh vực.
  const matches = roles.filter(role => matchesRole(role, query) && (!playableOnly || isPlayable(role)));
  const found = [...industries.keys()].filter(id => matches.some(role => role.industry_id === id));
  const what = playableOnly ? "vị trí có thể trải nghiệm" : "vị trí";
  tree.innerHTML = matches.length ? `
    <p class="search-summary" role="status">${normalize(query) ? "Tìm thấy " : ""}${matches.length} ${what} trong ${found.length} lĩnh vực.
      <button class="text-link reset" type="button">${playableOnly ? "Xem tất cả nghề" : "Xóa tìm kiếm"}</button></p>
    <div class="trees">${found.map(id => treeMarkup(id, matches.filter(role => role.industry_id === id))).join("")}</div>` :
    (playableOnly ? '<p class="vv-empty" role="status"><strong>Không có nghề có thể trải nghiệm nào khớp từ khoá.</strong><span>Bỏ bộ lọc để tìm cả các nghề đang phát triển.</span><button class="text-link reset" type="button">Xem tất cả nghề</button></p>' : '') ||
    '<p class="vv-empty" role="status"><strong>Không tìm thấy vị trí phù hợp.</strong><span>Thử từ khoá ngắn hơn, ví dụ "tuyển dụng", "data" hoặc "marketing".</span><button class="text-link reset" type="button">Xóa tìm kiếm</button></p>';
  drawTreeLinks();
}

// Đường nối cây nghề (feedback 14/11): đo vị trí thật của từng ô rồi vẽ đường cong SVG đồng nhất,
// thay cho nét CSS cũ (bị thừa nét và không đều giữa các cấp).
function curvePath(x1, y1, x2, y2) {
  const mx = x1 + (x2 - x1) / 2;
  return `M${x1} ${y1}C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
}
function drawTreeLinks() {
  for (const treeEl of tree.querySelectorAll(".tree")) {
    treeEl.querySelector(":scope > .tree-links")?.remove();
    const box = treeEl.getBoundingClientRect();
    if (!box.width) continue;
    const at = (el, side) => {
      const r = el.getBoundingClientRect();
      return { x: (side === "right" ? r.right : side === "left" ? r.left : r.left + r.width / 2) - box.left, y: r.top + r.height / 2 - box.top, top: r.top - box.top, bottom: r.bottom - box.top, left: r.left - box.left };
    };
    const paths = [];
    const root = treeEl.querySelector(".root");
    const rootPt = at(root, "right");
    const stacked = innerWidth <= 500;
    for (const group of treeEl.querySelectorAll(".group")) {
      const branch = group.querySelector(".branch");
      const b = at(branch, "left");
      if (!stacked) paths.push([curvePath(rootPt.x, rootPt.y, b.x, b.y), false]);
      const bRight = at(branch, "right");
      for (const role of group.querySelectorAll(".role")) {
        const r = at(role, "left");
        const on = role.classList.contains("selected");
        // Màn hẹp: vị trí nằm dưới nhóm, nối bằng nét gấp khúc bo tròn từ cạnh trái nhóm.
        const d = r.x > bRight.x + 4 ? curvePath(bRight.x, bRight.y, r.x, r.y)
          : `M${b.x + 12} ${b.bottom}V${r.y - 8}Q${b.x + 12} ${r.y} ${b.x + 20} ${r.y}H${r.x}`;
        paths.push([d, on]);
      }
    }
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "tree-links");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("width", box.width);
    svg.setAttribute("height", box.height);
    svg.innerHTML = paths.sort((a, b) => a[1] - b[1]).map(([d, on]) => `<path d="${d}"${on ? ' class="on"' : ""}/>`).join("");
    treeEl.prepend(svg);
  }
}
new ResizeObserver(() => requestAnimationFrame(drawTreeLinks)).observe(tree);
document.fonts?.ready.then(drawTreeLinks);

function missionBlock(mission, role) {
  const action = missionActions(mission, role);
  const note = { progress: "Bạn đang làm dở nhiệm vụ này.", submitted: "Bạn đã nộp bài bàn giao." }[action.status];
  return `<div class="mission">
      <h3>Nhiệm vụ tại ${escape(mission.company)}</h3>
      <p>${escape(mission.description)}</p>
      <dl class="mission-facts">
        <dt>Thời lượng</dt><dd>${escape(mission.duration)}</dd>
        <dt>Sản phẩm cần nộp</dt><dd>${escape(mission.deliverable)}</dd>
      </dl>
      ${note ? `<p class="mission-status">${note}</p>` : ""}
      <a class="primary" href="${escape(action.url)}">${action.label}</a>
      ${action.secondary ? `<a class="text-link mission-secondary" href="${escape(action.secondary.url)}">${action.secondary.label}</a>` : ""}
    </div>`;
}

function renderHomeContinue() {
  const slot = document.querySelector("#home-continue");
  // Feedback 16/11: hiện nhiệm vụ làm GẦN NHẤT — ưu tiên đang làm dở (mới nhất trước), rồi tới bài đã nộp gần nhất.
  const items = roles.filter(isPlayable).map(role => ({ role, info: missionInfo(missions[role.mission_id]) }));
  const pick = status => items.filter(x => x.info.status === status).sort((a, b) => b.info.updatedAt - a.info.updatedAt);
  const active = pick("progress"), done = pick("submitted");
  const top = active[0] ?? done[0];
  slot.hidden = !top;
  if (!top) return;
  const action = missionActions(missions[top.role.mission_id], top.role);
  const step = top.info.status === "progress" && top.info.progress ? ` · ${escape(top.info.progress.label)}` : "";
  const count = active.length + done.length;
  slot.innerHTML = `${top.info.status === "submitted" ? "Bạn vừa hoàn thành" : "Bạn đang làm dở"} <strong>${escape(top.role.role_name)}</strong>${step}.
    <a class="text-link" href="${escape(action.url)}">${action.label} →</a>${count > 1 ? ` <a class="text-link home-continue-all" href="#/workspace">Xem cả ${count} mô phỏng</a>` : ""}`;
}

function renderDetail() {
  if (!selected) {
    detail.innerHTML = "<h2>Chọn một vị trí</h2><p>Bấm vào thẻ trong bản đồ để xem chi tiết nghề.</p>";
    return;
  }

  const role = selected;
  const mission = role.simulation_status === "available" ? missions[role.mission_id] : null;
  const related = role.related_role_ids.map(id => rolesById.get(id)).filter(Boolean);
  const sections = [
    ["Công việc hằng ngày", role.daily_tasks],
    ["Kỹ năng cần có", role.required_skills],
    ["Công cụ thường dùng", role.common_tools],
    ["Ví dụ đầu ra", role.typical_outputs]
  ];

  detail.innerHTML = `
    <span class="badge${mission ? "" : " off"}">${mission ? "Có thể trải nghiệm" : "Đang phát triển"}</span>
    <h2>${escape(role.role_name)}</h2>
    <p class="role-subtitle">${escape(role.role_name_vi)}${levels[role.experience_level] ? " · " + levels[role.experience_level] : ""}</p>
    <p>${escape(role.role_description)}</p>
    ${mission ? missionBlock(mission, role) : ""}
    ${sections.filter(([, items]) => items.length).map(([title, items]) =>
      `<h3>${title}</h3><ul>${items.map(item => `<li>${escape(item)}</li>`).join("")}</ul>`).join("")}
    ${related.length ? `<h3>Vị trí liên quan</h3><div class="related">${related.map(item =>
      `<a class="text-link" href="${escape(rolePath(item))}" data-role="${escape(item.role_id)}">${escape(item.role_name)}</a>`).join("")}</div>` : ""}
  `;
}

// Trang Workspace và Hồ sơ trải nghiệm (feedback 16–17/11), dựng bởi hub.js.
const pages = {
  "#/workspace": { key: "workspace", el: "#hub", title: "Workspace", draw: () => renderHub() },
  "#/ho-so": { key: "profile", el: "#profile", title: "Hồ sơ trải nghiệm", draw: () => renderProfile() }
};
let lastRoute = null;
function render() {
  let route = location.hash;
  // Link "#/career-map?playable" mở sẵn bộ lọc Có thể trải nghiệm.
  if (route === careerMapPath + "?playable") {
    playableOnly = true;
    search.value = "";
    history.replaceState(null, "", careerMapPath);
    route = careerMapPath;
  }
  const page = pages[route];
  const showMap = !page && (route === careerMapPath || route === "#/explore" || route.startsWith("#/roles/"));
  home.hidden = showMap || !!page;
  document.querySelectorAll(".home-only").forEach(el => { el.hidden = showMap || !!page; });
  explore.hidden = !showMap;
  for (const p of Object.values(pages)) document.querySelector(p.el).hidden = p !== page;
  selected = showMap ? roles.find(role => rolePath(role) === route) ?? null : null;
  renderSiteHeader({ active: showMap ? "explore" : page?.key ?? null, exploreUrl: careerMapPath });
  document.title = page ? `${page.title} · VAOVIEC.` : "VAOVIEC. · Khám phá nghề qua trải nghiệm";
  const moved = lastRoute !== route;
  lastRoute = route;
  if (page) {
    page.draw();
    if (moved) scrollTo(0, 0);
    return;
  }
  if (!showMap) {
    renderHomeContinue();
    return;
  }
  if (selected && selected.industry_id !== industry) {
    industry = selected.industry_id;
    search.value = "";
  }

  tabs.innerHTML = [...industries].map(([id, name]) => `
    <button type="button" data-industry="${escape(id)}" aria-pressed="${id === industry}"
      class="${id === industry ? "active" : ""}">${escape(name)}</button>`).join("");
  renderTree();
  renderDetail();

  if (focusRole && selected) {
    if (innerWidth <= 960) detail.focus();
    else (tree.querySelector(".selected") ?? detail).focus({ preventScroll: true });
  }
  focusRole = false;
}

tabs.addEventListener("click", event => {
  const tab = event.target.closest("[data-industry]");
  if (!tab) return;
  industry = tab.dataset.industry;
  search.value = "";
  playableOnly = false;
  if (location.hash !== careerMapPath) history.pushState(null, "", careerMapPath);
  render();
  tabs.querySelector(".active").focus();
});

tree.addEventListener("click", event => {
  if (!event.target.closest(".reset")) return;
  search.value = "";
  playableOnly = false;
  renderTree();
  search.focus();
});

explore.addEventListener("click", event => {
  const link = event.target.closest("[data-role]");
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  focusRole = true;
  if (location.hash === link.hash) render();
});

function renderFilter() {
  const btn = document.querySelector("#playable-filter");
  if (!btn) return;
  btn.setAttribute("aria-pressed", String(playableOnly));
  btn.querySelector("b").textContent = roles.filter(isPlayable).length;
  tabs.classList.toggle("dimmed", playableOnly);
}
document.querySelector("#playable-filter")?.addEventListener("click", () => {
  playableOnly = !playableOnly;
  renderTree();
});

search.addEventListener("input", renderTree);
window.addEventListener("hashchange", render);
render();

// Section "Cách VAOVIEC hoạt động": rê chuột, bấm hoặc focus vào bước nào thì mở mô tả và đổi hình minh hoạ.
// Khi cuộn tới section, bước 1 mở sẵn; hình minh hoạ là SVG động, chạy lại mỗi khi bước được mở.
(() => {
  const how = document.querySelector("#how");
  if (!how) return;
  const steps = [...how.querySelectorAll(".how-step")];
  const panels = [...how.querySelectorAll(".how-panel")];
  const title = how.querySelector(".how-bar-title");
  const activate = n => {
    steps.forEach(s => { const on = s.dataset.step === n; s.classList.toggle("is-active", on); s.setAttribute("aria-expanded", on); });
    panels.forEach(p => p.classList.toggle("is-active", p.id === "how-panel-" + n));
    title.textContent = how.querySelector("#how-panel-" + n).dataset.title;
  };
  steps.forEach(s => {
    const go = () => activate(s.dataset.step);
    s.addEventListener("pointerenter", e => { if (e.pointerType !== "touch") go(); });
    s.addEventListener("focus", go);
    s.addEventListener("click", go);
  });
  new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      activate("1");
    }
  }, { threshold: .35 }).observe(how);
})();
