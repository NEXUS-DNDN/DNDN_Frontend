import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BirthdayInputForm.module.css';
import Backicon from '../../assets/back.svg';
import Input from '../common/Input';

const BirthdayInputForm = () => {
  const handleBackClick = () => {
    console.log('뒤로가기 클릭');
    navigate('/nameinput');
  };
  const navigate = useNavigate();
  
  const handleNextClick = () => {
    navigate('/genderinput');
  };
  const [date, setDate] = useState('1990-01-01');

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  
  return (
    <>
      <div className={styles.backbutton} onClick={handleBackClick}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.highlight}>생년월일</span>을<br />선택해주세요
        </div>
        <div className={styles.inputGroup}>
          <Input type="date" value={date} onChange={handleDateChange} placeholder="1990-01-01" className={styles.dateInput}/>
        </div>
        <button className={styles.authBtn} onClick={handleNextClick}>다음</button>
      </div>
    </>
  );
};

export default BirthdayInputForm;