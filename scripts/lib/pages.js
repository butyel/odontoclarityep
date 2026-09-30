'use strict';

// ---------------------------------------------------------------------------
// Construtores de páginas. Cada função retorna o documento HTML completo.
// ---------------------------------------------------------------------------

const fs = require('fs');
const path = require('path');

const { site } = require('../../src/lib/site.cjs');
const {
  professionals,
  professionalMeta,
  findBySlug,
  photoOf,
  roleLabel
} = require('../../src/lib/professionals.cjs');
const { services, findBySlug: findService } = require('../../src/lib/services.cjs');
const { loadPosts, formatDate } = require('../../src/lib/posts.cjs');
const { head } = require('./head.js');
const {
  topbar,
  header,
  footer,
  whatsappFloat,
  ctaBand,
  pageHero
} = require('./layout.js');
const {
  professionalCard,
  articleCard,
  serviceCard,
  faqSection,
  aboutProfessionalBlock
} = require('./components.js');
const {
  organizationSchema,
  breadcrumbSchema,
  personSchema,
  articleSchema,
  faqSchema,
  serviceSchema
} = require('./schema.js');

const VIEWS = path.join(__dirname, '..', '..', 'src', 'views');

const POSTS = loadPosts();
const isPending = (v) => !v || v === '[INFORMAÇÃO A CONFIRMAR]';

function doc(opts) {
  const { main, active, title, description, canonical, ogImage, jsonLd, ogType, robots, extraHead } = opts;
  // canonical: null omite a tag (404). strings relativas viram URL absoluta.
  const canonicalUrl = canonical === null ? null : site.url(canonical || '/');
  // og:image precisa de URL absoluta; caminhos locais ("/assets/...") viram site.url().
  const og = ogImage || site.socialImage;
  const ogUrl = og.startsWith('/') ? site.url(og) : og;
  return (
    head({
      title,
      description,
      canonical: canonicalUrl,
      ogImage: ogUrl,
      ogType: ogType || 'website',
      robots,
      jsonLd,
      extraHead
    }) +
    '\n<body>\n' +
    '  <a class="skip-link" href="#conteudo">Ir para o conteúdo</a>\n' +
    topbar() +
    header(active || '') +
    '\n' +
    main +
    '\n' +
    footer() +
    whatsappFloat() +
    '\n  <script src="/assets/js/site.js" defer></script>\n</body>\n</html>'
  );
}

const readView = (name) => fs.readFileSync(path.join(VIEWS, name), 'utf8');

// ---------------------------------------------------------------------------
// HOME
// ---------------------------------------------------------------------------

function homePage() {
  let main = readView('home.html');
  main = main
    .replace('{{teamCards}}', professionals.map(professionalCard).join('\n'))
    .replace('{{hours}}', site.openingHours.map((o) => o.label).join('<br>'))
    .replace(
      '{{latestPosts}}',
      POSTS.filter((p) => !p.draft)
        .slice(0, 3)
        .map(articleCard)
        .join('\n')
    );
  return doc({
    main,
    active: 'home',
    title: 'Clínica Odontológica em Presidente Epitácio | Odonto Clarity',
    description: site.description,
    canonical: '/',
    jsonLd: [organizationSchema()]
  });
}

// ---------------------------------------------------------------------------
// SOBRE
// ---------------------------------------------------------------------------

