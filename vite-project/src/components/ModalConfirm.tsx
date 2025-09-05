import React from 'react';

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ModalConfirm(props: Props) {
  if (!props.visible) return null;

  return (
    <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <p className="mb-4">Bạn có chắc chắn muốn xóa?</p>
        <button className="bg-red-600 text-white px-4 py-2 mr-2" onClick={props.onConfirm}>Xóa</button>
        <button className="bg-gray-300 px-4 py-2" onClick={props.onCancel}>Hủy</button>
      </div>
    </div>
  );
}

export default ModalConfirm;
