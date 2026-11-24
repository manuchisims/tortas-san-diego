async function incluir(id, url) {
  const el = document.getElementById(id);
  if (!el) return;
  const r = await fetch(url);
  el.outerHTML = await r.text();
}

Promise.all([
  incluir('site-header', '/partials/header.html'),
  incluir('site-footer', '/partials/footer.html')
]).then(() => {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20));
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));
});

(function () {
  var links = document.getElementById('navLinks');
  if (!links) return;

  var esMovil = function () { return window.matchMedia('(max-width: 680px)').matches; };

  links.querySelectorAll('.dropbtn, .dropdown-submenu > a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (!esMovil()) return;
      var padre = a.parentElement;
      if (!padre.classList.contains('open')) {
        e.preventDefault();
        padre.classList.add('open');
      }
    });
  });
})();
