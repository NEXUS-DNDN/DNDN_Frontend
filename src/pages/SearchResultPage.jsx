import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaBell, FaArrowLeft, FaTimes } from 'react-icons/fa';
import BottomNav from '../components/BottomNavForm/BottomNav';
import SearchResultCard from '../components/SearchResultCardForm/SearchResultCard';
import CategoryPage from './CategoryPage';
import '../styles/SearchResultPage.css';

const CATEGORY_TABS = {
  '영유아': 'INFANT', '아동': 'CHILD', '청소년': 'TEENAGER',
  '청년': 'YOUTH', '중장년': 'MIDDLE', '노년': 'SENIOR', '임신/출산': 'PREGNANT',
};

const SearchResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [services, setServices] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [query, setQuery] = useState('');
  const [filterState, setFilterState] = useState({
    lifecycle: '',
    household: [],
    topics: [],
    age: '',
    sido: '',
    sigungu: '',
  });

  const getSearchParams = useCallback(() => {
    const sp = new URLSearchParams(location.search);
    return {
      query: sp.get('query') || '',
      lifeCycle: sp.get('lifeCycle') || '',
      household: sp.getAll('householdTypes'),
      topics: sp.getAll('interestTopics'),
      age: sp.get('age') || '',
      sido: sp.get('sido') || '',
      sigungu: sp.get('sigungu') || '',
    };
  }, [location.search]);

  // ✅ API 호출 함수를 검색어와 필터에 따라 분기 처리
  const fetchSearchResults = useCallback(async (params) => {
    const hasCategoryParams = params.lifeCycle || params.household.length > 0 || params.topics.length > 0;
    const hasSearchParams = params.query;
    
    // 유효한 파라미터가 없으면 API 호출을 중단
    if (!hasCategoryParams && !hasSearchParams) {
      setServices([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      let url;

      if (hasSearchParams) {
        // 검색어가 있는 경우, search API 호출
        queryParams.append('title', params.query);
        url = `https://nexusdndn.duckdns.org/welfare/search?${queryParams.toString()}`;
      } else {
        // 검색어가 없고 필터만 있는 경우, category API 호출
        if (params.lifeCycle) queryParams.append('lifeCycle', params.lifeCycle);
        if (params.household && params.household.length > 0) {
          params.household.forEach(type => queryParams.append('householdTypes', type));
        }
        if (params.topics && params.topics.length > 0) {
          params.topics.forEach(topic => queryParams.append('interestTopics', topic));
        }
        url = `https://nexusdndn.duckdns.org/welfare/category?${queryParams.toString()}`;
      }

      if (params.age) queryParams.append('age', params.age);
      if (params.sido) queryParams.append('sido', params.sido);
      if (params.sigungu) queryParams.append('sigungu', params.sigungu);

      const response = await fetch(url, { method: 'GET', headers: { 'accept': '*/*' } });
      if (!response.ok) throw new Error('네트워크 응답이 올바르지 않습니다.');
      const apiResponse = await response.json();
      setServices(apiResponse.welfareList || []);
    } catch (err) {
      setError(err.message);
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const params = getSearchParams();
    const isInitialLoad = !params.lifeCycle && !params.household.length && !params.topics.length;
    
    if (isInitialLoad && params.query) {
      handleUpdateUrl({ ...params, lifeCycle: 'INFANT' });
    } else {
      setQuery(params.query);
      setFilterState({
        lifecycle: params.lifeCycle,
        household: params.household,
        topics: params.topics,
        age: params.age,
        sido: params.sido,
        sigungu: params.sigungu,
      });
      fetchSearchResults(params);
    }
  }, [location.search, getSearchParams, fetchSearchResults]);
  
  const handleUpdateUrl = useCallback((newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.query) params.append('query', newFilters.query);
    if (newFilters.lifecycle) params.append('lifeCycle', newFilters.lifecycle);
    if (newFilters.household && newFilters.household.length > 0) {
      newFilters.household.forEach(type => params.append('householdTypes', type));
    }
    if (newFilters.topics && newFilters.topics.length > 0) {
      newFilters.topics.forEach(topic => params.append('interestTopics', topic));
    }
    if (newFilters.age) params.append('age', newFilters.age);
    if (newFilters.sido) params.append('sido', newFilters.sido);
    if (newFilters.sigungu) params.append('sigungu', newFilters.sigungu);

    navigate(`/search-result?${params.toString()}`);
  }, [navigate]);

  const handleFilterApply = useCallback((newFilters) => {
    setShowFilterModal(false);
    handleUpdateUrl({ ...newFilters, query });
  }, [query, handleUpdateUrl]);

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUpdateUrl({ ...filterState, query: e.target.value });
    }
  };

  const handleRemoveChip = useCallback((group, label) => {
    const KOREAN_TO_API_KEY = {
      '다문화/탈북민': 'MULTICULTURAL', '다자녀': 'MULTI_CHILD', '보훈 대상자': 'PATRIOT',
      '장애인': 'DISABLED', '저소득': 'LOW_INCOME', '한부모/조손': 'SINGLE_PARENT',
      '신체건강': 'PHYSICAL_HEALTH', '정신건강': 'MENTIN_HEALTH', '생활지원': 'LIVING_SUPPORT',
      '주거': 'HOUSING', '일자리': 'JOB', '문화/여가': 'CULTURE', '안전/위기': 'SAFETY',
      '임신/출산': 'PREGNANT', '보육': 'CHILD_CARE', '교육': 'EDUCATION',
      '입양/위탁': 'FOSTER_CARE', '보호/돌봄': 'CARE', '서민금융': 'FINANCE',
      '법률': 'LAW', '에너지': 'ENERGY',
    };
    const keyToRemove = KOREAN_TO_API_KEY[label];
    const newFilters = { ...filterState };
    newFilters[group] = newFilters[group].filter(v => v !== keyToRemove);
    handleUpdateUrl({ ...newFilters, query });
  }, [filterState, query, handleUpdateUrl]);

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

  if (loading) {
    return (
      <div className="search-result-page loading-container">
        <div className="loading-spinner"></div>
        <p>검색 결과를 불러오는 중입니다...</p>
        <BottomNav />
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-result-page">
        <p>데이터를 가져오는 데 실패했습니다: {error}</p>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="search-result-page">
      <div className="search-top">
        <div className="icon-left">
          <button className="icon-btn" onClick={() => setShowFilterModal(true)}>
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
          onKeyPress={handleSearchKeyPress}
        />
      </div>

      <div className="chip-row">
        {Object.keys(CATEGORY_TABS).map((t) => {
          const apiValue = CATEGORY_TABS[t];
          const isActive = apiValue === filterState.lifecycle;
          return (
            <button
              key={t}
              className={`category-tab ${isActive ? 'active' : ''}`}
              onClick={() => handleUpdateUrl({ ...filterState, lifecycle: isActive ? '' : apiValue, query })}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="filter-chips">
        <div className="chip-wrap">
          {filterChips.map((c, idx) => (
            <span key={idx} className="filter-chip-display">
              {c.label}
              <button
                className="chip-x"
                onClick={() => handleRemoveChip(c.group, c.label)}
                aria-label="삭제"
              >
                <FaTimes size={10} />
              </button>
            </span>
          ))}
          <button type="button" className="filter-btn" onClick={() => setShowFilterModal(true)}>
            필터+
          </button>
        </div>
        <button type="button" className="sort-btn">인기순 ↕</button>
      </div>

      <div className="search-title">검색 결과 {services.length}개</div>

      <div className="result-list">
        {services.length > 0 ? (
          services.map((item) => (
            <SearchResultCard
              key={item.welfareId}
              item={item}
              onCardClick={() => navigate(`/service-detail/${item.welfareId}`)}
            />
          ))
        ) : (
          <div className="no-results">
            {query
              ? `"${query}"에 대한 검색 결과가 없습니다.`
              : '조건에 맞는 검색 결과가 없습니다.'}
          </div>
        )}
      </div>

      {showFilterModal && (
        <CategoryPage
          onClose={() => setShowFilterModal(false)}
          onApply={handleFilterApply}
          initialFilters={{
            household: filterState.household,
            topics: filterState.topics,
            age: filterState.age,
            sido: filterState.sido,
            sigungu: filterState.sigungu,
          }}
        />
      )}

      <BottomNav />
    </div>
  );
};

export default SearchResultPage;