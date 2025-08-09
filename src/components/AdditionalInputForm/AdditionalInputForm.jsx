import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdditionalInputForm.module.css';
import Backicon from '../../assets/back.svg';
import Arrowicon from '../../assets/arrow.svg';

const AdditionalInputForm = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    console.log('뒤로가기 클릭');
    navigate('/hireinput');
  };

  const [additional, setAdditional] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAdditionalSelect = (selectedAdditional) => {
    if (additional.includes(selectedAdditional)) {
      // 이미 선택된 항목이면 제거
      setAdditional(additional.filter((item) => item !== selectedAdditional));
    } else {
      // 새로운 항목 추가
      setAdditional([...additional, selectedAdditional]);
    }
    // 드롭다운은 닫지 않음
  };

  return (
    <>
      <div className={styles.backbutton} onClick={handleBackClick}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.highlight}>추가 정보 수집을 위한<br />해당 사항</span>을<br />선택해주세요
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
                className={`${styles.additionalItem} ${additional.includes('노인') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('노인')}
              >
                <span>노인</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalItem} ${additional.includes('장애인') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('장애인')}
              >
                <span>장애인</span>
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
                className={`${styles.additionalItem} ${additional.includes('특수 가정') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('특수 가정')}
              >
                <span>특수 가정</span>
              </div>
            </div>
          )}
        </div>
        <button className={styles.authBtn}>다음</button>
      </div>
    </>
  );
};

export default AdditionalInputForm;