// Vercel Web Analytics: đếm lượt truy cập (không cookie, không cần đăng nhập) và 4 sự kiện nhiệm vụ (feedback 18/11).
// Script chỉ tải trên bản deploy; chạy local thì sự kiện chỉ ghi ra console và sessionStorage để kiểm tra.
// Bật một lần trong Vercel → Project → Analytics. Sự kiện tuỳ chỉnh (custom events) cần gói Pro trở lên.
(() => {
  const local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  if (!local) {
    const s = document.createElement("script");
    s.defer = true;
    s.src = "/_vercel/insights/script.js";
    document.head.append(s);
  }

  const newId = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2, 10));
  // Mã ẩn danh: sinh ngẫu nhiên, lưu trên trình duyệt; không gắn với tên, email hay tài khoản.
  const stored = (store, key) => {
    try {
      let id = store.getItem(key);
      if (!id) { id = newId(); store.setItem(key, id); }
      return id;
    } catch { return "no-storage"; }
  };

  window.vvNewId = newId;

  // Sự kiện nhiệm vụ: mission_started | mission_submitted | mission_completed | mission_resubmitted.
  // Mỗi sự kiện có mission_id, anon_id (người duy nhất), session_id (phiên duyệt web), attempt_id (lượt chơi) và ts.
  window.vvTrack = (name, data = {}) => {
    const event = {
      mission_id: data.mission_id ?? "",
      anon_id: stored(localStorage, "vaoviec-anon-id"),
      session_id: stored(sessionStorage, "vaoviec-session-id"),
      attempt_id: data.attempt_id ?? "",
      ts: new Date().toISOString(),
      ...data
    };
    try { window.va("event", { name, data: event }); } catch { /* Analytics bị chặn: bỏ qua, không ảnh hưởng nhiệm vụ. */ }
    // Bản sao gửi về kho riêng của nhóm (/api/track → Upstash Redis), xem ở trang /thong-ke.
    try {
      const body = JSON.stringify({ name, ...event });
      if (!navigator.sendBeacon?.("/api/track", body)) fetch("/api/track", { method: "POST", body, keepalive: true }).catch(() => {});
    } catch { /* bỏ qua */ }
    if (local) {
      console.info("[vvTrack]", name, event);
      try {
        const log = JSON.parse(sessionStorage.getItem("vaoviec-events-debug") || "[]");
        log.push({ name, ...event });
        sessionStorage.setItem("vaoviec-events-debug", JSON.stringify(log.slice(-50)));
      } catch { /* bỏ qua */ }
    }
  };
})();
