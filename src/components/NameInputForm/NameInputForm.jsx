import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './NameInputForm.module.css';
import Backicon from '../../assets/back.svg';
import Input from '../common/Input';

const NameInputForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  // 페이지 로드 시 로컬스토리지에서 기존 사용자 정보 불러오기
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('userInfo'));
    if (savedUser?.name) setName(savedUser.name);
  }, []);

  const handleNextClick = async () => {
    const token = localStorage.getItem('token'); // JWT 토큰 불러오기
    console.log('token:', token);
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    if (!name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }

    try {
      const response = await axios.put(
        'https://nexusdndn.duckdns.org/user',
        { name },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // 토큰 필수
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        // 백엔드에서 반환된 사용자 정보를 localStorage에 저장
        const updatedUser = response.data.result || response.data;
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));

        alert('사용자 정보가 저장되었습니다!');
        navigate('/birthdayinput');
      } else {
        alert('사용자 정보 업데이트에 실패했습니다.');
      }
    } catch (err) {
      console.error('사용자 이름 업데이트 실패', err.response || err);
      const status = err.response?.status;
      if (status === 403) {
        alert('권한이 없습니다. 다시 로그인 해주세요.');
        navigate('/login');
      } else {
        alert('사용자 정보 업데이트 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <>
      <div className={styles.backbutton} onClick={() => navigate(-1)}>
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

