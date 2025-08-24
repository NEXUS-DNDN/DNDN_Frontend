import React from 'react';
import SalaryInputForm from '../components/SalaryInputForm/SalaryInputForm';
import styles from '../styles/global.module.css';

const SalaryInputPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <SalaryInputForm />
    </div>
  );
};

export default SalaryInputPage;