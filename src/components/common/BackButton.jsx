import React from 'react';
import styles from './BackButton.module.css';
import BackIcon from '../../assets/back.svg';

const BackButton = ({ onClick }) => {
  return (
    <div className={styles.backbutton} onClick={onClick}>
      <img src={BackIcon} alt="뒤로가기" />
    </div>
  );
};

export default BackButton;