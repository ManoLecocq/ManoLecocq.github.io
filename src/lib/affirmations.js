// Index des affirmations : numéro d'ordre (01, 02…) et total.
import { load } from './data.js';

const liste = load('affirmations');
export const total = liste.length;

export function getAffirmation(id) {
  const i = liste.findIndex((a) => a.id === id);
  if (i === -1) throw new Error(`Affirmation inconnue : ${id}`);
  return { ...liste[i], num: String(i + 1).padStart(2, '0') };
}
