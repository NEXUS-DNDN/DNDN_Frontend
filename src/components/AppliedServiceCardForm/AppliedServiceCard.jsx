import React from 'react';
import './AppliedServiceCard.css';

const AppliedServiceCard = ({
  service,
  onClickCard,
  onClickBenefit,
  onClickStatus,
}) => {
  return (
    <div
      className="service-box"
      onClick={() => onClickCard?.(service)}
      style={{ cursor: 'pointer' }}
    >
      <div className="service-title">{service.title}</div>
      <div className="service-date">신청 일자: {service.date}</div>

      <button
        className="benefit-btn"
        onClick={(e) => {
          e.stopPropagation();
          onClickBenefit?.(service);
        }}
      >
        혜택 수령 여부
      </button>

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

export default AppliedServiceCard;
