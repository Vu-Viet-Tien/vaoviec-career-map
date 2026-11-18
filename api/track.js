import { EVENT_NAMES, saveEvent } from '../lib/event-store.js';

// Nhận 1 sự kiện nhiệm vụ từ analytics.js (sendBeacon) và lưu vào kho riêng của nhóm.
// Chỉ nhận đúng các trường ẩn danh cần cho thống kê; bỏ qua mọi trường khác.
const id = v => (typeof v === 'string' && /^[\w.:-]{1,80}$/.test(v) ? v : '');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Chỉ hỗ trợ POST.' });
  }
  try {
    const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {});
    if (raw.length > 2000) return res.status(413).json({ error: 'Quá dài.' });
    const body = JSON.parse(raw || '{}');
    if (!EVENT_NAMES.includes(body.name) || !/^MISSION_\d{3}$/.test(body.mission_id ?? '')) {
      return res.status(400).json({ error: 'Sự kiện không hợp lệ.' });
    }
    const ts = Date.parse(body.ts);
    await saveEvent({
      name: body.name,
      mission_id: body.mission_id,
      anon_id: id(body.anon_id),
      session_id: id(body.session_id),
      attempt_id: id(body.attempt_id),
      mode: id(body.mode),
      ts: Number.isFinite(ts) && Math.abs(ts - Date.now()) < 864e5 ? new Date(ts).toISOString() : new Date().toISOString(),
      received_at: new Date().toISOString()
    });
    return res.status(204).end();
  } catch (error) {
    if (error instanceof SyntaxError) return res.status(400).json({ error: 'JSON không hợp lệ.' });
    console.error('track', error.message);
    return res.status(500).json({ error: 'Không lưu được sự kiện.' });
  }
}
