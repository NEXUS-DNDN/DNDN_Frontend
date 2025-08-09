import React from 'react';
import styles from './AuthForm.module.css';
import Navericon from '../../assets/naver.svg';
import Kakaoicon from '../../assets/kakaotalk.svg';
import Googleicon from '../../assets/google.svg';
import Backicon from '../../assets/back.svg';
import Input from '../common/Input';

const AuthForm = () => {
  return (
    <>
      <div className={styles.backbutton}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <div className={styles.container}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>이름</label>
          <Input type="text" placeholder="홍길동" />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>전화번호</label>
          <Input type="text" placeholder="010 - **** - 1234" />
        </div>

        <button className={styles.authBtn}>인증하기</button>

        <div className={styles.divider}>
          <div className={styles.line1}></div>
          <span className={styles.text}>또는</span>
          <div className={styles.line2}></div>
        </div>

        <div className={styles.socialButtons}>
          <button className={styles.naver}>
            <img src={Navericon} alt="Naver 로그인" />
          </button>
          <button className={styles.kakao}>
            <img src={Kakaoicon} alt="Kakao 로그인" />
          </button>
          <button className={styles.google}>
            <img src={Googleicon} alt="Google 로그인" />
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
