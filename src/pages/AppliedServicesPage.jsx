// AppliedServicesPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import BenefitModal from '../components/BenefitModalForm/BenefitModal';
import AppliedServiceCard from '../components/AppliedServiceCardForm/AppliedServiceCard';
import '../styles/AppliedServicesPage.css';

const AppliedServicesPage = () => {
  const navigate = useNavigate();

  // ✅ 로컬스토리지 로드
  const initialApplied = JSON.parse(localStorage.getItem('appliedServices')) || [];
  const initialReceived = JSON.parse(localStorage.getItem('receivedServices')) || [];

  // ✅ 카드가 즉시 사라지도록 state로 관리
  const [appliedServices, setAppliedServices] = useState(initialApplied);
  const [receivedServices] = useState(initialReceived);

  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // 혜택 수령 버튼
  const openModal = (service) => {
    const isAlreadyReceived = receivedServices.some((s) => s.id === service.id);
    if (!isAlreadyReceived) {
      setSelectedService(service);
      setShowModal(true);
    } else {
      alert('이미 혜택을 수령한 서비스입니다.');
    }
  };

  // ✅ 모달 완료: 받은 목록으로 이동 + 신청 목록에서 제거
  const handleConfirm = () => {
    if (!selectedService) return;

    // 1) 받은 목록 업데이트
    const updatedReceived = [...(JSON.parse(localStorage.getItem('receivedServices')) || []), selectedService];
    localStorage.setItem('receivedServices', JSON.stringify(updatedReceived));

    // 2) 신청 목록에서 제거
    const updatedApplied = appliedServices.filter((s) => s.id !== selectedService.id);
    setAppliedServices(updatedApplied);
    localStorage.setItem('appliedServices', JSON.stringify(updatedApplied));

    // 3) 모달 종료 후 이동
    setShowModal(false);
    setSelectedService(null);
    navigate('/received');
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
        {appliedServices.length === 0 ? (
          <p className="no-data-text">신청 완료된 서비스가 없습니다.</p>
        ) : (
          appliedServices.map((service, i) => (
            <AppliedServiceCard
              key={i}
              service={service}
              onClickCard={(svc) => navigate(`/service/${svc.id}`)}
              onClickBenefit={(svc) => openModal(svc)}
              onClickStatus={() => alert('신청 현황 보기 기능은 준비 중입니다.')}
            />
          ))
        )}
      </div>

      {showModal && <BenefitModal onConfirm={handleConfirm} />}
    </div>
  );
};

export default AppliedServicesPage;
