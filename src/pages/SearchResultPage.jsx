import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { services } from '../utils/mockData';
import '../styles/SearchResultPage.css';

const SearchResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const keywordFromURL = searchParams.get('query') || '';
  const [query, setQuery] = useState(keywordFromURL);

  // 검색어 포함한 서비스 필터링
  const filteredResults = services.filter((item) =>
    item.title.includes(keywordFromURL)
  );

  const handleSearch = (kwd) => {
    if (!kwd.trim()) return;
    navigate(`/search-result?query=${encodeURIComponent(kwd)}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  useEffect(() => {
    setQuery(keywordFromURL);
  }, [keywordFromURL]);

  return (
    <div className="search-result-page">
      <div className="search-top">
        <button className="icon-btn">☰</button>
        <input
          className="search-input"
          type="text"
          placeholder="서비스를 검색해보세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="icon-btn">🔔</button>
      </div>

      <div className="search-title">검색 결과</div>

      <div className="result-list">
        {filteredResults.length > 0 ? (
          filteredResults.map((item) => (
            <div
              key={item.id}
              className="result-card"
              onClick={() => navigate(`/service/${item.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-thumbnail">🖼️</div>
              <div className="card-content">
                <div className="card-title">{item.title}</div>
                <div className="card-category">{item.category}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            "{keywordFromURL}"에 대한 검색 결과가 없습니다.
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default SearchResultPage;
