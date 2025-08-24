import React, { useState, useEffect } from 'react';
import styles from './MyPageForm.module.css';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../common/BottomNav';
import My from '../common/My';
import Backicon from '../../assets/back.svg';
import Profileicon from '../../assets/baseprofile.svg';

const MyPageForm = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const navigate = useNavigate();
  const [userName, setUserName] = useState(''); // 로컬 상태로 사용자 이름 관리

  // localStorage에서 authName 로드
  useEffect(() => {
    const savedName = localStorage.getItem('name');
      if (savedName) {
        setUserName(savedName);
      } else {
        setUserName('사용자 이름');
      }

  }, []);

  return (
    <>
      <div className={styles.backbutton}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <My />
      <div className={styles.container}>
        <div className={styles.profileSection}>
          <img src={Profileicon} alt="프로필 사진" className={styles.profileImage} />
          <div className={styles.userInfo}>
            <div className={styles.username}>{userName}</div>
            <div className={styles.email}>example@gmail.com</div>
          </div>
        </div>
        <div className={styles.menuList}>
          <div className={`${styles.menuItem} ${styles.myapply}`}>
            <span>내 신청 내역</span>
            <span className={styles.arrow}>&gt;</span>
          </div>
          <div className={`${styles.menuItem} ${styles.myinfo}`} onClick={() => navigate('/changemyinfo')}>
            <span>내 정보</span>
            <span className={styles.arrow}>&gt;</span>
          </div>
          <div className={`${styles.menuItem} ${styles.settings}`} onClick={() => navigate('/setting')}>
            <span>설정</span>
            <span className={styles.arrow}>&gt;</span>
          </div>
          <div className={`${styles.menuItem} ${styles.faq}`}>
            <span>자주 묻는 질문(FAQ)</span>
            <span className={styles.arrow}>&gt;</span>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default MyPageForm;