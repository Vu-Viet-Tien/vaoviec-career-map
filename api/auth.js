import {
  AuthError, register, login, googleLogin, updateProfile, loadUser, publicUser,
  createSession, endSession, sessionUserId, rateLimit, loadData, saveData
} from '../lib/accounts.js';

// Một endpoint cho mọi việc tài khoản: /api/auth?action=...
//   GET  config | me | data        POST register | login | google | logout | profile | data
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const action = new URL(req.url, 'http://x').searchParams.get('action') ?? '';
  try {
    if (req.method === 'GET') {
      if (action === 'config') return res.status(200).json({ googleClientId: process.env.GOOGLE_CLIENT_ID ?? '' });
      const uid = await sessionUserId(req);
      const user = uid && await loadUser(uid);
      if (action === 'me') return res.status(200).json({ user: publicUser(user) ?? null });
      if (!user) throw new AuthError(401, 'Bạn chưa đăng nhập.');
      if (action === 'data') return res.status(200).json(await loadData(user.id));
      throw new AuthError(404, 'Không có thao tác này.');
    }
    if (req.method !== 'POST') { res.setHeader('Allow', 'GET, POST'); throw new AuthError(405, 'Phương thức không hỗ trợ.'); }
    // Chặn gửi chéo trang: chỉ nhận yêu cầu từ chính web (header tự đặt, trình duyệt không cho trang lạ gửi kèm).
    if (req.headers['x-vaoviec'] !== '1') throw new AuthError(403, 'Yêu cầu không hợp lệ.');
    const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {});
    if (raw.length > 1_000_000) throw new AuthError(413, 'Dữ liệu quá lớn.');
    const body = raw ? JSON.parse(raw) : {};

    if (action === 'register' || action === 'login' || action === 'google') {
      await rateLimit(req, action, action === 'register' ? 10 : 20, 600);
      const user = action === 'register' ? await register(body) : action === 'login' ? await login(body) : await googleLogin(body.credential);
      await createSession(res, user.id);
      return res.status(200).json({ user: publicUser(user) });
    }
    if (action === 'logout') { await endSession(req, res); return res.status(200).json({ ok: true }); }

    const uid = await sessionUserId(req);
    if (!uid) throw new AuthError(401, 'Phiên đăng nhập đã hết hạn. Đăng nhập lại nhé.');
    if (action === 'profile') return res.status(200).json({ user: publicUser(await updateProfile(uid, body)) });
    if (action === 'data') return res.status(200).json(await saveData(uid, body.items));
    throw new AuthError(404, 'Không có thao tác này.');
  } catch (error) {
    if (error instanceof AuthError) return res.status(error.status).json({ error: error.message });
    if (error instanceof SyntaxError) return res.status(400).json({ error: 'Dữ liệu không hợp lệ.' });
    console.error('auth', action, error.message);
    return res.status(500).json({ error: 'Máy chủ tài khoản đang lỗi. Thử lại sau ít phút.' });
  }
}
