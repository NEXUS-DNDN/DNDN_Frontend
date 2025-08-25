import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './InputForm.module.css'; // InputForm.module.css로 변경했다고 가정 (CSS Module 사용)
import Backicon from '../../assets/back.svg';
import NextButton from '../../assets/다음.png';
import ActiveNextButton from '../../assets/Active다음.png';
import Minusicon from '../../assets/minus.svg';
import Plusicon from '../../assets/plus.svg';
import Arrowicon from '../../assets/arrow.svg';
import HireOButton from '../../assets/hireO.png';
import ActiveHireOButton from '../../assets/ActivehireO.png';
import HireXButton from '../../assets/hireX.png';
import ActiveHireXButton from '../../assets/ActivehireX.png';
import GrayButton from '../../components/GrayButton'; // GrayButton 경로 확인
import DisabilityOButton from '../../assets/disabilityO.png';
import ActiveDisabilityOButton from '../../assets/ActiveDisabilityO.png';
import DisabilityXButton from '../../assets/disabilityX.png';
import ActiveDisabilityXButton from '../../assets/ActiveDisabilityX.png';
import YesOButton from '../../assets/yesO.png';
import ActiveYesOButton from '../../assets/ActiveyesO.png';
import NoXButton from '../../assets/noX.png';
import ActiveNoXButton from '../../assets/ActivenoX.png';
import { useAuth } from '../../context/AuthContext.jsx'; // useAuth 훅 import

const lifeCycles = ['영유아', '아동', '청소년', '청년', '중장년', '노년', '임신·출산'];
const familyTypes = ['다문화·탈북민', '다자녀', '보훈대상자', '장애인', '저소득', '한부모·조손'];
const disabilityOptions = [
  '정신장애', '지적장애', '자폐성 장애', '지체 장애', '청각 장애', '뇌병변 장애', '언어 장애', '시각 장애',
  '안면 장애', '신장 장애', '심장 장애', '간 장애', '간질 장애', '장루/요루 장애', '호흡기 장애'
];
const disabilityGrades = ['1급', '2급', '3급', '4급', '5급', '6급'];

// 추가된 노년 관련 항목 (현재는 사용하지 않지만, 나중에 필요할 수 있으므로 유지)
const agedAdditionalItems = [
    { id: '1', text: '🧠 치매 또는 기억력 저하 증상 있음' },
    { id: '2', text: '🦵 보행이 불편하거나 휠체어/보행기 사용 중' },
    { id: '3', text: '❤️ 고혈압, 당뇨 등 만성 질환 있음' },
    { id: '4', text: '🛌 일상생활에 도움(돌봄)이 필요함' },
    { id: '5', text: '🗣️ 의사소통(언어/청력)에 어려움 있음' },
    { id: '6', text: '👀 시력이 많이 나빠져서 일상생활이 어렵다' },
    { id: '7', text: '🧍 정신건강(우울감, 무기력감 등) 문제 있음' },
    { id: '8', text: '🚑 최근 6개월 내 병원 입원 경험 있음' },
    { id: '9', text: '🧓 건강상의 특별한 문제 없음' },
];

// API 요청을 위한 매핑 객체 - 백엔드 ENUM과 일치하도록 수정
const monthlyIncomeMap = {
  '100만 원 이하': 'UNDER_100',
  '101만~200만 원': 'FROM_100_TO_200',
  '201만~300만 원': 'FROM_200_TO_300',
  '301만~400만 원': 'FROM_300_TO_400',
  '401만~500만 원': 'FROM_400_TO_500',
  '501만~600만 원': 'FROM_500_TO_600',
  '601만~700만 원': 'FROM_600_TO_700',
  '701만~800만 원': 'FROM_700_TO_800',
  '801만 원 이상': 'OVER_800',
};

const genderMap = {
  '남자': 'MALE',
  '여자': 'FEMALE',
};

const employmentMap = {
  '근무 중': 'EMPLOYED',
  '무직': 'UNEMPLOYED', // 백엔드 ENUM 'UNEMPLOYED' 사용
  // '프리랜서': 'FREELANCER', // 필요한 경우 추가
  // '구직 중': 'JOB_SEEKER', // 필요한 경우 추가
};

// 생애 주기 매핑 (가정: 백엔드에 유사한 ENUM이 존재) - ⭐ 사용자 요청 반영
const lifeCycleApiMap = {
  '영유아': 'INFANT',
  '아동': 'CHILD',
  '청소년': 'TEENAGER',
  '청년': 'YOUTH',
  '중장년': 'MIDDLE',
  '노년': 'SENIOR',
  '임신·출산': 'PREGNANT', // ⭐ 백엔드 ENUM과 정확히 일치하도록 수정
};

