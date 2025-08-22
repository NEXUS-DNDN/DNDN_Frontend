// // ApplyCompletePage.jsx
// import React from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { services } from '../utils/mockData';
// import { FaArrowLeft, FaBell } from 'react-icons/fa';
// import '../styles/ApplyCompletePage.css';

// const ApplyCompletePage = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const { id } = useParams();
//   const service = services.find((s) => s.id === Number(id));

//   if (!state?.date) return <div>신청 날짜가 없습니다.</div>;

//   // ✅ localStorage에 신청 내역 저장
//   const appliedServices = JSON.parse(localStorage.getItem('appliedServices')) || [];
//   const isAlreadyStored = appliedServices.some((s) => s.id === service.id);
//   if (!isAlreadyStored) {
//     localStorage.setItem(
//       'appliedServices',
//       JSON.stringify([...appliedServices, { id: service.id, title: service.title, date: state.date }])
//     );
//   }

//   return (
//     <div className="apply-complete-page">
//       <div className="top-bar">
//         <button className="icon-btn" onClick={() => navigate(-1)}>
//           <FaArrowLeft />
//         </button>
//         <button className="icon-btn">
//           <FaBell />
//         </button>
//       </div>

//       <div className="complete-modal slide-up-modal">
//         <h3 className="complete-title">신청 정보 저장 완료</h3>
//         <p className="complete-date">{state.date}</p>
//         <p className="complete-service">{service?.title}</p>
//         <button className="complete-btn" onClick={() => navigate('/mainpage')}>완료</button>
//       </div>
//     </div>
//   );
// };

// export default ApplyCompletePage;
