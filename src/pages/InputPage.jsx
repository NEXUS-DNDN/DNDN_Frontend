import React from 'react';
import GenderInputForm from '../components/InputForm/InputForm';
import styles from '../styles/global.module.css';

const InputPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <GenderInputForm />
    </div>
  );
};

export default InputPage;