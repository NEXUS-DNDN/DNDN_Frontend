import React, { useState, useEffect } from 'react';
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

  // localStorage에서 hire 불러오기
  useEffect(() => {
    const savedHire = localStorage.getItem('hire');
    if (savedHire) {
      setHire(savedHire);
    }
  }, []);

  // hire 변경 시 localStorage에 저장
  useEffect(() => {
    if (hire) {
      localStorage.setItem('hire', hire);
    }
  }, [hire]);

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
              <div className={`${styles.hireItem} ${hire === '재직 중' ? styles.selectedItem : ''}`} onClick={() => handleHireSelect('재직 중')}>
                재직 중
              </div>
              <div className={styles.divider} />
              <div className={`${styles.hireItem} ${hire === '프리랜서' ? styles.selectedItem : ''}`} onClick={() => handleHireSelect('프리랜서')}>
                프리랜서
              </div>
              <div className={styles.divider} />
              <div className={`${styles.hireItem} ${hire === '구직 중' ? styles.selectedItem : ''}`} onClick={() => handleHireSelect('구직 중')}>
                구직 중
              </div>
              <div className={styles.divider} />
              <div className={`${styles.hireItem} ${hire === '무직' ? styles.selectedItem : ''}`} onClick={() => handleHireSelect('무직')}>
                무직
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