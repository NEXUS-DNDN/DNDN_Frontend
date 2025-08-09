import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBell } from 'react-icons/fa';
import alarmsRaw from '../../utils/AlarmData';
import AlarmCard from './AlarmCard';      
import '../styles/AlarmListPage.css';

const typeMeta = {
  custom: { label: '맞춤형 혜택', emoji: '✨', badgeClass: 'badge-custom' },
  bookmark: { label: '찜한 서비스', emoji: '📌', badgeClass: 'badge-bookmark' },
  favorite: { label: '즐겨찾기', emoji: '⭐', badgeClass: 'badge-favorite' },
  app: { label: '앱 알림', emoji: '🔔', badgeClass: 'badge-app' },
};

function formatWhen(ts) {
  const d = new Date(ts);
  const now = new Date();
  const diff = (now - d) / 1000;
  if (diff < 60) return '방금 전';
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return d.toLocaleDateString('ko-KR');
}

const AlarmListPage = () => {
  const navigate = useNavigate();

  const alarms = useMemo(
    () => [...alarmsRaw].sort((a, b) => new Date(b.time) - new Date(a.time)),
    []
  );

  return (
    <div className="alarm-page">
      <div className="alarm-topbar">
        <button className="icon-btn" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <FaArrowLeft size={20} />
        </button>
        <div className="alarm-title">알림</div>
        <button className="icon-btn" aria-label="알림 설정">
          <FaBell size={20} />
        </button>
      </div>

      {alarms.length === 0 && (
        <div className="alarm-empty">
          아직 알림이 없어요.
          <div className="alarm-empty-sub">맞춤 복지를 검색하고 찜하면 새 소식이 도착해요.</div>
        </div>
      )}

      <div className="alarm-list">
        {alarms.map((a) => {
          const meta = typeMeta[a.type] || typeMeta.app;
          return (
            <AlarmCard
              key={a.id}
              alarm={a}
              meta={meta}
              formatWhen={formatWhen}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AlarmListPage;
