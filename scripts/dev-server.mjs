// Server chạy local: phục vụ dist/ như Vercel (cleanUrls) và chuyển /api/review, /api/assistant vào handler thật.
// Chạy: npm run dev   (cần biến môi trường GEMINI_API_KEY, có thể đặt trong file .env)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const port = Number(process.env.PORT ?? 8000);
if (fs.existsSync('.env')) process.loadEnvFile('.env');
const api = {
  '/api/review': (await import('../api/review.js')).default,
  '/api/assistant': (await import('../api/assistant.js')).default,
  '/api/track': (await import('../api/track.js')).default,
  '/api/stats': (await import('../api/stats.js')).default,
  '/api/auth': (await import('../api/auth.js')).default
};

const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.pdf': 'application/pdf', '.svg': 'image/svg+xml', '.json': 'application/json' };

function resolveFile(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath)).replace(/^([/\\])+/, '');
  const base = path.join(root, clean);
  if (!base.startsWith(root)) return null;
  for (const candidate of [base, base + '.html', path.join(base, 'index.html')]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const handler = api[url.pathname];
  if (handler) {
    let raw = '';
    for await (const chunk of req) raw += chunk;
    req.body = raw;
    res.status = code => { res.statusCode = code; return res; };
    res.json = data => { res.setHeader('Content-Type', 'application/json; charset=utf-8'); res.end(JSON.stringify(data)); };
    return handler(req, res);
  }
  const file = resolveFile(url.pathname);
  if (!file) { res.writeHead(404); return res.end('Not found'); }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(port, '127.0.0.1', () => console.log(`VAOVIEC dev: http://127.0.0.1:${port}`));