function sobrePage() {
  const main = `
  <main id="conteudo">
    ${pageHero({
      kicker: 'A clínica',
      title: 'A Odonto Clarity',
      lead: 'Clínica odontológica em Presidente Epitácio com atendimento humanizado e estrutura moderna.',
      breadcrumbs: [{ href: site.url('/'), label: 'Início' }, { href: site.url('/sobre/'), label: 'A Clínica' }]
    })}

    <section class="about">
      <div class="container about-grid">
        <div class="about-media reveal">
          <img src="/assets/images/Vista externa.webp" alt="Fachada da clínica Odonto Clarity em Presidente Epitácio" loading="lazy" decoding="async">
          <div class="experience"><strong>10+</strong><span>anos de experiência no cuidado odontológico</span></div>
        </div>
        <div class="about-copy reveal">
          <span class="kicker">Sobre a clínica</span>
          <h2>Cuidado odontológico com atenção em cada etapa</h2>
          <p>A Odonto Clarity realiza tratamentos odontológicos completos em Presidente Epitácio, com foco em saúde bucal, atendimento personalizado e uma experiência mais confortável para cada paciente.</p>
          <p>A estrutura reúne equipe qualificada, instalações modernas e tecnologia para apoiar diagnósticos e tratamentos.</p>
          <div class="check-grid">
            <div class="check-item"><i class="fa-solid fa-circle-check"></i><span>Equipe atenciosa e especializada</span></div>
            <div class="check-item"><i class="fa-solid fa-circle-check"></i><span>Tecnologia aplicada à odontologia</span></div>
            <div class="check-item"><i class="fa-solid fa-circle-check"></i><span>Ambiente acolhedor e confortável</span></div>
            <div class="check-item"><i class="fa-solid fa-circle-check"></i><span>Facilidades de pagamento</span></div>
            <div class="check-item"><i class="fa-solid fa-circle-check"></i><span>Higiene e biossegurança rigorosas</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="gallery">
      <div class="container">
        <div class="section-head reveal">
          <span class="kicker">Estrutura</span>
          <h2>Ambientes modernos e acolhedores</h2>
          <p>Conheça um pouco da estrutura da clínica.</p>
        </div>
        <div class="gallery-grid">
          <figure class="gallery-item reveal"><img src="/assets/images/Recepção.webp" alt="Recepção da Odonto Clarity" loading="lazy" decoding="async"><figcaption class="gallery-caption"><strong>Recepção acolhedora</strong><span>Ambiente moderno e confortável</span></figcaption></figure>
          <figure class="gallery-item reveal"><img src="/assets/images/Interior.webp" alt="Ambiente interno e consultórios da Odonto Clarity" loading="lazy" decoding="async"><figcaption class="gallery-caption"><strong>Ambiente interno</strong><span>Estrutura e consultórios equipados</span></figcaption></figure>
          <figure class="gallery-item reveal"><img src="/assets/images/Vista externa.webp" alt="Fachada externa da clínica Odonto Clarity" loading="lazy" decoding="async"><figcaption class="gallery-caption"><strong>Fachada da clínica</strong><span>Fácil acesso no Centro de Presidente Epitácio</span></figcaption></figure>
        </div>
      </div>
    </section>

    <section class="local">
      <div class="container">
        <div class="local-grid">
          <div class="contact-card reveal">
            <h3>Informações da clínica</h3>
            <div class="contact-list">
              <div class="contact-row"><div class="contact-ico"><i class="fa-solid fa-location-dot"></i></div><div><strong>Endereço</strong><span>${site.address.street}<br>${site.address.locality} - ${site.address.region}, ${site.address.postalCode}</span></div></div>
              <div class="contact-row"><div class="contact-ico"><i class="fa-brands fa-whatsapp"></i></div><div><strong>Telefone / WhatsApp</strong><a href="tel:+5518996782225">${site.phoneDisplay}</a></div></div>
              <div class="contact-row"><div class="contact-ico"><i class="fa-regular fa-clock"></i></div><div><strong>Horário</strong><span>${site.openingHours.map((o) => o.label).join('<br>')}</span></div></div>
              <div class="contact-row"><div class="contact-ico"><i class="fa-regular fa-envelope"></i></div><div><strong>E-mail</strong><a href="mailto:${site.email}">${site.email}</a></div></div>
              <div class="contact-row"><div class="contact-ico"><i class="fa-solid fa-user-doctor"></i></div><div><strong>Responsável Técnica</strong><span>${site.responsavelTecnica.nomePublico}<br>${site.responsavelTecnica.cro}</span></div></div>
            </div>
            <div style="margin-top:24px; display:flex; gap:10px; flex-wrap:wrap;">
              <a class="btn btn-red" href="${site.waDefault}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp"></i>Agendar</a>
              <a class="btn btn-ghost" href="${site.mapsUrl}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-route"></i>Como chegar</a>
            </div>
          </div>
          <div class="map-card reveal">
            <iframe title="Mapa da Odonto Clarity em Presidente Epitácio" src="${site.mapsEmbedUrl}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
            <div class="map-actions"><a class="btn btn-red" href="${site.mapsUrl}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-location-arrow"></i>Abrir no Maps</a></div>
          </div>
        </div>
      </div>
    </section>

    ${ctaBand()}
  </main>`;

  return doc({
    main,
    active: '/sobre/',
    title: 'A Clínica | Odonto Clarity',
    description:
      'Conheça a Odonto Clarity, clínica odontológica no Centro de Presidente Epitácio/SP, com estrutura moderna, biossegurança e atendimento humanizado.',
    canonical: '/sobre/',
    jsonLd: [
      organizationSchema(),
      breadcrumbSchema([
        { label: 'Início', href: site.url('/') },
        { label: 'A Clínica', href: site.url('/sobre/') }
      ])
    ]
  });
}

// ---------------------------------------------------------------------------
// CONTATO
// ---------------------------------------------------------------------------

