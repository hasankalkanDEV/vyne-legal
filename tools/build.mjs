// Vyne yasal sayfaları (index.html gizlilik, terms.html şartlar, delete-account.html hesap silme).
// METİNLER tools/content.json'da (EN ve TR yan yana). Değiştirdikten sonra:  node tools/build.mjs
// Sayfaları elle düzenleme: metin hem sayfada hem dil sözlüğünde durur, ikisini bu betik birlikte yazar.
// Bloklar: ["h2", EN, TR, ikon] yeni bölüm · ["p", EN, TR] · ["ul"|"ol", [[EN, TR], ...]] · ["callout_p", EN, TR]
//          ["callout", [[EN, TR], ...]] "Kısaca" notları · ["contact", EN, TR] · ["h1"|"updated", EN, TR].
// İkonlar uygulamanın çizimleri, tools/glyphs.json'da hazır SVG. Yeni ikon: node tools/export-glyphs.mjs ikon1 ikon2 …
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const tools = dirname(fileURLToPath(import.meta.url)), outDir = join(tools, '..');
const C = JSON.parse(readFileSync(join(tools, 'content.json'), 'utf8'));
const GL = JSON.parse(readFileSync(join(tools, 'glyphs.json'), 'utf8'));
const g = (n) => { if (!GL[n]) throw new Error(`ikon yok: ${n} (node tools/export-glyphs.mjs ${n})`); return GL[n]; };
const SPEC = { LINKS: C.links };

const E = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const COLORS = ['#A8E6C8', '#EE96BA', '#96BEE8', '#BEA8EE', '#F0D8A8', '#EEE096', '#F2C4A6', '#C8B8F0', '#96CEEE', '#F0B8C8', '#CDE3A8', '#E8C87A'];
const SITE = 'https://hasankalkandev.github.io/vyne-website/';

const PAGES = C.pages;

