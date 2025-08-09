import React from 'react';
import BirthdayInputForm from '../components/BirthdayInputForm/BirthdayInputForm';
import styles from '../styles/global.module.css';

const BirthdayInputPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <BirthdayInputForm />
    </div>
  );
};

export default BirthdayInputPage;