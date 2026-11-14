// NovaMascot: hình robot VaVi vẽ bằng SVG, chia thành từng bộ phận (đầu, mắt, miệng, tay, chân)
// để nova-animation.js và nova.css điều khiển riêng từng phần.
// Mọi id trong <defs> có tiền tố riêng, nên có thể vẽ nhiều VaVi trên một trang (linh vật + avatar trong chat).

function defs(p) {
  return `<defs>
    <radialGradient id="${p}-shell" cx="34%" cy="24%" r="80%">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset=".45" stop-color="#eef3f9"/>
      <stop offset=".8" stop-color="#cdd8e6"/>
      <stop offset="1" stop-color="#a9b8cc"/>
    </radialGradient>
    <linearGradient id="${p}-shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset=".55" stop-color="#1c3d7a" stop-opacity="0"/>
      <stop offset="1" stop-color="#1c3d7a" stop-opacity=".22"/>
    </linearGradient>
    <linearGradient id="${p}-blue" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4da3ff"/>
      <stop offset=".5" stop-color="#1f6be8"/>
      <stop offset="1" stop-color="#0b3a9e"/>
    </linearGradient>
    <radialGradient id="${p}-blueball" cx="35%" cy="30%" r="75%">
      <stop offset="0" stop-color="#7cc0ff"/>
      <stop offset=".45" stop-color="#2a76ee"/>
      <stop offset="1" stop-color="#0a3487"/>
    </radialGradient>
    <linearGradient id="${p}-screen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1d2840"/>
      <stop offset=".6" stop-color="#0a101d"/>
      <stop offset="1" stop-color="#03060c"/>
    </linearGradient>
    <linearGradient id="${p}-bezel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#9fb0c6"/>
      <stop offset="1" stop-color="#5e7290"/>
    </linearGradient>
    <linearGradient id="${p}-gloss" x1="0" y1="0" x2=".6" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".34"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="${p}-core" cx="50%" cy="45%" r="55%">
      <stop offset="0" stop-color="#e9ffff"/>
      <stop offset=".45" stop-color="#5ff3ff"/>
      <stop offset="1" stop-color="#0aa6d6"/>
    </radialGradient>
    <filter id="${p}-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="2.4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="${p}-soft" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="3"/>
    </filter>
    <clipPath id="${p}-torso-clip">
      <path d="M66 140C66 127 81 123 100 123S134 127 134 140L132.5 167C131 183 118 190 100 190S69 183 67.5 167Z"/>
    </clipPath>
  </defs>`;
}

