// Đếm lượt truy cập bằng Vercel Web Analytics (không cookie, không cần đăng nhập).
// Chỉ tải trên bản deploy; chạy local thì bỏ qua vì /_vercel/insights chỉ có trên Vercel.
// Cần bật một lần trong Vercel → Project → Analytics → Enable.
(() => {
  if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) return;
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  const s = document.createElement("script");
  s.defer = true;
  s.src = "/_vercel/insights/script.js";
  document.head.append(s);
})();
