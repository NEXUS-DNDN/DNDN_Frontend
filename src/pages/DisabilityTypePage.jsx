import React from 'react';
import DisabilityTypeForm from '../components/DisabilityTypeForm/DisabilityTypeForm';
import styles from '../styles/global.module.css';

const DisabilityTypePage = () => {
  return (
    <div className={styles.pageWrapper}>
      <DisabilityTypeForm />
    </div>
  );
};

export default DisabilityTypePage;