// src/components/AuthForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AuthForm.module.css'; // AuthForm.module.css를 사용하도록 명확히 함
import DNDNLogo from '../../assets/DNDN.png'; // 든든 로고 이미지 추가
import Navericon from '../../assets/naver.svg';
import Kakaoicon from '../../assets/kakaotalk.svg';
import Googleicon from '../../assets/google.svg';

// Backicon과 Input 컴포넌트는 이 디자인에서 사용되지 않으므로 제거

const AuthForm = () => {
  const navigate = useNavigate();
  const [isKakaoReady, setIsKakaoReady] = useState(false);

  // 🔹 카카오 SDK 초기화 (기존 로직 유지)
  useEffect(() => {
    // Kakao SDK 로드 및 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('702029eab029f8924b63da1102e7f810'); // 여기에 실제 카카오 앱 키 입력
      setIsKakaoReady(true);
    } else if (!window.Kakao) {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init('702029eab029f8924b63da1102e7f810');
        }
        setIsKakaoReady(true);
      };
      document.body.appendChild(script);
    } else if (window.Kakao.isInitialized()) {
      setIsKakaoReady(true); // 이미 초기화되어 있으면 바로 true 설정
    }
  }, []);

  // 🔹 사용자 정보 기반 네비게이션 (기존 로직 유지)
  const navigateBasedOnUserInfo = (userInfo) => {
    // userInfo 객체에 필요한 정보 (name, phoneNumber, birth, employment)가 모두 있으면 메인으로, 없으면 회원가입 페이지로
    if (userInfo.name && userInfo.phoneNumber && userInfo.birth && userInfo.employment) {
      navigate('/main');
    } else {
      navigate('/register');
    }
  };

  // 🔹 휴대폰번호 로그인 버튼 클릭 핸들러
  // 이 버튼을 누르면 이전 AuthForm의 이름/전화번호 입력 화면으로 이동합니다.
  const handlePhoneLoginClick = () => {
    navigate('/phone-login'); // 이 경로에 이름/전화번호 입력 컴포넌트를 연결해야 합니다.
  };

  // 🔹 회원가입하기 링크 클릭 핸들러
  const handleRegisterClick = () => {
    alert('회원가입 페이지로 이동'); // 임시 알림, 실제 navigate('/register')로 대체
    // navigate('/register');
  };

  // 🔹 카카오 로그인 (기존 로직 유지)
  const handleKakaoLogin = () => {
    if (!isKakaoReady || !window.Kakao.Auth) {
      console.error('Kakao SDK가 로드되지 않았거나 초기화되지 않았습니다.');
      alert('카카오 로그인 기능을 사용할 수 없습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    window.Kakao.Auth.login({
      scope: 'profile_nickname, account_email', // 필요한 동의 항목
      success: async function (authObj) {
        const accessToken = authObj.access_token;
        try {
          const response = await fetch('https://nexusdndn.duckdns.org/auth/login/social', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ loginType: 'KAKAO', accessToken })
          });
          const data = await response.json();
          console.log('backend response (Kakao):', data);

          if (data.result?.accessToken) {
            localStorage.setItem('token', data.result.accessToken);
          }
          const currentUser = data.result || {};
          localStorage.setItem('userInfo', JSON.stringify(currentUser));
          navigateBasedOnUserInfo(currentUser);
        } catch (err) {
          console.error('카카오 로그인 backend 연동 실패', err);
          alert('카카오 로그인 중 오류가 발생했습니다.');
        }
      },
      fail: function (err) {
        console.error('카카오 로그인 실패:', err);
        alert('카카오 로그인에 실패했습니다.');
      }
    });
  };

  // 🔹 Google 로그인 (기존 로직 유지)
  const handleGoogleLogin = async () => {
    try {
      // .env 파일에서 환경 변수 불러오기 (Vite 사용 시)
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
          // 팝업 창이 닫혔는지 확인
          if (googleWindow.closed) {
              clearInterval(pollTimer);
              console.log('Google 로그인 팝업 창이 닫혔습니다.');
              return;
          }

          // 리다이렉션된 URL 확인
          if (googleWindow.location.href.startsWith(redirectUri)) {
            const urlParams = new URLSearchParams(googleWindow.location.hash.substring(1));
            const accessToken = urlParams.get('access_token');
            googleWindow.close();
            clearInterval(pollTimer);

            if (!accessToken) {
              alert('Google 로그인 실패: 토큰을 받지 못했습니다.');
              return;
            }

            fetch('https://nexusdndn.duckdns.org/auth/login/social', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ loginType: 'GOOGLE', accessToken })
            })
              .then((res) => res.json())
              .then((data) => {
                console.log('backend response (Google):', data);

                if (data.result?.accessToken) {
                  localStorage.setItem('token', data.result.accessToken);
                }

                const currentUser = data.result || {};
                localStorage.setItem('userInfo', JSON.stringify(currentUser));
                navigateBasedOnUserInfo(currentUser);
              })
              .catch((err) => {
                console.error('Google 로그인 backend 연동 실패', err);
                alert('로그인 중 오류가 발생했습니다.');
              });
          }
        } catch (err) {
          // Cross-origin 에러 무시 (팝업이 다른 도메인에 있을 때 발생)
          // console.warn('Google 팝업 접근 중 오류:', err);
        }
      }, 500); // 0.5초마다 팝업 상태 확인
    } catch (err) {
      console.error('Google 로그인 시작 실패:', err);
      alert('Google 로그인 시작 중 오류가 발생했습니다.');
    }
  };

  // 🔹 Naver 로그인 (기존 로직 유지)
  const handleNaverLogin = () => {
    const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_NAVER_REDIRECT_URI;
    const state = Math.random().toString(36).substring(2); // CSRF 방지

    const authUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${state}`;

    window.location.href = authUrl; // 현재 창을 Naver 로그인 페이지로 리다이렉션
  };


  return (
    <div className={styles.container}>
      {/* 든든 로고 */}
      <div className={styles.logoWrapper}>
        <img src={DNDNLogo} alt="든든 로고" className={styles.dndnLogo} />
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

      {/* 휴대폰 번호 로그인 버튼 */}
      <button className={styles.phoneLoginBtn} onClick={handlePhoneLoginClick}>
        휴대폰번호 로그인
      </button>

      {/* 회원가입하기 링크 */}
      <button className={styles.registerLink} onClick={handleRegisterClick}>
        회원가입하기
      </button>
    </div>
  );
};

export default AuthForm;