const CSS = `
@font-face{font-family:'Nunito';font-style:normal;font-weight:200 1000;font-display:swap;src:url(fonts/nunito-latin-ext.woff2) format('woff2');unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:'Nunito';font-style:normal;font-weight:200 1000;font-display:swap;src:url(fonts/nunito-latin.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:'Caveat';font-style:normal;font-weight:700;font-display:swap;src:url(fonts/caveat-latin-ext-700.woff2) format('woff2');unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:'Caveat';font-style:normal;font-weight:700;font-display:swap;src:url(fonts/caveat-latin-700.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
:root{--bg:#F8F6F0;--card:#FFFFFF;--card-alt:#F2EFE8;--border:#E8E4DC;--ink:#2C2A26;--slate:#6C6860;--green:#6E9468;--green-text:#4A6E45;--green-soft:#E4F4E0;--btn-bg:#4A6E45;--btn-ink:#fff;--pen:#3F5FA8;
  --shadow:0 2px 4px rgba(44,42,38,.04),0 12px 28px rgba(44,42,38,.07);--hand:'Caveat','Segoe Print',cursive;--sans:'Nunito',system-ui,-apple-system,'Segoe UI',sans-serif;color-scheme:light}
@media (prefers-color-scheme:dark){:root{--bg:#1E1C18;--card:#2C2A26;--card-alt:#363430;--border:#3C3A36;--ink:#F0EDE8;--slate:#A19E9A;--green:#A6CB9E;--green-text:#A6CB9E;--green-soft:#2C3A2C;--btn-bg:#A6CB9E;--btn-ink:#16200F;--pen:#9DB4EA;
  --shadow:0 2px 4px rgba(0,0,0,.24),0 12px 28px rgba(0,0,0,.3);color-scheme:dark}}
*{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:76px;-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:16.5px;line-height:1.65;overflow-x:clip}
a{color:var(--green-text)}
svg.g{width:1em;height:1em;flex:none;display:inline-block;vertical-align:-.15em;color:#2C2A26;overflow:visible}
svg.g .gf{opacity:1}
.bar{position:sticky;top:0;z-index:5;background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid var(--border)}
.bar-in{max-width:760px;margin:0 auto;padding:10px 20px;display:flex;align-items:center;gap:12px}
.brand{display:flex;align-items:center;gap:9px;text-decoration:none;color:var(--ink);font-weight:900;font-size:21px;letter-spacing:-.02em}
.brand img{border-radius:8px}
.lang-switch{margin-left:auto;display:flex;gap:3px;background:var(--card);border:1.5px solid var(--border);border-radius:999px;padding:3px}
.lang-switch button{border:0;background:transparent;font:inherit;font-size:13.5px;font-weight:900;padding:6px 13px;border-radius:999px;cursor:pointer;color:var(--slate);min-height:34px}
.lang-switch button.active{background:var(--btn-bg);color:var(--btn-ink)}
.doc{max-width:760px;margin:0 auto;padding:30px 20px 60px}
.hero{display:grid;gap:12px;margin-bottom:26px}
.hero-top{display:flex;align-items:center;gap:14px}
.hero-ic{width:64px;height:64px;border-radius:20px;background:#E4F4E0;display:grid;place-items:center;flex:none;box-shadow:var(--shadow)}
.hero-ic svg.g{font-size:46px}
.kicker{font-size:13.5px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:var(--green-text)}
h1{font-size:clamp(30px,6vw,42px);line-height:1.1;letter-spacing:-.02em;margin:2px 0 0;font-weight:900}
.updated{justify-self:start;font-size:13.5px;font-weight:800;color:var(--slate);background:var(--card);border:1px solid var(--border);border-radius:999px;padding:4px 12px}
.lede{font-size:17.5px;color:var(--ink);margin:4px 0 0}
.hand{font-family:var(--hand);font-weight:700;font-size:32px;line-height:1;margin:34px 0 14px;color:var(--pen)}
.notes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;list-style:none;margin:0;padding:0}
.notes li{position:relative;padding:16px 16px 18px;border-radius:4px;font-weight:800;font-size:16px;line-height:1.35;box-shadow:0 8px 18px rgba(60,45,20,.13);color:#2C2A26;display:grid;gap:8px;align-content:start}
.notes li svg.g{font-size:32px}
.notes li:nth-child(1){background:#FBE7A6;rotate:-1.2deg}.notes li:nth-child(2){background:#D6EBCB;rotate:1deg}.notes li:nth-child(3){background:#D3DDF4;rotate:.8deg}.notes li:nth-child(4){background:#F1D3E6;rotate:-.9deg}
.toc{margin:30px 0 10px;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:4px 14px}
.toc summary{cursor:pointer;list-style:none;display:flex;align-items:center;gap:8px;font-weight:900;font-size:16px;min-height:44px}
.toc summary::-webkit-details-marker{display:none}
.toc summary::after{content:"";margin-left:auto;width:9px;height:9px;border-right:2.5px solid var(--slate);border-bottom:2.5px solid var(--slate);rotate:45deg;translate:0 -3px;transition:rotate .2s}
.toc[open] summary::after{rotate:225deg;translate:0 3px}
.toc summary small{font-size:12.5px;font-weight:900;color:var(--slate);background:var(--card-alt);border-radius:999px;padding:1px 8px}
.toc-in{display:flex;flex-wrap:wrap;gap:8px;padding:4px 0 14px}
.totop{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));width:48px;height:48px;border-radius:50%;display:grid;place-items:center;background:var(--btn-bg);color:var(--btn-ink);text-decoration:none;font-size:22px;font-weight:900;box-shadow:var(--shadow);z-index:6}
.totop[hidden]{display:none}
.toc a{display:inline-flex;align-items:center;gap:7px;text-decoration:none;color:var(--ink);background:var(--card);border:1.5px solid var(--border);border-radius:999px;padding:5px 12px 5px 6px;font-size:14px;font-weight:800;min-height:36px}
.toc a i{width:24px;height:24px;border-radius:8px;background:var(--c);display:grid;place-items:center}
.toc a i svg.g{font-size:18px}
.toc a:hover{border-color:var(--green)}
.sec{background:var(--card);border:1px solid var(--border);border-radius:22px;padding:20px 22px 12px;margin-top:16px;box-shadow:var(--shadow);border-top:5px solid var(--c)}
.sec-h{display:flex;align-items:center;gap:12px;margin-bottom:10px}
.sec-ic{width:46px;height:46px;border-radius:14px;background:var(--c);display:grid;place-items:center;flex:none}
.sec-ic svg.g{font-size:32px}
h2{font-size:21px;line-height:1.25;margin:0;font-weight:900;letter-spacing:-.01em}
p{margin:0 0 12px}
ul,ol{margin:0 0 12px;padding-left:22px}
li{margin-bottom:8px}
li::marker{color:var(--green)}
.callout{background:var(--green-soft);border-radius:14px;padding:14px 16px;margin:0 0 12px;font-weight:700}
.steps{list-style:none;padding:0;counter-reset:s;display:grid;gap:10px}
.steps li{counter-increment:s;display:grid;grid-template-columns:34px 1fr;gap:12px;align-items:center;background:var(--card-alt);border-radius:14px;padding:10px 14px 10px 10px;margin:0;font-weight:700}
.steps li::before{content:counter(s);width:34px;height:34px;border-radius:50%;background:var(--btn-bg);color:var(--btn-ink);display:grid;place-items:center;font-weight:900}
.contact{margin-top:28px;background:var(--card);border:1px solid var(--border);border-radius:22px;padding:22px;display:grid;grid-template-columns:auto 1fr;gap:6px 16px;align-items:center;box-shadow:var(--shadow)}
.contact .ic{grid-row:span 3;width:58px;height:58px;border-radius:18px;background:#F0D8A8;display:grid;place-items:center}
.contact .ic svg.g{font-size:40px}
.contact b{font-size:19px;font-weight:900}
.contact span{color:var(--slate)}
.mail{justify-self:start;display:inline-flex;align-items:center;min-height:44px;padding:8px 18px;border-radius:999px;background:var(--btn-bg);color:var(--btn-ink);text-decoration:none;font-weight:900;font-size:15.5px;word-break:break-all}
.sig{grid-column:1 / -1;justify-self:end;font-family:var(--hand);font-size:30px;font-weight:700;color:var(--green-text);line-height:1;margin-top:4px}
.foot{margin-top:34px;text-align:center;display:grid;gap:10px;color:var(--slate);font-size:14.5px}
.foot .links{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 18px;font-weight:800}
.foot .tag{font-family:var(--hand);font-size:22px;font-weight:700;color:var(--green-text)}
@media (max-width:560px){.notes{gap:12px}.notes li{font-size:15px;padding:14px 13px 15px}.sec{padding:18px 16px 8px}.contact{grid-template-columns:1fr}.contact .ic{grid-row:auto}h2{font-size:19.5px}}
@media (max-width:340px){.notes{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
@media print{.bar,.toc,.totop{display:none}.sec,.contact{box-shadow:none;break-inside:avoid}}
`;

