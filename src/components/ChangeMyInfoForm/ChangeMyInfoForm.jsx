import React, { useState } from 'react';
import styles from './ChangeMyInfoForm.module.css';
import Backicon from '../../assets/back.svg';
import Input from '../common/Input';
import BackButton from '../common/BackButton';
import My from '../common/My';
import Arrowicon from '../../assets/arrow.svg';

const ChangeMyInfoForm = () => {
    const [gender, setGender] = useState('');
    const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  
    const handleGenderSelect = (selectedGender) => {
      setGender(selectedGender);
      setIsGenderDropdownOpen(false);
    };

    const [salary, setSalary] = useState('');
    const [isSalaryDropdownOpen, setIsSalaryDropdownOpen] = useState(false);
    
    const handleSalarySelect = (selectedSalary) => {
      setSalary(selectedSalary);
      setIsSalaryDropdownOpen(false);
    };

    const [family, setFamily] = useState('');
    const [isFamilyDropdownOpen, setIsFamilyDropdownOpen] = useState(false);
     
    
    const handleFamilySelect = (selectedFamily) => {
      setFamily(selectedFamily);
      setIsFamilyDropdownOpen(false);
    };

    const [hire, setHire] = useState('');
    const [isHireDropdownOpen, setIsHireDropdownOpen] = useState(false);
     

    const handleHireSelect = (selectedHire) => {
      setHire(selectedHire);
      setIsHireDropdownOpen(false);
    };

    const [additional, setAdditional] = useState([]);
    const [isAdditionalDropdownOpen, setIsAdditionalDropdownOpen] = useState(false);
    
    const handleAdditionalSelect = (selectedAdditional) => {
      if (additional.includes(selectedAdditional)) {
        setAdditional(additional.filter((item) => item !== selectedAdditional));
      } else {
        setAdditional([...additional, selectedAdditional]);
      }
    };

  return (
    <>
      <BackButton />
      <My />
      <div className={styles.container}>
        <div className={styles.minititle}>
            회원정보 수정
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>이름</label>
          <Input type="text" placeholder="홍길동" />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>성별</label>
          <div className={styles.genderInput} onClick={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)}>
            <span className={`${styles.genderText} ${gender ? styles.selected : ''}`}>{gender || '성별'}</span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
            {isGenderDropdownOpen && (
                <div className={styles.genderDropdown}>
                    <div className={`${styles.genderItem} ${styles.firstbox} ${gender === '남자' ? styles.selectedItem : ''}`} onClick={() => handleGenderSelect('남자')}>
                        남자
                    </div>
                    <div className={styles.divider} />
                    <div className={`${styles.genderItem} ${styles.lastbox} ${gender === '여자' ? styles.selectedItem : ''}`} onClick={() => handleGenderSelect('여자')}>
                        여자
                    </div>
                </div>
            )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>가족 유형</label>
          <div className={styles.familyInput} onClick={() => setIsFamilyDropdownOpen(!isFamilyDropdownOpen)}>
            <span className={`${styles.familyText} ${family ? styles.selected : ''}`}>{family || '가족 유형'}</span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
            {isFamilyDropdownOpen && (
              <div className={styles.familyDropdown}>
                <div className={`${styles.familyItem} ${styles.firstbox}`}>
                  <span onClick={() => handleFamilySelect('일반 가구')}>일반 가구</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.familyItem}>
                  <span onClick={() => handleFamilySelect('한부모 가정')}>한부모 가정</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.familyItem}>
                  <span onClick={() => handleFamilySelect('조손 가정')}>조손 가정</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.familyItem}>
                  <span onClick={() => handleFamilySelect('독거')}>독거</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.familyItem}>
                  <span onClick={() => handleFamilySelect('다문화 가정')}>다문화 가정</span>
                </div>
                <div className={styles.divider} />
                <div className={`${styles.familyItem} ${styles.lastbox}`}>
                  <span onClick={() => handleFamilySelect('기타')}>기타</span>
                </div>
              </div>
            )}
        </div>
        <div className={styles.inputGroup}>
            <label className={styles.label}>월 소득 구간</label>
            <div className={styles.salaryInput} onClick={() => setIsSalaryDropdownOpen(!isSalaryDropdownOpen)}>
                <span className={`${styles.salaryText} ${salary ? styles.selected : ''}`}>{salary || '101만~200만'}</span>
                <img src={Arrowicon} alt="화살표" className={styles.arrow} />
            </div>
                {isSalaryDropdownOpen && (
                    <div className={styles.salaryDropdown}>
                      <div className={`${styles.salaryItem} ${styles.firstbox} ${salary === '100만 원 이하' ? styles.selectedItem : ''}`} onClick={() => handleSalarySelect('100만 원 이하')}>
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
                      <div className={`${styles.salaryItem} ${styles.lastbox} ${salary === '801만 원 이상' ? styles.selectedItem : ''}`} onClick={() => handleSalarySelect('801만 원 이상')}>
                        <span>801만 원 이상</span>
                      </div>
                    </div>
                )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>고용 상태</label>
            <div className={styles.hireInput} onClick={() => setIsHireDropdownOpen(!isHireDropdownOpen)}>
              <span className={`${styles.hireText} ${hire ? styles.selected : ''}`}>{hire || '고용 상태'}</span>
              <img src={Arrowicon} alt="화살표" className={styles.arrow} />
            </div>
            {isHireDropdownOpen && (
              <div className={styles.hireDropdown}>
                <div className={`${styles.hireItem} ${styles.firstbox}`}>
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
                <div className={`${styles.hireItem} ${styles.lastbox}`}>
                  <span onClick={() => handleHireSelect('무직')}>무직</span>
                </div>
              </div>
            )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>추가 정보 수집을 위한 해당 사항</label>
          <div className={styles.additionalInput} onClick={() => setIsAdditionalDropdownOpen(!isAdditionalDropdownOpen)}>
            <span className={`${styles.additionalText} ${additional.length > 0 ? styles.selected : ''}`}>
              {additional.length > 0 ? additional.join(', ') : '추가 사항'}
            </span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          {isAdditionalDropdownOpen && (
            <div className={styles.additionalDropdown}>
              <div
                className={`${styles.additionalItem} ${styles.firstbox} ${additional.includes('노인') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('노인')}
              >
                <span>노인</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalItem} ${additional.includes('장애인') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('장애인')}
              >
                <span>장애인</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalItem} ${additional.includes('청년') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('청년')}
              >
                <span>청년</span>
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.additionalItem} ${styles.lastbox} ${additional.includes('특수 가정') ? styles.selectedItem : ''}`}
                onClick={() => handleAdditionalSelect('특수 가정')}
              >
                <span>특수 가정</span>
              </div>
            </div>
          )}
        </div>
        
        <button className={styles.submit}>
          변경 저장하기</button>
      </div>
    </>
  );
};

export default ChangeMyInfoForm;