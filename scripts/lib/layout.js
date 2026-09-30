'use strict';

// ---------------------------------------------------------------------------
// Componentes de layout compartilhados: topbar, header/nav, footer,
// botão flutuante de WhatsApp, CTA band.
// ---------------------------------------------------------------------------

const { site } = require('../../src/lib/site.cjs');
const { escapeAttr } = require('./head.js');

// ---------- topbar ----------------------------------------------------------

const topbar = () => `
  <div class="topbar" aria-label="Informações rápidas">
    <div class="container topbar-inner">
      <div class="topbar-group">
        <a href="tel:+5518996782225"><i class="fa-solid fa-phone"></i>${site.phoneDisplay}</a>
        <span><i class="fa-solid fa-location-dot"></i>Centro, Presidente Epitácio - SP</span>
      </div>
      <div class="topbar-group topbar-group-hours">
        <span><i class="fa-regular fa-clock"></i>${site.hoursShortLabel}</span>
      </div>
      <div class="topbar-group">
        <a href="${site.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram da Odonto Clarity"><i class="fa-brands fa-instagram"></i>Instagram</a>
        <a href="${site.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook da Odonto Clarity"><i class="fa-brands fa-facebook"></i>Facebook</a>
      </div>
    </div>
  </div>`;

// ---------- nav -------------------------------------------------------------

const NAV_ITEMS = [
  { label: 'Início', href: '/#inicio' },
  { label: 'A Clínica', href: '/#sobre' },
  {
    label: 'Tratamentos',
    href: '/servicos/',
    dropdown: [
      { label: 'Implante dentário', href: '/implante-dentario-presidente-epitacio/' },
      { label: 'Tratamento de canal', href: '/tratamento-de-canal-presidente-epitacio/' },
      { label: 'Ortodontia', href: '/ortodontista-presidente-epitacio/' },
      { label: 'Clareamento dental', href: '/clareamento-dental-presidente-epitacio/' },
      { label: 'Prótese dentária', href: '/protese-dentaria-presidente-epitacio/' }
    ]
  },
  { label: 'Profissionais', href: '/profissionais/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contato', href: '/contato/' }
];

const itemActive = (item, active) => {
  if (!active) return false;
  if (active === 'home' && item.href === '/#inicio') return true;
  if (active === 'tratamentos' && item.dropdown) return true;
  const a = String(active).replace(/\/$/, '');
  const h = item.href.replace(/\/$/, '');
  return a === h;
};

const nav = (active) => `
  <nav aria-label="Navegação principal">
    <a href="/" class="brand" aria-label="Odonto Clarity, página inicial">
      <img src="/assets/images/logo/Odonto Clarity Logo Topbar.png" alt="Odonto Clarity Logo" class="brand-img" width="220" height="48">
    </a>

    <ul class="nav-links" id="navLinks">
      ${NAV_ITEMS.map((item) => {
        const isActive = itemActive(item, active);
        if (item.dropdown) {
          return `
        <li class="nav-item has-dropdown">
          <a href="${item.href}" class="nav-parent${isActive ? ' active' : ''}">${item.label} <i class="fa-solid fa-chevron-down nav-chevron" aria-hidden="true"></i></a>
          <ul class="dropdown">
            ${item.dropdown.map((d) => `<li><a href="${d.href}"${active === d.href ? ' aria-current="page"' : ''}>${d.label}</a></li>`).join('\n')}
          </ul>
        </li>`;
        }
        return `
        <li><a href="${item.href}"${isActive ? ' aria-current="page"' : ''}>${item.label}</a></li>`;
      }).join('')}
      <li><a class="nav-cta" href="${site.waDefault}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp"></i>Agendar</a></li>
    </ul>

    <button class="menu-toggle" id="mobileMenu" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="navLinks">
      <i class="fa-solid fa-bars"></i>
    </button>
  </nav>`;

const header = (active) => `
  <header id="header">${nav(active)}</header>`;

// ---------- footer ----------------------------------------------------------

