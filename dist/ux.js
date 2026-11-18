// Tiện ích trải nghiệm dùng chung mọi trang (nâng cấp 19/11): lưu yêu thích, đã xem gần đây, ghim truy cập nhanh,
// trung tâm thông báo, tìm kiếm toàn trang (Ctrl+K), hồ sơ cá nhân (ảnh đại diện, ảnh bìa, CV), hướng dẫn người mới,
// phím tắt, nút lên đầu trang, chia sẻ/sao chép liên kết.
// Không đổi luồng nhiệm vụ hay cách chấm: chỉ đọc tiến độ Workspace và lưu dữ liệu của riêng người dùng.
// Dữ liệu người dùng lưu ở localStorage "vaoviec-user-*" (mỗi khoá là object có updatedAt) và được site-header.js
// đồng bộ lên tài khoản như tiến độ nhiệm vụ.
(() => {
  const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const norm = v => String(v ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/\s+/g, " ").trim();
  const now = () => Date.now();
  const readLS = (k, d = null) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
  const writeLS = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };
  const icon = (d, cls = "") => `<svg class="vv-i ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const I = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    bell: '<path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
    star: '<path d="m12 3.5 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"/>',
    bookmark: '<path d="M7 4h10v16l-5-3.5L7 20z"/>',
    pin: '<path d="M9 4h6l-1 6 3 3H7l3-3z"/><path d="M12 13v7"/>',
    share: '<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="m8.2 10.8 7.6-4M8.2 13.2l7.6 4"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    check: '<path d="m5 12 5 5 9-10"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    up: '<path d="m6 15 6-6 6 6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    laptop: '<rect x="5" y="4" width="14" height="11" rx="1"/><path d="m5 15-3 4h20l-3-4"/>',
    user: '<circle cx="12" cy="7" r="3"/><path d="M5 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2z"/>',
    file: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 20h6"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    keyboard: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h.01M11 10h.01M15 10h.01M7 14h10"/>',
    play: '<path d="M8 5v14l11-7z"/>'
  };
  const MAX = 3; // số nghề tối đa khi so sánh

  // ---------- Kho dữ liệu người dùng ----------
  const K = {
    profile: "vaoviec-user-profile", favRoles: "vaoviec-user-fav-roles", favMissions: "vaoviec-user-fav-missions",
    recent: "vaoviec-user-recent", notifs: "vaoviec-user-notifs", pins: "vaoviec-user-pins",
    portfolio: "vaoviec-user-portfolio", attempts: "vaoviec-user-attempts"
  };
  const box = (key, def) => ({
    get: () => ({ ...structuredClone(def), ...readLS(key, {}) }),
    set: v => { writeLS(key, { ...v, updatedAt: now() }); dispatchEvent(new CustomEvent("vaoviec:user", { detail: key })); }
  });
  const S = {
    profile: box(K.profile, { name: "", avatar: "", cover: "", bio: "", university: "", major: "", cohort: "", skills: [], links: { linkedin: "", github: "", portfolio: "" }, cv: null }),
    favRoles: box(K.favRoles, { items: [] }),
    favMissions: box(K.favMissions, { items: [] }),
    recent: box(K.recent, { items: [] }),
    notifs: box(K.notifs, { items: [], removed: [] }),
    pins: box(K.pins, { items: [] }),
    portfolio: box(K.portfolio, { favorites: [], featured: [] }),
    attempts: box(K.attempts, { items: {} })
  };
  const account = () => (typeof readAccount === "function" ? readAccount() : null);
  const signedIn = () => !!account()?.id;

  // Yêu thích (nghề / nhiệm vụ): danh sách id, mới nhất trước.
  const fav = kind => {
    const s = kind === "role" ? S.favRoles : S.favMissions;
    return {
      list: () => s.get().items,
      has: id => s.get().items.some(x => x.id === id),
      toggle(id) {
        const v = s.get();
        const on = !v.items.some(x => x.id === id);
        v.items = on ? [{ id, at: now() }, ...v.items] : v.items.filter(x => x.id !== id);
        s.set(v);
        return on;
      }
    };
  };

  // Đã xem gần đây: nghề và nhiệm vụ.
  const recent = {
    list: (type) => S.recent.get().items.filter(x => !type || x.type === type),
    add(item) {
      const v = S.recent.get();
      const old = v.items.find(x => x.type === item.type && x.id === item.id);
      v.items = [{ ...item, at: now(), views: (old?.views ?? 0) + 1 }, ...v.items.filter(x => x !== old)].slice(0, 40);
      S.recent.set(v);
    },
    clear(type) { const v = S.recent.get(); v.items = type ? v.items.filter(x => x.type !== type) : []; S.recent.set(v); }
  };

  // Ghim truy cập nhanh.
  const DEFAULT_QUICK = [
    { type: "page", id: "career-map", title: "Bản đồ nghề nghiệp", sub: "82 nghề, 6 lĩnh vực", url: "/#/career-map", ic: "compass" },
    { type: "page", id: "playable", title: "Nghề có thể trải nghiệm", sub: "Lọc nghề đã có mô phỏng", url: "/#/career-map?playable", ic: "play" },
    { type: "page", id: "workspace", title: "Workspace", sub: "Mô phỏng đang làm và đã nộp", url: "/#/workspace", ic: "laptop" },
    { type: "page", id: "ho-so", title: "Hồ sơ trải nghiệm", sub: "Hồ sơ cá nhân và portfolio", url: "/#/ho-so", ic: "user" },
    { type: "page", id: "thong-bao", title: "Thông báo", sub: "Kết quả và cập nhật mới", url: "/#/thong-bao", ic: "bell" }
  ];
  const pins = {
    list: () => S.pins.get().items,
    has: (type, id) => S.pins.get().items.some(x => x.type === type && x.id === id),
    toggle(item) {
      const v = S.pins.get();
      const on = !v.items.some(x => x.type === item.type && x.id === item.id);
      v.items = on ? [...v.items, { type: item.type, id: item.id, title: item.title, sub: item.sub ?? "", url: item.url, ic: item.ic ?? "" }].slice(-8) : v.items.filter(x => !(x.type === item.type && x.id === item.id));
      S.pins.set(v);
      return on;
    }
  };

  // ---------- Chia sẻ / sao chép ----------
  async function copy(text, done = "Đã sao chép liên kết.") {
    try { await navigator.clipboard.writeText(text); window.vvToast?.(done, "success"); return true; }
    catch {
      const t = Object.assign(document.createElement("textarea"), { value: text });
      document.body.append(t); t.select();
      const ok = document.execCommand?.("copy");
      t.remove();
      window.vvToast?.(ok ? done : "Không sao chép được. Hãy sao chép thủ công: " + text, ok ? "success" : "error", ok ? 3600 : 8000);
      return !!ok;
    }
  }
  async function share({ title, text, url }) {
    const full = new URL(url, location.origin).href;
    if (navigator.share && matchMedia("(pointer: coarse)").matches) {
      try { await navigator.share({ title, text, url: full }); return; } catch (e) { if (e?.name === "AbortError") return; }
    }
    copy(full);
  }

  // ---------- Mission registry (lấy từ app.js / career-data khi có) ----------
  const hasMissions = () => typeof missions !== "undefined";
  const roleList = () => (typeof careerData !== "undefined" ? careerData.roles : []);
  function missionMeta(id) {
    const role = roleList().find(r => r.mission_id === id && r.simulation_status === "available");
    const m = hasMissions() ? missions[id] : null;
    return { id, role, mission: m, title: role?.role_name ?? (pageCase()?.id === id ? pageCase().title : id), url: m ? m.url : role ? "/#/roles/" + role.role_slug : location.pathname };
  }
  // Case của trang nhiệm vụ hiện tại (Talent Acquisition dùng cấu trúc CASE riêng).
  function pageCase() {
    if (typeof CASE === "undefined") return null;
    const id = CASE.id ?? (CASE.roleSlug === "talent-acquisition-intern" ? "MISSION_001" : "");
    return { id, title: CASE.role ?? CASE.roleName ?? document.title, caseName: CASE.ui?.caseName ?? CASE.caseName ?? "", key: CASE.ui?.storageKey ?? (id ? `vaoviec-workspace-mission-${id.slice(-3)}-v1` : "") };
  }
  const keyToMission = key => { const m = String(key).match(/^vaoviec-workspace-mission-(\d{3})-v\d+$/); return m ? "MISSION_" + m[1] : null; };
  function submissionsOf(key) {
    const st = readLS(key);
    if (!st) return [];
    const subs = [...(st.history ?? []), ...(st.submission ? [st.submission] : [])];
    const past = (readLS(key + "-portfolio") ?? []).flatMap(run => run.versions ?? [run]);
    return [...past, ...subs].map((s, i) => ({ id: String(s.id ?? i), version: s.version ?? i + 1, at: s.at ?? s.submittedAt ?? 0, ai: s.ai, attemptId: s.attemptId ?? "" }));
  }
  const workspaceKeys = () => { const out = []; try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (keyToMission(k)) out.push(k); } } catch {} return out; };

  // ---------- Thời gian làm bài: ghi khi bắt đầu / nộp (bọc vvTrack, không đổi sự kiện gốc) ----------
  function hookTrack() {
    const orig = window.vvTrack;
    if (!orig || orig.__vv) return;
    const wrapped = (name, data = {}) => {
      try {
        const id = data.attempt_id;
        if (id) {
          const v = S.attempts.get();
          const a = v.items[id] ?? { mission: data.mission_id, start: 0, submit: 0 };
          if (name === "mission_started" && !a.start) a.start = now();
          if (name === "mission_submitted" && !a.submit) a.submit = now();
          v.items[id] = a;
          const keys = Object.keys(v.items);
          if (keys.length > 200) for (const k of keys.slice(0, keys.length - 200)) delete v.items[k];
          S.attempts.set(v);
        }
        if (name === "mission_completed") setTimeout(scanNotifications, 600);
      } catch { /* bỏ qua */ }
      return orig(name, data);
    };
    wrapped.__vv = true;
    window.vvTrack = wrapped;
  }
  // Số phút làm bài của một lượt (bắt đầu → nộp lần đầu), nếu đã ghi được.
  const duration = attemptId => { const a = S.attempts.get().items[attemptId]; return a?.start && a?.submit && a.submit > a.start ? Math.max(1, Math.round((a.submit - a.start) / 60000)) : 0; };

  // ---------- Thông báo ----------
  const CATS = { result: { label: "Kết quả", ic: "trophy" }, mission: { label: "Nhiệm vụ", ic: "laptop" }, profile: { label: "Hồ sơ", ic: "user" }, system: { label: "Hệ thống", ic: "spark" } };
  // Cập nhật sản phẩm thật (không phải thông báo giả): nhiệm vụ / dữ liệu mới đã lên web.
  const ANNOUNCEMENTS = [
    { id: "ann-mission-007", cat: "mission", at: Date.parse("2026-11-18T10:00:00+07:00"), title: "Nhiệm vụ mới: Equity Research", body: "Đọc báo cáo tài chính, tách lãi bất thường và viết bản tin khuyến nghị cổ phiếu. Đã được chuyên gia CFA rà soát.", url: "/#/roles/equity-research-analyst" },
    { id: "ann-careermap-82", cat: "system", at: Date.parse("2026-11-18T23:30:00+07:00"), title: "Career Map mở rộng lên 82 nghề", body: "Thêm lĩnh vực Chuỗi cung ứng & Logistics, chức danh và nguồn tham khảo cho từng nghề.", url: "/#/career-map" }
  ];
  const notifs = {
    list: () => S.notifs.get().items.sort((a, b) => b.at - a.at),
    unread: () => S.notifs.get().items.filter(x => !x.read).length,
    add(n) {
      const v = S.notifs.get();
      if (v.items.some(x => x.id === n.id) || v.removed.includes(n.id)) return false;
      v.items = [{ read: false, ...n }, ...v.items].sort((a, b) => b.at - a.at).slice(0, 120);
      S.notifs.set(v);
      return true;
    },
    setRead(id, read = true) { const v = S.notifs.get(); for (const x of v.items) if (id === "*" || x.id === id) x.read = read; S.notifs.set(v); },
    remove(id) { const v = S.notifs.get(); const ids = id === "*read" ? v.items.filter(x => x.read).map(x => x.id) : [id]; v.items = v.items.filter(x => !ids.includes(x.id)); v.removed = [...new Set([...v.removed, ...ids])].slice(-300); S.notifs.set(v); }
  };
  function scanNotifications() {
    let added = false;
    const first = !readLS(K.notifs);
    added = notifs.add({ id: "welcome", cat: "system", at: first ? now() : 0, title: "Chào mừng đến VAOVIEC.", body: "Khám phá 82 nghề, thử 15 phút một mô phỏng công việc và lưu kết quả vào hồ sơ trải nghiệm.", url: "/#/career-map" }) || added;
    for (const a of ANNOUNCEMENTS) added = notifs.add(a) || added;
    // Kết quả AI: chỉ quét Workspace của trang hiện tại (trang nhiệm vụ) hoặc mọi Workspace (trang chính).
    const pc = pageCase();
    const keys = pc ? (pc.key ? [pc.key] : []) : workspaceKeys();
    for (const key of keys) {
      const mid = keyToMission(key) ?? pc?.id ?? "";
      const meta = missionMeta(mid);
      const onPage = !!pc;
      for (const s of submissionsOf(key)) {
        const r = s.ai?.status === "done" ? s.ai.review : null;
        if (!r) continue;
        const pass = r.criteria.filter(c => c.status === "Đạt").length;
        added = notifs.add({
          id: `result-${key}-${s.id}`, cat: "result", at: s.at || now(),
          title: `Đã có nhận xét: ${meta.title} · Bản ${s.version}`,
          body: `${pass}/${r.criteria.length} tiêu chí Đạt${r.effort_level ? ` · Mức đầu tư: ${r.effort_level}` : ""}. Mở để xem nhận xét chi tiết.`,
          url: onPage ? location.pathname + "#result=" + encodeURIComponent(s.id) : meta.mission ? meta.mission.url + "#result=" + encodeURIComponent(s.id) : "/#/ho-so"
        }) || added;
      }
      // Nhắc bài làm dở hơn 1 ngày chưa đụng tới.
      const st = readLS(key);
      if (st && !st.submission && st.introSeen && st.updatedAt && now() - st.updatedAt > 864e5) {
        added = notifs.add({ id: `remind-${key}-${st.attemptId ?? st.updatedAt}`, cat: "mission", at: now(), title: `Bạn đang làm dở: ${meta.title}`, body: st.progress?.label ? `Bước tiếp theo: ${st.progress.label}.` : "Tiếp tục để nhận nhận xét từ AI.", url: meta.mission?.url ?? "/#/workspace" }) || added;
      }
    }
    // Gợi ý hoàn thiện hồ sơ khi đã nộp ít nhất 1 bài mà hồ sơ còn trống nhiều.
    if (hasMissions()) {
      const c = completion();
      if (c.pct < 50 && workspaceKeys().some(k => submissionsOf(k).length)) added = notifs.add({ id: "tip-profile", cat: "profile", at: now(), title: "Hoàn thiện hồ sơ trải nghiệm", body: `Hồ sơ mới hoàn thiện ${c.pct}%. Thêm ảnh, giới thiệu và kỹ năng để hồ sơ thuyết phục hơn khi chia sẻ.`, url: "/#/ho-so" }) || added;
    }
    if (added) refreshBell();
  }

  // ---------- Hồ sơ cá nhân ----------
  const profile = () => S.profile.get();
  function displayName() { return account()?.name || profile().name || ""; }
  function avatarSrc() { return profile().avatar || account()?.picture || ""; }
  function initialsOf(name) { const p = String(name).trim().split(/\s+/).filter(Boolean); return p.length ? (p.length > 1 ? p[0][0] + p.at(-1)[0] : p[0].slice(0, 2)).toUpperCase() : ""; }
  function avatarHTML(cls = "") {
    const src = avatarSrc(), name = displayName();
    if (src) return `<span class="vv-avatar ${cls}"><img src="${esc(src)}" alt="" referrerpolicy="no-referrer"></span>`;
    if (name) return `<span class="vv-avatar ${cls}">${esc(initialsOf(name))}</span>`;
    return `<span class="vv-avatar ${cls} is-empty">${icon(I.user)}</span>`;
  }
  // Mức hoàn thiện hồ sơ: không bắt buộc, chỉ để gợi ý.
  function completion() {
    const p = profile();
    const submitted = workspaceKeys().some(k => submissionsOf(k).length);
    const items = [
      { id: "avatar", label: "Ảnh đại diện", w: 15, ok: !!avatarSrc(), go: "photo" },
      { id: "name", label: "Tên hiển thị", w: 10, ok: !!displayName(), go: "info" },
      { id: "study", label: "Trường và chuyên ngành", w: 15, ok: !!(p.university && p.major), go: "info" },
      { id: "cohort", label: "Khoá học", w: 5, ok: !!p.cohort, go: "info" },
      { id: "bio", label: "Giới thiệu bản thân", w: 15, ok: (p.bio ?? "").trim().length >= 30, go: "bio" },
      { id: "skills", label: "Ít nhất 3 kỹ năng", w: 10, ok: (p.skills ?? []).length >= 3, go: "skills" },
      { id: "links", label: "Liên kết LinkedIn / GitHub / Portfolio", w: 10, ok: Object.values(p.links ?? {}).some(Boolean), go: "links" },
      { id: "cv", label: "CV cá nhân", w: 10, ok: !!p.cv, go: "cv" },
      { id: "mission", label: "Nộp 1 mô phỏng", w: 10, ok: submitted, go: "mission" }
    ];
    const pct = items.reduce((n, x) => n + (x.ok ? x.w : 0), 0);
    return { pct, items, missing: items.filter(x => !x.ok) };
  }
  function saveProfile(patch) {
    const v = { ...profile(), ...patch };
    S.profile.set(v);
    dispatchEvent(new CustomEvent("vaoviec:profile", { detail: v }));
    if (typeof refreshAccount === "function") refreshAccount();
    return v;
  }

  // ---------- Cắt ảnh (ảnh đại diện vuông, ảnh bìa 4:1) ----------
  const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
  function pickFile(accept) {
    return new Promise(resolve => {
      const input = Object.assign(document.createElement("input"), { type: "file", accept });
      input.addEventListener("change", () => resolve(input.files?.[0] ?? null), { once: true });
      input.click();
    });
  }
  function cropImage(file, { aspect = 1, outW = 320, round = true, title = "Căn chỉnh ảnh" } = {}) {
    return new Promise(resolve => {
      if (!IMAGE_TYPES.includes(file.type)) { window.vvToast?.("Chỉ nhận ảnh JPG, JPEG, PNG hoặc WebP.", "error"); return resolve(null); }
      if (file.size > 8 * 1024 * 1024) { window.vvToast?.("Ảnh quá lớn (tối đa 8 MB).", "error"); return resolve(null); }
      const url = URL.createObjectURL(file);
      const img = new Image();
      const dlg = document.createElement("dialog");
      dlg.className = "vv-dialog vv-crop";
      dlg.innerHTML = `<form method="dialog" class="vv-dialog-body">
          <header class="vv-dialog-head"><h2>${esc(title)}</h2><button type="button" class="vv-icon-btn" data-x aria-label="Đóng">${icon(I.close)}</button></header>
          <div class="vv-crop-stage" style="--ar:${aspect}"><div class="vv-crop-load">Đang tải ảnh…</div><img alt="" draggable="false" hidden><div class="vv-crop-mask ${round ? "round" : ""}"></div></div>
          <label class="vv-crop-zoom"><span>Thu phóng</span><input type="range" min="1" max="4" step="0.01" value="1" aria-label="Thu phóng ảnh"></label>
          <p class="vv-hint">Kéo ảnh để căn chỉnh. ${round ? "Phần trong vòng tròn sẽ là ảnh đại diện." : "Phần trong khung sẽ là ảnh bìa."}</p>
          <footer class="vv-dialog-foot"><button type="button" class="vv-btn vv-btn-ghost" data-reset>Căn giữa</button><span></span><button type="button" class="vv-btn vv-btn-ghost" data-x>Huỷ</button><button type="submit" class="vv-btn vv-btn-primary" data-ok disabled>Dùng ảnh này</button></footer>
        </form>`;
      document.body.append(dlg);
      const stage = dlg.querySelector(".vv-crop-stage"), el = dlg.querySelector("img"), zoom = dlg.querySelector('input[type="range"]');
      let base = 1, z = 1, x = 0, y = 0, sw = 0, sh = 0;
      const clamp = () => {
        const w = img.naturalWidth * base * z, h = img.naturalHeight * base * z;
        x = Math.min(0, Math.max(sw - w, x)); y = Math.min(0, Math.max(sh - h, y));
      };
      const draw = () => { clamp(); el.style.width = img.naturalWidth * base * z + "px"; el.style.transform = `translate(${x}px, ${y}px)`; };
      const center = () => { z = 1; zoom.value = 1; const w = img.naturalWidth * base, h = img.naturalHeight * base; x = (sw - w) / 2; y = (sh - h) / 2; draw(); };
      const finish = val => { URL.revokeObjectURL(url); if (dlg.open) dlg.close(); dlg.remove(); resolve(val); };
      img.onload = () => {
        el.src = url; el.hidden = false; dlg.querySelector(".vv-crop-load").remove();
        const r = stage.getBoundingClientRect(); sw = r.width; sh = r.height;
        base = Math.max(sw / img.naturalWidth, sh / img.naturalHeight);
        center(); dlg.querySelector("[data-ok]").disabled = false;
      };
      img.onerror = () => { window.vvToast?.("Không đọc được ảnh này. Thử ảnh khác.", "error"); finish(null); };
      zoom.addEventListener("input", () => {
        const cx = sw / 2, cy = sh / 2, old = z; z = +zoom.value;
        x = cx - (cx - x) * (z / old); y = cy - (cy - y) * (z / old); draw();
      });
      stage.addEventListener("wheel", e => { e.preventDefault(); zoom.value = Math.min(4, Math.max(1, z * (e.deltaY < 0 ? 1.08 : 0.93))); zoom.dispatchEvent(new Event("input")); }, { passive: false });
      let drag = null;
      stage.addEventListener("pointerdown", e => { drag = { px: e.clientX, py: e.clientY, x, y }; stage.setPointerCapture(e.pointerId); });
      stage.addEventListener("pointermove", e => { if (!drag) return; x = drag.x + e.clientX - drag.px; y = drag.y + e.clientY - drag.py; draw(); });
      stage.addEventListener("pointerup", () => { drag = null; });
      stage.addEventListener("keydown", e => { const d = { ArrowLeft: [8, 0], ArrowRight: [-8, 0], ArrowUp: [0, 8], ArrowDown: [0, -8] }[e.key]; if (d) { e.preventDefault(); x += d[0]; y += d[1]; draw(); } });
      stage.tabIndex = 0;
      dlg.querySelector("[data-reset]").addEventListener("click", center);
      dlg.querySelectorAll("[data-x]").forEach(b => b.addEventListener("click", () => finish(null)));
      dlg.addEventListener("cancel", e => { e.preventDefault(); finish(null); });
      dlg.querySelector("form").addEventListener("submit", e => {
        e.preventDefault();
        const outH = Math.round(outW / aspect);
        const c = Object.assign(document.createElement("canvas"), { width: outW, height: outH });
        const k = outW / sw;
        const g = c.getContext("2d");
        g.fillStyle = "#fff"; g.fillRect(0, 0, outW, outH);
        g.imageSmoothingQuality = "high";
        g.drawImage(img, x * k, y * k, img.naturalWidth * base * z * k, img.naturalHeight * base * z * k);
        let data = c.toDataURL("image/webp", 0.85);
        if (!data.startsWith("data:image/webp")) data = c.toDataURL("image/jpeg", 0.85);
        finish(data);
      });
      dlg.showModal();
      img.src = url;
    });
  }

  // ---------- CV (PDF): lưu trên máy (IndexedDB); có tài khoản thì lưu thêm lên tài khoản nếu ≤ 680 KB ----------
  const CV_MAX = 2 * 1024 * 1024, CV_SYNC_MAX = 680 * 1024;
  const idb = () => new Promise((res, rej) => { const r = indexedDB.open("vaoviec", 1); r.onupgradeneeded = () => r.result.createObjectStore("files"); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  async function idbDo(mode, fn) { const db = await idb(); return new Promise((res, rej) => { const tx = db.transaction("files", mode); const st = tx.objectStore("files"); const r = fn(st); tx.oncomplete = () => res(r?.result); tx.onerror = () => rej(tx.error); }); }
  const toB64 = blob => new Promise(r => { const f = new FileReader(); f.onload = () => r(String(f.result).split(",")[1]); f.readAsDataURL(blob); });
  const cv = {
    async get() {
      try { const local = await idbDo("readonly", st => st.get("cv")); if (local) return local; } catch { /* không có IndexedDB */ }
      if (!signedIn() || !profile().cv?.synced) return null;
      try {
        const res = await fetch("/api/auth?action=cv", { credentials: "same-origin", cache: "no-store" });
        if (!res.ok) return null;
        const d = await res.json();
        if (!d?.data) return null;
        const blob = new Blob([Uint8Array.from(atob(d.data), c => c.charCodeAt(0))], { type: "application/pdf" });
        const rec = { name: d.name, size: blob.size, at: d.at, blob };
        try { await idbDo("readwrite", st => st.put(rec, "cv")); } catch {}
        return rec;
      } catch { return null; }
    },
    async upload() {
      const file = await pickFile("application/pdf,.pdf");
      if (!file) return null;
      if (file.type !== "application/pdf" && !/\.pdf$/i.test(file.name)) { window.vvToast?.("CV cần là file PDF.", "error"); return null; }
      if (file.size > CV_MAX) { window.vvToast?.("CV quá lớn (tối đa 2 MB). Hãy xuất PDF nhẹ hơn.", "error"); return null; }
      const head = new Uint8Array(await file.slice(0, 5).arrayBuffer());
      if (String.fromCharCode(...head) !== "%PDF-") { window.vvToast?.("File không phải PDF hợp lệ.", "error"); return null; }
      const rec = { name: file.name.slice(0, 120), size: file.size, at: now(), blob: file };
      try { await idbDo("readwrite", st => st.put(rec, "cv")); } catch { window.vvToast?.("Trình duyệt không cho lưu file.", "error"); return null; }
      let synced = false;
      if (signedIn() && file.size <= CV_SYNC_MAX) {
        try {
          const res = await fetch("/api/auth?action=cv", { method: "POST", credentials: "same-origin", headers: { "x-vaoviec": "1", "Content-Type": "text/plain;charset=UTF-8" }, body: JSON.stringify({ name: rec.name, data: await toB64(file) }) });
          synced = res.ok;
        } catch { synced = false; }
      }
      saveProfile({ cv: { name: rec.name, size: rec.size, at: rec.at, synced } });
      window.vvToast?.(synced ? "Đã lưu CV vào hồ sơ và tài khoản." : signedIn() && file.size > CV_SYNC_MAX ? "Đã lưu CV trên máy này (file trên 680 KB nên chưa lưu lên tài khoản)." : "Đã lưu CV trên máy này.", "success", 5000);
      return rec;
    },
    async remove() {
      try { await idbDo("readwrite", st => st.delete("cv")); } catch {}
      if (signedIn()) { try { await fetch("/api/auth?action=cv-delete", { method: "POST", credentials: "same-origin", headers: { "x-vaoviec": "1" }, body: "{}" }); } catch {} }
      saveProfile({ cv: null });
    },
    async clearLocal() { try { await idbDo("readwrite", st => st.delete("cv")); } catch {} },
    async preview() {
      const rec = await cv.get();
      if (!rec) { window.vvToast?.("Không tìm thấy file CV trên máy này. Hãy tải CV lên lại.", "error"); return; }
      const url = URL.createObjectURL(rec.blob);
      const dlg = document.createElement("dialog");
      dlg.className = "vv-dialog vv-cv";
      dlg.innerHTML = `<div class="vv-dialog-body"><header class="vv-dialog-head"><h2>${icon(I.file)} ${esc(rec.name)}</h2><button type="button" class="vv-icon-btn" data-x aria-label="Đóng">${icon(I.close)}</button></header>
        <iframe src="${url}#view=FitH" title="Xem trước CV"></iframe>
        <footer class="vv-dialog-foot"><span class="vv-hint">${(rec.size / 1024).toFixed(0)} KB · tải lên ${new Date(rec.at).toLocaleDateString("vi-VN")}</span><a class="vv-btn vv-btn-ghost" href="${url}" download="${esc(rec.name)}">Tải xuống</a><button type="button" class="vv-btn vv-btn-primary" data-x>Đóng</button></footer></div>`;
      document.body.append(dlg);
      const close = () => { dlg.close(); dlg.remove(); URL.revokeObjectURL(url); };
      dlg.querySelectorAll("[data-x]").forEach(b => b.addEventListener("click", close));
      dlg.addEventListener("cancel", e => { e.preventDefault(); close(); });
      dlg.showModal();
    }
  };

  // ---------- Trình sửa hồ sơ ----------
  const LINK_FIELDS = [["linkedin", "LinkedIn", "https://www.linkedin.com/in/…"], ["github", "GitHub", "https://github.com/…"], ["portfolio", "Portfolio / website", "https://…"]];
  const validUrl = v => { if (!v) return true; try { const u = new URL(v); return u.protocol === "https:" || u.protocol === "http:"; } catch { return false; } };
  function openProfileEditor(section = "info") {
    if (section === "mission") { location.href = "/#/workspace"; return; }
    const p = profile();
    const name = displayName();
    const dlg = document.createElement("dialog");
    dlg.className = "vv-dialog vv-editor";
    let skills = [...(p.skills ?? [])];
    let avatar = p.avatar, cover = p.cover;
    dlg.innerHTML = `<form class="vv-dialog-body" novalidate>
      <header class="vv-dialog-head"><h2>Chỉnh sửa hồ sơ</h2><button type="button" class="vv-icon-btn" data-x aria-label="Đóng">${icon(I.close)}</button></header>
      <nav class="vv-editor-nav" aria-label="Mục hồ sơ">${[["photo", "Ảnh"], ["info", "Thông tin"], ["bio", "Giới thiệu"], ["skills", "Kỹ năng"], ["links", "Liên kết"], ["cv", "CV"]].map(([id, l]) => `<a href="#pe-${id}" data-jump="${id}">${l}</a>`).join("")}</nav>
      <div class="vv-editor-scroll">
        <section id="pe-photo"><h3>Ảnh đại diện &amp; ảnh bìa</h3>
          <div class="vv-editor-cover" data-cover-preview></div>
          <div class="vv-editor-photo"><span data-avatar-preview></span>
            <div class="vv-editor-photo-actions"><button type="button" class="vv-btn vv-btn-ghost" data-act="avatar">${icon(I.camera)} Đổi ảnh đại diện</button><button type="button" class="vv-btn vv-btn-text" data-act="avatar-del">Xoá ảnh</button>
            <button type="button" class="vv-btn vv-btn-ghost" data-act="cover">Đổi ảnh bìa</button><button type="button" class="vv-btn vv-btn-text" data-act="cover-del">Xoá ảnh bìa</button></div></div>
          <p class="vv-hint">JPG, JPEG, PNG hoặc WebP, tối đa 8 MB. Ảnh được cắt và nén trước khi lưu.</p></section>
        <section id="pe-info"><h3>Thông tin</h3>
          <label>Tên hiển thị<input name="name" maxlength="60" value="${esc(name)}" autocomplete="name"></label>
          <div class="vv-two"><label>Trường đại học<input name="university" maxlength="80" value="${esc(p.university || account()?.school || "")}" placeholder="VD: ĐH Kinh tế Quốc dân"></label>
          <label>Chuyên ngành<input name="major" maxlength="80" value="${esc(p.major)}" placeholder="VD: Tài chính doanh nghiệp"></label></div>
          <label>Khoá học<input name="cohort" maxlength="40" value="${esc(p.cohort)}" placeholder="VD: K64 · Năm 3"></label></section>
        <section id="pe-bio"><h3>Giới thiệu bản thân</h3>
          <label><span class="vv-sr">Giới thiệu</span><textarea name="bio" maxlength="600" rows="4" placeholder="2–3 câu về bạn: đang học gì, quan tâm nghề nào, muốn thử sức ở đâu.">${esc(p.bio)}</textarea></label><p class="vv-hint" data-bio-count></p></section>
        <section id="pe-skills"><h3>Kỹ năng</h3>
          <div class="vv-tags" data-skills></div>
          <div class="vv-tag-add"><input name="skill" maxlength="40" placeholder="Nhập kỹ năng rồi nhấn Enter" list="vv-skill-list"><button type="button" class="vv-btn vv-btn-ghost" data-act="skill-add">Thêm</button></div>
          <datalist id="vv-skill-list">${[...new Set(roleList().flatMap(r => r.required_skills))].slice(0, 300).map(s => `<option value="${esc(s)}">`).join("")}</datalist></section>
        <section id="pe-links"><h3>Liên kết</h3>${LINK_FIELDS.map(([k, l, ph]) => `<label>${l}<input name="link-${k}" type="url" maxlength="200" value="${esc(p.links?.[k] ?? "")}" placeholder="${ph}"></label>`).join("")}</section>
        <section id="pe-cv"><h3>CV cá nhân</h3><div data-cv></div></section>
      </div>
      <p class="vv-error" role="alert" hidden></p>
      <footer class="vv-dialog-foot"><span class="vv-hint">Không bắt buộc điền đủ. Lưu lúc nào cũng được.</span><button type="button" class="vv-btn vv-btn-ghost" data-x>Huỷ</button><button type="submit" class="vv-btn vv-btn-primary">Lưu hồ sơ</button></footer>
    </form>`;
    document.body.append(dlg);
    const f = dlg.querySelector("form"), err = dlg.querySelector(".vv-error");
    const paint = () => {
      dlg.querySelector("[data-avatar-preview]").innerHTML = avatar ? `<span class="vv-avatar xl"><img src="${esc(avatar)}" alt="Ảnh đại diện"></span>` : `<span class="vv-avatar xl ${name ? "" : "is-empty"}">${name ? esc(initialsOf(name)) : icon(I.user)}</span>`;
      dlg.querySelector("[data-cover-preview]").style.backgroundImage = cover ? `url("${cover}")` : "";
      dlg.querySelector("[data-cover-preview]").classList.toggle("has", !!cover);
      dlg.querySelector('[data-act="avatar-del"]').hidden = !avatar;
      dlg.querySelector('[data-act="cover-del"]').hidden = !cover;
      dlg.querySelector("[data-skills]").innerHTML = skills.length ? skills.map((s, i) => `<span class="vv-tag">${esc(s)}<button type="button" data-skill-del="${i}" aria-label="Xoá kỹ năng ${esc(s)}">${icon(I.close)}</button></span>`).join("") : '<span class="vv-hint">Chưa có kỹ năng nào.</span>';
      dlg.querySelector("[data-bio-count]").textContent = `${f.elements.bio.value.length}/600 ký tự`;
      const c = profile().cv;
      dlg.querySelector("[data-cv]").innerHTML = c
        ? `<div class="vv-file">${icon(I.file)}<span><strong>${esc(c.name)}</strong><small>${(c.size / 1024).toFixed(0)} KB · ${c.synced ? "đã lưu lên tài khoản" : "lưu trên máy này"}</small></span><button type="button" class="vv-btn vv-btn-ghost" data-act="cv-view">Xem</button><button type="button" class="vv-btn vv-btn-ghost" data-act="cv-up">Thay</button><button type="button" class="vv-btn vv-btn-text danger" data-act="cv-del">Xoá</button></div>`
        : `<button type="button" class="vv-drop" data-act="cv-up">${icon(I.file)}<strong>Tải CV lên (PDF, tối đa 2 MB)</strong><small>${signedIn() ? "CV dưới 680 KB được lưu cả lên tài khoản." : "CV được lưu trên máy này. Đăng nhập để lưu lên tài khoản."}</small></button>`;
    };
    const addSkill = () => {
      const v = f.elements.skill.value.trim();
      if (!v) return;
      if (skills.length >= 20) { err.hidden = false; err.textContent = "Tối đa 20 kỹ năng."; return; }
      if (!skills.some(s => norm(s) === norm(v))) skills.push(v);
      f.elements.skill.value = ""; paint();
    };
    const close = () => { dlg.close(); dlg.remove(); };
    dlg.addEventListener("cancel", e => { e.preventDefault(); close(); });
    f.elements.skill.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } });
    f.elements.bio.addEventListener("input", () => { dlg.querySelector("[data-bio-count]").textContent = `${f.elements.bio.value.length}/600 ký tự`; });
    dlg.addEventListener("click", async e => {
      if (e.target.closest("[data-x]")) return close();
      const jump = e.target.closest("[data-jump]");
      if (jump) { e.preventDefault(); dlg.querySelector("#pe-" + jump.dataset.jump)?.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
      const del = e.target.closest("[data-skill-del]");
      if (del) { skills.splice(+del.dataset.skillDel, 1); paint(); return; }
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (!act) return;
      if (act === "skill-add") addSkill();
      if (act === "avatar" || act === "cover") {
        const file = await pickFile(IMAGE_TYPES.join(","));
        if (!file) return;
        const out = await cropImage(file, act === "avatar" ? { aspect: 1, outW: 320, round: true, title: "Căn chỉnh ảnh đại diện" } : { aspect: 4, outW: 1200, round: false, title: "Căn chỉnh ảnh bìa" });
        if (out) { if (act === "avatar") avatar = out; else cover = out; paint(); window.vvToast?.("Đã chọn ảnh. Bấm Lưu hồ sơ để cập nhật.", "info"); }
      }
      if (act === "avatar-del") { avatar = ""; paint(); }
      if (act === "cover-del") { cover = ""; paint(); }
      if (act === "cv-up") { const b = e.target.closest("button"); b.disabled = true; b.classList.add("is-busy"); await cv.upload(); paint(); }
      if (act === "cv-view") cv.preview();
      if (act === "cv-del") {
        const ok = await window.vvConfirm({ title: "Xoá CV?", message: "File CV sẽ bị xoá khỏi hồ sơ" + (signedIn() ? " và tài khoản." : " trên máy này."), confirmLabel: "Xoá CV", tone: "danger" });
        if (ok) { await cv.remove(); paint(); window.vvToast?.("Đã xoá CV.", "success"); }
      }
    });
    f.addEventListener("submit", async e => {
      e.preventDefault();
      err.hidden = true;
      const el = f.elements;
      const links = Object.fromEntries(LINK_FIELDS.map(([k]) => [k, el["link-" + k].value.trim()]));
      const bad = LINK_FIELDS.find(([k]) => !validUrl(links[k]));
      if (bad) { err.hidden = false; err.textContent = `Liên kết ${bad[1]} chưa đúng (cần bắt đầu bằng https://).`; el["link-" + bad[0]].focus(); return; }
      if (el.skill.value.trim()) addSkill();
      const btn = f.querySelector('[type="submit"]'); btn.disabled = true; btn.classList.add("is-busy");
      const newName = el.name.value.trim();
      try {
        if (signedIn() && (newName !== account().name || el.university.value.trim() !== (account().school ?? ""))) {
          if (!newName) throw new Error("Tài khoản cần có tên hiển thị.");
          const res = await fetch("/api/auth?action=profile", { method: "POST", credentials: "same-origin", headers: { "x-vaoviec": "1", "Content-Type": "text/plain;charset=UTF-8" }, body: JSON.stringify({ name: newName, school: el.university.value.trim() }) });
          const d = await res.json().catch(() => ({}));
          if (!res.ok) throw new Error(d.error || "Không lưu được tên lên tài khoản.");
          if (typeof remember === "function") remember(d.user);
        }
        saveProfile({ name: newName, avatar, cover, bio: el.bio.value.trim(), university: el.university.value.trim(), major: el.major.value.trim(), cohort: el.cohort.value.trim(), skills, links });
        close();
        window.vvToast?.("Đã lưu hồ sơ.", "success");
      } catch (ex) { err.hidden = false; err.textContent = ex.message; }
      finally { btn.disabled = false; btn.classList.remove("is-busy"); }
    });
    paint();
    dlg.showModal();
    requestAnimationFrame(() => dlg.querySelector("#pe-" + section)?.scrollIntoView({ block: "start" }));
  }


  // ---------- Thẻ hồ sơ công khai (Xem như người khác, trang công khai, in) ----------
  const LINK_LABEL = { linkedin: "LinkedIn", github: "GitHub", portfolio: "Portfolio" };
  function publicCard(s, { heading = "h2" } = {}) {
    const headline = [s.major, s.university, s.cohort].filter(Boolean).join(" · ");
    const av = s.avatar ? `<span class="vv-avatar"><img src="${esc(s.avatar)}" alt="Ảnh đại diện ${esc(s.name)}"></span>` : `<span class="vv-avatar${s.name ? "" : " is-empty"}">${s.name ? esc(initialsOf(s.name)) : icon(I.user)}</span>`;
    const projects = s.projects ?? [];
    return `<article class="pp-card">
      <div class="pp-cover"${s.cover ? ` style="background-image:url('${esc(s.cover)}')"` : ""}></div>
      <div class="pp-main">
        <div class="pp-who">${av}<div class="pp-id"><${heading}>${esc(s.name || "Người dùng VAOVIEC.")}</${heading}>${headline ? `<p>${esc(headline)}</p>` : ""}</div></div>
        ${s.bio ? `<p class="pp-bio">${esc(s.bio)}</p>` : ""}
        ${s.skills?.length ? `<div class="pp-skills">${s.skills.map(x => `<span>${esc(x)}</span>`).join("")}</div>` : ""}
        ${Object.entries(s.links ?? {}).some(([, v]) => v) ? `<div class="pp-links">${Object.entries(s.links).filter(([, v]) => v).map(([k, v]) => `<a href="${esc(v)}" target="_blank" rel="noopener noreferrer nofollow">${icon(I.link)}${LINK_LABEL[k] ?? k}</a>`).join("")}</div>` : ""}
        <ul class="pp-stats"><li><b>${s.stats?.submitted ?? 0}</b><span>mô phỏng đã hoàn thành</span></li><li><b>${s.stats?.fields ?? 0}</b><span>lĩnh vực đã thử</span></li><li><b>${s.stats?.versions ?? 0}</b><span>phiên bản đã nộp</span></li></ul>
        ${projects.length ? `<div class="pp-projects">${projects.map(pr => `<div class="pp-project${pr.featured ? " featured" : ""}">
          ${pr.featured ? `<span class="pp-tag">${icon(I.star)}Dự án nổi bật</span>` : `<span class="pp-tag" style="color:var(--vv-muted)">${esc(pr.field)}</span>`}
          ${pr.total ? `<span class="pp-score">${pr.pass}/${pr.total}</span>` : ""}
          <h3>${esc(pr.title)}</h3><p>${esc(pr.company)} · ${esc(pr.caseName)}</p>
          <p>${pr.versions} phiên bản${pr.minutes ? ` · làm trong ${pr.minutes} phút` : ""}${pr.at ? ` · ${new Date(pr.at).toLocaleDateString("vi-VN")}` : ""}</p>
          ${pr.summary ? `<p class="pp-sum">“${esc(pr.summary)}”</p>` : ""}
        </div>`).join("")}</div>` : `<p class="vv-hint" style="margin-top:14px">Chưa có mô phỏng nào được nộp.</p>`}
      </div>
    </article>`;
  }

  // ---------- Thanh điều hướng: nút tìm kiếm + chuông ----------
  function headerTools() {
    const slot = document.querySelector(".site-header-tools");
    if (!slot) return;
    const n = notifs.unread();
    // Đã có nút: chỉ cập nhật số chưa đọc, giữ nguyên dropdown đang mở.
    const bell = slot.querySelector('[data-vv="bell"]');
    if (bell) {
      bell.setAttribute("aria-label", `Thông báo${n ? `, ${n} chưa đọc` : ""}`);
      bell.querySelector(".hdr-badge")?.remove();
      if (n) bell.insertAdjacentHTML("beforeend", `<b class="hdr-badge">${n > 9 ? "9+" : n}</b>`);
      return;
    }
    panel = null; // header vừa vẽ lại: dropdown cũ (nếu có) đã bị gỡ cùng header.
    slot.innerHTML = `<button type="button" class="hdr-tool" data-vv="search" aria-label="Tìm kiếm (Ctrl+K)">${icon(I.search)}</button>
      <span class="hdr-bell"><button type="button" class="hdr-tool" data-vv="bell" aria-haspopup="true" aria-expanded="false" aria-label="Thông báo${n ? `, ${n} chưa đọc` : ""}">${icon(I.bell)}${n ? `<b class="hdr-badge">${n > 9 ? "9+" : n}</b>` : ""}</button></span>`;
  }
  function refreshBell() {
    headerTools();
    if (location.hash === "#/thong-bao") renderNotifPage();
  }
  const timeAgo = ts => {
    if (!ts) return "";
    const m = Math.round((now() - ts) / 60000);
    if (m < 1) return "vừa xong"; if (m < 60) return `${m} phút trước`;
    const h = Math.round(m / 60); if (h < 24) return `${h} giờ trước`;
    const d = Math.round(h / 24); if (d === 1) return "hôm qua"; if (d < 7) return `${d} ngày trước`;
    return new Date(ts).toLocaleDateString("vi-VN");
  };
  const notifItem = (n, full = false) => `<li class="nt-item${n.read ? "" : " unread"}" data-nid="${esc(n.id)}">
      <a class="nt-main" href="${esc(n.url || "#")}" data-nopen="${esc(n.id)}"><span class="nt-ic cat-${n.cat}">${icon(I[CATS[n.cat]?.ic ?? "spark"])}</span>
        <span class="nt-text"><strong>${esc(n.title)}</strong>${n.body ? `<span>${esc(n.body)}</span>` : ""}<small>${esc(CATS[n.cat]?.label ?? "")}${n.at ? " · " + timeAgo(n.at) : ""}</small></span></a>
      <span class="nt-acts"><button type="button" class="vv-icon-btn sm" data-nread="${esc(n.id)}" aria-label="${n.read ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc"}">${icon(n.read ? '<circle cx="12" cy="12" r="4"/>' : I.check)}</button><button type="button" class="vv-icon-btn sm" data-ndel="${esc(n.id)}" aria-label="Xoá thông báo">${icon(I.close)}</button></span>
    </li>`;
  const notifEmpty = filtered => `<div class="vv-empty nt-empty">${icon(I.bell, "lg")}<strong>${filtered ? "Không có thông báo phù hợp." : "Bạn chưa có thông báo nào."}</strong><span>Kết quả AI chấm bài, nhắc việc và cập nhật mới sẽ hiện ở đây.</span></div>`;
  let panel = null;
  function openBell(btn) {
    if (panel) return closeBell();
    panel = document.createElement("div");
    panel.className = "nt-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Thông báo");
    const paint = () => {
      const list = notifs.list().slice(0, 6), unread = notifs.unread();
      panel.innerHTML = `<header><strong>Thông báo</strong>${unread ? `<button type="button" class="vv-btn vv-btn-text" data-nall>Đánh dấu tất cả đã đọc</button>` : ""}</header>
        ${list.length ? `<ul class="nt-list">${list.map(n => notifItem(n)).join("")}</ul>` : notifEmpty(false)}
        <footer><a href="/#/thong-bao" data-nclose>Xem tất cả thông báo →</a></footer>`;
    };
    panel.paint = paint;
    paint();
    btn.closest(".hdr-bell").append(panel);
    btn.setAttribute("aria-expanded", "true");
    panel.querySelector("button, a")?.focus();
  }
  function closeBell() {
    if (!panel) return;
    panel.closest(".hdr-bell")?.querySelector('[data-vv="bell"]')?.setAttribute("aria-expanded", "false");
    panel.remove(); panel = null;
  }

  // Trang #/thong-bao (vẽ vào <main id="notifs">).
  const ntState = { cat: "", unread: false, shown: 10 };
  function renderNotifPage() {
    const el = document.querySelector("#notifs");
    if (!el) return;
    const all = notifs.list();
    const list = all.filter(n => (!ntState.cat || n.cat === ntState.cat) && (!ntState.unread || !n.read));
    el.innerHTML = `<nav class="vv-crumbs" aria-label="Breadcrumb"><a href="/">Trang chủ</a><span aria-hidden="true">/</span><span aria-current="page">Thông báo</span></nav>
      <div class="hub-hero"><p class="hub-eyebrow">Trung tâm thông báo</p><h1>Thông báo</h1><p class="hub-lead">Kết quả AI chấm bài, nhắc việc đang làm dở, gợi ý hồ sơ và cập nhật mới của VAOVIEC.</p></div>
      <div class="vv-toolbar nt-toolbar">
        <div class="vv-seg" role="group" aria-label="Loại thông báo">${[["", "Tất cả"], ...Object.entries(CATS).map(([k, v]) => [k, v.label])].map(([k, l]) => `<button type="button" data-ncat="${k}" aria-pressed="${ntState.cat === k}">${l}<b>${k ? all.filter(n => n.cat === k).length : all.length}</b></button>`).join("")}</div>
        <label class="vv-switch"><input type="checkbox" data-nunread ${ntState.unread ? "checked" : ""}><span>Chỉ chưa đọc</span></label>
        <span class="vv-grow"></span>
        <button type="button" class="vv-btn vv-btn-ghost" data-nall ${notifs.unread() ? "" : "disabled"}>${icon(I.check)} Đánh dấu tất cả đã đọc</button>
        <button type="button" class="vv-btn vv-btn-ghost" data-nclear ${all.some(n => n.read) ? "" : "disabled"}>${icon(I.trash)} Xoá thông báo đã đọc</button>
      </div>
      ${list.length ? `<ul class="nt-list page">${list.slice(0, ntState.shown).map(n => notifItem(n, true)).join("")}</ul>
        ${list.length > ntState.shown ? `<p class="vv-more"><button type="button" class="vv-btn vv-btn-ghost" data-nmore>Tải thêm (${list.length - ntState.shown})</button></p>` : ""}` : notifEmpty(all.length > 0)}`;
  }

  // ---------- Tìm kiếm toàn trang ----------
  let searchDlg = null, careerLoading = null;
  function ensureCareerData() {
    if (typeof careerData !== "undefined") return Promise.resolve(true);
    careerLoading ??= new Promise(res => { const s = document.createElement("script"); s.src = "/career-data.js"; s.onload = () => res(true); s.onerror = () => res(false); document.head.append(s); });
    return careerLoading;
  }
  function searchItems(q) {
    const words = norm(q).split(" ").filter(Boolean);
    const hit = (...fields) => { const hay = norm(fields.flat().join(" ")); return words.every(w => hay.includes(w)); };
    const roles = roleList();
    const out = { pages: [], missions: [], roles: [], subs: [] };
    out.pages = DEFAULT_QUICK.filter(p => hit(p.title, p.sub)).map(p => ({ ...p }));
    for (const r of roles) {
      if (!hit(r.role_name, r.role_name_vi, r.function, r.industry_group, r.search_aliases ?? [], r.required_skills ?? [])) continue;
      const playable = r.simulation_status === "available" && r.mission_id;
      if (playable) {
        const m = hasMissions() ? missions[r.mission_id] : null;
        out.missions.push({ type: "mission", id: r.mission_id, title: r.role_name, sub: m ? `${m.company} · ${m.caseName}` : "Mô phỏng công việc 15–20 phút", url: m ? m.url : "/#/roles/" + r.role_slug, ic: "laptop" });
      }
      out.roles.push({ type: "role", id: r.role_slug, title: r.role_name, sub: `${r.role_name_vi} · ${r.function}`, url: "/#/roles/" + r.role_slug, ic: "compass" });
    }
    for (const key of workspaceKeys()) {
      const subs = submissionsOf(key);
      if (!subs.length) continue;
      const meta = missionMeta(keyToMission(key));
      if (!hit(meta.title, "bài làm bản nộp", meta.role?.role_name_vi ?? "")) continue;
      const last = subs.at(-1);
      out.subs.push({ type: "sub", id: key, title: `Bài làm: ${meta.title}`, sub: `${subs.length} phiên bản · nộp lần cuối ${new Date(last.at).toLocaleDateString("vi-VN")}`, url: "/#/ho-so", ic: "file" });
    }
    out.roles = out.roles.slice(0, 8); out.missions = out.missions.slice(0, 6);
    return out;
  }
  function openSearch(initial = "") {
    if (searchDlg) { searchDlg.querySelector("input").focus(); return; }
    searchDlg = document.createElement("dialog");
    searchDlg.className = "vv-dialog vv-search";
    searchDlg.innerHTML = `<div class="vv-search-box">${icon(I.search)}<input type="search" placeholder="Tìm nghề, nhiệm vụ, bài làm…" aria-label="Tìm kiếm" autocomplete="off" value="${esc(initial)}"><kbd>Esc</kbd></div>
      <div class="vv-search-body" role="listbox" aria-label="Kết quả"></div>
      <footer class="vv-search-foot"><span><kbd>↑</kbd><kbd>↓</kbd> chọn</span><span><kbd>Enter</kbd> mở</span><span><kbd>Ctrl</kbd>+<kbd>K</kbd> mở nhanh</span><button type="button" class="vv-btn vv-btn-text" data-vv="shortcuts">Phím tắt</button></footer>`;
    document.body.append(searchDlg);
    const input = searchDlg.querySelector("input"), body = searchDlg.querySelector(".vv-search-body");
    let active = 0;
    const row = it => `<div class="sr-row" role="option" data-url="${esc(it.url)}" data-type="${esc(it.type)}" data-id="${esc(it.id)}"><a href="${esc(it.url)}" tabindex="-1">${icon(I[it.ic] ?? I.link)}<span><strong>${esc(it.title)}</strong>${it.sub ? `<small>${esc(it.sub)}</small>` : ""}</span></a>
      <button type="button" class="vv-icon-btn sm sr-pin${pins.has(it.type, it.id) ? " on" : ""}" data-pin='${esc(JSON.stringify(it))}' aria-label="${pins.has(it.type, it.id) ? "Bỏ ghim" : "Ghim vào truy cập nhanh"}" aria-pressed="${pins.has(it.type, it.id)}">${icon(I.pin)}</button></div>`;
    const group = (title, list, extra = "") => list.length ? `<section class="sr-group"><h3>${title}${extra}</h3>${list.map(row).join("")}</section>` : "";
    const paint = async () => {
      const q = input.value.trim();
      if (!q) {
        const pinned = pins.list();
        const quick = [...pinned, ...DEFAULT_QUICK.filter(d => !pinned.some(p => p.type === d.type && p.id === d.id))].slice(0, 8);
        const rec = recent.list().slice(0, 6).map(r => ({ ...r, ic: r.type === "role" ? "compass" : "laptop", sub: (r.sub ? r.sub + " · " : "") + timeAgo(r.at) }));
        body.innerHTML = group("Truy cập nhanh", quick, pinned.length ? ` <small>${pinned.length} mục đã ghim</small>` : ' <small>Bấm biểu tượng ghim để giữ mục hay dùng</small>') + group("Đã xem gần đây", rec, rec.length ? ' <button type="button" class="vv-btn vv-btn-text" data-clear-recent>Xoá lịch sử</button>' : "");
      } else {
        if (typeof careerData === "undefined") {
          body.innerHTML = `<div class="sr-skeleton" aria-busy="true">${"<i></i>".repeat(4)}</div>`;
          const ok = await ensureCareerData();
          if (!ok) { body.innerHTML = `<div class="vv-empty"><strong>Không tải được dữ liệu nghề.</strong><span>Kiểm tra kết nối mạng rồi thử lại.</span></div>`; return; }
          if (input.value.trim() !== q) return;
        }
        const r = searchItems(q);
        const html = group("Trang", r.pages) + group("Nhiệm vụ mô phỏng", r.missions) + group("Nghề nghiệp", r.roles) + group("Bài làm của bạn", r.subs);
        body.innerHTML = html || `<div class="vv-empty sr-none">${icon(I.search, "lg")}<strong>Không tìm thấy kết quả cho “${esc(q)}”.</strong><span>Thử từ khoá ngắn hơn hoặc không dấu, ví dụ “data”, “tuyen dung”, “marketing”.</span></div>`;
      }
      active = 0; mark();
    };
    const rows = () => [...body.querySelectorAll(".sr-row")];
    const mark = () => rows().forEach((r, i) => { r.classList.toggle("active", i === active); r.setAttribute("aria-selected", i === active); if (i === active) r.scrollIntoView({ block: "nearest" }); });
    const go = r => { if (!r) return; closeSearch(); location.href = r.dataset.url; };
    input.addEventListener("input", paint);
    input.addEventListener("keydown", e => {
      const list = rows();
      if (e.key === "ArrowDown") { e.preventDefault(); active = Math.min(list.length - 1, active + 1); mark(); }
      if (e.key === "ArrowUp") { e.preventDefault(); active = Math.max(0, active - 1); mark(); }
      if (e.key === "Enter") { e.preventDefault(); go(list[active]); }
    });
    body.addEventListener("click", e => {
      const pin = e.target.closest("[data-pin]");
      if (pin) { const on = pins.toggle(JSON.parse(pin.dataset.pin)); window.vvToast?.(on ? "Đã ghim vào truy cập nhanh." : "Đã bỏ ghim.", "success"); paint(); return; }
      if (e.target.closest("[data-clear-recent]")) { recent.clear(); paint(); return; }
      const r = e.target.closest(".sr-row");
      if (r) { e.preventDefault(); go(r); }
    });
    body.addEventListener("mousemove", e => { const r = e.target.closest(".sr-row"); if (r) { active = rows().indexOf(r); mark(); } });
    searchDlg.addEventListener("cancel", e => { e.preventDefault(); closeSearch(); });
    searchDlg.addEventListener("click", e => { if (e.target === searchDlg) closeSearch(); });
    searchDlg.showModal();
    input.focus();
    paint();
  }
  function closeSearch() { if (!searchDlg) return; searchDlg.close(); searchDlg.remove(); searchDlg = null; }

  // ---------- Phím tắt ----------
  const SHORTCUTS = [["Ctrl / ⌘ + K", "Mở tìm kiếm"], ["/", "Mở tìm kiếm"], ["g rồi k", "Đi tới Khám phá (Career Map)"], ["g rồi w", "Đi tới Workspace"], ["g rồi h", "Đi tới Hồ sơ"], ["g rồi n", "Đi tới Thông báo"], ["?", "Mở bảng phím tắt"], ["Esc", "Đóng hộp thoại"]];
  function openShortcuts() {
    closeSearch();
    const dlg = document.createElement("dialog");
    dlg.className = "vv-dialog vv-keys";
    dlg.innerHTML = `<div class="vv-dialog-body"><header class="vv-dialog-head"><h2>${icon(I.keyboard)} Phím tắt</h2><button type="button" class="vv-icon-btn" data-x aria-label="Đóng">${icon(I.close)}</button></header>
      <dl>${SHORTCUTS.map(([k, d]) => `<div><dt>${k.split(" ").map(x => /^(rồi|\+|\/)$/.test(x) && x !== "/" ? `<span>${x}</span>` : `<kbd>${esc(x)}</kbd>`).join(" ")}</dt><dd>${d}</dd></div>`).join("")}</dl>
      <footer class="vv-dialog-foot"><button type="button" class="vv-btn vv-btn-ghost" data-tour>Xem lại hướng dẫn sử dụng</button><button type="button" class="vv-btn vv-btn-primary" data-x>Đóng</button></footer></div>`;
    document.body.append(dlg);
    const close = () => { dlg.close(); dlg.remove(); };
    dlg.querySelectorAll("[data-x]").forEach(b => b.addEventListener("click", close));
    dlg.querySelector("[data-tour]").addEventListener("click", () => { close(); startTour(true); });
    dlg.addEventListener("cancel", e => { e.preventDefault(); close(); });
    dlg.showModal();
  }
  const typing = e => { const t = e.target; return t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName); };
  let gPending = 0;
  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); return; }
    if (e.key === "Escape" && panel) { const b = panel.closest(".hdr-bell")?.querySelector("button"); closeBell(); b?.focus(); return; }
    if (typing(e) || e.ctrlKey || e.metaKey || e.altKey || document.querySelector("dialog[open]")) return;
    if (e.key === "/") { e.preventDefault(); openSearch(); return; }
    if (e.key === "?") { e.preventDefault(); openShortcuts(); return; }
    if (e.key === "g") { gPending = now(); return; }
    if (now() - gPending < 1200) {
      const to = { k: "/#/career-map", w: "/#/workspace", h: "/#/ho-so", n: "/#/thong-bao" }[e.key];
      gPending = 0;
      if (to) { e.preventDefault(); location.href = to; }
    }
  });

  // ---------- Hướng dẫn người mới ----------
  const TOUR_KEY = "vaoviec-tour-done";
  const TOUR = [
    { sel: '.site-header-nav a[href*="career-map"], .site-header-nav a:first-child', title: "Khám phá nghề", body: "Bản đồ 82 nghề trong 6 lĩnh vực. Mỗi nghề có việc hằng ngày, kỹ năng, công cụ và nguồn tham khảo. Nghề có ▶ là đã có mô phỏng để thử." },
    { sel: '.site-header-nav a[href*="workspace"]', title: "Workspace", body: "Nơi bạn làm mô phỏng 15–20 phút: đọc dữ liệu, ra quyết định, nộp bài và nhận nhận xét từ AI theo 4 tiêu chí." },
    { sel: '.site-header-nav a[href*="ho-so"]', title: "Hồ sơ trải nghiệm", body: "Lưu mọi bài đã làm, phiên bản và nhận xét. Thêm ảnh, giới thiệu, kỹ năng, CV và chọn bài nổi bật để chia sẻ." },
    { sel: '[data-vv="search"]', title: "Tìm nhanh mọi thứ", body: "Bấm đây hoặc nhấn Ctrl + K để tìm nghề, nhiệm vụ, bài làm. Ghim những mục hay dùng vào Truy cập nhanh." },
    { sel: '[data-vv="bell"]', title: "Thông báo", body: "Báo khi AI chấm xong bài, nhắc bài đang làm dở và các cập nhật mới. Nhấn ? để xem phím tắt và mở lại hướng dẫn này." }
  ];
  function startTour(force = false) {
    if (!force) { try { if (localStorage.getItem(TOUR_KEY)) return; } catch { return; } }
    const steps = TOUR.map(s => ({ ...s, el: [...document.querySelectorAll(s.sel)].find(el => el.offsetParent) })).filter(s => s.el);
    if (!steps.length) return;
    let i = 0;
    const layer = document.createElement("div");
    layer.className = "vv-tour";
    layer.innerHTML = `<div class="vv-tour-spot"></div><div class="vv-tour-pop" role="dialog" aria-modal="true" aria-labelledby="vv-tour-t"><p class="vv-tour-step"></p><h2 id="vv-tour-t"></h2><p class="vv-tour-body"></p>
      <div class="vv-tour-acts"><button type="button" class="vv-btn vv-btn-text" data-t="skip">Bỏ qua</button><span></span><button type="button" class="vv-btn vv-btn-ghost" data-t="prev">Trước</button><button type="button" class="vv-btn vv-btn-primary" data-t="next">Tiếp</button></div></div>`;
    document.body.append(layer);
    const spot = layer.querySelector(".vv-tour-spot"), pop = layer.querySelector(".vv-tour-pop");
    const end = () => { try { localStorage.setItem(TOUR_KEY, "1"); } catch {} layer.remove(); removeEventListener("resize", place); document.removeEventListener("keydown", key, true); };
    const place = () => {
      const s = steps[i], r = s.el.getBoundingClientRect(), pad = 6;
      Object.assign(spot.style, { left: r.left - pad + "px", top: r.top - pad + "px", width: r.width + pad * 2 + "px", height: r.height + pad * 2 + "px" });
      layer.querySelector(".vv-tour-step").textContent = `Bước ${i + 1}/${steps.length}`;
      layer.querySelector("h2").textContent = s.title;
      layer.querySelector(".vv-tour-body").textContent = s.body;
      layer.querySelector('[data-t="prev"]').hidden = i === 0;
      layer.querySelector('[data-t="next"]').textContent = i === steps.length - 1 ? "Bắt đầu khám phá" : "Tiếp";
      const pw = Math.min(340, innerWidth - 24);
      pop.style.width = pw + "px";
      const left = Math.min(Math.max(12, r.left + r.width / 2 - pw / 2), innerWidth - pw - 12);
      pop.style.left = left + "px";
      pop.style.top = r.bottom + 14 + "px";
      layer.querySelector('[data-t="next"]').focus();
    };
    const key = e => { if (e.key === "Escape") { e.preventDefault(); end(); } if (e.key === "ArrowRight") layer.querySelector('[data-t="next"]').click(); if (e.key === "ArrowLeft" && i > 0) layer.querySelector('[data-t="prev"]').click(); };
    layer.addEventListener("click", e => {
      const t = e.target.closest("[data-t]")?.dataset.t;
      if (t === "skip") end();
      if (t === "prev") { i--; place(); }
      if (t === "next") { if (i === steps.length - 1) end(); else { i++; place(); } }
    });
    addEventListener("resize", place);
    document.addEventListener("keydown", key, true);
    scrollTo(0, 0);
    place();
  }

  // ---------- Nút lên đầu trang ----------
  function backToTop() {
    const b = document.createElement("button");
    b.type = "button"; b.className = "vv-top"; b.hidden = true;
    b.setAttribute("aria-label", "Lên đầu trang");
    b.innerHTML = icon(I.up);
    b.addEventListener("click", () => scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
    document.body.append(b);
    const update = () => { const h = scrollY < 700; if (b.hidden !== h) b.hidden = h; };
    addEventListener("scroll", update, { passive: true });
    addEventListener("hashchange", () => setTimeout(update, 50));
  }

  // ---------- Sự kiện chung ----------
  document.addEventListener("click", e => {
    const t = e.target.closest("[data-vv]");
    if (t) {
      const a = t.dataset.vv;
      if (a === "search") openSearch();
      if (a === "bell") openBell(t);
      if (a === "shortcuts") openShortcuts();
      if (a === "tour") { e.preventDefault(); if (!location.pathname.match(/^\/(index\.html)?$/)) { location.href = "/#tour"; return; } startTour(true); }
      if (a === "edit-profile") openProfileEditor(t.dataset.section || "info");
      if (a === "share") share({ title: t.dataset.title || document.title, url: t.dataset.url || location.href });
      if (a === "copy") copy(new URL(t.dataset.url || location.href, location.origin).href);
      return;
    }
    // Thông báo: mở / đánh dấu / xoá (dropdown và trang).
    const open = e.target.closest("[data-nopen]");
    if (open) { notifs.setRead(open.dataset.nopen); closeBell(); refreshBell(); return; }
    const rd = e.target.closest("[data-nread]");
    if (rd) { const n = notifs.list().find(x => x.id === rd.dataset.nread); notifs.setRead(rd.dataset.nread, !n?.read); panel?.paint(); refreshBell(); return; }
    const del = e.target.closest("[data-ndel]");
    if (del) { notifs.remove(del.dataset.ndel); panel?.paint(); refreshBell(); window.vvToast?.("Đã xoá thông báo.", "success", 2200); return; }
    if (e.target.closest("[data-nall]")) { notifs.setRead("*"); panel?.paint(); refreshBell(); window.vvToast?.("Đã đánh dấu tất cả là đã đọc.", "success"); return; }
    if (e.target.closest("[data-nclear]")) {
      window.vvConfirm({ title: "Xoá thông báo đã đọc?", message: "Các thông báo đã đọc sẽ bị xoá khỏi danh sách.", confirmLabel: "Xoá", tone: "danger" }).then(ok => { if (ok) { notifs.remove("*read"); refreshBell(); window.vvToast?.("Đã xoá thông báo đã đọc.", "success"); } });
      return;
    }
    const cat = e.target.closest("[data-ncat]");
    if (cat) { ntState.cat = cat.dataset.ncat; ntState.shown = 10; renderNotifPage(); return; }
    if (e.target.closest("[data-nmore]")) { ntState.shown += 10; renderNotifPage(); return; }
    if (e.target.closest("[data-nclose]")) { closeBell(); return; }
    if (panel && !e.target.closest(".hdr-bell")) closeBell();
  });
  document.addEventListener("change", e => { if (e.target.matches("[data-nunread]")) { ntState.unread = e.target.checked; ntState.shown = 10; renderNotifPage(); } });
  // Dữ liệu người dùng đổi ở tab khác (hoặc đồng bộ về): cập nhật chuông.
  addEventListener("storage", e => { if (e.key?.startsWith("vaoviec-user-")) refreshBell(); });

  window.vv = {
    esc, norm, icon, I, fav, recent, pins, notifs, share, copy, profile, saveProfile, displayName, avatarSrc, avatarHTML, initialsOf,
    completion, openProfileEditor, cv, openSearch, startTour, renderNotifPage, headerTools, duration, submissionsOf, timeAgo,
    portfolio: S.portfolio, compareMax: MAX, ensureCareerData, missionMeta, publicCard, cropImage
  };

  // ---------- Khởi động ----------
  const boot = () => {
    hookTrack();
    headerTools();
    backToTop();
    scanNotifications();
    // Trang nhiệm vụ: ghi "đã xem gần đây" và quét kết quả AI định kỳ (AI chấm bất đồng bộ).
    const pc = pageCase();
    if (pc?.id) {
      recent.add({ type: "mission", id: pc.id, title: pc.title, sub: pc.caseName, url: location.pathname });
      setInterval(scanNotifications, 8000);
    }
    if (location.hash === "#tour") { history.replaceState(null, "", location.pathname); setTimeout(() => startTour(true), 400); }
    else if ((location.pathname === "/" || location.pathname.endsWith("index.html")) && !location.hash) setTimeout(() => startTour(false), 900);
    if (typeof refreshAccount === "function") refreshAccount();
  };
  // Chờ mọi script defer (case.js, app.js…) chạy xong rồi mới khởi động.
  if (document.readyState === "complete") boot(); else document.addEventListener("DOMContentLoaded", boot, { once: true });
})();
