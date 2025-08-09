import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DisabilityGradeForm.module.css';
import Backicon from '../../assets/back.svg';
import Arrowicon from '../../assets/arrow.svg';

const DisabilityGradeForm = () => {
  const handleBackClick = () => {
    console.log('뒤로가기 클릭');
    navigate('/disability');
  };

  const navigate = useNavigate();
  const handleNextClick = () => {
    navigate('/disabilitytype');
  };

  const [disabilitygrade, setDisabilityGrade] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDisabilityGradeSelect = (selectedDisabilityGrade) => {
    setDisabilityGrade(selectedDisabilityGrade);
    setIsDropdownOpen(false);
  };

  const handleSkipClick = () => {
    console.log('건너뛰기 클릭');
    setDisabilityGrade(null);
  };

  return (
    <>
      <div className={styles.backbutton} onClick={handleBackClick}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.highlight}>장애 등급</span>을<br />선택해주세요
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.disabilitygradeInput} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span className={`${styles.disabilitygradeText} ${disabilitygrade ? styles.selected : ''}`}>{disabilitygrade || '장애 등급'}</span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          {isDropdownOpen && (
            <div className={styles.disabilitygradeDropdown}>
              <div className={`${styles.disabilitygradeItem} ${disabilitygrade === '1급' ? styles.selectedItem : ''}`} onClick={() => handleDisabilityGradeSelect('1급')}>
                1급
              </div>
              <div className={styles.divider} />
              <div className={`${styles.disabilitygradeItem} ${disabilitygrade === '2급' ? styles.selectedItem : ''}`} onClick={() => handleDisabilityGradeSelect('2급')}>
                2급
              </div>
              <div className={styles.divider} />
              <div className={`${styles.disabilitygradeItem} ${disabilitygrade === '3급' ? styles.selectedItem : ''}`} onClick={() => handleDisabilityGradeSelect('3급')}>
                3급
              </div>
              <div className={styles.divider} />
              <div className={`${styles.disabilitygradeItem} ${disabilitygrade === '4급' ? styles.selectedItem : ''}`} onClick={() => handleDisabilityGradeSelect('4급')}>
                4급
              </div>
              <div className={styles.divider} />
              <div className={`${styles.disabilitygradeItem} ${disabilitygrade === '5급' ? styles.selectedItem : ''}`} onClick={() => handleDisabilityGradeSelect('5급')}>
                5급
              </div>
              <div className={styles.divider} />
              <div className={`${styles.disabilitygradeItem} ${disabilitygrade === '6급' ? styles.selectedItem : ''}`} onClick={() => handleDisabilityGradeSelect('6급')}>
                6급
              </div>
            </div>
          )}
        </div>
        <button className={styles.skipButton} onClick={handleSkipClick}>
            건너뛰기
        </button>
        <button className={styles.authBtn} onClick={handleNextClick}>다음</button>
      </div>
    </>
  );
};

export default DisabilityGradeForm;