function contatoPage() {
  const main = `
  <main id="conteudo">
    ${pageHero({
      kicker: 'Fale com a clínica',
      title: 'Contato',
      lead: 'Agende uma consulta, tire dúvidas ou solicite atendimento pela Odonto Clarity em Presidente Epitácio.',
      breadcrumbs: [{ href: site.url('/'), label: 'Início' }, { href: site.url('/contato/'), label: 'Contato' }]
    })}

    <section class="local">
      <div class="container">
        <div class="local-grid">
          <div class="contact-card reveal">
            <h3>Informações da clínica</h3>
            <p>Agende sua consulta ou envie sua dúvida para a equipe.</p>
            <div class="contact-list">
              <div class="contact-row"><div class="contact-ico"><i class="fa-solid fa-location-dot"></i></div><div><strong>Endereço</strong><span>${site.address.street}<br>${site.address.locality} - ${site.address.region}, ${site.address.postalCode}</span></div></div>
              <div class="contact-row"><div class="contact-ico"><i class="fa-brands fa-whatsapp"></i></div><div><strong>Telefone / WhatsApp</strong><a href="tel:+5518996782225">${site.phoneDisplay}</a></div></div>
              <div class="contact-row"><div class="contact-ico"><i class="fa-regular fa-clock"></i></div><div><strong>Horário</strong><span>${site.openingHours.map((o) => o.label).join('<br>')}</span></div></div>
              <div class="contact-row"><div class="contact-ico"><i class="fa-regular fa-envelope"></i></div><div><strong>E-mail</strong><a href="mailto:${site.email}">${site.email}</a></div></div>
              <div class="contact-row"><div class="contact-ico"><i class="fa-solid fa-user-doctor"></i></div><div><strong>Responsável Técnica</strong><span>${site.responsavelTecnica.nomePublico}<br>${site.responsavelTecnica.cro}</span></div></div>
            </div>
            <div class="status-badge" id="statusBadge" aria-live="polite"><i class="fa-regular fa-clock"></i><span id="statusText">Verificando horário...</span></div>
            <div style="margin-top:24px; display:flex; gap:10px; flex-wrap:wrap;">
              <a class="btn btn-red" href="${site.waDefault}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp"></i>Agendar pelo WhatsApp</a>
              <a class="btn btn-ghost" href="${site.mapsUrl}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-route"></i>Como chegar</a>
            </div>
          </div>
          <div class="map-card reveal">
            <iframe title="Mapa da Odonto Clarity em Presidente Epitácio" src="${site.mapsEmbedUrl}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
            <div class="map-actions"><a class="btn btn-red" href="${site.mapsUrl}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-location-arrow"></i>Abrir no Maps</a></div>
          </div>
        </div>
      </div>
    </section>

    <section class="inner-section alt">
      <div class="container">
        <div class="section-head center reveal">
          <span class="kicker">Solicitar atendimento</span>
          <h2>Envie sua solicitação pelo WhatsApp</h2>
          <p>Preencha o formulário e o seu contato será aberto no WhatsApp da clínica, pronto para enviar.</p>
        </div>
        <form class="contact-form reveal" id="contactForm" style="max-width:640px; margin:0 auto;" novalidate>
          <h3>Solicitar atendimento</h3>
          <p>Campos com * são obrigatórios.</p>
          <div class="form-grid">
            <div class="form-field">
              <label for="f-nome">Seu nome *</label>
              <input class="form-input" id="f-nome" name="nome" type="text" placeholder="Como podemos te chamar?" required>
            </div>
            <div class="form-field">
              <label for="f-telefone">Telefone *</label>
              <input class="form-input" id="f-telefone" name="telefone" type="tel" placeholder="(18) 90000-0000" required>
            </div>
            <div class="form-field">
              <label for="f-mensagem">Mensagem</label>
              <textarea class="form-input" id="f-mensagem" name="mensagem" placeholder="Conte o que você precisa (ex.: desejo agendar uma avaliação)"></textarea>
            </div>
          </div>
          <div style="margin-top:22px;">
            <button class="btn btn-red" type="submit"><i class="fa-brands fa-whatsapp"></i>Enviar pelo WhatsApp</button>
          </div>
          <p style="margin-top:16px; font-size:.78rem; color:var(--muted);">Ao enviar, uma conversa com a Odonto Clarity será aberta no app do WhatsApp com seus dados preenchidos.</p>
        </form>
      </div>
    </section>

    ${ctaBand()}
  </main>`;

  return doc({
    main,
    active: '/contato/',
    title: 'Contato | Odonto Clarity Presidente Epitácio',
    description:
      'Fale com a Odonto Clarity em Presidente Epitácio: telefone e WhatsApp (18) 99678-2225, endereço, horário de funcionamento e solicitação de atendimento.',
    canonical: '/contato/',
    jsonLd: [
      organizationSchema(),
      breadcrumbSchema([
        { label: 'Início', href: site.url('/') },
        { label: 'Contato', href: site.url('/contato/') }
      ])
    ]
  });
}

// ---------------------------------------------------------------------------
// TRATAMENTOS (listagem)
// ---------------------------------------------------------------------------

