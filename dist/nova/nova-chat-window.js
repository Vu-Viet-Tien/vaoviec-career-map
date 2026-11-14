// NovaChatWindow: khung chat nổi. Chỉ lo giao diện (mở/đóng/thu nhỏ, tin nhắn, ô nhập);
// việc gửi câu hỏi đi đâu do nova-assistant.js quyết định qua callback onSend.
import { createAvatarSVG } from './nova-mascot.js';

const ICONS = {
  min: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 12h12"/></svg>',
  restore: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.4 20.4 21 12 3.4 3.6l.1 6.5L15 12 3.5 13.9z"/></svg>'
};
const STATUS = { online: 'Online', busy: 'Đang trả lời…', offline: 'Tạm mất kết nối' };

export class NovaChatWindow {
  constructor({ onSend, onClose, onFocus, onTyping }) {
    this.onSend = onSend;
    this.el = document.createElement('section');
    this.el.className = 'nova-chat';
    this.el.id = 'nova-chat';
    this.el.setAttribute('role', 'dialog');
    this.el.setAttribute('aria-label', 'Trò chuyện với VaVi');
    this.el.innerHTML = `
      <header class="nova-chat-head">
        <span class="nova-avatar">${createAvatarSVG('nova-av')}</span>
        <div class="nova-chat-title"><strong>VaVi AI Assistant</strong><span class="nova-status" data-status="online"><i></i><span>Online</span></span></div>
        <button type="button" class="nova-icon-btn" data-nova="min" aria-label="Thu nhỏ">${ICONS.min}</button>
        <button type="button" class="nova-icon-btn" data-nova="close" aria-label="Đóng">${ICONS.close}</button>
      </header>
      <div class="nova-log" role="log" aria-live="polite"></div>
      <div class="nova-chips"></div>
      <form class="nova-form">
        <label class="nova-sr" for="nova-input">Câu hỏi cho VaVi</label>
        <textarea id="nova-input" class="nova-input" rows="1" maxlength="600" placeholder="Hỏi VaVi về nghề hoặc nhiệm vụ…"></textarea>
        <button type="submit" class="nova-send" aria-label="Gửi" disabled>${ICONS.send}</button>
      </form>
      <p class="nova-foot">VaVi dùng AI nên có thể nhầm. Đừng nhập thông tin cá nhân.</p>`;
    this.log = this.el.querySelector('.nova-log');
    this.chips = this.el.querySelector('.nova-chips');
    this.input = this.el.querySelector('.nova-input');
    this.sendBtn = this.el.querySelector('.nova-send');
    this.status = this.el.querySelector('.nova-status');
    this.minBtn = this.el.querySelector('[data-nova="min"]');

    this.el.querySelector('[data-nova="close"]').addEventListener('click', () => onClose());
    this.minBtn.addEventListener('click', () => this.minimize(!this.minimized));
    this.el.querySelector('.nova-chat-head').addEventListener('dblclick', e => { if (!e.target.closest('button')) this.minimize(!this.minimized); });
    this.el.querySelector('.nova-form').addEventListener('submit', e => { e.preventDefault(); this.submit(); });
    this.input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); this.submit(); }
    });
    this.input.addEventListener('input', () => {
      this.autosize();
      this.sendBtn.disabled = this.busy || !this.input.value.trim();
      onTyping?.(this.input.value.trim().length > 0);
    });
    this.input.addEventListener('focus', () => onFocus?.(true));
    this.input.addEventListener('blur', () => onFocus?.(false));
    this.chips.addEventListener('click', e => {
      const chip = e.target.closest('.nova-chip');
      if (chip) this.chipHandler?.(chip.dataset.id, chip.textContent);
    });
    this.el.addEventListener('keydown', e => { if (e.key === 'Escape') { e.stopPropagation(); onClose(); } });
  }

  get minimized() { return this.el.classList.contains('is-min'); }

  minimize(on) {
    this.el.classList.toggle('is-min', on);
    this.minBtn.innerHTML = on ? ICONS.restore : ICONS.min;
    this.minBtn.setAttribute('aria-label', on ? 'Mở rộng' : 'Thu nhỏ');
    if (!on) this.scroll();
  }

  autosize() {
    this.input.style.height = 'auto';
    this.input.style.height = Math.min(this.input.scrollHeight + 2, 110) + 'px';
  }

  setStatus(key) {
    this.status.dataset.status = key;
    this.status.lastElementChild.textContent = STATUS[key];
  }

  setBusy(on) {
    this.busy = on;
    this.sendBtn.disabled = on || !this.input.value.trim();
    this.chips.querySelectorAll('button').forEach(b => { b.disabled = on; });
  }

  submit() {
    const text = this.input.value.trim();
    if (!text || this.busy) return;
    this.input.value = '';
    this.autosize();
    this.sendBtn.disabled = true;
    this.onSend(text);
  }

  // kind: 'nova' | 'user' | 'note'. Nội dung luôn gắn bằng textContent để không chèn HTML lạ.
  add(kind, text) {
    const msg = document.createElement('div');
    msg.className = `nova-msg nova-msg-${kind}`;
    msg.textContent = text;
    this.log.append(msg);
    this.scroll();
    return msg;
  }

  // Gợi ý soạn sẵn (không phải câu trả lời AI): tiêu đề + danh sách ý.
  addTips(label, items, sample) {
    const msg = document.createElement('div');
    msg.className = 'nova-msg nova-msg-nova nova-msg-tips';
    const b = document.createElement('b');
    b.textContent = label;
    const ul = document.createElement('ul');
    for (const item of items) {
      const li = document.createElement('li');
      li.textContent = item;
      ul.append(li);
    }
    msg.append(b, ul);
    // Chế độ Làm quen: phương án mẫu thu gọn, người học tự bấm mở khi cần.
    if (sample) {
      const details = document.createElement('details');
      details.className = 'nova-sample';
      const summary = document.createElement('summary');
      summary.textContent = 'Xem phương án mẫu';
      const p = document.createElement('p');
      p.textContent = sample;
      details.append(summary, p);
      details.addEventListener('toggle', () => this.scroll());
      msg.append(details);
    }
    this.log.append(msg);
    this.scroll();
  }

  typing() {
    const msg = document.createElement('div');
    msg.className = 'nova-msg nova-msg-nova';
    msg.setAttribute('aria-label', 'VaVi đang soạn câu trả lời');
    msg.innerHTML = '<span class="nova-typing"><i></i><i></i><i></i></span>';
    this.log.append(msg);
    this.scroll();
    return msg;
  }

  setChips(chips, handler) {
    this.chipHandler = handler;
    this.chips.replaceChildren(...chips.map(([id, label]) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'nova-chip';
      b.dataset.id = id;
      b.textContent = label;
      return b;
    }));
    this.chips.hidden = !chips.length;
  }

  scroll() {
    requestAnimationFrame(() => { this.log.scrollTop = this.log.scrollHeight; });
  }

  focus() {
    // Trên điện thoại không tự bật bàn phím che mất khung chat.
    if (matchMedia('(pointer: fine)').matches) this.input.focus({ preventScroll: true });
  }
}
