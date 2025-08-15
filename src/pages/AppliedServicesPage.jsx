import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import BenefitModal from '../components/BenefitModalForm/BenefitModal';
import AppliedServiceCard from '../components/AppliedServiceCardForm/AppliedServiceCard';
import ReceivedServiceCard from '../components/ReceivedServiceCardForm/ReceivedServiceCard'; // 혜택 수령 완료 카드 컴포넌트 임포트
import '../styles/AppliedServicesPage.css';

const AppliedServicesPage = () => {
  const navigate = useNavigate();

  // ✅ 탭 상태 관리
  const [activeTab, setActiveTab] = useState('applied');

  // ✅ 로컬스토리지 데이터 상태 관리
  const [appliedServices, setAppliedServices] = useState([]);
  const [receivedServices, setReceivedServices] = useState([]);

  // ✅ 데이터 로드
  useEffect(() => {
    const storedApplied = JSON.parse(localStorage.getItem('appliedServices')) || [];
    const storedReceived = JSON.parse(localStorage.getItem('receivedServices')) || [];
    setAppliedServices(storedApplied);
    setReceivedServices(storedReceived);
  }, []);

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
    const updatedReceived = [...receivedServices, selectedService];
    setReceivedServices(updatedReceived);
    localStorage.setItem('receivedServices', JSON.stringify(updatedReceived));

    // 2) 신청 목록에서 제거
    const updatedApplied = appliedServices.filter((s) => s.id !== selectedService.id);
    setAppliedServices(updatedApplied);
    localStorage.setItem('appliedServices', JSON.stringify(updatedApplied));

    // 3) 모달 종료 후 탭 변경
    setShowModal(false);
    setSelectedService(null);
    setActiveTab('received');
  };
  
  // 카드 클릭 시 상세 페이지로 이동
  const handleCardClick = (service) => {
    navigate(`/service/${service.id}`);
  };

  return (
    <div className="applied-services-page">
      <div className="top-bar">
        <button className="icon-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h2>내 신청 내역</h2>
        <button className="icon-button">
          <FaUser />
        </button>
      </div>

      {/* ⭐⭐ 탭 컨테이너 추가 ⭐⭐ */}
      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === 'applied' ? 'active' : ''}`}
          onClick={() => setActiveTab('applied')}
        >
          신청 완료
        </button>
        <button
          className={`tab-button ${activeTab === 'received' ? 'active' : ''}`}
          onClick={() => setActiveTab('received')}
        >
          혜택 수령 완료
        </button>
      </div>

      <div className="filter-buttons">
        <button className="filter-btn">전체</button>
        <button className="filter-btn">최대 5년</button>
      </div>

      <div className="services-list">
        {/* ⭐⭐ activeTab 상태에 따라 다른 컴포넌트 렌더링 ⭐⭐ */}
        {activeTab === 'applied' ? (
          appliedServices.length === 0 ? (
            <p className="no-data-text">신청 완료된 서비스가 없습니다.</p>
          ) : (
            appliedServices.map((service) => (
              <AppliedServiceCard
                key={service.id}
                service={service}
                onClickCard={handleCardClick}
                onClickBenefit={openModal}
                onClickStatus={() => alert('신청 현황 보기 기능은 준비 중입니다.')}
              />
            ))
          )
        ) : (
          receivedServices.length === 0 ? (
            <p className="no-data-text">수령 완료된 서비스가 없습니다.</p>
          ) : (
            receivedServices.map((service) => (
              <ReceivedServiceCard
                key={service.id}
                service={service}
                onClickCard={handleCardClick}
                onClickStatus={() => alert('신청 현황 보기 기능은 준비 중입니다.')}
              />
            ))
          )
        )}
      </div>

      {showModal && <BenefitModal onConfirm={handleConfirm} />}
    </div>
  );
};

export default AppliedServicesPage;