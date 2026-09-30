'use strict';

// ---------------------------------------------------------------------------
// Geração de <head> para todas as páginas internas.
// ---------------------------------------------------------------------------

function escapeAttr(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function head(opts = {}) {
  const title = escapeAttr(opts.title || 'Odonto Clarity');
  const desc = escapeAttr(opts.description || opts.site?.description || '');
  // canonical: null omite a tag (páginas noindex, como a 404).
  const canonical = opts.canonical === null ? null : opts.canonical || opts.site?.url('/');
  const ogType = opts.ogType || 'website';
  const ogImage = opts.ogImage || opts.site?.socialImage || '';
  const robots = opts.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const lang = opts.lang || 'pt-BR';
  const jsonLd = Array.isArray(opts.jsonLd) ? opts.jsonLd : (opts.jsonLd ? [opts.jsonLd] : []);
  const extra = opts.extraHead || '';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <meta name="robots" content="${robots}">
  <meta name="theme-color" content="#8f1111">
  <meta name="format-detection" content="telephone=yes">

  <meta property="og:locale" content="pt_BR">
  <meta property="og:type" content="${ogType}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  ${ogImage ? `<meta property="og:image" content="${escapeAttr(ogImage)}">` : ''}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">

  ${canonical === null ? '' : `<link rel="canonical" href="${escapeAttr(canonical)}">`}
  <link rel="icon" href="/assets/images/logo/Odonto Clarity Logo Topbar.png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://images.unsplash.com">
  <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="/assets/css/site.css">
  ${jsonLd.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n  ')}
  ${extra}
</head>`;
}

module.exports = { head, escapeAttr };