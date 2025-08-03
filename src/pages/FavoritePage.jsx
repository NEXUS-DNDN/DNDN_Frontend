// FavoritePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import '../styles/FavoritePage.css';

const FavoritePage = ({ favorites, services }) => {
  const navigate = useNavigate();
  const favoriteServices = services.filter((s) => favorites.includes(s.id));

  return (
    <div className="favorite-page">
      {/* 상단바 */}
      <div className="favorite-header">
        <button className="icon-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h2 className="header-title">즐겨찾기</h2>
        <div className="icon-placeholder">
          <FaHeart />
        </div>
      </div>

      {/* 즐겨찾기 리스트 */}
      <div className="favorite-list">
        {favoriteServices.length === 0 ? (
          <div className="empty-message">즐겨찾기한 서비스가 없습니다.</div>
        ) : (
          favoriteServices.map((service) => (
            <div key={service.id} className="favorite-card">
              <div className="favorite-title">{service.title}</div>
              <div className="favorite-day">
                {service.dDay === 0
                  ? <span className="red">D-DAY</span>
                  : service.dDay === 1
                    ? <span className="orange">D-1</span>
                    : <span className="gray">D-{service.dDay}</span>
                }
              </div>
              <div className="favorite-buttons">
                <button onClick={() => navigate(`/service/${service.id}`)}>상세 확인</button>
                <button onClick={() => alert('신청하러 가기 연결 예정')}>신청하러 가기</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritePage;
