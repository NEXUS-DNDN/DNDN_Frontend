import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FavoriteServiceCard.css'; // ✅ 카드 전용 스타일

const FavoriteServiceCard = ({ service }) => {
  const navigate = useNavigate();

  // ✅ service.endDate를 사용하여 dDay 계산
  const today = new Date();
  const endDate = new Date(service.endDate);
  const diffTime = endDate.getTime() - today.getTime();
  const dDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 밀리초를 일로 변환

  // dDay에 따른 클래스 및 텍스트 함수
  const formatDDay = (d) => {
    if (d === 0) return 'D - DAY';
    if (d > 0) return `D - ${d}`;
    return '마감'; // 이미 지난 날짜의 경우 '마감'으로 표시
  };

  const getDDayClass = (d) => {
    if (d <= 0) return 'd-red'; // 0일 이하(마감 포함)는 빨간색
    if (d >= 1 && d <= 7) return 'd-yellow'; // 1~7일은 노란색
    return 'd-gray'; // 그 외는 회색
  };

  return (
    <div className="favorite-card">
      <div className="favorite-title">{service.title}</div>

      <div className={`favorite-dday ${getDDayClass(dDay)}`}>
        {formatDDay(dDay)}
      </div>

      <div className="divider" />

      <div className="favorite-buttons">
        <button
          className="btn-outline"
          onClick={() => navigate(`/service/${service.id}`)}
        >
          상세 화면
        </button>
        <button
          className="btn-outline"
          onClick={() => alert('신청하러 가기 연결 예정')} // ✅ alert 대신 모달 사용 권장
        >
          신청하러 가기
        </button>
      </div>
    </div>
  );
};

export default FavoriteServiceCard;