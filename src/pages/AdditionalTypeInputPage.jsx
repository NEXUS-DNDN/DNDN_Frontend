import React from 'react';
import AdditionalTypeInputForm from '../components/AdditionalTypeInputForm/AdditionalTypeInputForm';
import styles from '../styles/global.module.css';

const AdditionalTypeInputPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <AdditionalTypeInputForm />
    </div>
  );
};

export default AdditionalTypeInputPage;