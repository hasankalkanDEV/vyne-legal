// Uygulamanın çizimlerini (glyph) hazır SVG olarak tools/glyphs.json'a yazar.
// Kaynak: yan klasördeki vyne-website (site/glyphs.json + çizim motoru scripts/build-site.mjs).
// Kullanım:  node tools/export-glyphs.mjs            → content.json'daki bütün ikonlar
//            node tools/export-glyphs.mjs globe mail → bunları da ekler
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const tools = dirname(fileURLToPath(import.meta.url));
const site = join(tools, '..', '..', 'vyne-website');
const G = JSON.parse(readFileSync(join(site, 'site/glyphs.json'), 'utf8'));
const bs = readFileSync(join(site, 'scripts/build-site.mjs'), 'utf8');
const engine = bs.slice(bs.indexOf('const S = {'), bs.indexOf('/* ---------- Şablon'));
const glyph = new Function('G', 'K', engine + '; return glyph;')(G, G.K);

const C = JSON.parse(readFileSync(join(tools, 'content.json'), 'utf8'));
const names = new Set(['mail', ...process.argv.slice(2)]);
for (const p of Object.values(C.pages)) {
  names.add(p.hero); (p.notes || []).forEach((n) => names.add(n));
  p.blocks.filter((b) => b[0] === 'h2').forEach((b) => names.add(b[3]));
}
const outPath = join(tools, 'glyphs.json');
const out = existsSync(outPath) ? JSON.parse(readFileSync(outPath, 'utf8')) : {};
for (const n of [...names].sort()) out[n] = glyph('g', n);
writeFileSync(outPath, JSON.stringify(out, null, 1) + '\n');
console.log(Object.keys(out).length, 'ikon →', outPath);