function servicosPage() {
  const extras = [
    {
      nome: 'Clínico Geral',
      texto:
        'Área odontológica que realiza o diagnóstico e o tratamento de problemas bucais mais corriqueiros, além de orientar sobre higiene e encaminhar às especialidades quando necessário.',
      img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=500&fit=crop&q=82',
      alt: 'Atendimento de clínico geral'
    },
    {
      nome: 'Estética Orofacial',
      texto:
        'Área voltada a tornar os traços do rosto mais equilibrados sem interferir nas funções da cavidade oral, buscando harmonia facial e rejuvenescimento.',
      img: 'https://images.unsplash.com/photo-1553787499-6f9133860278?w=800&h=500&fit=crop&q=82',
      alt: 'Estética orofacial e harmonização facial'
    }
  ];

  const main = `
  <main id="conteudo">
    ${pageHero({
      kicker: 'Tratamentos',
      title: 'Tratamentos e especialidades',
      lead: 'Conheça as principais áreas de atendimento da Odonto Clarity em Presidente Epitácio e encontre o tratamento que você procura.',
      breadcrumbs: [{ href: site.url('/'), label: 'Início' }, { href: site.url('/servicos/'), label: 'Tratamentos' }]
    })}

    <section class="services">
      <div class="container">
        <div class="section-head center reveal">
          <span class="kicker">Especialidades</span>
          <h2>Tratamentos com página própria</h2>
          <p>Cada tratamento tem uma página com informações sobre indicação, funcionamento e cuidados.</p>
        </div>
        <div class="specialty-grid">
          ${services.map(serviceCard).join('\n')}
        </div>
      </div>
    </section>

    <section class="inner-section">
      <div class="container">
        <div class="section-head center reveal">
          <span class="kicker">Outros atendimentos</span>
          <h2>Outras áreas de atendimento</h2>
          <p>Áreas que integram a rotina da clínica. Tire dúvidas diretamente com a equipe.</p>
        </div>
        <div class="specialty-grid">
          ${extras
            .map(
              (e, i) => `
          <article class="specialty-card reveal">
            <div class="specialty-media">
              <img src="${e.img}" alt="${e.alt}" loading="lazy" decoding="async">
              <span class="specialty-tag">0${i + 6}</span>
            </div>
            <div class="specialty-body">
              <h3>${e.nome}</h3>
              <p>${e.texto}</p>
              <a href="${site.waDefault}" target="_blank" rel="noopener noreferrer">Tirar uma dúvida <i class="fa-solid fa-arrow-right"></i></a>
            </div>
          </article>`
            )
            .join('\n')}
        </div>
      </div>
    </section>

    ${ctaBand()}
  </main>`;

  return doc({
    main,
    active: '/servicos/',
    title: 'Tratamentos | Odonto Clarity Presidente Epitácio',
    description:
      'Conheça os tratamentos da Odonto Clarity em Presidente Epitácio: implante dentário, tratamento de canal, ortodontia, clareamento dental e prótese dentária.',
    canonical: '/servicos/',
    jsonLd: [
      breadcrumbSchema([
        { label: 'Início', href: site.url('/') },
        { label: 'Tratamentos', href: site.url('/servicos/') }
      ])
    ]
  });
}

// ---------------------------------------------------------------------------
// PÁGINA DE SERVIÇO
// ---------------------------------------------------------------------------

