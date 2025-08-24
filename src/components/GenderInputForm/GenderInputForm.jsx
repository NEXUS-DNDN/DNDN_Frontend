import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GenderInputForm.module.css';
import Backicon from '../../assets/back.svg';
import Arrowicon from '../../assets/arrow.svg';

const GenderInputForm = () => {
  const handleBackClick = () => {
    console.log('뒤로가기 클릭');
    navigate('/birthdayinput');
  };

  const navigate = useNavigate();
  const handleNextClick = () => {
    navigate('/addressinput');
  };

  const [gender, setGender] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const savedGender = localStorage.getItem('gender');
    if (savedGender) {
      setGender(savedGender);
    }
  }, []);

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    localStorage.setItem('gender', selectedGender);
    setIsDropdownOpen(false);
  };

  
  return (
    <>
      <div className={styles.backbutton} onClick={handleBackClick}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.highlight}>성별</span>을<br />선택해주세요
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.genderInput} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span className={`${styles.genderText} ${gender ? styles.selected : ''}`}>{gender || '성별'}</span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          {isDropdownOpen && (
            <div className={styles.genderDropdown}>
              <div className={`${styles.genderItem} ${gender === '남자' ? styles.selectedItem : ''}`} onClick={() => handleGenderSelect('남자')}>
                남자
              </div>
              <div className={styles.divider} />
              <div className={`${styles.genderItem} ${gender === '여자' ? styles.selectedItem : ''}`} onClick={() => handleGenderSelect('여자')}>
                여자
              </div>
            </div>
          )}
        </div>
        <button className={styles.authBtn} onClick={handleNextClick}>다음</button>
      </div>
    </>
  );
};

export default GenderInputForm;