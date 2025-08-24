import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AuthForm.module.css';
import Navericon from '../../assets/naver.svg';
import Kakaoicon from '../../assets/kakaotalk.svg';
import Googleicon from '../../assets/google.svg';
import Backicon from '../../assets/back.svg';
import Input from '../common/Input';
import axios from 'axios';

const AuthForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleBackClick = () => navigate(-1);

  const handleNameChange = (e) => setName(e.target.value);

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    else if (value.length > 3) value = value.replace(/(\d{3})(\d{0,4})/, '$1-$2');

    setPhoneNumber(value);
  };

  const handleAuthClick = async () => {
    if (!name.trim()) return alert('이름을 적어주세요.');
    if (!phoneNumber.replace(/-/g, '').trim()) return alert('전화번호를 적어주세요.');

    const userData = {
      name: name,
      phoneNumber: phoneNumber.replace(/-/g, ""),
      birthday: "2000-01-01",
      address: "서울시 강남구",
      householdNumber: 1,
      monthlyIncome: "UNDER_100",
      gender: "MALE",
      family: "GENERAL",
      employment: "EMPLOYED",
      lifeCycle: "YOUTH",
      householdTypes: ["GENERAL"]
    };

    try {
      const response = await axios.post(
        'https://nexusdndn.duckdns.org/api/user',
        userData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      console.log("회원가입 성공:", response.data);
      alert("회원가입 완료!");
      navigate('/verify');
    } catch (error) {
      if (error.response) {
        console.error("응답 에러:", error.response.status, error.response.data);
        alert(`회원가입 실패: ${error.response.status}`);
      } else if (error.request) {
        console.error("요청 에러:", error.request);
        alert("서버 응답이 없습니다.");
      } else {
        console.error("기타 에러:", error.message);
        alert("알 수 없는 에러 발생");
      }
    }
  };

  // 🔹 소셜 로그인 처리
  const handleSocialLogin = (provider) => {
    let authUrl = "";

    switch(provider) {
      case "naver":
        authUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REACT_APP_NAVER_REDIRECT_URI)}&state=STATE_STRING`;
        break;
      case "kakao":
        authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REACT_APP_KAKAO_REDIRECT_URI)}&response_type=code`;
        break;
      case "google":
        authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REACT_APP_GOOGLE_REDIRECT_URI)}&response_type=code&scope=profile email`;
        break;
      default:
        return;
    }

    window.location.href = authUrl; // 소셜 로그인 페이지로 이동
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
          <Input type="text" placeholder="010 - **** - 1234" value={phoneNumber} onChange={handlePhoneChange} />
        </div>

        <button className={styles.authBtn} onClick={handleAuthClick}>인증하기</button>

        <div className={styles.divider}>
          <div className={styles.line1}></div>
          <span className={styles.text}>또는</span>
          <div className={styles.line2}></div>
        </div>

        <div className={styles.socialButtons}>
          <button className={styles.naver} onClick={() => handleSocialLogin("naver")}>
            <img src={Navericon} alt="Naver 로그인" />
          </button>
          <button className={styles.kakao} onClick={() => handleSocialLogin("kakao")}>
            <img src={Kakaoicon} alt="Kakao 로그인" />
          </button>
          <button className={styles.google} onClick={() => handleSocialLogin("google")}>
            <img src={Googleicon} alt="Google 로그인" />
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
