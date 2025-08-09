import React from 'react';
import DisabilityForm from '../components/DisabilityForm/DisabilityForm';
import styles from '../styles/global.module.css';

const DisabilityPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <DisabilityForm />
    </div>
  );
};

export default DisabilityPage;