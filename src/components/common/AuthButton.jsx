import React from 'react';
import styles from './AuthButton.module.css';

const AuthButton = ({ children, onClick, disabled }) => {
  return (
    <button className={styles.authBtn} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default AuthButton;