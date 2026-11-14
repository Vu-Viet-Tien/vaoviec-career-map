const siteHeader = document.querySelector(".site-header");

const headerItems = [
  ["explore", "Khám phá", '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>'],
  ["workspace", "Workspace", '<rect x="5" y="4" width="14" height="11" rx="1"/><path d="m5 15-3 4h20l-3-4"/>'],
  ["profile", "Hồ sơ", '<circle cx="12" cy="7" r="3"/><path d="M5 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2z"/>']
];

function renderSiteHeader({ active, exploreUrl, workspaceUrl, inCase = false }) {
  siteHeader.innerHTML = `
    <a class="site-header-logo" href="/" aria-label="VAOVIEC. – Trang chủ">
      <span class="vaoviec-wordmark"><img src="/vaoviec-logo.png" alt="" width="1200" height="390"></span>
    </a>
    <nav class="site-header-nav" aria-label="Điều hướng chính">
      ${headerItems.map(([key, label, icon]) => {
        const content = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon}</svg><span>${label}</span>`;
        const current = active === key ? ' aria-current="page"' : "";
        if (inCase && key !== "explore") {
          const action = key === "profile" ? "portfolio" : key;
          return `<button type="button" data-do="${action}"${current}>${content}</button>`;
        }

        const url = key === "explore" ? exploreUrl : workspaceUrl + (key === "profile" ? "#profile" : "");
        return `<a href="${url}"${current}>${content}</a>`;
      }).join("")}
    </nav>
    <a class="site-header-cta" href="${exploreUrl}">Khám phá nghề</a>
    <span class="site-header-account">Đăng nhập</span>`;
}
