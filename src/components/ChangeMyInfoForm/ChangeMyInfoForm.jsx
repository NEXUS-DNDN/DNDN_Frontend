import React, { useState, useEffect } from 'react';
import styles from './ChangeMyInfoForm.module.css';
import { useNavigate } from 'react-router-dom';
import Backicon from '../../assets/back.svg';
import Input from '../common/Input';
import BackButton from '../common/BackButton';
import My from '../common/My';
import Arrowicon from '../../assets/arrow.svg';

const ChangeMyInfoForm = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [birthday, setBirthday] = useState('');
  const [residence, setResidence] = useState('');
  const [family, setFamily] = useState('');
  const [isFamilyDropdownOpen, setIsFamilyDropdownOpen] = useState(false);
  const [salary, setSalary] = useState('');
  const [isSalaryDropdownOpen, setIsSalaryDropdownOpen] = useState(false);
  const [hire, setHire] = useState('');
  const [isHireDropdownOpen, setIsHireDropdownOpen] = useState(false);
  const [additional, setAdditional] = useState([]);
  const [isAdditionalDropdownOpen, setIsAdditionalDropdownOpen] = useState(false);
  const [additionalType, setAdditionalType] = useState('');
  const [isAdditionalTypeDropdownOpen, setIsAdditionalTypeDropdownOpen] = useState(false);
  const [disabilityRegistered, setDisabilityRegistered] = useState(''); // 장애 등록 여부
  const [isDisabilityRegisteredOpen, setIsDisabilityRegisteredOpen] = useState(false);
  const [disabilityGrade, setDisabilityGrade] = useState(''); // 장애 등급
  const [isDisabilityGradeOpen, setIsDisabilityGradeOpen] = useState(false);
  const [disabilityType, setDisabilityType] = useState(''); // 장애 유형
  const [isDisabilityTypeOpen, setIsDisabilityTypeOpen] = useState(false);

  const navigate = useNavigate();

  // 🔹 컴포넌트 마운트 시 localStorage에서 불러오기
  useEffect(() => {
    const savedName = localStorage.getItem('name') || '';
    const savedGender = localStorage.getItem('gender') || '';
    const savedBirthday = localStorage.getItem('birthday') || '';
    const savedResidence = localStorage.getItem('residence') || '';
    const savedFamily = localStorage.getItem('family') || '';
    const savedSalary = localStorage.getItem('salary') || '';
    const savedHire = localStorage.getItem('hire') || '';
    const savedAdditional = JSON.parse(localStorage.getItem('additional')) || [];
    const savedAdditionalType = localStorage.getItem('additionalType') || '';
    const savedDisabilityRegistered = localStorage.getItem('disabilityRegistered') || '아니오'; // 기본값 "아니오"
    const savedDisabilityGrade = localStorage.getItem('disabilityGrade') || '해당 없음'; // 기본값 "해당 없음"
    const savedDisabilityType = localStorage.getItem('disabilityType') || '해당 없음'; // 기본값 "해당 없음"

    setName(savedName);
    setGender(savedGender);
    setBirthday(savedBirthday);
    setResidence(savedResidence);
    setFamily(savedFamily);
    setSalary(savedSalary);
    setHire(savedHire);
    setAdditional(savedAdditional);
    setAdditionalType(savedAdditionalType);
    setDisabilityRegistered(savedDisabilityRegistered);
    setDisabilityGrade(savedDisabilityGrade);
    setDisabilityType(savedDisabilityType);
  }, []);

  // 🔹 저장 버튼 클릭 시 localStorage에 반영
  const handleSave = () => {
    const userInfo = {
      name,
      gender,
      birthday,
      residence,
      family,
      salary,
      hire,
      additional,
      additionalType,
      disabilityRegistered, // 장애 등록 여부
      disabilityGrade, // 장애 등급
      disabilityType, // 장애 유형
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    localStorage.setItem('authName', name);
    localStorage.setItem('gender', gender);
    localStorage.setItem('birthday', birthday);
    localStorage.setItem('residence', residence);
    localStorage.setItem('family', family);
    localStorage.setItem('salary', salary);
    localStorage.setItem('hire', hire);
    localStorage.setItem('additional', JSON.stringify(additional));
    localStorage.setItem('additionalType', additionalType);
    localStorage.setItem('disabilityRegistered', disabilityRegistered);
    localStorage.setItem('disabilityGrade', disabilityGrade);
    localStorage.setItem('disabilityType', disabilityType);
    alert('회원 정보가 저장되었습니다.');
  };

  // 선택 핸들러들
  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setIsGenderDropdownOpen(false);
  };

  const handleFamilySelect = (selectedFamily) => {
    setFamily(selectedFamily);
    setIsFamilyDropdownOpen(false);
  };

  const handleSalarySelect = (selectedSalary) => {
    setSalary(selectedSalary);
    setIsSalaryDropdownOpen(false);
  };

  const handleHireSelect = (selectedHire) => {
    setHire(selectedHire);
    setIsHireDropdownOpen(false);
  };

  const handleAdditionalSelect = (selectedAdditional) => {
    if (additional.includes(selectedAdditional)) {
      setAdditional(additional.filter((item) => item !== selectedAdditional));
    } else {
      setAdditional([...additional, selectedAdditional]);
    }
  };

  const handleAdditionalTypeSelect = (selectedAdditionalType) => {
    setAdditionalType(selectedAdditionalType);
    setIsAdditionalTypeDropdownOpen(false);
  };

  const handleDisabilityRegisteredSelect = (selectedDisabilityRegistered) => {
    setDisabilityRegistered(selectedDisabilityRegistered);
    setIsDisabilityRegisteredOpen(false);
    if (selectedDisabilityRegistered === '아니오') {
      setDisabilityGrade('해당 없음');
      setDisabilityType('해당 없음');
    }
  };

  const handleDisabilityGradeSelect = (selectedDisabilityGrade) => {
    setDisabilityGrade(selectedDisabilityGrade);
    setIsDisabilityGradeOpen(false);
  };

  const handleDisabilityTypeSelect = (selectedDisabilityType) => {
    setDisabilityType(selectedDisabilityType);
    setIsDisabilityTypeOpen(false);
  };

  const handleBackClick = () => {
    console.log('뒤로가기 클릭');
    navigate('/my');
  };

  return (
    <>
      <div className={styles.backbutton} onClick={handleBackClick}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <My />
      <div className={styles.container}>
        <div className={styles.minititle}>회원정보 수정</div>

       
        <div className={styles.inputGroup}>
          <label className={styles.label}>이름</label>
          <Input
            type="text"
            placeholder="홍길동"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

       
        <div className={styles.inputGroup}>
          <label className={styles.label}>생일</label>
          <Input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            placeholder="1990-01-01"
            className={styles.dateInput}
          />
        </div>

      
        <div className={styles.inputGroup}>
          <label className={styles.label}>성별</label>
          <div className={styles.genderInput} onClick={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)}>
            <span className={`${styles.genderText} ${gender ? styles.selected : ''}`}>
              {gender || '성별'}
            </span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          {isGenderDropdownOpen && (
            <div className={styles.genderDropdown}>
              <div
                className={`${styles.genderItem} ${styles.firstbox} ${gender === '남자' ? styles.selectedItem : ''}`}
                onClick={() => handleGenderSelect('남자')}
              >
                남자
              </div>
              <div className={styles.divider} />
              <div
                className={`${styles.genderItem} ${styles.lastbox} ${gender === '여자' ? styles.selectedItem : ''}`}
                onClick={() => handleGenderSelect('여자')}
              >
                여자
              </div>
            </div>
          )}
        </div>

        
        <div className={styles.inputGroup}>
          <label className={styles.label}>가족 유형</label>
          <div className={styles.familyInput} onClick={() => setIsFamilyDropdownOpen(!isFamilyDropdownOpen)}>
            <span className={`${styles.familyText} ${family ? styles.selected : ''}`}>
              {family || '가족 유형'}
            </span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          {isFamilyDropdownOpen && (
            <div className={styles.familyDropdown}>
              {['일반 가구', '한부모 가정', '조손 가정', '독거', '다문화 가정', '기타'].map((option, idx) => (
                <div
                  key={idx}
                  className={`${styles.familyItem} ${family === option ? styles.selectedItem : ''}`}
                  onClick={() => handleFamilySelect(option)}
                >
                  <span>{option}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        
        <div className={styles.inputGroup}>
          <label className={styles.label}>월 소득 구간</label>
          <div className={styles.salaryInput} onClick={() => setIsSalaryDropdownOpen(!isSalaryDropdownOpen)}>
            <span className={`${styles.salaryText} ${salary ? styles.selected : ''}`}>
              {salary || '101만~200만 원'}
            </span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          {isSalaryDropdownOpen && (
            <div className={styles.salaryDropdown}>
              {['100만 원 이하','101만~200만 원','201만~300만 원','301만~400만 원','401만~500만 원','501만~600만 원','601만~700만 원','701만~800만 원','801만 원 이상'].map((option, idx) => (
                <div
                  key={idx}
                  className={`${styles.salaryItem} ${salary === option ? styles.selectedItem : ''}`}
                  onClick={() => handleSalarySelect(option)}
                >
                  <span>{option}</span>
                </div>
              ))}
            </div>
          )}
        </div>

       
        <div className={styles.inputGroup}>
          <label className={styles.label}>고용 상태</label>
          <div className={styles.hireInput} onClick={() => setIsHireDropdownOpen(!isHireDropdownOpen)}>
            <span className={`${styles.hireText} ${hire ? styles.selected : ''}`}>
              {hire || '고용 상태'}
            </span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          {isHireDropdownOpen && (
            <div className={styles.hireDropdown}>
              {['재직 중','프리랜서','구직 중','무직'].map((option, idx) => (
                <div
                  key={idx}
                  className={`${styles.hireItem} ${hire === option ? styles.selectedItem : ''}`}
                  onClick={() => handleHireSelect(option)}
                >
                  <span>{option}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        
        <div className={styles.inputGroup}>
          <label className={styles.label}>추가 정보 수집을 위한 해당 사항 (생애 주기)</label>
          <div className={styles.additionalInput} onClick={() => setIsAdditionalDropdownOpen(!isAdditionalDropdownOpen)}>
            <span className={`${styles.additionalText} ${additional.length > 0 ? styles.selected : ''}`}>
              {additional.length > 0 ? additional.join(', ') : '추가 사항'}
            </span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          {isAdditionalDropdownOpen && (
            <div className={styles.additionalDropdown}>
              {['노인','장애인','청년','특수 가정'].map((option, idx) => (
                <div
                  key={idx}
                  className={`${styles.additionalItem} ${additional.includes(option) ? styles.selectedItem : ''}`}
                  onClick={() => handleAdditionalSelect(option)}
                >
                  <span>{option}</span>
                </div>
              ))}
            </div>
          )}
        </div>

       
        <div className={styles.inputGroup}>
          <label className={styles.label}>추가 정보 수집을 위한 해당 사항 (가구 유형)</label>
          <div className={styles.additionalTypeInput} onClick={() => setIsAdditionalTypeDropdownOpen(!isAdditionalTypeDropdownOpen)}>
            <span className={`${styles.additionalTypeText} ${additionalType ? styles.selected : ''}`}>
              {additionalType || '가구 유형 선택'}
            </span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          {isAdditionalTypeDropdownOpen && (
            <div className={styles.additionalTypeDropdown}>
              {['다문화 · 탈북민', '다자녀', '보훈대상자', '장애인', '저소득', '한부모 · 조손', '해당사항 없음'].map((option, idx) => (
                <div
                  key={idx}
                  className={`${styles.additionalTypeItem} ${additionalType === option ? styles.selectedItem : ''}`}
                  onClick={() => handleAdditionalTypeSelect(option)}
                >
                  <span>{option}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>장애 등록 여부</label>
          <div className={styles.disabilityRegisteredInput} onClick={() => setIsDisabilityRegisteredOpen(!isDisabilityRegisteredOpen)}>
            <span className={`${styles.disabilityRegisteredText} ${disabilityRegistered ? styles.selected : ''}`}>
              {disabilityRegistered || '장애 등록 여부'}
            </span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          {isDisabilityRegisteredOpen && (
            <div className={styles.disabilityRegisteredDropdown}>
              {['예', '아니오'].map((option, idx) => (
                <div
                  key={idx}
                  className={`${styles.disabilityRegisteredItem} ${disabilityRegistered === option ? styles.selectedItem : ''}`}
                  onClick={() => handleDisabilityRegisteredSelect(option)}
                >
                  <span>{option}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        
        <div className={styles.inputGroup}>
          <label className={styles.label}>장애 등급</label>
          <div className={styles.disabilityGradeInput} onClick={() => setIsDisabilityGradeOpen(!isDisabilityGradeOpen)}>
            <span className={`${styles.disabilityGradeText} ${disabilityGrade ? styles.selected : ''}`}>
              {disabilityGrade || '장애 등급'}
            </span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          {isDisabilityGradeOpen && (
            <div className={styles.disabilityGradeDropdown}>
              {['1급', '2급', '3급', '4급', '5급', '6급', '해당 없음'].map((option, idx) => (
                <div
                  key={idx}
                  className={`${styles.disabilityGradeItem} ${disabilityGrade === option ? styles.selectedItem : ''}`}
                  onClick={() => handleDisabilityGradeSelect(option)}
                >
                  <span>{option}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        
        <div className={styles.inputGroup}>
          <label className={styles.label}>장애 유형</label>
          <div className={styles.disabilityTypeInput} onClick={() => setIsDisabilityTypeOpen(!isDisabilityTypeOpen)}>
            <span className={`${styles.disabilityTypeText} ${disabilityType ? styles.selected : ''}`}>
              {disabilityType || '장애 유형'}
            </span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          {isDisabilityTypeOpen && (
            <div className={styles.disabilityTypeDropdown}>
              {['지체', '시각', '청각', '언어', '정신', '자폐', '해당 없음'].map((option, idx) => (
                <div
                  key={idx}
                  className={`${styles.disabilityTypeItem} ${disabilityType === option ? styles.selectedItem : ''}`}
                  onClick={() => handleDisabilityTypeSelect(option)}
                >
                  <span>{option}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        
        <button className={styles.submit} onClick={handleSave}>
          변경 저장하기
        </button>
      </div>
    </>
  );
};

export default ChangeMyInfoForm;