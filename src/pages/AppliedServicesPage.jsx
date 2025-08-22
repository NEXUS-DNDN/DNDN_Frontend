import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import BenefitModal from '../components/BenefitModalForm/BenefitModal';
import DeleteConfirmModal from '../components/DeleteConfirmModalForm/DeleteConfirmModal';
import AppliedServiceCard from '../components/AppliedServiceCardForm/AppliedServiceCard';
import ReceivedServiceCard from '../components/ReceivedServiceCardForm/ReceivedServiceCard';
import '../styles/AppliedServicesPage.css';

const AppliedServicesPage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('applied');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showBenefitModal, setShowBenefitModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServicesByTab = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setLoading(false);
        setError("로그인이 필요합니다.");
        return;
      }

      setLoading(true);
      setError(null);

      let url = 'https://nexusdndn.duckdns.org/application/list';
      if (activeTab === 'received') {
        url += '?tab=received';
      }
      
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        if (!response.ok) {
          throw new Error('신청 내역을 불러오는 데 실패했습니다.');
        }

        const data = await response.json();
        const results = data.result.applicationList;

        setServices(results);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesByTab();
  }, [activeTab]);

  const openBenefitModal = (service) => {
    setSelectedService(service);
    setShowBenefitModal(true);
  };

  const closeBenefitModal = () => {
    setShowBenefitModal(false);
    setSelectedService(null);
  };
  
  const openDeleteModal = (service) => {
    setSelectedService(service);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedService(null);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedService) return;

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return alert("로그인이 필요합니다.");

    try {
      const response = await fetch(`https://nexusdndn.duckdns.org/application/${selectedService.applicationId}`, {
        method: 'DELETE',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      if (!response.ok) {
        throw new Error('신청 내역 삭제 실패');
      }
      
      setServices(services.filter(s => s.applicationId !== selectedService.applicationId));
      closeDeleteModal();
      
    } catch (error) {
      console.error('삭제 처리 실패:', error);
      alert('신청 내역 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleConfirm = async () => {
    if (!selectedService) return;

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return alert("로그인이 필요합니다.");

    try {
      const response = await fetch(`https://nexusdndn.duckdns.org/application/applications/${selectedService.applicationId}/receive`, {
        method: 'PATCH',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      if (!response.ok) {
        throw new Error('혜택 수령 완료 처리 중 오류가 발생했습니다.');
      }
      
      closeBenefitModal();
      setActiveTab('received');

    } catch (error) {
      console.error('혜택 수령 처리 실패:', error);
      alert('혜택 수령 처리 중 오류가 발생했습니다.');
    }
  };
  
  const handleCardClick = (service) => {
    navigate(`/service-detail/${service.welfareId}`);
  };

  const handleStatusClick = async (service) => {
    try {
      const response = await fetch(`https://nexusdndn.duckdns.org/welfare/${service.welfareId}`);
      if (!response.ok) {
        throw new Error('서비스 정보를 불러오는 데 실패했습니다.');
      }
      const data = await response.json();
      
      if (data.result.servLink) {
        window.open(data.result.servLink, '_blank');
      } else {
        alert('해당 서비스의 신청 링크가 없습니다.');
      }
    } catch (error) {
      console.error('Fetching service details failed:', error);
      alert('서비스 정보를 불러오는 중 오류가 발생했습니다.');
    }
  };
  
  // ✅ 로딩 중일 때 스피너를 보여주는 JSX 추가
  if (loading) {
    return (
      <div className="applied-services-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>내역을 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }
 
  if (error) return <div className="applied-services-page"><p>오류가 발생했습니다: {error}</p></div>;

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
        {services.length === 0 ? (
          <p className="no-data-text">{activeTab === 'applied' ? '신청 완료된 서비스가 없습니다.' : '수령 완료된 서비스가 없습니다.'}</p>
        ) : (
          services.map((service) => (
            activeTab === 'applied' ? (
              <AppliedServiceCard
                key={service.applicationId}
                service={service}
                onClickCard={handleCardClick}
                onClickBenefit={openBenefitModal}
                onClickStatus={() => handleStatusClick(service)}
              />
            ) : (
              <ReceivedServiceCard
                key={service.applicationId}
                service={service}
                onClickCard={handleCardClick}
                onClickStatus={() => handleStatusClick(service)}
                onClickPlus={openDeleteModal}
              />
            )
          ))
        )}
      </div>

      {showBenefitModal && <BenefitModal onConfirm={handleConfirm} onClose={closeBenefitModal} />}
      {showDeleteModal && <DeleteConfirmModal onConfirm={handleDeleteConfirm} onCancel={closeDeleteModal} />}
    </div>
  );
};

export default AppliedServicesPage;