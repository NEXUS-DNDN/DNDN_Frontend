import React from 'react';
import './ReceivedServiceCard.css';

const ReceivedServiceCard = ({
  service,
  onClickCard,
  onClickStatus,
  onClickPlus,
}) => {
  return (
    <div
      className="received-service-card"
      onClick={() => onClickCard?.(service)}
      style={{ cursor: 'pointer' }}
    >
      <div className="service-header">
        <span className="service-category">{service.department || '[생애주기]'}</span>
      </div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-info">
        신청 일자&nbsp;&nbsp;{service.appliedAt}
      </p>
      <p className="service-content">{service.content}</p>
      <div className="button-container">
        <button
          className="status-button"
          onClick={(e) => {
            e.stopPropagation();
            onClickStatus?.(service);
          }}
        >
          신청 현황 보기
        </button>
        <button
          className="option-button"
          onClick={(e) => {
            e.stopPropagation();
            onClickPlus?.(service);
          }}
        >
          ...
        </button>
      </div>
    </div>
  );
};

export default ReceivedServiceCard;