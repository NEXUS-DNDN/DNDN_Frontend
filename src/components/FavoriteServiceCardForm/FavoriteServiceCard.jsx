import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FavoriteServiceCard.css';

const FavoriteServiceCard = ({ service }) => {
  const navigate = useNavigate();

  // ✅ 카드를 클릭하면 ServiceDetailPage로 이동하는 함수
  const handleCardClick = () => {
    // welfareId를 사용하여 라우팅
    navigate(`/service-detail/${service.welfareId}`); 
  };

  const imageUrl = service.imageUrl || 'https://via.placeholder.com/200x150.png?text=Service+Image';

  return (
    <div className="favorite-card" onClick={handleCardClick}>
      <div className="card-image-wrapper">
        <img className="card-image" src={imageUrl} alt={service.title} />
      </div>
      <div className="card-info">
        <div className="card-header">
          {/* api에 ctpvNm이 없으므로 임시로 빈 값으로 둡니다. */}
          <span className="card-type">{service.ctpvNm || '주거'}</span>
        </div>
        <h3 className="card-title">{service.title}</h3>
        {/* API 응답에 summary가 있으므로 description 대신 summary를 사용합니다. */}
        <p className="card-summary">{service.content || '설명 없음'}</p>
        <div className="card-meta">
          <span className="card-department">{service.department || '담당부처 정보 없음'}</span>
        </div>
      </div>
    </div>
  );
};

export default FavoriteServiceCard;