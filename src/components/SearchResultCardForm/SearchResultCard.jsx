import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchResultCard.css';

const SearchResultCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      className="result-card"
      onClick={() => navigate(`/service/${item.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-thumbnail">🖼️</div>
      <div className="card-content">
        <div className="card-title">{item.title}</div>
        <div className="card-category">{item.category}</div>
      </div>
    </div>
  );
};

export default SearchResultCard;
