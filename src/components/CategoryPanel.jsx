import React, { useState } from 'react';
import '../styles/CategoryPanel.css';

const categories = {
  '노인': ['생활 지원', '건강 관리', '여가·교육', '일자리·활동', '주거·시설', '교통·이동'],
  '장애인': ['재활 지원', '접근성 개선', '특수 교육', '직업 훈련', '의료 지원', '주거 복지'],
  '청년': ['창업 지원', '주거 대책', '취업 지원', '학자금', '멘토링', '문화활동'],
  '특수 가정': ['한부모 지원', '다자녀 혜택', '긴급 복지', '상담 서비스', '교육비 지원', '주거 지원'],
  '외국인·이주민': ['언어 교육', '법률 상담', '고용 지원', '생활 정보', '통역 서비스', '정착 지원']
};

const CategoryPanel = ({ isOpen, onClose }) => {
  const [selectedMain, setSelectedMain] = useState('노인');
  const subCategories = categories[selectedMain];

  if (!isOpen) return null;

  return (
    <div className="category-panel-wrapper" onClick={onClose}>
      <div className="category-panel-inner">
        <div className="category-panel" onClick={(e) => e.stopPropagation()}>
          <div className="main-tabs">
            {Object.keys(categories).map((cat) => (
              <div
                key={cat}
                className={`main-tab ${selectedMain === cat ? 'active' : ''}`}
                onClick={() => setSelectedMain(cat)}
              >
                {cat}
              </div>
            ))}
          </div>
          <div className="subcategories">
            {subCategories.map((item, idx) => (
              <div key={idx} className="subcategory-item">
                {item}
              </div>
            ))}
          </div>
          <div className="close-button" onClick={onClose}>닫기</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPanel;
