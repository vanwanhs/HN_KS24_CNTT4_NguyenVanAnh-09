import React, { useState, useEffect } from 'react';
import { BookOpen,List} from "lucide-react";
import { Vocabulary } from './types/vocabulary';
import VocabularyForm from './components/VocabularyForm';
import VocabularyList from './components/VocabularyList';
import ModalConfirm from './components/ModalConfirm';
import { getVocabularies, saveVocabularies } from './utils/localStorage';

const App: React.FC = () => {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [vocabToDelete, setVocabToDelete] = useState<Vocabulary | null>(null);
  const [editingVocab, setEditingVocab] = useState<Vocabulary | null>(null);

  useEffect(() => {
    setVocabularies(getVocabularies());
  }, []);

  const handleAddOrUpdate = (vocab: Vocabulary) => {
    setVocabularies(prev => {
      const updated = editingVocab
        ? prev.map(v => (v.id === vocab.id ? vocab : v))
        : [...prev, vocab];
      saveVocabularies(updated);
      return updated;
    });
    setEditingVocab(null);
  };

  const handleDelete = () => {
    if (!vocabToDelete) return;
    const updated = vocabularies.filter(v => v.id !== vocabToDelete.id);
    setVocabularies(updated);
    saveVocabularies(updated);
    setVocabToDelete(null);
  };

  return (
    <div className="container bg-gray-200 rounded-2xl">
      <div className='bg-white h-screen '>
        <div>
        <h1 className='flex items-center justify-center text-center text-[24px] font-semibold bg-green-500 mt-10 mx-10 rounded-3xl h-[100px] text-white'>
        <BookOpen size={45}
        className=''
      />Quản lý từ vựng</h1>
      </div>
      <VocabularyForm
        onSubmit={handleAddOrUpdate}
        editing={editingVocab}
        onCancelEdit={() => setEditingVocab(null)}
        existingEnglishWords={vocabularies.map(v => v.english.toLowerCase())}
      />
      <div  className='flex mt-4 ml-30 text-[30px] text-green-600 '>
        <List 
        size={35}
        className='mt-2'
        />
        <p>Danh sách từ vựng</p>
      </div>
      <VocabularyList
        vocabularies={vocabularies}
        onDelete={setVocabToDelete}
        onEdit={setEditingVocab}
      />
      <ModalConfirm
        visible={!!vocabToDelete}
        onConfirm={handleDelete}
        onCancel={() => setVocabToDelete(null)}
      />
      </div>
    </div>
  );
};

export default App;
