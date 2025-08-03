import React from 'react';
import { FaBars, FaBell } from 'react-icons/fa';
import '../styles/MainHeader.css';

const Header = ({ onMenuClick }) => {
  return (
    <div className="header">
      <FaBars size={20} onClick={onMenuClick} />
      <FaBell size={20} />
    </div>
  );
};

export default Header;