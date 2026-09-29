'use strict';

// ---------------------------------------------------------------------------
// JSON-LD / Schema.org
// Somente campos verdadeiros são preenchidos. Nada é inventado.
// ---------------------------------------------------------------------------

const { site } = require('../../src/lib/site.cjs');
const { findBySlug } = require('../../src/lib/professionals.cjs');

// Organização / Dentist (usado na Home e páginas institucionais)
function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': site.url('/#organization'),
    name: 'Odonto Clarity',
    description: site.description,
    url: site.url('/'),
    telephone: site.phoneTel,
    email: site.email,
    image: site.socialImage,
    priceRange: site.priceRange || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country
    },
    areaServed: { '@type': 'City', name: 'Presidente Epitácio' },
    openingHoursSpecification: site.openingHours.map((o) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: o.days.map((d) => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][d - 1]),
      opens: o.opens,
      closes: o.closes
    })),
    sameAs: [site.instagram, site.facebook].filter(Boolean),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.phoneTel,
      contactType: 'customer service',
      availableLanguage: 'Portuguese'
    },
    employee: [
      {
        '@type': 'Physician',
        name: site.responsavelTecnica.nomePublico,
        medicalSpecialty: 'Dentistry',
        identifier: site.responsavelTecnica.croJsonLd
      }
    ]
  };
}

// BreadcrumbList
function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: item.href
    }))
  };
}

// Person + ProfilePage de um profissional
function personSchema(prof) {
  const profileUrl = site.url(`/profissionais/${prof.slug}/`);
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${profileUrl}#person`,
    name: prof.nome,
    url: profileUrl,
    jobTitle: prof.area,
    worksFor: {
      '@type': 'Dentist',
      name: site.name,
      url: site.url('/')
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.address.locality,
      addressRegion: site.address.region
    }
  };
  if (prof.cro && prof.croJsonLd) person.identifier = prof.croJsonLd;
  if (prof.foto) person.image = site.url(prof.foto);

  const page = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${profileUrl}#webpage`,
    url: profileUrl,
    isPartOf: { '@type': 'WebSite', name: site.name, url: site.url('/') },
    mainEntity: { '@id': `${profileUrl}#person` }
  };

  return [person, page];
}

// BlogPosting de um artigo
function articleSchema(post) {
  const url = site.url(`/blog/${post.slug}/`);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    mainEntityOfPage: url,
    publisher: { '@type': 'Organization', name: site.name, url: site.url('/') },
    image: post.featuredImage
  };
  if (post.updatedAt) schema.dateModified = post.updatedAt;
  if (post.reviewedBy) {
    const prof = findBySlug(post.reviewedBy);
    if (prof) schema.author = { '@type': 'Person', name: prof.nome, url: site.url(`/profissionais/${prof.slug}/`) };
  }
  return schema;
}

// FAQPage de um artigo
function faqSchema(faq) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

// Service (páginas de serviço)
function serviceSchema(svc) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: svc.nome,
    description: svc.seoDescription || svc.resumo,
    url: site.url(`/${svc.slug}/`),
    serviceType: svc.kicker,
    areaServed: { '@type': 'City', name: 'Presidente Epitácio' },
    provider: { '@type': 'Dentist', '@id': site.url('/#organization'), name: site.name }
  };
}

module.exports = {
  organizationSchema,
  breadcrumbSchema,
  personSchema,
  articleSchema,
  faqSchema,
  serviceSchema
};