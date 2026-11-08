// Lecture des fichiers de contenu (YAML) au moment du build.
import fs from 'node:fs';
import path from 'node:path';
import { load as parseYaml } from 'js-yaml';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

export function load(name) {
  const file = path.join(CONTENT_DIR, `${name}.yaml`);
  return parseYaml(fs.readFileSync(file, 'utf8'));
}

// Vrai si un fichier existe dans public/ (ex. le CV en PDF).
export function publicFileExists(relPath) {
  return fs.existsSync(path.join(process.cwd(), 'public', relPath));
}
