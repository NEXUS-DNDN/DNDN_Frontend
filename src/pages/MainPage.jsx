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
    <div className="main-container">
      <Header onMenuClick={() => setIsCategoryOpen(prev => !prev)} />
      <SearchBar />
      <div className="welcome-msg">
        <span>홍길동님,<br />
        이런 복지가 있어요!</span>
      </div>
      <div className="service-card-list">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      <BottomNav />
      <CategoryPanel isOpen={isCategoryOpen} onClose={() => setIsCategoryOpen(false)} />
    </div>
  );
};

export default MainPage;