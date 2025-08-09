import React from 'react';
import './ReceivedServiceCard.css';

const ReceivedServiceCard = ({ service, onClickCard, onClickStatus }) => {
  return (
    <div
      className="received-card"
      onClick={() => onClickCard?.(service)}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-header">
        <span className="service-title">{service.title}</span>
        <span className="status">수령 완료</span>
      </div>
      <div className="card-body">
        <p>신청 일자: {service.date}</p>
        <p>혜택 내용</p>
        <p>{service.title} 혜택 수령 완료</p>
      </div>
      <button
        className="status-btn"
        onClick={(e) => {
          e.stopPropagation();
          onClickStatus?.(service);
        }}
      >
        신청 현황 보기
      </button>
    </div>
  );
};

export default ReceivedServiceCard;
