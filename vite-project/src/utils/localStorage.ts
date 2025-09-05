
import { Vocabulary } from '../types/vocabulary';

const STORAGE_KEY = 'vocabularies';

export const getVocabularies = (): Vocabulary[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveVocabularies = (vocabularies: Vocabulary[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vocabularies));
};
