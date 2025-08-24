import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdditional } from '../../context/AdditionalContext';
import styles from './AdditionalInputForm.module.css';
import Backicon from '../../assets/back.svg';
import Arrowicon from '../../assets/arrow.svg';

const AdditionalInputForm = () => {
  const navigate = useNavigate();
  const { additional, setAdditional, setCurrentStep } = useAdditional();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // localStorage와 동기화 (초기 로드)
  useEffect(() => {
    const savedAdditional = localStorage.getItem('additional');
    if (savedAdditional) {
      try {
        const parsedAdditional = JSON.parse(savedAdditional);
        if (Array.isArray(parsedAdditional) && parsedAdditional.length <= 1) {
          setAdditional(parsedAdditional);
        }
      } catch (e) {
        console.warn('additional 파싱 오류, 기본값 사용:', e);
      }
    }
  }, [setAdditional]);

  // additional 변경 시 localStorage에 저장 (이동은 하지 않음)
  useEffect(() => {
    if (additional.length > 0) {
      localStorage.setItem('additional', JSON.stringify(additional));
    } else {
      localStorage.removeItem('additional');
    }
  }, [additional]);

  const handleAdditionalSelect = (selectedAdditional) => {
    // 단일 선택만 허용, 기존 선택을 해제하고 새 항목 선택
    if (additional.includes(selectedAdditional)) {
      setAdditional([]);
    } else {
      setAdditional([selectedAdditional]);
    }
    setIsDropdownOpen(false); // 선택 후 드롭다운 닫기
  };

  const handleNextClick = () => {
    if (additional.includes('노년')) {
      setCurrentStep('aged');
      navigate('/aged');
    } else {
      navigate('/additionaltypeinput'); // 다른 선택 시 기본 경로
    }
  };

  return (
    <>
      <div className={styles.backbutton} onClick={handleBackClick}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.highlight}>생애 주기별 정보 수집을 위한<br />해당 사항</span>을<br />선택해주세요
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.additionalInput} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span className={`${styles.additionalText} ${additional.length > 0 ? styles.selected : ''}`}>
              {additional.length > 0 ? additional[0] : '생애 주기'}
            </span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          {isDropdownOpen && (
            <div className={styles.additionalDropdown}>
              <div
                className={`${styles.additionalItem} ${additional.includes('영유아') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('영유아')}
              >
                <span>영유아</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalItem} ${additional.includes('아동') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('아동')}
              >
                <span>아동</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalItem} ${additional.includes('청소년') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('청소년')}
              >
                <span>청소년</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalItem} ${additional.includes('청년') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('청년')}
              >
                <span>청년</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalItem} ${additional.includes('중장년') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('중장년')}
              >
                <span>중장년</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalItem} ${additional.includes('노년') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('노년')}
              >
                <span>노년</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalItem} ${additional.includes('임신 · 출산') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('임신 · 출산')}
              >
                <span>임신 · 출산</span>
              </div>
            </div>
          )}
        </div>
        <button className={styles.authBtn} onClick={handleNextClick}>다음</button>
    </div>
    </>
  );

  // 뒤로가기 함수
  function handleBackClick() {
    console.log('뒤로가기 클릭');
    navigate('/hireinput');
  }
};

export default AdditionalInputForm;