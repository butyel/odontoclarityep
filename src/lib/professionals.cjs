'use strict';

// ---------------------------------------------------------------------------
// Profissionais da Odonto Clarity - FONTE ÚNICA DE DADOS
//
// - Campos vazios ou igual a PENDING não são renderizados no frontend.
// - Biografias, formações e especializações são transcritas do texto enviado
//   pela clínica. Nada é inventado: o que não foi informado fica vazio.
// - O único CRO exibido (Dra. Maria Victoria) já consta publicamente no
//   site atual e no Google Business Profile da clínica.
// - "area" informada pelo cliente: Ortodontia / Implantodontia / Endodontia.
//   "area" não significa título de especialista — isso depende de registro.
// - "foto" aponta para /assets/images/profissionais/<slug>.jpg. Sem foto,
//   o site exibe um monograma de iniciais.
// ---------------------------------------------------------------------------

const { PENDING } = require('./site.cjs');

/**
 * @typedef {Object} Professional
 * @property {string}  nome            Nome completo com pronome de tratamento
 * @property {string}  slug            Slug da URL (/profissionais/<slug>/)
 * @property {string}  area            Área de atuação informada pelo cliente
 * @property {boolean} [responsavelTecnica] Marca a responsável técnica
 * @property {string}  [cro]           Registro já publicado no site atual
 * @property {string}  [foto]          Foto real em /assets/images/profissionais/
 * @property {string}  [fotoAlt]       Texto alternativo da foto
 * @property {string}  [fotoPos]       object-position do recorte (padrão: center top)
 * @property {Array}   [formacao]      [{ curso, instituicao, ano }]
 * @property {Array}   [especializacoes] [{ titulo, instituicao, periodo }]
 * @property {Array}   [credenciais]   CRO, registro de especialista etc.
 * @property {Array}   [bio]           Biografia em parágrafos
 * @property {Array}   [redes]         Perfis profissionais oficiais
 */
