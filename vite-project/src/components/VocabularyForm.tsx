import React, { useState, useEffect } from 'react';
import { CirclePlus } from "lucide-react";
import { Vocabulary } from '../types/vocabulary';

interface Props {
  onSubmit: (vocab: Vocabulary) => void;
  editing?: Vocabulary | null;
  onCancelEdit?: () => void;
  existingEnglishWords: string[];
}

const VocabularyForm: React.FC<Props> = ({ onSubmit, editing, onCancelEdit, existingEnglishWords }) => {
  const [english, setEnglish] = useState('');
  const [vietnamese, setVietnamese] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editing) {
      setEnglish(editing.english);
      setVietnamese(editing.vietnamese);
    }
  }, [editing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!english.trim() || !vietnamese.trim()) {
      return setError('Không được để trống!');
    }

    if (
      existingEnglishWords.includes(english.toLowerCase()) &&
      (!editing || editing.english.toLowerCase() !== english.toLowerCase())
    ) {
      return setError('Từ tiếng Anh đã tồn tại!');
    }

    onSubmit({
      id: editing ? editing.id : crypto.randomUUID(),
      english,
      vietnamese,
    });
    setEnglish('');
    setVietnamese('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className='flex mt-8 ml-30 text-green-500 text-[24px] font-semibold  '>
        <CirclePlus
        size={40}
        /> {editing ? 'Cập nhật từ vựng' : 'Thêm từ mới'}
    </div>
      <div className=' flex mt-4 ml-30 gap-4'>
        <input className='bg-gray-100 p-2 border border-black' size={40} value={english} onChange={e => setEnglish(e.target.value)} placeholder="English" />
      <input className='bg-gray-100 p-2 border border-black' size={40} value={vietnamese} onChange={e => setVietnamese(e.target.value)} placeholder="Tiếng Việt" />
      <button className='p-2 bg-green-500' type="submit">{editing ? 'Cập nhật' : 'Thêm'}</button>
      {editing && <button onClick={onCancelEdit}>Hủy</button>}
      </div>
      <div className='flex mt-0 ml-30'> {error && <p style={{ color: 'red' }}>{error}</p>}</div>
    </form>
  );
};

export default VocabularyForm;