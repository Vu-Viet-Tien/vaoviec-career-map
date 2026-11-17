const siteHeader = document.querySelector(".site-header");

const headerItems = [
  ["explore", "Khám phá", '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>'],
  ["workspace", "Workspace", '<rect x="5" y="4" width="14" height="11" rx="1"/><path d="m5 15-3 4h20l-3-4"/>'],
  ["profile", "Hồ sơ", '<circle cx="12" cy="7" r="3"/><path d="M5 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2z"/>']
];

// Feedback 16–17/11: Workspace mở danh sách case (/#/workspace), Hồ sơ mở trang tổng hợp (/#/ho-so), ở mọi trang.
const HEADER_URLS = { workspace: "/#/workspace", profile: "/#/ho-so" };
function renderSiteHeader({ active, exploreUrl }) {
  siteHeader.innerHTML = `
    <a class="site-header-logo" href="/" aria-label="VAOVIEC. – Trang chủ">
      <span class="vaoviec-wordmark"><img src="/vaoviec-logo.png" alt="" width="1200" height="390"></span>
    </a>
    <nav class="site-header-nav" aria-label="Điều hướng chính">
      ${headerItems.map(([key, label, icon]) => {
        const content = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon}</svg><span>${label}</span>`;
        const current = active === key ? ' aria-current="page"' : "";
        const url = key === "explore" ? (exploreUrl.startsWith("#") && location.pathname !== "/" ? "/" + exploreUrl : exploreUrl) : HEADER_URLS[key];
        return `<a href="${url}"${current}>${content}</a>`;
      }).join("")}
    </nav>
    <a class="site-header-cta" href="${exploreUrl}">Khám phá nghề</a>
    ${themeButton()}
    <span class="site-header-account">${accountMarkup()}</span>`;
}

// Đăng nhập (14/11): VAOVIEC. chưa có máy chủ tài khoản, nên "đăng nhập" tạo hồ sơ học viên lưu trên trình duyệt này.
// Tiến độ nhiệm vụ vốn đã lưu theo trình duyệt; hồ sơ chỉ thêm tên để cá nhân hoá. Khi có backend thật, thay phần này.
const ACCOUNT_KEY = "vaoviec-account";
function readAccount() {
  try { return JSON.parse(localStorage.getItem(ACCOUNT_KEY)) || null; } catch { return null; }
}
function writeAccount(account) {
  try {
    if (account) localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
    else localStorage.removeItem(ACCOUNT_KEY);
    return true;
  } catch { return false; }
}
const escapeHeader = value => String(value).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
function initials(name) {
  const parts = name.trim().split(/\s+/);
  return (parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0].slice(0, 2)).toUpperCase();
}
function accountMarkup() {
  const account = readAccount();
  if (!account?.name) return '<button type="button" class="account-login" data-account="login">Đăng nhập</button>';
  const first = account.name.trim().split(/\s+/).pop();
  return `<button type="button" class="account-chip" data-account="menu" aria-haspopup="menu" aria-expanded="false">
      <span class="account-avatar" aria-hidden="true">${escapeHeader(initials(account.name))}</span><span class="account-name">${escapeHeader(first)}</span></button>
    <div class="account-menu" role="menu" hidden>
      <p><strong>${escapeHeader(account.name)}</strong>${account.school ? `<span>${escapeHeader(account.school)}</span>` : ""}</p>
      <a role="menuitem" href="/#/ho-so">Hồ sơ trải nghiệm</a>
      <button type="button" role="menuitem" data-account="edit">Sửa thông tin</button>
      <button type="button" role="menuitem" data-account="logout">Đăng xuất</button>
    </div>`;
}
function refreshAccount() {
  const slot = document.querySelector(".site-header-account");
  if (slot) slot.innerHTML = accountMarkup();
}

let accountDialog;
function openAccountDialog() {
  const account = readAccount();
  accountDialog ??= document.body.appendChild(document.createElement("dialog"));
  accountDialog.className = "account-dialog";
  accountDialog.innerHTML = `<form method="dialog" class="account-form" novalidate>
      <h2>${account ? "Sửa thông tin" : "Đăng nhập VAOVIEC."}</h2>
      <p class="account-note">Hiện VAOVIEC. chưa có tài khoản trực tuyến. Hồ sơ và tiến độ được lưu trên trình duyệt này, nên đổi máy hoặc xoá dữ liệu trình duyệt sẽ mất.</p>
      <label>Họ và tên <span aria-hidden="true">*</span><input name="fullname" maxlength="60" autocomplete="name" value="${escapeHeader(account?.name ?? "")}"></label>
      <label>Trường / ngành học <small>(không bắt buộc)</small><input name="school" maxlength="80" value="${escapeHeader(account?.school ?? "")}"></label>
      <p class="account-error" role="alert" hidden></p>
      <div class="account-actions"><button type="button" data-account="cancel">Huỷ</button><button type="submit" class="account-save">${account ? "Lưu" : "Bắt đầu"}</button></div>
    </form>`;
  const form = accountDialog.querySelector("form");
  const error = form.querySelector(".account-error");
  const fail = (event, text) => { event.preventDefault(); error.hidden = false; error.textContent = text; };
  form.addEventListener("submit", event => {
    const name = form.elements.fullname.value.trim();
    if (!name) return fail(event, "Nhập họ và tên để tạo hồ sơ.");
    if (!writeAccount({ name, school: form.elements.school.value.trim(), createdAt: account?.createdAt ?? Date.now() })) {
      return fail(event, "Trình duyệt đang chặn lưu dữ liệu, nên chưa tạo được hồ sơ.");
    }
    refreshAccount();
    window.vvToast?.(account ? "Đã lưu thông tin hồ sơ." : `Chào ${name.split(/\s+/).pop()}! Hồ sơ đã được tạo.`, "success");
  });
  accountDialog.querySelector('[data-account="cancel"]').addEventListener("click", () => accountDialog.close());
  accountDialog.showModal();
  form.elements.fullname.focus();
}

function closeAccountMenu() {
  const menu = document.querySelector(".account-menu");
  if (menu && !menu.hidden) { menu.hidden = true; document.querySelector(".account-chip")?.setAttribute("aria-expanded", "false"); return true; }
  return false;
}
document.addEventListener("click", event => {
  const target = event.target.closest("[data-account]");
  if (!target) { if (!event.target.closest(".account-menu")) closeAccountMenu(); return; }
  const action = target.dataset.account;
  if (action === "login" || action === "edit") { closeAccountMenu(); openAccountDialog(); }
  if (action === "menu") {
    const menu = document.querySelector(".account-menu");
    menu.hidden = !menu.hidden;
    target.setAttribute("aria-expanded", String(!menu.hidden));
  }
  if (action === "logout") {
    closeAccountMenu();
    const ask = window.vvConfirm
      ? window.vvConfirm({ title: "Đăng xuất?", message: "Hồ sơ trên trình duyệt này sẽ được đăng xuất. Tiến độ nhiệm vụ vẫn được giữ.", confirmLabel: "Đăng xuất" })
      : Promise.resolve(confirm("Đăng xuất khỏi hồ sơ trên trình duyệt này? Tiến độ nhiệm vụ vẫn được giữ."));
    ask.then(ok => {
      if (!ok) return;
      writeAccount(null);
      refreshAccount();
      window.vvToast?.("Đã đăng xuất.", "info");
    });
  }
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && closeAccountMenu()) document.querySelector(".account-chip")?.focus();
});

// Chế độ sáng/tối (14/11): người dùng chọn, lưu theo trình duyệt; mặc định theo cài đặt máy.
// Giá trị được đặt sớm bằng đoạn script nhỏ trong <head> để không nháy màu khi tải trang.
const THEME_KEY = "vaoviec-theme";
const currentTheme = () => document.documentElement.dataset.theme === "dark" ? "dark" : "light";
function themeButton() {
  const dark = currentTheme() === "dark";
  const icon = dark
    ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'
    : '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>';
  const label = dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối";
  return `<button type="button" class="theme-toggle" data-theme-toggle aria-label="${label}" aria-pressed="${dark}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon}</svg></button>`;
}
document.addEventListener("click", event => {
  const btn = event.target.closest("[data-theme-toggle]");
  if (!btn) return;
  const next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem(THEME_KEY, next); } catch { /* trình duyệt chặn lưu: vẫn đổi trong phiên này */ }
  btn.outerHTML = themeButton();
  document.querySelector("[data-theme-toggle]")?.focus();
  dispatchEvent(new CustomEvent("vaoviec:theme", { detail: next }));
});