// Đầu: anten dạng vây, tai, vỏ, màn hình và các biểu cảm LED (chỉ một bộ mắt/miệng hiện theo data-face).
function head(p) {
  return `<g class="nv-head-look"><g class="nv-head">
    <g class="nv-fin nv-fin-l">
      <path d="M66 46C55 33 49 18 51 5C62 12 74 26 82 39Z" fill="url(#${p}-blue)"/>
      <path d="M57 14C60 24 65 32 71 39" stroke="#7ff6ff" stroke-width="2.6" stroke-linecap="round" fill="none" filter="url(#${p}-glow)" class="nv-light"/>
    </g>
    <g class="nv-fin nv-fin-r">
      <path d="M134 46C145 33 151 18 149 5C138 12 126 26 118 39Z" fill="url(#${p}-blue)"/>
      <path d="M143 14C140 24 135 32 129 39" stroke="#7ff6ff" stroke-width="2.6" stroke-linecap="round" fill="none" filter="url(#${p}-glow)" class="nv-light"/>
    </g>
    <rect x="41" y="30" width="118" height="93" rx="42" fill="url(#${p}-shell)"/>
    <rect x="41" y="30" width="118" height="93" rx="42" fill="url(#${p}-shade)"/>
    <ellipse cx="72" cy="40" rx="20" ry="6" fill="#fff" opacity=".85" filter="url(#${p}-soft)"/>
    <g class="nv-ear">
      <circle cx="42" cy="80" r="15" fill="url(#${p}-blueball)"/>
      <circle cx="39.5" cy="80" r="9.5" fill="#0c2f73"/>
      <circle cx="39.5" cy="80" r="6.5" fill="none" stroke="#6ff4ff" stroke-width="2.4" filter="url(#${p}-glow)" class="nv-light"/>
    </g>
    <g class="nv-ear">
      <circle cx="158" cy="80" r="15" fill="url(#${p}-blueball)"/>
      <circle cx="160.5" cy="80" r="9.5" fill="#0c2f73"/>
      <circle cx="160.5" cy="80" r="6.5" fill="none" stroke="#6ff4ff" stroke-width="2.4" filter="url(#${p}-glow)" class="nv-light"/>
    </g>
    <rect x="53" y="42" width="94" height="73" rx="29" fill="url(#${p}-bezel)"/>
    <rect x="56" y="45" width="88" height="67" rx="26.5" fill="url(#${p}-screen)"/>
    <path d="M70 49H112C96 53 79 64 66 80C61 70 61 56 70 49Z" fill="url(#${p}-gloss)"/>
    <g class="nv-face" filter="url(#${p}-glow)">
      <g class="nv-eyes">
        <g class="nv-eyes-open nv-blinker">
          <ellipse cx="81" cy="76" rx="7.5" ry="10" fill="#62f4ff"/>
          <ellipse cx="119" cy="76" rx="7.5" ry="10" fill="#62f4ff"/>
          <circle cx="83.5" cy="71.5" r="2.3" fill="#eaffff"/>
          <circle cx="121.5" cy="71.5" r="2.3" fill="#eaffff"/>
        </g>
        <g class="nv-eyes-happy" fill="none" stroke="#62f4ff" stroke-width="5" stroke-linecap="round">
          <path d="M73 80Q81 67 89 80"/><path d="M111 80Q119 67 127 80"/>
        </g>
        <g class="nv-eyes-think">
          <ellipse cx="81" cy="77" rx="7" ry="6.5" fill="#62f4ff"/>
          <ellipse cx="119" cy="74" rx="7" ry="9" fill="#62f4ff"/>
          <path d="M72 64Q80 60.5 89 63" fill="none" stroke="#62f4ff" stroke-width="3" stroke-linecap="round"/>
          <path d="M111 57Q119 51 127 55" fill="none" stroke="#62f4ff" stroke-width="3" stroke-linecap="round"/>
        </g>
        <g class="nv-eyes-big nv-blinker">
          <circle cx="81" cy="76" r="10.5" fill="#62f4ff"/>
          <circle cx="119" cy="76" r="10.5" fill="#62f4ff"/>
          <circle cx="84.5" cy="71" r="3.4" fill="#eaffff"/>
          <circle cx="122.5" cy="71" r="3.4" fill="#eaffff"/>
          <circle cx="78" cy="80" r="1.5" fill="#eaffff"/>
          <circle cx="116" cy="80" r="1.5" fill="#eaffff"/>
        </g>
      </g>
      <g class="nv-mouth">
        <path class="nv-mouth-smile" d="M91 96Q100 104 109 96" fill="none" stroke="#62f4ff" stroke-width="3.6" stroke-linecap="round"/>
        <path class="nv-mouth-open" d="M88 94Q100 95 112 94Q110 107 100 107Q90 107 88 94Z" fill="#62f4ff"/>
        <path class="nv-mouth-think" d="M89 99q3.7-4 7.3 0t7.3 0t7.3 0" fill="none" stroke="#62f4ff" stroke-width="3.2" stroke-linecap="round"/>
        <ellipse class="nv-mouth-talk" cx="100" cy="99" rx="7" ry="4.5" fill="#62f4ff"/>
      </g>
    </g>
  </g></g>`;
}

