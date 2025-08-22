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
      className="applied-service-card"
      onClick={() => onClickCard?.(service)}
    >
      <div className="service-header">
        <p className="service-category">{service.department || '[생애주기]'}</p>
        <button className="option-button">...</button>
      </div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-info">
        담당부처&nbsp;&nbsp;{service.department || '정보 없음'}
      </p>
      <p className="service-info">
        신청 일자&nbsp;&nbsp;{service.appliedAt}
      </p>
      <p className="service-content">{service.content}</p>
      <div className="button-container">
        <button
          className="benefit-button"
          onClick={(e) => {
            e.stopPropagation();
            onClickBenefit?.(service);
          }}
        >
          혜택 수령 완료
        </button>
        <button
          className="status-button"
          onClick={(e) => {
            e.stopPropagation();
            onClickStatus?.(service);
          }}
        >
          신청 현황 보기
        </button>
      </div>
    </div>
  );
};

export default AppliedServiceCard;