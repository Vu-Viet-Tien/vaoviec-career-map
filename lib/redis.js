// Upstash Redis qua REST (không cần thư viện). Vercel → Storage → Upstash Redis tự thêm
// KV_REST_API_URL / KV_REST_API_TOKEN (hoặc UPSTASH_REDIS_REST_*).
// Chạy local không có các biến này thì dùng bộ nhớ tạm (mất khi tắt server) để thử.

const url = () => process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
export const redisReady = () => !!(url() && token());

// Bộ nhớ tạm cho local: hỗ trợ đúng các lệnh dự án dùng.
const mem = new Map();
const expiry = new Map();
function memGet(k) {
  if (expiry.has(k) && expiry.get(k) < Date.now()) { mem.delete(k); expiry.delete(k); }
  return mem.get(k);
}
function memCommand([cmd, k, ...a]) {
  switch (cmd.toUpperCase()) {
    case 'GET': return memGet(k) ?? null;
    case 'SET': {
      const nx = a.includes('NX');
      if (nx && memGet(k) !== undefined) return null;
      mem.set(k, a[0]);
      const ex = a.indexOf('EX');
      if (ex >= 0) expiry.set(k, Date.now() + Number(a[ex + 1]) * 1000); else expiry.delete(k);
      return 'OK';
    }
    case 'DEL': { const had = mem.delete(k); expiry.delete(k); return had ? 1 : 0; }
    case 'INCR': { const v = Number(memGet(k) ?? 0) + 1; mem.set(k, String(v)); return v; }
    case 'EXPIRE': { if (mem.has(k)) expiry.set(k, Date.now() + Number(a[0]) * 1000); return 1; }
    case 'LPUSH': { const l = memGet(k) ?? []; l.unshift(...a); mem.set(k, l); return l.length; }
    case 'LTRIM': { const l = memGet(k) ?? []; mem.set(k, l.slice(Number(a[0]), Number(a[1]) + 1)); return 'OK'; }
    case 'LRANGE': { const l = memGet(k) ?? []; return Number(a[1]) === -1 ? l.slice(Number(a[0])) : l.slice(Number(a[0]), Number(a[1]) + 1); }
    default: throw new Error('Lệnh chưa hỗ trợ ở bộ nhớ tạm: ' + cmd);
  }
}

// Chạy nhiều lệnh một lần; trả về mảng kết quả theo thứ tự.
export async function redis(commands) {
  if (!redisReady()) {
    // Trên Vercel mà chưa nối Redis: báo lỗi rõ thay vì giữ tạm trong bộ nhớ rồi mất.
    if (process.env.VERCEL) throw new Error('Chưa nối Upstash Redis (thiếu KV_REST_API_URL).');
    return commands.map(memCommand);
  }
  const res = await fetch(url().replace(/\/$/, '') + '/pipeline', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands.map(c => c.map(String)))
  });
  if (!res.ok) throw new Error(`Redis ${res.status}`);
  const out = await res.json();
  const failed = out.find(x => x.error);
  if (failed) throw new Error(`Redis: ${failed.error}`);
  return out.map(x => x.result);
}
