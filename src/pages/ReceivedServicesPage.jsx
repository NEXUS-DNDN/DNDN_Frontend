import React from 'react';
import '../styles/ReceivedServicesPage.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUserCircle } from 'react-icons/fa';
import ReceivedServiceCard from '../components/ReceivedServiceCardForm/ReceivedServiceCard'; 

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
            <ReceivedServiceCard
              key={i}
              service={service}
              onClickCard={(svc) => navigate(`/service/${svc.id}`)}
              onClickStatus={() => alert('신청 현황 보기 기능은 준비 중입니다.')}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ReceivedServicesPage;
