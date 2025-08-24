import React from 'react';
import './HomeServiceCard.css';

const HomeServiceCard = ({ service, onClick }) => {
  return (
    <div className="home-service-card" onClick={onClick}>
      <div className="card-content">
        <h3 className="card-title">{service.title}</h3>
        <p className="card-description">{service.content}</p>
      </div>
    </div>
  );
};

export default HomeServiceCard;