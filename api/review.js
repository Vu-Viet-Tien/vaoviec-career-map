import { ApiError } from '@google/genai';
import { reviewSubmission, ReviewError } from '../lib/review-core.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Chỉ hỗ trợ POST.' });
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    return res.status(200).json(await reviewSubmission(body));
  } catch (error) {
    if (error instanceof ReviewError) return res.status(error.status).json({ error: error.message });
    if (error instanceof SyntaxError) return res.status(400).json({ error: 'Dữ liệu gửi lên không phải JSON hợp lệ.' });
    if (error instanceof ApiError) {
      console.error('Gemini API error', error.status, error.message);
      if (error.status === 429) return res.status(429).json({ error: 'Hệ thống đang bận (đã chạm giới hạn gói miễn phí), thử chấm lại sau ít phút.' });
      if (error.status === 400 || error.status === 401 || error.status === 403) return res.status(500).json({ error: 'Máy chủ cấu hình khóa API hoặc model chưa đúng.' });
      return res.status(502).json({ error: 'Dịch vụ đánh giá tạm gián đoạn.' });
    }
    console.error(error);
    return res.status(500).json({ error: 'Lỗi không xác định khi chấm bài.' });
  }
}
