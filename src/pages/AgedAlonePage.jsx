import React from 'react';
import AgedAloneForm from '../components/AgedAloneForm/AgedAloneForm';
import styles from '../styles/global.module.css';

const AgedAlonePage = () => {
  return (
    <div className={styles.pageWrapper}>
      <AgedAloneForm />
    </div>
  );
};

export default AgedAlonePage;