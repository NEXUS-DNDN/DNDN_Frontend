import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaHeart, FaCommentDots, FaUser } from 'react-icons/fa';
import './BottomNav.css';

const BottomNav = ({ activePath }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (activePath) return activePath === path;
    return location.pathname === path;
  };

  return (
    <div className="bottom-nav">
      <button onClick={() => navigate('/mainpage')} className={isActive('/mainpage') ? 'active' : ''}>
        <FaHome />
      </button>
      <button onClick={() => navigate('/favorite')} className={isActive('/favorite') ? 'active' : ''}>
        <FaHeart />
      </button>
      <button onClick={() => navigate('/chat')} className={isActive('/chat') ? 'active' : ''}>
        <FaCommentDots />
      </button>
      <button onClick={() => navigate('/my')} className={isActive('/my') ? 'active' : ''}>
        <FaUser />
      </button>
    </div>
  );
};

export default BottomNav;
