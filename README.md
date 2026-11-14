# VAOVIEC

Web mô phỏng nghề cho sinh viên. Bản đang chạy: https://vaoviec-career-map.vercel.app

## Chạy local

Cần Node.js 20 trở lên. Mở terminal tại thư mục `vaoviec-career-map`:

```sh
npm install
npm run dev
```

Mở http://127.0.0.1:8000/ (Trang chủ) hoặc http://127.0.0.1:8000/#/career-map (Career Map).

AI chấm bài cần khóa Gemini. Tạo file `.env` trong thư mục này với một dòng `GEMINI_API_KEY=...`. File `.env` không được commit và không được tải lên Vercel. Không có khóa thì web vẫn chạy, phần chấm dùng nhận xét nhanh dựng sẵn.

## Deploy

```sh
npx vercel deploy --prod --yes
```

Khóa `GEMINI_API_KEY` đặt trong Vercel → Project → Settings → Environment Variables (chỉ dán phần giá trị). Có thể đổi chuỗi model bằng biến `GEMINI_MODEL` (các model cách nhau bởi dấu phẩy).

## Cấu trúc

- `dist/index.html`, `dist/home.css`, `dist/styles.css`, `dist/app.js`, `dist/career-data.js` — Trang chủ và Career Map.
- `dist/site-header.js`, `dist/site-header.css` — header chung.
- `dist/workspace/mission-engine.js` + `mission.css` — khung Workspace 6 bước dùng chung cho MISSION_002 (`employer-branding.html`, `employer-branding-assets/case.js`) MISSION_003 (`business-development`), MISSION_004 (`content-marketing`), MISSION_005 (`data-analyst`) và MISSION_006 (`fpa-analyst`); mỗi nhiệm vụ gồm `<tên>.html` và `<tên>-assets/case.js`. Chữ riêng mỗi nghề nằm trong `CASE.ui`. Rubric các nhiệm vụ này ở `lib/review-simple.js`; `api/review.js` chọn bộ chấm theo trường `mission`.
- `dist/ds.css`, `dist/ui.js` — design system dùng chung; `dist/theme-dark.css` — chế độ tối (nút trên header, lưu `vaoviec-theme`).
- `dist/workspace/talent-acquisition.html` và `dist/workspace/talent-acquisition-assets/` — Workspace VaVi: `case.js` (nội dung case), `app.js` (logic), `style.css`, ảnh văn phòng, PDF JD và PDF.js.
- `dist/nova/` — trợ lý VaVi ở góc phải dưới mọi trang: `nova-mascot.js` (robot SVG), `nova-animation.js` (trạng thái hoạt ảnh), `nova-speech-bubble.js`, `nova-chat-window.js`, `nova-assistant.js` (gắn tất cả, gọi `/api/assistant`), `nova.css`.
- `lib/gemini.js` — gọi Gemini với chuỗi model dự phòng. `lib/review-core.js` — rubric chấm bài. `lib/assistant-core.js` — lời nhắc của VaVi (ngữ cảnh nghề và nhiệm vụ do server tự đọc; chế độ Thử sức không đưa đáp án).
- `api/review.js`, `api/assistant.js` là hàm Vercel; `scripts/dev-server.mjs` là máy chủ local.

## MISSION_001 · Talent Acquisition Intern

Luồng (cập nhật 14/11 theo feedback 13/11):

1. Giới thiệu vai trò, công ty, chọn chế độ Làm quen hoặc Thử sức, bấm **Bắt đầu nhiệm vụ**.
2. Đọc mail chị Mai và JD, đăng tin trên một kênh. Có thể **Đăng thêm kênh** ngay, không cần chờ tin nhắn của chị Mai.
3. Inbox nhận 9 thư theo thứ tự ngẫu nhiên: 5 thư kèm CV (bấm **Thêm vào ATS**) và 4 thư hỏi thông tin (bấm **Trả lời** để xem câu trả lời soạn sẵn, không bắt buộc).
4. ATS mini 3 cột: danh sách ứng viên, CV, quyết định (Đề xuất phỏng vấn / Cần xác minh / Dừng) kèm lý do bắt buộc. Tối đa 3 người được đề xuất.
5. Bàn giao: danh sách đề xuất lấy từ ATS, trả lời câu hỏi của chị Mai (ưu tiên ai, căn cứ, phương án dự phòng), gửi đề xuất.
6. AI chấm 4 tiêu chí và mức độ đầu tư. Gợi ý ghi vào CV trong Hồ sơ trải nghiệm chỉ mở khi bài đạt từ 2/4 tiêu chí và không bị đánh giá "Làm cho có".

