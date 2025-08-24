import React, { useState } from 'react';
import styles from './SettingForm.module.css';
import { useNavigate } from 'react-router-dom';
import Backicon from '../../assets/back.svg';
import My from '../common/My';
import BottomNav from '../BottomNavForm/BottomNav';

const SettingForm = () => {
  const navigate = useNavigate();

  const [notification, setNotification] = useState(true);
  const [boldText, setBoldText] = useState(false);

  return (
    <>
      <div className={styles.backbutton} onClick={() => navigate('/my')}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <My />
      <div className={styles.container}>
        <div className={styles.section}>
          <label className={styles.label}>알림</label>
          <div className={styles.switchContainer}>
            <span>알림 허용</span>
            <label className={styles.switch}>
              <input 
                type="checkbox" 
                checked={notification} 
                onChange={() => setNotification(!notification)} 
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        {/* 글자 */}
        <div className={styles.section}>
          <label className={styles.label}>글자</label>
          <div className={styles.cardContainer}>
            {/* 텍스트 크기 */}
            <span>텍스트 크기</span>

            {/* 구분선 */}
            <div className={styles.divider}></div>

            {/* 볼드체 토글 */}
            <div className={styles.boldSwitchContainer}>
              <span>볼드체 텍스트</span>
              <label className={styles.switch}>
                <input 
                  type="checkbox" 
                  checked={boldText} 
                  onChange={() => setBoldText(!boldText)} 
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingForm;
