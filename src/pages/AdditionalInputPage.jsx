import React from 'react';
import AdditionalInputForm from '../components/AdditionalInputForm/AdditionalInputForm';
import styles from '../styles/global.module.css';

const AdditionalInputPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <AdditionalInputForm />
    </div>
  );
};

export default AdditionalInputPage;