// NovaSpeechBubble: bong bóng thoại ngắn phía trên NOVA. Hiện vài giây rồi tự ẩn, không lặp dày.

export const LINES = [
  'Xin chào! Mình là Nova.',
  'Bạn cần mình giúp gì không?',
  'Mình luôn sẵn sàng hỗ trợ!',
  'Cùng khám phá nhé! ✨'
];

export class NovaSpeechBubble {
  constructor(el) {
    this.el = el;
    this.index = 0;
    this.hideTimer = 0;
  }

  say(text, ms = 4200) {
    clearTimeout(this.hideTimer);
    this.el.textContent = text;
    this.el.classList.add('is-visible');
    this.hideTimer = setTimeout(() => this.hide(), ms);
  }

  hide() {
    clearTimeout(this.hideTimer);
    this.el.classList.remove('is-visible');
  }

  get visible() { return this.el.classList.contains('is-visible'); }

  // Câu kế tiếp trong danh sách luân phiên.
  next() {
    const text = LINES[this.index % LINES.length];
    this.index++;
    return text;
  }
}
