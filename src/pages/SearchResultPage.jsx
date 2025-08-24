import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';
import BottomNav from '../components/BottomNavForm/BottomNav';
import SearchResultCard from '../components/SearchResultCardForm/SearchResultCard';
import CategoryPage from './CategoryPage';
import '../styles/SearchResultPage.css';
import { useAuth } from '../context/AuthContext.jsx';

const CATEGORY_TABS = {
  '영유아': 'INFANT', '아동': 'CHILD', '청소년': 'TEENAGER',
  '청년': 'YOUTH', '중장년': 'MIDDLE', '노년': 'SENIOR', '임신/출산': 'PREGNANT',
};

const SearchResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { accessToken } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [services, setServices] = useState([]);
  const [interestList, setInterestList] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [query, setQuery] = useState('');
  const [filterState, setFilterState] = useState({
    lifeCycle: '',
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

  const handleUpdateUrl = useCallback((newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.query) params.append('query', newFilters.query);
    if (newFilters.lifeCycle) params.append('lifeCycle', newFilters.lifeCycle);
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

  const fetchInterestList = useCallback(async () => {
    if (!accessToken) return;
    try {
      const response = await fetch('https://nexusdndn.duckdns.org/interest', {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      if (data.isSuccess) {
        setInterestList(data.result.interestList);
      }
    } catch (err) {
      console.error("Failed to fetch interest list:", err);
    }
  }, [accessToken]);

  const fetchSearchResults = useCallback(async (params) => {
    const hasCategoryParams = params.lifeCycle || params.household.length > 0 || params.topics.length > 0 || params.age || params.sido || params.sigungu;
    const hasSearchParams = params.query;
    
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

      if (hasSearchParams && hasCategoryParams) {
        queryParams.append('keyword', params.query);
        if (params.lifeCycle) queryParams.append('lifeCycle', params.lifeCycle);
        if (params.household && params.household.length > 0) {
          params.household.forEach(type => queryParams.append('householdTypes', type));
        }
        if (params.topics && params.topics.length > 0) {
          params.topics.forEach(topic => queryParams.append('interestTopics', topic));
        }
        if (params.age) queryParams.append('age', params.age);
        if (params.sido) queryParams.append('sido', params.sido);
        if (params.sigungu) queryParams.append('sigungu', params.sigungu);
        url = `https://nexusdndn.duckdns.org/welfare/search/filter?${queryParams.toString()}`;
      } else if (hasSearchParams && !hasCategoryParams) {
        queryParams.append('title', params.query);
        url = `https://nexusdndn.duckdns.org/welfare/search?${queryParams.toString()}`;
      } else {
        if (params.lifeCycle) queryParams.append('lifeCycle', params.lifeCycle);
        if (params.household && params.household.length > 0) {
          params.household.forEach(type => queryParams.append('householdTypes', type));
        }
        if (params.topics && params.topics.length > 0) {
          params.topics.forEach(topic => queryParams.append('interestTopics', topic));
        }
        if (params.age) queryParams.append('age', params.age);
        if (params.sido) queryParams.append('sido', params.sido);
        if (params.sigungu) queryParams.append('sigungu', params.sigungu);
        url = `https://nexusdndn.duckdns.org/welfare/category?${queryParams.toString()}`;
      }

      const response = await fetch(url, { 
        method: 'GET', 
        headers: { 
          'accept': '*/*',
          'Authorization': `Bearer ${accessToken}`
        } 
      });
      if (!response.ok) throw new Error('네트워크 응답이 올바르지 않습니다.');
      const apiResponse = await response.json();
      setServices(apiResponse.result.welfareList || []);
    } catch (err) {
      setError(err.message);
      setServices([]);
    } finally {
      setLoading(false);
      fetchInterestList();
    }
  }, [accessToken, fetchInterestList]);

  useEffect(() => {
    const params = getSearchParams();
    
    if (params.query && !params.lifeCycle) {
      handleUpdateUrl({ ...params, lifeCycle: 'INFANT' });
    } else {
      setQuery(params.query);
      setFilterState({
        lifeCycle: params.lifeCycle,
        household: params.household,
        topics: params.topics,
        age: params.age,
        sido: params.sido,
        sigungu: params.sigungu,
      });
      fetchSearchResults(params);
    }
  }, [location.search, getSearchParams, fetchSearchResults, handleUpdateUrl]);
  
  const handleFilterApply = useCallback((newFilters) => {
    setShowFilterModal(false);
    handleUpdateUrl({
      ...filterState,
      ...newFilters,
      query
    });
  }, [filterState, query, handleUpdateUrl]);

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUpdateUrl({ ...filterState, query: e.target.value });
    }
  };

  const handleRemoveChip = useCallback((group, apiValue) => {
    const newFilters = { ...filterState };
    if (group === 'age') {
      newFilters.age = '';
    } else if (group === 'sigungu') {
      newFilters.sido = '';
      newFilters.sigungu = '';
    } else if (group === 'sido') {
      newFilters.sido = '';
    } else {
      newFilters[group] = newFilters[group].filter(v => v !== apiValue);
    }
    handleUpdateUrl({ ...newFilters, query });
  }, [filterState, query, handleUpdateUrl]);

  const filterChips = useMemo(() => {
    const { household, topics, age, sido, sigungu } = filterState;
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
    if (age) {
      chips.push({ group: 'age', label: `${age}세`, key: age });
    }
    if (sigungu) {
      chips.push({ group: 'sigungu', label: `${sido} ${sigungu}`, key: sigungu });
    } else if (sido) {
      chips.push({ group: 'sido', label: sido, key: sido });
    }
    chips.push(...household.map(v => ({ group: 'household', label: HOUSEHOLD_MAPPING[v] || v, key: v })));
    chips.push(...topics.map(v => ({ group: 'topics', label: TOPICS_MAPPING[v] || v, key: v })));
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
      {/* 제거된 헤더 영역 */}
      <div className="search-input-row">
        <button className="back-btn" onClick={() => navigate('/search')}>
          <FaArrowLeft />
        </button>
        <input
          className="search-input"
          type="text"
          placeholder="검색어를 입력하세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleSearchKeyPress}
        />
      </div>

      <div className="chip-row">
        {Object.keys(CATEGORY_TABS).map((t) => {
          const apiValue = CATEGORY_TABS[t];
          const isActive = apiValue === filterState.lifeCycle;
          return (
            <button
              key={t}
              className={`category-tab ${isActive ? 'active' : ''}`}
              onClick={() => handleUpdateUrl({ ...filterState, lifeCycle: isActive ? '' : apiValue, query })}
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
                onClick={() => handleRemoveChip(c.group, c.key)}
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
          services.map((item) => {
            const isInterested = interestList.some(i => i.welfareId === item.welfareId);
            return (
              <SearchResultCard
                key={item.welfareId}
                item={item}
                onCardClick={() => navigate(`/service-detail/${item.welfareId}`)}
                viewCount={item.viewCount}
                isInterested={isInterested}
              />
            );
          })
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