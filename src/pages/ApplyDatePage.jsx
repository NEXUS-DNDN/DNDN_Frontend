// ApplyDatePage.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaArrowLeft, FaBell } from 'react-icons/fa';
import BottomNav from '../components/BottomNavForm/BottomNav';
import '../styles/ApplyDatePage.css';

const ApplyDatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  const handleComplete = () => {
    if (!date) {
      alert('날짜를 선택해주세요.');
      return;
    }
    navigate(`/apply-complete/${id}`, { state: { date: date.toISOString().split('T')[0] } });
  };

  return (
    <div className="apply-date-page">
      <div className="top-bar">
        <div className="left-icons">
          <button className="icon-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft size={20} />
          </button>
        </div>
        <div className="right-icons">
          <button className="icon-btn">
            <FaBell size={20} />
          </button>
        </div>
      </div>

      <div className="date-modal slide-up-modal">
        <h3 className="modal-title">신청 날짜 선택하기</h3>
        <div className="calendar-wrapper">
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            inline
            calendarClassName="custom-calendar"
          />
        </div>
        <button className="submit-btn" onClick={handleComplete}>완료</button>
      </div>

      <BottomNav />
    </div>
  );
};

export default ApplyDatePage;
