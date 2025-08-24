import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdditional } from '../../context/AdditionalContext';
import styles from './AgedAdditionalForm.module.css';
import Backicon from '../../assets/back.svg';
import Arrowicon from '../../assets/arrow.svg';

const AgedAdditionalForm = () => {
  const navigate = useNavigate();
  const { additional: initialAdditional, setAdditional } = useAdditional();
  const [agedadditional, setAgedAdditional] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 초기 로드 시 initialAdditional을 기반으로 로컬 상태 설정
  useEffect(() => {
    console.log('Initial load effect triggered with initialAdditional:', initialAdditional);
    if (initialAdditional && initialAdditional.length > 0) {
      setAgedAdditional([...initialAdditional]); // 초기값으로 설정
    }
  }, [initialAdditional]);

  // agedadditional 변경 시 localStorage에 저장, Context는 명시적 호출로 관리
  useEffect(() => {
    console.log('State update effect triggered with:', agedadditional);
    if (agedadditional.length > 0) {
      localStorage.setItem('agedAdditional', JSON.stringify(agedadditional)); // 별도 키 사용
    } else {
      localStorage.removeItem('agedAdditional');
    }
  }, [agedadditional]);

  const handleAdditionalSelect = (selectedAdditional) => {
    console.log('Selecting:', selectedAdditional, 'Current state:', agedadditional);
    if (agedadditional.includes(selectedAdditional)) {
      setAgedAdditional(agedadditional.filter((item) => item !== selectedAdditional));
    } else {
      setAgedAdditional([...agedadditional, selectedAdditional]);
    }
  };

  const handleBackClick = () => {
    console.log('뒤로가기 클릭');
    navigate('/aged');
  };

  const handleSkipClick = () => {
    console.log('건너뛰기 클릭');
    setAgedAdditional([]);
    navigate('/additionaltypeinput'); // 건너뛰기 시도 additionaltypeinput으로 이동
  };

  const handleNextClick = () => {
    console.log('Next click with agedAdditional:', agedadditional);
    setAdditional((prev) => [...prev.filter(item => item !== '노년'), ...agedadditional]); // "노년" 유지 후 추가
    navigate('/additionaltypeinput'); // 다음 버튼 시 additionaltypeinput으로 이동
  };

  return (
    <>
      <div className={styles.backbutton} onClick={handleBackClick}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.highlight}>다음 중<br />해당되는 항목이<br />있으신가요 ?</span>
          <span className={styles.plural}>&#40;복수 선택 가능&#41;</span>
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.agedadditionalInput} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span className={`${styles.additionalText} ${agedadditional.length > 0 ? styles.selected : ''}`}>
              {agedadditional.length > 0 ? agedadditional.join(', ') : '추가 사항'}
            </span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          {isDropdownOpen && (
            <div className={styles.agedadditionalDropdown}>
              <div
                className={`${styles.agedadditionalItem} ${agedadditional.includes('1') ? styles.selectedItem : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdditionalSelect('1');
                }}
              >
                <span>1. 🧠 치매 또는 기억력 저하 증상 있음</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.agedadditionalItem} ${agedadditional.includes('2') ? styles.selectedItem : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdditionalSelect('2');
                }}
              >
                <span>2. 🦵 보행이 불편하거나 휠체어/보행기 사용 중</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.agedadditionalItem} ${agedadditional.includes('3') ? styles.selectedItem : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdditionalSelect('3');
                }}
              >
                <span>3. ❤️ 고혈압, 당뇨 등 만성 질환 있음</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.agedadditionalItem} ${agedadditional.includes('4') ? styles.selectedItem : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdditionalSelect('4');
                }}
              >
                <span>4. 🛌 일상생활에 도움(돌봄)이 필요함</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.agedadditionalItem} ${agedadditional.includes('5') ? styles.selectedItem : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdditionalSelect('5');
                }}
              >
                <span>5. 🗣️ 의사소통(언어/청력)에 어려움 있음</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.agedadditionalItem} ${agedadditional.includes('6') ? styles.selectedItem : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdditionalSelect('6');
                }}
              >
                <span>6. 👀 시력이 많이 나빠져서 일상생활이 어렵다</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.agedadditionalItem} ${agedadditional.includes('7') ? styles.selectedItem : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdditionalSelect('7');
                }}
              >
                <span>7. 🧍 정신건강(우울감, 무기력감 등) 문제 있음</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.agedadditionalItem} ${agedadditional.includes('8') ? styles.selectedItem : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdditionalSelect('8');
                }}
              >
                <span>8. 🚑 최근 6개월 내 병원 입원 경험 있음</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.agedadditionalItem} ${agedadditional.includes('9') ? styles.selectedItem : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdditionalSelect('9');
                }}
              >
                <span>9. 🧓 건강상의 특별한 문제 없음</span>
              </div>
            </div>
          )}
        </div>
        <button className={styles.skipButton} onClick={handleSkipClick}>
          건너뛰기
        </button>
        <button className={styles.authBtn} onClick={handleNextClick}>
          다음
        </button>
      </div>
    </>
  );
};

export default AgedAdditionalForm;