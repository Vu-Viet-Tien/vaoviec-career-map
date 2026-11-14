// Workspace dùng chung cho các nhiệm vụ 6 bước (MISSION_002 Employer Branding, MISSION_003 Business Development B2B…).
// Luồng: Brief → Dữ liệu → Chọn (kèm bằng chứng) → Soạn nội dung có xem trước → Kế hoạch & chỉ số → Bàn giao → AI chấm → sửa và nộp lại.
// Mọi chữ riêng của từng nghề nằm trong CASE.ui (case.js của nhiệm vụ). Tên khoá state giữ như bản đầu (pillars/post/plan) để không mất tiến độ cũ.
const UI = CASE.ui;
const KEY = UI.storageKey;
const MODES = {
  guided: { label: 'Làm quen', summary: `Phù hợp khi bạn mới tìm hiểu ${UI.topic}.`, points: ['Giải thích thuật ngữ và cách làm từng bước', 'Có thể xem phương án mẫu khi hỏi trợ lý', 'Phù hợp để hình dung công việc hằng ngày'] },
  self: { label: 'Thử sức', summary: 'Phù hợp khi bạn muốn tự xử lý như một nhân viên thật.', points: ['Trợ lý chỉ đưa câu hỏi định hướng', 'Bạn tự chọn thông điệp và giải thích', 'Không xem phương án mẫu trong lúc làm'] }
};
const TABS = ['brief', 'data', 'evp', 'post', 'plan', 'handoff'].map(id => [id, UI.tabs[id]]);
const MIN_EVIDENCE = 20, MIN_POST = UI.write.min ?? 150, MIN_REC = 40;
const PICK = UI.pick.count ?? 3, MAX_CH = UI.plan.maxChannels ?? 3, KPI_N = UI.plan.kpiCount ?? 2;

const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* trình duyệt chặn lưu */ } };
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const $ = sel => document.querySelector(sel);
const initial = () => ({ v: 1, tab: 'brief', read: {}, pillars: {}, post: { channel: '', title: '', body: '', quote: '' }, plan: { channels: [], kpis: [], target: '' }, recommendation: '', history: [] });

let s = Object.assign(initial(), read(KEY, {}));
let overlay = '', viewVersion = null, errors = {};
const save = () => write(KEY, s);
const app = $('#app'), modal = $('#dialog');

renderSiteHeader({ active: 'workspace', exploreUrl: `/#/roles/${UI.slug}`, inCase: true });
$('.case-position').textContent = CASE.role;
$('.case-name').textContent = UI.caseName;
$('.case-return').href = `/#/roles/${UI.slug}`;

// ---------- Tiến độ ----------
const chosen = () => CASE.pillars.filter(p => s.pillars[p.id]?.on);
const readCount = () => CASE.sources.filter(x => s.read[x.id]).length;
const done = {
  brief: () => !!s.read.brief,
  data: () => readCount() === CASE.sources.length,
  evp: () => chosen().length === PICK && chosen().every(p => (s.pillars[p.id].evidence ?? '').trim().length >= MIN_EVIDENCE),
  post: () => !!s.post.channel && s.post.title.trim().length >= 10 && s.post.body.trim().length >= MIN_POST,
  plan: () => s.plan.channels.length >= 1 && s.plan.kpis.length === KPI_N,
  handoff: () => !!s.submission
};
function stage() {
  if (s.submission) return 3;
  if (done.evp() || done.post()) return done.post() && done.evp() ? 2 : 1;
  return done.data() ? 1 : 0;
}
function assistKey() {
  if (s.submission && !overlay) return 'feedback';
  return { brief: 'research', data: 'research', evp: 'evp', post: 'post', plan: 'plan', handoff: 'handoff' }[s.tab];
}
function nextStep() {
  for (const [id, label] of TABS) if (!done[id]()) return [id, label];
  return null;
}

