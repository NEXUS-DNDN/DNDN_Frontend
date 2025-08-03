import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import '../styles/ApplyDatePage.css';

const ApplyDatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState('');

  const handleComplete = () => {
    if (!date) {
      alert('날짜를 선택해주세요.');
      return;
    }
    navigate(`/apply-complete/${id}`, { state: { date } });
  };

  return (
    <div className="apply-date-page">
      <h2>신청 날짜 선택하기</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleComplete}>완료</button>
    </div>
  );
};

export default ApplyDatePage;
