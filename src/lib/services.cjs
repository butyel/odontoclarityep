'use strict';

// ---------------------------------------------------------------------------
// Páginas de serviços da Odonto Clarity
//
// Conteúdo editorial responsável e informativo. Nenhuma promessa de resultado,
// nenhum diagnóstico online, nenhum dado clínico inventado da clínica.
// Relações com profissionais usam somente os vínculos informados.
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} ServicePage
 * @property {string} slug
 * @property {string} nome            Nome curto usado em links/cards
 * @property {string} titulo          H1 da página
 * @property {string} kicker          Rótulo acima do H1
 * @property {string} resumo          Resumo para cards/SEO
 * @property {string} lead            Parágrafo do hero
 * @property {string} seoTitle
 * @property {string} seoDescription
 * @property {string} imagem
 * @property {string} imagemHero       Foto em tamanho cheio usada no hero
 * @property {string} imagemAlt
 * @property {{titulo:string; paragrafos:string[]}} oQueE
 * @property {{titulo:string; texto:string; itens:string[]}} indicado
 * @property {{titulo:string; texto:string; itens:string[]}} comoFunciona
 * @property {{numero:number; titulo:string; texto:string}[]} etapas
 * @property {{titulo:string; texto:string; itens:string[]}} cuidados
 * @property {string[]} profissionais  slugs informados pelo cliente
 * @property {{q:string; a:string}[]} faq
 * @property {string[]} relacionados   slugs de serviços relacionados
 * @property {string} textoProfRelacionado
 * @property {string} cta
 */

