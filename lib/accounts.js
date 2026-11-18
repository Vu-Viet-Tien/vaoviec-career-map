// Tài khoản VAOVIEC. (feedback 19/11): email + mật khẩu hoặc Google; phiên đăng nhập bằng cookie HttpOnly.
// Lưu trong Upstash Redis:
//   vv:user:<id>          JSON hồ sơ (không chứa mật khẩu gốc, chỉ băm scrypt)
//   vv:email:<email>      -> id      vv:google:<sub> -> id
//   vv:sess:<token>       -> id (hết hạn 30 ngày)
//   vv:data:<id>          JSON tiến độ nhiệm vụ đồng bộ giữa các máy
import { randomBytes, scrypt, timingSafeEqual, createHash } from 'node:crypto';
import { promisify } from 'node:util';
import { redis } from './redis.js';

const scryptAsync = promisify(scrypt);
export const SESSION_DAYS = 30;
const COOKIE = 'vv_session';

export class AuthError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

export const normEmail = e => String(e ?? '').trim().toLowerCase();
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;
const clean = (v, max) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

export function publicUser(u) {
  return u && { id: u.id, email: u.email, name: u.name, school: u.school ?? '', providers: u.providers ?? [], picture: u.picture ?? '', createdAt: u.createdAt };
}

async function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  const key = await scryptAsync(password, salt, 64);
  return { salt, hash: key.toString('hex') };
}
async function checkPassword(password, user) {
  if (!user?.passHash) return false;
  const { hash } = await hashPassword(password, user.passSalt);
  const a = Buffer.from(hash, 'hex'), b = Buffer.from(user.passHash, 'hex');
  return a.length === b.length && timingSafeEqual(a, b);
}

const getJSON = async key => { const [v] = await redis([['GET', key]]); try { return v ? JSON.parse(v) : null; } catch { return null; } };
const saveUser = u => redis([['SET', `vv:user:${u.id}`, JSON.stringify(u)]]);
export const loadUser = id => getJSON(`vv:user:${id}`);

// Giới hạn số lần thử theo IP để chặn dò mật khẩu.
export async function rateLimit(req, bucket, max, seconds) {
  const ip = String(req.headers['x-forwarded-for'] ?? req.socket?.remoteAddress ?? '').split(',')[0].trim() || 'unknown';
  const key = `vv:rl:${bucket}:${createHash('sha256').update(ip).digest('hex').slice(0, 24)}`;
  const [n] = await redis([['INCR', key], ['EXPIRE', key, String(seconds)]]);
  if (n > max) throw new AuthError(429, 'Bạn thử quá nhiều lần. Đợi vài phút rồi thử lại.');
}

export async function register({ email, password, name, school }) {
  email = normEmail(email);
  name = clean(name, 60);
  if (!EMAIL_RE.test(email) || email.length > 254) throw new AuthError(400, 'Email chưa đúng định dạng.');
  if (typeof password !== 'string' || password.length < 8) throw new AuthError(400, 'Mật khẩu cần ít nhất 8 ký tự.');
  if (password.length > 200) throw new AuthError(400, 'Mật khẩu quá dài.');
  if (!name) throw new AuthError(400, 'Nhập họ và tên.');
  const id = randomBytes(12).toString('hex');
  // Giữ chỗ email trước (NX) để hai lượt đăng ký cùng lúc không tạo trùng.
  const [claimed] = await redis([['SET', `vv:email:${email}`, id, 'NX']]);
  if (claimed !== 'OK') throw new AuthError(409, 'Email này đã có tài khoản. Bấm "Đăng nhập" để vào.');
  const { salt, hash } = await hashPassword(password);
  const user = { id, email, name, school: clean(school, 80), providers: ['password'], passSalt: salt, passHash: hash, createdAt: Date.now() };
  await saveUser(user);
  return user;
}

export async function login({ email, password }) {
  const id = (await redis([['GET', `vv:email:${normEmail(email)}`]]))[0];
  const user = id && await loadUser(id);
  if (!user || !(await checkPassword(String(password ?? ''), user))) {
    if (user && !user.passHash) throw new AuthError(401, 'Email này đăng nhập bằng Google. Bấm "Tiếp tục với Google".');
    throw new AuthError(401, 'Email hoặc mật khẩu chưa đúng.');
  }
  return user;
}

