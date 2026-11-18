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
    <span class="site-header-tools"></span>
    ${themeButton()}
    <span class="site-header-account">${accountMarkup()}</span>`;
  window.vv?.headerTools();
}

// Tài khoản (feedback 19/11): đăng nhập bằng Google hoặc email + mật khẩu; máy chủ giữ phiên (cookie HttpOnly).
// Tiến độ nhiệm vụ (khoá vaoviec-workspace-*) vẫn lưu trên trình duyệt để chơi được khi mất mạng,
// và được đồng bộ lên tài khoản: đăng nhập ở máy khác sẽ thấy lại. Bộ nhớ đệm hồ sơ: localStorage "vaoviec-account".
const ACCOUNT_KEY = "vaoviec-account";
const SYNC_PREFIX = "vaoviec-workspace-";
// Dữ liệu cá nhân (hồ sơ, yêu thích, thông báo… do ux.js ghi) cũng đồng bộ theo tài khoản.
const isSynced = key => key?.startsWith(SYNC_PREFIX) || key?.startsWith("vaoviec-user-");
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
const signedIn = () => !!readAccount()?.id;
const escapeHeader = value => String(value).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
function initials(name) {
  const parts = name.trim().split(/\s+/);
  return (parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0].slice(0, 2)).toUpperCase();
}
const avatarMarkup = account => (window.vv?.avatarSrc() || account.picture)
  ? `<span class="account-avatar has-photo" aria-hidden="true"><img src="${escapeHeader(window.vv?.avatarSrc() || account.picture)}" alt="" referrerpolicy="no-referrer"></span>`
  : `<span class="account-avatar" aria-hidden="true">${escapeHeader(initials(account.name))}</span>`;
function accountMarkup() {
  const account = readAccount();
  if (!account?.id) return '<button type="button" class="account-login" data-account="login">Đăng nhập</button>';
  const first = account.name.trim().split(/\s+/).pop();
  return `<button type="button" class="account-chip" data-account="menu" aria-haspopup="menu" aria-expanded="false">
      ${avatarMarkup(account)}<span class="account-name">${escapeHeader(first)}</span></button>
    <div class="account-menu" role="menu" hidden>
      <p><strong>${escapeHeader(account.name)}</strong><span>${escapeHeader(account.email)}</span>${account.school ? `<span>${escapeHeader(account.school)}</span>` : ""}</p>
      <p class="account-sync" data-sync-status>${syncLabel()}</p>
      <a role="menuitem" href="/#/ho-so">Hồ sơ trải nghiệm</a>
      <button type="button" role="menuitem" data-account="edit">Sửa thông tin</button>
      <button type="button" role="menuitem" data-account="logout">Đăng xuất</button>
    </div>`;
}
function refreshAccount() {
  const slot = document.querySelector(".site-header-account");
  if (slot) slot.innerHTML = accountMarkup();
  dispatchEvent(new CustomEvent("vaoviec:account", { detail: readAccount() }));
}

// ---- Gọi máy chủ ----
async function authApi(action, body) {
  const res = await fetch("/api/auth?action=" + action, body === undefined
    ? { credentials: "same-origin", cache: "no-store" }
    : { method: "POST", credentials: "same-origin", headers: { "x-vaoviec": "1", "Content-Type": "text/plain;charset=UTF-8" }, body: JSON.stringify(body), keepalive: action === "data" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || "Không kết nối được máy chủ. Kiểm tra mạng rồi thử lại."), { status: res.status });
  return data;
}
const remember = user => writeAccount({ id: user.id, name: user.name, email: user.email, school: user.school, picture: user.picture, providers: user.providers, shareId: user.shareId || undefined });

// ---- Đồng bộ tiến độ ----
let syncState = "idle"; // idle | saving | saved | offline
let lastSyncedAt = 0;
let applyingRemote = false;
let pushTimer = null;
function syncLabel() {
  if (syncState === "saving") return "Đang lưu lên tài khoản…";
  if (syncState === "offline") return "Chưa lưu được lên tài khoản (sẽ thử lại).";
  if (lastSyncedAt) return "Đã lưu lên tài khoản lúc " + new Date(lastSyncedAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  return "Tiến độ được lưu lên tài khoản.";
}
function setSync(state) {
  syncState = state;
  if (state === "saved") lastSyncedAt = Date.now();
  document.querySelectorAll("[data-sync-status]").forEach(el => { el.textContent = syncLabel(); });
}
function localItems() {
  const items = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (isSynced(key)) items[key] = localStorage.getItem(key);
    }
  } catch { /* trình duyệt chặn đọc */ }
  return items;
}
const parse = v => { try { return JSON.parse(v); } catch { return null; } };
const stamp = v => (v && typeof v === "object" && !Array.isArray(v) ? Number(v.updatedAt ?? v.savedAt ?? 0) : 0);
// Gộp từng khoá: bản cập nhật sau thắng; danh sách phiên bản đã nộp thì gộp cả hai, bỏ trùng.
function mergeValue(a, b) {
  if (a == null) return b;
  if (b == null || a === b) return a;
  const x = parse(a), y = parse(b);
  if (Array.isArray(x) && Array.isArray(y)) {
    const seen = new Set(), out = [];
    for (const item of [...x, ...y]) {
      const id = item && typeof item === "object" ? (item.id ?? item.attemptId ?? JSON.stringify(item)) : JSON.stringify(item);
      if (!seen.has(id)) { seen.add(id); out.push(item); }
    }
    return JSON.stringify(out);
  }
  return stamp(y) > stamp(x) ? b : a;
}
async function pullAndMerge() {
  const remote = (await authApi("data")).items ?? {};
  const local = localItems();
  let localChanged = false, remoteChanged = false;
  const merged = {};
  for (const key of new Set([...Object.keys(local), ...Object.keys(remote)])) {
    merged[key] = mergeValue(local[key], remote[key]);
    if (merged[key] !== local[key]) localChanged = true;
    if (merged[key] !== remote[key]) remoteChanged = true;
  }
  if (localChanged) {
    applyingRemote = true;
    try { for (const [k, v] of Object.entries(merged)) localStorage.setItem(k, v); } catch { /* bỏ qua */ }
    applyingRemote = false;
  }
  if (remoteChanged) await authApi("data", { items: merged });
  setSync("saved");
  return localChanged;
}
async function pushNow() {
  clearTimeout(pushTimer); pushTimer = null;
  if (!signedIn()) return;
  setSync("saving");
  try { await authApi("data", { items: localItems() }); setSync("saved"); }
  catch (error) {
    if (error.status === 401) return sessionExpired();
    setSync("offline"); pushTimer = setTimeout(pushNow, 15000);
  }
}
function schedulePush() {
  if (!signedIn() || applyingRemote) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(pushNow, 1500);
}
// Mọi lần lưu tiến độ (mission-engine, TA app, hub) đi qua localStorage.setItem: bắt lại để đồng bộ.
for (const method of ["setItem", "removeItem"]) {
  const original = Storage.prototype[method];
  Storage.prototype[method] = function (key, ...rest) {
    const out = original.call(this, key, ...rest);
    try { if (this === localStorage && isSynced(String(key))) schedulePush(); } catch { /* bỏ qua */ }
    return out;
  };
}
addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden" && pushTimer) pushNow(); });
addEventListener("pagehide", () => { if (pushTimer) pushNow(); });

function sessionExpired() {
  writeAccount(null);
  refreshAccount();
  window.vvToast?.("Phiên đăng nhập đã hết hạn. Tiến độ vẫn ở trên máy này, đăng nhập lại để lưu lên tài khoản.", "info");
}
// Mỗi phiên duyệt web: kiểm tra phiên đăng nhập còn hạn và kéo tiến độ mới nhất từ máy khác về.
(async () => {
  if (!signedIn()) return;
  let once = false;
  try { once = sessionStorage.getItem("vv-account-checked") === "1"; sessionStorage.setItem("vv-account-checked", "1"); } catch { /* bỏ qua */ }
  if (once) return;
  try {
    const { user } = await authApi("me");
    if (!user) return sessionExpired();
    remember(user); refreshAccount();
    if (await pullAndMerge()) location.reload();
  } catch { setSync("offline"); }
})();

async function afterSignIn(user, created) {
  remember(user);
  refreshAccount();
  accountDialog?.close();
  let changed = false;
  try { changed = await pullAndMerge(); } catch { setSync("offline"); }
  try { sessionStorage.setItem("vv-account-checked", "1"); } catch { /* bỏ qua */ }
  const first = user.name.split(/\s+/).pop();
  window.vvToast?.(created ? `Chào ${first}! Tài khoản đã được tạo, tiến độ trên máy này đã lưu vào tài khoản.` : `Chào ${first}! Đã đăng nhập.`, "success");
  if (changed) setTimeout(() => location.reload(), 900);
}

// ---- Hộp đăng nhập / tạo tài khoản / sửa thông tin ----
let accountDialog;
let googleConfig;
async function loadGoogle() {
  googleConfig ??= authApi("config").catch(() => ({}));
  const { googleClientId } = await googleConfig;
  if (!googleClientId) return null;
  if (!window.google?.accounts?.id) {
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client"; s.async = true;
      s.onload = resolve; s.onerror = reject;
      document.head.append(s);
    }).catch(() => null);
  }
  return window.google?.accounts?.id ? googleClientId : null;
}
const eyeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';

function openAccountDialog(mode = "login") {
  const account = readAccount();
  const legacyName = !account?.id ? account?.name ?? "" : "";
  accountDialog ??= document.body.appendChild(document.createElement("dialog"));
  accountDialog.className = "account-dialog";
  const edit = mode === "edit";
  const reg = mode === "register";
  const nameField = `<label><span class="lbl">Họ và tên <i aria-hidden="true">*</i></span><input name="fullname" maxlength="60" autocomplete="name" value="${escapeHeader(edit ? account.name : legacyName)}" required></label>`;
  const schoolField = `<label><span class="lbl">Trường / ngành học <small>(không bắt buộc)</small></span><input name="school" maxlength="80" value="${escapeHeader(account?.school ?? "")}"></label>`;
  const credFields = `<label><span class="lbl">Email</span><input name="email" type="email" maxlength="254" autocomplete="email" inputmode="email" required></label>
      <label><span class="lbl">Mật khẩu${reg ? " <small>(ít nhất 8 ký tự)</small>" : ""}</span><span class="account-pass"><input name="password" type="password" maxlength="200" autocomplete="${reg ? "new-password" : "current-password"}" required><button type="button" class="account-eye" data-account="eye" aria-label="Hiện mật khẩu" aria-pressed="false">${eyeIcon}</button></span></label>`;
  const googleBlock = `<p class="account-lead">${reg ? "Lưu tiến độ, bài nộp và hồ sơ trải nghiệm để mở lại trên mọi thiết bị." : "Tiếp tục hành trình thử nghề trên mọi thiết bị."}</p>
      <div class="account-google" data-google hidden><div class="account-google-slot" data-google-slot></div></div>
      <div class="account-or" data-google-or hidden><span>hoặc dùng email</span></div>`;
  const foot = edit
    ? `<p class="account-foot">Email đăng nhập: <strong>${escapeHeader(account.email)}</strong></p>`
    : `<p class="account-foot">${reg ? 'Đã có tài khoản? <button type="button" class="text-switch" data-account="login">Đăng nhập</button>' : 'Chưa có tài khoản? <button type="button" class="text-switch" data-account="register">Tạo tài khoản</button>'}</p>
      <p class="account-fine">${reg ? "Tiến độ đang có trên máy này sẽ được lưu vào tài khoản mới. " : ""}Quên mật khẩu? Đăng nhập bằng Google với cùng email, hoặc liên hệ nhóm VAOVIEC.</p>`;
  accountDialog.innerHTML = `<form class="account-form" novalidate>
      <button type="button" class="account-close" data-account="cancel" aria-label="Đóng"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      <h2>${edit ? "Sửa thông tin" : reg ? "Tạo tài khoản VAOVIEC." : "Đăng nhập VAOVIEC."}</h2>
      ${edit ? "" : googleBlock}
      ${edit || reg ? nameField : ""}
      ${edit ? "" : credFields}
      ${edit || reg ? schoolField : ""}
      <p class="account-error" role="alert" hidden></p>
      <button type="submit" class="account-save">${edit ? "Lưu thay đổi" : reg ? "Tạo tài khoản" : "Đăng nhập"}</button>
      ${foot}
    </form>`;
  const form = accountDialog.querySelector("form");
  const error = form.querySelector(".account-error");
  const submit = form.querySelector(".account-save");
  const fail = text => { error.hidden = false; error.textContent = text; };
  const busy = on => { submit.disabled = on; submit.classList.toggle("is-busy", on); };
  form.addEventListener("submit", async event => {
    event.preventDefault();
    error.hidden = true;
    const f = form.elements;
    const name = f.fullname?.value.trim();
    if ((edit || reg) && !name) return fail("Nhập họ và tên.");
    if (!edit) {
      if (!/^\S+@\S+\.\S+$/.test(f.email.value.trim())) return fail("Nhập email đúng định dạng, ví dụ ban@gmail.com.");
      if (!f.password.value) return fail("Nhập mật khẩu.");
      if (reg && f.password.value.length < 8) return fail("Mật khẩu cần ít nhất 8 ký tự.");
    }
    busy(true);
    try {
      if (edit) {
        const { user } = await authApi("profile", { name, school: f.school.value.trim() });
        remember(user); refreshAccount(); accountDialog.close();
        window.vvToast?.("Đã lưu thông tin hồ sơ.", "success");
      } else {
        const { user } = await authApi(reg ? "register" : "login", { email: f.email.value.trim(), password: f.password.value, name, school: f.school?.value.trim() });
        await afterSignIn(user, reg);
      }
    } catch (err) { fail(err.message); }
    finally { busy(false); }
  });
  accountDialog.showModal();
  const f = form.elements;
  (f.fullname && !f.fullname.value ? f.fullname : f.email ?? f.fullname)?.focus();
  if (!edit) setupGoogle(form, fail);
}
async function setupGoogle(form, fail) {
  const clientId = await loadGoogle();
  if (!clientId || !form.isConnected) return;
  form.querySelector("[data-google]").hidden = false;
  form.querySelector("[data-google-or]").hidden = false;
  google.accounts.id.initialize({
    client_id: clientId,
    ux_mode: "popup",
    callback: async ({ credential }) => {
      try { const { user } = await authApi("google", { credential }); await afterSignIn(user, false); }
      catch (err) { fail(err.message); }
    }
  });
  // Nút Google chính thức (theo quy định thương hiệu của Google), chủ đề theo giao diện sáng/tối.
  const slot = form.querySelector("[data-google-slot]");
  google.accounts.id.renderButton(slot, { type: "standard", shape: "pill", size: "large", width: Math.min(400, slot.clientWidth || 360), text: "continue_with", logo_alignment: "center", locale: "vi", theme: document.documentElement.dataset.theme === "dark" ? "filled_black" : "outline" });
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
  if (action === "login" || action === "register" || action === "edit") { closeAccountMenu(); openAccountDialog(action); }
  if (action === "cancel") accountDialog?.close();
  if (action === "eye") {
    const input = target.previousElementSibling;
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    target.setAttribute("aria-pressed", String(show));
    target.setAttribute("aria-label", show ? "Ẩn mật khẩu" : "Hiện mật khẩu");
  }
  if (action === "menu") {
    const menu = document.querySelector(".account-menu");
    menu.hidden = !menu.hidden;
    target.setAttribute("aria-expanded", String(!menu.hidden));
  }
  if (action === "logout") {
    closeAccountMenu();
    const message = "Tiến độ đã lưu trong tài khoản. Bài làm trên máy này sẽ được xoá để người dùng sau không xem được; đăng nhập lại là thấy đủ.";
    const ask = window.vvConfirm
      ? window.vvConfirm({ title: "Đăng xuất?", message, confirmLabel: "Đăng xuất" })
      : Promise.resolve(confirm(message));
    ask.then(async ok => {
      if (!ok) return;
      try { if (pushTimer) await pushNow(); await authApi("logout", {}); } catch { /* vẫn đăng xuất trên máy */ }
      applyingRemote = true;
      try { for (const key of Object.keys(localItems())) localStorage.removeItem(key); } catch { /* bỏ qua */ }
      applyingRemote = false;
      await window.vv?.cv.clearLocal();
      writeAccount(null);
      try { sessionStorage.removeItem("vv-account-checked"); } catch { /* bỏ qua */ }
      location.reload();
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
