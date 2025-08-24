import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DisabilityTypeForm.module.css';
import Backicon from '../../assets/back.svg';
import Arrowicon from '../../assets/arrow.svg';

const DisabilityTypeForm = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    console.log('뒤로가기 클릭');
    navigate('/disabilitygrade');
  };

  const handleNextClick = () => {
    navigate('/find');
  };

  const [disabilitytype, setDisabilityType] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const savedDisabilityType = localStorage.getItem('disabilityType');
    if (savedDisabilityType) setDisabilityType(savedDisabilityType);
  }, []);

  const handleDisabilityTypeSelect = (selectedDisabilityType) => {
    setDisabilityType(selectedDisabilityType);
    setIsDropdownOpen(false);
    localStorage.setItem('disabilityType', selectedDisabilityType);
  };

  const handleSkipClick = () => {
    console.log('건너뛰기 클릭');
    setDisabilityType(null);
    localStorage.removeItem('disabilityType');
    navigate('/find');
  };

  const disabilityOptions = ['지체', '시각', '청각', '언어', '정신', '자폐'];

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
            <span className={`${styles.disabilitytypeText} ${disabilitytype ? styles.selected : ''}`}>
              {disabilitytype || '장애 유형'}
            </span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          {isDropdownOpen && (
            <div className={styles.disabilitytypeDropdown}>
              {disabilityOptions.map((type, index) => (
                <React.Fragment key={type}>
                  <div
                    className={`${styles.disabilitytypeItem} ${disabilitytype === type ? styles.selectedItem : ''}`}
                    onClick={() => handleDisabilityTypeSelect(type)}
                  >
                    {type}
                  </div>
                  {index < disabilityOptions.length - 1 && <div className={styles.divider} />}
                </React.Fragment>
              ))}
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

export default DisabilityTypeForm;
