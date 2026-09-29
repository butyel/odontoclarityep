'use strict';

// ---------------------------------------------------------------------------
// Carregador de artigos do Blog (src/posts/*.md)
// Frontmatter simplificado (linhas "chave: valor"; listas/objetos em JSON).
// ---------------------------------------------------------------------------

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'posts');

// --- Frontmatter ------------------------------------------------------------

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: raw };
  const data = {};
  const lines = match[1].split(/\r?\n/);
  let jsonKey = null;
  let jsonLines = [];

  const tryParseJson = (block) => {
    try {
      return JSON.parse(block);
    } catch {
      return null;
    }
  };

  const commitJson = (key, block) => {
    const parsed = tryParseJson(block);
    if (parsed !== null) data[key] = parsed;
  };

  lines.forEach((line) => {
    if (jsonKey) {
      jsonLines.push(line);
      if (jsonLines.join('').split('[').length - 1 === jsonLines.join('').split(']').length - 1 && /\]\s*$/.test(line)) {
        commitJson(jsonKey, jsonLines.join('\n'));
        jsonKey = null;
        jsonLines = [];
      }
      return;
    }
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value === 'null') {
      data[key] = null;
    } else if (value === 'true') {
      data[key] = true;
    } else if (value === 'false') {
      data[key] = false;
    } else if (/^[\[{]/.test(value)) {
      const parsed = tryParseJson(value);
      if (parsed !== null) {
        data[key] = parsed;
      } else {
        jsonKey = key;
        jsonLines = [value];
      }
    } else {
      data[key] = value.replace(/^"(.*)"$/, '$1');
    }
  });
  if (jsonKey) commitJson(jsonKey, jsonLines.join('\n'));
  return { data, body: raw.slice(match[0].length) };
}

// --- Markdown (subconjunto suficiente) --------------------------------------

function inline(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function mdToHtml(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let listType = null;
  let listOpen = false;
  let para = [];

  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${inline(para.join(' '))}</p>`);
      para = [];
    }
  };
  const closeList = () => {
    if (listOpen) {
      out.push(`</${listType}>`);
      listType = null;
      listOpen = false;
    }
  };

  lines.forEach((line) => {
    const t = line.trim();
    if (!t) {
      flushPara();
      closeList();
      return;
    }
    if (t.startsWith('### ')) {
      flushPara();
      closeList();
      out.push(`<h3>${inline(t.slice(4))}</h3>`);
    } else if (t.startsWith('## ')) {
      flushPara();
      closeList();
      out.push(`<h2>${inline(t.slice(3))}</h2>`);
    } else if (t.startsWith('> ')) {
      flushPara();
      closeList();
      out.push(`<blockquote><p>${inline(t.slice(2))}</p></blockquote>`);
    } else if (/^[-*] /.test(t)) {
      flushPara();
      if (listType !== 'ul') {
        closeList();
        out.push('<ul>');
        listType = 'ul';
        listOpen = true;
      }
      out.push(`<li>${inline(t.replace(/^[-*] /, ''))}</li>`);
    } else if (/^\d+\.\s/.test(t)) {
      flushPara();
      if (listType !== 'ol') {
        closeList();
        out.push('<ol>');
        listType = 'ol';
        listOpen = true;
      }
      out.push(`<li>${inline(t.replace(/^\d+\.\s/, ''))}</li>`);
    } else {
      closeList();
      para.push(t);
    }
  });
  flushPara();
  closeList();
  return out.join('\n');
}

function stripMd(md) {
  return md
    .replace(/^---[\s\S]*?---\r?\n?/, '')
    .replace(/[*#>]/g, '')
    .replace(/!?\[([^\]]*)\]\(([^)]*)\)/g, '$1')
    .replace(/\n+/g, ' ');
}

const readingTime = (md) => {
  const words = stripMd(md).trim().split(/\s+/).length;
  return Math.max(2, Math.round(words / 200));
};

// --- Loader -----------------------------------------------------------------

function loadPosts() {
  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
      const { data, body } = parseFrontmatter(raw);
      return {
        title: data.title,
        slug: data.slug,
        description: data.description,
        category: data.category,
        author: data.author,
        reviewedBy: data.reviewedBy,
        publishedAt: data.publishedAt,
        updatedAt: data.updatedAt,
        featuredImage: data.featuredImage,
        imageAlt: data.imageAlt,
        relatedServices: Array.isArray(data.relatedServices) ? data.relatedServices : [],
        relatedProfessionals: Array.isArray(data.relatedProfessionals)
          ? data.relatedProfessionals
          : [],
        draft: data.draft === true,
        canonical: data.canonical === true,
        faq: Array.isArray(data.faq) ? data.faq : [],
        html: mdToHtml(body),
        readingTime: readingTime(body)
      };
    });

  return posts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

const findBySlug = (posts, slug) => posts.find((p) => p.slug === slug);

const formatDate = (iso, opts) => {
  const [y, m, d] = String(iso).split('-').map(Number);
  return new Intl.DateTimeFormat('pt-BR', opts || { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(y, (m || 1) - 1, d || 1)
  );
};

module.exports = { loadPosts, findBySlug, formatDate, stripMd };