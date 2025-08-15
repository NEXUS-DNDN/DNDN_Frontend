import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeServiceCard.css';

const ddayClass = (d) => {
  if (d <= 0) return 'dday-badge red';
  if (d >= 1 && d <= 7) return 'dday-badge yellow';
  return 'dday-badge gray';
};

const DdayBadge = ({ endDate }) => {
  const today = new Date();
  const end = new Date(endDate);
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 0) return null;

  let badgeClass = 'dday-badge gray';
  if (diffDays <= 7) badgeClass = 'dday-badge yellow';
  if (diffDays <= 3) badgeClass = 'dday-badge red';

  return (
    <span className={badgeClass}>
      D-{diffDays}
    </span>
  );
};

const HomeServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/service/${service.id}`);
  };

  const endDate = new Date(service.endDate);
  const formattedEndDate = `${endDate.getFullYear()}.${String(endDate.getMonth() + 1).padStart(2, '0')}.${String(endDate.getDate()).padStart(2, '0')}`;
  
  const imageUrl = service.imageUrl || 'https://via.placeholder.com/200x150.png?text=Service+Image';

  return (
    <div
      className="home-service-card"
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCardClick()}
    >
      <div className="card-top">
        <img className="card-image" src={imageUrl} alt={service.title} />
        <div className="card-labels">
          <span className="card-label">모두</span> {/* 임의로 '모두' 추가, 필요에 따라 수정 가능 */}
        </div>
      </div>
      <div className="card-info">
        <h3 className="card-title">{service.title}</h3>
        <div className="card-meta">
          <DdayBadge endDate={service.endDate} />
          <span className="card-due-date">{formattedEndDate}까지 신청</span>
        </div>
      </div>
    </div>
  );
};

export default HomeServiceCard;