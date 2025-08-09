// FavoritePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import BottomNav from '../components/BottomNav';           // ✅ 하단바 포함
import '../styles/FavoritePage.css';

const FavoritePage = ({ favorites = [], services = [] }) => { // ✅ 안전 가드
  const navigate = useNavigate();

  // 즐겨찾기된 서비스만 필터링
  const favoriteServices = services.filter((s) => favorites.includes(s.id));

  const formatDDay = (d) => {
    if (d === 0) return 'D - DAY';
    return `D - ${d}`;
  };

  const getDDayClass = (d) => {
    if (d === 0) return 'd-red';
    if (d >= 1 && d <= 7) return 'd-yellow';
    return 'd-gray'; // d >= 8
  };

  return (
    <div className="favorite-page">
      {/* 상단바 */}
      <div className="favorite-header">
        <button className="icon-button" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <FaArrowLeft />
        </button>
        <h2 className="header-title">즐겨찾기</h2>
        <div className="icon-placeholder" aria-hidden>
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

              <div className={`favorite-dday ${getDDayClass(service.dDay)}`}>
                {formatDDay(service.dDay)}
              </div>

              <div className="divider" />

              <div className="favorite-buttons">
                <button
                  className="btn-outline"
                  onClick={() => navigate(`/service/${service.id}`)}
                >
                  상세 화면
                </button>
                <button
                  className="btn-outline"
                  onClick={() => alert('신청하러 가기 연결 예정')}
                >
                  신청하러 가기
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ 하단 네비 */}
      <BottomNav />
    </div>
  );
};

export default FavoritePage;
