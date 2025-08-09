import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 추가
import styles from './MyPageForm.module.css';
import BottomNav from '../BottomNavForm/BottomNav';
import My from '../common/My';
import Backicon from '../../assets/back.svg';
import Profileicon from '../../assets/baseprofile.svg';

const MyPageForm = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const navigate = useNavigate(); // ✅ 추가

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
