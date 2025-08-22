// src/components/DeleteConfirmModalForm/DeleteConfirmModal.jsx
import React from 'react';
import './DeleteConfirmModal.css';

const DeleteConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>내역을 삭제할까요?</h3>
        <p>내역이 전체 삭제되며, 복구하실 수 없습니다. 혜택 수령 완료 내역을 삭제하시겠습니까?</p>
        <div className="button-group">
          <button className="cancel-btn" onClick={onCancel}>
            취소
          </button>
          <button className="delete-btn" onClick={onConfirm}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;