// Google Identity Services gửi ID token; kiểm tra với Google rồi tìm hoặc tạo tài khoản theo sub/email.
export async function googleLogin(credential) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) throw new AuthError(503, 'Chưa cấu hình đăng nhập Google.');
  if (typeof credential !== 'string' || credential.length > 4000) throw new AuthError(400, 'Thiếu thông tin Google.');
  const res = await fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(credential));
  const info = await res.json().catch(() => ({}));
  const okIss = info.iss === 'accounts.google.com' || info.iss === 'https://accounts.google.com';
  if (!res.ok || info.aud !== clientId || !okIss || Number(info.exp) * 1000 < Date.now()) throw new AuthError(401, 'Đăng nhập Google không hợp lệ. Thử lại.');
  if (info.email_verified !== 'true' && info.email_verified !== true) throw new AuthError(401, 'Email Google chưa được xác minh.');
  const email = normEmail(info.email);
  const [bySub, byEmail] = await redis([['GET', `vv:google:${info.sub}`], ['GET', `vv:email:${email}`]]);
  let user = (bySub && await loadUser(bySub)) || (byEmail && await loadUser(byEmail));
  if (user) {
    // Email đã đăng ký bằng mật khẩu: Google đã xác minh email nên gộp vào cùng tài khoản.
    // Lần gộp đầu tiên bỏ mật khẩu cũ: đăng ký bằng mật khẩu chưa xác minh email, nên người khác có thể
    // đã đăng ký trước bằng email này. Chủ email vẫn vào bằng Google.
    if (!user.providers?.includes('google')) {
      delete user.passHash; delete user.passSalt;
      user.providers = ['google'];
    }
    user.googleSub = info.sub;
    if (info.picture) user.picture = info.picture;
    await saveUser(user);
  } else {
    const id = randomBytes(12).toString('hex');
    const [claimed] = await redis([['SET', `vv:email:${email}`, id, 'NX']]);
    if (claimed !== 'OK') return googleLogin(credential); // vừa có người tạo cùng email: thử lại để gộp
    user = { id, email, name: clean(info.name || email.split('@')[0], 60), school: '', providers: ['google'], googleSub: info.sub, picture: info.picture ?? '', createdAt: Date.now() };
    await saveUser(user);
  }
  await redis([['SET', `vv:google:${info.sub}`, user.id]]);
  return user;
}

export async function updateProfile(id, { name, school }) {
  const user = await loadUser(id);
  if (!user) throw new AuthError(401, 'Phiên đăng nhập đã hết hạn.');
  name = clean(name, 60);
  if (!name) throw new AuthError(400, 'Nhập họ và tên.');
  user.name = name;
  user.school = clean(school, 80);
  await saveUser(user);
  return user;
}

// ---- Phiên đăng nhập (cookie HttpOnly, máy chủ giữ token) ----
const hashToken = t => createHash('sha256').update(t).digest('hex');
export async function createSession(res, userId) {
  const token = randomBytes(32).toString('base64url');
  await redis([['SET', `vv:sess:${hashToken(token)}`, userId, 'EX', String(SESSION_DAYS * 86400)]]);
  setCookie(res, token, SESSION_DAYS * 86400);
}
export async function endSession(req, res) {
  const token = readCookie(req);
  if (token) await redis([['DEL', `vv:sess:${hashToken(token)}`]]);
  setCookie(res, '', 0);
}
export async function sessionUserId(req) {
  const token = readCookie(req);
  if (!token || token.length > 100) return null;
  return (await redis([['GET', `vv:sess:${hashToken(token)}`]]))[0] ?? null;
}
function readCookie(req) {
  const m = String(req.headers.cookie ?? '').match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : '';
}
function setCookie(res, value, maxAge) {
  const secure = process.env.VERCEL ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`);
}

// ---- Dữ liệu tiến độ đồng bộ ----
const MAX_DATA = 900000; // ~0,9 MB mỗi tài khoản
export async function loadData(id) { return (await getJSON(`vv:data:${id}`)) ?? { items: {}, updatedAt: 0 }; }
export async function saveData(id, items) {
  if (!items || typeof items !== 'object' || Array.isArray(items)) throw new AuthError(400, 'Dữ liệu không hợp lệ.');
  const clean = {};
  for (const [k, v] of Object.entries(items)) {
    if (!/^vaoviec-workspace-[a-z0-9-]{1,80}$/.test(k)) continue;
    if (v !== null && typeof v !== 'string') continue;
    clean[k] = v;
  }
  const body = JSON.stringify({ items: clean, updatedAt: Date.now() });
  if (body.length > MAX_DATA) throw new AuthError(413, 'Dữ liệu tiến độ quá lớn.');
  await redis([['SET', `vv:data:${id}`, body]]);
  return JSON.parse(body);
}
