import React, { useState, useEffect } from 'react';
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
  const [familyCount, setFamilyCount] = useState(() => {
    const saved = localStorage.getItem('familyCount');
    return saved ? parseInt(saved, 10) : 1;
  });

  // localStorage에서 salary 불러오기 및 상태 동기화
  useEffect(() => {
    const savedFamilyCount = localStorage.getItem('familyCount');
    const savedSalary = localStorage.getItem('salary');
    
    console.log('복원된 familyCount:', savedFamilyCount);
    console.log('복원된 salary:', savedSalary);

    if (savedSalary) {
      setSalary(savedSalary);
    }
    if (savedFamilyCount) {
      const parsedCount = parseInt(savedFamilyCount, 10);
      if (!isNaN(parsedCount)) {
        setFamilyCount(parsedCount);
      } else {
        console.warn('familyCount가 유효하지 않음, 기본값 1 사용');
      }
    }
  }, []);

  // salary와 familyCount 변경 시 localStorage에 저장
  useEffect(() => {
    console.log('저장 중 - salary:', salary, 'familyCount:', familyCount);
    if (salary) {
      localStorage.setItem('salary', salary);
    }
    localStorage.setItem('familyCount', familyCount.toString());
  }, [salary, familyCount]);

  const handleSalarySelect = (selectedSalary) => {
    setSalary(selectedSalary);
    setIsDropdownOpen(false);
  };

  // 소득 구간에 따른 중위소득 백분율 계산
  const getIncomePercentage = (familyCount, salary) => {
    const baseIncome = 3500000;
  
    // 가구원 수에 따른 중위소득 조정 (제곱근으로 완화)
    const adjustedBaseIncome = baseIncome * Math.sqrt(familyCount / 3);

    // 소득 구간의 중간값 매핑
    const salaryRanges = {
      '100만 원 이하': 500000,
      '101만~200만 원': 1505000,
      '201만~300만 원': 2505000,
      '301만~400만 원': 3505000,
      '401만~500만 원': 4505000,
      '501만~600만 원': 5505000,
      '601만~700만 원': 6505000,
      '701만~800만 원': 7505000,
      '801만 원 이상': 8505000,
    };

    const selectedIncome = salaryRanges[salary] || 3505000;

    // 백분위 계산
    let percentage = 50 + (50 * (1 - (selectedIncome / adjustedBaseIncome)));

    // 백분위 제한 및 범위 적용 (±5%)
    const basePercentage = Math.max(0, Math.min(100, percentage));
    const range = 5;
    const minPercentage = Math.max(0, basePercentage - range);
    const maxPercentage = Math.min(100, basePercentage + range);

    return `${minPercentage.toFixed(0)}%~${maxPercentage.toFixed(0)}%`;
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
        <div className={styles.salaryPersentage}>
          {salary && (
            <span>
              {familyCount}인 가구 / {salary} 소득은<br />중위소득 약 {' '}
              {getIncomePercentage(familyCount, salary)}에 해당
            </span>
          )}
        </div>
        <button className={styles.authBtn} onClick={handleNextClick}>다음</button>
      </div>
    </>
  );
};

export default SalaryInputForm;