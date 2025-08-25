// src/components/LoginForm.jsx (카카오/구글/네이버 로그인 + 일반 로그인)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './LoginForm.module.css'; // LoginForm.module.css 사용
import Navericon from '../../assets/naver.svg';
import Kakaoicon from '../../assets/kakaotalk.svg';
import Googleicon from '../../assets/google.svg';
import Backicon from '../../assets/back.svg';
import Input from '../common/Input'; // Input 컴포넌트 사용

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // AuthContext의 login 함수 사용
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isKakaoReady, setIsKakaoReady] = useState(false);

  // ✅ refreshToken으로 새 accessToken 받기 (기존 기능 유지)
  const refreshAccessToken = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!userInfo.userId || !refreshToken) {
      throw new Error('refreshToken 또는 userId 없음. 다시 로그인 필요');
    }

    const response = await fetch('https://nexusdndn.duckdns.org/auth/refrechToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userInfo.userId,
        refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error('리프레시 토큰 요청 실패');
    }

    const data = await response.json();
    localStorage.setItem('accessToken', data.result.accessToken);
    localStorage.setItem('refreshToken', data.result.refreshToken);
    return data.result.accessToken;
  };

  // ✅ API 호출 래퍼 (기존 기능 유지)
  const apiFetch = async (url, options = {}) => {
    let accessToken = localStorage.getItem('accessToken');

    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };

    try {
      let response = await fetch(url, {
        ...options,
        headers: { ...defaultHeaders, ...options.headers },
      });

      // accessToken 만료 → refresh 후 재시도
      if (response.status === 401) {
        try {
          accessToken = await refreshAccessToken();
          response = await fetch(url, {
            ...options,
            headers: { ...defaultHeaders, Authorization: `Bearer ${accessToken}` },
          });
        } catch (refreshErr) {
          console.error('토큰 재발급 실패 → 강제 로그아웃', refreshErr);
          localStorage.clear();
          navigate('/login'); // 로그인 페이지로 이동 (필요시 AuthForm으로 변경)
          throw refreshErr;
        }
      }

      return response;
    } catch (err) {
      console.error('API 요청 실패', err);
      throw err;
    }
  };

  // ✅ 카카오 SDK 로드 (기존 기능 유지)
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('702029eab029f8924b63da1102e7f810'); // 실제 카카오 앱 키
    }
    if (window.Kakao) {
      setIsKakaoReady(true);
    } else {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init('702029eab029f8924b63da1102e7f810');
        }
        setIsKakaoReady(true);
      };
      document.body.appendChild(script);
    }
  }, []);

  const handleBackClick = () => navigate(-1); // 뒤로가기 버튼 기능 유지

  // 입력 핸들링 (기존 기능 유지)
  const handleNameChange = (e) => setName(e.target.value);
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 6) value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    else if (value.length > 3) value = value.replace(/(\d{3})(\d{0,4})/, '$1-$2');
    setPhoneNumber(value);
  };

  // ✅ 로그인 후 라우팅 분기 (기존 기능 유지)
  const navigateBasedOnUserInfo = (userInfo) => {
    // userInfo 객체에 필요한 정보 (name, phoneNumber, birth, employment 등)가 모두 있으면 메인으로
    // 여기서는 name 또는 nickname만 있어도 메인으로 가는 것으로 가정
    if (userInfo.name || userInfo.nickname) { // nickname 추가
      navigate('/mainpage'); // 메인 페이지로 이동 (main -> mainpage로 수정)
    } else {
      navigate('/register'); // 필요한 정보가 없으면 회원가입/정보 입력 페이지로
    }
  };

  // ✅ 일반 로그인 (기존 기능 유지)
  const handleLoginClick = () => {
    if (!name.trim() || !phoneNumber.replace(/-/g, '').trim()) {
      alert('이름과 전화번호를 모두 입력해주세요.');
      return;
    }
    // TODO: 백엔드에 이름/전화번호로 로그인하는 API 호출 로직 추가 필요
    // 현재는 localStorage에 저장하고 navigateBasedOnUserInfo 호출
    const storedUser = JSON.parse(localStorage.getItem('userInfo')) || {};
    const updatedUser = { ...storedUser, name, phoneNumber };
    localStorage.setItem('userInfo', JSON.stringify(updatedUser));
    navigateBasedOnUserInfo(updatedUser);
  };

  // ✅ 카카오 로그인 (기존 기능 유지)
  const handleKakaoLogin = () => { 
    if (!isKakaoReady || !window.Kakao || !window.Kakao.Auth) { // isKakaoReady 추가
      alert('Kakao SDK 로딩에 실패했습니다.');
      return;
    }

    window.Kakao.Auth.login({
      scope: 'profile_nickname, account_email',
      prompt: 'login', // 자동 로그인 방지
      success: async function (authObj) {
        const socialAccessToken = authObj.access_token; // 카카오에서 받은 토큰
        try {
          const response = await apiFetch('https://nexusdndn.duckdns.org/auth/login/social', {
            method: 'POST',
            body: JSON.stringify({ loginType: 'KAKAO', accessToken: socialAccessToken }),
          });
          const data = await response.json();

          console.log('서버 응답 (카카오):', data);

          if (!response.ok) throw new Error(data.message || '로그인 요청 실패');

          // 2. 토큰 저장 및 AuthContext 업데이트
          if (data.result?.accessToken) {
            login(data.result.accessToken); // AuthContext에 로그인
            localStorage.setItem('accessToken', data.result.accessToken);
            localStorage.setItem('refreshToken', data.result.refreshToken);
            localStorage.setItem('userInfo', JSON.stringify(data.result)); // 사용자 정보 저장
          }
          
          const currentUser = data.result || {};
          if (!currentUser) throw new Error('사용자 정보를 찾을 수 없습니다.');

          if (currentUser.newUser) {
            // 신규 유저 → /register (추가 정보 입력)
            navigate('/register');
          } else {
            // 기존 유저 → /mainpage
            navigate('/mainpage');
          }

        } catch (err) {
          alert(`카카오 로그인 중 오류: ${err.message}`);
        }
      },
      fail: (err) => {
        console.error('카카오 로그인 실패', err);
        alert('카카오 로그인 실패');
      },
    });
  };

  // ✅ Google 로그인 (기존 기능 유지)
  const handleGoogleLogin = async () => {
    try {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
      const scope = 'profile email';
      const responseType = 'token';
      const state = 'GOOGLE';

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=${responseType}&scope=${encodeURIComponent(scope)}&state=${state}`;

      const googleWindow = window.open(authUrl, '_blank', 'width=500,height=600');

      const pollTimer = setInterval(() => {
        try {
          if (googleWindow.closed) { // 팝업 창이 닫혔는지 확인
              clearInterval(pollTimer);
              console.log('Google 로그인 팝업 창이 닫혔습니다.');
              return;
          }
          if (googleWindow.location.href.startsWith(redirectUri)) {
            const urlParams = new URLSearchParams(googleWindow.location.hash.substring(1));
            const socialAccessToken = urlParams.get('access_token');
            googleWindow.close();
            clearInterval(pollTimer);

            if (!socialAccessToken) {
              alert('Google 로그인 실패: 토큰을 받지 못했습니다.');
              return;
            }

            apiFetch('https://nexusdndn.duckdns.org/auth/login/social', {
              method: 'POST',
              body: JSON.stringify({ loginType: 'GOOGLE', accessToken: socialAccessToken })
            })
              .then((res) => res.json())
              .then((data) => {
                console.log('서버 응답 (Google):', data);
                if (data.result?.accessToken) {
                  login(data.result.accessToken); // AuthContext에 로그인
                  localStorage.setItem('accessToken', data.result.accessToken);
                  localStorage.setItem('refreshToken', data.result.refreshToken);
                  localStorage.setItem('userInfo', JSON.stringify(data.result)); // 사용자 정보 저장
                }
                const currentUser = data.result || {};
                navigateBasedOnUserInfo(currentUser); // 사용자 정보 기반 라우팅
              })
              .catch((err) => {
                console.error('Google 로그인 backend 연동 실패', err);
                alert('로그인 중 오류 발생');
              });
          }
        } catch (err) {
          // Cross-origin 에러 무시
        }
      }, 500);
    } catch (err) {
      console.error('Google 로그인 시작 실패', err);
      alert('Google 로그인 시작 실패');
    }
  };

  // ✅ Naver 로그인 (기존 기능 유지)
  const handleNaverLogin = () => {
    const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_NAVER_REDIRECT_URI;
    const state = Math.random().toString(36).substring(2);

    const authUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${state}`;

    window.location.href = authUrl; // 현재 창을 Naver 로그인 페이지로 리다이렉션
    // ⭐ NaverCallback.jsx에서 백엔드 연동 및 userInfo 저장 후 navigateBasedOnUserInfo 호출 필요합니다.
  };

  return (
    <div className={styles.container}> {/* 최상위 div에 styles.container 적용 */}
      {/* 뒤로가기 버튼 */}
      <div className={styles.backbutton} onClick={handleBackClick}>
        <img src={Backicon} alt="뒤로가기" />
      </div>

      <h1 className={styles.loginTitle}>로그인</h1> {/* 새 로그인 제목 */}

      {/* 이름 입력 그룹 */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>이름</label>
        <Input type="text" placeholder="홍길동" value={name} onChange={handleNameChange} className={styles.inputField} />
      </div>

      {/* 전화번호 입력 그룹 */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>전화번호</label>
        <Input type="text" placeholder="010-****-1234" value={phoneNumber} onChange={handlePhoneChange} className={styles.inputField} />
      </div>

      {/* 로그인 버튼 */}
      <button className={styles.loginBtn} onClick={handleLoginClick}> {/* authBtn -> loginBtn으로 변경 */}
        로그인
      </button>

      {/* 구분선 */}
      <div className={styles.divider}>
        <div className={styles.line1}></div>
        <span className={styles.text}>또는</span>
        <div className={styles.line2}></div>
      </div>

      {/* 소셜 로그인 버튼들 */}
      <div className={styles.socialButtons}>
        <button className={styles.naver} onClick={handleNaverLogin}>
          <img src={Navericon} alt="Naver 로그인" />
        </button>
        <button className={styles.kakao} onClick={handleKakaoLogin}>
          <img src={Kakaoicon} alt="Kakao 로그인" />
        </button>
        <button className={styles.google} onClick={handleGoogleLogin}>
          <img src={Googleicon} alt="Google 로그인" />
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
