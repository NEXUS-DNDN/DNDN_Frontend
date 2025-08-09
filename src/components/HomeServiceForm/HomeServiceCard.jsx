import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeServiceCard.css';

const ddayClass = (d) => {
  if (d === 0) return 'dday-badge red';
  if (d >= 1 && d <= 7) return 'dday-badge yellow';
  return 'dday-badge gray';
};

const ddayText = (d) => (d === 0 ? 'D - DAY' : `D - ${d}`);

const HomeServiceCard = ({ service }) => {
  const navigate = useNavigate();

  return (
    <div
      className="home-service-card"
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/service/${service.id}`)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate(`/service/${service.id}`)}
    >
      <div className="home-thumb" aria-hidden>🖼️</div>

      <div className="home-card-body">
        <div className="home-title">{service.title}</div>
        <div className="home-meta">
          <span className="home-category">{service.category}</span>
          <span className={ddayClass(service.dDay)}>{ddayText(service.dDay)}</span>
        </div>
      </div>
    </div>
  );
};

export default HomeServiceCard;
