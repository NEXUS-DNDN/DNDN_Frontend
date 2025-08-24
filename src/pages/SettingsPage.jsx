import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/SettingsPage.css';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [isNotificationOn, setIsNotificationOn] = useState(true);
  const [isBoldTextOn, setIsBoldTextOn] = useState(false);

  const handleNotificationToggle = () => {
    setIsNotificationOn(!isNotificationOn);
  };

  const handleBoldTextToggle = () => {
    setIsBoldTextOn(!isBoldTextOn);
  };

  return (
    <div className="settings-page">
      <header className="settings-header">
        <button className="settings-back-button" onClick={() => navigate(-1)}><FaArrowLeft /></button>
        <h2>설정</h2>
      </header>

      {/* ✅ 알림 섹션 */}
      <div className="setting-section">
        <div className="settings-item-header">
            <h3>알림</h3>
        </div>
        <div className="settings-item">
          <div className="settings-item-info">
            <p>알림 허용</p>
          </div>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={isNotificationOn} 
              onChange={handleNotificationToggle} 
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      
      {/* ✅ 글자 섹션 */}
      <div className="setting-section">
        <div className="settings-item-header">
            <h3>글자</h3>
        </div>
        
        {/* 텍스트 크기 항목 */}
        <div className="settings-item" onClick={() => navigate('/settings/font-size')}>
          <div className="settings-item-info">
            <p>텍스트 크기</p>
          </div>
          <IoIosArrowForward className="settings-arrow-icon" />
        </div>

        {/* 볼드체 텍스트 항목 */}
        <div className="settings-item">
          <div className="settings-item-info">
            <p>볼드체 텍스트</p>
          </div>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={isBoldTextOn} 
              onChange={handleBoldTextToggle} 
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;