// 가구 유형 매핑 (백엔드 ENUM 'FamilyType' 기준) - ⭐ 사용자 요청 반영
const familyTypeApiMap = {
  '다문화·탈북민': 'MULTICULTURAL', // ⭐ 백엔드 ENUM과 정확히 일치하도록 수정
  '한부모·조손': 'SINGLE_PARENT', // ⭐ 백엔드 ENUM과 정확히 일치하도록 수정
  '다자녀': 'MULTI_CHILD', // ⭐ 백엔드 ENUM과 정확히 일치하도록 수정
  '보훈대상자': 'PATRIOT', // ⭐ 백엔드 ENUM과 정확히 일치하도록 수정
  '장애인': 'DISABLED',
  '저소득': 'LOW_INCOME',
};


const API_BASE_URL = 'https://nexusdndn.duckdns.org';

// JWT 디코딩 유틸리티 함수
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT 디코딩 실패:", error);
    return null;
  }
};

const InputPage = () => { // 컴포넌트 이름 GenderInputForm에서 InputPage로 변경
  const navigate = useNavigate();
  const { accessToken } = useAuth(); // AuthContext에서 accessToken 가져오기

  const [currentPage, setCurrentPage] = useState('gender');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '사용자'); // API에서 가져오거나 로컬 스토리지에서 가져온 이름
  const [userPhoneNumber, setUserPhoneNumber] = useState(localStorage.getItem('userPhoneNumber') || ''); // API에서 가져오거나 로컬 스토리지에서 가져온 전화번호
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [residence, setResidence] = useState('');
  const [residenceDetail, setResidenceDetail] = useState('');
  const [familyCount, setFamilyCount] = useState(1);
  const [salary, setSalary] = useState('');
  const [hire, setHire] = useState('');
  const [lifeCycle, setLifeCycle] = useState([]);
  const [familyType, setFamilyType] = useState([]);
  const [isSalaryDropdownOpen, setIsSalaryDropdownOpen] = useState(false);
  const [disabilityStatus, setDisabilityStatus] = useState(null);
  const [disabilityGrade, setDisabilityGrade] = useState('');
  const [disabilityType, setDisabilityType] = useState('');
  const [isDisabilityDropdownOpen, setIsDisabilityDropdownOpen] = useState(false);
  const [isReceivingAgedPension, setIsReceivingAgedPension] = useState(null);
  const [isLivingAlone, setIsLivingAlone] = useState(null);
  const [agedAdditional, setAgedAdditional] = useState([]);

  // 로컬 스토리지에서 상태 불러오기 (초기 마운트 시)
  useEffect(() => {
    // API에서 사용자 데이터를 불러오는 비동기 함수
    const fetchAndSetUserData = async () => {
        let currentUserId = null;
        if (accessToken) {
            const decodedToken = decodeJWT(accessToken);
            if (decodedToken && decodedToken.sub) {
                currentUserId = decodedToken.sub;
            }
        }

        if (currentUserId) {
            try {
                const response = await axios.get(`${API_BASE_URL}/user/${currentUserId}`, {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (response.data.isSuccess && response.data.result) {
                    const fetchedUserData = response.data.result;
                    console.log('API로부터 불러온 사용자 데이터:', fetchedUserData);

                    // 상태 업데이트
                    setUserName(fetchedUserData.name || '사용자');
                    setUserPhoneNumber(fetchedUserData.phoneNumber || '');
                    setGender(fetchedUserData.gender ? Object.keys(genderMap).find(key => genderMap[key] === fetchedUserData.gender) || '' : '');
                    setBirthday(fetchedUserData.birthday || '');
                    
                    // residence와 residenceDetail 분리
                    if (fetchedUserData.address) {
                        const addressParts = fetchedUserData.address.split(' ');
                        setResidence(addressParts[0] || '');
                        setResidenceDetail(addressParts.slice(1).join(' ') || '');
                    } else {
                        setResidence('');
                        setResidenceDetail('');
                    }

                    setFamilyCount(fetchedUserData.householdNumber || 1);
                    setSalary(fetchedUserData.monthlyIncome ? Object.keys(monthlyIncomeMap).find(key => monthlyIncomeMap[key] === fetchedUserData.monthlyIncome) || '' : '');
                    setHire(fetchedUserData.employment ? Object.keys(employmentMap).find(key => employmentMap[key] === fetchedUserData.employment) || '' : '');
                    setLifeCycle(fetchedUserData.lifeCycle ? [Object.keys(lifeCycleApiMap).find(key => lifeCycleApiMap[key] === fetchedUserData.lifeCycle) || ''] : []);
                    
                    if (fetchedUserData.householdTypes) {
                        setFamilyType(fetchedUserData.householdTypes.map(type => Object.keys(familyTypeApiMap).find(key => familyTypeApiMap[key] === type)).filter(Boolean));
                    } else {
                        setFamilyType([]);
                    }
                    // disability, aged related fields if they exist in the API response
                    // 현재는 해당 필드가 API 응답에 없으므로, 기본값으로 유지
                }
            } catch (error) {
                console.error('API에서 사용자 프로필을 불러오는 데 실패했습니다:', error);
                // API 실패 시 로컬 스토리지에서 이름/전화번호 로드 (기존 동작 유지)
                setUserName(localStorage.getItem('userName') || '사용자');
                setUserPhoneNumber(localStorage.getItem('userPhoneNumber') || '');
            }
        } else {
            // accessToken이나 userId가 없는 경우, 로컬 스토리지에서 이름/전화번호 로드
            setUserName(localStorage.getItem('userName') || '사용자');
            setUserPhoneNumber(localStorage.getItem('userPhoneNumber') || '');
        }

        // 기존 로컬 스토리지에서 나머지 값들을 불러오는 로직 (API에서 가져온 값과 충돌하지 않도록)
        const savedGender = localStorage.getItem('gender');
        const savedBirthday = localStorage.getItem('birthday');
        const savedResidence = localStorage.getItem('residence');
        const savedResidenceDetail = localStorage.getItem('residenceDetail');
        const savedFamilyCount = localStorage.getItem('familyCount');
        const savedSalary = localStorage.getItem('salary');
        const savedHire = localStorage.getItem('hire');
        const savedLifeCycle = localStorage.getItem('lifeCycle');
        const savedFamilyType = localStorage.getItem('familyType');
        const savedDisabilityStatus = localStorage.getItem('disabilityStatus');
        const savedDisabilityGrade = localStorage.getItem('disabilityGrade');
        const savedDisabilityType = localStorage.getItem('disabilityType');
        const savedAgedPension = localStorage.getItem('isReceivingAgedPension');
        const savedIsLivingAlone = localStorage.getItem('isLivingAlone');
        const savedAgedAdditional = localStorage.getItem('agedAdditional');

        if (savedGender && !gender) setGender(savedGender); // API에서 불러오지 않았다면
        if (savedBirthday && !birthday) setBirthday(savedBirthday);
        if (savedResidence && !residence) setResidence(savedResidence);
        if (savedResidenceDetail && !residenceDetail) setResidenceDetail(savedResidenceDetail);
        if (savedFamilyCount && familyCount === 1) setFamilyCount(parseInt(savedFamilyCount, 10) || 1);
        if (savedSalary && !salary) setSalary(savedSalary);
        if (savedHire && !hire) setHire(savedHire);
        if (savedLifeCycle && lifeCycle.length === 0) setLifeCycle(JSON.parse(savedLifeCycle));
        if (savedFamilyType && familyType.length === 0) setFamilyType(JSON.parse(savedFamilyType));
        if (savedDisabilityStatus !== null) setDisabilityStatus(JSON.parse(savedDisabilityStatus));
        if (savedDisabilityGrade) setDisabilityGrade(savedDisabilityGrade);
        if (savedDisabilityType) setDisabilityType(savedDisabilityType);
        if (savedAgedPension !== null) setIsReceivingAgedPension(JSON.parse(savedAgedPension)); 
        if (savedIsLivingAlone !== null) setIsLivingAlone(JSON.parse(savedIsLivingAlone));
        if (savedAgedAdditional) setAgedAdditional(JSON.parse(savedAgedAdditional));
    };

    fetchAndSetUserData();
  }, [accessToken]); // accessToken이 변경될 때마다 실행

  // 상태 변경 시 로컬 스토리지에 저장 (이름, 전화번호는 API에서 관리되므로 제외)
  useEffect(() => {
    localStorage.setItem('gender', gender);
    localStorage.setItem('birthday', birthday);
    localStorage.setItem('residence', residence);
    localStorage.setItem('residenceDetail', residenceDetail);
    localStorage.setItem('familyCount', familyCount.toString());
    localStorage.setItem('salary', salary);
    localStorage.setItem('hire', hire);
    localStorage.setItem('lifeCycle', JSON.stringify(lifeCycle));
    localStorage.setItem('familyType', JSON.stringify(familyType));
    if (disabilityStatus !== null) {
      localStorage.setItem('disabilityStatus', JSON.stringify(disabilityStatus));
    } else {
      localStorage.removeItem('disabilityStatus');
    }
    if (disabilityGrade) {
        localStorage.setItem('disabilityGrade', disabilityGrade);
    } else {
        localStorage.removeItem('disabilityGrade');
    }
    if (disabilityType) {
      localStorage.setItem('disabilityType', disabilityType);
    } else {
      localStorage.removeItem('disabilityType');
    }
    if (isReceivingAgedPension !== null) {
        localStorage.setItem('isReceivingAgedPension', JSON.stringify(isReceivingAgedPension));
    } else {
        localStorage.removeItem('isReceivingAgedPension');
    }
    if (isLivingAlone !== null) {
        localStorage.setItem('isLivingAlone', JSON.stringify(isLivingAlone));
    } else {
        localStorage.removeItem('isLivingAlone');
    }
    if (agedAdditional.length > 0) {
        localStorage.setItem('agedAdditional', JSON.stringify(agedAdditional));
    } else {
        localStorage.removeItem('agedAdditional');
    }
  }, [gender, birthday, residence, residenceDetail, familyCount, salary, hire, lifeCycle, familyType, disabilityStatus, disabilityGrade, disabilityType, isReceivingAgedPension, isLivingAlone, agedAdditional]);


  // 사용자 프로필 정보를 백엔드에 저장하는 함수
  const saveUserProfile = async () => {
    if (!accessToken) {
      console.error('Access token not available. User is not logged in.');
      alert('로그인 정보가 없습니다. 다시 로그인해주세요.');
      return;
    }

    try {
      // 이제 userName과 userPhoneNumber는 상태에서 직접 가져옵니다.
      if (!userName || !userPhoneNumber) {
        console.error('User name or phone number is missing. Cannot proceed with profile update.');
        alert('사용자 이름 또는 전화번호를 찾을 수 없습니다. 다시 회원가입을 진행해주세요.');
        return;
      }

      const payload = {
        name: userName, // ⭐ 상태에서 가져온 이름 사용
        phoneNumber: userPhoneNumber, // ⭐ 상태에서 가져온 전화번호 사용
        gender: genderMap[gender],
        birthday: birthday,
        address: `${residence} ${residenceDetail}`.trim(),
        householdNumber: familyCount,
        monthlyIncome: monthlyIncomeMap[salary],
        employment: employmentMap[hire],
        // lifeCycle은 단일 선택이므로 배열의 첫 번째 요소를 매핑
        lifeCycle: lifeCycle.length > 0 ? lifeCycleApiMap[lifeCycle[0]] : null,
        // householdTypes는 여러 개 선택 가능하므로 각 항목을 매핑
        householdTypes: familyType
            .map(type => familyTypeApiMap[type])
            .filter(mappedType => mappedType), // 매핑되지 않은 값은 필터링
        // NOTE: 노인/장애인 상세 정보는 현재 단계에서 저장하지 않음
      };
      
      console.log('--- Debugging Payload Values ---');
      console.log('Name:', payload.name);
      console.log('Phone Number:', payload.phoneNumber);
      console.log('Gender (mapped):', payload.gender);
      console.log('Birthday:', payload.birthday);
      console.log('Address:', payload.address);
      console.log('Household Number:', payload.householdNumber);
      console.log('Monthly Income (mapped):', payload.monthlyIncome);
      console.log('Employment (mapped):', payload.employment);
      console.log('Life Cycle (mapped):', payload.lifeCycle);
      console.log('Household Types (mapped):', payload.householdTypes);
      console.log('Full Payload being sent:', payload); // Full payload as before
      console.log('--------------------------------');

      const response = await axios.post(`${API_BASE_URL}/user`, payload, {
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${accessToken}`, // JWT 토큰 사용
          'Content-Type': 'application/json'
        }
      });

      if (response.data.isSuccess) {
        console.log('User profile saved successfully:', response.data.result);
        alert('회원 정보가 성공적으로 저장되었습니다.');
      } else {
        console.error('Failed to save user profile:', response.data.message);
        alert(`회원 정보 저장 실패: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error saving user profile:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios Error Details:', error.response?.data || error.message);
        if (error.response?.status === 401) {
          alert('인증 정보가 유효하지 않습니다. 다시 로그인해주세요.');
          // navigate('/login'); // 필요시 로그인 페이지로 리다이렉트
        } else if (error.response?.status === 400) {
          // ⭐ 400 Bad Request 오류 시 서버 응답의 상세 메시지 출력
          alert(`잘못된 요청입니다. 입력 데이터를 확인해주세요. 상세: ${error.response?.data?.message || error.message}`);
        }
        else {
          alert(`회원 정보 저장 중 오류 발생: ${error.response?.status || error.message}`);
        }
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const handleBackClick = () => {
    if (currentPage === 'agedadditional') {
        setCurrentPage('agedalone');
    } else if (currentPage === 'agedalone') {
        setCurrentPage('aged');
    } else if (currentPage === 'aged') {
        // 노년 상세 페이지에서 뒤로 갈 때, 장애인 유형 선택 여부에 따라 분기
        if (familyType.includes('장애인')) {
            setCurrentPage('disabilitytype');
        } else {
            setCurrentPage('additional');
        }
    } else if (currentPage === 'disabilitytype') {
        setCurrentPage('disabilitygrade');
    } else if (currentPage === 'disabilitygrade') {
        setCurrentPage('disability');
    } else if (currentPage === 'disability') {
        setCurrentPage('additional'); // 장애 등록 여부 페이지에서 뒤로 갈 때
    } else if (currentPage === 'additional') {
      setCurrentPage('hire');
    } else if (currentPage === 'hire') {
      setCurrentPage('salary');
    } else if (currentPage === 'salary') {
      setCurrentPage('family');
    } else if (currentPage === 'family') {
      setCurrentPage('gender');
    } else {
      navigate(-1); // 이전 RegisterPage로 돌아가기
    }
  };

  const handleNextClick = async () => { // async 함수로 변경
    if (currentPage === 'gender') {
      const isFormValid = gender && birthday.length === 10 && residence;
      if (isFormValid) {
        setCurrentPage('family');
      } else {
        alert('성별, 생년월일, 거주지를 모두 입력해주세요.');
      }
    } else if (currentPage === 'family') {
      setCurrentPage('salary');
    } else if (currentPage === 'salary') {
      if (salary) {
        setCurrentPage('hire');
      } else {
        alert('소득 구간을 선택해주세요.');
      }
    } else if (currentPage === 'hire') {
      if (hire) {
        setCurrentPage('additional');
      } else {
        alert('고용 상태를 선택해주세요.');
      }
    } else if (currentPage === 'additional') {
      if (lifeCycle.length > 0) {
        // ⭐ 사용자 요청에 따라 노년/장애인 상세 정보 페이지로 이동 로직 활성화
        if (familyType.includes('장애인')) {
            setCurrentPage('disability');
        } else if (lifeCycle.includes('노년')) {
            setCurrentPage('aged');
        } else {
            // 노년과 장애인을 둘 다 선택하지 않았을 경우, 프로필 저장 후 메인으로 이동
            await saveUserProfile();
            navigate('/mainpage');
        }
      } else {
        alert('생애 주기를 선택해주세요.');
      }
    }
    // ⭐ 이제 이 상세 정보 페이지들은 활성화되어 내비게이션 플로우에 포함됩니다.
    else if (currentPage === 'disability') {
      if (disabilityStatus === true) {
        setCurrentPage('disabilitygrade');
      } else if (disabilityStatus === false) {
        // 장애인은 아니지만 노년도 선택하지 않은 경우, 프로필 저장 후 메인으로 이동
        // (노년이 선택되어 있다면 disabilitytype 페이지에서 aged로 넘어감)
        if (lifeCycle.includes('노년')) {
             setCurrentPage('aged');
        } else {
            await saveUserProfile();
            navigate('/mainpage');
        }
      } else {
        alert('장애 등록 여부를 선택해주세요.');
      }
    } else if (currentPage === 'disabilitygrade') {
      if (disabilityGrade) {
        setCurrentPage('disabilitytype');
      } else {
        alert('장애 등급을 선택해주세요.');
      }
    } else if (currentPage === 'disabilitytype') {
        if (disabilityType) {
            if (lifeCycle.includes('노년')) { // 장애 상세 입력 후 노년도 선택했다면 노년 상세 페이지로 이동
                setCurrentPage('aged');
            } else {
                // 노년 선택 안 한 경우, 프로필 저장 후 메인으로 이동
                await saveUserProfile();
                navigate('/mainpage');
            }
        } else {
            alert('장애 유형을 선택해주세요.');
        }
    } else if (currentPage === 'aged') {
        if (isReceivingAgedPension !== null) {
            if (familyCount === 1) {
                setCurrentPage('agedalone');
            } else {
                setCurrentPage('agedadditional');
            }
        } else {
            alert('기초연금 수령 여부를 선택해주세요.');
        }
    } else if (currentPage === 'agedalone') {
        if (isLivingAlone !== null) {
            setCurrentPage('agedadditional');
        } else {
            alert('혼자 거주 여부를 선택해주세요.');
        }
    } else if (currentPage === 'agedadditional') { // 최종 단계
        await saveUserProfile();
        navigate('/mainpage');
    }
  };
  
  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleBirthdayChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    let formattedValue = '';
    if (value.length > 0) formattedValue = value.slice(0, 4);
    if (value.length >= 5) formattedValue += '-' + value.slice(4, 6);
    if (value.length >= 7) formattedValue += '-' + value.slice(6, 8);
    setBirthday(formattedValue);
  };

  const handleResidenceChange = (e) => {
    setResidence(e.target.value);
  };

  const handleResidenceDetailChange = (e) => {
    setResidenceDetail(e.target.value);
  };

  const handleIncrease = () => {
    if (familyCount < 7) {
      setFamilyCount(prev => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (familyCount > 1) {
      setFamilyCount(prev => prev - 1);
    }
  };

  const handleSalarySelect = (selectedSalary) => {
    setSalary(selectedSalary);
    setIsSalaryDropdownOpen(false);
  };

  const handleHireSelect = (selectedHire) => {
    setHire(selectedHire);
  };

  const handleLifeCycleSelect = (selectedCycle) => {
    // 생애 주기는 하나만 선택 가능하다고 가정
    setLifeCycle([selectedCycle]); 
  };

  const handleFamilyTypeSelect = (selectedType) => {
    setFamilyType(prev => {
      if (prev.includes(selectedType)) {
        return prev.filter(item => item !== selectedType);
      } else {
        return [...prev, selectedType];
      }
    });
  };

  const handleDisabilityStatusSelect = (status) => {
    setDisabilityStatus(status);
  };
  
  const handleDisabilityGradeSelect = (grade) => {
      setDisabilityGrade(grade);
  };

  const handleDisabilityTypeSelect = (selectedType) => {
    setDisabilityType(selectedType);
    setIsDisabilityDropdownOpen(false);
  };

  const handleAgedPensionSelect = (status) => {
      setIsReceivingAgedPension(status);
  };

  const handleLivingAloneSelect = (status) => {
      setIsLivingAlone(status);
  };

  const handleAgedAdditionalSelect = (selectedItem) => {
    setAgedAdditional(prev => {
        if (prev.includes(selectedItem)) {
            return prev.filter(item => item !== selectedItem);
        } else {
            return [...prev, selectedItem];
        }
    });
  };

  const getIncomePercentage = (familyCount, salary) => {
    // 이 함수는 UI 표시용이며, API 저장과는 직접적인 관련이 없습니다.
    const baseIncome = 3500000;
    const adjustedBaseIncome = baseIncome * Math.sqrt(familyCount / 3);
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
    let percentage = 50 + (50 * (1 - (selectedIncome / adjustedBaseIncome)));
    const basePercentage = Math.max(0, Math.min(100, percentage));
    const range = 5;
    const minPercentage = Math.max(0, basePercentage - range);
    const maxPercentage = Math.min(100, basePercentage + range);
    return `${minPercentage.toFixed(0)}%~${maxPercentage.toFixed(0)}%`;
  };

  const renderContent = () => {
    if (currentPage === 'gender') {
      const isFormValid = gender && birthday.length === 10 && residence;
      return (
        <>
          <div className={styles.content}>
            <div className={styles.mainTitle}>
              {userName}님의 정보를<br />입력해주세요
            </div>
            <h2 className={styles.label}>성별</h2>
            <div className={styles.buttonGroup}>
              <button
                className={`${styles.genderButton} ${gender === '남자' ? styles.active : ''}`}
                onClick={() => handleGenderSelect('남자')}
              >
                남자
              </button>
              <button
                className={`${styles.genderButton} ${gender === '여자' ? styles.active : ''}`}
                onClick={() => handleGenderSelect('여자')}
              >
                여자
              </button>
            </div>
            <h2 className={styles.label}>생년월일</h2>
            <input
              type="text"
              className={styles.inputField}
              placeholder="YYYY-MM-DD"
              value={birthday}
              onChange={handleBirthdayChange}
              maxLength="10"
            />
            <h2 className={styles.label}>거주지</h2>
            <div className={styles.residenceContainer}>
              <input
                type="text"
                className={`${styles.inputField} ${styles.residenceInput}`}
                placeholder="거주지를 입력해주세요"
                value={residence}
                onChange={handleResidenceChange}
              />
              <button className={styles.searchButton}>찾기</button>
            </div>
            <input
              type="text"
              className={styles.inputField}
              placeholder="상세 주소"
              value={residenceDetail}
              onChange={handleResidenceDetailChange}
            />
          </div>
          <button
            className={styles.authBtn}
            onClick={handleNextClick}
            disabled={!isFormValid}
          >
            <img 
              src={isFormValid ? ActiveNextButton : NextButton} 
              alt="다음 버튼" 
            />
          </button>
        </>
      );
    } else if (currentPage === 'family') {
      return (
        <>
          <div className={styles.content}>
            <div className={styles.mainTitle}>
              가구원 수를<br />입력해주세요
            </div>
            <div className={styles.memberGroup}>
              <div className={styles.memberInput}>
                <img src={Minusicon} alt="감소" className={styles.iconButton} onClick={handleDecrease} />
                <span className={styles.counterValue}>
                  {familyCount === 7 ? '7' : familyCount}
                </span>
                <img src={Plusicon} alt="증가" className={styles.iconButton} onClick={handleIncrease} />
              </div>
            </div>
          </div>
          <button className={styles.authBtn} onClick={handleNextClick}>
            <img src={ActiveNextButton} alt="다음 버튼" />
          </button>
        </>
      );
    } else if (currentPage === 'salary') {
      const isFormValid = !!salary;
      return (
        <>
          <div className={styles.content}>
            <div className={styles.title}>
              <span className={styles.highlight}>월 소득 구간</span>을<br />선택해주세요
            </div>
            <p className={styles.subTitle}>기준 중위소득 판단 및 소득 구간 산정에 필요해요</p>
            <div className={styles.inputGroup}>
              <div className={styles.salaryInput} onClick={() => setIsSalaryDropdownOpen(!isSalaryDropdownOpen)}>
                <span className={`${styles.salaryText} ${salary ? styles.selected : ''}`}>{salary || '소득을 선택해주세요'}</span>
                <img src={Arrowicon} alt="화살표" className={styles.arrow} />
              </div>
              {isSalaryDropdownOpen && (
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
          </div>
          <button className={styles.authBtn} onClick={handleNextClick} disabled={!isFormValid}>
            <img src={isFormValid ? ActiveNextButton : NextButton} alt="다음 버튼" />
          </button>
        </>
      );
    } else if (currentPage === 'hire') {
      const isFormValid = !!hire;
      return (
        <>
          <div className={styles.content}>
            <div className={styles.title}>
              <span className={styles.highlight}>고용 상태</span>를<br />선택해주세요
            </div>
            <div className={styles.buttonGroup}>
              <button className={styles.hireImageButton} onClick={() => handleHireSelect('근무 중')}>
                <img
                  src={hire === '근무 중' ? ActiveHireOButton : HireOButton}
                  alt="근무 중"
                />
              </button>
              <button className={styles.hireImageButton} onClick={() => handleHireSelect('무직')}>
                <img
                  src={hire === '무직' ? ActiveHireXButton : HireXButton}
                  alt="무직"
                />
              </button>
            </div>
          </div>
          <button className={styles.authBtn} onClick={handleNextClick} disabled={!isFormValid}>
            <img src={isFormValid ? ActiveNextButton : NextButton} alt="다음 버튼" />
          </button>
        </>
      );
    } else if (currentPage === 'additional') {
      const isFormValid = lifeCycle.length > 0;
      return (
        <>
          <div className={styles.content}>
            <div className={styles.title}>
              <span className={styles.highlight}>생애 주기별 정보 수집을 위한<br />해당 사항</span>을<br />선택해주세요
            </div>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>생애주기</h3>
              <div className={styles.buttonGrid}>
                {lifeCycles.map(cycle => (
                  <GrayButton
                    key={cycle}
                    isActive={lifeCycle.includes(cycle)}
                    onClick={() => handleLifeCycleSelect(cycle)}
                  >
                    {cycle}
                  </GrayButton>
                ))}
              </div>
            </div>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>가구 유형</h3>
              <div className={styles.buttonGrid}>
                {familyTypes.map(type => (
                  <GrayButton
                    key={type}
                    isActive={familyType.includes(type)}
                    onClick={() => handleFamilyTypeSelect(type)}
                  >
                    {type}
                  </GrayButton>
                ))}
              </div>
            </div>
          </div>
          <button
            className={styles.authBtn}
            onClick={handleNextClick}
            disabled={!isFormValid}
          >
            <img
              src={isFormValid ? ActiveNextButton : NextButton}
              alt="다음 버튼"
            />
          </button>
        </>
      );
    } 
    // 이제 이 상세 정보 페이지들은 활성화되어 내비게이션 플로우에 포함됩니다.
    else if (currentPage === 'disability') {
      const isFormValid = disabilityStatus !== null;
      return (
        <>
          <div className={styles.content}>
            <div className={styles.title}>
              <span className={styles.highlight}>장애 등록 여부</span>를<br />선택해주세요
            </div>
            <div className={styles.disabilityButtonGroup}>
              <button className={styles.disabilityImageButton} onClick={() => handleDisabilityStatusSelect(true)}>
                <img
                  src={disabilityStatus === true ? ActiveDisabilityOButton : DisabilityOButton}
                  alt="등록됨"
                />
              </button>
              <button className={styles.disabilityImageButton} onClick={() => handleDisabilityStatusSelect(false)}>
                <img
                  src={disabilityStatus === false ? ActiveDisabilityXButton : DisabilityXButton}
                  alt="무관"
                />
              </button>
            </div>
          </div>
          <button
            className={styles.authBtn}
            onClick={handleNextClick}
            disabled={!isFormValid}
          >
            <img
              src={isFormValid ? ActiveNextButton : NextButton}
              alt="다음 버튼"
            />
          </button>
        </>
      );
    } else if (currentPage === 'disabilitygrade') {
        const isFormValid = !!disabilityGrade;
        return (
          <>
            <div className={styles.content}>
              <div className={styles.title}>
                <span className={styles.highlight}>장애 등급</span>을<br />선택해주세요
              </div>
              <div className={styles.buttonGrid}>
                {disabilityGrades.map(grade => (
                  <GrayButton
                    key={grade}
                    isActive={disabilityGrade === grade}
                    onClick={() => handleDisabilityGradeSelect(grade)}
                  >
                    {grade}
                  </GrayButton>
                ))}
              </div>
            </div>
            <button className={styles.authBtn} onClick={handleNextClick} disabled={!isFormValid}>
                <img 
                  src={isFormValid ? ActiveNextButton : NextButton} 
                  alt="다음 버튼" 
                />
            </button>
          </>
        );
    } else if (currentPage === 'disabilitytype') {
      const isFormValid = !!disabilityType;
      return (
        <>
          <div className={styles.content}>
            <div className={styles.title}>
              <span className={styles.highlight}>장애 유형</span>을<br />선택해주세요
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.disabilitytypeInput} onClick={() => setIsDisabilityDropdownOpen(!isDisabilityDropdownOpen)}>
                <span className={`${styles.disabilitytypeText} ${disabilityType ? styles.selected : ''}`}>
                  {disabilityType || '장애 유형'}
                </span>
                <img src={Arrowicon} alt="화살표" className={styles.arrow} />
              </div>
              {isDisabilityDropdownOpen && (
                <div className={styles.disabilitytypeDropdown}>
                  {disabilityOptions.map((type, index) => (
                    <div
                      key={type}
                      className={`${styles.disabilitytypeItem} ${disabilityType === type ? styles.selected : ''}`}
                      onClick={() => handleDisabilityTypeSelect(type)}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className={styles.authBtn} onClick={handleNextClick} disabled={!isFormValid}>
              <img
                src={isFormValid ? ActiveNextButton : NextButton}
                alt="다음 버튼"
              />
            </button>
          </div>
        </>
      );
    } else if (currentPage === 'aged') {
        const isFormValid = isReceivingAgedPension !== null;
        return (
            <>
                <div className={styles.content}>
                    <div className={styles.title}>
                        <span className={styles.highlight}>기초 연금을<br />받고 계신가요 ?</span>
                    </div>
                    <div className={styles.agedButtonGroup}>
                        <button className={styles.agedImageButton} onClick={() => handleAgedPensionSelect(true)}>
                            <img
                                src={isReceivingAgedPension === true ? ActiveYesOButton : YesOButton}
                                alt="예"
                            />
                        </button>
                        <button className={styles.agedImageButton} onClick={() => handleAgedPensionSelect(false)}>
                            <img
                                src={isReceivingAgedPension === false ? ActiveNoXButton : NoXButton}
                                alt="아니오"
                            />
                        </button>
                    </div>
                </div>
                <button className={styles.authBtn} onClick={handleNextClick} disabled={!isFormValid}>
                    <img
                        src={isFormValid ? ActiveNextButton : NextButton}
                        alt="다음 버튼"
                    />
                </button>
            </>
        );
    } else if (currentPage === 'agedalone') {
        const isFormValid = isLivingAlone !== null;
        return (
            <>
                <div className={styles.content}>
                    <div className={styles.title}>
                        <span className={styles.highlight}>현재 혼자 거주하고 계신가요 ?</span>
                    </div>
                    <div className={styles.agedButtonGroup}>
                        <button className={styles.agedImageButton} onClick={() => handleLivingAloneSelect(true)}>
                            <img
                                src={isLivingAlone === true ? ActiveYesOButton : YesOButton}
                                alt="예"
                            />
                        </button>
                        <button className={styles.agedImageButton} onClick={() => handleLivingAloneSelect(false)}>
                            <img
                                src={isLivingAlone === false ? ActiveNoXButton : NoXButton}
                                alt="아니오"
                            />
                        </button>
                    </div>
                </div>
                <button className={styles.authBtn} onClick={handleNextClick} disabled={!isFormValid}>
                    <img
                        src={isFormValid ? ActiveNextButton : NextButton}
                        alt="다음 버튼"
                    />
                </button>
            </>
        );
    } else if (currentPage === 'agedadditional') {
      return (
          <>
            <div className={styles.content}>
              <div className={styles.title}>
                <span className={styles.highlight}>다음 중<br />해당되는 항목이<br />있으신가요 ?</span>
                <span className={styles.plural}>&#40;복수 선택 가능&#41;</span>
              </div>
              <div className={`${styles.buttonGrid} ${styles.agedAdditionalGrid}`}>
                {agedAdditionalItems.map(item => (
                  <GrayButton
                    key={item.id}
                    isActive={agedAdditional.includes(item.text)}
                    onClick={() => handleAgedAdditionalSelect(item.text)}
                    isFullWidth={true}
                  >
                    {item.text}
                  </GrayButton>
                ))}
              </div>
            </div>
            <button
                className={styles.authBtn}
                onClick={handleNextClick}
            >
                <img
                    src={ActiveNextButton}
                    alt="다음 버튼"
                />
            </button>
          </>
      );
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <div className={styles.backbutton} onClick={handleBackClick}>
          <img src={Backicon} alt="뒤로가기" />
        </div>
        <div className={styles.headerTitle}>정보 입력</div>
      </div>
      {renderContent()}
    </div>
  );
};

export default InputPage;