Nội dung CV, thư và câu trả lời mẫu nằm trong `case.js`. Rubric và ghi chú đáp án nằm trong `lib/review-core.js` (bản nháp, chờ Bôn và Hà Anh duyệt). Tiến độ lưu trên trình duyệt theo tên miền, nên bản local và bản Vercel có tiến độ riêng.

## MISSION_002 · Employer Branding Executive

Tin tuyển CSKH của NOVA Commerce đăng 3 tuần chỉ có 11 hồ sơ. Người học:

1. Đọc brief của anh Quân và 6 tài liệu nghiên cứu (khảo sát nhân viên, câu nói nhân viên, lý do ứng viên bỏ đi, chính sách HR, tin của nơi khác, số liệu kênh).
2. Chọn đúng 3 trụ cột EVP và ghi bằng chứng. Có 3 lựa chọn bẫy: "không áp lực", "làm từ xa", "lương cao nhất thị trường".
3. Viết bài đăng cho một kênh, có bản xem trước. Bẫy: trích dẫn của Mai Anh chưa được đồng ý.
4. Chọn 1–3 kênh và đúng 2 chỉ số đo, rồi trả lời câu hỏi của anh Quân.
5. AI chấm 4 tiêu chí (rubric M02-A, bản nháp chờ duyệt) và mức độ đầu tư; có nhận xét nhanh dựng sẵn khi AI lỗi.

Trợ lý linh vật tên VaVi (mã nguồn vẫn ở `dist/nova/`).

## MISSION_003 · Business Development Executive (B2B)

NOVA Commerce mở mảng quà Tết doanh nghiệp, mục tiêu ký 2 đơn trước 20/12. Người học đọc 6 tài liệu (8 lead, ghi chú CRM, bảng giá, case study, khảo sát HR, email mẫu cũ), chọn 3 lead ưu tiên kèm lý do, viết email tiếp cận (xem trước như hộp thư), chọn bước theo dõi và 2 chỉ số, trả lời chị Lan. Bẫy: lead đã từ chối hẹn tháng 3, lead 12 người, đối thủ, email chung, hứa giao 48h hoặc in logo dưới 300 hộp, case study chưa được phép, gửi đồng loạt mỗi ngày, chỉ đo số email gửi/lượt mở. Rubric M03-A (bản nháp).

## MISSION_004 · Content Marketing Executive

Ra mắt nồi chiên AirFry 5L, mục tiêu 300 nồi trong tháng 12 chỉ bằng nội dung. Người học đọc từ khoá, câu hỏi khách, thông số đã duyệt, hiệu quả bài cũ, kênh, đánh giá khách và bài đối thủ bị phản ứng; chọn 3 chủ đề, viết bài đầu tiên, chọn kênh và 2 chỉ số, trả lời chị Hằng. Bẫy: "giảm 90% dầu mỡ", trend iPhone 17, chê đối thủ, minigame, đăng vào nhóm cấm bán hàng, đánh giá chưa được đồng ý, chỉ đo tiếp cận/lượt thích. Rubric M04-A (bản nháp).

## MISSION_005 · Data Analyst

Doanh thu tuần 45 giảm 18%. Người học đọc doanh thu 4 tuần, theo kênh, nhật ký hệ thống, phễu app Android; chọn 3 phát hiện có bằng chứng, viết email báo cáo, chọn bước tiếp theo và 2 chỉ số, trả lời anh Hùng. Đáp án: tuần 44 bị thổi phồng (sale + 180 đơn trùng), lỗi thanh toán Android sau bản 3.2, "thêm vào giỏ" giảm do lỗi ghi dữ liệu. Bẫy: thời tiết, đối thủ, giá trị đơn, giảm giá 20%, gửi toàn công ty, đính kèm file có dữ liệu cá nhân. Rubric M05-A (bản nháp).

## MISSION_006 · FP&A Analyst

Tháng 10 lỗ 20 triệu thay vì lãi 350 triệu. Người học đọc báo cáo chênh lệch, ghi chú các phòng, chi phí vận chuyển theo tháng, kế hoạch quý IV và báo giá mới; chọn 3 khoản chênh lệch, viết bản ghi nhớ, chọn hành động và 2 chỉ số, trả lời chị Vân kèm ước tính tác động. Bẫy: giá vốn "nhờ nhà cung cấp", lạm phát, khoản 5 triệu, coi lương thấp là tiết kiệm, cắt 50% marketing trước 11/11, đính kèm bảng lương. Rubric M06-A (bản nháp).
