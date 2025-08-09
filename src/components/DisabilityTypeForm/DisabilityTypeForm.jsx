import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DisabilityTypeForm.module.css';
import Backicon from '../../assets/back.svg';
import Arrowicon from '../../assets/arrow.svg';

const DisabilityTypeForm = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    console.log('뒤로가기 클릭');
    navigate('/disailitygrade');
  };

  const [disabilitytype, setDisabilityType] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDisabilityTypeSelect = (selectedDisabilityType) => {
    setDisabilityType(selectedDisabilityType);
    setIsDropdownOpen(false);
  };

  const handleSkipClick = () => {
    console.log('건너뛰기 클릭');
    setDisabilityType(null);
  };

  return (
    <>
      <div className={styles.backbutton} onClick={handleBackClick}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.highlight}>장애 유형</span>을<br />선택해주세요
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.disabilitytypeInput} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span className={`${styles.disabilitytypeText} ${disabilitytype ? styles.selected : ''}`}>{disabilitytype || '장애 유형'}</span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          {isDropdownOpen && (
            <div className={styles.disabilitytypeDropdown}>
              <div className={`${styles.disabilitytypeItem} ${disabilitytype === '지체' ? styles.selectedItem : ''}`} onClick={() => handleDisabilityTypeSelect('지체')}>
                지체
              </div>
              <div className={styles.divider} />
              <div className={`${styles.disabilitytypeItem} ${disabilitytype === '시각' ? styles.selectedItem : ''}`} onClick={() => handleDisabilityTypeSelect('시각')}>
                시각
              </div>
              <div className={styles.divider} />
              <div className={`${styles.disabilitytypeItem} ${disabilitytype === '청각' ? styles.selectedItem : ''}`} onClick={() => handleDisabilityTypeSelect('청각')}>
                청각
              </div>
              <div className={styles.divider} />
              <div className={`${styles.disabilitytypeItem} ${disabilitytype === '언어' ? styles.selectedItem : ''}`} onClick={() => handleDisabilityTypeSelect('언어')}>
                언어
              </div>
              <div className={styles.divider} />
              <div className={`${styles.disabilitytypeItem} ${disabilitytype === '정신' ? styles.selectedItem : ''}`} onClick={() => handleDisabilityTypeSelect('정신')}>
                정신
              </div>
              <div className={styles.divider} />
              <div className={`${styles.disabilitytypeItem} ${disabilitytype === '자폐' ? styles.selectedItem : ''}`} onClick={() => handleDisabilityTypeSelect('자폐')}>
                자폐
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

export default DisabilityTypeForm;