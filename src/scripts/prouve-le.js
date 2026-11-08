// « Voir la preuve ».
// Le HTML arrive avec toutes les preuves dépliées (lisible sans JS).
// Ce script les replie et active les boutons.
const claims = [...document.querySelectorAll('[data-claim]')];

if (claims.length) {
  document.documentElement.classList.add('js-proofs');

  const parts = (claim) => ({
    btn: claim.querySelector('.claim__btn'),
    proof: claim.querySelector('.proof'),
  });

  const ouvrir = (claim, { focus = true } = {}) => {
    const { btn, proof } = parts(claim);
    proof.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    if (focus) proof.focus({ preventScroll: true });
  };

  const fermer = (claim) => {
    const { btn, proof } = parts(claim);
    proof.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    btn.focus();
  };

  claims.forEach((claim) => {
    const { btn, proof } = parts(claim);
    btn.hidden = false;
    btn.setAttribute('aria-expanded', 'false');
    proof.hidden = true;

    btn.addEventListener('click', () => (proof.hidden ? ouvrir(claim) : fermer(claim)));
    proof.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        fermer(claim);
      }
    });
  });

  // Un lien direct vers une affirmation (#affirmation-xxx) l'ouvre.
  const depuisHash = () => {
    const cible = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    const claim = cible?.closest('[data-claim]');
    if (claim) ouvrir(claim, { focus: false });
  };
  window.addEventListener('hashchange', depuisHash);
  depuisHash();
}
