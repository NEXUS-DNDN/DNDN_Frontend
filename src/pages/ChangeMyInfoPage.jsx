import React from 'react';
import ChangeMyInfoForm from '../components/ChangeMyInfoForm/ChangeMyInfoForm';
import styles from '../styles/global.module.css';

const ChangeMyInfoPage = () => {
  return (
    <div className={`${styles.pageWrapper} ${styles.noAlignCenter}`}>
      <ChangeMyInfoForm />
    </div>
  );
};

export default ChangeMyInfoPage;