import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { services } from '../utils/mockData';
import { FaArrowLeft, FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa';
import BottomNav from '../components/BottomNavForm/BottomNav';
import '../styles/ServiceDetailPage.css';

const ServiceDetailPage = ({ favorites, setFavorites }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === Number(id));

  if (!service) return <div>서비스를 찾을 수 없습니다.</div>;

  const isFavorite = favorites.includes(service.id);

  // ✅ 즐겨찾기 토글
  const toggleFavorite = () => {
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter((fid) => fid !== service.id);
    } else {
      updatedFavorites = [...favorites, service.id];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteServices', JSON.stringify(updatedFavorites));
  };

  // ✅ 공유 기능
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/service/${service.id}`;
    const shareData = {
      title: service.title,
      text: '이 서비스 정보 확인해보세요!',
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('공유 실패:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('링크가 클립보드에 복사되었습니다!');
      } catch (err) {
        alert('공유할 수 없습니다. 브라우저가 지원하지 않아요.');
      }
    }
  };

  return (
    <div className="service-detail-page">
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
        <button
          className="record-button"
          onClick={() => navigate(`/apply-complete/${service.id}`)}
        >
          신청하러 가기
        </button>

        <div className="action-desc">서비스를 이미 신청했다면 ?</div>
        <button
          className="apply-button"
          onClick={() => navigate(`/apply-date/${service.id}`)}
        >
          신청 정보 기록하기
        </button>
      </div>

      {/* ✅ 항상 홈 탭 활성화 */}
      <BottomNav activePath="/" />
    </div>
  );
};

export default ServiceDetailPage;
