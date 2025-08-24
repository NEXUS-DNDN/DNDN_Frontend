// src/pages/ServiceDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import BottomNav from '../components/BottomNavForm/BottomNav';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/ServiceDetailPage.css';
import { useAuth } from '../context/AuthContext.jsx'; 
import picture from '../assets/picture.png';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDateSheet, setShowDateSheet] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // ✅ 최근 본 서비스 ID를 localStorage에 저장하는 로직
    if (id) {
      const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      const newRecentlyViewed = [id, ...recentlyViewed.filter(viewedId => viewedId !== id)];
      localStorage.setItem('recentlyViewed', JSON.stringify(newRecentlyViewed.slice(0, 3)));
    }
    
    const fetchServiceData = async () => {
      if (!id || id === 'undefined') {
        setLoading(false);
        setError('유효하지 않은 서비스 ID입니다.');
        return;
      }
      try {
        const url = `https://nexusdndn.duckdns.org/welfare/${id}`;
        const response = await fetch(url, { 
          method: 'GET', 
          headers: { 
            'accept': '*/*',
            'Authorization': accessToken ? `Bearer ${accessToken}` : ''
          } 
        });
        if (!response.ok) throw new Error('서비스 데이터를 불러오는 데 실패했습니다.');
        const data = await response.json();
        setService(data.result);

        if (data.detailInfo) {
          setDownloadLink(data.detailInfo);
        } else {
          setDownloadLink(null);
        }
        await checkFavoriteStatus(data.result.welfareId);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServiceData();
    const timer = setTimeout(() => setShowActionButtons(true), 50);
    return () => clearTimeout(timer);
  }, [id, accessToken]);

  const checkFavoriteStatus = async (welfareId) => {
    if (!accessToken) return;
    try {
      const response = await fetch('https://nexusdndn.duckdns.org/interest', {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        const isFav = data.result.interestList.some(item => item.welfareId === parseInt(welfareId));
        setIsFavorite(isFav);
      }
    } catch (err) {
      console.error("좋아요 상태 확인 실패:", err);
    }
  };

  if (loading) return <div className="service-detail-page"><p>서비스 정보를 불러오는 중입니다...</p></div>;
  if (error) return <div className="service-detail-page"><p>데이터를 가져오는 데 실패했습니다: {error}</p></div>;
  if (!service) return <div className="service-detail-page"><p>서비스를 찾을 수 없습니다.</p></div>;
  
  const toggleFavorite = async () => {
    if (!accessToken) {
        alert("로그인이 필요합니다.");
        return;
    }
    const newStatus = !isFavorite;
    try {
        const response = await fetch(`https://nexusdndn.duckdns.org/interest/${service.welfareId}?interestStatus=${newStatus}`, {
            method: 'PATCH',
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${accessToken}`
            },
        });
        if (!response.ok) {
            throw new Error('좋아요 상태 변경에 실패했습니다.');
        }
        setIsFavorite(newStatus);
    } catch (err) {
        console.error('좋아요 상태 변경 실패:', err);
    }
  };
  
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/service-detail/${service.welfareId}`;
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

  const completeWithDate = async () => {
    if (!accessToken) {
        alert("로그인이 필요합니다.");
        return;
    }

    try {
        const postData = {
            appliedAt: date.toISOString().split('T')[0]
        };

        const response = await fetch(`https://nexusdndn.duckdns.org/application/${service.welfareId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(postData),
        });

        if (response.status === 409) {
            setShowDateSheet(false);
            setShowDuplicateModal(true);
            return;
        }

        if (!response.ok) {
            throw new Error('신청 정보 저장에 실패했습니다.');
        }

        const result = await response.json();
        console.log('API 응답:', result);

        setShowDateSheet(false);
        setShowCompleteModal(true);

    } catch (err) {
        console.error('신청 정보 저장 실패:', err);
        alert('신청 정보를 저장하는 중 오류가 발생했습니다.');
    }
  };

  const handleCompleteClose = () => setShowCompleteModal(false);
  const handleDuplicateClose = () => setShowDuplicateModal(false);
  
  const handleApplyClick = () => {
    if (service.servLink) {
      window.open(service.servLink, '_blank');
    } else {
      alert('신청 가능한 링크가 없습니다.');
    }
  };

  return (
    <div className="service-detail-page">
      <div className="top-bar">
        <button className="icon-button" onClick={() => navigate(-1)}><FaArrowLeft size={20} /></button>
        <div className="right-icons">
          <button className="icon-button" onClick={toggleFavorite} aria-label="즐겨찾기">{isFavorite ? <FaHeart color="red" size={20} /> : <FaRegHeart size={20} />}</button>
          <button className="icon-button" onClick={handleShare} aria-label="공유"><FaShareAlt size={20} /></button>
        </div>
      </div>
      <div className="service-header">
        <img src={picture} alt={service.title} className="thumbnail-placeholder" />
        <div className="service-title">{service.title}</div>
        {service.lifeCycleNames && service.lifeCycleNames.length > 0 && (
          <div className="lifecycle-chip-container">
            {service.lifeCycleNames.map((name, index) => (
              <span key={index} className="lifecycle-chip">{name}</span>
            ))}
          </div>
        )}
      </div>
      <div className="scrollable-content">
        <div className="service-info">
          {downloadLink && (
            <div className="document-download">
              <a href={downloadLink} target="_blank" rel="noopener noreferrer">
                <button className="download-button">서류 다운로드</button>
              </a>
            </div>
          )}
          <div>
            <h3>📌 지원대상</h3>
            <p>{service.eligibleUser || '정보 없음'}</p>
          </div>
          <div>
            <h3>📋 내용</h3>
            <p>{service.content || '정보 없음'}</p>
          </div>
          <div>
            <h3>🏢 담당 부서</h3>
            <p>{service.department || '정보 없음'}</p>
          </div>
          {service.detailInfo && !downloadLink && (
            <div>
              <h3>📝 제출 서류</h3>
              <a href={service.detailInfo} target="_blank" rel="noopener noreferrer">자세한 정보 보기</a>
            </div>
          )}
        </div>
      </div>
      <div className={`bottom-actions ${showActionButtons ? 'slide-up' : ''}`}>
        <div className="action-desc">서비스를 신청하고 싶다면 ?</div>
        <button className="record-button" onClick={handleApplyClick}>신청하러 가기</button>
        <div className="action-desc">서비스를 이미 신청했다면 ?</div>
        <button className="apply-button" onClick={() => setShowDateSheet(true)}>신청 정보 기록하기</button>
      </div>
      {showDateSheet && (
        <div className="record-overlay" onClick={() => setShowDateSheet(false)}>
          <div className="record-modal date-sheet" onClick={(e) => e.stopPropagation()}>
            <h3 className="record-title">신청 날짜 선택하기</h3>
            <div className="calendar-wrapper"><DatePicker selected={date} onChange={(d) => d && setDate(d)} inline locale={ko} /></div>
            <div className="k-date-value">{formatKoreanDate(date)}</div>
            <div className="record-actions">
              <button className="btn-cancel" onClick={() => setShowDateSheet(false)}>취소</button>
              <button className="btn-primary" onClick={completeWithDate}>등록 완료</button>
            </div>
          </div>
        </div>
      )}
      {showCompleteModal && (
        <div className="record-overlay" onClick={handleCompleteClose}>
          <div className={`complete-modal ${showCompleteModal ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
            <h3 className="complete-title">신청 정보 저장 완료</h3>
            <p className="complete-date">{formatKoreanDate(date)}</p>
            <p className="complete-service">{service?.title}</p>
            <button className="complete-btn" onClick={() => { handleCompleteClose(); navigate('/mainpage'); }}>완료</button>
          </div>
        </div>
      )}

      {/* ✅ 중복 신청 모달 */}
      {showDuplicateModal && (
        <div className="record-overlay" onClick={handleDuplicateClose}>
          <div className={`complete-modal ${showDuplicateModal ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
            <h3 className="complete-title">⚠️ 중복 신청</h3>
            <p className="complete-service">이미 신청된 복지입니다.</p>
            <button className="complete-btn" onClick={handleDuplicateClose}>확인</button>
          </div>
        </div>
      )}

      <BottomNav activePath="/" />
    </div>
  );
};
export default ServiceDetailPage;