import React from 'react';
import HomeServiceCard from './HomeServiceCard';
import './HomeServiceCard.css';

const HomeServiceGrid = ({ services, onCardClick }) => {
  return (
    <div className="service-card-list">
      {services.map((svc) => (
        <HomeServiceCard
          key={svc.welfareId}
          service={svc}
          onClick={() => onCardClick(svc.welfareId)}
        />
      ))}
    </div>
  );
};

export default HomeServiceGrid;