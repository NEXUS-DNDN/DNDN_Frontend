import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BottomNav.css';

// Default icons
import HomeIcon from '../../assets/Home.png';
import FavoriteIcon from '../../assets/Favorite.png';
import FileIcon from '../../assets/File.png';
import MyIcon from '../../assets/My.png';

// Active icons
import ActiveHomeIcon from '../../assets/ActiveHome.png';
import ActiveFavoriteIcon from '../../assets/ActiveFavorite.png';
import ActiveFileIcon from '../../assets/ActiveFile.png';
import ActiveMyIcon from '../../assets/ActiveMy.png';

const BottomNav = ({ activePath }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Map to easily access default and active icons
  const iconMap = {
    '/mainpage': { default: HomeIcon, active: ActiveHomeIcon },
    '/favorite': { default: FavoriteIcon, active: ActiveFavoriteIcon },
    '/file': { default: FileIcon, active: ActiveFileIcon },
    '/my': { default: MyIcon, active: ActiveMyIcon },
  };

  const isActive = (path) => (activePath ? activePath === path : location.pathname === path);

  return (
    <nav className="bottom-nav">
      <button onClick={() => navigate('/mainpage')} className={isActive('/mainpage') ? 'active' : ''}>
        <img src={isActive('/mainpage') ? iconMap['/mainpage'].active : iconMap['/mainpage'].default} alt="홈" />
        <span>홈</span>
      </button>
      <button onClick={() => navigate('/favorite')} className={isActive('/favorite') ? 'active' : ''}>
        <img src={isActive('/favorite') ? iconMap['/favorite'].active : iconMap['/favorite'].default} alt="신청내역" />
        <span>좋아요</span>
      </button>
      <button onClick={() => navigate('/file')} className={isActive('/file') ? 'active' : ''}>
        <img src={isActive('/file') ? iconMap['/file'].active : iconMap['/file'].default} alt="서류함" />
        <span>서류함</span>
      </button>
      <button onClick={() => navigate('/my')} className={isActive('/my') ? 'active' : ''}>
        <img src={isActive('/my') ? iconMap['/my'].active : iconMap['/my'].default} alt="MY" />
        <span>MY</span>
      </button>
    </nav>
  );
};

export default BottomNav;