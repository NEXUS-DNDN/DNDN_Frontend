import React from 'react';
import './ReceivedServiceCard.css';

const ReceivedServiceCard = ({ service, onClickCard, onClickStatus }) => {
  const getStatusText = (status) => {
    switch (status) {
      case 'inUse':
        return '이용 중';
      case 'received':
        return '수령 완료';
      case 'expired':
        return '기간 종료';
      default:
        return '상태 없음';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'inUse':
        return 'status-in-use';
      case 'received':
        return 'status-received';
      case 'expired':
        return 'status-expired';
      default:
        return '';
    }
  };

  return (
    <div
      className="received-card"
      onClick={() => onClickCard?.(service)}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-header">
        <div className="service-info-left">
          <div className="service-category">
            <span className="category-label">{service.category}</span>
          </div>
          <span className="service-title">{service.title}</span>
        </div>
        <span className={`status ${getStatusClass(service.status)}`}>
          {getStatusText(service.status)}
        </span>
      </div>

      <div className="card-body">
        <p>신청 일자: {service.date}</p>
        <p>혜택 내용: {service.benefit}</p>
        <p>사용 기간: {service.usagePeriod}</p>
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