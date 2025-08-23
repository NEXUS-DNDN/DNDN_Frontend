import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AuthForm.module.css';
import Navericon from '../../assets/naver.svg';
import Kakaoicon from '../../assets/kakaotalk.svg';
import Googleicon from '../../assets/google.svg';
import Backicon from '../../assets/back.svg';
import Input from '../common/Input';

const AuthForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 돌아감
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 추출
    if (value.length > 11) value = value.slice(0, 11); // 최대 11자리 제한

    // 자동 하이픈 삽입 (010-XXXX-XXXX 형식)
    if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{0,4})/, '$1-$2');
    }
    setPhoneNumber(value);
  };

  const handleAuthClick = () => {
    if (!name.trim()) {
      alert('이름을 적어주세요.');
      return;
    }
    if (!phoneNumber.replace(/-/g, '').trim()) {
      alert('전화번호를 적어주세요.');
      return;
    }

    // 인증 코드 생성
    const authCode = Math.floor(1000 + Math.random() * 9000).toString(); // 4자리 랜덤 코드

    // localStorage에 저장
    localStorage.setItem('authName', name);
    localStorage.setItem('authPhone', phoneNumber);
    localStorage.setItem('authCode', authCode);

    // 콘솔창에 인증번호 찍기
    console.log(`이름: ${name}`);
    console.log(`전화번호: ${phoneNumber}`);
    console.log(`인증번호: ${authCode}`);

    // 인증 코드 입력 페이지로 이동
    navigate('/verify');
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
          <button className={styles.naver}>
            <img src={Navericon} alt="Naver 로그인" />
          </button>
          <button className={styles.kakao}>
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
