import React from 'react';
import DisabilityGradeForm from '../components/DisabilityGradeForm/DisabilityGradeForm';
import styles from '../styles/global.module.css';

const DisabilityGradePage = () => {
  return (
    <div className={styles.pageWrapper}>
      <DisabilityGradeForm />
    </div>
  );
};

export default DisabilityGradePage;