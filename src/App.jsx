// App.jsx (수정본)
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import FavoritePage from './pages/FavoritePage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import SearchResultPage from './pages/SearchResultPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ApplyDatePage from './pages/ApplyDatePage';
import ApplyCompletePage from './pages/ApplyCompletePage';
import { services } from './utils/mockData';
import ReceivedServicesPage from './pages/ReceivedServicesPage';
import AppliedServicesPage from './pages/AppliedServicesPage';
import AlarmListPage from './pages/AlarmListPage';
import CategoryPage from './pages/CategoryPage';

function App() {
  // ✅ 로컬스토리지에서 초기값 불러오기
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
          <Route
            path="/"
            element={
              <MainPage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/favorite"
            element={
              <FavoritePage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                services={services}
              />
            }
          />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/search" element={<SearchPage />} />
          <Route path="/search-result" element={<SearchResultPage />} />

          <Route
            path="/service/:id"
            element={
              <ServiceDetailPage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                setFavorites={setFavorites} // 필요하면 유지
              />
            }
          />

          <Route path="/apply-date/:id" element={<ApplyDatePage />} />
          <Route path="/apply-complete/:id" element={<ApplyCompletePage />} />
          <Route path="/applied" element={<AppliedServicesPage />} />
          <Route path="/received" element={<ReceivedServicesPage />} />

          <Route path="/alarms" element={<AlarmListPage />} />
          <Route path="/category" element={<CategoryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
