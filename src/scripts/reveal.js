// Apparition au scroll des éléments [data-reveal] et [data-draw].
// Sans IntersectionObserver ou avec prefers-reduced-motion, tout est affiché d'emblée.
const targets = document.querySelectorAll('[data-reveal], [data-draw]');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Longueur réelle des traits SVG, pour que l'effet de dessin soit juste.
document.querySelectorAll('[data-draw]').forEach((svg) => {
  svg.querySelectorAll('path, line, polyline').forEach((el) => {
    if (typeof el.getTotalLength === 'function') {
      el.style.setProperty('--len', Math.ceil(el.getTotalLength()));
    }
  });
});

if (reduced || !('IntersectionObserver' in window)) {
  targets.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
  );
  targets.forEach((el) => io.observe(el));
}