// ---------- Khung chung ----------
function stagesBar() {
  const now = stage();
  $('.case-stages').innerHTML = CASE.stages.map(([, label], i) => `<li class="${i < now ? 'done' : i === now ? 'current' : ''}"><span>${i < now ? '✓' : i + 1}</span>${esc(label)}</li>`).join('');
  const chip = $('.case-mode');
  chip.hidden = !s.mode;
  chip.textContent = s.mode ? `Chế độ: ${MODES[s.mode].label}` : '';
}
function sidebar() {
  return `<nav class="eb-nav" aria-label="Các bước nhiệm vụ">${TABS.map(([id, label], i) => `
    <button type="button" data-do="tab" data-id="${id}" class="${s.tab === id ? 'on' : ''}" ${s.tab === id ? 'aria-current="step"' : ''}>
      <span class="eb-dot ${done[id]() ? 'ok' : ''}">${done[id]() ? '✓' : i + 1}</span><span>${esc(label)}</span>
      ${id === 'data' ? `<small>${readCount()}/${CASE.sources.length}</small>` : id === 'evp' ? `<small>${chosen().length}/${PICK}</small>` : ''}
    </button>`).join('')}
    <div class="eb-deadline"><span>Hạn gửi</span><strong>${esc(CASE.deadline)}</strong></div>
  </nav>`;
}
function taskBar() {
  const next = nextStep();
  const text = s.submission ? 'Đã gửi đề xuất. Xem nhận xét, sửa và nộp lại nếu cần.' : next ? `Việc tiếp theo: ${next[1]}` : `Sẵn sàng gửi đề xuất cho ${CASE.managerShort}.`;
  const action = s.submission ? `<button class="primary" data-do="feedback">Xem kết quả</button>` : next && next[0] !== s.tab ? `<button class="primary" data-do="tab" data-id="${next[0]}">Mở ${esc(next[1])} →</button>` : '';
  return `<footer class="eb-task"><span>${esc(text)}</span>${action}</footer>`;
}

