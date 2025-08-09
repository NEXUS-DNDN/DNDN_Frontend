import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaHeart, FaCommentDots, FaUser } from 'react-icons/fa';
import styles from './BottomNav.module.css';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <div className={styles['bottom-nav']}>
      <button onClick={() => navigate('/')} className={isActive('/') ? styles.active : ''}>
        <FaHome />
      </button>
      <button onClick={() => navigate('/favorite')} className={isActive('/favorite') ? styles.active : ''}>
        <FaHeart />
      </button>
      <button onClick={() => navigate('/chat')} className={isActive('/chat') ? styles.active : ''}>
        <FaCommentDots />
      </button>
      <button onClick={() => navigate('/profile')} className={isActive('/profile') ? styles.active : ''}>
        <FaUser />
      </button>
    </div>
  );
};

export default BottomNav;