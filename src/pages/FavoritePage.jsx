import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaBell, FaList } from 'react-icons/fa';
import BottomNav from '../components/BottomNavForm/BottomNav';
import FavoriteServiceCard from '../components/FavoriteServiceCardForm/FavoriteServiceCard';
import '../styles/FavoritePage.css';

const getUserId = () => {
  let userId = localStorage.getItem('currentUserId');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('currentUserId', userId);
  }
  return userId;
};

const FavoritePage = () => {
  const navigate = useNavigate();
  const [favoriteServices, setFavoriteServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // ✅ 개발용: JWT 토큰을 localStorage에 자동으로 추가
    const devToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1IiwiaWF0IjoxNzU1ODY3NDEyLCJleHAiOjE3NTU5NTM4MTJ9.jKMavCgQnfD6ANnRfl97zCzSv9IdPqUbsl6NFbSPJSo';
    localStorage.setItem('accessToken', devToken);

    const fetchFavoriteServices = async () => {
      setLoading(true);
      setError(null);
      
      const accessToken = localStorage.getItem('accessToken');
      
      if (!accessToken) {
        setLoading(false);
        setError("로그인이 필요합니다.");
        return;
      }
      
      try {
        const response = await fetch('https://nexusdndn.duckdns.org/interest', { 
            method: 'GET', 
            headers: { 
              'accept': '*/*',
              'Authorization': `Bearer ${accessToken}`
            } 
          });

        if (!response.ok) {
            throw new Error('좋아요 목록을 불러오는 데 실패했습니다.');
        }

        const data = await response.json();
        // API 응답의 interestList 배열에서 welfareId만 추출
        const favoriteIds = data.result.interestList.map(item => item.welfareId);
        
        // 각 ID에 대해 서비스 상세 정보를 가져오는 비동기 요청을 병렬로 실행
        const fetchPromises = favoriteIds.map(id => 
          fetch(`https://nexusdndn.duckdns.org/welfare/${id}`, { 
            method: 'GET', 
            headers: { 
              'accept': '*/*',
              'Authorization': `Bearer ${accessToken}`
            } 
          })
        );

        const responses = await Promise.all(fetchPromises);
        const fetchedServices = [];
        for (const response of responses) {
          if (!response.ok) {
            throw new Error('하나 이상의 서비스 데이터를 불러오는 데 실패했습니다.');
          }
          const serviceData = await response.json();
          fetchedServices.push(serviceData.result);
        }
        setFavoriteServices(fetchedServices);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFavoriteServices();
  }, []); // 의존성 배열을 빈 배열로 두어 컴포넌트 마운트 시 한 번만 실행되도록 변경

  return (
    <div className="favorite-page">
      <header className="favorite-header">
        <button className="icon-button" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <FaArrowLeft />
        </button>
        <h1 className="header-title">좋아요 목록</h1>
        <div className="header-icons">
          <button className="icon-button" aria-label="검색">
            <FaSearch />
          </button>
          <button className="icon-button" aria-label="알림">
            <FaBell />
          </button>
          <button className="icon-button" aria-label="목록">
            <FaList />
          </button>
        </div>
      </header>
      
      {loading ? (
        <div className="empty-message">서비스를 불러오는 중입니다...</div>
      ) : error ? (
        <div className="empty-message">데이터를 가져오는 데 실패했습니다: {error}</div>
      ) : favoriteServices.length === 0 ? (
        <div className="empty-message">좋아요한 서비스가 없습니다.</div>
      ) : (
        <div className="favorite-list">
          {favoriteServices.map((service) => (
            <FavoriteServiceCard key={service.welfareId} service={service} />
          ))}
        </div>
      )}
      <BottomNav />
    </div>
  );
};

export default FavoritePage;