import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FamilyInputForm.module.css';
import Backicon from '../../assets/back.svg';
import Arrowicon from '../../assets/arrow.svg';
import Input from '../common/Input';
import Minusicon from '../../assets/minus.svg';
import Plusicon from '../../assets/plus.svg';

const FamilyInputForm = () => {
  const handleBackClick = () => {
    console.log('뒤로가기 클릭');
    navigate('/addressinput');
  };

  const navigate = useNavigate();
  const handleNextClick = () => {
    navigate('/salaryinput');
  };
  const [family, setFamily] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [familyCount, setFamilyCount] = useState(1);

  const handleFamilySelect = (selectedFamily) => {
    setFamily(selectedFamily);
    setIsDropdownOpen(false);
  };

  const handleIncrease = () => {
    if (familyCount < 7) {
      setFamilyCount(prev => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (familyCount > 1) {
      setFamilyCount(prev => prev - 1);
    }
  };
  
  return (
    <>
      <div className={styles.backbutton} onClick={handleBackClick}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.highlight}>가족 유형</span>을<br />선택해주세요
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.familyInput} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span className={`${styles.familyText} ${family ? styles.selected : ''}`}>{family || '가족 유형'}</span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          {isDropdownOpen && (
            <div className={styles.familyDropdown}>
              <div className={styles.familyItem}>
                <span onClick={() => handleFamilySelect('일반 가구')}>일반 가구</span>
              </div>
              <div className={styles.divider} />
              <div className={styles.familyItem}>
                <span onClick={() => handleFamilySelect('한부모 가정')}>한부모 가정</span>
              </div>
              <div className={styles.divider} />
              <div className={styles.familyItem}>
                <span onClick={() => handleFamilySelect('조손 가정')}>조손 가정</span>
              </div>
              <div className={styles.divider} />
              <div className={styles.familyItem}>
                <span onClick={() => handleFamilySelect('독거')}>독거</span>
              </div>
              <div className={styles.divider} />
              <div className={styles.familyItem}>
                <span onClick={() => handleFamilySelect('다문화 가정')}>다문화 가정</span>
              </div>
              <div className={styles.divider} />
              <div className={styles.familyItem}>
                <span onClick={() => handleFamilySelect('기타')}>기타</span>
              </div>
            </div>
          )}
          <div className={styles.memberGroup}>
            <div className={styles.memberInput}>
              <img src={Minusicon} alt="감소" className={styles.minus} onClick={handleDecrease} />
              <span className={styles.counterValue}>
                {familyCount === 7 ? '7명 이상' : familyCount}
              </span>
              <img src={Plusicon} alt="증가" className={styles.plus} onClick={handleIncrease} />
            </div>
          </div>
        </div>
        <button className={styles.authBtn} onClick={handleNextClick}>다음</button>
      </div>
    </>
  );
};

export default FamilyInputForm;