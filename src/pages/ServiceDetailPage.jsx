import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { services } from '../utils/mockData';
import { FaArrowLeft, FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import BottomNav from '../components/BottomNavForm/BottomNav';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/ServiceDetailPage.css';

const ServiceDetailPage = ({ favorites = [], setFavorites = () => {} }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === Number(id));

  if (!service) return <div>서비스를 찾을 수 없습니다.</div>;

  const [showDateSheet, setShowDateSheet] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [date, setDate] = useState(new Date());

  // ✅ 하단 버튼 애니메이션 상태
  const [showActionButtons, setShowActionButtons] = useState(false);

  // ✅ 컴포넌트가 마운트되면 애니메이션을 시작
  useEffect(() => {
    // 렌더링 후 50ms 뒤에 애니메이션 클래스를 추가하여 자연스럽게 나타나도록 함
    const timer = setTimeout(() => {
      setShowActionButtons(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const isFavorite = favorites.includes(service.id);

  const toggleFavorite = () => {
    const updated = isFavorite
      ? favorites.filter((fid) => fid !== service.id)
      : [...favorites, service.id];
    setFavorites(updated);
    localStorage.setItem('favoriteServices', JSON.stringify(updated));
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/service/${service.id}`;
    const shareData = { title: service.title, text: '이 서비스 정보 확인해보세요!', url: shareUrl };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      try { await navigator.clipboard.writeText(shareUrl); alert('링크가 복사되었습니다!'); }
      catch { alert('브라우저가 공유를 지원하지 않아요.'); }
    }
  };

  const formatKoreanDate = (d) => {
    const yoil = ['일','월','화','수','목','금','토'][d.getDay()];
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${yoil})`;
  };

  const completeWithDate = () => {
    const appliedServices = JSON.parse(localStorage.getItem('appliedServices')) || [];
    const isAlreadyStored = appliedServices.some((s) => s.id === service.id);
    if (!isAlreadyStored) {
      localStorage.setItem(
        'appliedServices',
        JSON.stringify([...appliedServices, { id: service.id, title: service.title, date: date.toISOString().split('T')[0] }])
      );
    }
    
    setShowDateSheet(false);
    setShowCompleteModal(true);
  };

  const handleCompleteClose = () => {
    setShowCompleteModal(false);
  };

  return (
    <div className="service-detail-page">
      {/* 상단바 */}
      <div className="top-bar">
        <button className="icon-button" onClick={() => navigate(-1)}>
          <FaArrowLeft size={20} />
        </button>

        <div className="right-icons">
          <button className="icon-button" onClick={toggleFavorite} aria-label="즐겨찾기">
            {isFavorite ? <FaHeart color="red" size={20} /> : <FaRegHeart size={20} />}
          </button>
          <button className="icon-button" onClick={handleShare} aria-label="공유">
            <FaShareAlt size={20} />
          </button>
        </div>
      </div>

      {/* 헤더 */}
      <div className="service-header">
        <div className="thumbnail-placeholder" />
        <div className="service-title">{service.title}</div>
        <div className="service-description">{service.description}</div>
      </div>

      {/* 본문 */}
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

      {/* ✅ 하단 고정 액션에 동적 클래스 추가 */}
      <div className={`bottom-actions ${showActionButtons ? 'slide-up' : ''}`}>
        <div className="action-desc">서비스를 신청하고 싶다면 ?</div>
        <button
          className="record-button"
          onClick={() => navigate(`/apply-complete/${service.id}`)}
        >
          신청하러 가기
        </button>

        <div className="action-desc">서비스를 이미 신청했다면 ?</div>
        <button
          className="apply-button"
          onClick={() => setShowDateSheet(true)}
        >
          신청 정보 기록하기
        </button>
      </div>

      {/* 날짜 선택: 슬라이드업 모달 */}
      {showDateSheet && (
        <div className="record-overlay" onClick={() => setShowDateSheet(false)}>
          <div
            className="record-modal slide-up-modal date-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="record-title">신청 날짜 선택하기</h3>

            <div className="calendar-wrapper">
              <DatePicker
                selected={date}
                onChange={(d) => d && setDate(d)}
                inline
                locale={ko}
              />
            </div>

            <div className="k-date-value">{formatKoreanDate(date)}</div>

            <div className="record-actions">
              <button className="btn-cancel" onClick={() => setShowDateSheet(false)}>취소</button>
              <button className="btn-primary" onClick={completeWithDate}>등록 완료</button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ 신청 정보 저장 완료 모달에 동적 클래스 추가 */}
      {showCompleteModal && (
        <div className="record-overlay" onClick={handleCompleteClose}>
          <div className={`complete-modal ${showCompleteModal ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
            <h3 className="complete-title">신청 정보 저장 완료</h3>
            <p className="complete-date">{formatKoreanDate(date)}</p>
            <p className="complete-service">{service?.title}</p>
            <button className="complete-btn" onClick={() => {
              handleCompleteClose();
              navigate('/mainpage');
            }}>완료</button>
          </div>
        </div>
      )}

      <BottomNav activePath="/" />
    </div>
  );
};

export default ServiceDetailPage;