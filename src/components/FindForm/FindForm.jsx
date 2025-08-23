import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FindForm.module.css';
import Backicon from '../../assets/back.svg';

const FindForm = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/my');   // ✅ 5초 뒤 /my로 이동
    }, 5000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 해제
  }, [navigate]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.backbutton} onClick={handleBackClick}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <div className={styles.contentBox}>
        <div className={styles.searchIcon}>🔍</div>
        <p className={styles.text}>
          입력이 완료되었어요! <br />
          든든이 당신에게 <br />
          꼭 맞는 복지 서비스를 <br />
          준비하고 있어요
        </p>
      </div>
    </div>
  );
};

export default FindForm;