const professionals = [
  {
    nome: 'Dra. Maria Victoria de Lima Araújo Miguel',
    slug: 'maria-victoria-de-lima-araujo-miguel',
    area: 'Ortodontia',
    responsavelTecnica: true,
    // Registro já exibido no site atual (footer e Schema) — dado oficial.
    cro: 'CRO-SP 152250 · CRO-CL 020.298',
    croJsonLd: [
      { '@type': 'PropertyValue', name: 'CRO-SP', value: '152250' },
      { '@type': 'PropertyValue', name: 'CRO-CL', value: '020.298' }
    ],
    nomeNoSiteAtual: 'Dra. Maria Vitória L. A. Miguel',
    foto: '/assets/images/profissionais/maria-victoria-de-lima-araujo-miguel.jpg',
    fotoAlt: 'Retrato da Dra. Maria Victoria de Lima Araújo Miguel, ortodontista da Odonto Clarity',
    // Retrato vertical (906x1600) com muito espaço no topo: o recorte padrão
    // "center top" deixava o rosto baixo no círculo. Subimos ~20% do overflow.
    fotoPos: 'center 20%',
    formacao: [
      {
        curso: 'Odontologia',
        instituicao: 'Universidade do Oeste Paulista (UNOESTE), Presidente Prudente/SP',
        ano: '2020'
      }
    ],
    especializacoes: [
      { titulo: 'Pós-graduação em Ortodontia', instituicao: '', periodo: '2024' }
    ],
    credenciais: [],
    bio: [
      'A Dra. Maria Victoria de Lima Araújo Miguel é cirurgiã-dentista, formada em Odontologia pela Universidade do Oeste Paulista (UNOESTE), em Presidente Prudente, em 2020.',
      'Atua na Odontologia desde sua formação, com experiência em Clínica Geral e Ortodontia. Em 2024, concluiu sua pós-graduação em Ortodontia, área na qual se especializou e vem aprimorando continuamente sua atuação profissional.',
      'Seu trabalho é pautado em um atendimento individualizado, humanizado e cuidadoso, buscando unir saúde, função e estética para proporcionar aos pacientes mais confiança e qualidade de vida.'
    ],
    redes: []
  },
  {
    nome: 'Dr. Vinícius José de Amorim Storniolo',
    slug: 'vinicius-jose-de-amorim-storniolo',
    area: 'Implantodontia',
    responsavelTecnica: false,
    cro: null,
    // FOTO PENDENTE — nenhuma imagem do Dr. Vinícius existe nos assets do projeto.
    // Para usar a foto real: salvar em src/assets/images/profissionais/
    // com o nome exato do slug + ".jpg" e trocar "foto: null" por:
    //   foto: '/assets/images/profissionais/vinicius-jose-de-amorim-storniolo.jpg',
    //   fotoAlt: 'Retrato do Dr. Vinícius José de Amorim Storniolo, implantodontista da Odonto Clarity',
    // Enquanto "foto" for null, o site exibe o monograma de iniciais
    // (mesma caixa, proporção e alinhamento das demais fotos).
    foto: null,
    fotoAlt: 'Retrato do Dr. Vinícius José de Amorim Storniolo, implantodontista da Odonto Clarity',
    formacao: [],
    especializacoes: [],
    credenciais: [],
    bio: PENDING,
    redes: []
  },
  {
    nome: 'Dra. Aline Conceição Guilhermino Matos',
    slug: 'aline-conceicao-guilhermino-matos',
    area: 'Endodontia',
    responsavelTecnica: false,
    cro: null,
    foto: '/assets/images/profissionais/aline-conceicao-guilhermino-matos.jpg',
    fotoAlt: 'Retrato da Dra. Aline Conceição Guilhermino Matos, especialista em Endodontia da Odonto Clarity',
    formacao: [
      {
        curso: 'Odontologia',
        instituicao: 'Universidade Nove de Julho (UNINOVE)',
        ano: '2016'
      }
    ],
    especializacoes: [{ titulo: 'Especialização em Endodontia', instituicao: '', periodo: '' }],
    credenciais: ['6 anos de atuação como Auxiliar em Saúde Bucal (ASB) antes da graduação'],
    bio: [
      'A odontologia faz parte da minha história há muitos anos. Antes de me tornar cirurgiã-dentista, atuei por 6 anos como Auxiliar em Saúde Bucal (ASB), experiência que despertou minha paixão pela profissão e fortaleceu meu desejo de transformar vidas por meio do cuidado com o sorriso.',
      'Sou formada em Odontologia pela Universidade Nove de Julho (UNINOVE) desde 2016 e especialista em Endodontia. Ao longo da minha trajetória, busco constante atualização para oferecer tratamentos modernos, seguros e um atendimento humanizado.',
      'Acredito que cada paciente merece ser atendido com carinho, respeito e dedicação. Meu compromisso é unir conhecimento técnico e acolhimento para proporcionar saúde, bem-estar e mais confiança para sorrir.'
    ],
    redes: []
  },
  {
    nome: 'Dr. Gabriel Valagna Mauro',
    slug: 'gabriel-valagna-mauro',
    area: 'Implantodontia',
    responsavelTecnica: false,
    cro: null,
    foto: '/assets/images/profissionais/gabriel-valagna-mauro.jpg',
    fotoAlt: 'Retrato do Dr. Gabriel Valagna Mauro, implantodontista da Odonto Clarity',
    formacao: [
      {
        curso: 'Odontologia',
        instituicao: 'UNIFAI, Adamantina/SP',
        ano: '2020'
      }
    ],
    especializacoes: [
      { titulo: 'Especialização em Implantodontia', instituicao: 'ABO, Presidente Prudente/SP', periodo: '2022' }
    ],
    credenciais: [],
    bio: [
      'Sou o Dr. Gabriel Mauro, tenho 29 anos e sou natural de Teodoro Sampaio-SP. Me formei em Odontologia em 2020 pela UNIFAI, em Adamantina, e em 2022 concluí minha especialização em Implantodontia pela ABO de Presidente Prudente.',
      'Acredito que a Odontologia está em constante evolução e, por isso, busco estar sempre me aperfeiçoando e acompanhando novas técnicas para oferecer tratamentos seguros, modernos e eficientes.',
      'Meu propósito é unir conhecimento, precisão e um atendimento próximo e humanizado, para que cada paciente se sinta seguro e bem cuidado.',
      'Na Odonto Clarity, busco transformar conhecimento em resultados, ajudando cada paciente a recuperar não apenas a função, mas também a confiança e a alegria de sorrir novamente.'
    ],
    redes: []
  }
];

