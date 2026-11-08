# Portfolio · Mano Lecocq

Site statique (Astro) pour les recruteurs : expérience, 4 réalisations, stack, certifications, contact. Chaque réalisation liste des affirmations, et chacune a un bouton **Voir la preuve** qui ouvre un extrait des documents de projet.

## Lancer en local

Il faut Node.js 22.23.4 ou plus récent.

```bash
npm install
npm run dev        # http://localhost:4321, rechargement automatique
npm run build      # génère le site dans dist/
npm run preview    # sert dist/ pour vérifier la version finale
```

## Modifier le contenu

Tout le texte est dans `src/content/`. Il n'y a pas besoin de toucher aux composants.

| Fichier | Contenu |
|---|---|
| `site.yaml` | Nom, balises meta, chemin du CV, menu, bloc contact |
| `accueil.yaml` | Hero : rôle, situation, les 3 chiffres du bloc noir, la ligne DoppelNet, libellés des boutons |
| `experience.yaml` | Alternance et stage Thales, phrase de confidentialité, formation |
| `realisations.yaml` | Les 4 fiches (contexte, ce que j'ai fait, résultat, stack, preuves, détails) et « Autres projets » |
| `affirmations.yaml` | Les 12 affirmations « Voir la preuve » et leurs extraits |
| `stack.yaml` | Les outils par domaine, avec l'endroit où ils ont servi |
| `certifications.yaml` | `status: obtenu` est affiché, `status: en cours` apparaît en « En préparation », `status: masque` n'apparaît pas |
| `competences.yaml` | La matrice compétences du BUT × projets, affichée sur `/but` |

La page `/but` (matrice pour l'IUT) n'est liée nulle part et porte `noindex`. Il faut donner son adresse directement.

Dans les textes :
- `` `code` `` s'affiche en police mono ;
- `**gras**` s'affiche en gras ;
- `[texte](#ancre)` fait un lien.

Une phrase qui contient « : » doit être mise entre guillemets, sinon YAML la lit comme une clé.

### Les champs `todo`

Ils écrivent un commentaire `<!-- TODO Mano : … -->` dans la page générée, sans rien afficher. Pour retrouver ceux qui restent :

```bash
grep -rn "TODO Mano\|todo:" src/
```

### Ajouter une affirmation

1. Ajouter une entrée dans `affirmations.yaml`, avec un `id`, une `phrase`, des `blocs`, `montre` et `source`.
2. Citer son `id` dans la liste `preuves` d'une fiche de `realisations.yaml`.

Le nombre « N preuves vérifiables » de la fiche se met à jour tout seul. **Règle à garder : une preuve doit venir d'un vrai document. On n'invente ni log, ni sortie de commande.**

### Fichiers à déposer

- `public/cv/CV_Mano_Lecocq.pdf` : les boutons CV pointent vers ce fichier. Tant qu'il manque, ils mènent à une 404 et le build affiche un avertissement.
- `public/og-image.png` : l'image de partage (1200×630). Il y en a déjà une, générée.

## Déployer

### GitHub Pages

1. Pousser le dépôt sur GitHub, sur la branche `main`.
2. Dans le dépôt, aller dans *Settings → Pages → Source* et choisir **GitHub Actions**.
3. Le workflow `.github/workflows/deploy.yml` construit le site et le publie à chaque push. Il calcule seul l'URL et le sous-chemin (`/nom-du-depot`).

### Netlify

Importer le dépôt. `netlify.toml` contient déjà la commande et le dossier de sortie. Il reste à y mettre la vraie URL dans `SITE_URL`.

### Variables de build

| Variable | Rôle | Exemple |
|---|---|---|
| `SITE_URL` | URL absolue, utilisée par Open Graph | `https://mano.github.io` |
| `BASE_PATH` | Sous-chemin si le site n'est pas à la racine | `/portfolio` |

## Choix techniques

- **Astro** génère le HTML au build. Sans JavaScript, toutes les preuves sont lisibles, dépliées. Le JS ne fait que replier les preuves, piloter la matrice de `/but` et assembler l'email.
- **Polices en local** via `@fontsource` : Host Grotesk (titres et texte) et DM Mono (labels techniques). Aucun appel à Google, aucune police à empattements : la pile de secours se termine par `sans-serif`.
- **Couleurs** : deux neutres (clair, quasi noir) et un accent bleu, définis dans `src/styles/tokens.css`.
- **Accessibilité** :
  - les boutons « Voir la preuve » ont `aria-expanded` et `aria-controls` ;
  - Échap referme une preuve et rend le focus au bouton ;
  - `prefers-reduced-motion` coupe toutes les transitions ;
  - les cibles tactiles font au moins 44 px.
- Les PDF de `sources/` ne sont pas publiés (ils sont dans `.gitignore`).
