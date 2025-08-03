import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaHeart, FaCommentDots, FaUser } from 'react-icons/fa';
import '../styles/BottomNav.css';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bottom-nav">
      <button onClick={() => navigate('/')} className={isActive('/') ? 'active' : ''}>
        <FaHome />
      </button>
      <button onClick={() => navigate('/favorite')} className={isActive('/favorite') ? 'active' : ''}>
        <FaHeart />
      </button>
      <button onClick={() => navigate('/chat')} className={isActive('/chat') ? 'active' : ''}>
        <FaCommentDots />
      </button>
      <button onClick={() => navigate('/profile')} className={isActive('/profile') ? 'active' : ''}>
        <FaUser />
      </button>
    </div>
  );
};

export default BottomNav;
