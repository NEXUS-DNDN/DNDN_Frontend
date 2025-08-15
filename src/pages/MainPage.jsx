import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { FaBell, FaBars, FaTimes } from 'react-icons/fa';

import BottomNav from '../components/BottomNavForm/BottomNav';
import HomeServiceGrid from '../components/HomeServiceForm/HomeServiceGrid';
import CategoryPage from './CategoryPage'; // CategoryPage 모달로 사용
import { services } from '../utils/mockData';
import '../styles/main.css';

// 상단 탭 라벨
const CATEGORY_TABS = ['노인', '의료비', '임산부', '청년', '기타'];

const MainPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterState, setFilterState] = useState({
    lifecycle: [],
    household: [],
    topics: [],
    age: '',
    sido: '',
    sigungu: '',
  });

  const tabLabel = CATEGORY_TABS[activeTab];

  // 탭에 따른 서비스 필터링
  const tabFiltered = useMemo(() => {
    switch (tabLabel) {
      case '노인':
        return services.filter((s) => s.lifeArray === '006');
      case '임산부':
        return services.filter((s) => s.lifeArray === '007');
      case '청년':
        return services.filter((s) => s.lifeArray === '004');
      case '의료비':
        return services.filter(
          (s) =>
            s.category === '보건' ||
            s.intrsThemaArray === '010' ||
            s.intrsThemaArray === '020'
        );
      case '기타':
      default:
        return services.filter(
          (s) =>
            s.lifeArray !== '006' &&
            s.lifeArray !== '007' &&
            s.lifeArray !== '004' &&
            !(s.category === '보건' || s.intrsThemaArray === '010' || s.intrsThemaArray === '020')
        );
    }
  }, [tabLabel]);

  // 필터 상태에 따른 최종 서비스 필터링
  const filteredServices = useMemo(() => {
    const { lifecycle, household, topics, age, sido, sigungu } = filterState;
    if (
      lifecycle.length === 0 &&
      household.length === 0 &&
      topics.length === 0 &&
      !age &&
      !sido &&
      !sigungu
    ) {
      return tabFiltered;
    }

    return tabFiltered.filter((service) => {
      // 생애주기 필터
      const lifeCode = service.lifeArray;
      const isLifeMatch =
        !lifecycle.length ||
        lifecycle.some((l) => {
          // '영유아' -> 001, '아동' -> 002, '청소년' -> 003, '청년' -> 004, '중장년' -> 005, '노년' -> 006, '임신·출산' -> 007
          const lifeMap = {'영유아':'001','아동':'002','청소년':'003','청년':'004','중장년':'005','노년':'006','임신·출산':'007'};
          return lifeMap[l] === lifeCode;
        });

      // 가구 상황 필터
      const isHouseholdMatch =
        !household.length ||
        household.every((h) => {
          // mockData에 housArray가 없으므로 임시로 텍스트 매칭
          return service.description.includes(h);
        });

      // 관심 주제 필터
      const isTopicsMatch =
        !topics.length ||
        topics.every((t) => {
          // mockData에 intrsThemaArray 없으므로 임시로 텍스트 매칭
          return service.title.includes(t);
        });
      
      // 나이 필터 (나이 값만 있을 경우)
      const isAgeMatch = !age || service.ageMin <= age && age <= service.ageMax;

      // 거주지 필터
      const isLocationMatch =
        (!sido && !sigungu) ||
        (sido && service.address.startsWith(sido)) ||
        (sigungu && service.address.includes(sigungu));

      return isLifeMatch && isHouseholdMatch && isTopicsMatch && isAgeMatch && isLocationMatch;
    });
  }, [tabFiltered, filterState]);

  // 필터 칩 렌더링을 위한 배열 생성
  const filterChips = useMemo(() => {
    const { lifecycle, household, topics } = filterState;
    const chips = [];
    chips.push(...lifecycle.map(v => ({ group: 'lifecycle', label: v })));
    chips.push(...household.map(v => ({ group: 'household', label: v })));
    chips.push(...topics.map(v => ({ group: 'topics', label: v })));
    return chips;
  }, [filterState]);

  const removeChip = useCallback((group, label) => {
    setFilterState(prev => ({
      ...prev,
      [group]: prev[group].filter(v => v !== label),
    }));
  }, []);

  const handleFilterApply = useCallback((newFilters) => {
    setFilterState(newFilters);
    setShowFilterModal(false);
  }, []);

  return (
    <div className="main-container">
      {/* ===== 상단 바(로고 + 우측 아이콘) ===== */}
      <div className="top-bar">
        <div className="brand-logo">든든</div>
        <div className="top-right-actions">
          <button
            type="button"
            className="icon-circle"
            aria-label="검색"
            onClick={() => navigate('/search')}
          >
            <FiSearch />
          </button>
          <button
            type="button"
            className="icon-circle bell"
            aria-label="알림"
            onClick={() => navigate('/alarm-list')}
          >
            <FaBell />
          </button>
          <button
            type="button"
            className="icon-circle"
            aria-label="카테고리"
            onClick={() => navigate('/category')}
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* ===== 히어로 카드 ===== */}
      <section className="hero-card">
        <div className="hero-left">
          <h2 className="hero-title">
            홍길동님,<br />이런 복지가 있어요 !
          </h2>
          <ol className="hero-bullets">
            <li><span className="num">1</span> 청년지원</li>
            <li><span className="num">2</span> 월세지원서비스</li>
            <li><span className="num">3</span> 지원서비스</li>
          </ol>
          <button className="hero-more" type="button">더 알아보기 ›</button>
        </div>
        <div className="hero-illus" aria-hidden />
      </section>

      {/* ===== 카테고리 탭 ===== */}
      <nav className="category-tabs">
        {CATEGORY_TABS.map((t, i) => (
          <button
            key={t}
            type="button"
            className={`category-tab ${i === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            {t}
          </button>
        ))}
      </nav>

      {/* ===== 필터 칩 + 정렬 줄 ===== */}
      <div className="chip-row">
        <div className="chip-wrap">
          {filterChips.map((c, idx) => (
            <span key={idx} className="filter-chip">
              {c.label}
              <button
                className="chip-x"
                onClick={() => removeChip(c.group, c.label)}
                aria-label="삭제"
              >
                <FaTimes size={10} />
              </button>
            </span>
          ))}
          <button
            type="button"
            className="filter-btn"
            onClick={() => setShowFilterModal(true)}
          >
            필터+
          </button>
        </div>
        <button type="button" className="sort-btn">인기순 ↕</button>
      </div>

      {/* ===== 필터링된 서비스 그리드 ===== */}
      <HomeServiceGrid services={filteredServices} />

      {/* ===== 필터 모달 ===== */}
      {showFilterModal && (
        <CategoryPage
          onClose={() => setShowFilterModal(false)}
          onApply={handleFilterApply}
          initialFilters={filterState}
        />
      )}

      {/* ===== 하단 내비게이션 ===== */}
      <BottomNav />
    </div>
  );
};

export default MainPage;