function servicoPage(svc) {
  const relProfs = svc.profissionais.map(findBySlug).filter(Boolean);
  const relatedArticles = POSTS.filter(
    (p) => !p.draft && p.relatedServices.includes(svc.slug)
  ).slice(0, 3);
  const related = svc.relacionados.map(findService).filter(Boolean);

  const checkList = (itens) =>
    `<div class="check-grid f-list">${itens.map((i) => `<div class="check-item"><i class="fa-solid fa-circle-check"></i><span>${i}</span></div>`).join('\n')}</div>`;

  const main = `
  <main id="conteudo">
    ${pageHero({
      kicker: svc.kicker,
      title: svc.titulo,
      lead: svc.lead,
      image: svc.imagemHero,
      imageAlt: svc.imagemAlt,
      breadcrumbs: [
        { href: site.url('/'), label: 'Início' },
        { href: site.url('/servicos/'), label: 'Tratamentos' },
        { href: site.url(`/${svc.slug}/`), label: svc.nome }
      ]
    })}

    <section class="inner-section">
      <div class="container">
        <div class="section-head reveal">
          <span class="kicker">${svc.kicker}</span>
          <h2>${svc.oQueE.titulo}</h2>
        </div>
        ${svc.oQueE.paragrafos.map((p) => `<p style="max-width:820px; color:var(--muted); margin-top:16px;">${p}</p>`).join('\n')}
      </div>
    </section>

    <section class="inner-section alt">
      <div class="container">
        <div class="section-head reveal">
          <span class="kicker">Indicação</span>
          <h2>${svc.indicado.titulo}</h2>
          <p>${svc.indicado.texto}</p>
        </div>
        <div class="soft-card-list">
          ${svc.indicado.itens.map((i) => `<div class="check-item"><i class="fa-solid fa-circle-check"></i><span>${i}</span></div>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="inner-section">
      <div class="container">
        <div class="section-head reveal">
          <span class="kicker">Funcionamento</span>
          <h2>${svc.comoFunciona.titulo}</h2>
          <p>${svc.comoFunciona.texto}</p>
        </div>
        <div class="soft-card-list">
          ${svc.comoFunciona.itens.map((i, idx) => `<div class="check-item"><i class="fa-solid fa-circle-check"></i><span><strong>${idx + 1}.</strong> ${i}</span></div>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="inner-section alt">
      <div class="container">
        <div class="section-head center reveal">
          <span class="kicker">Etapas do tratamento</span>
          <h2>Como o tratamento se desenvolve</h2>
          <p>Visão geral das etapas. O detalhamento é feito na avaliação clínica.</p>
        </div>
        <div class="steps-grid">
          ${svc.etapas
            .map((e, i) => `<div class="step-card reveal"><div class="step-num">${String(i + 1).padStart(2, '0')}</div><h3>${e.titulo}</h3><p>${e.texto}</p></div>`)
            .join('\n')}
        </div>
      </div>
    </section>

    <section class="inner-section">
      <div class="container">
        <div class="section-head reveal">
          <span class="kicker">Cuidados</span>
          <h2>${svc.cuidados.titulo}</h2>
          <p>${svc.cuidados.texto}</p>
        </div>
        <div class="soft-card-list">
          ${svc.cuidados.itens.map((i) => `<div class="check-item"><i class="fa-solid fa-circle-check"></i><span>${i}</span></div>`).join('\n')}
        </div>
      </div>
    </section>

    ${
      relProfs.length
        ? `
    <section class="inner-section alt">
      <div class="container">
        <div class="section-head center reveal">
          <span class="kicker">Profissionais</span>
          <h2>Quem atua nesta área</h2>
          <p>${svc.textoProfRelacionado}</p>
        </div>
        <div class="team-grid prof-grid-2">
          ${relProfs.map(professionalCard).join('\n')}
        </div>
      </div>
    </section>`
        : ''
    }

    ${
      relatedArticles.length
        ? `
    <section class="blog-preview">
      <div class="container">
        <div class="section-head center reveal">
          <span class="kicker">Conteúdos relacionados</span>
          <h2>Artigos sobre ${svc.nome.toLowerCase()}</h2>
        </div>
        <div class="article-grid">${relatedArticles.map(articleCard).join('\n')}</div>
      </div>
    </section>`
        : ''
    }

    ${
      related.length
        ? `
    <section class="inner-section">
      <div class="container">
        <div class="section-head center reveal">
          <span class="kicker">Tratamentos relacionados</span>
          <h2>Outros tratamentos que você pode procurar</h2>
        </div>
        <div class="specialty-grid">
          ${related.map(serviceCard).join('\n')}
        </div>
      </div>
    </section>`
        : ''
    }

    ${faqSection(svc.faq)}

    <div class="cta-band">
      <div class="cta-box reveal">
        <div><h2>Fale com a equipe da Odonto Clarity</h2><p>${svc.cta}</p></div>
        <a class="btn btn-light" href="${site.waDefault}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp"></i>${svc.profissionais.length ? 'Agendar avaliação' : 'Falar com a clínica'}</a>
      </div>
    </div>
  </main>`;

  return doc({
    main,
    active: 'tratamentos',
    title: svc.seoTitle,
    description: svc.seoDescription,
    canonical: `/${svc.slug}/`,
    ogImage: svc.imagem,
    jsonLd: [
      breadcrumbSchema([
        { label: 'Início', href: site.url('/') },
        { label: 'Tratamentos', href: site.url('/servicos/') },
        { label: svc.nome, href: site.url(`/${svc.slug}/`) }
      ]),
      serviceSchema(svc)
    ]
  });
}

// ---------------------------------------------------------------------------
// PROFISSIONAIS (listagem)
// ---------------------------------------------------------------------------

function profissionaisPage() {
  const intro =
    'Conheça a equipe da Odonto Clarity em Presidente Epitácio. Cada profissional atua em uma área de atendimento da clínica, com foco no cuidado e na experiência do paciente.';
  const main = `
  <main id="conteudo">
    ${pageHero({
      kicker: 'Nossa equipe',
      title: 'Profissionais da Odonto Clarity',
      lead: intro,
      breadcrumbs: [{ href: site.url('/'), label: 'Início' }, { href: site.url('/profissionais/'), label: 'Profissionais' }]
    })}

    <section class="team">
      <div class="container">
        <div class="section-head center reveal">
          <span class="kicker">Nossa equipe</span>
          <h2>Quem cuida do seu sorriso</h2>
          <p>Selecione um profissional para conhecer a área de atuação dele na clínica.</p>
        </div>
        <div class="team-grid">
          ${professionals.map(professionalCard).join('\n')}
        </div>
      </div>
    </section>

    ${ctaBand()}
  </main>`;

  return doc({
    main,
    active: '/profissionais/',
    title: 'Profissionais | Odonto Clarity Presidente Epitácio',
    description:
      'Conheça os profissionais da Odonto Clarity em Presidente Epitácio e as áreas de atuação de cada um: Ortodontia, Implantodontia e Endodontia.',
    canonical: '/profissionais/',
    jsonLd: [
      breadcrumbSchema([
        { label: 'Início', href: site.url('/') },
        { label: 'Profissionais', href: site.url('/profissionais/') }
      ])
    ]
  });
}

// ---------------------------------------------------------------------------
// PERFIL DO PROFISSIONAL
// ---------------------------------------------------------------------------

function profissionalPage(prof) {
  const metaProf = professionalMeta[prof.slug] || {
    title: `${prof.nome} | Odonto Clarity`,
    description: `Conheça o perfil de ${prof.nome}, profissional da Odonto Clarity em Presidente Epitácio.`
  };

  const relatedArticles = POSTS.filter(
    (p) => !p.draft && p.relatedProfessionals.includes(prof.slug)
  ).slice(0, 3);

  const pills = [];
  pills.push({ label: prof.area, cls: '' });
  if (prof.responsavelTecnica) pills.push({ label: 'Responsável Técnica', cls: '' });
  if (prof.cro && !isPending(prof.cro)) pills.push({ label: prof.cro, cls: 'subtle' });

  const credenciais = [];
  if (prof.cro && !isPending(prof.cro)) credenciais.push(`CRO: ${prof.cro}`);
  for (const s of [...(prof.formacao || []), ...(prof.especializacoes || []), ...(prof.credenciais || [])]) credenciais.push(s);
  // Nenhum dado oficial foi informado além do CRO já público no site atual.

  const bioFinal = Array.isArray(prof.bio) && prof.bio.length
    ? prof.bio
    : [
        `Profissional da Odonto Clarity em Presidente Epitácio, com atuação em ${prof.area}. Informações detalhadas sobre formação e trajetória profissional serão publicadas assim que forem confirmadas pela clínica.`
      ];

  const main = `
  <main id="conteudo">
    <section class="prof-hero">
      <div class="container prof-hero-grid" style="padding: 56px 0 64px;">
        <div class="prof-hero-avatar reveal"${prof.foto ? '' : ' aria-hidden="true"'}>${photoOf(prof, { loading: 'eager', width: 440, height: 440 })}</div>
        <div class="prof-hero-copy reveal">
          <span class="kicker" style="color: var(--red-800);">Profissional</span>
          <h1>${prof.nome}</h1>
          <div class="prof-meta-pills">
            ${pills.map((p) => `<span class="prof-pill ${p.cls}">${p.label}</span>`).join('\n')}
          </div>
          <p style="color: var(--muted); max-width: 620px;">Profissional da <strong>Odonto Clarity</strong> em <strong>Presidente Epitácio/SP</strong>, atuando na área de ${prof.area}.</p>
          <div class="prof-actions">
            <a class="btn btn-red" href="${site.waDefault}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp"></i>Agendar avaliação</a>
            <a class="btn btn-ghost" href="${site.waDefault}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-phone"></i>Falar com a Odonto Clarity</a>
          </div>
          <nav class="breadcrumb breadcrumb-light" style="margin: 24px 0 0;" aria-label="Trilha de navegação">
            <ol>
              <li><a href="/">Início</a></li>
              <li class="sep" aria-hidden="true">›</li>
              <li><a href="/profissionais/">Profissionais</a></li>
              <li class="sep" aria-hidden="true">›</li>
              <li aria-current="page">${prof.nome}</li>
            </ol>
          </nav>
        </div>
      </div>
    </section>

    <section class="prof-content">
      <div class="container" style="padding: 92px 24px;">
        <div class="prof-grid">
          <div class="prof-card-block reveal">
            <span class="kicker">Sobre</span>
            <h2 style="margin-bottom: 10px;">${prof.nome}</h2>
            <p>${bioFinal}</p>
          </div>

          ${
            credenciais.length
              ? `<div class="prof-card-block reveal">
            <span class="kicker">Credenciais</span>
            <h2 style="margin-bottom: 10px;">Registros e credenciais</h2>
            ${credenciais.map((c) => `<p style="margin-top:8px;">• ${c}</p>`).join('\n')}
          </div>`
              : ''
          }

          ${
            prof.formacao && prof.formacao.length
              ? `<div class="prof-card-block reveal">
            <span class="kicker">Formação acadêmica</span>
            <h2 style="margin-bottom: 10px;">Formação acadêmica</h2>
            ${prof.formacao.map((f) => `<p style="margin-top:8px;">• ${f.curso}${f.instituicao ? ' — ' + f.instituicao : ''}${f.ano ? ' (' + f.ano + ')' : ''}</p>`).join('\n')}
          </div>`
              : ''
          }

          ${
            prof.especializacoes && prof.especializacoes.length
              ? `<div class="prof-card-block reveal">
            <span class="kicker">Especializações</span>
            <h2 style="margin-bottom: 10px;">Especializações e aperfeiçoamentos</h2>
            ${prof.especializacoes.map((s) => `<p style="margin-top:8px;">• ${s.titulo}${s.instituicao ? ' — ' + s.instituicao : ''}${s.periodo ? ' (' + s.periodo + ')' : ''}</p>`).join('\n')}
          </div>`
              : ''
          }
        </div>
      </div>
    </section>

    ${
      relatedArticles.length
        ? `
    <section class="blog-preview">
      <div class="container">
        <div class="section-head center reveal">
          <span class="kicker">Conteúdos relacionados</span>
          <h2>Conteúdos relacionados à ${prof.area}</h2>
          <p>Artigos publicados no blog da Odonto Clarity com a participação deste profissional.</p>
        </div>
        <div class="article-grid">${relatedArticles.map(articleCard).join('\n')}</div>
      </div>
    </section>`
        : ''
    }

    ${ctaBand()}
  </main>`;

  return doc({
    main,
    active: '/profissionais/',
    title: metaProf.title,
    description: metaProf.description,
    canonical: `/profissionais/${prof.slug}/`,
    jsonLd: [...personSchema(prof), breadcrumbSchema([
      { label: 'Início', href: site.url('/') },
      { label: 'Profissionais', href: site.url('/profissionais/') },
      { label: prof.nome, href: site.url(`/profissionais/${prof.slug}/`) }
    ])]
  });
}

// ---------------------------------------------------------------------------
// BLOG (listagem)
// ---------------------------------------------------------------------------

function blogPage() {
  const published = POSTS.filter((p) => !p.draft);
  const main = `
  <main id="conteudo">
    ${pageHero({
      kicker: 'Blog',
      title: 'Conteúdos sobre saúde bucal e odontologia',
      lead: 'Artigos e orientações da Odonto Clarity em Presidente Epitácio, escritos com linguagem simples, acessível e responsável.',
      breadcrumbs: [{ href: site.url('/'), label: 'Início' }, { href: site.url('/blog/'), label: 'Blog' }]
    })}

    <section class="blog-preview">
      <div class="container">
        <div class="article-grid">
          ${published.map(articleCard).join('\n')}
        </div>
      </div>
    </section>

    ${ctaBand()}
  </main>`;

  return doc({
    main,
    active: '/blog/',
    title: 'Blog | Odonto Clarity Presidente Epitácio',
    description:
      'Artigos sobre saúde bucal, odontologia e tratamentos da Odonto Clarity em Presidente Epitácio: implantes, endodontia, ortodontia, estética e cuidados no dia a dia.',
    canonical: '/blog/',
    jsonLd: [
      breadcrumbSchema([
        { label: 'Início', href: site.url('/') },
        { label: 'Blog', href: site.url('/blog/') }
      ])
    ]
  });
}

// ---------------------------------------------------------------------------
// ARTIGO
// ---------------------------------------------------------------------------

function artigoPage(post) {
  const prof = post.reviewedBy ? findBySlug(post.reviewedBy) : null;
  const relatedArticles = POSTS.filter((p) => !p.draft && p.slug !== post.slug).slice(0, 3);
  const schema = [articleSchema(post), breadcrumbSchema([
    { label: 'Início', href: site.url('/') },
    { label: 'Blog', href: site.url('/blog/') },
    { label: post.title, href: site.url(`/blog/${post.slug}/`) }
  ])];
  if (post.faq && post.faq.length) schema.push(faqSchema(post.faq));

  const main = `
  <main id="conteudo">
    ${pageHero({
      kicker: post.category,
      title: post.title,
      breadcrumbs: [
        { href: site.url('/'), label: 'Início' },
        { href: site.url('/blog/'), label: 'Blog' },
        { href: site.url(`/blog/${post.slug}/`), label: post.title }
      ],
      extra: `<div class="article-header-meta">
        <span>${formatDate(post.publishedAt)}</span>
        ${post.readingTime ? `<span>· leitura de ${post.readingTime} ${post.readingTime === 1 ? 'minuto' : 'minutos'}</span>` : ''}
        <span>· ${prof ? `Revisão técnica: <a href="/profissionais/${prof.slug}/">${prof.nome}</a>` : 'Produzido pela equipe Odonto Clarity'}</span>
      </div>`
    })}

    <section class="inner-section">
      <div class="container article-container">
        ${post.featuredImage ? `<img class="article-featured-img" src="${post.featuredImage}" alt="${post.imageAlt || post.title}" width="1000" height="560" fetchpriority="high">` : ''}
        <div class="prose">
          ${post.html}
          ${
            post.faq && post.faq.length
              ? `
          <h2>Perguntas frequentes</h2>
          ${post.faq.map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('\n')}`
              : ''
          }
        </div>
      </div>
    </section>

    ${
      prof
        ? `<section class="about-prof"><div class="container"><div class="about-prof-grid">
      <div class="about-prof-avatar${prof.foto ? ' team-avatar-photo' : ''}"${prof.foto ? '' : ' aria-hidden="true"'}>${photoOf(prof)}</div>
      <div>
        <span class="kicker">Sobre o profissional</span>
        <h2>${prof.nome}</h2>
        <p>Área de atuação: <strong>${prof.area}</strong>${prof.responsavelTecnica ? ' · Responsável Técnica' : ''}</p>
        <a class="btn btn-ghost" href="/profissionais/${prof.slug}/">Conhecer profissional <i class="fa-solid fa-arrow-right"></i></a>
      </div>
    </div></div></section>`
        : ''
    }

    <section class="blog-preview">
      <div class="container">
        <div class="section-head center reveal">
          <span class="kicker">Blog</span>
          <h2>Outros conteúdos que podem ajudar</h2>
        </div>
        <div class="article-grid">${relatedArticles.map(articleCard).join('\n')}</div>
      </div>
    </section>

    <div class="cta-band">
      <div class="cta-box reveal">
        <div><h2>Precisa de uma avaliação?</h2><p>Agende uma consulta na Odonto Clarity e receba orientação profissional para o seu caso.</p></div>
        <a class="btn btn-light" href="${site.waDefault}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp"></i>Agendar avaliação</a>
      </div>
    </div>
  </main>`;

  return doc({
    main,
    active: '/blog/',
    title: post.seoTitle || `${post.title} | Odonto Clarity`,
    description: post.description,
    canonical: `/blog/${post.slug}/`,
    ogImage: post.featuredImage,
    // canonical marcado no frontmatter não gera noindex automático (sem inventar regras)
    jsonLd: schema
  });
}

// ---------------------------------------------------------------------------
// POLÍTICA DE PRIVACIDADE
// ---------------------------------------------------------------------------

function privacidadePage() {
  const main = `
  <main id="conteudo">
    ${pageHero({
      kicker: 'Documento',
      title: 'Política de Privacidade',
      lead: 'Como a Odonto Clarity trata os dados fornecidos pelos visitantes deste site.',
      breadcrumbs: [{ href: site.url('/'), label: 'Início' }, { href: site.url('/politica-de-privacidade/'), label: 'Política de Privacidade' }]
    })}

    <section class="inner-section">
      <div class="container article-container">
        <div class="prose">
          <p>Esta política explica, de forma simples, como este site lida com as informações dos visitantes. Ela será revisada sempre que houver mudança nos serviços ou na legislação aplicável, como a Lei Geral de Proteção de Dados (LGPD).</p>

          <h2>1. Quais informações são coletadas</h2>
          <p>Este site não exige cadastro para navegação. O único ponto em que você é convidado a informar dados pessoais é o formulário de contato, no qual são solicitados nome, telefone e, opcionalmente, uma mensagem.</p>

          <h2>2. Como essas informações são usadas</h2>
          <p>Os dados informados no formulário são usados exclusivamente para responder à sua solicitação de contato. Ao enviar o formulário, o conteúdo é transferido para o WhatsApp oficial da clínica; nenhuma informação é armazenada em banco de dados deste site.</p>

          <h2>3. Compartilhamento de dados</h2>
          <p>Os dados não são vendidos, alugados ou compartilhados com terceiros para publicidade. Serviços externos utilizados por este site (como fontes e hospedagem de imagens) podem registrar dados técnicos de acesso conforme suas próprias políticas, fora do controle desta página.</p>

          <h2>4. Seus direitos</h2>
          <p>Você pode solicitar a qualquer momento a confirmação, a correção ou a exclusão de informações pessoais que tenha fornecido, entrando em contato pelos canais oficiais da clínica: ${site.phoneDisplay} ou ${site.email}.</p>

          <h2>5. Contato</h2>
          <p>Em caso de dúvidas sobre esta política, fale com a equipe da Odonto Clarity pelos canais oficiais de atendimento.</p>
        </div>
      </div>
    </section>
  </main>`;

  return doc({
    main,
    active: null,
    title: 'Política de Privacidade | Odonto Clarity',
    description:
      'Política de privacidade do site da Odonto Clarity, clínica odontológica em Presidente Epitácio/SP.',
    canonical: '/politica-de-privacidade/',
    jsonLd: [
      breadcrumbSchema([
        { label: 'Início', href: site.url('/') },
        { label: 'Política de Privacidade', href: site.url('/politica-de-privacidade/') }
      ])
    ]
  });
}

// ---------------------------------------------------------------------------
// 404
// ---------------------------------------------------------------------------

function notFoundPage() {
  const main = `
  <main id="conteudo">
    <section class="not-found">
      <div class="not-found-num">404</div>
      <h1>Página não encontrada</h1>
      <p>A página que você procura não existe ou foi movida. Use a navegação do site ou volte para a página inicial.</p>
      <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
        <a class="btn btn-red" href="/">Voltar para a página inicial</a>
        <a class="btn btn-ghost" href="/contato/">Falar com a clínica</a>
      </div>
    </section>
  </main>`;

  return doc({
    main,
    active: null,
    title: 'Página não encontrada | Odonto Clarity',
    description: 'A página solicitada não existe.',
    canonical: null,
    robots: 'noindex, follow',
    jsonLd: []
  });
}

module.exports = {
  homePage,
  sobrePage,
  contatoPage,
  servicosPage,
  servicoPage,
  profissionaisPage,
  profissionalPage,
  blogPage,
  artigoPage,
  privacidadePage,
  notFoundPage
};