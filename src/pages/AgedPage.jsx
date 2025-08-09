import React from 'react';
import AgedForm from '../components/AgedForm/AgedForm';
import styles from '../styles/global.module.css';

const AgedPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <AgedForm />
    </div>
  );
};

export default AgedPage;