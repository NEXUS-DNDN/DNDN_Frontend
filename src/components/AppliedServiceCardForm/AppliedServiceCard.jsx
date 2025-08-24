import React from 'react';
import './AppliedServiceCard.css';

const AppliedServiceCard = ({
  service,
  onClickCard,
  onClickBenefit,
  onClickStatus,
}) => {
  // ✅ 영문 생애주기 키워드를 한글로 매핑하는 객체
  const lifeCycleMap = {
    'INFANT': '영유아',
    'CHILD': '아동',
    'TEENAGER': '청소년',
    'YOUTH': '청년',
    'MIDDLE': '중장년',
    'SENIOR': '노년',
    'PREGNANT': '임신/출산',
  };

  const renderLifeCycles = (lifeCycles) => {
    if (lifeCycles && lifeCycles.length > 0) {
      // ✅ map() 함수를 사용하여 각 영문 키워드를 한글로 변환
      const koreanLifeCycles = lifeCycles.map(key => lifeCycleMap[key] || key);
      return koreanLifeCycles.join(' | ');
    }
    return '[생애주기]';
  };

  return (
    <div
      className="applied-service-card"
      onClick={() => onClickCard?.(service)}
    >
      <div className="service-header">
        <p className="service-category">{renderLifeCycles(service.lifeCycles)}</p>
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