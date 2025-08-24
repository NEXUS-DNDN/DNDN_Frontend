import React from 'react';
import FindForm from '../components/FindForm/FindForm';
import styles from '../styles/global.module.css';

const FindPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <FindForm />
    </div>
  );
};

export default FindPage;