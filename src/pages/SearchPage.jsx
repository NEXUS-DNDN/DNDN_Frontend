import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaRegClock } from 'react-icons/fa';
import BottomNav from '../components/BottomNavForm/BottomNav';
import '../styles/SearchPage.css';
import Backicon from '../assets/back.svg';

const STORAGE_PREFIX = 'recentSearches';

const SearchPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [recentKeywords, setRecentKeywords] = useState([]);

  // 백엔드에서 받아올 추천 검색어(임시 데이터) - ⭐ 제거됨
  // const popularKeywords = [
  //   { title: '의료비 신청', icon: '💰' },
  //   { title: '노인 복지', icon: '👴' },
  //   { title: '임산부', icon: '🤰' },
  //   { title: '청년 일자리', icon: '💼' },
  // ];

  // ✅ 1. 사용자 ID를 로컬 스토리지에서 가져오기
  // 실제 앱에서는 JWT 토큰 등을 디코딩하여 ID를 가져오는 것이 더 안전합니다.
  const userId = useMemo(() => {
    try {
      // 로컬 스토리지에서 'currentUserId'라는 키로 사용자 ID를 가져옵니다.
      // 이 부분은 JWT를 사용할 경우 토큰을 디코딩하여 userID를 추출하는 로직으로 변경되어야 합니다.
      return localStorage.getItem('currentUserId') || '';
    } catch {
      return '';
    }
  }, []);

  // ✅ 2. 사용자 ID를 포함한 고유한 로컬 스토리지 키 생성
  const storageKey = useMemo(
    () => (userId ? `${STORAGE_PREFIX}:${userId}` : STORAGE_PREFIX),
    [userId]
  );

  // ✅ 3. 컴포넌트 로딩 시 사용자별 최근 검색어 불러오기
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setRecentKeywords(parsed);
    } catch {}
  }, [storageKey]);

  // ✅ 4. 사용자별 로컬 스토리지에 저장하는 함수
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
          <img src={Backicon} alt="뒤로가기" className="back-icon" />
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

      {/* ⭐ 추천 검색 섹션 제거됨 */}
      {/*
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
      */}

      {/* ⭐ 추천 검색 (태그) 섹션 제거됨 */}
      {/*
      <div className="recent-section">
        <div className="tags">
          {['키워드1', '노인 키워드2', '키워드3', '키워드4'].map((kw, i) => (
            <button key={i} onClick={() => handleSearch(kw)}>
              {kw}
            </button>
          ))}
        </div>
      </div>
      */}

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
