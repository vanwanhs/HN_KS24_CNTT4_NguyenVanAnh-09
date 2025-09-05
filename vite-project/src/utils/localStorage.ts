import { Vocabulary } from '../types/vocabulary';

const STORAGE_KEY = 'vocabularies';

export function getVocabularies(): Vocabulary[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveVocabularies(vocabularies: Vocabulary[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vocabularies));
}
