// @ts-check
import { defineConfig } from 'astro/config';

// TODO Mano : renseigner l'URL finale du site (sert aux balises Open Graph).
// Sur GitHub Pages avec un dépôt nommé autrement que <pseudo>.github.io,
// renseigner aussi BASE_PATH (ex. "/portfolio").
export default defineConfig({
  site: process.env.SITE_URL || 'https://example.github.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
});
