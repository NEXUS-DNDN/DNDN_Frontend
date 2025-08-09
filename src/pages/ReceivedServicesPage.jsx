import React from 'react';
import '../styles/ReceivedServicesPage.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUserCircle } from 'react-icons/fa';

const ReceivedServicesPage = () => {
  const navigate = useNavigate();

  const receivedServices = JSON.parse(localStorage.getItem('receivedServices')) || [];

  return (
    <div className="received-page">
      <div className="top-bar">
        <button className="icon-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <div className="page-title">혜택 수령 완료한 서비스</div>
        <FaUserCircle size={22} />
      </div>

      <div className="received-content">
        {receivedServices.length === 0 ? (
          <p className="no-data-text">수령 완료된 서비스가 없습니다.</p>
        ) : (
          receivedServices.map((service, i) => (
            <div
              className="received-card"
              key={i}
              onClick={() => navigate(`/service/${service.id}`)} // 카드 클릭시 상세페이지로 이동
              style={{ cursor: 'pointer' }}
            >
              <div className="card-header">
                <span className="service-title">{service.title}</span>
                <span className="status">수령 완료</span>
              </div>
              <div className="card-body">
                <p>신청 일자: {service.date}</p>
                <p>혜택 내용</p>
                <p>{service.title} 혜택 수령 완료</p>
              </div>
              <button
                className="status-btn"
                onClick={(e) => {
                  e.stopPropagation(); // 버튼 누를 때 카드 클릭 방지
                }}
              >
                신청 현황 보기
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReceivedServicesPage;
