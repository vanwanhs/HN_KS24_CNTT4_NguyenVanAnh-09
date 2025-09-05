import React from 'react';
import { Vocabulary } from '../types/vocabulary';
import VocabularyItem from './VocabularyItem';

interface Props {
  vocabularies: Vocabulary[];
  onDelete: (v: Vocabulary) => void;
  onEdit: (v: Vocabulary) => void;
}

const VocabularyList: React.FC<Props> = ({ vocabularies, onDelete, onEdit }) => {
  return (
    <div>
      {vocabularies.length === 0 ? (
        <p className='flex mt-4 ml-30 text-[30px] text-red-600'>Không có từ vựng nào.</p>
      ) : (
        vocabularies.map(v => (
          <VocabularyItem key={v.id} vocab={v} onDelete={onDelete} onEdit={onEdit} />
        ))
      )}
    </div>
  );
};

export default VocabularyList;