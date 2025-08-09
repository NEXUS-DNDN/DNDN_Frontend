import React from 'react';
import AuthForm from '../components/AuthForm/AuthForm';
import styles from '../styles/global.module.css';

const JoinPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <AuthForm />
    </div>
  );
};

export default JoinPage;
