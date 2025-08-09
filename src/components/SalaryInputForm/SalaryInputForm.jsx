import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SalaryInputForm.module.css';
import Backicon from '../../assets/back.svg';
import Arrowicon from '../../assets/arrow.svg';

const SalaryInputForm = () => {
  const handleBackClick = () => {
    console.log('뒤로가기 클릭');
    navigate('/familyinput');
  };

  const navigate = useNavigate();
  const handleNextClick = () => {
    navigate('/hireinput');
  };

  const [salary, setSalary] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSalarySelect = (selectedSalary) => {
    setSalary(selectedSalary);
    setIsDropdownOpen(false);
  };

  
  return (
    <>
      <div className={styles.backbutton} onClick={handleBackClick}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.highlight}>월 소득 구간</span>을<br />선택해주세요
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.salaryInput} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span className={`${styles.salaryText} ${salary ? styles.selected : ''}`}>{salary || '301만~400만'}</span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          {isDropdownOpen && (
            <div className={styles.salaryDropdown}>
              <div className={`${styles.salaryItem} ${salary === '100만 원 이하' ? styles.selectedItem : ''}`} onClick={() => handleSalarySelect('100만 원 이하')}>
                <span>100만 원 이하</span>
              </div>
              <div className={styles.divider} />
              <div className={`${styles.salaryItem} ${salary === '101만~200만 원' ? styles.selectedItem : ''}`} onClick={() => handleSalarySelect('101만~200만 원')}>
                <span>101만~200만 원</span>
              </div>
              <div className={styles.divider} />
              <div className={`${styles.salaryItem} ${salary === '201만~300만 원' ? styles.selectedItem : ''}`} onClick={() => handleSalarySelect('201만~300만 원')}>
                <span>201만~300만 원</span>
              </div>
              <div className={styles.divider} />
              <div className={`${styles.salaryItem} ${salary === '301만~400만 원' ? styles.selectedItem : ''}`} onClick={() => handleSalarySelect('301만~400만 원')}>
                <span>301만~400만 원</span>
              </div>
              <div className={styles.divider} />
              <div className={`${styles.salaryItem} ${salary === '401만~500만 원' ? styles.selectedItem : ''}`} onClick={() => handleSalarySelect('401만~500만 원')}>
                <span>401만~500만 원</span>
              </div>
              <div className={styles.divider} />
              <div className={`${styles.salaryItem} ${salary === '501만~600만 원' ? styles.selectedItem : ''}`} onClick={() => handleSalarySelect('501만~600만 원')}>
                <span>501만~600만 원</span>
              </div>
              <div className={styles.divider} />
              <div className={`${styles.salaryItem} ${salary === '601만~700만 원' ? styles.selectedItem : ''}`} onClick={() => handleSalarySelect('601만~700만 원')}>
                <span>601만~700만 원</span>
              </div>
              <div className={styles.divider} />
              <div className={`${styles.salaryItem} ${salary === '701만~800만 원' ? styles.selectedItem : ''}`} onClick={() => handleSalarySelect('701만~800만 원')}>
                <span>701만~800만 원</span>
              </div>
              <div className={styles.divider} />
              <div className={`${styles.salaryItem} ${salary === '801만 원 이상' ? styles.selectedItem : ''}`} onClick={() => handleSalarySelect('801만 원 이상')}>
                <span>801만 원 이상</span>
              </div>
            </div>
          )}
        </div>
        <button className={styles.authBtn} onClick={handleNextClick}>다음</button>
      </div>
    </>
  );
};

export default SalaryInputForm;