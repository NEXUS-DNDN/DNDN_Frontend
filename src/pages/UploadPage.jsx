// src/pages/UploadPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { FaFileAlt, FaCalendarAlt } from 'react-icons/fa';
import '../styles/UploadPage.css';

const JWT_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNzU1OTQ2NzM2LCJleHAiOjE3NTYwMzMxMzZ9.uTBoThDJhPbK3YoBi0QdAQ19817wfvJC1QioRQ5npD4";

const UploadPage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('업로드할 파일을 선택해주세요.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', selectedFile);

    // API 스펙에 제목 필드가 없다면 이 부분은 제거
    // formData.append('title', title); 

    try {
      await axios.post('https://nexusdndn.duckdns.org/user/documents/upload', formData, {
        headers: {
          'Authorization': `Bearer ${JWT_TOKEN}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('파일이 성공적으로 업로드되었습니다.');
      navigate('/file');
    } catch (err) {
      console.error('업로드 실패:', err);
      setError('파일 업로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-page-container">
      <div className="upload-page-card">
        <header className="upload-page-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
          <h2>업로드</h2>
          <button className="save-button" onClick={handleUpload} disabled={isLoading}>
            <FaCheck />
          </button>
        </header>

        <div className="upload-content">
          <div className="title-section">
            <p className="section-title">제목을 입력하세요.</p>
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
                  {selectedFile ? selectedFile.name : '업로드할 파일'}
                </p>
                <span className="file-instruction">
                  파일 형식 및 용량 안내 문구
                </span>
              </div>
            </label>
            <input
              type="file"
              id="file-upload"
              className="file-input"
              onChange={handleFileChange}
            />
          </div>

          <div className="date-section">
            <p className="section-title">
              <FaCalendarAlt className="calendar-icon" /> 날짜
            </p>
            <div className="calendar-placeholder">
              {/* 이미지와 동일한 UI를 위한 더미 캘린더 */}
              <div className="calendar-header">
                <button className="calendar-nav-btn"><FaArrowLeft /></button>
                <h3>2024년 11월</h3>
                <button className="calendar-nav-btn"><FaArrowLeft style={{ transform: 'scaleX(-1)' }} /></button>
              </div>
              <div className="calendar-grid">
                <span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span>
                <span></span><span></span><span></span><span>1</span><span>2</span><span>3</span><span>4</span>
                <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
                <span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span>
                <span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span>
                <span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span></span><span></span>
              </div>
            </div>
          </div>
          
          <div className="checkbox-section">
            <input type="checkbox" id="auto-destroy" className="auto-destroy-checkbox" />
            <label htmlFor="auto-destroy">
              [기한 만료 시 자동 파기] 체크박스
            </label>
          </div>
        </div>
        {isLoading && <p className="status-message">업로드 중입니다...</p>}
        {error && <p className="status-message error">{error}</p>}
      </div>
    </div>
  );
};

export default UploadPage;