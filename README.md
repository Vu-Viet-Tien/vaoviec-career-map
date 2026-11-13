# VAOVIEC

Bản bàn giao khớp với [site đã xuất bản](https://vaoviec-career-map.uniquedeer1.chatgpt.site/).
Commit: 73bbdf50629a7da6351bd3760d413656144daa36

## Chạy local

Giải nén, mở terminal tại thư mục vaoviec-career-map và chạy:

```sh
python -m http.server 8000 --bind 127.0.0.1 --directory dist
```

Mở http://127.0.0.1:8000/ để xem Trang chủ và http://127.0.0.1:8000/#/career-map để xem Career Map.
Máy chủ Python mặc định yêu cầu đuôi .html. Để dùng nguyên nút “Trải nghiệm thử” và route như trên Sites, chạy đoạn sau trong thư mục dự án bằng Python 3:

```python
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit, urlunsplit

class LocalHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        url = urlsplit(path)
        if url.path == "/workspace/talent-acquisition":
            path = urlunsplit(url._replace(path=url.path + ".html"))
        return super().translate_path(path)

ThreadingHTTPServer(("127.0.0.1", 8000), partial(LocalHandler, directory="dist")).serve_forever()
```

Lưu đoạn trên thành serve_local.py và chạy python serve_local.py thay cho lệnh http.server, rồi mở lại Trang chủ. Dừng máy chủ bằng Ctrl+C. Dự án dùng HTML, CSS và JavaScript tĩnh, không cần build.

## Cấu trúc

- dist/index.html, dist/home.css, dist/styles.css — Trang chủ và Career Map.
- dist/career-data.js, dist/app.js — dữ liệu nghề, điều hướng và cấu hình mô phỏng.
- dist/site-header.js, dist/site-header.css — header chung.
- dist/vaoviec-logo.png, dist/vaoviec-logo.css — logo và CSS logo.
- dist/workspace/talent-acquisition.html — trang Workspace NOVA.
- dist/workspace/talent-acquisition-assets/ — logic và dữ liệu case, CSS, ảnh, PDF JD và PDF.js. Dữ liệu CV nằm trong case.js.
- .openai/hosting.json — cấu hình xuất bản Sites.

## MISSION_001

Mở dist/app.js và tìm missions.MISSION_001. Mục này chứa tên công ty, mô tả và route /workspace/talent-acquisition. Dữ liệu Talent Acquisition Intern trong dist/career-data.js tham chiếu MISSION_001. Nội dung case chỉnh tại dist/workspace/talent-acquisition-assets/case.js. Tiến độ mô phỏng lưu trên trình duyệt theo tên miền, nên bản local có tiến độ riêng.
