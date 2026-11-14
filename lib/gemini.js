// Gọi Gemini qua chuỗi model dự phòng, dùng chung cho chấm bài và trợ lý NOVA.
import { GoogleGenAI, ApiError } from '@google/genai';

// Danh sách model thử lần lượt; đổi bằng biến GEMINI_MODEL (cách nhau bởi dấu phẩy), không cần sửa code.
// Gói free hay báo 503 "high demand" (13/11: cả gemini-3.8-flash lẫn gemini-3.5-flash), nên model sau dùng khi model trước bận.
// Model lite đứng trước: khi bận chúng báo 503 trong vài giây, còn model flash lớn thường chờ tới hết thời gian.
// (gemini-2.5-flash trả 404 với tài khoản mới, nên không dùng.)
export const MODELS = (process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite,gemini-3.1-flash-lite,gemini-3.5-flash,gemini-3.8-flash')
  .split(',').map(m => m.trim()).filter(Boolean);
// Model bận (429/5xx) hoặc không mở cho tài khoản (404): thử model kế tiếp thay vì báo lỗi ngay.
const RETRYABLE = new Set([404, 429, 500, 503, 504]);

const MIN_TIMEOUT_MS = 10_000;
let client;
export function hasKey() {
  return Boolean(process.env.GEMINI_API_KEY);
}

// budgetMs: tổng thời gian cho mọi lần thử. Trả về response của model đầu tiên trả lời được.
export async function generateWithFallback(request, budgetMs) {
  client ??= new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const started = Date.now();
  let lastError;
  for (const [index, model] of MODELS.entries()) {
    const remaining = budgetMs - (Date.now() - started);
    // Gemini không nhận thời hạn dưới 10 giây (lỗi 400 INVALID_ARGUMENT).
    if (remaining < MIN_TIMEOUT_MS) break;
    // Chia đều thời gian còn lại cho các model chưa thử, để model đầu không dùng hết.
    const timeout = Math.max(MIN_TIMEOUT_MS, Math.floor(remaining / (MODELS.length - index)));
    try {
      return await client.models.generateContent({ model, ...request, config: { ...request.config, httpOptions: { timeout } } });
    } catch (error) {
      lastError = error;
      const status = error instanceof ApiError ? error.status : undefined;
      const timedOut = error?.name === 'AbortError' || /timeout|aborted/i.test(String(error?.message));
      console.error(`Gemini ${model} failed`, status ?? error?.name, String(error?.message).slice(0, 160));
      if (!RETRYABLE.has(status) && !timedOut) throw error;
    }
  }
  throw lastError ?? Object.assign(new Error('Gemini không phản hồi kịp.'), { timedOut: true });
}
