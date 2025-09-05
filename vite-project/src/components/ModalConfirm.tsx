import React from 'react';

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalConfirm: React.FC<Props> = ({ visible, onConfirm, onCancel }) => {
  if (!visible) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <p>Bạn có chắc chắn muốn xóa?</p>
        <button onClick={onConfirm}>Xóa</button>
        <button onClick={onCancel}>Hủy</button>
      </div>
    </div>
  );
};

export default ModalConfirm;