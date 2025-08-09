import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HireInputForm.module.css';
import Backicon from '../../assets/back.svg';
import Arrowicon from '../../assets/arrow.svg';

const HireInputForm = () => {
  const handleBackClick = () => {
    console.log('뒤로가기 클릭');
    navigate('/salaryinput');
  };

  const navigate = useNavigate();
  const handleNextClick = () => {
     navigate('/additionalinput');
   };

  const [hire, setHire] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleHireSelect = (selectedHire) => {
    setHire(selectedHire);
    setIsDropdownOpen(false);
  };

  
  return (
    <>
      <div className={styles.backbutton} onClick={handleBackClick}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.highlight}>고용 상태</span>를<br />선택해주세요
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.hireInput} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span className={`${styles.hireText} ${hire ? styles.selected : ''}`}>{hire || '고용 상태'}</span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          {isDropdownOpen && (
            <div className={styles.hireDropdown}>
              <div className={styles.hireItem}>
                <span onClick={() => handleHireSelect('재직 중')}>재직 중</span>
              </div>
              <div className={styles.divider} />
              <div className={styles.hireItem}>
                <span onClick={() => handleHireSelect('프리랜서')}>프리랜서</span>
              </div>
              <div className={styles.divider} />
              <div className={styles.hireItem}>
                <span onClick={() => handleHireSelect('구직 중')}>구직 중</span>
              </div>
              <div className={styles.divider} />
              <div className={styles.hireItem}>
                <span onClick={() => handleHireSelect('무직')}>무직</span>
              </div>
            </div>
          )}
        </div>
        <button className={styles.authBtn} onClick={handleNextClick}>다음</button>
      </div>
    </>
  );
};

export default HireInputForm;