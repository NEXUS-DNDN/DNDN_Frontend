import React from 'react';
import AgedAdditionalForm from '../components/AgedAdditionalForm/AgedAdditionalForm';
import styles from '../styles/global.module.css';

const AgedAdditionalPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <AgedAdditionalForm />
    </div>
  );
};

export default AgedAdditionalPage;