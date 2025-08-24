import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AgedAloneForm.module.css';
import Backicon from '../../assets/back.svg';

const AgedAloneForm = () => {
  const handleBackClick = () => {
    console.log('뒤로가기 클릭');
    navigate('/aged');
  };

  const navigate = useNavigate();
  const handleNextClick = () => {
    navigate('/agedadditional');
  };

  const [isRegistered, setIsRegistered] = useState(null);

  const handleYesClick = () => {
    setIsRegistered(true);
  };

  const handleNoClick = () => {
    setIsRegistered(false);
  };

  const handleSkipClick = () => {
    console.log('건너뛰기 클릭');
    setIsRegistered(null);
    navigate('/agedadditional');
  };
  
  return (
    <>
      <div className={styles.backbutton} onClick={handleBackClick}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.highlight}>현재 혼자 거주하고<br />계신가요 ?</span>
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

export default AgedAloneForm;