<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 추가
import styles from './MyPageForm.module.css';
import BottomNav from '../BottomNavForm/BottomNav';
=======
import React, { useState, useEffect } from 'react';
import styles from './MyPageForm.module.css';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../common/BottomNav';
>>>>>>> origin/loginpage_etc
import My from '../common/My';
import Backicon from '../../assets/back.svg';
import Profileicon from '../../assets/baseprofile.svg';

const MyPageForm = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
<<<<<<< HEAD
  const navigate = useNavigate(); // ✅ 추가
=======
  const navigate = useNavigate();
  const [userName, setUserName] = useState(''); // 로컬 상태로 사용자 이름 관리

  // localStorage에서 authName 로드
  useEffect(() => {
    const savedAuthName = localStorage.getItem('authName');
    if (savedAuthName) {
      setUserName(savedAuthName);
    } else {
      setUserName('사용자 이름'); // 기본값 설정
    }
  }, []);
>>>>>>> origin/loginpage_etc

  return (
    <>
      <div className={styles.backbutton}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
<<<<<<< HEAD

      <My />

=======
      <My />
>>>>>>> origin/loginpage_etc
      <div className={styles.container}>
        <div className={styles.profileSection}>
          <img src={Profileicon} alt="프로필 사진" className={styles.profileImage} />
          <div className={styles.userInfo}>
<<<<<<< HEAD
            <div className={styles.username}>사용자 이름</div>
            <div className={styles.email}>example@gmail.com</div>
          </div>
        </div>

        <div className={styles.menuList}>
          {/* ✅ 내 신청 내역 → /applied 이동 */}
          <div
            className={`${styles.menuItem} ${styles.myapply}`}
            role="button"
            tabIndex={0}
            onClick={() => navigate('/applied')}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate('/applied')}
          >
            <span>내 신청 내역</span>
            <span className={styles.arrow}>&gt;</span>
          </div>

          <div className={`${styles.menuItem} ${styles.myinfo}`}>
            <span>내 정보</span>
            <span className={styles.arrow}>&gt;</span>
          </div>

          <div className={`${styles.menuItem} ${styles.settings}`}>
            <span>설정</span>
            <span className={styles.arrow}>&gt;</span>
          </div>

=======
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
>>>>>>> origin/loginpage_etc
          <div className={`${styles.menuItem} ${styles.faq}`}>
            <span>자주 묻는 질문(FAQ)</span>
            <span className={styles.arrow}>&gt;</span>
          </div>
        </div>
      </div>
<<<<<<< HEAD

=======
>>>>>>> origin/loginpage_etc
      <BottomNav />
    </>
  );
};

export default MyPageForm;
