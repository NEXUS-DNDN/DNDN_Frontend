import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DisabilityForm.module.css';
import Backicon from '../../assets/back.svg';

const DisabilityForm = () => {
  const handleBackClick = () => {
    navigate('/additionaltypeinput');
    console.log('뒤로가기 클릭');
  };

  const navigate = useNavigate();
  const handleNextClick = () => {
    navigate('/disabilitygrade');
  };

  const [isRegistered, setIsRegistered] = useState(null);

  const handleYesClick = () => {
    setIsRegistered(true);
    localStorage.setItem('disabilityRegistered', 'true');
  };

  const handleNoClick = () => {
    setIsRegistered(false);
    localStorage.setItem('disabilityRegistered', 'false');
  };

  const handleSkipClick = () => {
    console.log('건너뛰기 클릭');
    setIsRegistered(null);
    localStorage.removeItem('disabilityRegistered');
    navigate('/disabilitygrade');
  };

  useEffect(() => {
    const savedDisabilityRegistered = localStorage.getItem('disabilityRegistered');
    if (savedDisabilityRegistered === 'true') setIsRegistered(true);
    else if (savedDisabilityRegistered === 'false') setIsRegistered(false);
  }, []);

  return (
    <>
      <div className={styles.backbutton} onClick={handleBackClick}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.highlight}>장애 등록 여부</span>를<br />선택해주세요
        </div>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.optionButton} ${isRegistered === true ? styles.selected : ''}`}
            onClick={handleYesClick}
          >
            예
          </button>
          <button
            className={`${styles.optionButton} ${isRegistered === false ? styles.selected : ''}`}
            onClick={handleNoClick}
          >
            아니오
          </button>
        </div>
        <button className={styles.skipButton} onClick={handleSkipClick}>
          건너뛰기
        </button>
        <button className={styles.authBtn} onClick={handleNextClick}>다음</button>
        
      </div>
    </>
  );
};

export default DisabilityForm;