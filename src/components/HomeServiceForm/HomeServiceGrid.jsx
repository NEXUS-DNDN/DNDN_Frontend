import React from 'react';
import HomeServiceCard from './HomeServiceCard';
import './HomeServiceCard.css';

const HomeServiceGrid = ({ services }) => {
  return (
    <div className="service-card-list">
      {services.map((svc) => (
        <HomeServiceCard key={svc.id} service={svc} />
      ))}
    </div>
  );
};

export default HomeServiceGrid;