import React from 'react';
import MyPageForm from '../components/MyPageForm/MyPageForm';
import styles from '../styles/global.module.css';

const MyPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <MyPageForm />
    </div>
  );
};

export default MyPage;