import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NameInputForm.module.css';
import Backicon from '../../assets/back.svg';
import Input from '../common/Input';

const NameInputForm = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/birthdayinput');
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
          <Input type="text" placeholder="홍길동" />
        </div>
        <button className={styles.authBtn} onClick={handleNextClick}>다음</button>
      </div>
    </>
  );
};

export default NameInputForm;