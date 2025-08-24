// src/pages/MainPage.jsx

import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import { FiSearch } from 'react-icons/fi';
import { FaBell, FaBars, FaTimes } from 'react-icons/fa';

import BottomNav from '../components/BottomNavForm/BottomNav';
import HomeServiceGrid from '../components/HomeServiceForm/HomeServiceGrid';
import '../styles/main.css';
import searchIcon from '../assets/search.png'
import alarmIcon from '../assets/alarm.png'
import DNDN from '../assets/DNDN.png'
import banner from '../assets/banner.png';

const MainPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [recommendedServices, setRecommendedServices] = useState([]);
  const [recentlyViewedServices, setRecentlyViewedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 추천 복지 서비스 불러오기
  const fetchRecommendedServices = useCallback(async () => {
    if (!accessToken) {
      setRecommendedServices([]);
      return;
    }
    try {
      const userId = localStorage.getItem('userId') || 2;
      const response = await axios.get(`https://nexusdndn.duckdns.org/welfare/recommendation?user-id=${userId}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const top3Services = response.data.result.slice(0, 3);
      setRecommendedServices(top3Services);
    } catch (err) {
      console.error("추천 서비스 불러오기 실패:", err);
      setRecommendedServices([]);
    }
  }, [accessToken]);

  // 최근 본 복지 서비스 불러오기
  const fetchRecentlyViewedServices = useCallback(async () => {
    // 로컬 스토리지에서 ID 목록을 가져옴
    const viewedIds = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    if (viewedIds.length === 0 || !accessToken) {
      setRecentlyViewedServices([]);
      return;
    }
    
    try {
      // 각 ID에 대해 API 호출을 병렬로 수행
      const fetchPromises = viewedIds.map(id =>
        axios.get(`https://nexusdndn.duckdns.org/welfare/${id}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        })
      );
      const responses = await Promise.all(fetchPromises);
      // 각 응답에서 결과 데이터를 추출
      const servicesData = responses.map(res => res.data.result);
      setRecentlyViewedServices(servicesData);
    } catch (err) {
      console.error("최근 본 서비스 불러오기 실패:", err);
      setRecentlyViewedServices([]);
    }
  }, [accessToken]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchRecommendedServices(),
        fetchRecentlyViewedServices()
      ]);
      setLoading(false);
    };
    loadData();
  }, [fetchRecommendedServices, fetchRecentlyViewedServices]);
  
  if (loading) {
    return (
      <div className="main-container loading-container">
        <div className="loading-spinner"></div>
        <p>서비스를 불러오는 중입니다...</p>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="top-bar">
        <div className="brand-logo">
          <img src={DNDN} alt="로고" className="DNDN" />
        </div>
        <div className="top-right-actions">
         <button type="button" className="icon-circle" aria-label="검색" onClick={() => navigate('/search')}>
          <img src={searchIcon} alt="검색" className="search-icon" /> </button>
          <button type="button" className="icon-circle bell" aria-label="알림" onClick={() => navigate('/alarms')}>
           <img src={alarmIcon} alt="알림" className="alarm-icon" /> </button>
        </div>
      </div>
      
      {/* 추가된 광고 배너 */}
      <div className="ad-banner-container">
        <img src={banner} alt="광고 배너" className="ad-banner" />
      </div>

      {/* 홍길동님에게 도움이 될 딱 맞는 복지 서비스 */}
      <section className="recommendation-section">
        <div className="recommendation-box">
          <h2 className="recommendation-title">홍길동님에게 도움이 될 딱 맞는 복지 서비스</h2>
          <div className="recommendation-tabs">
            <button className="recommendation-tab active">에너지</button>
            <button className="recommendation-tab">일자리</button>
            <button className="recommendation-tab">보육</button>
          </div>
          {recommendedServices.length > 0 ? (
            <ol className="recommended-list">
              {recommendedServices.map((service, index) => (
                <li key={service.welfareId} onClick={() => navigate(`/service-detail/${service.welfareId}`)}>
                  <div className="list-number">{index + 1}</div>
                  <div className="list-content">
                    <div className="list-title">{service.title}</div>
                    <div className="list-description">{service.content}</div>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="no-services-message">추천 복지 서비스가 없습니다.</p>
          )}
          <button className="recommendation-view-all">전체보기</button>
        </div>
      </section>

      {/* 최근 본 복지 서비스 */}
      <section className="recently-viewed-section">
        <div className="section-header">
          <h2 className="section-title">최근 본 복지 서비스</h2>
          <button className="section-more" onClick={() => navigate('/history')}>더보기 ›</button>
        </div>
        {recentlyViewedServices.length > 0 ? (
          <HomeServiceGrid services={recentlyViewedServices} onCardClick={(id) => navigate(`/service-detail/${id}`)} />
        ) : (
          <p className="no-services-message">최근 본 복지 서비스가 없습니다.</p>
        )}
      </section>
      
      <BottomNav />
    </div>
  );
};

export default MainPage;