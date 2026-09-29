'use strict';

// ---------------------------------------------------------------------------
// Monta src/assets/css/site.css a partir do CSS original (reference/) + adições.
// Garante encoding UTF-8 correto e preserva a identidade visual do site atual.
// ---------------------------------------------------------------------------

const fs = require('fs');
const path = require('path');

const ORIGINAL = path.join(__dirname, '..', '..', 'reference', 'original-index.html');
const ADDITIONS = path.join(__dirname, '..', '..', 'src', 'assets', 'css', '_additions.css');
const OUT = path.join(__dirname, '..', '..', 'src', 'assets', 'css', 'site.css');

function extractBaseStyle(file) {
  const content = fs.readFileSync(file, 'utf8');
  const m = content.match(/<style>([\s\S]*?)<\/style>/);
  if (!m) throw new Error('Não foi possível extrair o <style> do index.html original.');
  return m[1].trim();
}

// Ajustes cirúrgicos no CSS original para suportar navegação aninhada (dropdown)
// e cards de serviço com link no título, sem alterar o visual.
function applyBaseScoping(css) {
  return css
    // ordem: primeiro os seletores mais específicos
    .replace(/\.nav-links a:not\(\.nav-cta\)::after \{/g, '.nav-links > li > a:not(.nav-cta)::after {')
    .replace(/\.nav-links a:hover::after \{/g, '.nav-links > li > a:hover::after {')
    .replace(/\.nav-links a::after \{/g, '.nav-links > li > a::after {')
    .replace(/\.nav-links a:hover \{/g, '.nav-links > li > a:hover {')
    .replace(/\.nav-links a \{/g, '.nav-links > li > a {')
    .replace(/\.specialty-body a:hover i \{/g, '.specialty-body > a:hover i {')
    .replace(/\.specialty-body a i \{/g, '.specialty-body > a i {')
    .replace(/\.specialty-body a \{/g, '.specialty-body > a {');
}

function buildCss() {
  const base = applyBaseScoping(extractBaseStyle(ORIGINAL));
  const additions = fs.readFileSync(ADDITIONS, 'utf8').trim();
  const merged = `${base}\n\n/* ============================================================
   Componentes adicionais do site multipágina (mantém a identidade visual)
   ============================================================ */\n\n${additions}\n`;
  fs.writeFileSync(OUT, merged, 'utf8');
  return OUT;
}

module.exports = { buildCss };