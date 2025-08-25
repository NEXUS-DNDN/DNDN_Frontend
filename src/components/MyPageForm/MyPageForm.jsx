import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MyPageForm.module.css';
import BottomNav from '../BottomNavForm/BottomNav';
import Profileicon from '../../assets/baseprofile.svg';
import myApplyIcon from '../../assets/MyPage(1).png';
import myInfoIcon from '../../assets/MyPage(2).png';
import faqIcon from '../../assets/MyPage(3).png';
import settingsIcon from '../../assets/MyPage(4).png';
import nextButtonIcon from '../../assets/nextButton.png';
import Backicon from '../../assets/back.svg'; // ✅ back.svg 이미지 import

const MyPageForm = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const savedAuthName = localStorage.getItem('authName');
    if (savedAuthName) {
      setUserName(savedAuthName);
    } else {
      setUserName('사용자 이름');
    }
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <img src={Backicon} alt="뒤로가기" /> {/* ✅ FaArrowLeft를 이미지로 대체 */}
        </button>
        <h2>마이페이지</h2>
        <div className={styles.emptySpace}></div>
      </header>

      <div className={styles.profileSection}>
        <div className={styles.profileImageWrapper}>
          <img src={Profileicon} alt="프로필 사진" className={styles.profileImage} />
        </div>
        <div className={styles.userInfo}>
          <div className={styles.username}>{userName}</div>
          <div className={styles.email}>example@gmail.com</div>
        </div>
      </div>

      <div className={styles.menuList}>
        <div
          className={`${styles.menuItem} ${styles.myapply}`}
          role="button"
          tabIndex={0}
          onClick={() => navigate('/applied')}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate('/applied')}
        >
          <div className={styles.imageIconWrapper}>
            <img src={myApplyIcon} alt="내 신청 내역 아이콘" className={styles.menuImageIcon} />
          </div>
          <span className={styles.menuText}>내 신청 내역</span>
          <img src={nextButtonIcon} alt="다음 버튼" className={styles.arrow} />
        </div>

        <div className={`${styles.menuItem} ${styles.myinfo}`} onClick={() => navigate('/changemyinfo')}>
          <div className={styles.imageIconWrapper}>
            <img src={myInfoIcon} alt="내 정보 아이콘" className={styles.menuImageIcon} />
          </div>
          <span className={styles.menuText}>내 정보</span>
          <img src={nextButtonIcon} alt="다음 버튼" className={styles.arrow} />
        </div>

        <div className={`${styles.menuItem} ${styles.faq}`} onClick={() => navigate('/faq')}>
          <div className={styles.imageIconWrapper}>
            <img src={faqIcon} alt="자주 묻는 질문 아이콘" className={styles.menuImageIcon} />
          </div>
          <span className={styles.menuText}>자주 묻는 질문(FAQ)</span>
          <img src={nextButtonIcon} alt="다음 버튼" className={styles.arrow} />
        </div>

        <div className={`${styles.menuItem} ${styles.settings}`} onClick={() => navigate('/settings')}>
          <div className={styles.imageIconWrapper}>
            <img src={settingsIcon} alt="설정 아이콘" className={styles.menuImageIcon} />
          </div>
          <span className={styles.menuText}>설정</span>
          <img src={nextButtonIcon} alt="다음 버튼" className={styles.arrow} />
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default MyPageForm;