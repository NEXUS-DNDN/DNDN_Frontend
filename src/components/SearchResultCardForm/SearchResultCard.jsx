import React from 'react';
import { FaHeart, FaEye } from 'react-icons/fa';
import './SearchResultCard.css';

const SearchResultCard = ({ item, onCardClick, viewCount, isInterested }) => {
  const getTagColor = (tagName) => {
  return '#7B68EE'; // 모든 태그에 보라색을 적용
};

  const purpleHeartColor = '#800080'; // 보라색
  const grayHeartColor = '#a9a9a9ff'; 

  return (
    <div className="search-result-card" onClick={onCardClick}>
      <div className="card-top-content">
        <h3 className="card-title">{item.title}</h3>
        <div className="card-tags-container">
          {item.lifeCycleNames && item.lifeCycleNames.length > 0 && (
            item.lifeCycleNames.map(name => (
              <span key={name} className="card-tag" style={{ backgroundColor: getTagColor(name) }}>
                {name}
              </span>
            ))
          )}
          {item.householdTypeNames && item.householdTypeNames.length > 0 && (
            item.householdTypeNames.map(name => (
              <span key={name} className="card-tag" style={{ backgroundColor: getTagColor(name) }}>
                {name}
              </span>
            ))
          )}
          {item.interestTopicNames && item.interestTopicNames.length > 0 && (
            item.interestTopicNames.map(name => (
              <span key={name} className="card-tag" style={{ backgroundColor: getTagColor(name) }}>
                {name}
              </span>
            ))
          )}
        </div>
      </div>
      <div className="card-bottom-content">
        <p className="card-dept">{item.department || '정보 없음'}</p>
        <p className="card-summary">{item.summary}</p>
        <div className="card-footer">
          <div className="card-stats">
            <span className="stat-item">
              <FaEye size={12} color="#8c8c8c" />
              <span className="stat-count">{viewCount || 0}</span>
            </span>
            {/* 좋아요 상태에 따라 하트 색상 변경 */}
            <span className="stat-item">
              <FaHeart size={12} color={isInterested ? purpleHeartColor : grayHeartColor} />
              <span className="stat-count">{item.interestCount || 0}</span>
            </span>
          </div>
          <button className="heart-btn" aria-label="좋아요">
            <FaHeart color={isInterested ? purpleHeartColor : grayHeartColor} size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;