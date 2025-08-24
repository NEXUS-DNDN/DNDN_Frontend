import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RecordPage.css';

const RecordPage = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const handleRecord = () => {
    localStorage.setItem('applyDate', today);
    navigate('/apply-complete');
  };

  return (
    <div className="record-page">
      <h2>신청 날짜를 기록합니다</h2>
      <p>오늘 날짜: {today}</p>
      <button onClick={handleRecord}>완료</button>
    </div>
  );
};

export default RecordPage;