import React, { useState } from 'react';
import styles from './AgedAdditionalForm.module.css';
import Backicon from '../../assets/back.svg';
import Arrowicon from '../../assets/arrow.svg';

const AgedAdditionalForm = () => {
  const handleBackClick = () => {
    console.log('뒤로가기 클릭');
  };

  const [additional, setAdditional] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAdditionalSelect = (selectedAdditional) => {
    if (additional.includes(selectedAdditional)) {
      setAdditional(additional.filter((item) => item !== selectedAdditional));
    } else {
      setAdditional([...additional, selectedAdditional]);
    }
  };

  const handleSkipClick = () => {
    console.log('건너뛰기 클릭');
    setAdditional(null);
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
          <div className={styles.additionalInput} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span className={`${styles.additionalText} ${additional.length > 0 ? styles.selected : ''}`}>
              {additional.length > 0 ? additional.join(', ') : '추가 사항'}
            </span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          {isDropdownOpen && (
            <div className={styles.additionalDropdown}>
              <div
                className={`${styles.additionalItem} ${additional.includes('1') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('1')}
              >
                <span>1. 🧠 치매 또는 기억력 저하 증상 있음</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalItem} ${additional.includes('2') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('2')}
              >
                <span>2. 🦵 보행이 불편하거나 휠체어/보행기 사용 중</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalItem} ${additional.includes('3') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('3')}
              >
                <span>3. ❤️ 고혈압, 당뇨 등 만성 질환 있음</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalItem} ${additional.includes('4') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('4')}
              >
                <span>4. 🛌 일상생활에 도움(돌봄)이 필요함</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalItem} ${additional.includes('5') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('5')}
              >
                <span>5. 🗣️ 의사소통(언어/청력)에 어려움 있음</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalItem} ${additional.includes('6') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('6')}
              >
                <span>6. 👀 시력이 많이 나빠져서 일상생활이 어렵다</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalItem} ${additional.includes('7') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('7')}
              >
                <span>7. 🧍 정신건강(우울감, 무기력감 등) 문제 있음</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalItem} ${additional.includes('8') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('8')}
              >
                <span>8. 🚑 최근 6개월 내 병원 입원 경험 있음</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalItem} ${additional.includes('9') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('9')}
              >
                <span>9. 🧓 건강상의 특별한 문제 없음</span>
              </div>
            </div>
          )}
        </div>
        <button className={styles.skipButton} onClick={handleSkipClick}>
            건너뛰기
        </button>
        <button className={styles.authBtn}>다음</button>
      </div>
    </>
  );
};

export default AgedAdditionalForm;