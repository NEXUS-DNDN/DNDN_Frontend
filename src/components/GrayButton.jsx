// src/components/GrayButton.jsx

import React from 'react';
// Correct way to import a regular CSS file
import './GrayButton.css';
import GrayButtonImage from '../assets/graybutton.PNG';
import PurpleButtonImage from '../assets/purplebutton.PNG';

const GrayButton = ({ children, isActive, onClick }) => {
  // Use a conditional string to add the 'active' class
  const buttonClassName = isActive ? 'grayButton active' : 'grayButton';

  return (
    <div className="buttonContainer">
      <button className={buttonClassName} onClick={onClick}>
        <img
          src={isActive ? PurpleButtonImage : GrayButtonImage}
          alt={isActive ? '활성화된 버튼' : '비활성화된 버튼'}
          className="buttonImage"
        />
        <span className="buttonText">{children}</span>
      </button>
    </div>
  );
};

export default GrayButton;