const footer = () => `
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <div class="footer-brand"><img src="/assets/images/logo/Odonto Clarity Logo Rodapé.png" alt="Odonto Clarity Logo" class="footer-brand-img" width="220" height="48"></div>
          <p>Clínica odontológica em Presidente Epitácio com atendimento humanizado, estrutura moderna e diferentes áreas de tratamento.</p>
          <div style="display:flex; gap:10px; margin-top:16px;">
            <a href="${site.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram da Odonto Clarity" style="display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:10px; background:rgba(255,255,255,.07);"><i class="fa-brands fa-instagram"></i></a>
            <a href="${site.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook da Odonto Clarity" style="display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:10px; background:rgba(255,255,255,.07);"><i class="fa-brands fa-facebook"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Odonto Clarity</h4>
          <a href="/#sobre">A Clínica</a>
          <a href="/profissionais/">Profissionais</a>
          <a href="/servicos/">Tratamentos</a>
          <a href="/blog/">Blog</a>
          <a href="/contato/">Contato</a>
          <a href="/politica-de-privacidade/">Política de Privacidade</a>
        </div>
        <div class="footer-col">
          <h4>Tratamentos</h4>
          <a href="/implante-dentario-presidente-epitacio/">Implante dentário</a>
          <a href="/tratamento-de-canal-presidente-epitacio/">Tratamento de canal</a>
          <a href="/ortodontista-presidente-epitacio/">Ortodontia</a>
          <a href="/clareamento-dental-presidente-epitacio/">Clareamento dental</a>
          <a href="/protese-dentaria-presidente-epitacio/">Prótese dentária</a>
        </div>
        <div class="footer-col">
          <h4>Contato</h4>
          <p>${site.address.street.replace('<br>', '')}<br>Presidente Epitácio - SP</p>
          <a href="tel:${site.phoneTel.replace(/^\+/, '')}">${site.phoneDisplay}</a>
          <a href="mailto:${site.email}">${site.email}</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span id="year"></span> Odonto Clarity. Todos os direitos reservados.</span>
        <span>Responsável Técnica Dra. Maria Vitória L. A. Miguel · CRO-SP 152250 · CRO-CL 020.298</span>
      </div>
    </div>
  </footer>`;

// ---------- botão flutuante de WhatsApp -------------------------------------

const whatsappFloat = () => `
  <a class="whatsapp-float" href="${site.waDefault}" target="_blank" rel="noopener noreferrer" aria-label="Falar com a Odonto Clarity pelo WhatsApp">
    <span class="whatsapp-icon"><i class="fa-brands fa-whatsapp"></i></span><span class="label">Agendar consulta</span>
  </a>`;

// ---------- CTA band ---------------------------------------------------------

const ctaBand = (title, text) => `
  <div class="cta-band">
    <div class="cta-box">
      <div><h2>${title || 'Quer agendar uma consulta?'}</h2><p>${text || 'Fale diretamente com a Odonto Clarity pelo WhatsApp e consulte disponibilidade de atendimento.'}</p></div>
      <a class="btn btn-light" href="${site.waDefault}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp"></i>Falar com a clínica</a>
    </div>
  </div>`;

// ---------- breadcrumb -------------------------------------------------------

const breadcrumb = (items) => `
  <nav class="breadcrumb" aria-label="Trilha de navegação">
    <ol>
      ${items
        .map((item, i) => {
          const last = i === items.length - 1;
          const href = item.href.replace(site.domain, '');
          if (last) {
            return `<li aria-current="page">${escapeAttr(item.label)}</li>`;
          }
          return `<li><a href="${href}">${escapeAttr(item.label)}</a></li>`;
        })
        .join('<li class="sep" aria-hidden="true">›</li>')}
    </ol>
  </nav>`;

// ---------- page hero (páginas internas) -------------------------------------

const pageHero = ({ kicker, title, lead, breadcrumbs, image, imageAlt, extra }) => `
  <section class="page-hero${image ? ' page-hero--photo' : ''}" aria-labelledby="ph-title">
    ${
      image
        ? `<img class="page-hero-photo" src="${image}" alt="${imageAlt || ''}" fetchpriority="high" decoding="async">`
        : ''
    }
    <div class="container page-hero-inner">
      ${breadcrumbs ? breadcrumb(breadcrumbs) : ''}
      <div class="eyebrow"><span class="eyebrow-dot"></span>${kicker || 'Odonto Clarity'}</div>
      <h1 id="ph-title">${title}</h1>
      ${lead ? `<p class="page-hero-lead">${lead}</p>` : ''}
      ${extra ? `<div class="page-hero-extra">${extra}</div>` : ''}
    </div>
  </section>`;

module.exports = { topbar, header, footer, whatsappFloat, ctaBand, breadcrumb, pageHero, NAV_ITEMS };