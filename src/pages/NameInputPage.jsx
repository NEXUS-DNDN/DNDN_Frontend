import React from 'react';
import NameInputForm from '../components/NameInputForm/NameInputForm';
import styles from '../styles/global.module.css';

const NameInputPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <NameInputForm />
    </div>
  );
};

export default NameInputPage;