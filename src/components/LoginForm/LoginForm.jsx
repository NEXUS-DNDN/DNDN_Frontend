import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import Navericon from '../../assets/naver.svg';
import Kakaoicon from '../../assets/kakaotalk.svg';
import Googleicon from '../../assets/google.svg';
import Backicon from '../../assets/back.svg';
import Input from '../common/Input';

const AuthForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isKakaoReady, setIsKakaoReady] = useState(false);

  // Kakao SDK 초기화
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('702029eab029f8924b63da1102e7f810');
    }
    if (window.Kakao) setIsKakaoReady(true);
    else {
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

  const handleBackClick = () => navigate(-1);

  const handleNameChange = (e) => setName(e.target.value);
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 6) value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    else if (value.length > 3) value = value.replace(/(\d{3})(\d{0,4})/, '$1-$2');
    setPhoneNumber(value);
  };

  const navigateBasedOnUserInfo = (userInfo) => {
    if (userInfo.name && userInfo.phoneNumber && userInfo.birth && userInfo.employment) {
      navigate('/main');
    } else {
      navigate('/nameinput');
    }
  };

  // 일반 로그인
  const handleLoginClick = () => {
    if (!name.trim() || !phoneNumber.replace(/-/g, '').trim()) {
      alert('이름과 전화번호를 모두 입력해주세요.');
      return;
    }
    const storedUser = JSON.parse(localStorage.getItem('userInfo')) || {};
    const updatedUser = { ...storedUser, name, phoneNumber };
    localStorage.setItem('userInfo', JSON.stringify(updatedUser));
    navigateBasedOnUserInfo(updatedUser);
  };

  // 🔹 카카오 로그인
  const handleKakaoLogin = () => {
    if (!isKakaoReady || !window.Kakao.Auth) {
      console.error('Kakao SDK 로딩 안됨');
      return;
    }

    window.Kakao.Auth.login({
      scope: 'profile_nickname, account_email',
      success: async function(authObj) {
        const accessToken = authObj.access_token;
        try {
          const response = await fetch('https://nexusdndn.duckdns.org/auth/login/social', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ loginType: 'KAKAO', accessToken })
          });
          if (!response.ok) throw new Error('소셜 로그인 API 실패');
          const data = await response.json();
          if (data.result?.token) localStorage.setItem('token', data.result.token);
          const currentUser = data.result?.user || {};
          localStorage.setItem('userInfo', JSON.stringify(currentUser));
          navigateBasedOnUserInfo(currentUser);
        } catch (err) {
          console.error('카카오 로그인 backend 연동 실패', err);
          alert('로그인 중 오류가 발생했습니다.');
        }
      },
      fail: function(err) {
        console.error('카카오 로그인 실패', err);
        alert('카카오 로그인 실패');
      }
    });
  };

  // 🔹 Google 로그인
  const handleGoogleLogin = async () => {
    try {
      const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
      const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
      const scope = 'profile email';
      const responseType = 'token';
      const state = 'GOOGLE';

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=${responseType}&scope=${encodeURIComponent(scope)}&state=${state}`;

      const googleWindow = window.open(authUrl, '_blank', 'width=500,height=600');

      const pollTimer = setInterval(() => {
        try {
          if (googleWindow.location.href.startsWith(redirectUri)) {
            const urlParams = new URLSearchParams(googleWindow.location.hash.substring(1));
            const accessToken = urlParams.get('access_token');
            googleWindow.close();
            clearInterval(pollTimer);

            if (!accessToken) {
              alert('Google 로그인 실패');
              return;
            }

            fetch('https://nexusdndn.duckdns.org/auth/login/social', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ loginType: 'GOOGLE', accessToken })
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.result?.token) localStorage.setItem('token', data.result.token);
                const currentUser = data.result?.user || {};
                localStorage.setItem('userInfo', JSON.stringify(currentUser));
                navigateBasedOnUserInfo(currentUser);
              })
              .catch((err) => {
                console.error('Google 로그인 backend 연동 실패', err);
                alert('로그인 중 오류가 발생했습니다.');
              });
          }
        } catch (err) {}
      }, 500);
    } catch (err) {
      console.error('Google 로그인 실패', err);
      alert('Google 로그인 실패');
    }
  };

  // 🔹 Naver 로그인
  const handleNaverLogin = () => {
    const clientId = process.env.REACT_APP_NAVER_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_NAVER_REDIRECT_URI;
    const state = Math.random().toString(36).substring(2); // CSRF 방지

    const authUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${state}`;

    window.location.href = authUrl; // redirect 방식
  };

  return (
    <>
      <div className={styles.backbutton} onClick={handleBackClick}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <div className={styles.container}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>이름</label>
          <Input type="text" placeholder="홍길동" value={name} onChange={handleNameChange} />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>전화번호</label>
          <Input type="text" placeholder="010-****-1234" value={phoneNumber} onChange={handlePhoneChange} />
        </div>
        <button className={styles.authBtn} onClick={handleLoginClick}>로그인</button>

        <div className={styles.divider}>
          <div className={styles.line1}></div>
          <span className={styles.text}>또는</span>
          <div className={styles.line2}></div>
        </div>

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
    </>
  );
};

export default AuthForm;

