import React, { useState, useEffect } from 'react';
import { CirclePlus } from "lucide-react";
import { Vocabulary } from '../types/vocabulary';

interface Props {
  onSubmit: (vocab: Vocabulary) => void;
  editing?: Vocabulary | null;
  onCancelEdit?: () => void;
  existingEnglishWords: string[];
}

function VocabularyForm(props: Props) {
  const [english, setEnglish] = useState('');
  const [vietnamese, setVietnamese] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (props.editing) {
      setEnglish(props.editing.english);
      setVietnamese(props.editing.vietnamese);
    }
  }, [props.editing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!english.trim() || !vietnamese.trim()) {
      return setError('Không được để trống!');
    }

    if (
      props.existingEnglishWords.includes(english.toLowerCase()) &&
      (!props.editing || props.editing.english.toLowerCase() !== english.toLowerCase())
    ) {
      return setError('Từ tiếng Anh đã tồn tại!');
    }

    props.onSubmit({
      id: props.editing ? props.editing.id : crypto.randomUUID(),
      english,
      vietnamese,
    });

    setEnglish('');
    setVietnamese('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex mt-8 ml-8 text-green-500 text-[24px] font-semibold'>
        <CirclePlus size={40} /> {props.editing ? 'Cập nhật từ vựng' : 'Thêm từ mới'}
      </div>
      <div className='flex mt-4 ml-8 gap-4'>
        <input className='bg-gray-100 p-2 border border-black' size={40} value={english} onChange={e => setEnglish(e.target.value)} placeholder="English" />
        <input className='bg-gray-100 p-2 border border-black' size={40} value={vietnamese} onChange={e => setVietnamese(e.target.value)} placeholder="Tiếng Việt" />
        <button className='p-2 bg-green-500 text-white' type="submit">{props.editing ? 'Cập nhật' : 'Thêm'}</button>
        {props.editing && <button type="button" onClick={props.onCancelEdit}>Hủy</button>}
      </div>
      <div className='flex mt-1 ml-8'>{error && <p className="text-red-500">{error}</p>}</div>
    </form>
  );
}

export default VocabularyForm;
