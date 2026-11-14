// Thành phần giao diện dùng chung cho mọi trang VAOVIEC. (design system 14/11).
// Chỉ lo trình bày: hộp xác nhận thay confirm(), toast thông báo, tooltip cho nút chỉ có biểu tượng.
// Không chứa logic nghiệp vụ; các trang gọi window.vvConfirm / window.vvToast.
(() => {
  const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  // Hộp xác nhận: trả về Promise<boolean>. Esc hoặc bấm Huỷ = false.
  window.vvConfirm = ({ title, message, confirmLabel = "Đồng ý", cancelLabel = "Huỷ", tone = "default" } = {}) => new Promise(resolve => {
    const dialog = document.createElement("dialog");
    dialog.className = "vv-confirm";
    dialog.setAttribute("aria-labelledby", "vv-confirm-title");
    dialog.innerHTML = `<form method="dialog">
        <div class="vv-confirm-icon ${tone === "danger" ? "danger" : ""}" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.5"/></svg>
        </div>
        <h2 id="vv-confirm-title">${esc(title)}</h2>
        ${message ? `<p>${esc(message)}</p>` : ""}
        <div class="vv-confirm-actions">
          <button value="cancel" class="vv-btn vv-btn-ghost">${esc(cancelLabel)}</button>
          <button value="ok" class="vv-btn ${tone === "danger" ? "vv-btn-danger" : "vv-btn-primary"}">${esc(confirmLabel)}</button>
        </div>
      </form>`;
    document.body.append(dialog);
    // Xử lý ngay khi bấm nút hoặc Esc, không chờ sự kiện "close" (có trình duyệt hoãn sự kiện này).
    let done = false;
    const finish = ok => {
      if (done) return;
      done = true;
      resolve(ok);
      if (dialog.open) dialog.close();
      dialog.remove();
    };
    dialog.querySelector("form").addEventListener("submit", e => { e.preventDefault(); finish(e.submitter?.value === "ok"); });
    dialog.addEventListener("cancel", e => { e.preventDefault(); finish(false); });
    dialog.addEventListener("close", () => finish(dialog.returnValue === "ok"));
    dialog.showModal();
    dialog.querySelector('[value="cancel"]').focus();
  });

  // Toast: thông báo ngắn ở cuối màn hình, tự ẩn. kind: info | success | error.
  let stack;
  window.vvToast = (message, kind = "info", ms = 3600) => {
    stack ??= Object.assign(document.body.appendChild(document.createElement("div")), { className: "vv-toasts" });
    stack.setAttribute("role", "status");
    stack.setAttribute("aria-live", "polite");
    const el = document.createElement("div");
    el.className = `vv-toast vv-toast-${kind}`;
    const icon = { success: '<path d="m5 12 5 5 9-10"/>', error: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.5"/>', info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5v.5"/>' }[kind] ?? "";
    el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon}</svg><span>${esc(message)}</span>`;
    stack.append(el);
    setTimeout(() => { el.classList.add("out"); setTimeout(() => el.remove(), 250); }, ms);
  };

  // Tooltip: nút chỉ có biểu tượng (có aria-label, không có chữ) tự nhận data-tip để hiện chú thích khi rê chuột hoặc focus.
  const tipify = root => {
    for (const el of root.querySelectorAll?.("button[aria-label], a[aria-label]") ?? []) {
      if (el.dataset.tip || el.closest(".nova-mascot, .home-features, .how-step")) continue;
      if (!el.textContent.trim() || el.textContent.trim().length <= 1) el.dataset.tip = el.getAttribute("aria-label");
    }
  };
  const start = () => {
    tipify(document);
    new MutationObserver(list => { for (const m of list) for (const n of m.addedNodes) if (n.nodeType === 1) tipify(n); })
      .observe(document.body, { childList: true, subtree: true });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
