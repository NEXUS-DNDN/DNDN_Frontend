import React from 'react';
import './HomeServiceCard.css';

const DdayBadge = ({ endDate }) => {
  if (!endDate) return null;
  const end = new Date(endDate);
  const diffTime = end.getTime() - new Date().getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (end.getFullYear() === 9999 || diffDays <= 0) return null;
  let badgeClass = 'dday-badge gray';
  if (diffDays <= 7 && diffDays > 3) badgeClass = 'dday-badge yellow';
  if (diffDays <= 3) badgeClass = 'dday-badge red';
  return (<span className={badgeClass}>D-{diffDays}</span>);
};

const HomeServiceCard = ({ service, onClick }) => {
  const endDate = service.endDate ? new Date(service.endDate) : null;
  const formattedEndDate = endDate && endDate.getFullYear() !== 9999
    ? `${endDate.getFullYear()}.${String(endDate.getMonth() + 1).padStart(2, '0')}.${String(endDate.getDate()).padStart(2, '0')}`
    : '상시 신청';
  const imageUrl = service.imageUrl || 'https://via.placeholder.com/300x200.png?text=Service+Image';

  return (
    <div
      className="home-service-card"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      <div className="card-top">
        <img className="card-image" src={imageUrl} alt={service.title} />
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