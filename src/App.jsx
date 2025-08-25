import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// --- 전역 상태 관리 ---
import { SettingsProvider } from './context/SettingsContext';
import { AuthProvider } from './context/AuthContext.jsx';
import { AdditionalProvider } from './context/AdditionalContext.jsx';

// --- 메인/검색/서비스 흐름 ---
import MainPage from './pages/MainPage';
import FavoritePage from './pages/FavoritePage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import SearchResultPage from './pages/SearchResultPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ApplyDatePage from './pages/ApplyDatePage';
import AppliedServicesPage from './pages/AppliedServicesPage';
import AlarmListPage from './pages/AlarmListPage';
import CategoryPage from './pages/CategoryPage';
import { services } from './utils/mockData';
import SettingsPage from './pages/SettingsPage';
import FontSizePage from './pages/FontSizePage';
import FilePage from './pages/FilePage';
import UploadPage from './pages/UploadPage';
import FAQPage from './pages/FAQPage';
import FAQDetailPage from './pages/FAQDetailPage';
import MyPage from './pages/MyPage';
import ChangeMyInfoPage from './pages/ChangeMyInfoPage';

// --- 로그인/회원가입 플로우 ---
import JoinPage from './pages/JoinPage';
import NaverCallback from './pages/NaverCallback';
import VerifyPage from './pages/VerifyPage';
import LoginPage from './pages/LoginPage';
import NameInputPage from './pages/NameInputPage';
import RegisterPage from './pages/RegisterPage';
import InputPage from './pages/InputPage';
import FindPage from './pages/FindPage';
import SettingPage from './pages/SettingPage';


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
        <AuthProvider>
          <SettingsProvider>
            <AdditionalProvider>
              <Routes>
                {/* 메인/서비스/마이페이지 라우트 */}
                <Route path="/" element={<LoginPage/>} />
                <Route path="/mainpage" element={<MainPage favorites={favorites} toggleFavorite={toggleFavorite} />} />
                <Route path="/favorite" element={<FavoritePage favorites={favorites} toggleFavorite={toggleFavorite} services={services} />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/search-result" element={<SearchResultPage />} />
                <Route path="/service-detail/:id" element={<ServiceDetailPage favorites={favorites} toggleFavorite={toggleFavorite} setFavorites={setFavorites} />} />
                <Route path="/apply-date/:id" element={<ApplyDatePage />} />
                <Route path="/applied" element={<AppliedServicesPage />} />
                <Route path="/alarms" element={<AlarmListPage />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/my" element={<MyPage />} />
                <Route path="/changemyinfo" element={<ChangeMyInfoPage />} />

                {/* 설정 관련 라우트 */}
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/settings/font-size" element={<FontSizePage />} />
                <Route path="/file" element={<FilePage />} />
                <Route path="/file/upload" element={<UploadPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/faq/:id" element={<FAQDetailPage />} />
                <Route path="/setting" element={<SettingPage />} />

                {/* 로그인/회원가입 플로우 라우트 */}
                <Route path="/join" element={<JoinPage />} />
                <Route path="/verify" element={<VerifyPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/nameinput" element={<NameInputPage />} />
                {/* <Route path="/birthdayinput" element={<BirthdayInputPage />} /> */}
                <Route path="/input" element={<InputPage />} />
                {/* <Route path="/addressinput" element={<AddressInputPage />} />
                <Route path="/familyinput" element={<FamilyInputPage />} />
                <Route path="/salaryinput" element={<SalaryInputPage />} />
                <Route path="/hireinput" element={<HireInputPage />} />
                <Route path="/additionalinput" element={<AdditionalInputPage />} />
                <Route path="/additionaltypeinput" element={<AdditionalTypeInputPage />} />
                <Route path="/disability" element={<DisabilityPage />} /> 
                <Route path="/disabilitygrade" element={<DisabilityGradePage />} />
                <Route path="/disabilitytype" element={<DisabilityTypePage />} />
                <Route path="/aged" element={<AgedPage />} />
                <Route path="/agedalone" element={<AgedAlonePage />} />
                <Route path="/agedadditional" element={<AgedAdditionalPage />} /> */}
                <Route path="/find" element={<FindPage />} />
                <Route path="/naver/callback" element={<NaverCallback />} />
              </Routes>
            </AdditionalProvider>
          </SettingsProvider>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;