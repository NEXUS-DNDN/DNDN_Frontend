import React from 'react';
import SettingForm from '../components/SettingForm/SettingForm';
import styles from '../styles/global.module.css';

const SettingPage = () => {
  return (
    <div className={`${styles.pageWrapper} ${styles.noAlignCenter}`}>
      <SettingForm />
    </div>
  );
};

export default SettingPage;