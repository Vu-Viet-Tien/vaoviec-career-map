// NovaAnimation: máy trạng thái hoạt ảnh của NOVA.
// Trạng thái nền: idle | listening | thinking | responding. Trạng thái ngắn (chạy xong tự về nền): jump | wave | excited.
// CSS (nova.css) vẽ chuyển động theo data-state + data-face; file này chỉ quyết định khi nào đổi trạng thái.

const FACES = { idle: 'neutral', jump: 'happy', wave: 'happy', excited: 'happy', thinking: 'think', listening: 'listen', responding: 'talk' };
const ONE_SHOT = { jump: 1150, wave: 2600, excited: 1600 };

const STAR = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 1.5l2.6 6.9 7.4.4-5.8 4.6 2 7.1L12 16.4l-6.2 4.1 2-7.1L2 8.8l7.4-.4z"/></svg>';
const CHECK = '<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" d="M4 13l5 5L20 6"/></svg>';
const DOT = '<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="currentColor"/></svg>';

export class NovaAnimation {
  constructor(root, mascot) {
    this.root = root;
    this.mascot = mascot;
    this.fx = root.querySelector('.nova-fx');
    this.base = 'idle';
    this.shot = null;
    this.timers = new Set();
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)');
    this.apply('idle');
    this.blinkLoop();
    this.trackPointer();
  }

  get motion() { return !this.reduced.matches; }

  later(fn, ms) {
    const id = setTimeout(() => { this.timers.delete(id); fn(); }, ms);
    this.timers.add(id);
    return id;
  }

  apply(state) {
    this.root.dataset.state = state;
    this.mascot.dataset.face = FACES[state] ?? 'neutral';
  }

  // Đổi trạng thái nền (giữ tới khi đổi tiếp). Nếu đang chạy động tác ngắn thì đợi nó xong.
  setBase(state) {
    this.base = state;
    if (!this.shot) this.apply(state);
  }

  // Chạy một động tác ngắn rồi quay về trạng thái nền.
  play(state) {
    if (!ONE_SHOT[state]) return this.setBase(state);
    clearTimeout(this.shotTimer);
    this.root.classList.remove('is-jump');
    this.shot = state;
    this.apply(state);
    if (state === 'jump') {
      void this.root.offsetWidth; // khởi động lại keyframes khi nhảy liên tiếp
      this.root.classList.add('is-jump');
      this.later(() => this.burst('land'), 760);
    }
    if (state === 'excited') {
      // Đặt lại animation để lần vui kế tiếp vẫn nhảy đủ hai lần.
      const jump = this.root.querySelector('.nova-jump');
      jump.style.animation = 'none'; void jump.offsetWidth; jump.style.animation = '';
      this.burst('stars');
      this.later(() => this.burst('stars'), 520);
    }
    this.shotTimer = this.later(() => {
      this.root.classList.remove('is-jump');
      this.shot = null;
      this.apply(this.base);
    }, ONE_SHOT[state]);
  }

  // Chớp mắt tự nhiên: 2–6 giây một lần, đôi khi chớp hai cái liền.
  blinkLoop() {
    const blink = () => {
      this.root.classList.add('is-blink');
      setTimeout(() => this.root.classList.remove('is-blink'), 130);
    };
    const next = () => this.later(() => {
      if (this.motion && !document.hidden) {
        blink();
        if (Math.random() < .25) setTimeout(blink, 260);
      }
      next();
    }, 2200 + Math.random() * 3800);
    next();
  }

  // Mắt và đầu hướng theo con trỏ (nhẹ, tối đa vài px), cập nhật một lần mỗi khung hình.
  trackPointer() {
    let frame = 0, px = 0, py = 0;
    const update = () => {
      frame = 0;
      const r = this.mascot.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height * .35;
      const dx = px - cx, dy = py - cy;
      const len = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, len / 260);
      this.mascot.style.setProperty('--look-x', (dx / len * reach).toFixed(3));
      this.mascot.style.setProperty('--look-y', (dy / len * reach).toFixed(3));
    };
    addEventListener('pointermove', e => {
      if (!this.motion || e.pointerType === 'touch') return;
      px = e.clientX; py = e.clientY;
      frame ||= requestAnimationFrame(update);
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => {
      this.mascot.style.setProperty('--look-x', 0);
      this.mascot.style.setProperty('--look-y', 0);
    });
  }

  // Hạt sáng: 'land' = bụi sáng khi tiếp đất, 'stars' = sao và dấu tích khi vui.
  burst(kind) {
    if (!this.motion || !this.fx) return;
    const stars = kind === 'stars';
    const count = stars ? 9 : 6;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'nova-spark';
      const angle = stars ? (-Math.PI * (0.1 + 0.8 * i / (count - 1))) : (Math.PI * (i % 2 ? 0.05 : 0.95) + (Math.random() - .5) * .5);
      const dist = stars ? 50 + Math.random() * 30 : 18 + Math.random() * 16;
      const size = stars ? 9 + Math.random() * 8 : 4 + Math.random() * 4;
      el.style.cssText = `--x:${stars ? 50 : 50 + (i % 2 ? 14 : -14)}%;--y:${stars ? 40 : 92}%;--s:${size}px;` +
        `--dx:${Math.cos(angle) * dist}%;--dy:${Math.sin(angle) * dist - (stars ? 0 : 10)}%;` +
        `--r:${(Math.random() - .5) * 240}deg;--d:${(stars ? .9 : .6) + Math.random() * .4}s;` +
        `--c:${stars && i % 3 === 1 ? '#4da3ff' : '#2fd8f0'};margin:${-size / 2}px 0 0 ${-size / 2}px`;
      el.innerHTML = stars ? (i % 3 === 2 ? CHECK : STAR) : DOT;
      el.addEventListener('animationend', () => el.remove(), { once: true });
      this.fx.append(el);
    }
  }
}
