import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaFileAlt, FaPlus, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import '../styles/FilePage.css';
import BottomNav from '../components/BottomNavForm/BottomNav';
import { useAuth } from '../context/AuthContext.jsx';

const FilePage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (!accessToken) {
      setIsLoading(false);
      setError('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await axios.get('https://nexusdndn.duckdns.org/user/documents', {
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

  const handleDownload = async (documentId) => {
    if (!accessToken) return;
    try {
      const response = await axios.get(`https://nexusdndn.duckdns.org/user/documents/${documentId}/download`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      const contentDisposition = response.headers['content-disposition'];
      let fileName = 'download';
      
      if (contentDisposition) {
        const filenameStarMatch = /filename\*=(?:['"]*[^'"]*['"]*|[^;]*)(['"]?)(.*?)\1(?:;|$)/i.exec(contentDisposition);
        if (filenameStarMatch && filenameStarMatch.length >= 3) {
          try {
            fileName = decodeURIComponent(filenameStarMatch[2].replace(/^UTF-8''/i, ''));
          } catch (e) {
            console.error('Failed to decode filename:', e);
            const filenameMatch = contentDisposition.match(/filename="(.+)"/);
            if (filenameMatch && filenameMatch.length === 2) {
              fileName = decodeURIComponent(filenameMatch[1]);
            }
          }
        } else {
          const filenameMatch = contentDisposition.match(/filename="(.+)"/);
          if (filenameMatch && filenameMatch.length === 2) {
            fileName = decodeURIComponent(filenameMatch[1]);
          }
        }
      }
      
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      alert('파일 다운로드가 완료되었습니다!');
    } catch (err) {
      console.error('파일 다운로드에 실패했습니다.', err);
      alert('파일 다운로드에 실패했습니다.');
    }
  };

  const handleDelete = async (documentId) => {
    if (!accessToken) return;
    try {
      await axios.delete(`https://nexusdndn.duckdns.org/user/documents/${documentId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      fetchDocuments();
    } catch (err) {
      console.error('파일 삭제에 실패했습니다.', err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return (
    <div className="file-page">
      <header className="file-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
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
          documents.map((doc) => (
            <div key={doc.documentId} className="file-item">
              <div className="file-info-section">
                <div className="file-icon-wrapper">
                  <FaFileAlt className="file-icon" />
                  <FaCheckCircle className="file-check-icon" />
                </div>
                <div className="file-details">
                  <span className="file-name">{doc.originalName || "파일명 없음"}</span>
                  <span className="file-date">11월 22일 (만료까지 90일)</span>
                </div>
              </div>
              <button className="download-button" onClick={() => handleDownload(doc.documentId)}>
                다운로드
              </button>
            </div>
          ))
        ) : (
          !isLoading && !error && <p className="no-documents">저장된 서류가 없습니다.</p>
        )}
      </div>

      <button className="add-file-button" onClick={() => navigate('/file/upload')}>
        <FaPlus /> 업로드
      </button>

      <BottomNav activePath="/file" />
    </div>
  );
};

export default FilePage;