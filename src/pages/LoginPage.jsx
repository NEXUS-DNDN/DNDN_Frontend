import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import styles from '../styles/global.module.css';

const LoginPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;