import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './NameInputForm.module.css';
import Backicon from '../../assets/back.svg';
import Input from '../common/Input';

// 사용자 정보 업데이트 함수
const updateUserInfo = async (newInfo) => {
  try {
    const token = localStorage.getItem('token'); // 로그인 후 JWT
    const response = await axios.post(
      '/user',
      newInfo,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedUser = response.data;
    localStorage.setItem('userInfo', JSON.stringify(updatedUser));
    return updatedUser;
  } catch (err) {
    console.error('사용자 정보 업데이트 실패', err);
    return null;
  }
};

const NameInputForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('name');
    if (savedName) {
      setName(savedName);
    }
  }, []);

  const handleNextClick = async () => {
    // 서버로 사용자 정보 업데이트
    const updatedUser = await updateUserInfo({ name });

    if (updatedUser) {
      // 로컬스토리지에도 이름 저장 (선택적)
      localStorage.setItem('name', name);

      // 다음 화면으로 이동
      navigate('/birthdayinput');
    } else {
      alert('사용자 정보 업데이트에 실패했습니다.');
    }
  };

  return (
    <>
      <div className={styles.backbutton}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.highlight}>이름</span>을<br />입력해주세요
        </div>
        <div className={styles.inputGroup}>
          <Input
            type="text"
            placeholder="홍길동"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button className={styles.authBtn} onClick={handleNextClick}>
          다음
        </button>
      </div>
    </>
  );
};

export default NameInputForm;
