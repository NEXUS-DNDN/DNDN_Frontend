import React from 'react';
import VerifyCodeForm from '../components/VerifyCodeForm/VerifyCodeForm';
import styles from '../styles/global.module.css';

const VerifyPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <VerifyCodeForm />
    </div>
  );
};

export default VerifyPage;