// Metadata de SEO exclusiva por profissional (fornecida no briefing).
const professionalMeta = {
  'maria-victoria-de-lima-araujo-miguel': {
    title: 'Dra. Maria Victoria de Lima Araújo Miguel | Odonto Clarity',
    description:
      'Conheça a Dra. Maria Victoria de Lima Araújo Miguel, profissional da área de Ortodontia e responsável técnica da Odonto Clarity em Presidente Epitácio.'
  },
  'vinicius-jose-de-amorim-storniolo': {
    title: 'Dr. Vinícius José de Amorim Storniolo | Odonto Clarity',
    description:
      'Conheça o Dr. Vinícius José de Amorim Storniolo e sua atuação em Implantodontia na Odonto Clarity em Presidente Epitácio.'
  },
  'aline-conceicao-guilhermino-matos': {
    title: 'Dra. Aline Conceição Guilhermino Matos | Odonto Clarity',
    description:
      'Conheça a Dra. Aline Conceição Guilhermino Matos e sua atuação em Endodontia na Odonto Clarity em Presidente Epitácio.'
  },
  'gabriel-valagna-mauro': {
    title: 'Dr. Gabriel Valagna Mauro | Odonto Clarity',
    description:
      'Conheça o Dr. Gabriel Valagna Mauro e sua atuação em Implantodontia na Odonto Clarity em Presidente Epitácio.'
  }
};

// Relações semânticas profissional ↔ áreas/serviços (apenas as informadas).
const professionalRelations = {
  'maria-victoria-de-lima-araujo-miguel': {
    areas: ['Ortodontia'],
    services: ['ortodontista-presidente-epitacio']
  },
  'vinicius-jose-de-amorim-storniolo': {
    areas: ['Implantodontia'],
    services: ['implante-dentario-presidente-epitacio']
  },
  'aline-conceicao-guilhermino-matos': {
    areas: ['Endodontia'],
    services: ['tratamento-de-canal-presidente-epitacio']
  },
  'gabriel-valagna-mauro': {
    areas: ['Implantodontia'],
    services: ['implante-dentario-presidente-epitacio']
  }
};

const findBySlug = (slug) => professionals.find((p) => p.slug === slug);

// Iniciais para o avatar monograma (usado apenas quando não há foto real).
// Primeiro nome + último nome, sem honorífico (ex.: "Dr. Vinícius ... Storniolo" → VS).
const initialsOf = (nome) => {
  const palavras = nome.replace(/^(Dra?\.)\s*/i, '').split(' ').filter(Boolean);
  if (palavras.length < 2) return palavras[0].slice(0, 2).toUpperCase();
  return `${palavras[0][0]}${palavras[palavras.length - 1][0]}`.toUpperCase();
};

// Foto real (declarativa) ou monograma de iniciais como fallback.
const photoOf = (prof, opts = {}) => {
  const { width, height, loading = 'lazy', className = '' } = opts;
  if (!prof.foto) return initialsOf(prof.nome);
  const attr = [`src="${prof.foto}"`, `alt="${prof.fotoAlt || prof.nome}"`];
  if (width) attr.push(`width="${width}"`);
  if (height) attr.push(`height="${height}"`);
  if (loading) attr.push(`loading="${loading}"`, 'decoding="async"');
  const cls = className ? ` class="${className}"` : '';
  const style = prof.fotoPos ? ` style="object-position: ${prof.fotoPos}"` : '';
  return `<img${cls} ${attr.join(' ')}${style}>`;
};

const roleLabel = (p) => {
  const base = p.area;
  if (!p.responsavelTecnica) return base;
  return `${base} · Responsável Técnica`;
};

module.exports = {
  professionals,
  professionalMeta,
  professionalRelations,
  findBySlug,
  initialsOf,
  photoOf,
  roleLabel,
  PENDING
};