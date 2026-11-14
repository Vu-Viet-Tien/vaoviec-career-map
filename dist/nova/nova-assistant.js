// NovaAssistant: dựng VaVi ở góc phải dưới, nối linh vật, hoạt ảnh, bong bóng thoại và khung chat.
// Gắn vào trang: <link rel="stylesheet" href="/nova/nova.css"> và <script type="module" src="/nova/nova-assistant.js"></script>.
// Trang có thể khai báo window.novaContext() (ngữ cảnh gửi lên /api/assistant) và window.novaTips() (gợi ý soạn sẵn).
import { createMascotSVG } from './nova-mascot.js';
import { NovaAnimation } from './nova-animation.js';
import { NovaSpeechBubble } from './nova-speech-bubble.js';
import { NovaChatWindow } from './nova-chat-window.js';

const API = '/api/assistant';
const HISTORY_KEY = 'vaoviec-nova-chat';
const MAX_HISTORY = 30;
const QUESTION = '<svg viewBox="0 0 24 32"><path fill="currentColor" d="M12 0C5.6 0 1.5 4 1.5 9.4h6c0-2.6 1.8-4.3 4.4-4.3 2.5 0 4.2 1.5 4.2 3.7 0 1.9-.9 3-3.3 4.5-2.9 1.8-4.2 3.8-4 7.2v1.1h5.8v-.9c0-2 .7-3 3.3-4.6 2.8-1.7 4.6-4 4.6-7.5C22.5 3.7 18.3 0 12 0Zm-.7 25.6a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z"/></svg>';
const GEAR = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M13.7 2l.4 2.6a8 8 0 0 1 2 1.1l2.4-1 1.7 3-2 1.6a8 8 0 0 1 0 2.4l2 1.6-1.7 3-2.4-1a8 8 0 0 1-2 1.1l-.4 2.6h-3.4l-.4-2.6a8 8 0 0 1-2-1.1l-2.4 1-1.7-3 2-1.6a8 8 0 0 1 0-2.4l-2-1.6 1.7-3 2.4 1a8 8 0 0 1 2-1.1L10.3 2zM12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8z"/></svg>';

const store = {
  read() { try { return JSON.parse(sessionStorage.getItem(HISTORY_KEY)) ?? []; } catch { return []; } },
  write(list) { try { sessionStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(-MAX_HISTORY))); } catch { /* trình duyệt chặn lưu: bỏ qua */ } }
};