function page(fn) {
  const P = PAGES[fn], en = {}, tr = {};
  let n = 0;
  const key = () => `k${++n}`;
  const T = (k, a, b) => { en[k] = a; tr[k] = b; return k; };
  const blocks = P.blocks;
  const h1 = blocks.find((b) => b[0] === 'h1'), upd = blocks.find((b) => b[0] === 'updated');
  T('title', h1[1], h1[2]);
  T('h1', h1[1].replace(/^Vyne — /, ''), h1[2].replace(/^Vyne — /, ''));
  T('kicker', 'Vyne · ' + P.kicker[0], 'Vyne · ' + P.kicker[1]);
  T('updated', upd[1], upd[2]);
  // Bölümlere ayır: ilk h2'ye kadar olanlar giriş.
  const intro = [], secs = [];
  for (const b of blocks) {
    if (b[0] === 'h1' || b[0] === 'updated' || b[0] === 'contact') continue;
    if (b[0] === 'h2') secs.push({ h: b, body: [] });
    else (secs.length ? secs[secs.length - 1].body : intro).push(b);
  }
  const renderBody = (b) => {
    if (b[0] === 'p') return `<p data-i18n="${T(key(), b[1], b[2])}">${E(b[1])}</p>`;
    if (b[0] === 'callout_p') return `<p class="callout" data-i18n="${T(key(), b[1], b[2])}">${E(b[1])}</p>`;
    if (b[0] === 'ul' || b[0] === 'ol') {
      const cls = b[0] === 'ol' ? ' class="steps"' : '';
      return `<${b[0]}${cls}>` + b[1].map(([a, c]) => `<li data-i18n="${T(key(), a, c)}">${E(a)}</li>`).join('') + `</${b[0]}>`;
    }
    return '';
  };
  let out = '';
  out += `<section class="hero"><div class="hero-top"><span class="hero-ic">${g(P.hero)}</span><div><span class="kicker" data-i18n="kicker">${E(en.kicker)}</span>` +
    `<h1 data-i18n="h1">${E(en.h1)}</h1></div></div><span class="updated" data-i18n="updated">${E(en.updated)}</span>`;
  for (const b of intro) if (b[0] === 'p') out += `<p class="lede" data-i18n="${T(key(), b[1], b[2])}">${E(b[1])}</p>`;
  out += '</section>';
  const callout = intro.find((b) => b[0] === 'callout');
  if (callout) {
    out += `<h2 class="hand" data-i18n="${T('short', 'In short', 'Kısaca')}">In short</h2><ul class="notes">` +
      callout[1].map(([a, c], i) => `<li>${g(P.notes[i])}<span data-i18n="${T(key(), a, c)}">${E(a)}</span></li>`).join('') + '</ul>';
  }
  const ids = secs.map((s, i) => 's' + (i + 1));
  if (secs.length > 4) {
    T('toc', 'Contents', 'İçindekiler');
    out += `<details class="toc" id="toc"><summary><span data-i18n="toc">Contents</span> <small>${secs.length}</small></summary><nav class="toc-in">` + secs.map((s, i) => {
      const k = `t${i + 1}`; T(k, s.h[1], s.h[2]);
      return `<a href="#${ids[i]}" style="--c:${COLORS[i % COLORS.length]}"><i>${g(s.h[3])}</i><span data-i18n="${k}">${E(s.h[1])}</span></a>`;
    }).join('') + '</nav></details>';
  }
  secs.forEach((s, i) => {
    const k = `t${i + 1}`; T(k, s.h[1], s.h[2]);
    out += `<section class="sec" id="${ids[i]}" style="--c:${COLORS[i % COLORS.length]}"><div class="sec-h"><span class="sec-ic">${g(s.h[3])}</span><h2 data-i18n="${k}">${E(s.h[1])}</h2></div>` +
      s.body.map(renderBody).join('') + '</section>';
  });
  const c = blocks.find((b) => b[0] === 'contact');
  T('contact_label', 'Write to me', 'Bana yaz');
  T('contact_body', c[1], c[2]);
  out += `<div class="contact"><span class="ic">${g('mail')}</span><b data-i18n="contact_label">Write to me</b><span data-i18n="contact_body">${E(c[1])}</span>` +
    `<a class="mail" href="mailto:vyneapp.help@gmail.com">vyneapp.help@gmail.com</a><span class="sig">— Hasan</span></div>`;
  const links = P.links.map((o) => { const k = 'link_' + o.split('.')[0].replace('-', '_'); T(k, ...SPEC.LINKS[o]); return `<a href="${o}" data-i18n="${k}">${E(SPEC.LINKS[o][0])}</a>`; });
  T('link_site', 'Vyne website', 'Vyne sitesi');
  links.push(`<a href="${SITE}" data-i18n="link_site">Vyne website</a>`);
  T('foot', 'your life, one branching map', 'hayatın, dallanan tek bir harita');
  out += `<footer class="foot"><div class="links">${links.join('')}</div><span class="tag">vyne · <span data-i18n="foot">${E(en.foot)}</span></span></footer>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${E(en.title)}</title>
<meta name="description" content="${E(blocks.find((b) => b[0] === 'p')[1])}">
<link rel="icon" href="app-icon.png" type="image/png">
<meta name="theme-color" content="#F8F6F0" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1E1C18" media="(prefers-color-scheme: dark)">
<link rel="preload" href="fonts/nunito-latin.woff2" as="font" type="font/woff2" crossorigin>
<style>${CSS}</style>
</head>
<body>
<header class="bar"><div class="bar-in"><a class="brand" href="${SITE}"><img src="app-icon.png" alt="" width="30" height="30">vyne</a>
<div class="lang-switch" role="group" aria-label="Language"><button type="button" data-lang="en">EN</button><button type="button" data-lang="tr">TR</button></div></div></header>
<main class="doc">
${out}
</main>
<a class="totop" id="totop" href="#" data-i18n-aria="${T('totop', 'Back to top', 'Başa dön')}" aria-label="Back to top" hidden>↑</a>
<script>
(function () {
  var translations = ${JSON.stringify({ en, tr }, null, 1)};
  var LANG_KEY = "vyne-site-lang";
  function applyLang(lang) {
    var dict = translations[lang] || translations.en;
    document.documentElement.lang = lang;
    document.title = dict.title;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });
    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      var on = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("active", on); btn.setAttribute("aria-pressed", String(on));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (dict[key] != null) el.setAttribute("aria-label", dict[key]);
    });
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }
  document.querySelectorAll(".lang-switch button").forEach(function (btn) {
    btn.addEventListener("click", function () { applyLang(btn.getAttribute("data-lang")); });
  });
  var saved;
  try { saved = localStorage.getItem(LANG_KEY); } catch (e) {}
  var q = (location.search.match(/[?&]lang=(en|tr)/) || [])[1];
  var initial = q || saved || (navigator.language && navigator.language.toLowerCase().indexOf("tr") === 0 ? "tr" : "en");
  applyLang(initial);
  var toc = document.getElementById("toc");
  if (toc && window.matchMedia("(min-width: 700px)").matches) toc.open = true;
  var top = document.getElementById("totop");
  function onScroll() { top.hidden = window.scrollY < 700; }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  top.addEventListener("click", function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });
})();
</script>
</body>
</html>
`;
  writeFileSync(join(outDir, fn), html);
  console.log(fn, Object.keys(en).length, 'keys');
}
Object.keys(PAGES).forEach(page);
