import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaHeart, FaCommentDots, FaUser } from 'react-icons/fa';
import './BottomNav.css';

const BottomNav = ({ activePath }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => (activePath ? activePath === path : location.pathname === path);

  return (
    <nav className="bottom-nav">
      <button onClick={() => navigate('/mainpage')} className={isActive('/mainpage') ? 'active' : ''}>
        <FaHome />
        <span>홈</span>
      </button>
      <button onClick={() => navigate('/favorite')} className={isActive('/favorite') ? 'active' : ''}>
        <FaHeart />
        <span>신청내역</span>
      </button>
      <button onClick={() => navigate('/file')} className={isActive('/file') ? 'active' : ''}>
        <FaCommentDots />
        <span>서류함</span>
      </button>
      <button onClick={() => navigate('/my')} className={isActive('/my') ? 'active' : ''}>
        <FaUser />
        <span>MY</span>
      </button>
    </nav>
  );
};

export default BottomNav;
