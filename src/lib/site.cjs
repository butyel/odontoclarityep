'use strict';

// ---------------------------------------------------------------------------
// Dados centrais da Odonto Clarity - Presidente Epitácio/SP
//
// REGRAS:
// - Nenhum dado inventado. Campos ainda não confirmados usam PENDING e
//   NUNCA são renderizados no frontend (os renderizadores ignoram "PENDING").
// - SITE_URL é lida de process.env (produção: https://www.odontoclarity.com.br).
// ---------------------------------------------------------------------------

const PENDING = '[INFORMAÇÃO A CONFIRMAR]';

// URL canônica. Em previews da Vercel, definir SITE_URL por ambiente.
const SITE_URL = process.env.SITE_URL || 'https://www.odontoclarity.com.br';

const site = {
  name: 'Odonto Clarity',
  domain: SITE_URL,
  url: (path) => `${SITE_URL}${path || '/'}`,

  tagline: 'Clínica odontológica em Presidente Epitácio',
  description:
    'Odonto Clarity em Presidente Epitácio: clínica odontológica com atendimento humanizado, estrutura moderna e especialidades em clínico geral, ortodontia, implantodontia, estética orofacial e endodontia.',

  // Contato ---------------------------------------------------------------
  phoneDisplay: '(18) 99678-2225',
  phoneTel: '+5518996782225',
  whatsappNumber: '5518996782225',
  email: 'contato@odontoclarity.com.br',
  instagram: 'https://www.instagram.com/odontoclarityepitacio/',
  instagramHandle: '@odontoclarityepitacio',
  facebook: 'https://www.facebook.com/odontoclarityepitacio/',

  // Endereço e localização -------------------------------------------------
  address: {
    street: 'R. Maceió, 1307 - Centro',
    locality: 'Presidente Epitácio',
    region: 'SP',
    postalCode: '19470-039',
    country: 'BR',
    full: 'R. Maceió, 1307 - Centro, Presidente Epitácio - SP, 19470-039'
  },
  mapsUrl: 'https://www.google.com/maps/place/Odonto+Clarity+Presidente+Epit%C3%A1cio',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=R.%20Macei%C3%B3%2C%201307%20-%20Centro%2C%20Presidente%20Epit%C3%A1cio%20-%20SP%2C%2019470-039&output=embed',

  // Horários ---------------------------------------------------------------
  // De 1 (segunda) a 7 (domingo), no padrão Schema.org. Sábado não atende.
  openingHours: [
    { days: [1], opens: '09:00', closes: '19:00', label: 'Segunda: 09:00 às 19:00' },
    { days: [2, 3], opens: '09:00', closes: '20:00', label: 'Terça e quarta: 09:00 às 20:00' },
    { days: [4, 5], opens: '09:00', closes: '19:00', label: 'Quinta e sexta: 09:00 às 19:00' }
  ],
  hoursLabel: 'Segunda: 09:00 às 19:00 · Terça e quarta: 09:00 às 20:00 · Quinta e sexta: 09:00 às 19:00',
  hoursShortLabel: 'Seg 09h-19h · Ter e Qua 09h-20h · Qui e Sex 09h-19h',

  // Indicadores já publicados no site atual ---------------------------------
  googleReviewsCount: '43',
  googleRating: '5.0',
  experienceLabel: '+10 anos',

  // Imagem social (mantém a já utilizada pelo site atual) -------------------
  socialImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&h=630&fit=crop',

  // Mensagens padrão de WhatsApp (não podem conter acentos sensíveis à URL)
  waDefault:
    'https://wa.me/5518996782225?text=Ol%C3%A1%21%20Encontrei%20a%20Odonto%20Clarity%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20consulta.'
};

// Anexa o endereço e o CRO já públicos no site/Google da responsável técnica.
site.responsavelTecnica = {
  nomePublico: 'Dra. Maria Vitória L. A. Miguel',
  cro: 'CRO-SP 152250 · CRO-CL 020.298',
  croJsonLd: [
    { '@type': 'PropertyValue', name: 'CRO-SP', value: '152250' },
    { '@type': 'PropertyValue', name: 'CRO-CL', value: '020.298' }
  ]
};

module.exports = { site, SITE_URL, PENDING };