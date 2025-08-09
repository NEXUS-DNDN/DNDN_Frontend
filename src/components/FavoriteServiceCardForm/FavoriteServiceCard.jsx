import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FavoriteServiceCard.css'; // ✅ 카드 전용 스타일

const FavoriteServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const formatDDay = (d) => (d === 0 ? 'D - DAY' : `D - ${d}`);
  const getDDayClass = (d) => {
    if (d === 0) return 'd-red';
    if (d >= 1 && d <= 7) return 'd-yellow';
    return 'd-gray';
  };

  return (
    <div className="favorite-card">
      <div className="favorite-title">{service.title}</div>

      <div className={`favorite-dday ${getDDayClass(service.dDay)}`}>
        {formatDDay(service.dDay)}
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
          onClick={() => alert('신청하러 가기 연결 예정')}
        >
          신청하러 가기
        </button>
      </div>
    </div>
  );
};

export default FavoriteServiceCard;
