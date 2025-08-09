import React from 'react';
import '../styles/BenefitModal.css';

const BenefitModal = ({ onConfirm }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>혜택 수령 여부</h3>
        <button className="confirm-btn" onClick={onConfirm}>완료</button>
      </div>
    </div>
  );
};

export default BenefitModal;
