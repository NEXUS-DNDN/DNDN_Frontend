import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { FaBell, FaBars, FaTimes } from 'react-icons/fa';

import BottomNav from '../components/BottomNavForm/BottomNav';
import HomeServiceGrid from '../components/HomeServiceForm/HomeServiceGrid';
import CategoryPage from './CategoryPage';
import '../styles/main.css';

const CATEGORY_TABS = {
  '영유아': 'INFANT', '아동': 'CHILD', '청소년': 'TEENAGER',
  '청년': 'YOUTH', '중장년': 'MIDDLE', '노년': 'SENIOR', '임신/출산': 'PREGNANT',
};

const MainPage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterState, setFilterState] = useState({
    lifecycle: '', household: [], topics: [],
  });

  const fetchServices = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('lifeCycle', params.lifeCycle);
      if (params.householdTypes && params.householdTypes.length > 0) {
        params.householdTypes.forEach(type => queryParams.append('householdTypes', type));
      }
      if (params.interestTopics && params.interestTopics.length > 0) {
        params.interestTopics.forEach(topic => queryParams.append('interestTopics', topic));
      }
      const url = `/api/welfare/category?${queryParams.toString()}`;
      const response = await fetch(url, { method: 'GET', headers: { 'accept': '*/*' } });
      if (!response.ok) throw new Error('네트워크 응답이 올바르지 않습니다.');
      const apiResponse = await response.json();
      if (apiResponse && apiResponse.welfareList) {
        setServices(apiResponse.welfareList);
      } else {
        setServices([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const activeTabLabel = Object.keys(CATEGORY_TABS)[activeTab];
    const lifeCycleValue = CATEGORY_TABS[activeTabLabel];
    setFilterState(prev => ({
      ...prev, lifecycle: lifeCycleValue, household: [], topics: [],
    }));
    fetchServices({ lifeCycle: lifeCycleValue });
  }, [activeTab, fetchServices]);

  const handleFilterApply = useCallback((newFilters) => {
    setFilterState(prev => ({
      ...prev, household: newFilters.household, topics: newFilters.topics,
    }));
    setShowFilterModal(false);
    const params = {
      lifeCycle: filterState.lifecycle,
      householdTypes: newFilters.household,
      interestTopics: newFilters.topics,
    };
    fetchServices(params);
  }, [filterState.lifecycle, fetchServices]);

  const filterChips = useMemo(() => {
    const { household, topics } = filterState;
    const HOUSEHOLD_MAPPING = {
      'MULTICULTURAL': '다문화/탈북민', 'MULTI_CHILD': '다자녀', 'PATRIOT': '보훈 대상자',
      'DISABLED': '장애인', 'LOW_INCOME': '저소득', 'SINGLE_PARENT': '한부모/조손',
    };
    const TOPICS_MAPPING = {
      'PHYSICAL_HEALTH': '신체건강', 'MENTAL_HEALTH': '정신건강', 'LIVING_SUPPORT': '생활지원',
      'HOUSING': '주거', 'JOB': '일자리', 'CULTURE': '문화/여가', 'SAFETY': '안전/위기',
      'PREGNANT': '임신/출산', 'CHILD_CARE': '보육', 'EDUCATION': '교육',
      'FOSTER_CARE': '입양/위탁', 'CARE': '보호/돌봄', 'FINANCE': '서민금융',
      'LAW': '법률', 'ENERGY': '에너지',
    };
    const chips = [];
    chips.push(...household.map(v => ({ group: 'household', label: HOUSEHOLD_MAPPING[v] || v })));
    chips.push(...topics.map(v => ({ group: 'topics', label: TOPICS_MAPPING[v] || v })));
    return chips;
  }, [filterState]);

  const removeChip = useCallback((group, label) => {
    const KOREAN_TO_API_KEY = {
      '다문화/탈북민': 'MULTICULTURAL', '다자녀': 'MULTI_CHILD', '보훈 대상자': 'PATRIOT',
      '장애인': 'DISABLED', '저소득': 'LOW_INCOME', '한부모/조손': 'SINGLE_PARENT',
      '신체건강': 'PHYSICAL_HEALTH', '정신건강': 'MENTAL_HEALTH', '생활지원': 'LIVING_SUPPORT',
      '주거': 'HOUSING', '일자리': 'JOB', '문화/여가': 'CULTURE', '안전/위기': 'SAFETY',
      '임신/출산': 'PREGNANT', '보육': 'CHILD_CARE', '교육': 'EDUCATION',
      '입양/위탁': 'FOSTER_CARE', '보호/돌봄': 'CARE', '서민금융': 'FINANCE',
      '법률': 'LAW', '에너지': 'ENERGY',
    };
    const keyToRemove = KOREAN_TO_API_KEY[label];
    setFilterState(prev => {
      const newItems = prev[group].filter(v => v !== keyToRemove);
      const params = {
        lifeCycle: prev.lifecycle,
        householdTypes: group === 'household' ? newItems : prev.household,
        interestTopics: group === 'topics' ? newItems : prev.topics,
      };
      fetchServices(params);
      return { ...prev, [group]: newItems };
    });
  }, [fetchServices]);
  
  // ✅ 로딩 상태에 따라 로딩 스피너를 렌더링합니다.
  if (loading) {
    return (
      <div className="main-container loading-container">
        <div className="loading-spinner"></div>
        <p>서비스를 불러오는 중입니다...</p>
        <BottomNav />
      </div>
    );
  }

  if (error) return (<div className="main-container"><p>데이터를 가져오는 데 실패했습니다: {error}</p><BottomNav /></div>);

  return (
    <div className="main-container">
      <div className="top-bar">
        <div className="brand-logo">든든</div>
        <div className="top-right-actions">
          <button type="button" className="icon-circle" aria-label="검색" onClick={() => navigate('/search')}><FiSearch /></button>
          <button type="button" className="icon-circle bell" aria-label="알림" onClick={() => navigate('/alarms')}><FaBell /></button>
          <button type="button" className="icon-circle" aria-label="카테고리" onClick={() => setShowFilterModal(true)}><FaBars /></button>
        </div>
      </div>
      <section className="hero-card">
        <div className="hero-left">
          <h2 className="hero-title">홍길동님,<br />이런 복지가 있어요 !</h2>
          <ol className="hero-bullets">
            <li><span className="num">1</span> 청년지원</li>
            <li><span className="num">2</span> 월세지원서비스</li>
            <li><span className="num">3</span> 지원서비스</li>
          </ol>
          <button className="hero-more" type="button">더 알아보기 ›</button>
        </div>
        <div className="hero-illus" aria-hidden />
      </section>
      <nav className="category-tabs">
        {Object.keys(CATEGORY_TABS).map((t, i) => (
          <button key={t} type="button" className={`category-tab ${i === activeTab ? 'active' : ''}`} onClick={() => setActiveTab(i)}>{t}</button>
        ))}
      </nav>
      <div className="chip-row">
        <div className="chip-wrap">
          {filterChips.map((c, idx) => (
            <span key={idx} className="filter-chip">{c.label}<button className="chip-x" onClick={() => removeChip(c.group, c.label)} aria-label="삭제"><FaTimes size={10} /></button></span>
          ))}
          <button type="button" className="filter-btn" onClick={() => setShowFilterModal(true)}>필터+</button>
        </div>
        <button type="button" className="sort-btn">인기순 ↕</button>
      </div>
      <HomeServiceGrid services={services} onCardClick={(id) => navigate(`/service-detail/${id}`)} />
      {showFilterModal && (
        <CategoryPage
          onClose={() => setShowFilterModal(false)}
          onApply={handleFilterApply}
          initialFilters={{ household: filterState.household, topics: filterState.topics }}
        />
      )}
      <BottomNav />
    </div>
  );
};

export default MainPage;