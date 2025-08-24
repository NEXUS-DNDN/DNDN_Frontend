import React from 'react';
import './ReceivedServiceCard.css';

const ReceivedServiceCard = ({
  service,
  onClickCard,
  onClickStatus,
  onClickPlus,
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
    return '[생애주기]'; // 배열이 비어있으면 기본값 반환
  };

  return (
    <div
      className="received-service-card"
      onClick={() => onClickCard?.(service)}
      style={{ cursor: 'pointer' }}
    >
      <div className="service-header">
        {/* service.lifeCycles 배열을 renderLifeCycles 함수에 전달하여 렌더링 */}
        <span className="service-category">{renderLifeCycles(service.lifeCycles)}</span>
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