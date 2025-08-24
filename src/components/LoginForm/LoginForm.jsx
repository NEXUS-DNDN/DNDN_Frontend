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
      window.Kakao.init('58d78f68d5e7fc7acab9d3dff9ccd0c4'); // 본인 앱 키 입력
    }
    if (window.Kakao) setIsKakaoReady(true);
    else {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init('58d78f68d5e7fc7acab9d3dff9ccd0c4');
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

  // 카카오 로그인
  const handleKakaoLogin = () => {
    if (!isKakaoReady || !window.Kakao.Auth) {
      console.error('Kakao SDK 로딩 안됨');
      return;
    }

    window.Kakao.Auth.login({
      scope: 'profile_nickname, account_email',
      success: async function(authObj) {
        const accessToken = authObj.access_token;
        console.log('Kakao accessToken:', accessToken);

        try {
          const response = await fetch(
            'https://nexusdndn.duckdns.org/auth/login/social',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ loginType: 'KAKAO', accessToken })
            }
          );

          if (!response.ok) throw new Error('소셜 로그인 API 실패');
          const data = await response.json();

          // JWT 토큰 저장
          if (data.result?.token) localStorage.setItem('token', data.result.token);

          // 사용자 정보
          const currentUser = data.result?.user || {};
          localStorage.setItem('userInfo', JSON.stringify(currentUser));

          // 사용자 정보가 없으면 /nameinput으로 이동
          if (currentUser.name && currentUser.phoneNumber) {
            navigateBasedOnUserInfo(currentUser);
          } else {
            navigate('/nameinput');
          }
        } catch (err) {
          console.error('백엔드 소셜 로그인 연동 실패', err);
          alert('로그인 중 오류가 발생했습니다.');
        }
      },
      fail: function(err) {
        console.error('카카오 로그인 실패', err);
        alert('카카오 로그인 실패');
      }
    });
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
          <button className={styles.naver}>
            <img src={Navericon} alt="Naver 로그인" />
          </button>
          <button className={styles.kakao} onClick={handleKakaoLogin}>
            <img src={Kakaoicon} alt="Kakao 로그인" />
          </button>
          <button className={styles.google}>
            <img src={Googleicon} alt="Google 로그인" />
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
