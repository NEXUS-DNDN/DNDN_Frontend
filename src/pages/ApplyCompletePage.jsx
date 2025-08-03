import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { services } from '../utils/mockData';
// import '../styles/ApplyCompletePage.css';

const ApplyCompletePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();
  const service = services.find((s) => s.id === Number(id));

  if (!state?.date) {
    return <div>신청 날짜가 없습니다.</div>;
  }

  return (
    <div className="apply-complete-page">
      <h2>신청 정보 저장 완료</h2>
      <p>{state.date}</p>
      <p>{service?.title}</p>
      <button onClick={() => navigate(`/detail/${id}`)}>완료</button>
    </div>
  );
};

export default ApplyCompletePage;