// ---------- Các màn ----------
function briefView() {
  const b = CASE.brief;
  return `<article class="eb-card eb-mail">
    <header><span class="eb-avatar">${esc(b.from.trim().split(/\s+/).pop()[0])}</span><div><strong>${esc(b.from)}</strong><small>${esc(CASE.manager)}</small></div><time>08:45</time></header>
    <h2>${esc(b.subject)}</h2>${b.body.map(p => `<p>${esc(p)}</p>`).join('')}
    <div class="eb-actions"><button class="primary" data-do="tab" data-id="data">Mở ${esc(UI.tabs.data)} →</button></div>
  </article>`;
}
function bars(rows, total) {
  return `<ul class="eb-bars">${rows.map(([label, n]) => `<li><span>${esc(label)}</span><b>${n}/${total}</b><i style="--w:${Math.round(n / total * 100)}%"></i></li>`).join('')}</ul>`;
}
function sourceBody(src) {
  if (src.items) {
    const total = src.total ?? (src.id === 'survey' ? 14 : 12);
    return src.items.map(([h, rows]) => `<h4>${esc(h)}</h4>${bars(rows, total)}`).join('') + (src.note ? `<p class="eb-note">${esc(src.note)}</p>` : '');
  }
  if (src.quotes) return src.quotes.map(q => `<blockquote class="eb-quote"><p>“${esc(q.text)}”</p><footer>${esc(q.name)} · ${esc(q.role)} ${q.consent ? `<span class="tag ok">${esc(src.tags?.[0] ?? 'Đã đồng ý dùng tên')}</span>` : `<span class="tag warn">${esc(src.tags?.[1] ?? 'Chưa xác nhận')}</span>`}</footer></blockquote>`).join('') + `<p class="eb-note">${esc(src.note)}</p>`;
  if (src.facts) return `<ul class="eb-facts">${src.facts.map(f => `<li>${esc(f)}</li>`).join('')}</ul>${src.not?.length ? `<h4>Không có / chưa có</h4><ul class="eb-facts no">${src.not.map(f => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}`;
  if (src.posts) return src.posts.map(p => `<div class="eb-social mini"><p>${esc(p)}</p></div>`).join('') + `<p class="eb-note">${esc(src.note)}</p>`;
  if (src.rows) return `<table class="eb-table"><thead><tr>${(src.head ?? ['Kênh', 'Số liệu', 'Ghi chú']).map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${src.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  return '';
}
function dataView() {
  return `<div class="eb-head"><h2>${esc(UI.tabs.data)}</h2><p>${esc(UI.dataLead)} Đã đọc ${readCount()}/${CASE.sources.length}.</p></div>
    <div class="eb-sources">${CASE.sources.map(src => `<details class="eb-card eb-source" data-source="${src.id}" ${s.read[src.id] ? '' : ''}>
      <summary><span class="eb-dot ${s.read[src.id] ? 'ok' : ''}">${s.read[src.id] ? '✓' : ''}</span><span><strong>${esc(src.title)}</strong><small>${esc(src.meta)}</small></span></summary>
      <div class="eb-source-body">${sourceBody(src)}</div></details>`).join('')}</div>
    <div class="eb-actions"><button class="primary" data-do="tab" data-id="evp">Sang ${esc(UI.tabs.evp)} →</button></div>`;
}
function evpView() {
  const n = chosen().length;
  return `<div class="eb-head"><h2>${esc(UI.tabs.evp)}</h2><p>${esc(UI.pick.lead)} Đã chọn ${n}/${PICK}.</p></div>
    ${errors.evp ? `<p class="eb-error" role="alert">${esc(errors.evp)}</p>` : ''}
    <div class="eb-pillars">${CASE.pillars.map(p => {
      const st = s.pillars[p.id] ?? {};
      const off = !st.on && n >= PICK;
      return `<div class="eb-pillar ${st.on ? 'on' : ''}">
        <label><input type="checkbox" data-bind="pillar" data-id="${p.id}" ${st.on ? 'checked' : ''} ${off ? 'disabled' : ''}><span>${esc(p.label)}${p.meta ? `<small class="eb-meta">${esc(p.meta)}</small>` : ''}</span></label>
        ${st.on ? `<textarea data-bind="evidence" data-id="${p.id}" rows="2" placeholder="${esc(UI.pick.placeholder)}">${esc(st.evidence ?? '')}</textarea>
        <small class="${(st.evidence ?? '').trim().length >= MIN_EVIDENCE ? 'ok' : ''}">${(st.evidence ?? '').trim().length >= MIN_EVIDENCE ? '✓ Đủ để chấm' : `Tối thiểu ${MIN_EVIDENCE} ký tự`}</small>` : ''}
      </div>`;
    }).join('')}</div>
    <div class="eb-actions"><button class="primary" data-do="tab" data-id="post">Sang ${esc(UI.tabs.post)} →</button></div>`;
}
function previewBody(text) {
  return esc(text).replace(/\n/g, '<br>');
}
function postView() {
  const p = s.post, W = UI.write;
  const quotes = CASE.sources.find(x => x.id === W.quoteSource)?.quotes ?? [];
  const quote = quotes.find(q => q.id === p.quote);
  const ch = CASE.postChannels.find(c => c[0] === p.channel);
  const preview = W.preview === 'email'
    ? `<div class="eb-social eb-email">
        <dl><dt>Từ</dt><dd>${esc(W.sender)}</dd><dt>Đến</dt><dd>${ch ? esc(ch[1]) : '<span class="ph">Chọn người nhận</span>'}</dd><dt>Tiêu đề</dt><dd><strong>${p.title ? esc(p.title) : '<span class="ph">Tiêu đề email</span>'}</strong></dd></dl>
        <p>${p.body ? previewBody(p.body) : '<span class="ph">Nội dung email sẽ hiện ở đây…</span>'}</p>
        ${quote ? `<div class="eb-attach">📎 ${esc(quote.name)}<small>${esc(quote.role)}</small></div>` : ''}
        <footer><span>↩ Trả lời</span><span>↪ Chuyển tiếp</span></footer>
      </div>`
    : `<div class="eb-social">
        <header><span class="eb-avatar n">N</span><div><strong>${esc(W.sender)}</strong><small>${ch ? esc(ch[1]) : 'Chọn kênh'} · Vừa xong</small></div></header>
        <h3>${p.title ? esc(p.title) : '<span class="ph">Tiêu đề bài đăng</span>'}</h3>
        <p>${p.body ? previewBody(p.body) : '<span class="ph">Nội dung sẽ hiện ở đây…</span>'}</p>
        ${quote ? `<blockquote>“${esc(quote.text)}”<cite>— ${esc(quote.name)}, ${esc(quote.role)}</cite></blockquote>` : ''}
        <footer><span>👍 Thích</span><span>💬 Bình luận</span><span>↗ Chia sẻ</span></footer>
      </div>`;
  return `<div class="eb-head"><h2>${esc(UI.tabs.post)}</h2><p>${esc(W.lead)}</p></div>
    ${errors.post ? `<p class="eb-error" role="alert">${esc(errors.post)}</p>` : ''}
    <div class="eb-post">
      <div class="eb-card eb-form">
        <fieldset><legend>${esc(W.channelLegend)}</legend>${CASE.postChannels.map(([id, label]) => `<label class="eb-radio"><input type="radio" name="post-channel" data-bind="post-channel" value="${id}" ${p.channel === id ? 'checked' : ''}><span>${esc(label)}</span></label>`).join('')}</fieldset>
        <label>${esc(W.titleLabel)}<input data-bind="post-title" maxlength="120" value="${esc(p.title)}" placeholder="${esc(W.titlePlaceholder)}"></label>
        <label>${esc(W.bodyLabel)}<textarea data-bind="post-body" rows="9" maxlength="2000" placeholder="${esc(W.bodyPlaceholder)}">${esc(p.body)}</textarea></label>
        <small class="eb-count ${p.body.trim().length >= MIN_POST ? 'ok' : ''}">${p.body.trim().length} ký tự · tối thiểu ${MIN_POST}</small>
        <label>${esc(W.quoteLabel)}<select data-bind="post-quote"><option value="">Không dùng</option>${quotes.map(q => `<option value="${q.id}" ${p.quote === q.id ? 'selected' : ''}>${esc(q.name)} — ${esc(q.role)}</option>`).join('')}</select></label>
      </div>
      <div class="eb-preview" aria-label="Xem trước">${preview}</div>
    </div>
    <div class="eb-actions"><button class="primary" data-do="tab" data-id="plan">Sang ${esc(UI.tabs.plan)} →</button></div>`;
}
function planView() {
  const pl = s.plan, P = UI.plan;
  return `<div class="eb-head"><h2>${esc(UI.tabs.plan)}</h2><p>${esc(P.lead)}</p></div>
    ${errors.plan ? `<p class="eb-error" role="alert">${esc(errors.plan)}</p>` : ''}
    <div class="eb-plan">
      <fieldset class="eb-card"><legend>${esc(P.channelLegend)} <small>${pl.channels.length}/${MAX_CH}</small></legend>${CASE.planChannels.map(([id, label]) => `<label class="eb-check"><input type="checkbox" data-bind="plan-channel" value="${id}" ${pl.channels.includes(id) ? 'checked' : ''} ${!pl.channels.includes(id) && pl.channels.length >= MAX_CH ? 'disabled' : ''}><span>${esc(label)}</span></label>`).join('')}</fieldset>
      <fieldset class="eb-card"><legend>${esc(P.kpiLegend)} <small>${pl.kpis.length}/${KPI_N}</small></legend>${CASE.kpis.map(([id, label]) => `<label class="eb-check"><input type="checkbox" data-bind="plan-kpi" value="${id}" ${pl.kpis.includes(id) ? 'checked' : ''} ${!pl.kpis.includes(id) && pl.kpis.length >= KPI_N ? 'disabled' : ''}><span>${esc(label)}</span></label>`).join('')}
        <label class="eb-target">${esc(P.targetLabel)}<input data-bind="plan-target" maxlength="160" value="${esc(pl.target)}" placeholder="${esc(P.targetPlaceholder)}"></label></fieldset>
    </div>
    <div class="eb-actions"><button class="primary" data-do="tab" data-id="handoff">Sang ${esc(UI.tabs.handoff)} →</button></div>`;
}
function handoffView() {
  const missing = TABS.slice(2, 5).filter(([id]) => !done[id]());
  return `<div class="eb-head"><h2>Bàn giao đề xuất</h2><p>Kiểm tra lại rồi gửi cho ${esc(CASE.managerShort)}.</p></div>
    ${missing.length ? `<div class="eb-warning">Còn thiếu: ${missing.map(([id, label]) => `<button class="link" data-do="tab" data-id="${id}">${esc(label)}</button>`).join(', ')}.</div>` : ''}
    <form class="eb-card eb-handoff" data-form="handoff" novalidate>
      <dl><dt>Người nhận</dt><dd>${esc(CASE.manager)}</dd><dt>Tiêu đề</dt><dd>${esc(CASE.handoff.subject)}</dd></dl>
      <h3>Tóm tắt</h3>
      <ul class="eb-summary">
        <li><strong>${esc(UI.pick.summary)}:</strong> ${chosen().map(p => esc(p.label)).join(' · ') || '<em>chưa chọn</em>'}</li>
        <li><strong>${esc(UI.write.summary)}:</strong> ${s.post.title ? esc(s.post.title) : '<em>chưa có tiêu đề</em>'} ${s.post.channel ? `(${esc(CASE.postChannels.find(c => c[0] === s.post.channel)[1])})` : ''}</li>
        <li><strong>${esc(UI.plan.summaryChannels)}:</strong> ${s.plan.channels.map(id => esc(CASE.planChannels.find(c => c[0] === id)[1])).join(', ') || '<em>chưa chọn</em>'}</li>
        <li><strong>${esc(UI.plan.summaryKpis)}:</strong> ${s.plan.kpis.map(id => esc(CASE.kpis.find(c => c[0] === id)[1])).join('; ') || '<em>chưa chọn</em>'}</li>
      </ul>
      <div class="eb-question"><h3>💬 Câu hỏi từ ${esc(CASE.managerShort)}</h3><p>“${esc(CASE.handoff.question)}”</p>
        <label for="eb-rec">Khuyến nghị của em <span aria-hidden="true">*</span></label>
        <textarea id="eb-rec" data-bind="recommendation" rows="5" maxlength="1200" aria-describedby="eb-rec-hint">${esc(s.recommendation)}</textarea>
        <small id="eb-rec-hint">${esc(CASE.handoff.hint)}</small>
        ${errors.handoff ? `<p class="eb-error" role="alert">${esc(errors.handoff)}</p>` : ''}
      </div>
      <div class="eb-actions"><button type="submit" class="primary">${s.submission ? 'Nộp lại phiên bản mới' : `Gửi đề xuất cho ${esc(CASE.managerShort)}`}</button></div>
    </form>`;
}

// ---------- Chấm bài ----------
function payload() {
  return {
    mission: CASE.id, mode: s.mode,
    pillars: chosen().map(p => ({ id: p.id, label: p.label, evidence: s.pillars[p.id].evidence })),
    post: { ...s.post, channelLabel: CASE.postChannels.find(c => c[0] === s.post.channel)?.[1] ?? '' },
    plan: { channels: s.plan.channels, kpis: s.plan.kpis, target: s.plan.target },
    recommendation: s.recommendation
  };
}
// Nhận xét nhanh dựng sẵn khi không gọi được AI: nhiệm vụ nào có CASE.report thì dùng hàm đó.
function report(p) {
  if (typeof CASE.report === 'function') return CASE.report(p);
  const f = CASE.fallback, notes = [];
  for (const id of ['nostress', 'remote', 'toppay']) if (p.pillars.some(x => x.id === id)) notes.push(f[id]);
  const text = `${p.post.title}\n${p.post.body}`.toLowerCase();
  if (!/(\d+\s*(–|-|đến)\s*\d+\s*(triệu|tr))|triệu/.test(text)) notes.push(f.income);
  if (!/(tối|19h|21h|13h|ca chiều)/.test(text)) notes.push(f.night);
  if (p.post.quote === 'maianh') notes.push(f.consent);
  if (p.plan.kpis.every(k => ['likes', 'followers'].includes(k))) notes.push(f.vanity);
  if (p.post.channel === 'linkedin' || (p.plan.channels.length === 1 && p.plan.channels[0] === 'linkedin')) notes.push(f.linkedin);
  return notes.length ? notes : ['Bài làm không mắc các lỗi phổ biến mà bộ kiểm tra nhanh tìm được. Khi AI chấm hoạt động lại, bạn sẽ nhận nhận xét chi tiết theo 4 tiêu chí.'];
}
async function aiReview(sub) {
  sub.ai = { status: 'pending' }; save();
  let result;
  const ctrl = new AbortController(), t = setTimeout(() => ctrl.abort(), 58000);
  try {
    const res = await fetch('/api/review', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sub.payload), signal: ctrl.signal });
    const data = await res.json().catch(() => ({}));
    result = res.ok ? { status: 'done', review: data } : { status: 'error', message: data.error || 'Dịch vụ đánh giá chưa phản hồi.' };
  } catch { result = { status: 'error', message: 'Không kết nối được dịch vụ đánh giá.' }; }
  finally { clearTimeout(t); }
  if (s.submission?.id !== sub.id) return;
  s.submission.ai = result; save();
  if (overlay === 'feedback') renderModal();
  render();
  if (result.status === 'done' && result.review.criteria.filter(c => c.status === 'Đạt').length >= 3) dispatchEvent(new CustomEvent('nova:react', { detail: 'excited' }));
}
const allSubs = () => [...(s.history ?? []), ...(s.submission ? [s.submission] : [])];
const passCount = sub => sub?.ai?.status === 'done' ? sub.ai.review.criteria.filter(c => c.status === 'Đạt').length : null;
function cvGate(sub) {
  const r = sub?.ai?.status === 'done' ? sub.ai.review : null;
  if (!r) return { open: false, why: 'Gợi ý ghi vào CV mở khi AI chấm xong bài làm.' };
  if (r.effort_level === 'Làm cho có') return { open: false, why: 'Bài được đánh giá "Làm cho có". Hãy sửa bài nghiêm túc để mở gợi ý ghi vào CV.' };
  if (passCount(sub) < 2) return { open: false, why: 'Cần đạt ít nhất 2/4 tiêu chí để mở gợi ý ghi vào CV.' };
  return { open: true };
}
function reviewHtml(sub) {
  const ai = sub.ai ?? {};
  if (ai.status === 'pending' || !ai.status) return `<div role="status"><p class="vv-skeleton-label">AI đang đọc bài của bạn theo 4 tiêu chí… thường mất 5–20 giây.</p><div class="vv-skeleton" aria-hidden="true"><i></i><i></i><i></i><i class="card"></i><i class="card"></i></div></div>`;
  if (ai.status === 'error') return `<div class="eb-warning"><strong>Chưa chấm được bằng AI:</strong> ${esc(ai.message)} <button class="link" data-do="retry">Thử chấm lại</button></div>
    <h3>Nhận xét nhanh</h3><ul class="eb-quick">${report(sub.payload).map(n => `<li>${esc(n)}</li>`).join('')}</ul>`;
  const r = ai.review;
  const effort = r.effort_level ? `<p class="effort effort-${{ 'Nghiêm túc': 'good', 'Chưa đầy đủ': 'mid' }[r.effort_level] ?? 'low'}"><strong>Mức độ đầu tư: ${esc(r.effort_level)}</strong>${r.effort_note ? ` · ${esc(r.effort_note)}` : ''}</p>` : '';
  return `${effort}<p>${esc(r.overall_summary)}</p><div class="eb-criteria">${r.criteria.map(c => `<article><h4>${esc(r.criteria_titles?.[c.id] ?? c.id)} <span class="pill ${c.status === 'Đạt' ? '' : 'warn'}">${esc(c.status)}</span></h4>${c.evidence ? `<blockquote>${esc(c.evidence)}</blockquote>` : ''}<p>${esc(c.comment)}</p>${c.status === 'Đạt' ? '' : `<p><strong>Gợi ý:</strong> ${esc(c.improvement)}</p>`}</article>`).join('')}</div>
    ${r.strengths?.length ? `<h4>Điểm làm tốt</h4><ul>${r.strengths.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
    <div class="eb-callout"><strong>Ưu tiên sửa:</strong> ${esc(r.priority_action)}</div>`;
}
function feedbackView() {
  const subs = allSubs();
  const sub = viewVersion != null ? subs.find(x => x.id === viewVersion) ?? s.submission : s.submission;
  if (!sub) return '<p>Bạn chưa gửi đề xuất.</p>';
  const gate = cvGate(sub);
  return `<p class="eyebrow">Phiên bản ${sub.version} · gửi lúc ${new Date(sub.at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</p>
    ${reviewHtml(sub)}
    <div class="eb-cvline">${gate.open ? `<strong>Gợi ý ghi vào CV</strong><p>${esc(CASE.cvLine)}</p>` : `<strong>🔒 Gợi ý ghi vào CV</strong><p>${esc(gate.why)}</p>`}</div>
    ${subs.length > 1 ? `<p class="eb-versions">Các phiên bản: ${subs.map(x => `<button class="link ${x.id === sub.id ? 'on' : ''}" data-do="version" data-id="${x.id}">Bản ${x.version}${passCount(x) != null ? ` (${passCount(x)}/4)` : ''}</button>`).join(' · ')}</p>` : ''}
    <div class="actions"><button data-do="revise">Sửa bài</button><button class="primary" data-do="close">Đóng</button></div>`;
}
function portfolioView() {
  const subs = allSubs();
  return `<p>Các phiên bản bạn đã nộp cho nhiệm vụ ${esc(CASE.role)}. Dữ liệu lưu trên trình duyệt này.</p>
    ${subs.length ? `<table class="eb-table"><thead><tr><th>Bản</th><th>Thời gian</th><th>Kết quả</th><th></th></tr></thead><tbody>${subs.slice().reverse().map(x => `<tr><td>Bản ${x.version}</td><td>${new Date(x.at).toLocaleString('vi-VN')}</td><td>${passCount(x) != null ? `${passCount(x)}/4 tiêu chí Đạt` : x.ai?.status === 'error' ? 'Chưa chấm AI' : 'Đang chấm'}</td><td><button class="link" data-do="version" data-id="${x.id}">Xem</button></td></tr>`).join('')}</tbody></table>` : '<p class="empty">Chưa có bài nộp. Hoàn thành nhiệm vụ và gửi đề xuất, bài làm sẽ tự lưu ở đây kèm nhận xét.</p>'}
    <div class="actions"><button data-do="reset">Chơi lại case</button><button class="primary" data-do="close">Đóng</button></div>`;
}
function introView() {
  const step = overlay === 'intro-role' ? 0 : overlay === 'intro-company' ? 1 : 2;
  const body = [
    () => `<h3>Bạn sẽ vào vai</h3><h2 class="intro-title">${esc(CASE.role)}</h2><p class="eyebrow">${esc(CASE.roleVi)} · ${esc(CASE.company)} · ${esc(CASE.duration)}</p>${CASE.roleIntro.map(p => `<p>${esc(p)}</p>`).join('')}`,
    () => `<h3>Về ${esc(CASE.company)}</h3>${CASE.companyIntro.map(p => `<p>${esc(p)}</p>`).join('')}`,
    () => `<h3>Bạn muốn trải nghiệm theo cách nào?</h3><p>Hai chế độ dùng chung nhiệm vụ và tiêu chí đánh giá, chỉ khác mức hỗ trợ trong lúc làm.</p>
      <div class="mode-options" role="radiogroup" aria-label="Chế độ trải nghiệm">${Object.entries(MODES).map(([id, m]) => `<button class="mode-option" role="radio" aria-checked="${s.mode === id}" data-do="mode" data-id="${id}"><strong>${m.label}</strong><span>${m.summary}</span><ul>${m.points.map(x => `<li>${x}</li>`).join('')}</ul></button>`).join('')}</div>`
  ][step]();
  const next = [['Về công ty', 'intro-company'], ['Chọn chế độ', 'intro-mode'], ['Bắt đầu nhiệm vụ', 'intro-enter']][step];
  return `${body}<div class="actions">${step === 2 && !s.mode ? '<span class="eb-note">Chọn một chế độ để bắt đầu.</span>' : ''}<button class="primary" data-do="${next[1]}" ${step === 2 && !s.mode ? 'disabled' : ''}>${next[0]} →</button></div>`;
}
function assistantView() {
  const tip = CASE.assistant[assistKey()];
  const guided = s.mode !== 'self';
  return `<p class="eyebrow">Chế độ ${esc(MODES[s.mode]?.label ?? 'Làm quen')} · ${esc(tip.title)}</p>
    ${guided ? `<ul class="assistant-tips">${tip.guided.map(t => `<li>${esc(t)}</li>`).join('')}</ul>${tip.sample ? `<details class="assistant-sample"><summary>Xem phương án mẫu</summary><p>${esc(tip.sample)}</p></details>` : ''}`
      : `<p>Trong chế độ Thử sức, trợ lý không đưa đáp án. Hãy tự trả lời các câu hỏi sau:</p><ul class="assistant-tips">${tip.self.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`}
    <p class="eb-note">Muốn hỏi thêm? Bấm VaVi ở góc phải dưới.</p>`;
}

// ---------- Render ----------
function render() {
  stagesBar();
  const views = { brief: briefView, data: dataView, evp: evpView, post: postView, plan: planView, handoff: handoffView };
  const focus = document.activeElement?.dataset?.bind ? { bind: document.activeElement.dataset.bind, id: document.activeElement.dataset.id, start: document.activeElement.selectionStart } : null;
  app.innerHTML = `<div class="eb-app">${sidebar()}<section class="eb-main" aria-live="polite">${views[s.tab]()}</section></div>${taskBar()}`;
  if (focus) {
    const el = app.querySelector(`[data-bind="${focus.bind}"]${focus.id ? `[data-id="${focus.id}"]` : ''}`);
    if (el && el.type !== 'checkbox' && el.type !== 'radio') { el.focus(); try { el.setSelectionRange(focus.start, focus.start); } catch { /* select */ } }
  }
}
function renderModal() {
  if (!overlay) { if (modal.open) modal.close(); return; }
  const titles = { 'intro-role': 'Vai trò', 'intro-company': 'Về công ty', 'intro-mode': 'Chế độ', feedback: `Phản hồi từ ${CASE.managerShort} · AI`, portfolio: 'Hồ sơ trải nghiệm', assistant: 'Trợ lý công việc' };
  const body = overlay.startsWith('intro') ? introView() : { feedback: feedbackView, portfolio: portfolioView, assistant: assistantView }[overlay]();
  modal.className = overlay === 'feedback' ? 'wide' : '';
  modal.innerHTML = `<div class="modal-head"><h2>${esc(titles[overlay])}</h2>${overlay.startsWith('intro') ? '' : '<button data-do="close" aria-label="Đóng">×</button>'}</div><div class="modal-body">${body}</div>`;
  if (!modal.open) modal.showModal();
}
function open(o) { overlay = o; renderModal(); }

// ---------- Sự kiện ----------
document.addEventListener('click', e => {
  const el = e.target.closest('[data-do]');
  if (!el) return;
  const { do: action, id } = el.dataset;
  switch (action) {
    case 'tab': s.tab = id; if (id === 'brief') s.read.brief = true; errors = {}; overlay = ''; renderModal(); save(); render(); scrollTo({ top: 0, behavior: 'smooth' }); return;
    case 'intro-company': case 'intro-mode': open(action); return;
    case 'mode': s.mode = id; save(); renderModal(); stagesBar(); return;
    case 'intro-enter': s.introSeen = true; s.read.brief = true; save(); overlay = location.hash === '#profile' ? 'portfolio' : ''; renderModal(); render(); return;
    case 'assistant': (s.assistUses ??= {})[assistKey()] = (s.assistUses[assistKey()] ?? 0) + 1; save(); open('assistant'); return;
    case 'feedback': viewVersion = null; open('feedback'); return;
    case 'portfolio': open('portfolio'); return;
    case 'workspace': case 'close': overlay = ''; renderModal(); return;
    case 'version': viewVersion = id; open('feedback'); return;
    case 'retry': if (s.submission) aiReview(s.submission); renderModal(); return;
    case 'revise': overlay = ''; renderModal(); s.tab = 'evp'; save(); render(); return;
    case 'reset': {
      const ask = window.vvConfirm
        ? window.vvConfirm({ title: 'Bắt đầu lại nhiệm vụ?', message: 'Bài đang làm sẽ được xoá. Các phiên bản đã nộp vẫn được giữ trong Hồ sơ trải nghiệm.', confirmLabel: 'Bắt đầu lại', tone: 'danger' })
        : Promise.resolve(confirm('Bắt đầu lại nhiệm vụ? Các phiên bản đã nộp vẫn được giữ trong Hồ sơ trải nghiệm.'));
      ask.then(ok => {
        if (!ok) return;
        s = Object.assign(initial(), { introSeen: true, mode: s.mode, history: allSubs() }); save(); overlay = ''; renderModal(); render();
        window.vvToast?.('Đã bắt đầu lại nhiệm vụ.', 'success');
      });
      return;
    }
  }
});
document.addEventListener('toggle', e => {
  const src = e.target.closest?.('[data-source]');
  if (src && src.open && !s.read[src.dataset.source]) { s.read[src.dataset.source] = true; save(); stagesBar(); const nav = app.querySelector('.eb-nav'); if (nav) nav.outerHTML = sidebar(); app.querySelector('.eb-head p').textContent = `${UI.dataLead} Đã đọc ${readCount()}/${CASE.sources.length}.`; app.querySelector('.eb-task').outerHTML = taskBar(); }
}, true);
document.addEventListener('input', e => {
  const el = e.target, b = el.dataset.bind;
  if (!b) return;
  const rerender = ['pillar', 'post-channel', 'plan-channel', 'plan-kpi', 'post-quote'].includes(b);
  if (b === 'pillar') { const p = (s.pillars[el.dataset.id] ??= {}); p.on = el.checked; }
  if (b === 'evidence') s.pillars[el.dataset.id].evidence = el.value;
  if (b === 'post-channel') s.post.channel = el.value;
  if (b === 'post-title') s.post.title = el.value;
  if (b === 'post-body') s.post.body = el.value;
  if (b === 'post-quote') s.post.quote = el.value;
  if (b === 'plan-channel' || b === 'plan-kpi') { const list = b === 'plan-channel' ? s.plan.channels : s.plan.kpis; const i = list.indexOf(el.value); if (el.checked && i < 0) list.push(el.value); if (!el.checked && i >= 0) list.splice(i, 1); }
  if (b === 'plan-target') s.plan.target = el.value;
  if (b === 'recommendation') { s.recommendation = el.value; delete errors.handoff; }
  save();
  if (rerender || b === 'evidence' || b === 'post-title' || b === 'post-body') render(); else stagesBar();
});
document.addEventListener('submit', e => {
  if (e.target.dataset.form !== 'handoff') return;
  e.preventDefault();
  errors = {};
  if (!done.evp()) errors.evp = UI.pick.error.replace('{min}', MIN_EVIDENCE);
  if (!done.post()) errors.post = UI.write.error.replace('{min}', MIN_POST);
  if (!done.plan()) errors.plan = UI.plan.error;
  if (s.recommendation.trim().length < MIN_REC) errors.handoff = `Viết khuyến nghị cho ${CASE.managerShort} (tối thiểu ${MIN_REC} ký tự): việc ưu tiên, căn cứ và con số theo dõi.`;
  if (Object.keys(errors).length) {
    const first = ['evp', 'post', 'plan'].find(k => errors[k]);
    if (first && !errors.handoff) s.tab = first;
    render();
    return;
  }
  if (s.submission) (s.history ??= []).push(s.submission);
  const sub = { id: 'v' + Date.now(), version: (s.history?.length ?? 0) + 1, at: Date.now(), payload: structuredClone(payload()) };
  s.submission = sub; save(); render();
  viewVersion = null; open('feedback');
  aiReview(sub);
});
addEventListener('hashchange', () => { if (location.hash === '#profile' && s.introSeen) open('portfolio'); });

// VaVi đọc ngữ cảnh và gợi ý soạn sẵn qua hai hàm này.
window.novaContext = () => ({ page: 'workspace', mission: CASE.id, mode: s.mode || '', task: assistKey(), submitted: !!s.submission });
window.novaTips = () => {
  const k = assistKey(), tip = CASE.assistant[k];
  (s.assistUses ??= {})[k] = (s.assistUses[k] ?? 0) + 1; save();
  return s.mode === 'self' ? { label: `Câu hỏi định hướng · ${tip.title}`, items: tip.self } : { label: `Gợi ý · ${tip.title}`, items: tip.guided, sample: tip.sample };
};

render();
if (!s.introSeen) open('intro-role');
else if (!s.mode) open('intro-mode');
else if (location.hash === '#profile') open('portfolio');
else if (location.hash === '#result' && s.submission) open('feedback');
// Bài đã nộp nhưng tải lại trang khi đang chấm: chấm lại.
if (s.submission && (!s.submission.ai || s.submission.ai.status === 'pending')) aiReview(s.submission);
