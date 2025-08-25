import React, { useState, useEffect, useCallback } from 'react';
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
  const { accessToken, login } = useAuth();
  
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

  // 모달 상태 추가 (정보 수정 완료 모달)
  const [isModalOpen, setIsModalOpen] = useState(false);
  // ⭐ 로그아웃 확인 모달 상태는 유지 (사용자가 실수로 로그아웃하지 않도록)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); 

  // 이미지 수정 버튼 클릭 핸들러
  const handleImageChange = () => {
    // 여기에 이미지 업로드 또는 변경 로직을 구현합니다.
    console.log('이미지 수정 버튼 클릭됨');
  };

  // API 값과 한글 매핑 객체 (데이터를 불러올 때 사용)
  const familyMapFetch = { 
    'ALONE': '독거', 
    'GENERAL': '일반 가구',
    'SINGLE_PARENT': '한부모 가정',
    'GRAND_PARENT': '조손 가정',
    'MULTICULTURAL': '다문화 가정',
    'ETC': '기타'
  }; 
  const monthlyIncomeMapFetch = { 
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
  const employmentMapFetch = { 
    'EMPLOYED': '재직 중',
    'FREELANCER': '프리랜서',
    'JOB_SEEKER': '구직 중',
    'UNEMPLOYED': '무직'
  }; 

  // API에 보낼 때 필요한 매핑 (한글 -> 영문 ENUM)
  const familyMapSend = {
    '일반 가구': 'GENERAL',
    '한부모 가정': 'SINGLE_PARENT',
    '조손 가정': 'GRAND_PARENT',
    '독거': 'ALONE',
    '다문화 가정': 'MULTICULTURAL',
    '기타': 'ETC'
  };
  const monthlyIncomeMapSend = {
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
  const employmentMapSend = {
    '재직 중': 'EMPLOYED',
    '프리랜서': 'FREELANCER',
    '구직 중': 'JOB_SEEKER',
    '무직': 'UNEMPLOYED'
  };

  // refreshToken으로 새 accessToken 받기 (LoginForm의 로직 재사용)
  const refreshAccessToken = useCallback(async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!userInfo.userId || !refreshToken) {
      console.error('refreshToken 또는 userId 없음. 다시 로그인 필요');
      throw new Error('refreshToken 또는 userId 없음. 다시 로그인 필요');
    }

    try {
        const response = await fetch('https://nexusdndn.duckdns.org/auth/refrechToken', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userInfo.userId,
                refreshToken,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('리프레시 토큰 요청 실패:', response.status, errorText);
            throw new Error(`리프레시 토큰 요청 실패: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        login(data.result.accessToken); // AuthContext 업데이트
        localStorage.setItem('refreshToken', data.result.refreshToken);
        localStorage.setItem('accessToken', data.result.accessToken); // localStorage에도 새로운 accessToken 저장
        return data.result.accessToken;
    } catch (error) {
        console.error('refreshAccessToken 함수 오류:', error);
        localStorage.clear();
        navigate('/login');
        throw error;
    }
  }, [login, navigate]);

  // API 호출 래퍼 (LoginForm의 로직 재사용)
  const apiFetch = useCallback(async (url, options = {}) => {
    let currentAccessToken = accessToken;

    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...(currentAccessToken ? { Authorization: `Bearer ${currentAccessToken}` } : {}),
    };

    try {
      let response = await fetch(url, {
        ...options,
        headers: { ...defaultHeaders, ...options.headers },
      });

      // accessToken 만료 → refresh 후 재시도
      if (response.status === 401) {
        console.warn('Access token expired. Attempting to refresh...');
        try {
          currentAccessToken = await refreshAccessToken();
          console.log('Token refreshed. Retrying original request...');
          response = await fetch(url, {
            ...options,
            headers: { ...defaultHeaders, Authorization: `Bearer ${currentAccessToken}` },
          });
        } catch (refreshErr) {
          console.error('토큰 재발급 실패 → 강제 로그아웃', refreshErr);
          localStorage.clear();
          navigate('/login');
          throw refreshErr;
        }
      }

      return response;
    } catch (err) {
      console.error('API 요청 실패', err);
      throw err;
    }
  }, [accessToken, refreshAccessToken, navigate]);


  useEffect(() => {
    const fetchUserInfo = async (userId) => {
      if (!accessToken) {
        return; 
      }
      try {
        const response = await apiFetch(`https://nexusdndn.duckdns.org/user/${userId}`, {
          method: 'GET',
          headers: { 'accept': '*/*' }
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`사용자 정보를 불러오는 데 실패했습니다: ${response.status} - ${errorText}`);
          throw new Error(`사용자 정보를 불러오는 데 실패했습니다: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const userData = data.result;

        setName(userData.name || '미입력');
        setGender(userData.gender === 'MALE' ? '남자' : userData.gender === 'FEMALE' ? '여자' : '미입력');
        setBirthday(userData.birthday || '미입력');
        setPhoneNumber(userData.phoneNumber || '미입력');
        setResidence(userData.address || '미입력');
        setFamily(familyMapFetch[userData.family] || '미입력');
        setSalary(monthlyIncomeMapFetch[userData.monthlyIncome] || '미입력');
        setHire(employmentMapFetch[userData.employment] || '미입력');
        setHouseholdNumber(userData.householdNumber);
        setLifeCycle(userData.lifeCycle);
        setHouseholdTypes(userData.householdTypes);
        
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        alert(`사용자 정보를 불러오는 데 실패했습니다: ${error.message}`);
      }
    };
    
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        const userId = decodedToken.sub;
        console.log("🐛 useEffect: Decoded userId from token:", userId); // 디버깅 로그 추가
        fetchUserInfo(userId);
      } catch (error) {
        console.error("Invalid access token in useEffect:", error);
        alert('유효하지 않은 로그인 정보입니다. 다시 로그인해주세요.');
        localStorage.clear();
        navigate('/login');
      }
    } else {
        alert('로그인 정보가 없습니다. 로그인 페이지로 이동합니다.');
        navigate('/login');
    }
  }, [accessToken, apiFetch, navigate]);

  const handleSave = async () => {
    if (!accessToken) {
      console.error("로그인이 필요합니다.");
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    try {
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.sub;

      const updatedData = {
        name: name,
        birthday: birthday,
        address: residence,
        householdNumber: householdNumber,
        monthlyIncome: monthlyIncomeMapSend[salary],
        gender: gender === '남자' ? 'MALE' : gender === '여자' ? 'FEMALE' : 'UNKNOWN',
        family: familyMapSend[family],
        employment: employmentMapSend[hire],
        lifeCycle: lifeCycle,
        householdTypes: householdTypes
      };

      console.log('--- Debugging Payload for PATCH ---');
      console.log('Target User ID (from token):', userId); // 디버깅 로그 강화
      console.log('Payload:', updatedData);
      console.log('Access Token being sent:', accessToken); // 디버깅 로그 강화
      console.log('--------------------------------');

      const response = await apiFetch(`https://nexusdndn.duckdns.org/user/${userId}`, {
        method: 'PATCH',
        headers: { 'accept': '*/*' },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `회원 정보 수정에 실패했습니다: ${response.status} - ${errorText}`;
        console.error("Server raw error response (403):", errorText);
        try {
            const errorData = JSON.parse(errorText);
            errorMessage = `회원 정보 수정에 실패했습니다: ${errorData.message || errorText}`;
        } catch (jsonError) {
            console.warn("Server response was not JSON for error:", errorText);
        }
        throw new Error(errorMessage);
      }

      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to update user info:", error);
      alert(error.message);
    }
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigate('/my');
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

  // ⭐ 로그아웃 처리 함수 (알림 팝업 제거)
  const handleLogout = async () => {
    setIsLogoutModalOpen(false); // 로그아웃 확인 모달은 닫기
    if (!accessToken) {
      console.error("로그인 토큰이 없어 로그아웃을 진행할 수 없습니다.");
      localStorage.clear(); // 혹시 모를 잔여 토큰 제거
      navigate('/login');
      return;
    }

    try {
      const response = await apiFetch('https://nexusdndn.duckdns.org/auth/logout', {
        method: 'POST',
        headers: { 'accept': '*/*' }, // -d '' 이므로 body는 비워둡니다.
      });

      if (!response.ok) {
        const errorData = await response.json(); // 로그아웃 API는 JSON 응답을 줄 것으로 가정
        throw new Error(`로그아웃 실패: ${errorData.message || response.status}`);
      }

      console.log('로그아웃 성공'); // 성공 알림 팝업 제거, 콘솔 로그만 남김
      localStorage.clear(); // 모든 로컬 스토리지 정보 삭제
      navigate('/login'); // 로그인 페이지로 즉시 이동

    } catch (error) {
      console.error('로그아웃 처리 중 오류 발생:', error);
      alert(`로그아웃 실패: ${error.message}`); // 오류 발생 시에만 알림
      // 오류 발생 시에도 최소한 로컬 스토리지를 비워주는 것이 안전
      localStorage.clear(); 
      navigate('/login');
    }
  };

  // ⭐ 로그아웃 모달 닫기 함수
  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };


  return (
    <div className={styles.wrapper}>
      
      <My />
      <div className={styles.container}>
        <div className={styles.backbutton} onClick={handleBackClick}>
        <img src={Backicon} alt="뒤로가기" />
          </div>
        <div className={styles.minititle}> 
          내정보 
        </div>
        {/* 수정된 프로필 섹션 */}
        {/* <div className={styles.profileSection}>
          <div className={styles.profileImageWrapper}> //
            {<img src={profileImage} alt="프로필 이미지" className={styles.profileImage} />}
            { <button className={styles.imageEditButton} onClick={handleImageChange}>
              <img src={Plusicon} alt="이미지 수정" />
            </button> }
          </div>
        </div> */}
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
            onClick={() => setIsLogoutModalOpen(true)} // ⭐ 로그아웃 확인 모달 띄우기
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

      {/* ⭐ 로그아웃 확인 모달 */}
      {isLogoutModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p className={styles.modalMessage}>로그아웃 하시겠습니까?</p>
            <div className={styles.modalButtonGroup}>
                <button 
                    className={`${styles.modalButton} ${styles.modalCancelButton}`} 
                    onClick={handleCancelLogout}
                >
                    취소
                </button>
                <button 
                    className={`${styles.modalButton} ${styles.modalConfirmButton}`} 
                    onClick={handleLogout}
                >
                    확인
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeMyInfoForm;
