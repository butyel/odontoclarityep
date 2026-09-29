'use strict';

// ---------------------------------------------------------------------------
// BUILD DO SITE - Gera public/ a partir de src/ (estático, indexável, sem JS
// no client). Uso: npm run build
// ---------------------------------------------------------------------------

const fs = require('fs');
const path = require('path');

const { site } = require('../src/lib/site.cjs');
const { services } = require('../src/lib/services.cjs');
const { professionals } = require('../src/lib/professionals.cjs');
const { loadPosts } = require('../src/lib/posts.cjs');
const { buildCss } = require('./lib/css.js');
const pages = require('./lib/pages.js');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'public');

function cleanOut() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
}

function writePage(relPath, html) {
  const file = path.join(OUT, relPath, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html, 'utf8');
}

function copyAssets() {
  const src = path.join(SRC, 'assets');
  const dest = path.join(OUT, 'assets');
  fs.cpSync(src, dest, { recursive: true, filter: (p) => !p.endsWith('_additions.css') });
}

function buildRobots() {
  const content = `User-agent: *
Allow: /

Sitemap: ${site.url('/sitemap.xml')}
`;
  fs.writeFileSync(path.join(OUT, 'robots.txt'), content, 'utf8');
}

function buildSitemap() {
  const posts = loadPosts().filter((p) => !p.draft);
  const today = new Date().toISOString().slice(0, 10);

  const urls = [
    { loc: '/', lastmod: today },
    { loc: '/sobre/', lastmod: today },
    { loc: '/servicos/', lastmod: today },
    ...services.map((s) => ({ loc: `/${s.slug}/`, lastmod: today })),
    { loc: '/profissionais/', lastmod: today },
    ...professionals.map((p) => ({ loc: `/profissionais/${p.slug}/`, lastmod: today })),
    { loc: '/blog/', lastmod: today },
    ...posts.map((p) => ({ loc: `/blog/${p.slug}/`, lastmod: p.updatedAt || p.publishedAt })),
    { loc: '/contato/', lastmod: today },
    { loc: '/politica-de-privacidade/', lastmod: today }
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${site.url(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(OUT, 'sitemap.xml'), xml, 'utf8');
  return urls.length;
}

function build() {
  console.log('→ CSS');
  buildCss();

  console.log('→ Limpando public/');
  cleanOut();

  const postPages = loadPosts();

  console.log('→ Gerando páginas');
  writePage('', pages.homePage());
  writePage('sobre', pages.sobrePage());
  writePage('contato', pages.contatoPage());
  writePage('servicos', pages.servicosPage());
  services.forEach((svc) => writePage(svc.slug, pages.servicoPage(svc)));
  writePage('profissionais', pages.profissionaisPage());
  professionals.forEach((prof) => writePage(path.join('profissionais', prof.slug), pages.profissionalPage(prof)));
  writePage('blog', pages.blogPage());
  postPages.forEach((post) => writePage(path.join('blog', post.slug), pages.artigoPage(post)));
  writePage('politica-de-privacidade', pages.privacidadePage());
  // Página 404 (usada automaticamente pela Vercel em URLs inexistentes)
  fs.writeFileSync(path.join(OUT, '404.html'), pages.notFoundPage(), 'utf8');

  console.log('→ Copiando assets');
  copyAssets();

  console.log('→ robots.txt e sitemap.xml');
  buildRobots();
  const count = buildSitemap();

  const htmlCount = (function walk(dir) {
    let n = 0;
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, f.name);
      if (f.isDirectory()) n += walk(full);
      else if (f.name === 'index.html') n += 1;
      else if (f.name.endsWith('.html')) n += 1;
    }
    return n;
  })(OUT);

  console.log(`\n✅ Build concluído.`);
  console.log(`   → public/ gerado em ${path.relative(ROOT, OUT)}`);
  console.log(`   → ${htmlCount} páginas HTML`);
  console.log(`   → ${count} URLs no sitemap.xml`);
  console.log(`   → Canonical: ${site.domain}`);
}

build();