// AppliedServicesPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import BenefitModal from '../components/BenefitModal';
import '../styles/AppliedServicesPage.css';

const AppliedServicesPage = () => {
  const navigate = useNavigate();
  const storedServices = JSON.parse(localStorage.getItem('appliedServices')) || [];
  const receivedServices = JSON.parse(localStorage.getItem('receivedServices')) || [];

  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // 혜택 수령 버튼 눌렀을 때
  const openModal = (service) => {
    const isAlreadyReceived = receivedServices.some((s) => s.id === service.id);

    if (!isAlreadyReceived) {
      setSelectedService(service);
      setShowModal(true);
    } else {
      alert('이미 혜택을 수령한 서비스입니다.');
    }
  };

  // 모달에서 완료 눌렀을 때
  const handleConfirm = () => {
    const updated = [...receivedServices, selectedService];
    localStorage.setItem('receivedServices', JSON.stringify(updated));
    setShowModal(false);
    navigate('/received'); // 수령 완료 페이지로 이동
  };

  return (
    <div className="applied-services-page">
      <div className="top-bar">
        <button className="icon-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h2>신청 완료한 서비스</h2>
        <button className="icon-button">
          <FaUser />
        </button>
      </div>

      <div className="filter-buttons">
        <button className="filter-btn">전체</button>
        <button className="filter-btn">최대 5년</button>
      </div>

      <div className="services-list">
        {storedServices.length === 0 ? (
          <p className="no-data-text">신청 완료된 서비스가 없습니다.</p>
        ) : (
          storedServices.map((service, i) => (
            <div
              className="service-box"
              key={i}
              onClick={() => navigate(`/service/${service.id}`)} // 카드 클릭시 상세 페이지 이동
              style={{ cursor: 'pointer' }}
            >
              <div className="service-title">{service.title}</div>
              <div className="service-date">신청 일자: {service.date}</div>

              <button
                className="benefit-btn"
                onClick={(e) => {
                  e.stopPropagation(); // 카드 클릭 막기
                  openModal(service);
                }}
              >
                혜택 수령 여부
              </button>

              <button
                className="status-btn"
                onClick={(e) => {
                  e.stopPropagation(); // 카드 클릭 막기
                  alert('신청 현황 보기 기능은 준비 중입니다.');
                }}
              >
                신청 현황 보기
              </button>
            </div>
          ))
        )}
      </div>

      {showModal && <BenefitModal onConfirm={handleConfirm} />}
    </div>
  );
};

export default AppliedServicesPage;
