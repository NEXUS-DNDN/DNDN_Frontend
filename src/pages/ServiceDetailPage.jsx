import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { services } from '../utils/mockData';
import { FaArrowLeft, FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa';
import '../styles/ServiceDetailPage.css';

const ServiceDetailPage = ({ favorites, toggleFavorite }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === Number(id));

  if (!service) return <div>서비스를 찾을 수 없습니다.</div>;

  const isFavorite = favorites.includes(service.id);

  return (
    <div className="service-detail-page">
      <div className="top-bar">
        <button className="icon-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <div className="right-icons">
          <button className="icon-button" onClick={() => toggleFavorite(service.id)}>
            {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
          </button>
          <button className="icon-button" onClick={() => alert('공유 기능은 준비 중입니다.')}>  
            <FaShareAlt />
          </button>
        </div>
      </div>

      <div className="service-header">
        <div className="thumbnail-placeholder" />
        <div className="service-title">{service.title}</div>
        <div className="service-description">{service.description}</div>
      </div>

      <div className="scrollable-content">
        <div className="service-info">
          <div>
            <h3>📌 대상자</h3>
            <p>{service.target}</p>
          </div>
          <div>
            <h3>📋 내용</h3>
            <p>{service.content}</p>
          </div>
          <div>
            <h3>📝 제출 서류</h3>
            <ul>
              {service.documents.map((doc, i) => (
                <li key={i}>{doc}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bottom-actions">
        <div className="action-desc">서비스를 신청하고 싶다면 ?</div>
        <button className="apply-button" onClick={() => navigate(`/apply-date/${service.id}`)}>신청하러 가기</button>
        <div className="action-desc">서비스를 이미 신청했다면 ?</div>
        <button className="record-button" onClick={() => navigate(`/apply-complete/${service.id}`)}>신청 정보 기록하기</button>
      </div>
    </div>
  );
};

export default ServiceDetailPage;