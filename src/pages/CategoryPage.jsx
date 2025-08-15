import React, { useMemo, useState, useEffect } from 'react';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';
import '../styles/CategoryPage.css';

const LIFECYCLE = ['영유아','아동','청소년','청년','중장년','노년','임신·출산'];
const HOUSEHOLD = ['저소득','장애인','다자녀','다문화','한부모·조손','보훈대상자'];
const TOPICS = ['생활·복지지원','안전·위기','건강·의료','일자리','교육','문화·여가','임신·육아','금융지원','주거·에너지'];

const SIDO = ['서울특별시','부산광역시','경기도'];
const SIGUNGU_MAP = {
  '서울특별시': ['강남구','종로구','마포구'],
  '부산광역시': ['해운대구','수영구'],
  '경기도': ['성남시','수원시','용인시'],
};

const CategoryPage = ({ onClose, onApply, initialFilters }) => {
  const [selected, setSelected] = useState(initialFilters);
  const [age, setAge] = useState(initialFilters.age);
  const [sido, setSido] = useState(initialFilters.sido);
  const [sigungu, setSigungu] = useState(initialFilters.sigungu);

  useEffect(() => {
    // 모달이 열릴 때 스크롤 방지
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const sigunguOptions = useMemo(() => (sido ? SIGUNGU_MAP[sido] || [] : []), [sido]);

  const toggle = (group, item) => {
    setSelected(prev => {
      const has = prev[group].includes(item);
      return { ...prev, [group]: has ? prev[group].filter(v => v !== item) : [...prev[group], item] };
    });
  };

  const removeChip = (group, item) => {
    setSelected(prev => ({ ...prev, [group]: prev[group].filter(v => v !== item) }));
  };

  const chips = [
    ...selected.lifecycle.map(v => ({ group: 'lifecycle', label: v })),
    ...selected.household.map(v => ({ group: 'household', label: v })),
    ...selected.topics.map(v => ({ group: 'topics', label: v })),
  ];

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
              <button className="chip-x" onClick={() => removeChip(c.group, c.label)} aria-label="삭제">
                <FaTimes size={10} />
              </button>
            </span>
          ))}
        </div>

        <div className="cat-content-scroll">
          <div className="cat-section">
            <div className="sec-title">생애 주기</div>
            <div className="pill-grid">
              {LIFECYCLE.map(v => (
                <button
                  key={v}
                  className={`pill ${selected.lifecycle.includes(v) ? 'active' : ''}`}
                  onClick={() => toggle('lifecycle', v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="divider" />

          <div className="cat-section">
            <div className="sec-title">가구 상황</div>
            <div className="pill-grid">
              {HOUSEHOLD.map(v => (
                <button
                  key={v}
                  className={`pill ${selected.household.includes(v) ? 'active' : ''}`}
                  onClick={() => toggle('household', v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="divider" />

          <div className="cat-section">
            <div className="sec-title">관심 주제</div>
            <div className="pill-grid">
              {TOPICS.map(v => (
                <button
                  key={v}
                  className={`pill ${selected.topics.includes(v) ? 'active' : ''}`}
                  onClick={() => toggle('topics', v)}
                >
                  {v}
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