const services = [
  {
    slug: 'implante-dentario-presidente-epitacio',
    nome: 'Implante dentário',
    titulo: 'Implante dentário em Presidente Epitácio',
    kicker: 'Implantodontia',
    resumo:
      'Substituição de dentes perdidos por implantes de titânio, com reabilitação da mastigação e da estética do sorriso.',
    lead: 'O implante dentário é um procedimento da implantodontia voltado a substituir dentes perdidos por estruturas de titânio, sobre as quais são instaladas as próteses dentárias.',
    seoTitle: 'Implante Dentário em Presidente Epitácio | Odonto Clarity',
    seoDescription:
      'Implante dentário em Presidente Epitácio: conheça como funciona o tratamento de implantodontia na Odonto Clarity, quem atende e como iniciar uma avaliação.',
    imagem: '/assets/images/servicos/implante-dentario.webp',
    imagemHero: '/assets/images/servicos/implante-dentario-hero.webp',
    imagemAlt: 'Consulta de implante dentário na Odonto Clarity em Presidente Epitácio',
    oQueE: {
      titulo: 'O que é o implante dentário',
      paragrafos: [
        'A implantodontia é a área da odontologia voltada ao reestabelecimento da função de mastigação e da estética quando há ausência de um ou mais dentes. Isso ocorre em casos de dentes perdidos, próteses mal adaptadas, mordida insatisfatória ou situações esteticamente desfavoráveis.',
        'No tratamento, o implante — uma estrutura de titânio instalada cirurgicamente no osso — funciona como uma nova "raiz" sobre a qual é colocada a peça protética que substitui o dente perdido. O objetivo é devolver função e conforto ao paciente, associando saúde bucal e qualidade de vida.'
      ]
    },
    indicado: {
      titulo: 'Quando o implante pode ser considerado',
      texto: 'A avaliação clínica é indispensável: somente o cirurgião-dentista pode confirmar se o implante é a melhor opção para o seu caso. Algumas situações em que costuma ser avaliado:',
      itens: [
        'Perda de um ou mais dentes, com espaço para reabilitação',
        'Próteses removíveis mal adaptadas ou desconfortáveis',
        'Dificuldade de mastigação por ausência de dentes',
        'Insatisfação estética com o sorriso por falta de dentes'
      ]
    },
    comoFunciona: {
      titulo: 'Como funciona o tratamento',
      texto: 'O processo é planejado de forma individualizada, começando por uma avaliação minuciosa. De forma geral, envolve:',
      itens: [
        'Avaliação clínica e exames de imagem para planejamento',
        'Discussão do plano de tratamento e das etapas com o paciente',
        'Instalação cirúrgica do implante de titânio',
        'Período de osseointegração (integração do implante ao osso)',
        'Instalação da prótese sobre o implante'
      ]
    },
    etapas: [
      { numero: 1, titulo: 'Avaliação e planejamento', texto: 'Consulta com o dentista, análise clínica e exames de imagem para entender o caso e planejar o tratamento.' },
      { numero: 2, titulo: 'Instalação do implante', texto: 'O implante de titânio é posicionado cirurgicamente no osso, seguindo o planejamento realizado.' },
      { numero: 3, titulo: 'Osseointegração', texto: 'Período em que o implante se integra ao osso. A duração varia conforme cada caso e a avaliação clínica.' },
      { numero: 4, titulo: 'Prótese sobre o implante', texto: 'Após a integração, a peça protética que substitui o dente é instalada sobre o implante.' }
    ],
    cuidados: {
      titulo: 'Cuidados após o tratamento',
      texto: 'Como qualquer área da saúde, o acompanhamento é contínuo:',
      itens: [
        'Seguir as orientações de higiene e as consultas de acompanhamento',
        'Manter uma boa higiene bucal diária',
        'Comparecer às consultas periódicas de manutenção',
        'Relatar ao dentista qualquer desconforto persistente'
      ]
    },
    profissionais: ['vinicius-jose-de-amorim-storniolo', 'gabriel-valagna-mauro'],
    faq: [
      { q: 'Implante dentário dói?', a: 'Qualquer procedimento cirúrgico envolve um pós-operatório. O desconforto varia de pessoa para pessoa, e o dentista orienta sobre o manejo em cada fase. Não é possível garantir ausência de dor — a avaliação clínica é o que define as orientações adequadas.' },
      { q: 'Quanto tempo demora o tratamento com implante?', a: 'O tempo varia conforme o caso: depende da necessidade de extrações, da qualidade óssea e do tipo de prótese. A duração é definida na avaliação e no planejamento feitos com o cirurgião-dentista.' },
      { q: 'Todo mundo pode fazer implante?', a: 'Nem todo paciente é candidato a implante. Condições de saúde, hábitos e a qualidade do osso influenciam a indicação. Somente o cirurgião-dentista pode avaliar o caso e indicar o tratamento mais adequado.' },
      { q: 'Qual a diferença entre implante e prótese?', a: 'O implante é a estrutura instalada no osso; a prótese é a peça que substitui visualmente e funcionalmente o dente e pode ser instalada sobre implantes. Muitos tratamentos combinam as duas etapas.' }
    ],
    relacionados: ['protese-dentaria-presidente-epitacio'],
    textoProfRelacionado:
      'Conheça os profissionais da Odonto Clarity que atuam na área de Implantodontia.',
    cta: 'Precisa conversar sobre implante dentário? Agende uma avaliação na Odonto Clarity.'
  },

  {
    slug: 'tratamento-de-canal-presidente-epitacio',
    nome: 'Tratamento de canal',
    titulo: 'Tratamento de canal em Presidente Epitácio',
    kicker: 'Endodontia',
    resumo:
      'Tratamento endodôntico que visa preservar o dente quando a polpa dentária é afetada por cárie profunda, trauma ou infecção.',
    lead: 'O tratamento de canal é uma especialidade da endodontia cujo objetivo é a preservação do dente, tratando as doenças e lesões que afetam a polpa dentária e os tecidos ao redor da raiz.',
    seoTitle: 'Tratamento de Canal em Presidente Epitácio | Odonto Clarity',
    seoDescription:
      'Tratamento de canal em Presidente Epitácio: entenda quando pode ser indicado, como funciona e quem é o profissional de endodontia da Odonto Clarity.',
    imagem: '/assets/images/servicos/tratamento-de-canal.webp',
    imagemHero: '/assets/images/servicos/tratamento-de-canal-hero.webp',
    imagemAlt: 'Tratamento de canal na Odonto Clarity em Presidente Epitácio',
    oQueE: {
      titulo: 'O que é o tratamento de canal',
      paragrafos: [
        'A endodontia é a especialidade odontológica voltada à preservação do dente. Ela cuida da etiologia, do diagnóstico, da terapêutica e do prognóstico das doenças e lesões que afetam a polpa dentária, a raiz do dente e os tecidos perirradiculares.',
        'O tratamento de canal é o procedimento mais conhecido dessa área: ele remove o tecido pulpar comprometido, limpa e modela os canais internos da raiz e os preenche com material adequado. O objetivo é manter o dente na boca, evitando a extração sempre que possível.'
      ]
    },
    indicado: {
      titulo: 'Quando pode ser indicado',
      texto: 'A indicação depende de avaliação clínica e, em muitos casos, de exames de imagem. Algumas situações em que o tratamento de canal costuma ser avaliado:',
      itens: [
        'Dor de dente persistente ou que piora à noite',
        'Sensibilidade prolongada a quente ou frio',
        'Cárie profunda que atingiu a polpa do dente',
        'Trauma no dente que comprometeu a estrutura interna',
        'Inchaço ou dor associados à região do dente'
      ]
    },
    comoFunciona: {
      titulo: 'Como funciona o tratamento',
      texto: 'O tratamento é realizado em etapas, sempre com anestesia local e isolamento adequado do campo de trabalho:',
      itens: [
        'Avaliação clínica e radiográfica do dente',
        'Acesso à polpa e remoção do tecido comprometido',
        'Limpeza, modelagem e desinfecção dos canais',
        'Preenchimento dos canais com material próprio',
        'Restauração e acompanhamento do dente tratado'
      ]
    },
    etapas: [
      { numero: 1, titulo: 'Diagnóstico', texto: 'O dentista examina o dente e solicita exames de imagem para confirmar a necessidade do tratamento de canal.' },
      { numero: 2, titulo: 'Preparo e acesso', texto: 'Com anestesia local, o dente é isolado e é criado o acesso à polpa comprometida.' },
      { numero: 3, titulo: 'Limpeza dos canais', texto: 'Os canais internos são limpos, modelados e desinfetados com instrumentos e soluções específicas.' },
      { numero: 4, titulo: 'Obturação e restauração', texto: 'Os canais recebem o material obturador e o dente é restaurado para voltar à função.' }
    ],
    cuidados: {
      titulo: 'Cuidados após o tratamento',
      texto: 'Depois da conclusão do tratamento, o acompanhamento continua importante:',
      itens: [
        'Concluir a restauração definitiva do dente no prazo orientado',
        'Manter a higiene bucal e usar o fio dental',
        'Comparecer às consultas de controle',
        'Procurar o dentista diante de qualquer sintoma novo'
      ]
    },
    profissionais: ['aline-conceicao-guilhermino-matos'],
    faq: [
      { q: 'Tratamento de canal dói?', a: 'O procedimento é realizado com anestesia local, e o objetivo é garantir o conforto do paciente durante o atendimento. Algum desconforto no pós-operatório pode ocorrer e varia de pessoa para pessoa; as orientações são sempre dadas pelo dentista.' },
      { q: 'Preciso de canal por causa de uma cárie?', a: 'Quando a cárie é muito profunda e atinge a polpa, o tratamento de canal pode ser necessário para preservar o dente. Isso é confirmado por avaliação clínica e radiográfica.' },
      { q: 'Sempre uma dor forte significa que preciso de canal?', a: 'Nem sempre. Dor de dente pode ter várias causas. A avaliação com o cirurgião-dentista é indispensável para saber se o tratamento de canal — ou outro tratamento — é o mais adequado.' },
      { q: 'Depois do canal, o dente fica fraco?', a: 'Dentes tratados podem ser mais frágeis, por isso a restauração definitiva e, em alguns casos, a coroa protética são etapas importantes do tratamento.' }
    ],
    relacionados: ['protese-dentaria-presidente-epitacio'],
    textoProfRelacionado:
      'Conheça a profissional da Odonto Clarity que atua em Endodontia.',
    cta: 'Com dor de dente? Agende uma avaliação na Odonto Clarity para entender o seu caso.'
  },

  {
    slug: 'ortodontista-presidente-epitacio',
    nome: 'Ortodontia',
    titulo: 'Ortodontia em Presidente Epitácio',
    kicker: 'Ortodontia',
    resumo:
      'Prevenção e correção de dentes e ossos maxilares mal posicionados, com abordagens preventiva, interceptativa e corretiva, incluindo o uso de aparelho.',
    lead: 'A ortodontia é a especialidade que previne e corrige o posicionamento inadequado dos dentes e dos ossos maxilares.',
    seoTitle: 'Ortodontista em Presidente Epitácio | Odonto Clarity',
    seoDescription:
      'Ortodontia em Presidente Epitácio: saiba quando procurar um ortodontista, como funciona o tratamento com aparelho e quem atua na área na Odonto Clarity.',
    imagem: '/assets/images/servicos/ortodontia.webp',
    imagemHero: '/assets/images/servicos/ortodontia-hero.webp',
    imagemAlt: 'Tratamento ortodôntico com aparelho na Odonto Clarity em Presidente Epitácio',
    oQueE: {
      titulo: 'O que é a ortodontia',
      paragrafos: [
        'A ortodontia é uma especialidade odontológica que atua na correção dos dentes e dos ossos maxilares posicionados de forma inadequada. O tratamento pode atuar de forma preventiva — para evitar problemas que podem surgir, principalmente durante o crescimento ósseo de crianças —, interceptativa — estagnando o desenvolvimento de um problema em andamento — ou corretiva, quando foca na correção de um problema já instalado.',
        'O aparelho dentário é a ferramenta mais conhecida dessa área, utilizado para alinhar os dentes e harmonizar a mordida, sempre a partir de um plano de tratamento individualizado.'
      ]
    },
    indicado: {
      titulo: 'Quando procurar um ortodontista',
      texto: 'A avaliação com o ortodontista é o caminho mais seguro para saber se há necessidade de tratamento. Situações em que costuma ser procurado:',
      itens: [
        'Dentes tortos, apinhados ou com espaços',
        'Mordida cruzada, aberta ou profunda',
        'Dificuldade de mastigação relacionada ao encaixe dos dentes',
        'Avaliação preventiva de crianças em fase de crescimento',
        'Planejamento conjunto com outras áreas da odontologia'
      ]
    },
    comoFunciona: {
      titulo: 'Como funciona o tratamento ortodôntico',
      texto: 'O tratamento começa com um diagnóstico completo e segue por etapas:',
      itens: [
        'Avaliação clínica, radiografias e fotografias para diagnóstico',
        'Apresentação do plano de tratamento ao paciente',
        'Instalação do aparelho (fixo ou removível, conforme o caso)',
        'Consultas periódicas de ajuste e acompanhamento',
        'Fase de contenção após a remoção do aparelho'
      ]
    },
    etapas: [
      { numero: 1, titulo: 'Diagnóstico', texto: 'Exames e análise clínica definem o que precisa ser corrigido e qual a melhor abordagem.' },
      { numero: 2, titulo: 'Planejamento', texto: 'O ortodontista apresenta o plano, os tipos de aparelho possíveis e as etapas do tratamento.' },
      { numero: 3, titulo: 'Instalação do aparelho', texto: 'O aparelho é instalado e o paciente recebe orientações de uso e higiene.' },
      { numero: 4, titulo: 'Manutenção e contenção', texto: 'Ao longo do tratamento há ajustes periódicos. Depois, a contenção ajuda a manter o resultado.' }
    ],
    cuidados: {
      titulo: 'Cuidados durante o tratamento',
      texto: 'A fase ortodôntica exige cuidados específicos:',
      itens: [
        'Escovar os dentes após as refeições, principalmente com aparelho fixo',
        'Usar o fio dental com auxílio adequado para aparelho',
        'Evitar alimentos que possam danificar o aparelho',
        'Comparecer a todos os ajustes agendados'
      ]
    },
    profissionais: ['maria-victoria-de-lima-araujo-miguel'],
    faq: [
      { q: 'Em que idade devo levar meu filho ao ortodontista?', a: 'A avaliação ortodôntica preventiva costuma ser recomendada em fases de crescimento, ainda na infância. O momento ideal é definido pelo ortodontista após avaliação clínica.' },
      { q: 'Todo aparelho é fixo?', a: 'Não. Existem aparelhos fixos e removíveis, e a escolha depende do caso. O tipo de aparelho é definido no diagnóstico e no planejamento.' },
      { q: 'Ortodontia é só para estética?', a: 'A ortodontia também atua na função: alinhamento da mordida, melhora da mastigação e prevenção de desgastes. A harmonia estética costuma vir junto do tratamento.' },
      { q: 'Quanto tempo dura o tratamento?', a: 'A duração varia muito conforme a complexidade e a abordagem escolhidas. É uma informação que só pode ser estimada após o diagnóstico.' }
    ],
    relacionados: ['implante-dentario-presidente-epitacio'],
    textoProfRelacionado:
      'Conheça a profissional da Odonto Clarity que atua em Ortodontia.',
    cta: 'Pensando em avaliar o alinhamento do seu sorriso? Agende uma avaliação na Odonto Clarity.'
  },

  {
    slug: 'clareamento-dental-presidente-epitacio',
    nome: 'Clareamento dental',
    titulo: 'Clareamento dental em Presidente Epitácio',
    kicker: 'Estética Dental',
    resumo:
      'Procedimento estético para reduzir manchas e devolver um tom mais claro e uniforme aos dentes, sempre após avaliação clínica.',
    lead: 'O clareamento dental é um procedimento estético realizado para reduzir manchas e devolver um tom mais claro e uniforme aos dentes.',
    seoTitle: 'Clareamento Dental em Presidente Epitácio | Odonto Clarity',
    seoDescription:
      'Clareamento dental em Presidente Epitácio: entenda como funciona, quais cuidados envolvem e por que a avaliação clínica é indispensável.',
    imagem: '/assets/images/servicos/clareamento-dental.webp',
    imagemHero: '/assets/images/servicos/clareamento-dental-hero.webp',
    imagemAlt: 'Clareamento dental na Odonto Clarity em Presidente Epitácio',
    oQueE: {
      titulo: 'O que é o clareamento dental',
      paragrafos: [
        'O clareamento dental é um procedimento de estética odontológica que utiliza produtos à base de peróxido para reduzir manchas e escurecimento dos dentes, devolvendo um tom mais claro e uniforme ao sorriso.',
        'Os resultados dependem das características de cada caso — como o tipo de mancha e o estado de saúde dos dentes —, por isso a avaliação clínica é fundamental antes de iniciar qualquer clareamento.'
      ]
    },
    indicado: {
      titulo: 'Quando pode ser indicado',
      texto: 'A avaliação é sempre necessária. O procedimento costuma ser avaliado para:',
      itens: [
        'Manchas ou escurecimento causados por alimentos e bebidas',
        'Amarelamento natural dos dentes',
        'Manchas relacionadas ao uso de certos medicamentos (avaliar com o dentista)',
        'Pacientes que buscam um sorriso mais claro'
      ]
    },
    comoFunciona: {
      titulo: 'Como funciona',
      texto: 'O clareamento pode ser feito de formas diferentes, definidas na avaliação:',
      itens: [
        'Avaliação clínica e limpeza prévia dos dentes',
        'Definição da técnica (consultório e/ou caseiro com moldeira)',
        'Aplicação do produto conforme o protocolo',
        'Orientações de cuidados e acompanhamento do resultado'
      ]
    },
    etapas: [
      { numero: 1, titulo: 'Avaliação', texto: 'O dentista avalia a saúde bucal e as causas do escurecimento antes de indicar o clareamento.' },
      { numero: 2, titulo: 'Preparo', texto: 'Higiene profissional e, quando necessário, tratamento de situações pré-existentes.' },
      { numero: 3, titulo: 'Clareamento', texto: 'Aplicação do produto em consultório, em casa ou em combinação, conforme o plano.' },
      { numero: 4, titulo: 'Acompanhamento', texto: 'O dentista acompanha o resultado e orienta os cuidados para prolongar o efeito.' }
    ],
    cuidados: {
      titulo: 'Cuidados e orientações',
      texto: 'Alguns pontos ajudam a preservar o resultado e a saúde bucal:',
      itens: [
        'Seguir rigorosamente as orientações do dentista',
        'Reduzir o consumo de alimentos e bebidas que mancham',
        'Manter a higiene bucal e as consultas de manutenção',
        'Evitar clarear em casa por conta própria, sem acompanhamento'
      ]
    },
    profissionais: [],
    faq: [
      { q: 'Clareamento danifica os dentes?', a: 'O clareamento é um procedimento odontológico que deve ser conduzido por um cirurgião-dentista. Sensibilidade temporária pode ocorrer e costuma ser orientada pelo profissional. Clareamentos feitos por conta própria, sem avaliação, não são recomendados.' },
      { q: 'Quanto tempo dura o resultado?', a: 'Depende dos hábitos do paciente, como dieta e higiene. O dentista orienta sobre como prolongar o efeito durante o acompanhamento.' },
      { q: 'Qualquer pessoa pode clarear?', a: 'Nem sempre. Gestantes, pessoas com doenças bucais ativas ou com sensibilidade podem ter indicações diferentes. A avaliação clínica define o que é seguro para cada paciente.' },
      { q: 'Clareamento clareia restaurações e coroas?', a: 'O clareamento atua no dente natural. Restaurações e coroas não mudam de cor com o clareamento, o que é avaliado no planejamento do caso.' }
    ],
    relacionados: ['implante-dentario-presidente-epitacio'],
    textoProfRelacionado: '',
    cta: 'Quer saber se o clareamento é indicado para o seu caso? Agende uma avaliação na Odonto Clarity.'
  },

  {
    slug: 'protese-dentaria-presidente-epitacio',
    nome: 'Prótese dentária',
    titulo: 'Prótese dentária em Presidente Epitácio',
    kicker: 'Reabilitação Oral',
    resumo:
      'Substituição de dentes ausentes ou reconstrução de dentes danificados por meio de próteses fixas ou removíveis, individualizadas.',
    lead: 'A prótese dentária é a área da odontologia que substitui dentes ausentes ou reconstrói dentes muito danificados, devolvendo função, estética e conforto à mastigação.',
    seoTitle: 'Prótese Dentária em Presidente Epitácio | Odonto Clarity',
    seoDescription:
      'Prótese dentária em Presidente Epitácio: conheça os tipos mais comuns, quando podem ser indicadas e como funciona a reabilitação na Odonto Clarity.',
    imagem: '/assets/images/servicos/protese-dentaria.webp',
    imagemHero: '/assets/images/servicos/protese-dentaria-hero.webp',
    imagemAlt: 'Próteses dentárias apresentadas à paciente na Odonto Clarity em Presidente Epitácio',
    oQueE: {
      titulo: 'O que é a prótese dentária',
      paragrafos: [
        'A prótese dentária é uma área da odontologia voltada à substituição de dentes ausentes ou à reconstrução de dentes comprometidos, por meio de peças protéticas fixas ou removíveis.',
        'A prótese pode responder a necessidades funcionais — como recuperar a mastigação — e estéticas, sempre planejada a partir de uma avaliação clínica e do estado de saúde dos dentes e da boca.'
      ]
    },
    indicado: {
      titulo: 'Quando pode ser indicada',
      texto: 'A avaliação define o tipo de prótese mais adequado a cada caso. Situações comuns:',
      itens: [
        'Ausência de um ou mais dentes',
        'Dentes muito destruídos por cárie ou trauma',
        'Próteses antigas mal adaptadas ou desconfortáveis',
        'Dente tratado com canal que precisa de coroa protética de proteção'
      ]
    },
    comoFunciona: {
      titulo: 'Como funciona o tratamento',
      texto: 'O processo é planejado em etapas, com moldagens e provas até a entrega final:',
      itens: [
        'Avaliação clínica e planejamento do caso',
        'Moldagens e registros para confecção da prótese',
        'Atendimento à preparação do dente ou do implante',
        'Provas e ajustes da peça protética',
        'Instalação da prótese e acompanhamento'
      ]
    },
    etapas: [
      { numero: 1, titulo: 'Planejamento', texto: 'O dentista avalia o caso, define o tipo de prótese e explica as etapas ao paciente.' },
      { numero: 2, titulo: 'Moldagens', texto: 'São feitas as moldagens e os registros que guiam a confecção da prótese.' },
      { numero: 3, titulo: 'Provas', texto: 'A peça é provada e ajustada até obter encaixe, função e estética adequados.' },
      { numero: 4, titulo: 'Instalação e controle', texto: 'A prótese é instalada e o paciente é acompanhado no período seguinte.' }
    ],
    cuidados: {
      titulo: 'Cuidados com a prótese',
      texto: 'A durabilidade e o conforto dependem dos cuidados:',
      itens: [
        'Higienizar a prótese conforme a orientação do dentista',
        'Manter a higiene da boca e dos dentes de apoio',
        'Evitar morder objetos duros que possam danificar a peça',
        'Fazer revisões periódicas com o dentista'
      ]
    },
    profissionais: [],
    faq: [
      { q: 'Qual a diferença entre prótese fixa e removível?', a: 'A prótese fixa é instalada de forma definitiva (como coroas e pontes fixas), enquanto a removível pode ser colocada e retirada pelo paciente. A indicação depende de cada caso.' },
      { q: 'Prótese sobre implante é diferente?', a: 'Sim. Nesse caso a prótese é fixada sobre implantes instalados no osso, em vez de dentes vizinhos. É um tipo de reabilitação comum para dentes perdidos.' },
      { q: 'Uma prótese pode quebrar?', a: 'Peças protéticas podem sofrer danos em situações de impacto ou esforço excessivo. Qualquer dano deve ser avaliado pelo dentista, que orienta sobre reparo ou substituição.' },
      { q: 'Toda prótese precisa de manutenção?', a: 'Sim. O acompanhamento periódico ajuda a manter o encaixe, a função e a saúde dos tecidos ao redor ao longo do tempo.' }
    ],
    relacionados: ['implante-dentario-presidente-epitacio'],
    textoProfRelacionado: '',
    cta: 'Converse com a Odonto Clarity sobre reabilitação do sorriso e agende uma avaliação.'
  }
];

const findBySlug = (slug) => services.find((s) => s.slug === slug);

module.exports = { services, findBySlug };