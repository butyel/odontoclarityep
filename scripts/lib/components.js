'use strict';

// ---------------------------------------------------------------------------
// Componentes visuais reutilizáveis, no padrão visual existente do site.
// ---------------------------------------------------------------------------

const { site } = require('../../src/lib/site.cjs');
const { photoOf, roleLabel, findBySlug } = require('../../src/lib/professionals.cjs');
const { findBySlug: findService } = require('../../src/lib/services.cjs');
const { formatDate } = require('../../src/lib/posts.cjs');

// ---------- Card de profissional --------------------------------------------

const professionalCard = (prof) => `
  <article class="team-card reveal">
    <div class="team-avatar"${prof.foto ? '' : ' aria-hidden="true"'}>${photoOf(prof, { width: 160, height: 160 })}</div>
    <div class="team-card__body">
      <h3 class="team-card__name">${prof.nome}</h3>
      <p class="team-role">${roleLabel(prof)}</p>
    </div>
    <p class="team-card__cta"><a class="btn btn-ghost" href="/profissionais/${prof.slug}/">Conhecer profissional</a></p>
  </article>`;

// ---------- Card de artigo ---------------------------------------------------

const articleCard = (post) => `
  <article class="article-card reveal">
    <div class="article-media">
      <img src="${post.featuredImage}" alt="${post.imageAlt}" loading="lazy" decoding="async">
    </div>
    <div class="article-body">
      <span class="article-cat">${post.category}</span>
      <h3><a href="/blog/${post.slug}/">${post.title}</a></h3>
      <p>${post.description}</p>
      <div class="article-meta">
        <time datetime="${post.publishedAt}">${formatDate(post.publishedAt)}</time>
        ${post.reviewedBy ? `<span>· por <a href="/profissionais/${post.reviewedBy}/">${findBySlug(post.reviewedBy)?.nome || ''}</a></span>` : ''}
      </div>
      <a class="btn btn-ghost" href="/blog/${post.slug}/">Ler artigo <i class="fa-solid fa-arrow-right"></i></a>
    </div>
  </article>`;

// ---------- Card de serviço ---------------------------------------------------

const serviceCard = (svc) => `
  <article class="specialty-card reveal">
    <a class="specialty-media" href="/${svc.slug}/" aria-label="${svc.nome}" tabindex="-1">
      <img src="${svc.imagem}" alt="${svc.imagemAlt}" loading="lazy" decoding="async">
      <span class="specialty-tag">${svc.nome}</span>
    </a>
    <div class="specialty-body">
      <h3><a href="/${svc.slug}/">${svc.titulo}</a></h3>
      <p>${svc.resumo}</p>
      <a href="/${svc.slug}/">Conhecer o tratamento <i class="fa-solid fa-arrow-right"></i></a>
    </div>
  </article>`;

// ---------- FAQ (reutiliza o estilo details existente) ------------------------

const faqSection = (faq, title) => `
  <section class="faq">
    <div class="container">
      <div class="section-head center reveal">
        <span class="kicker">Dúvidas frequentes</span>
        <h2>${title || 'Informações importantes antes de agendar'}</h2>
        <p>Respostas diretas para as dúvidas mais comuns.</p>
      </div>
      <div class="faq-wrap">
        ${faq.map((item) => `<details class="reveal"><summary>${item.q}</summary><p>${item.a}</p></details>`).join('\n')}
      </div>
    </div>
  </section>`;

// ---------- Bloco "Sobre o profissional" (usado em artigos) -------------------

const aboutProfessionalBlock = (prof) => `
  <section class="about-prof">
    <div class="container about-prof-grid">
      <div class="about-prof-avatar"${prof.foto ? '' : ' aria-hidden="true"'}>${photoOf(prof, { width: 100, height: 100 })}</div>
      <div>
        <span class="kicker">Sobre o profissional</span>
        <h2>${prof.nome}</h2>
        <p>Área de atuação: <strong>${prof.area}</strong></p>
        <a class="btn btn-ghost" href="/profissionais/${prof.slug}/">Conhecer profissional <i class="fa-solid fa-arrow-right"></i></a>
      </div>
    </div>
  </section>`;

module.exports = { professionalCard, articleCard, serviceCard, faqSection, aboutProfessionalBlock };