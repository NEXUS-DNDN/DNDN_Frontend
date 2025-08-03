import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchPage.css';

const SearchPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const recentKeywords = ['일자리', '일자리', '일자리', '일자리'];
  const popularKeywords = ['노인 복지', '의료비 신청', '임산부', '청년 일자리'];

  const handleSearch = (kw) => {
    if (!kw.trim()) return;
    navigate(`/search-result?query=${encodeURIComponent(kw)}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(keyword);
    }
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <button className="menu-btn">☰</button>

        {/* ✅ 직접 input으로 구성 */}
        <input
          className="search-input"
          type="text"
          placeholder="서비스를 검색해보세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <button className="alarm-btn">🔔</button>
      </div>

      <div className="recent-section">
        <strong>최근 검색어</strong>
        <div className="tags">
          {recentKeywords.map((kw, i) => (
            <button key={i} onClick={() => handleSearch(kw)}>
              {kw}
            </button>
          ))}
        </div>
      </div>

      <div className="popular-section">
        <strong>인기 검색어</strong>
        <div className="popular-keywords">
          {popularKeywords.map((kw, i) => (
            <div
              key={i}
              onClick={() => handleSearch(kw)}
              className="keyword-icon"
            >
              <div className="emoji">{['👵', '💰', '👩‍⚕️', '💼'][i]}</div>
              <span>{kw}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
