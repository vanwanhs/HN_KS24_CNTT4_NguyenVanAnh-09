import React from 'react';
import { Vocabulary } from '../types/vocabulary';

interface Props {
  vocab: Vocabulary;
  onDelete: (vocab: Vocabulary) => void;
  onEdit: (vocab: Vocabulary) => void;
}

const VocabularyItem: React.FC<Props> = ({ vocab, onDelete, onEdit }) => {
  return (
    <div className='flex mt-4 ml-30'>
      <div className='flex gap-29.5 text-[20px]'><strong>{vocab.english}</strong> :  {vocab.vietnamese}</div>
      <div className='flex gap-5 ml-120 text-[20px]'>
        <button onClick={() => onEdit(vocab)}>Sửa</button>
      <button onClick={() => onDelete(vocab)}>Xóa</button>
      </div>
    </div>
  );
};

export default VocabularyItem;