// Một cánh tay: vai, cánh tay trên (trắng), cẳng tay + bàn tay (xanh). side = -1 (trái) hoặc 1 (phải).
function arm(p, side) {
  const x = v => 100 + side * (v - 100);
  const name = side < 0 ? 'l' : 'r';
  return `<g class="nv-arm nv-arm-${name}">
    <path d="M${x(136)} 142L${x(149)} 158" stroke="url(#${p}-shell)" stroke-width="13" stroke-linecap="round"/>
    <g class="nv-forearm">
      <path d="M${x(149)} 158L${x(155)} 172" stroke="url(#${p}-blue)" stroke-width="12" stroke-linecap="round"/>
      <g class="nv-hand">
        <circle cx="${x(157)}" cy="179" r="8.5" fill="url(#${p}-blueball)"/>
        <path d="M${x(151)} 183q${-side * 2} 6 ${side * 3} 7M${x(157)} 186.5v6.5M${x(163)} 183q${side * 2} 6 ${-side * 3} 7" stroke="#0d3a92" stroke-width="4.6" stroke-linecap="round" fill="none"/>
        <circle cx="${x(147.5)}" cy="176" r="3.6" fill="#1d5fd6"/>
      </g>
    </g>
    <circle cx="${x(135)}" cy="140" r="10.5" fill="url(#${p}-blueball)"/>
    <circle cx="${x(135)}" cy="140" r="4" fill="none" stroke="#6ff4ff" stroke-width="1.6" opacity=".8"/>
  </g>`;
}

function leg(p, side) {
  const x = v => 100 + side * (v - 100);
  return `<g class="nv-leg nv-leg-${side < 0 ? 'l' : 'r'}">
    <path d="M${x(112)} 184L${x(114)} 199" stroke="url(#${p}-shell)" stroke-width="15" stroke-linecap="round"/>
    <path d="M${x(103)} 206C${x(103)} 199 ${x(108)} 196 ${x(114)} 196S${x(126)} 199 ${x(126)} 206C${x(126)} 211 ${x(120)} 213 ${x(114)} 213S${x(103)} 211 ${x(103)} 206Z" fill="url(#${p}-blue)"/>
    <path d="M${x(106)} 209Q${x(114)} 213 ${x(123)} 209" stroke="#6ff4ff" stroke-width="1.6" fill="none" opacity=".7"/>
  </g>`;
}

function torso(p) {
  return `<g class="nv-torso">
    <rect x="90" y="116" width="20" height="14" rx="5" fill="#2c3d5c"/>
    <path d="M66 140C66 127 81 123 100 123S134 127 134 140L132.5 167C131 183 118 190 100 190S69 183 67.5 167Z" fill="url(#${p}-shell)"/>
    <g clip-path="url(#${p}-torso-clip)">
      <path d="M60 166Q100 158 140 166V200H60Z" fill="url(#${p}-blue)"/>
      <path d="M60 166Q100 158 140 166" stroke="#7ff6ff" stroke-width="1.6" fill="none" opacity=".75"/>
      <path d="M60 123H140V140Q100 133 60 140Z" fill="#1c3d7a" opacity=".12"/>
    </g>
    <ellipse cx="84" cy="134" rx="10" ry="4" fill="#fff" opacity=".8" filter="url(#${p}-soft)"/>
    <circle cx="100" cy="149" r="12.5" fill="#c7d3e2"/>
    <circle cx="100" cy="149" r="10" fill="#0b2a63"/>
    <circle class="nv-core nv-light" cx="100" cy="149" r="7.6" fill="url(#${p}-core)" filter="url(#${p}-glow)"/>
  </g>`;
}

export function createMascotSVG(prefix = 'nova') {
  return `<svg class="nova-svg" viewBox="0 0 200 222" aria-hidden="true" focusable="false">
    ${defs(prefix)}
    <g class="nv-rig">
      ${leg(prefix, -1)}${leg(prefix, 1)}
      ${torso(prefix)}
      ${arm(prefix, -1)}${arm(prefix, 1)}
      ${head(prefix)}
    </g>
  </svg>`;
}

// Avatar trong khung chat: chỉ phần đầu, cắt khung vuông.
export function createAvatarSVG(prefix = 'nova-avatar') {
  return `<svg class="nova-avatar-svg" viewBox="34 0 132 128" aria-hidden="true" focusable="false">
    ${defs(prefix)}
    <g data-face="happy">${head(prefix)}</g>
  </svg>`;
}
