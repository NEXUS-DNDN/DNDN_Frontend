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
import BottomNav from './components/BottomNav';
import { services } from './utils/mockData';

function App() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Routes>
          <Route
            path="/"
            element={<MainPage favorites={favorites} toggleFavorite={toggleFavorite} />}
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
            element={<ServiceDetailPage favorites={favorites} toggleFavorite={toggleFavorite} />}
          />
          <Route path="/apply-date/:id" element={<ApplyDatePage />} />
          <Route path="/apply-complete/:id" element={<ApplyCompletePage />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
