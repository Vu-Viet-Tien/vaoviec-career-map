// Kho sự kiện tracking: Upstash Redis qua REST (không cần thư viện).
// Vercel → Storage → Upstash Redis tự thêm KV_REST_API_URL / KV_REST_API_TOKEN (hoặc UPSTASH_REDIS_REST_*).
// Chạy local không có các biến này thì dùng bộ nhớ tạm để thử.

export const EVENT_NAMES = ['mission_started', 'mission_submitted', 'mission_completed', 'mission_resubmitted'];
const KEY = 'vv:events';
const MAX_EVENTS = 100000;

const url = () => process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
export const storeReady = () => !!(url() && token());
const memory = [];

async function redis(commands) {
  const res = await fetch(url().replace(/\/$/, '') + '/pipeline', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands)
  });
  if (!res.ok) throw new Error(`Redis ${res.status}`);
  const out = await res.json();
  const failed = out.find(x => x.error);
  if (failed) throw new Error(`Redis: ${failed.error}`);
  return out.map(x => x.result);
}

export async function saveEvent(event) {
  const line = JSON.stringify(event);
  if (!storeReady()) {
    // Trên Vercel mà chưa nối Redis: báo lỗi rõ thay vì giữ tạm trong bộ nhớ rồi mất.
    if (process.env.VERCEL) throw new Error('Chưa nối Upstash Redis (thiếu KV_REST_API_URL).');
    memory.unshift(line); memory.length = Math.min(memory.length, MAX_EVENTS); return; }
  await redis([['LPUSH', KEY, line], ['LTRIM', KEY, '0', String(MAX_EVENTS - 1)]]);
}

export async function loadEvents() {
  const lines = storeReady() ? (await redis([['LRANGE', KEY, '0', '-1']]))[0] : memory;
  return lines.map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean).reverse();
}
