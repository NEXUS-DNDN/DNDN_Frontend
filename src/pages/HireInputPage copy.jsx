import React from 'react';
import HireInputForm from '../components/HireInputForm/HireInputForm';
import styles from '../styles/global.module.css';

const HireInputPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <HireInputForm />
    </div>
  );
};

export default HireInputPage;