import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaBell, FaArrowLeft } from 'react-icons/fa';
import BottomNav from '../components/BottomNavForm/BottomNav';
import { services } from '../utils/mockData';
import SearchResultCard from '../components/SearchResultCardForm/SearchResultCard'; // ✅ 추가
import '../styles/SearchResultPage.css';

const parseList = (sp, key) => {
  const raw = sp.get(key);
  if (!raw) return [];
  return raw.split(',').map(v => v.trim()).filter(Boolean);
};

const SearchResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sp = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const keywordFromURL = sp.get('query') || '';
  const [query, setQuery] = useState(keywordFromURL);

  // ✅ 카테고리 파라미터도 지원 (기존 로직 그대로)
  const lifecycle = parseList(sp, 'lifecycle');
  const household = parseList(sp, 'household');
  const topics = parseList(sp, 'topics');
  const age = sp.get('age') ? Number(sp.get('age')) : null;
  const sido = sp.get('sido') || '';
  const sigungu = sp.get('sigungu') || '';

  const filteredResults = services.filter((svc) => {
    if (keywordFromURL) {
      const hay = (svc.title || '') + ' ' + (svc.description || '') + ' ' + (svc.category || '');
      if (!hay.includes(keywordFromURL)) return false;
    }
    const hasAny = (need, actual) =>
      need.length === 0 || (Array.isArray(actual) && need.some(n => actual.includes(n)));

    if (!hasAny(lifecycle, svc.lifecycle)) return false;
    if (!hasAny(household, svc.household)) return false;
    if (!hasAny(topics, svc.topics)) return false;

    if (age != null && (svc.minAge != null || svc.maxAge != null)) {
      if (svc.minAge != null && age < svc.minAge) return false;
      if (svc.maxAge != null && age > svc.maxAge) return false;
    }

    if (sido && svc.region?.sido && svc.region.sido !== sido) return false;
    if (sigungu && svc.region?.sigungu && svc.region.sigungu !== sigungu) return false;

    return true;
  });

  const handleSearch = (kwd) => {
    if (!kwd.trim()) return;
    navigate(`/search-result?query=${encodeURIComponent(kwd)}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch(query);
  };

  useEffect(() => {
    setQuery(keywordFromURL);
  }, [keywordFromURL]);

  return (
    <div className="search-result-page">
      <div className="search-top">
        <div className="icon-left">
          <button className="icon-btn" onClick={() => navigate('/category')}>
            <FaBars />
          </button>
        </div>
        <div className="icon-right">
          <button className="icon-btn" onClick={() => navigate('/alarms')}>
            <FaBell />
          </button>
        </div>
      </div>

      <div className="search-input-row">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <input
          className="search-input"
          type="text"
          placeholder="서비스를 검색해보세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div className="search-title">검색 결과</div>

      <div className="result-list">
        {filteredResults.length > 0 ? (
          filteredResults.map((item) => (
            <SearchResultCard key={item.id} item={item} />
          ))
        ) : (
          <div className="no-results">
            {keywordFromURL
              ? `"${keywordFromURL}"에 대한 검색 결과가 없습니다.`
              : '조건에 맞는 검색 결과가 없습니다.'}
          </div>
        )}
      </div>

      <BottomNav activePath="/" />
    </div>
  );
};

export default SearchResultPage;
