import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import '../styles/FontSizePage.css';
import Backicon from '../assets/back.svg'; // ✅ back.svg import

const FontSizePage = () => {
  const navigate = useNavigate();
  const { fontSize, setFontSize } = useSettings();

  useEffect(() => {
    const slider = document.querySelector('.font-slider');
    if (slider) {
      const percentage = ((fontSize - 10) / (22 - 10)) * 100;
      slider.style.background = `linear-gradient(to right, #6a40da 0%, #6a40da ${percentage}%, #d1d5db ${percentage}%, #d1d5db 100%)`;
    }
  }, [fontSize]);

  const handleFontSizeChange = (e) => {
    setFontSize(parseInt(e.target.value, 10));
  };

  return (
    <div className="font-size-page">
      <header className="font-header">
        <button onClick={() => navigate(-1)} className="font-back-button">
          <img src={Backicon} alt="뒤로가기" className="back-icon" /> {/* ✅ 이미지로 변경 */}
        </button>
        <h2>텍스트 크기</h2>
      </header>

      <div className="font-content">
        <p className="font-instruction">읽기 편한 글자 크기를 선택해주세요</p>
        <p className="font-sub-instruction">'설정 - 글씨 크기 변경'에서 변경할 수 있어요</p>

        <div className="font-preview-card" style={{ fontSize: `${fontSize}px` }}>
          <p>당신의 복지서비스를 든든하게 챙겨드려요</p>
        </div>
        <div className="slider-container">
          <p>작게</p>
          <div className="slider-track-with-dots">
            <input
              type="range"
              min="10"
              max="22"
              step="2"
              value={fontSize}
              onChange={handleFontSizeChange}
              className="font-slider"
            />
            <div className="dot-group">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
          <p>크게</p>
        </div>
      </div>
    </div>
  );
};

export default FontSizePage;