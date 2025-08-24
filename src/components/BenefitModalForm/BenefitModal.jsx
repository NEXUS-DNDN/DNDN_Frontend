import React from 'react';
import './BenefitModal.css';

const BenefitModal = ({ onConfirm, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">혜택을 수령하셨나요?</h3>
        <p className="modal-description">혜택을 수령했거나, 수령 중이라면 수령 완료를 선택해주세요</p>
        <button className="confirm-btn" onClick={onConfirm}>수령 완료</button>
        <button className="close-btn" onClick={onClose}>아직 수령 전이에요</button>
      </div>
    </div>
  );
};

export default BenefitModal;