import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/FilePage.css';
import BottomNav from '../components/BottomNavForm/BottomNav';
import { useAuth } from '../context/AuthContext.jsx';
import { FaFileAlt, FaPlus, FaCheckCircle } from 'react-icons/fa'; 
import Backicon from '../assets/back.svg';
// 이미지 버튼 에셋 임포트 (이제 FilePage에서만 사용)
import WasteButton from '../assets/wastebutton.png'; // 삭제 버튼


const API_BASE_URL = 'https://nexusdndn.duckdns.org';

// JWT 디코딩 유틸리티 함수 (현재 FilePage에서는 직접 사용하지 않지만 유지)
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT 디코딩 실패:", error);
    return null;
  }
};


// 날짜 계산 함수: createdAt 기준으로 만료일 및 남은 일수 계산
const getExpirationInfo = (creationDateStr) => {
  const creationDate = new Date(creationDateStr);
  
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const expirationDate = new Date(creationDate);
  expirationDate.setDate(creationDate.getDate() + 90);
  expirationDate.setHours(0, 0, 0, 0);

  const timeDiff = expirationDate.getTime() - currentDate.getTime();
  const remainingDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  const month = expirationDate.getMonth() + 1;
  const day = expirationDate.getDate();

  return {
    displayDate: `${month}월 ${day}일`,
    remainingDays: remainingDays > 0 ? remainingDays : 0,
    displayText: remainingDays > 0 ? `(만료까지 ${remainingDays}일)` : '(만료됨)',
  };
};


// 삭제 확인 모달 컴포넌트
const DeleteConfirmationModal = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3 className="modal-title">내역을 삭제할까요?</h3>
        <p className="modal-message">
          내역이 전체 삭제되며, 복구하실 수 없습니다. 혜택 수령 완료 내역을 삭제하시겠습니까?
        </p>
        <div className="modal-actions">
          <button className="modal-cancel-button" onClick={onCancel}>
            취소
          </button>
          <button className="modal-delete-button" onClick={onConfirm}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

