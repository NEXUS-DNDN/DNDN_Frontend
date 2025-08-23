import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdditional } from '../../context/AdditionalContext';
import styles from './AdditionalTypeInputForm.module.css';
import Backicon from '../../assets/back.svg';
import Arrowicon from '../../assets/arrow.svg';

const AdditionalTypeInputForm = () => {
  const navigate = useNavigate();
  const { additional, setAdditional, setCurrentStep } = useAdditional();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // localStorage와 동기화 (초기 로드 시 빈 상태로 시작)
  useEffect(() => {
    const savedAdditionalType = localStorage.getItem('additionalType');
    if (savedAdditionalType) {
      try {
        const parsedAdditionalType = JSON.parse(savedAdditionalType);
        if (Array.isArray(parsedAdditionalType) && parsedAdditionalType.length <= 1) {
          // 이전 데이터가 있더라도 새로 시작하도록 초기화
          setAdditional([]); // 강제로 빈 배열로 초기화
        }
      } catch (e) {
        console.warn('additionalType 파싱 오류, 기본값 사용:', e);
        setAdditional([]); // 오류 발생 시도 빈 배열
      }
    } else {
      setAdditional([]); // 저장된 데이터가 없으면 빈 배열
    }
  }, [setAdditional]);

  // additional 변경 시 localStorage에 저장 (이동은 하지 않음)
  useEffect(() => {
    if (additional.length > 0) {
      localStorage.setItem('additionalType', JSON.stringify(additional));
    } else {
      localStorage.removeItem('additionalType');
    }
  }, [additional]);

  const handleAdditionalTypeSelect = (selectedAdditionalType) => {
    // 단일 선택만 허용, 기존 선택을 해제하고 새 항목 선택
    if (additional.includes(selectedAdditionalType)) {
      setAdditional([]);
    } else {
      setAdditional([selectedAdditionalType]);
    }
    setIsDropdownOpen(false); // 선택 후 드롭다운 닫기
  };

  const handleNextClick = () => {
    if (additional.includes('장애인')) {
      setCurrentStep('disability');
      navigate('/disability');
    } else {
      navigate('/find'); // 다른 선택 시 기본 경로
    }
  };

  return (
    <>
      <div className={styles.backbutton} onClick={handleBackClick}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.highlight}>생애 주기별 정보 수집을 위한<br />해당 추가 유형</span>을<br />선택해주세요
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.additionalTypeInput} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span className={`${styles.additionalTypeText} ${additional.length > 0 ? styles.selected : ''}`}>
              {additional.length > 0 ? additional[0] : '추가 유형'}
            </span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          {isDropdownOpen && (
            <div className={styles.additionalTypeDropdown}>
              <div
                className={`${styles.additionalTypeItem} ${additional.includes('다문화 · 탈북민') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalTypeSelect('다문화 · 탈북민')}
              >
                <span>다문화 · 탈북민</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalTypeItem} ${additional.includes('다자녀') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalTypeSelect('다자녀')}
              >
                <span>다자녀</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalTypeItem} ${additional.includes('보훈대상자') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalTypeSelect('보훈대상자')}
              >
                <span>보훈대상자</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalTypeItem} ${additional.includes('장애인') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalTypeSelect('장애인')}
              >
                <span>장애인</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalTypeItem} ${additional.includes('저소득') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalTypeSelect('저소득')}
              >
                <span>저소득</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalTypeItem} ${additional.includes('한부모 · 조손') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalTypeSelect('한부모 · 조손')}
              >
                <span>한부모 · 조손</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalTypeItem} ${additional.includes('해당사항 없음') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalTypeSelect('해당사항 없음')}
              >
                <span>해당사항 없음</span>
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

export default AdditionalTypeInputForm;