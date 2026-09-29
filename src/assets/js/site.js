(function () {
  'use strict';

  // ---------- Header: sombra ao rolar -------------
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 12);
    }, { passive: true });
  }

  // ---------- Menu mobile -------------
  var mobileMenu = document.getElementById('mobileMenu');
  var navLinks = document.getElementById('navLinks');

  function closeMobileMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('active');
    if (mobileMenu) {
      mobileMenu.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-label', 'Abrir menu');
      mobileMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
  }

  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', function () {
      var open = navLinks.classList.toggle('active');
      mobileMenu.setAttribute('aria-expanded', String(open));
      mobileMenu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      mobileMenu.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    document.querySelectorAll('.nav-links a').forEach(function (anchor) {
      anchor.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', function (event) {
      if (!navLinks.contains(event.target) && !mobileMenu.contains(event.target)) {
        closeMobileMenu();
      }
    });
  }

  // ---------- Animação de revelação on-scroll -------------
  var revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' })
    : null;

  document.querySelectorAll('.reveal').forEach(function (el) {
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add('visible');
  });

  // ---------- Status aberto/fechado (somente onde existe) -------------
  var statusBadge = document.getElementById('statusBadge');
  var statusText = document.getElementById('statusText');

  function clinicNow() {
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Sao_Paulo', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
    }).formatToParts(new Date());
    var data = {};
    parts.forEach(function (p) { data[p.type] = p.value; });
    return { weekday: data.weekday, hour: Number(data.hour), minute: Number(data.minute) };
  }

  // Horários da clínica em minutos desde 00:00 (1 = segunda ... 7 = domingo).
  // Fonte: site.openingHours em src/lib/site.cjs.
  var OPENING_HOURS = {
    1: [540, 1140], // segunda 09:00 - 19:00
    2: [540, 1200], // terça   09:00 - 20:00
    3: [540, 1200], // quarta  09:00 - 20:00
    4: [540, 1140], // quinta  09:00 - 19:00
    5: [540, 1140]  // sexta   09:00 - 19:00
  };
  var WEEKDAY_INDEX = { Sun: 7, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  function updateBusinessStatus() {
    if (!statusBadge || !statusText) return;
    var now = clinicNow();
    var current = now.hour * 60 + now.minute;
    var window_ = OPENING_HOURS[WEEKDAY_INDEX[now.weekday]];
    var isOpen = !!window_ && current >= window_[0] && current < window_[1];

    if (isOpen) {
      statusBadge.style.background = '#eaf8ef';
      statusBadge.style.color = '#16763c';
      statusText.textContent = 'Aberto agora';
    } else {
      statusBadge.style.background = '#fff0f0';
      statusBadge.style.color = '#9b1c1c';
      statusText.textContent =
        WEEKDAY_INDEX[now.weekday] === 6 || WEEKDAY_INDEX[now.weekday] === 7
          ? 'Fechado no momento · a clínica não atende aos fins de semana'
          : 'Fechado no momento · atendimento a partir das 09:00';
    }
  }

  updateBusinessStatus();
  setInterval(updateBusinessStatus, 60000);

  // ---------- Ano do rodapé -------------
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Formulário de contato → WhatsApp -------------
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = document.getElementById('f-nome') ? document.getElementById('f-nome').value.trim() : '';
      var telefone = document.getElementById('f-telefone') ? document.getElementById('f-telefone').value.trim() : '';
      var mensagem = document.getElementById('f-mensagem') ? document.getElementById('f-mensagem').value.trim() : '';

      var texto = 'Olá! Encontrei a Odonto Clarity pelo site e gostaria de solicitar atendimento.';
      if (nome) texto += '\n\nMeu nome: ' + nome;
      if (telefone) texto += '\nMeu telefone: ' + telefone;
      if (mensagem) texto += '\nMensagem: ' + mensagem;

      var url = 'https://wa.me/5518996782225?text=' + encodeURIComponent(texto);
      window.open(url, '_blank', 'noopener');
    });
  }
})();