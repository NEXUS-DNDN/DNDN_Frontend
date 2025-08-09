import React from 'react';
import AddressInputForm from '../components/AddressInputForm/AddressInputForm';
import styles from '../styles/global.module.css';

const AddressInputPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <AddressInputForm />
    </div>
  );
};

export default AddressInputPage;