import React from 'react';
import { Vocabulary } from '../types/vocabulary';

interface Props {
  vocab: Vocabulary;
  onDelete: (vocab: Vocabulary) => void;
  onEdit: (vocab: Vocabulary) => void;
}

function VocabularyItem(props: Props) {
  const { vocab, onDelete, onEdit } = props;

  return (
    <div className='flex justify-between items-center mt-4 ml-8 mr-8 p-2 bg-white rounded shadow'>
      <div className='text-[18px] font-medium'>
        <strong>{vocab.english}</strong>: {vocab.vietnamese}
      </div>
      <div className='flex gap-4 text-[18px]'>
        <button onClick={() => onEdit(vocab)}>Sửa</button>
        <button onClick={() => onDelete(vocab)}>Xóa</button>
      </div>
    </div>
  );
}

export default VocabularyItem;
