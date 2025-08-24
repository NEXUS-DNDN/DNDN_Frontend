// src/pages/UploadPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaFileAlt } from 'react-icons/fa'; // 뒤로가기, 파일 아이콘만 사용
import '../styles/UploadPage.css'; // 새로 생성할 CSS 파일 임포트

// API_BASE_URL은 UploadPage에서 직접 정의.
const API_BASE_URL = 'https://nexusdndn.duckdns.org';

// 업로드 완료 모달 컴포넌트
const UploadSuccessModal = ({ show, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop upload-success-modal"> {/* CSS 클래스 추가 */}
      <div className="modal-content">
        <h3 className="modal-title">업로드 완료</h3>
        <p className="modal-message">
          파일 업로드가 성공적으로 완료되었습니다.
        </p>
        <div className="modal-actions">
          <button className="modal-delete-button" onClick={onConfirm}> {/* 스타일 재활용 */}
            확인
          </button>
        </div>
      </div>
    </div>
  );
};


const UploadPage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDestroyOnExpirationChecked, setIsDestroyOnExpirationChecked] = useState(false); // 체크박스 상태
  const [showUploadSuccessModal, setShowUploadSuccessModal] = useState(false); // 업로드 성공 모달 상태
  const { accessToken } = useAuth(); // 인증 컨텍스트에서 accessToken 가져오기

  // 업로드 완료 버튼 비활성화 로직
  // 로딩 중이거나, 파일 선택이 안 됐거나, 제목이 비었거나, 체크박스가 체크 안 됐을 때 비활성화
  const isUploadButtonDisabled = isLoading || !selectedFile || !title.trim() || !isDestroyOnExpirationChecked;


  // 파일 선택 핸들러
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setError(null);
    // 파일 선택 시 제목 input이 비어있으면 파일 이름으로 자동 채우기
    if (file && !title) {
        setTitle(file.name.split('.').slice(0, -1).join('.')); // 확장자 제외
    }
  };

  // 체크박스 핸들러
  const handleCheckboxChange = (event) => {
    setIsDestroyOnExpirationChecked(event.target.checked);
  };

  // 파일 업로드 핸들러
  const handleUpload = async () => {
    if (!selectedFile) {
      setError('업로드할 파일을 선택해주세요.');
      return;
    }
    if (!title.trim()) { // 제목이 비어있는 경우
      setError('문서의 제목을 입력해주세요.');
      return;
    }
    if (!isDestroyOnExpirationChecked) { // 체크박스 미선택 시 에러 메시지
        setError('만료 시 파기 체크박스에 동의해야 업로드할 수 있습니다.');
        return;
    }
    if (!accessToken) {
      alert('로그인 정보가 없습니다. 다시 로그인해주세요.');
      navigate('/login'); // 로그인 페이지로 리다이렉션
      return;
    }

    setIsLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    // 백엔드 API가 제목 필드를 받는다면 추가 (현재 예시에서는 필요 여부 불확실)
    // formData.append('title', title); 

    try {
      // ⭐ 실제 API 호출 부분 활성화
      const response = await axios.post(`${API_BASE_URL}/user/documents/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // ⭐ 중요: 파일 업로드 시 필수
          'Authorization': `Bearer ${accessToken}`, // JWT 토큰 포함
        },
      });

      if (response.status === 200 || response.data.isSuccess) {
        setShowUploadSuccessModal(true); // 성공 시 모달 표시
        console.log('업로드 응답:', response.data);
      } else {
        setError(`업로드 실패: ${response.data.message || '알 수 없는 오류'}`);
        console.error('업로드 실패 응답:', response.data);
      }

      // ⭐ 시뮬레이션 코드 제거됨
      // await new Promise(resolve => setTimeout(resolve, 1500)); 
      // setShowUploadSuccessModal(true); 
      // console.log('파일이 성공적으로 시뮬레이션 업로드되었습니다.');
      // setSelectedFile(null); 
      // setTitle(''); 
      // setIsDestroyOnExpirationChecked(false); 

    } catch (err) {
      setError('파일 업로드에 실패했습니다. 다시 시도해주세요.');
      console.error('업로드 실패:', err);
      if (axios.isAxiosError(err)) {
        console.error('Axios 에러 상세:', err.response?.data || err.message);
        setError(`업로드 실패: ${err.response?.data?.message || err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 업로드 성공 모달 확인 버튼 클릭 시
  const handleUploadSuccessModalConfirm = () => {
    setShowUploadSuccessModal(false);
    navigate('/file'); // 성공 후 파일 목록 페이지로 이동
  };


  return (
    <div className="upload-page-container">
      <div className="upload-page-card">
        <header className="upload-page-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
          <h2>업로드</h2>
          {/* 상단 저장 버튼은 제거됨 */}
        </header>

        <div className="upload-content">
          <div className="title-section">
            <p className="section-title">제목</p>
            <input 
              type="text" 
              className="title-input" 
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="file-upload-section">
            <label htmlFor="file-upload" className="file-input-label">
              <FaFileAlt className="file-icon" />
              <div className="file-info">
                <p className="file-placeholder">
                  {selectedFile ? selectedFile.name : '파일을 선택하세요.'}
                </p>
                <span className="file-instruction">
                  업로드 가능 형식: Word(.doc, .docx), PDF(.pdf), 이미지(jpg, .jpeg, .png)
                </span>
              </div>
            </label>
            <input
              type="file"
              id="file-upload"
              className="file-input"
              onChange={handleFileChange}
              accept=".doc,.docx,.pdf,.jpg,.jpeg,.png" // 허용 파일 형식 추가
            />
          </div>
          
          <div className="checkbox-section">
            <input 
                type="checkbox" 
                id="auto-destroy" 
                className="auto-destroy-checkbox" 
                checked={isDestroyOnExpirationChecked} // 상태와 연결
                onChange={handleCheckboxChange} // 변경 핸들러 추가
            />
            <label htmlFor="auto-destroy">
              기한 만료 시 자동 파기
            </label>
            <p className="auto-destroy-info">
              업로드된 문서는 90일이 지나면 자동으로 파기됩니다.
            </p>
          </div>
        </div>

        {/* 하단 업로드 완료 버튼 */}
        <button 
          className="upload-complete-button" 
          onClick={handleUpload} 
          disabled={isUploadButtonDisabled} // 비활성화 로직 적용
        >
          업로드 완료
        </button>

        {isLoading && <p className="status-message">업로드 중입니다...</p>}
        {error && <p className="status-message error">{error}</p>}
      </div>

      {/* 업로드 성공 모달 렌더링 */}
      <UploadSuccessModal 
        show={showUploadSuccessModal} 
        onConfirm={handleUploadSuccessModalConfirm} 
      />
    </div>
  );
};

export default UploadPage;
