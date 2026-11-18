import { timingSafeEqual, createHash } from 'node:crypto';
import { loadEvents, storeReady } from '../lib/event-store.js';

// Trả toàn bộ sự kiện đã lưu cho trang /thong-ke. Cần mật khẩu STATS_PASSWORD (nhóm tự đặt trong Vercel).
// Việc tổng hợp làm ở trình duyệt để lọc theo ngày/nhiệm vụ không phải gọi lại server.
const digest = s => createHash('sha256').update(String(s)).digest();

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Chỉ hỗ trợ GET.' });
  }
  const password = process.env.STATS_PASSWORD;
  if (!password) return res.status(503).json({ error: 'Chưa đặt STATS_PASSWORD trong Vercel → Settings → Environment Variables.' });
  const given = req.headers['x-stats-password'] ?? '';
  if (!timingSafeEqual(digest(given), digest(password))) return res.status(401).json({ error: 'Sai mật khẩu.' });
  try {
    const events = await loadEvents();
    return res.status(200).json({ store: storeReady() ? 'redis' : 'memory', count: events.length, events });
  } catch (error) {
    console.error('stats', error.message);
    return res.status(502).json({ error: 'Không đọc được kho sự kiện. Kiểm tra Upstash Redis đã nối vào project chưa.' });
  }
}
