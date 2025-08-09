import React from 'react';
import styles from './My.module.css';
import MyIcon from '../../assets/my.svg';

const My = ({ onClick }) => {
  return (
    <div className={styles.my} onClick={onClick}>
      <img src={MyIcon} alt="마이페이지" />
    </div>
  );
};

export default My;