// 다운로드 완료 모달 컴포넌트
const DownloadSuccessModal = ({ show, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3 className="modal-title">다운로드 완료</h3>
        <p className="modal-message">
          파일 다운로드가 성공적으로 완료되었습니다.
        </p>
        <div className="modal-actions">
          <button className="modal-delete-button" onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};


const FilePage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // 삭제 모달 표시 여부
  const [documentToDelete, setDocumentToDelete] = useState(null); // 삭제할 문서 ID
  const [showDownloadSuccessModal, setShowDownloadSuccessModal] = useState(false); // 다운로드 성공 모달


  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (!accessToken) {
      setIsLoading(false);
      setError('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/user/documents`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setDocuments(response.data.result);
    } catch (err) {
      setError('서류 목록을 불러오는 데 실패했습니다.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  // 목록에서 다운로드 버튼 클릭 시 사용될 함수
  const handleDownload = async (documentId, event) => {
    event.stopPropagation(); // ⭐ 이벤트 버블링 방지
    if (!accessToken) {
      alert('로그인이 만료되었거나 권한이 없습니다.');
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/user/documents/${documentId}/download`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      const downloadUrl = response.data.result.downloadUrl;
      const fileName = response.data.result.originalName;

      if (!downloadUrl) {
        alert('다운로드 URL을 받을 수 없습니다.');
        return;
      }

      const fileResponse = await axios.get(downloadUrl, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([fileResponse.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      // alert('파일 다운로드가 완료되었습니다!'); // ⭐ alert 대신 모달 띄우기
      setShowDownloadSuccessModal(true);
    } catch (err) {
      console.error('파일 다운로드에 실패했습니다.', err);
      alert('파일 다운로드에 실패했습니다.');
    }
  };

  // 실제 삭제 API 호출 함수
  const executeDelete = async (documentId) => {
    if (!accessToken) {
        alert('로그인 정보가 없습니다.');
        return;
    }
    try {
      const response = await axios.delete(`${API_BASE_URL}/user/documents/${documentId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (response.data.isSuccess) {
        // alert('파일 삭제가 성공적으로 완료되었습니다.'); // 성공 알림 제거
        fetchDocuments(); // 목록 새로고침
      } else {
        alert(`파일 삭제 실패: ${response.data.message}`);
      }
    } catch (err) {
      console.error('파일 삭제에 실패했습니다.', err);
      alert('파일 삭제에 실패했습니다.');
    } finally {
        setShowDeleteModal(false); // 모달 닫기
        setDocumentToDelete(null); // 삭제할 문서 초기화
    }
  };

  // 삭제 버튼 클릭 시 모달 띄우기
  const handleDeleteClick = (documentId, event) => {
    event.stopPropagation(); // ⭐ 이벤트 버블링 방지
    setDocumentToDelete(documentId);
    setShowDeleteModal(true);
  };

  // 모달에서 삭제 확정
  const handleDeleteConfirm = () => {
    if (documentToDelete) {
      executeDelete(documentToDelete);
    }
  };

  // 모달에서 삭제 취소
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDocumentToDelete(null);
  };

  // 다운로드 성공 모달 확인 버튼 클릭
  const handleDownloadSuccessModalConfirm = () => {
    setShowDownloadSuccessModal(false);
  };


  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);


  // 상세 페이지를 없앴으므로 handleFileItemClick은 더 이상 상세 페이지를 열지 않습니다.
  // 이 함수는 파일 아이템의 아무 곳이나 클릭해도 아무 일도 일어나지 않도록 하거나,
  // 원한다면 다른 액션 (예: 미리보기 팝업)을 정의할 수 있습니다.
  const handleFileItemClick = (doc) => {
    // 현재는 아무 동작 없음. 필요시 다른 동작 정의 가능.
    console.log(`파일 ${doc.originalName} 클릭됨.`);
  };


  return (
    <div className="file-page">
      <header className="file-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <img src={Backicon} alt="뒤로가기" className="back-icon" />
        </button>
        <h2>서류함</h2>
      </header>
      
      <div className="file-list-container">
        <div className="file-list-header">
          내 증명서 {documents.length}
        </div>
        
        {isLoading && <p className="loading-message">서류를 불러오는 중입니다...</p>}
        {error && <p className="error-message">{error}</p>}
        
        {documents.length > 0 ? (
          documents.map((doc) => {
            const { displayDate, displayText } = getExpirationInfo(doc.createdAt); 
            return (
              <div 
                key={doc.documentId} 
                className="file-item" 
                onClick={() => handleFileItemClick(doc)} // 이제 아무 동작 없음
              >
                <div className="file-info-section">
                  <div className="file-icon-wrapper">
                    <FaFileAlt className="file-icon" />
                    <FaCheckCircle className="file-check-icon" />
                  </div>
                  <div className="file-details">
                    <span className="file-name">{doc.originalName || "파일명 없음"}</span>
                    <span className="file-date">
                      {displayDate} {displayText}
                    </span>
                  </div>
                </div>
                {/* 다운로드 및 삭제 버튼 그룹 */}
                <div className="file-item-actions">
                    <button 
                        className="download-button" 
                        onClick={(e) => handleDownload(doc.documentId, e)}
                    >
                        다운로드
                    </button>
                    <button 
                        className="delete-item-button" // 새로운 삭제 버튼 스타일 클래스
                        onClick={(e) => handleDeleteClick(doc.documentId, e)}
                    >
                        <img src={WasteButton} alt="삭제" className="delete-item-icon" />
                    </button>
                </div>
              </div>
            );
          })
        ) : (
          !isLoading && !error && <p className="no-documents">저장된 서류가 없습니다.</p>
        )}
      </div>

      <button className="add-file-button" onClick={() => navigate('/file/upload')}>
        <FaPlus /> 업로드
      </button>

      <BottomNav activePath="/file" />

      {/* 삭제 확인 모달 */}
      <DeleteConfirmationModal 
        show={showDeleteModal} 
        onConfirm={handleDeleteConfirm} 
        onCancel={handleDeleteCancel} 
      />

      {/* 다운로드 성공 모달 */}
      <DownloadSuccessModal
        show={showDownloadSuccessModal}
        onConfirm={handleDownloadSuccessModalConfirm}
      />
    </div>
  );
};

export default FilePage;
