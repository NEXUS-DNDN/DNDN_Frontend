import React, { useState } from 'react';
import Header from '../components/MainHeaderForm/MainHeader';
import SearchBar from '../components/SearchBarForm/SearchBar';
import BottomNav from '../components/BottomNavForm/BottomNav';
import CategoryPanel from '../components/CategoryPanelForm/CategoryPanel';
import HomeServiceGrid from '../components/HomeServiceForm/HomeServiceGrid'; // ✅ 새 그리드
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

        <div className="main-searchbar-wrap">
          <SearchBar />
        </div>

        <div className="welcome-msg">
          <span>홍길동님,<br />이런 복지가 있어요!</span>
        </div>

        {/* ✅ 홈 전용 카드 컴포넌트로 렌더링 */}
        <HomeServiceGrid services={services} />

        <BottomNav />
      </div>
    </>
  );
};

export default MainPage;
