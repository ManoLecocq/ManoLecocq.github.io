// Interaction « Prouve-le ».
// Le HTML arrive avec toutes les preuves dépliées (lisible sans JS).
// Ce script les replie, active les boutons et tient le compteur à jour.
const claims = [...document.querySelectorAll('[data-claim]')];
const bar = document.querySelector('[data-verif]');

if (claims.length && bar) {
  const nEl = bar.querySelector('[data-verif-n]');
  const gauge = bar.querySelector('[data-verif-bar]');
  const next = bar.querySelector('[data-verif-next]');
  const done = bar.querySelector('[data-verif-done]');
  const vus = new Set();
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const parts = (claim) => ({
    btn: claim.querySelector('.claim__btn'),
    piece: claim.querySelector('.piece'),
    close: claim.querySelector('.piece__close'),
  });

  function majCompteur() {
    nEl.textContent = String(vus.size);
    gauge.style.width = `${(vus.size / claims.length) * 100}%`;
    if (vus.size === claims.length) {
      bar.classList.add('is-done');
      done.hidden = false;
    }
  }

  function ouvrir(claim, { focus = true } = {}) {
    const { btn, piece } = parts(claim);
    piece.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    if (focus) piece.focus({ preventScroll: true });
    piece.scrollIntoView({ block: 'nearest', behavior: reduced() ? 'auto' : 'smooth' });
    if (!vus.has(claim.dataset.claim)) {
      vus.add(claim.dataset.claim);
      claim.classList.add('is-verified');
      majCompteur();
    }
  }

  function fermer(claim) {
    const { btn, piece } = parts(claim);
    piece.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    btn.focus();
  }

  claims.forEach((claim) => {
    const { btn, piece, close } = parts(claim);
    btn.hidden = false;
    close.hidden = false;
    btn.setAttribute('aria-expanded', 'false');
    piece.hidden = true;

    btn.addEventListener('click', () => (piece.hidden ? ouvrir(claim) : fermer(claim)));
    close.addEventListener('click', () => fermer(claim));
    piece.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        fermer(claim);
      }
    });
  });

  // « Suivante » : amène à la prochaine affirmation pas encore ouverte.
  next.addEventListener('click', () => {
    const cible = claims.find((c) => !vus.has(c.dataset.claim));
    if (!cible) return;
    cible.scrollIntoView({ block: 'center', behavior: reduced() ? 'auto' : 'smooth' });
    parts(cible).btn.focus({ preventScroll: true });
  });

  // Un lien direct vers une affirmation (#affirmation-xxx) l'ouvre.
  const depuisHash = () => {
    const claim = document.getElementById(decodeURIComponent(location.hash.slice(1)))?.closest('[data-claim]');
    if (claim) ouvrir(claim, { focus: false });
  };
  window.addEventListener('hashchange', depuisHash);
  depuisHash();

  bar.hidden = false;
  document.body.classList.add('has-verif');
}
