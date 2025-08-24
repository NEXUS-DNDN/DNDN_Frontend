import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTimes, FaRegClock } from 'react-icons/fa';
import BottomNav from '../components/BottomNavForm/BottomNav';
import '../styles/SearchPage.css';

const STORAGE_PREFIX = 'recentSearches';

const SearchPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [recentKeywords, setRecentKeywords] = useState([]);

  // 백엔드에서 받아올 추천 검색어(임시 데이터)
  const popularKeywords = [
    { title: '의료비 신청', icon: '💰' },
    { title: '노인 복지', icon: '👴' },
    { title: '임산부', icon: '🤰' },
    { title: '청년 일자리', icon: '💼' },
  ];

  const userId = useMemo(() => {
    try {
      return localStorage.getItem('currentUserId') || '';
    } catch {
      return '';
    }
  }, []);

  const storageKey = useMemo(
    () => (userId ? `${STORAGE_PREFIX}:${userId}` : STORAGE_PREFIX),
    [userId]
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setRecentKeywords(parsed);
    } catch {}
  }, [storageKey]);

  const saveRecent = (list) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(list));
    } catch {}
  };

  const addRecent = (kwRaw) => {
    const kw = kwRaw.trim();
    if (!kw) return;
    setRecentKeywords((prev) => {
      const next = [kw, ...prev.filter((v) => v !== kw)];
      const capped = next.slice(0, 20);
      saveRecent(capped);
      return capped;
    });
  };

  const removeRecent = (kwToRemove) => {
    setRecentKeywords((prev) => {
      const next = prev.filter((kw) => kw !== kwToRemove);
      saveRecent(next);
      return next;
    });
  };

  const clearAllRecent = () => {
    setRecentKeywords([]);
    saveRecent([]);
  };

  const handleSearch = useCallback((kw) => {
    const cleaned = kw.trim();
    if (!cleaned) return;
    addRecent(cleaned);
    const params = new URLSearchParams();
    params.append('query', cleaned);
    navigate(`/search-result?${params.toString()}`);
  }, [addRecent, navigate]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(keyword);
      setKeyword('');
    }
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <button className="back-btn" onClick={() => navigate('/mainpage')}>
          <FaArrowLeft size={20} />
        </button>
        <div className="search-input-wrapper">
          <input
            className="search-input"
            type="text"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <FaTimes
            className="clear-input-icon"
            onClick={() => setKeyword('')}
            style={{ visibility: keyword ? 'visible' : 'hidden' }}
          />
        </div>
      </div>

      <div className="recommend-section">
        <strong>추천 검색</strong>
        <div className="recommend-keywords">
          {popularKeywords.map((item, i) => (
            <div key={i} onClick={() => handleSearch(item.title)} className="keyword-item">
              <div className="keyword-icon-bg">
                <span className="emoji">{item.icon}</span>
              </div>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="recent-section">
        <div className="tags">
          {['키워드1', '노인 키워드2', '키워드3', '키워드4'].map((kw, i) => (
            <button key={i} onClick={() => handleSearch(kw)}>
              {kw}
            </button>
          ))}
        </div>
      </div>

      <div className="recent-section">
        <div className="section-header">
          <strong>최근 검색</strong>
          <button className="clear-btn" onClick={clearAllRecent}>전체 삭제</button>
        </div>
        <ul className="recent-list">
          {recentKeywords.length > 0 ? (
            recentKeywords.map((kw, i) => (
              <li key={`${kw}-${i}`} className="recent-item">
                <div className="recent-text-wrapper" onClick={() => handleSearch(kw)}>
                  <FaRegClock className="recent-icon" />
                  <span className="recent-text">{kw}</span>
                </div>
                <button className="recent-remove-btn" onClick={() => removeRecent(kw)}>
                  <FaTimes />
                </button>
              </li>
            ))
          ) : (
            <li className="recent-empty">최근 검색어가 없습니다.</li>
          )}
        </ul>
      </div>
      <BottomNav activePath="/" />
    </div>
  );
};

export default SearchPage;