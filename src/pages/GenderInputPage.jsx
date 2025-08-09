import React from 'react';
import GenderInputForm from '../components/GenderInputForm/GenderInputForm';
import styles from '../styles/global.module.css';

const GenderInputPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <GenderInputForm />
    </div>
  );
};

export default GenderInputPage;