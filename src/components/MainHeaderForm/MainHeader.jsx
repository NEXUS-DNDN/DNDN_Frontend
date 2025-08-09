import React from 'react';
import { FaBars, FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './MainHeader.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="icon-left">
        <button
          className="icon-btn"
          aria-label="카테고리 열기"
          onClick={() => navigate('/category')} 
        >
          <FaBars />
        </button>
      </div>
      <div className="icon-right">
        <button
          className="icon-btn"
          aria-label="알림"
          onClick={() => navigate('/alarms')}
        >
          <FaBell />
        </button>
      </div>
    </div>
  );
};

export default Header;
