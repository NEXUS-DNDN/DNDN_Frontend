import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import Navericon from '../../assets/naver.svg';
import Kakaoicon from '../../assets/kakaotalk.svg';
import Googleicon from '../../assets/google.svg';
import Backicon from '../../assets/back.svg';
import Input from '../common/Input';
import NoncheckIcon from '../../assets/noncheck.svg';
import CheckIcon from '../../assets/check.svg';

const AuthForm = () => {
  const navigate = useNavigate();

  // 로그인 유지 여부 초기값 확인
  const [isChecked, setIsChecked] = useState(() => {
    return localStorage.getItem('isLoginPersistent') === 'true';
  });

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // 컴포넌트 마운트 시 자동 로그인 확인
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUser = localStorage.getItem('userInfo');

    if (isLoggedIn && storedUser) {
      navigate('/main'); // 이미 로그인 되어있으면 바로 메인으로
    }
  }, [navigate]);

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{0,4})/, '$1-$2');
    }
    setPhoneNumber(value);
  };

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
    localStorage.setItem('isLoginPersistent', !isChecked);
  };

  const handleLoginClick = () => {
    if (!name.trim() || !phoneNumber.replace(/-/g, '').trim()) {
      alert('이름과 전화번호를 모두 입력해주세요.');
      return;
    }

    const userInfo = { name, phoneNumber };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    if (isChecked) {
      localStorage.setItem('isLoggedIn', 'true'); // 로그인 상태 저장
    } else {
      localStorage.removeItem('isLoggedIn');
    }

    navigate('/main');
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

        <div
          className={styles.checkboxContainer}
          onClick={handleCheckboxClick}
          style={{ cursor: 'pointer' }}
        >
          <img src={isChecked ? CheckIcon : NoncheckIcon} alt="로그인 유지" />
          <span style={{ marginLeft: '8px' }}>로그인 유지</span>
        </div>

        <button className={styles.authBtn} onClick={handleLoginClick}>
          로그인
        </button>

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
