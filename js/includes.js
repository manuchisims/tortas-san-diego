async function incluir(id, url) {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const r = await fetch(url);
    if (r.ok) el.outerHTML = await r.text();
  } catch (e) { console.error('No se pudo cargar', url, e); }
}

function iniciarNav() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!navbar || !toggle || !links) return;

  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle.addEventListener('click', () => {
    const abierto = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', abierto);
  });

  const esMovil = () => window.matchMedia('(max-width: 900px)').matches;

  // En móvil: tocar "Galería" o "Cumpleaños ▸" despliega en vez de navegar
  links.querySelectorAll('.dropbtn, .dropdown-submenu > a').forEach(a => {
    a.addEventListener('click', e => {
      if (!esMovil()) return;
      const padre = a.parentElement;
      if (!padre.classList.contains('open')) {
        e.preventDefault();
        padre.classList.add('open');
      } // segundo toque: navega a la página de la categoría
    });
  });

  // Tocar cualquier otro enlace cierra el menú
  links.querySelectorAll('a').forEach(a => {
    if (a.matches('.dropbtn, .dropdown-submenu > a')) return;
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

Promise.all([
  incluir('site-header', '/partials/header.html'),
  incluir('site-footer', '/partials/footer.html')
]).then(iniciarNav);