// Ngữ cảnh mặc định cho Trang chủ / Career Map; Workspace tự khai báo window.novaContext.
function pageContext() {
  if (typeof window.novaContext === 'function') {
    try { return window.novaContext() ?? {}; } catch { return {}; }
  }
  const role = location.hash.match(/^#\/roles\/([^/?]+)/);
  if (role) return { page: 'role', role: decodeURIComponent(role[1]) };
  if (location.hash.startsWith('#/career-map')) return { page: 'career-map' };
  return { page: 'home' };
}

function chipsFor(ctx) {
  if (ctx.page === 'workspace') {
    const term = { MISSION_002: ['ask:EVP là gì và vì sao cần bằng chứng?', 'EVP là gì?'], MISSION_003: ['ask:Lead, CRM và B2B là gì?', 'Lead, CRM là gì?'], MISSION_004: ["ask:Content Marketing là gì và khác quảng cáo thế nào?", "Content Marketing là gì?"], MISSION_005: ["ask:Phễu mua hàng và mốc so sánh là gì?", "Phễu, mốc so sánh?"], MISSION_006: ["ask:FP&A là gì và phân tích chênh lệch ngân sách là gì?", "FP&A là gì?"] }[ctx.mission] ?? ['ask:Giải thích giúp mình thuật ngữ ATS và JD.', 'ATS, JD là gì?'];
    return [['tips', 'Gợi ý cho việc đang làm'], ['ask:Mình nên làm gì tiếp theo?', 'Mình nên làm gì tiếp?'], term];
  }
  if (ctx.page === 'role') {
    return [['ask:Nghề này hằng ngày làm gì và cần kỹ năng nào?', 'Nghề này làm gì?'], ['ask:Sinh viên nên chuẩn bị gì để thử nghề này?', 'Cần chuẩn bị gì?'], ['ask:Có nghề nào gần giống nghề này không?', 'Nghề tương tự']];
  }
  return [['ask:VAOVIEC giúp mình được gì?', 'VAOVIEC là gì?'], ['ask:Mình chưa biết chọn nghề nào, nên bắt đầu từ đâu?', 'Nên bắt đầu từ đâu?'], ['ask:Nhiệm vụ Talent Acquisition Intern diễn ra thế nào?', 'Nhiệm vụ mô phỏng']];
}

class NovaAssistant {
  constructor() {
    this.root = document.createElement('div');
    this.root.className = 'nova-root';
    this.root.innerHTML = `
      <div class="nova-bubble" role="status"></div>
      <button type="button" class="nova-mascot" aria-label="Mở trợ lý VaVi" aria-expanded="false" aria-controls="nova-chat">
        <span class="nova-stage">
          <span class="nova-shadow"></span>
          <span class="nova-ring"></span><span class="nova-ring"></span>
          <span class="nova-float"><span class="nova-jump">${createMascotSVG('nova-m')}</span></span>
          <span class="nova-fx"><span class="nova-think">${QUESTION}${GEAR}</span><span class="nova-dots"><i></i><i></i><i></i></span></span>
        </span>
      </button>`;
    this.mascot = this.root.querySelector('.nova-mascot');
    this.anim = new NovaAnimation(this.root, this.mascot);
    this.bubble = new NovaSpeechBubble(this.root.querySelector('.nova-bubble'));
    this.chat = new NovaChatWindow({
      onSend: text => this.ask(text),
      onClose: () => this.close(),
      onFocus: on => { if (!this.pending) this.anim.setBase(on ? 'listening' : 'idle'); },
      onTyping: on => { if (!this.pending && on) this.anim.setBase('listening'); }
    });
    this.root.append(this.chat.el);
    document.body.append(this.root);

    this.history = store.read();
    this.lastInteraction = Date.now();
    this.bind();
    this.restore();
    this.schedule();
  }

  bind() {
    this.mascot.addEventListener('click', () => {
      this.touch();
      if (!this.open) this.show();
      else if (this.chat.minimized) { this.chat.minimize(false); this.chat.focus(); }
      else this.close();
    });
    this.mascot.addEventListener('pointerenter', e => {
      if (e.pointerType === 'touch') return;
      this.root.classList.add('is-hover');
      this.touch();
    });
    this.mascot.addEventListener('pointerleave', () => this.root.classList.remove('is-hover'));
    this.root.querySelector('.nova-bubble').addEventListener('click', () => { this.bubble.hide(); this.show(); });
    addEventListener('keydown', e => { if (e.key === 'Escape' && this.open && !this.chat.el.contains(document.activeElement)) this.close(); });
    // Trang khác (vd. Workspace khi có kết quả chấm) có thể nhờ VaVi phản ứng: dispatchEvent(new CustomEvent('nova:react', {detail: 'excited'})).
    addEventListener('nova:react', e => this.anim.play(e.detail));
    addEventListener('hashchange', () => { if (this.open) this.refreshChips(); });
  }

  touch() { this.lastInteraction = Date.now(); }

  // Nhịp tự động khi người dùng không tương tác: thỉnh thoảng nhảy, đôi khi chào bằng bong bóng thoại.
  schedule() {
    let bubbles = 0;
    const greetedKey = 'vaoviec-nova-greeted';
    let greeted = false;
    try { greeted = sessionStorage.getItem(greetedKey) === '1'; } catch { /* bỏ qua */ }
    if (!greeted) {
      this.anim.later(() => {
        if (this.open) return;
        this.anim.play('wave');
        this.bubble.say(typeof window.novaTips === 'function' ? 'Cần gợi ý cho việc đang làm? Bấm vào mình nhé 👋' : 'Xin chào! Mình là VaVi 👋', 5000);
        bubbles++;
        try { sessionStorage.setItem(greetedKey, '1'); } catch { /* bỏ qua */ }
      }, 1800);
    }
    const tick = () => this.anim.later(() => {
      const idle = Date.now() - this.lastInteraction > 6000;
      if (!document.hidden && idle && !this.open && !this.anim.shot) {
        const roll = Math.random();
        if (bubbles < 4 && roll < .3 && Date.now() - (this.lastBubble ?? 0) > 40000) {
          bubbles++;
          this.lastBubble = Date.now();
          const text = this.bubble.next();
          this.anim.play(bubbles % 2 ? 'wave' : 'jump');
          this.bubble.say(text, 4000);
        } else if (roll < .78) {
          this.anim.play('jump');
        } else {
          this.anim.play('excited');
        }
      }
      tick();
    }, 9000 + Math.random() * 7000);
    this.lastBubble = Date.now();
    tick();
  }

  get open() { return this.root.classList.contains('chat-open'); }

  show() {
    this.bubble.hide();
    this.root.classList.add('chat-open');
    this.mascot.setAttribute('aria-expanded', 'true');
    this.mascot.setAttribute('aria-label', 'Đóng trợ lý VaVi');
    this.chat.minimize(false);
    if (!this.chat.log.children.length) {
      this.chat.add('nova', 'Chào bạn! Mình là VaVi, trợ lý của VAOVIEC. Bạn có thể hỏi mình về các nghề trong Career Map hoặc nhiệm vụ mô phỏng đang làm nhé.');
    }
    this.refreshChips();
    this.anim.play('wave');
    this.chat.focus();
  }

  close() {
    this.root.classList.remove('chat-open');
    this.mascot.setAttribute('aria-expanded', 'false');
    this.mascot.setAttribute('aria-label', 'Mở trợ lý VaVi');
    if (!this.pending) this.anim.setBase('idle');
    if (this.chat.el.contains(document.activeElement)) this.mascot.focus({ preventScroll: true });
  }

  refreshChips() {
    this.chat.setChips(chipsFor(pageContext()), (id, label) => {
      if (id === 'tips') return this.showTips();
      if (id.startsWith('ask:')) this.ask(id.slice(4), label);
    });
  }

  // Khôi phục cuộc trò chuyện trong phiên (chuyển giữa Trang chủ và Workspace không mất lịch sử).
  restore() {
    for (const turn of this.history) this.chat.add(turn.role === 'user' ? 'user' : 'nova', turn.text);
  }

  // Gợi ý soạn sẵn của Workspace (nội dung case.js), không gọi AI.
  showTips() {
    const tips = typeof window.novaTips === 'function' ? window.novaTips() : null;
    if (!tips) return this.chat.add('note', 'Trang này chưa có gợi ý soạn sẵn. Bạn cứ đặt câu hỏi cho VaVi nhé.');
    this.chat.addTips(tips.label, tips.items, tips.sample);
    this.anim.play('excited');
  }

  async ask(text) {
    if (this.pending) return;
    this.touch();
    const history = this.history.slice(-8);
    this.chat.add('user', text);
    this.pending = true;
    this.chat.setBusy(true);
    this.chat.setStatus('busy');
    this.anim.setBase('thinking');
    const typing = this.chat.typing();
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history, context: pageContext() }),
        signal: AbortSignal.timeout(35000)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || typeof data.reply !== 'string') throw new Error(data.error || 'VaVi tạm mất kết nối, bạn thử lại sau nhé.');
      typing.remove();
      this.history.push({ role: 'user', text }, { role: 'nova', text: data.reply });
      store.write(this.history);
      this.anim.setBase('responding');
      this.chat.setStatus('online');
      await this.reveal(data.reply);
      this.anim.setBase(document.activeElement === this.chat.input ? 'listening' : 'idle');
      this.anim.play('jump');
    } catch (error) {
      typing.remove();
      const message = error?.name === 'TimeoutError' ? 'VaVi phản hồi quá lâu, bạn thử hỏi lại nhé.' : error.message;
      this.chat.add('note', message);
      this.chat.setStatus('offline');
      this.anim.setBase('idle');
    } finally {
      this.pending = false;
      this.chat.setBusy(false);
    }
  }

  // Hiện câu trả lời dần từng đoạn để VaVi "nói", rút ngắn khi người dùng giảm chuyển động.
  async reveal(text) {
    const msg = this.chat.add('nova', '');
    if (!this.anim.motion) { msg.textContent = text; this.chat.scroll(); return; }
    const words = text.split(/(\s+)/);
    const step = Math.max(1, Math.ceil(words.length / 60));
    for (let i = 0; i < words.length; i += step) {
      msg.textContent += words.slice(i, i + step).join('');
      this.chat.scroll();
      await new Promise(r => setTimeout(r, 28));
    }
  }
}

if (!window.__nova) window.__nova = new NovaAssistant();
