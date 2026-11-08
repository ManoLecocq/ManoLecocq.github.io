# Portfolio · Mano Lecocq

Site statique (Astro) qui répond à une question : *comment prouver qu'on est prêt pour la production quand on a surtout travaillé sur des maquettes ?* Chaque affirmation du site a un bouton **Prouve-le** qui ouvre sa pièce justificative, tirée des documents de projet.

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
| `site.yaml` | Nom, accroche, problématique, contact, sommaire |
| `constat.yaml` | Planche 01 : le tableau maquette / production et le texte |
| `preuves.yaml` | Planche 02 : les 4 types de preuves et leurs affirmations |
| `affirmations.yaml` | Les 12 affirmations « Prouve-le » et leurs pièces jointes |
| `projets.yaml` | Planche 03 : les 4 fiches, les vignettes, le CV vidéo |
| `competences.yaml` | Planche 04 : la matrice compétences × projets |
| `certifications.yaml` | Planche 05 : `status: obtenu` est affiché, `status: en cours` ne l'est pas |
| `parcours.yaml` | Planche 06 : études et expériences |
| `reponse.yaml` | Planche 07 : conclusion, limites, prochaines étapes |

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
2. Citer son `id` dans `preuves.yaml` (liste `affirmations`) ou dans une fiche de `projets.yaml`.

Le compteur se met à jour tout seul. **Règle à garder : une preuve doit venir d'un vrai document. On n'invente ni log, ni sortie de commande.**

### Fichiers à déposer

- `public/cv/CV_Mano_Lecocq.pdf` : les liens « CV » apparaissent dès que ce fichier existe.
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

- **Astro** génère le HTML au build. Sans JavaScript, toutes les preuves sont lisibles, dépliées. Le JS (environ 3 Ko) ne fait que replier les pièces, tenir le compteur, piloter la matrice et assembler l'email.
- **Polices en local** via `@fontsource` : Archivo (titres), Atkinson Hyperlegible Next (texte), IBM Plex Mono (labels). Aucun appel à Google.
- **Couleurs** : tout passe par les variables de `src/styles/tokens.css`. Un thème sombre pourra redéfinir ce bloc sans toucher aux composants.
- **Accessibilité** :
  - les boutons « Prouve-le » ont `aria-expanded` et `aria-controls` ;
  - Échap referme une pièce et rend le focus au bouton ;
  - le compteur est en `aria-live` ;
  - `prefers-reduced-motion` coupe toutes les animations ;
  - les cibles tactiles font au moins 44 px.
- Les PDF de `sources/` ne sont pas publiés (ils sont dans `.gitignore`).
