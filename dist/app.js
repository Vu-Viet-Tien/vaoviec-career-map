const missions = {
  MISSION_001: {
    company: "NOVA Commerce",
    description: "Hỗ trợ tuyển nhân viên Chăm sóc khách hàng. Đọc JD, đăng tin, sàng lọc CV và đề xuất ứng viên phỏng vấn.",
    duration: "10–15 phút",
    deliverable: "Tối đa 3 ứng viên đề xuất phỏng vấn, mỗi người kèm lý do, lịch làm đã xác nhận và một câu hỏi phỏng vấn.",
    url: "/workspace/talent-acquisition",
    // Trùng khóa lưu tiến độ trong workspace/talent-acquisition-assets/app.js.
    storageKey: "vaoviec-workspace-mission-001-v1"
  },
  MISSION_002: {
    company: "NOVA Commerce",
    description: "Tin tuyển CSKH đăng 3 tuần chỉ có 11 hồ sơ. Đọc dữ liệu nhân viên và ứng viên, chọn 3 trụ cột EVP, viết bài đăng tuyển dụng, chọn kênh và chỉ số đo.",
    duration: "15–20 phút",
    deliverable: "3 trụ cột EVP có bằng chứng, 1 bài đăng tuyển dụng, kế hoạch kênh kèm 2 chỉ số và khuyến nghị cho trưởng nhóm.",
    url: "/workspace/employer-branding",
    // Trùng khóa lưu tiến độ trong workspace/employer-branding-assets/app.js.
    storageKey: "vaoviec-workspace-mission-002-v1"
  },
  MISSION_003: {
    company: "NOVA Commerce",
    description: "Mùa quà Tết doanh nghiệp: sàng lọc 8 khách hàng tiềm năng, chọn 3 lead ưu tiên, viết email tiếp cận và lên kế hoạch theo dõi để ký 2 đơn trước 20/12.",
    duration: "15–20 phút",
    deliverable: "3 lead ưu tiên kèm lý do, 1 email tiếp cận cá nhân hoá, kế hoạch theo dõi kèm 2 chỉ số và khuyến nghị cho trưởng nhóm.",
    url: "/workspace/business-development",
    // Trùng CASE.ui.storageKey trong workspace/business-development-assets/case.js.
    storageKey: "vaoviec-workspace-mission-003-v1"
  },
  MISSION_004: {
    company: "NOVA Commerce",
    description: "Ra mắt nồi chiên AirFry 5L: đọc dữ liệu từ khoá và câu hỏi của khách, chọn 3 chủ đề nội dung, viết bài đăng đầu tiên và chọn kênh phân phối để bán 300 nồi trong tháng 12.",
    duration: "15–20 phút",
    deliverable: "3 chủ đề nội dung có căn cứ, 1 bài đăng đúng thông tin sản phẩm, kế hoạch kênh kèm 2 chỉ số và khuyến nghị cho trưởng nhóm.",
    url: "/workspace/content-marketing",
    // Trùng CASE.ui.storageKey trong workspace/content-marketing-assets/case.js.
    storageKey: "vaoviec-workspace-mission-004-v1"
  },
  MISSION_005: {
    company: "NOVA Commerce",
    description: "Doanh thu tuần 45 giảm 18%: đọc dữ liệu theo kênh, phễu mua hàng và nhật ký hệ thống, chọn 3 phát hiện có bằng chứng, viết email báo cáo và đề xuất chỉ số theo dõi.",
    duration: "15–20 phút",
    deliverable: "3 phát hiện có số liệu chứng minh, 1 email báo cáo ngắn, các bước tiếp theo kèm 2 chỉ số theo dõi và khuyến nghị cho trưởng phòng.",
    url: "/workspace/data-analyst",
    // Trùng CASE.ui.storageKey trong workspace/data-analyst-assets/case.js.
    storageKey: "vaoviec-workspace-mission-005-v1"
  }
};

// Đọc tiến độ Workspace đã lưu trên trình duyệt: "new" | "progress" | "submitted".
function missionProgress(mission) {
  let state = null;
  try { state = JSON.parse(localStorage.getItem(mission.storageKey)); } catch { /* Trình duyệt chặn lưu: coi như chưa bắt đầu. */ }
  if (!state) return "new";
  if (state.submission) return "submitted";
  const started = state.introSeen || state.posts?.length || Object.keys(state.people ?? {}).length;
  return started ? "progress" : "new";
}

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
            <a class="role${role === selected ? " selected" : ""}" href="${escape(rolePath(role))}"
              data-role="${escape(role.role_id)}"${role === selected ? ' aria-current="true"' : ""}>
              ${escape(role.role_name)}
            </a>`).join("")}</div>
        </div>`).join("")}</div>
    </div>`;
}

function renderTree() {
  const query = search.value.trim();
  if (!normalize(query)) {
    tree.innerHTML = treeMarkup(industry, roles.filter(role => role.industry_id === industry));
    drawTreeLinks();
    return;
  }

  // Có từ khóa: tìm trên toàn bộ danh mục, gom kết quả theo lĩnh vực.
  const matches = roles.filter(role => matchesRole(role, query));
  const found = [...industries.keys()].filter(id => matches.some(role => role.industry_id === id));
  tree.innerHTML = matches.length ? `
    <p class="search-summary" role="status">Tìm thấy ${matches.length} vị trí trong ${found.length} lĩnh vực.
      <button class="text-link reset" type="button">Xóa tìm kiếm</button></p>
    <div class="trees">${found.map(id => treeMarkup(id, matches.filter(role => role.industry_id === id))).join("")}</div>` :
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
  // Ưu tiên nhiệm vụ đang làm dở, sau đó tới nhiệm vụ đã nộp.
  const playable = roles.filter(item => item.simulation_status === "available" && missions[item.mission_id]);
  const rank = { progress: 0, submitted: 1, new: 2 };
  const role = playable.sort((a, b) => rank[missionProgress(missions[a.mission_id])] - rank[missionProgress(missions[b.mission_id])])[0];
  const action = role && missionActions(missions[role.mission_id], role);
  slot.hidden = !action || action.status === "new";
  if (slot.hidden) return;
  slot.innerHTML = `${action.status === "submitted" ? "Bạn đã hoàn thành" : "Bạn đang làm dở"} ${escape(role.role_name)}.
    <a class="text-link" href="${escape(action.url)}">${action.label} →</a>`;
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

function render() {
  const route = location.hash;
  const showMap = route === careerMapPath || route === "#/explore" || route.startsWith("#/roles/");
  home.hidden = showMap;
  document.querySelectorAll(".home-only").forEach(el => { el.hidden = showMap; });
  explore.hidden = !showMap;
  selected = showMap ? roles.find(role => rolePath(role) === route) ?? null : null;
  const currentMission = selected && missions[selected.mission_id];
  renderSiteHeader({
    active: showMap ? "explore" : null,
    exploreUrl: careerMapPath,
    workspaceUrl: workspacePath(currentMission || defaultMission, currentMission ? selected : null)
  });
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
  if (location.hash !== careerMapPath) history.pushState(null, "", careerMapPath);
  render();
  tabs.querySelector(".active").focus();
});

tree.addEventListener("click", event => {
  if (!event.target.closest(".reset")) return;
  search.value = "";
  renderTree();
  search.focus();
});

explore.addEventListener("click", event => {
  const link = event.target.closest("[data-role]");
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  focusRole = true;
  if (location.hash === link.hash) render();
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
