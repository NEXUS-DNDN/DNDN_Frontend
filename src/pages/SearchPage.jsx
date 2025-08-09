import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaBell, FaArrowLeft } from 'react-icons/fa';
import BottomNav from '../components/BottomNav';
import '../styles/SearchPage.css';

const STORAGE_PREFIX = 'recentSearches';

const SearchPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [recentKeywords, setRecentKeywords] = useState([]);

  // (선택) 사용자별 저장 분리용 userId
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

  // 초기 로드
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

  const handleSearch = (kw) => {
    const cleaned = kw.trim();
    if (!cleaned) return;
    addRecent(cleaned);
    navigate(`/search-result?query=${encodeURIComponent(cleaned)}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch(keyword);
  };

  const recent4 = recentKeywords.slice(0, 4);
  const popularKeywords = ['노인 복지', '의료비 신청', '임산부', '청년 일자리'];

  const clearRecent = () => {
    setRecentKeywords([]);
    saveRecent([]);
  };

  return (
    <div className="search-page">
      <div className="search-top">
        <div className="icon-left">
          {/* ✅ 카테고리 페이지로 이동 */}
          <button className="icon-btn" onClick={() => navigate('/category')}>
            <FaBars />
          </button>
        </div>
        <div className="icon-right">
          {/* ✅ 알림 버튼 → /alarms */}
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
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div className="recent-section">
        <strong>최근 검색어</strong>
        <div className="tags">
          {recent4.length === 0 ? (
            <span className="empty-hint">아직 검색 기록이 없어요</span>
          ) : (
            recent4.map((kw, i) => (
              <button key={`${kw}-${i}`} onClick={() => handleSearch(kw)}>
                {kw}
              </button>
            ))
          )}
        </div>

        {/* 테스트용 */}
        <div className="test-tools">
          <button className="test-btn" onClick={clearRecent}>초기화</button>
        </div>
      </div>

      <div className="popular-section">
        <strong>인기 검색어</strong>
        <div className="popular-keywords">
          {popularKeywords.map((kw, i) => (
            <div key={i} onClick={() => handleSearch(kw)} className="keyword-icon">
              <div className="emoji">{['👵', '💰', '👩‍⚕️', '💼'][i]}</div>
              <span>{kw}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ 항상 홈 탭 활성화 */}
      <BottomNav activePath="/" />
    </div>
  );
};

export default SearchPage;
