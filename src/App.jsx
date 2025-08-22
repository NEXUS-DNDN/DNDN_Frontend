import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// --- 메인/검색/서비스 흐름 ---
import MainPage from './pages/MainPage';
import FavoritePage from './pages/FavoritePage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import SearchResultPage from './pages/SearchResultPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ApplyDatePage from './pages/ApplyDatePage';
import AppliedServicesPage from './pages/AppliedServicesPage';
import AlarmListPage from './pages/AlarmListPage';
import CategoryPage from './pages/CategoryPage';
import { services } from './utils/mockData';

// --- 로그인/회원가입 플로우 (loginpage_etc) ---
import JoinPage from './pages/JoinPage';
import VerifyPage from './pages/VerifyPage';
import LoginPage from './pages/LoginPage';
import NameInputPage from './pages/NameInputPage';
import BirthdayInputPage from './pages/BirthdayInputPage';
import GenderInputPage from './pages/GenderInputPage';
import AddressInputPage from './pages/AddressInputPage';
import FamilyInputPage from './pages/FamilyInputPage';
import SalaryInputPage from './pages/SalaryInputPage';
import HireInputPage from './pages/HireInputPage';
import AdditionalInputPage from './pages/AdditionalInputPage';
import DisabilityPage from './pages/DisabilityPage';
import DisabilityGradePage from './pages/DisabilityGradePage';
import DisabilityTypePage from './pages/DisabilityTypePage';
import AgedPage from './pages/AgedPage';
import AgedAlonePage from './pages/AgedAlonePage';
import AgedAdditionalPage from './pages/AgedAdditionalPage';
import MyPage from './pages/MyPage';
import ChangeMyInfoPage from './pages/ChangeMyInfoPage';

function App() {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favoriteServices');
    return stored ? JSON.parse(stored) : [];
  });

  const toggleFavorite = (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter((fid) => fid !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('favoriteServices', JSON.stringify(updated));
  };

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/mainpage" element={<MainPage favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route path="/favorite" element={<FavoritePage favorites={favorites} toggleFavorite={toggleFavorite} services={services} />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search-result" element={<SearchResultPage />} />
          <Route
            path="/service-detail/:id" // ✅ 이 부분을 수정했습니다.
            element={
              <ServiceDetailPage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                setFavorites={setFavorites}
              />
            }
          />
          <Route path="/apply-date/:id" element={<ApplyDatePage />} />
          <Route path="/applied" element={<AppliedServicesPage />} />
          <Route path="/alarms" element={<AlarmListPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/nameinput" element={<NameInputPage />} />
          <Route path="/birthdayinput" element={<BirthdayInputPage />} />
          <Route path="/genderinput" element={<GenderInputPage />} />
          <Route path="/addressinput" element={<AddressInputPage />} />
          <Route path="/familyinput" element={<FamilyInputPage />} />
          <Route path="/salaryinput" element={<SalaryInputPage />} />
          <Route path="/hireinput" element={<HireInputPage />} />
          <Route path="/additionalinput" element={<AdditionalInputPage />} />
          <Route path="/disability" element={<DisabilityPage />} />
          <Route path="/disabilitygrade" element={<DisabilityGradePage />} />
          <Route path="/disabilitytype" element={<DisabilityTypePage />} />
          <Route path="/aged" element={<AgedPage />} />
          <Route path="/agedalone" element={<AgedAlonePage />} />
          <Route path="/agedadditional" element={<AgedAdditionalPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/changemyinfo" element={<ChangeMyInfoPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;