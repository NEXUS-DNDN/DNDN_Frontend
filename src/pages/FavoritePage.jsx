import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import BottomNav from '../components/BottomNavForm/BottomNav';
import FavoriteServiceCard from '../components/FavoriteServiceCardForm/FavoriteServiceCard'; // ✅
import '../styles/FavoritePage.css';

const FavoritePage = ({ favorites = [], services = [] }) => {
  const navigate = useNavigate();
  const favoriteServices = services.filter((s) => favorites.includes(s.id));

  return (
    <div className="favorite-page">
      <div className="favorite-header">
        <button className="icon-button" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <FaArrowLeft />
        </button>
        <h2 className="header-title">즐겨찾기</h2>
        <div className="icon-placeholder" aria-hidden>
          <FaHeart />
        </div>
      </div>

      <div className="favorite-list">
        {favoriteServices.length === 0 ? (
          <div className="empty-message">즐겨찾기한 서비스가 없습니다.</div>
        ) : (
          favoriteServices.map((service) => (
            <FavoriteServiceCard key={service.id} service={service} />
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default FavoritePage;
