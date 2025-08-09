import React from 'react';
import FamilyInputForm from '../components/FamilyInputForm/FamilyInputForm';
import styles from '../styles/global.module.css';

const FamilyInputPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <FamilyInputForm />
    </div>
  );
};

export default FamilyInputPage;