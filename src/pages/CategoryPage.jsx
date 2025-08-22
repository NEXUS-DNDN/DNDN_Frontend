import React, { useMemo, useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import '../styles/CategoryPage.css';

// API 용어와 한국어 라벨을 매칭
const HOUSEHOLD_MAP = {
  MULTICULTURAL: '다문화/탈북민',
  MULTI_CHILD: '다자녀',
  PATRIOT: '보훈 대상자',
  DISABLED: '장애인',
  LOW_INCOME: '저소득',
  SINGLE_PARENT: '한부모/조손',
};

const TOPICS_MAP = {
  PHYSICAL_HEALTH: '신체건강',
  MENTAL_HEALTH: '정신건강',
  LIVING_SUPPORT: '생활지원',
  HOUSING: '주거',
  JOB: '일자리',
  CULTURE: '문화/여가',
  SAFETY: '안전/위기',
  PREGNANT: '임신/출산',
  CHILD_CARE: '보육',
  EDUCATION: '교육',
  FOSTER_CARE: '입양/위탁',
  CARE: '보호/돌봄',
  FINANCE: '서민금융',
  LAW: '법률',
  ENERGY: '에너지',
};

const SIDO = ['서울특별시', '부산광역시', '경기도'];
const SIGUNGU_MAP = {
  '서울특별시': ['강남구', '종로구', '마포구'],
  '부산광역시': ['해운대구', '수영구'],
  '경기도': ['성남시', '수원시', '용인시'],
};

const CategoryPage = ({ onClose, onApply, initialFilters }) => {
  const [selected, setSelected] = useState(initialFilters);
  const [age, setAge] = useState(initialFilters.age);
  const [sido, setSido] = useState(initialFilters.sido);
  const [sigungu, setSigungu] = useState(initialFilters.sigungu);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const sigunguOptions = useMemo(() => (sido ? SIGUNGU_MAP[sido] || [] : []), [sido]);

  // 선택된 항목의 순서를 유지하고 중복을 방지하는 로직
  const toggle = (group, item) => {
    setSelected(prev => {
      const current = new Set(prev[group]);
      if (current.has(item)) {
        current.delete(item);
      } else {
        current.add(item);
      }
      return { ...prev, [group]: Array.from(current) };
    });
  };

  const removeChip = (group, label) => {
    // 한국어 라벨을 API 키로 변환
    const map = group === 'household' ? HOUSEHOLD_MAP : TOPICS_MAP;
    const keyToRemove = Object.keys(map).find(key => map[key] === label);

    if (keyToRemove) {
      setSelected(prev => ({
        ...prev,
        [group]: prev[group].filter(v => v !== keyToRemove)
      }));
    }
  };

  // selected 배열의 순서를 그대로 사용하여 칩을 생성
  const chips = useMemo(() => {
    const chipList = [];
    chipList.push(
      ...selected.household.map(v => ({ group: 'household', label: HOUSEHOLD_MAP[v] || v })),
      ...selected.topics.map(v => ({ group: 'topics', label: TOPICS_MAP[v] || v }))
    );
    return chipList;
  }, [selected]);

  const doApply = () => {
    onApply({
      ...selected,
      age: age,
      sido: sido,
      sigungu: sigungu,
    });
  };

  return (
    <div className="category-overlay">
      <div className="category-page slide-up">
        <div className="cat-top">
          <button className="icon-btn" onClick={onClose} aria-label="닫기">
            <FaTimes />
          </button>
          <div className="cat-title">상세 필터</div>
          <div style={{ width: 28 }} />
        </div>

        <div className="chip-row">
          {chips.map((c, idx) => (
            <span key={idx} className="chip-selected">
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
        </div>

        <div className="cat-content-scroll">
          <div className="cat-section">
            <div className="sec-title">가구 상황</div>
            <div className="pill-grid">
              {Object.entries(HOUSEHOLD_MAP).map(([key, value]) => (
                <button
                  key={key}
                  className={`pill ${selected.household.includes(key) ? 'active' : ''}`}
                  onClick={() => toggle('household', key)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="divider" />

          <div className="cat-section">
            <div className="sec-title">관심 주제</div>
            <div className="pill-grid">
              {Object.entries(TOPICS_MAP).map(([key, value]) => (
                <button
                  key={key}
                  className={`pill ${selected.topics.includes(key) ? 'active' : ''}`}
                  onClick={() => toggle('topics', key)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="divider" />

          <div className="cat-section">
            <div className="sec-title">나이</div>
            <div className="age-row">
              <input
                type="number"
                className="age-input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="0"
                placeholder="나이"
              />
              <span className="age-suffix">세</span>
            </div>
          </div>

          <div className="divider" />

          <div className="cat-section">
            <div className="sec-title">거주지</div>
            <div className="addr-row">
              <select className="addr-select" value={sido} onChange={(e) => { setSido(e.target.value); setSigungu(''); }}>
                <option value="">시/도 선택</option>
                {SIDO.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select className="addr-select" value={sigungu} onChange={(e) => setSigungu(e.target.value)} disabled={!sido}>
                <option value="">{sido ? '시/군/구 선택' : '시/도 먼저 선택'}</option>
                {sigunguOptions.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="cat-footer">
          <button className="search-btn" onClick={doApply}>적용하기</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;