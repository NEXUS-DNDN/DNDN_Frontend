import React, { useState } from 'react';
import Header from '../components/MainHeader';
import SearchBar from '../components/SearchBar';
import ServiceCard from '../components/ServiceCard';
import BottomNav from '../components/BottomNav';
import CategoryPanel from '../components/CategoryPanel';
import { services } from '../utils/mockData';
import '../styles/main.css';

const MainPage = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <>
      <CategoryPanel
        isOpen={isCategoryOpen}
        onClose={() => setIsCategoryOpen(false)}
      />
      <div className="main-container">
        <Header onMenuClick={() => setIsCategoryOpen(true)} />

        {/* SearchPage의 입력영역 패딩(좌우 16px)에 맞추기 위한 래퍼 */}
        <div className="main-searchbar-wrap">
          <SearchBar />
        </div>

        <div className="welcome-msg">
          <span>홍길동님,<br />이런 복지가 있어요!</span>
        </div>

        <div className="service-card-list">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <BottomNav />
      </div>
    </>
  );
};

export default MainPage;
