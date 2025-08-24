import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import styles from './ChangeMyInfoForm.module.css';
import Backicon from '../../assets/back.svg';
import Input from '../common/Input';
import My from '../common/My';
import Arrowicon from '../../assets/arrow.svg';
import { useAuth } from '../../context/AuthContext';
import Profileicon from '../../assets/baseprofile.svg';
import Plusicon from '../../assets/plus.svg';

const ChangeMyInfoForm = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  
  // API에서 가져올 정보 상태
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // 사용자가 수정 가능한 정보 상태
  const [residence, setResidence] = useState('');
  const [family, setFamily] = useState('');
  const [salary, setSalary] = useState('');
  const [hire, setHire] = useState('');

  // API에서 오는 데이터 구조에 맞게 상태 추가
  const [householdNumber, setHouseholdNumber] = useState(0);
  const [lifeCycle, setLifeCycle] = useState('');
  const [householdTypes, setHouseholdTypes] = useState([]);

  // 드롭다운 메뉴 상태
  const [isFamilyDropdownOpen, setIsFamilyDropdownOpen] = useState(false);
  const [isSalaryDropdownOpen, setIsSalaryDropdownOpen] = useState(false);
  const [isHireDropdownOpen, setIsHireDropdownOpen] = useState(false);
  
  // 프로필 이미지 URL 상태 (초기값 설정 가능)
  const [profileImage, setProfileImage] = useState(Profileicon);

  // 모달 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 이미지 수정 버튼 클릭 핸들러
  const handleImageChange = () => {
    // 여기에 이미지 업로드 또는 변경 로직을 구현합니다.
    console.log('이미지 수정 버튼 클릭됨');
  };

  useEffect(() => {
    const fetchUserInfo = async (userId) => {
      try {
        const response = await fetch(`https://nexusdndn.duckdns.org/user/${userId}`, {
          method: 'GET',
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('사용자 정보를 불러오는 데 실패했습니다.');
        }

        const data = await response.json();
        const userData = data.result;

        // API 값과 한글 매핑 (데이터를 불러와 화면에 표시)
        const familyMap = { 
          'ALONE': '독거', 
          'GENERAL': '일반 가구',
          'SINGLE_PARENT': '한부모 가정',
          'GRAND_PARENT': '조손 가정',
          'MULTICULTURAL': '다문화 가정',
          'ETC': '기타'
        }; 
        const monthlyIncomeMap = { 
          'UNDER_100': '100만 원 이하', 
          'FROM_100_TO_200': '101만~200만 원',
          'FROM_200_TO_300': '201만~300만 원',
          'FROM_300_TO_400': '301만~400만 원',
          'FROM_400_TO_500': '401만~500만 원',
          'FROM_500_TO_600': '501만~600만 원',
          'FROM_600_TO_700': '601만~700만 원',
          'FROM_700_TO_800': '701만~800만 원',
          'OVER_800': '801만 원 이상'
        }; 
        const employmentMap = { 
          'EMPLOYED': '재직 중',
          'FREELANCER': '프리랜서',
          'JOB_SEEKER': '구직 중',
          'UNEMPLOYED': '무직'
        }; 

        setName(userData.name || '미입력');
        setGender(userData.gender === 'MALE' ? '남자' : userData.gender === 'FEMALE' ? '여자' : '미입력');
        setBirthday(userData.birthday || '미입력');
        setPhoneNumber(userData.phoneNumber || '미입력');
        setResidence(userData.address || '미입력');
        setFamily(familyMap[userData.family] || '미입력');
        setSalary(monthlyIncomeMap[userData.monthlyIncome] || '미입력');
        setHire(employmentMap[userData.employment] || '미입력');
        setHouseholdNumber(userData.householdNumber);
        setLifeCycle(userData.lifeCycle);
        setHouseholdTypes(userData.householdTypes);
        
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };
    
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        const userId = decodedToken.sub;
        fetchUserInfo(userId);
      } catch (error) {
        console.error("Invalid access token:", error);
      }
    }
  }, [accessToken]);

  const handleSave = async () => {
    if (!accessToken) {
      console.error("로그인이 필요합니다.");
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.sub;

      // 한글 값을 API에 맞는 영문 값으로 매핑
      const familyMap = {
        '일반 가구': 'GENERAL',
        '한부모 가정': 'SINGLE_PARENT',
        '조손 가정': 'GRAND_PARENT',
        '독거': 'ALONE',
        '다문화 가정': 'MULTICULTURAL',
        '기타': 'ETC'
      };
      
      const monthlyIncomeMap = {
        '100만 원 이하': 'UNDER_100',
        '101만~200만 원': 'FROM_100_TO_200',
        '201만~300만 원': 'FROM_200_TO_300',
        '301만~400만 원': 'FROM_300_TO_400',
        '401만~500만 원': 'FROM_400_TO_500',
        '501만~600만 원': 'FROM_500_TO_600',
        '601만~700만 원': 'FROM_600_TO_700',
        '701만~800만 원': 'FROM_700_TO_800',
        '801만 원 이상': 'OVER_800'
      };
      
      const employmentMap = {
        '재직 중': 'EMPLOYED',
        '프리랜서': 'FREELANCER',
        '구직 중': 'JOB_SEEKER',
        '무직': 'UNEMPLOYED'
      };
      
      const updatedData = {
        name: name,
        birthday: birthday,
        address: residence,
        householdNumber: householdNumber,
        monthlyIncome: monthlyIncomeMap[salary],
        gender: gender === '남자' ? 'MALE' : gender === '여자' ? 'FEMALE' : 'UNKNOWN',
        family: familyMap[family],
        employment: employmentMap[hire],
        lifeCycle: lifeCycle,
        householdTypes: householdTypes
      };

      const response = await fetch(`https://nexusdndn.duckdns.org/user/${userId}`, {
        method: 'PUT',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`회원 정보 수정에 실패했습니다: ${errorData.message}`);
      }

      // 정보 수정 성공 시 모달 열기
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to update user info:", error);
      alert(error.message);
    }
  };

  // 모달 확인 버튼 클릭 핸들러
  const handleModalConfirm = () => {
    setIsModalOpen(false); // 모달 닫기
    navigate('/my'); // 마이페이지로 이동
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
  
  const handleBackClick = () => {
    navigate('/my');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.backbutton} onClick={handleBackClick}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <My />
      <div className={styles.container}>
        <div className={styles.minititle}>내 정보</div>
        {/* 수정된 프로필 섹션 */}
        <div className={styles.profileSection}>
          <div className={styles.profileImageWrapper}>
            <img src={profileImage} alt="프로필 이미지" className={styles.profileImage} />
            <button className={styles.imageEditButton} onClick={handleImageChange}>
              <img src={Plusicon} alt="이미지 수정" />
            </button>
          </div>
        </div>
        <div className={styles.infoList}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>이름</span>
            <span className={styles.infoValue}>{name}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>생년월일</span>
            <span className={styles.infoValue}>{birthday}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>성별</span>
            <span className={styles.infoValue}>{gender}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>휴대폰 번호</span>
            <span className={styles.infoValue}>{phoneNumber}</span>
          </div>
          <div className={styles.line}></div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>거주지</label>
            <div className={styles.residenceInput}>
              <Input
                type="text"
                placeholder="거주지"
                value={residence}
                onChange={(e) => setResidence(e.target.value)}
              />
              <img src={Arrowicon} alt="화살표" className={styles.arrow} />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>가족 유형</label>
            <div className={styles.familyInput} onClick={() => setIsFamilyDropdownOpen(!isFamilyDropdownOpen)}>
              <span className={`${styles.familyText} ${family ? styles.selected : ''}`}>
                {family}
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
                {salary}
              </span>
              <img src={Arrowicon} alt="화살표" className={styles.arrow} />
            </div>
            {isSalaryDropdownOpen && (
              <div className={styles.salaryDropdown}>
                {['100만 원 이하', '101만~200만 원', '201만~300만 원', '301만~400만 원', '401만~500만 원', '501만~600만 원', '601만~700만 원', '701만~800만 원', '801만 원 이상'].map((option, idx) => (
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
            <label className={styles.label}>고용 형태</label>
            <div className={styles.hireInput} onClick={() => setIsHireDropdownOpen(!isHireDropdownOpen)}>
              <span className={`${styles.hireText} ${hire ? styles.selected : ''}`}>
                {hire}
              </span>
              <img src={Arrowicon} alt="화살표" className={styles.arrow} />
            </div>
            {isHireDropdownOpen && (
              <div className={styles.hireDropdown}>
                {['재직 중', '프리랜서', '구직 중', '무직'].map((option, idx) => (
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
        </div>
        <div className={styles.line}></div>
        <div className={styles.menuList}>
          <div
            className={styles.menuItem}
            onClick={handleSave}
          >
            <span className={styles.menuText}>정보 저장하기</span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          <div
            className={styles.menuItem}
            onClick={() => console.log('로그아웃 클릭')}
          >
            <span className={styles.menuText}>로그아웃</span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
          <div
            className={styles.menuItem}
            onClick={() => console.log('탈퇴하기 클릭')}
          >
            <span className={styles.menuText}>탈퇴하기</span>
            <img src={Arrowicon} alt="화살표" className={styles.arrow} />
          </div>
        </div>
      </div>
      
      {/* 정보 수정 완료 모달 */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p className={styles.modalMessage}>수정이 완료되었습니다</p>
            <button 
              className={styles.modalButton} 
              onClick={handleModalConfirm}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeMyInfoForm;