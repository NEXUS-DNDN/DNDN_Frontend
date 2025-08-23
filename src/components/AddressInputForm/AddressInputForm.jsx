import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddressInputForm.module.css';
import Backicon from '../../assets/back.svg';
import Input from '../common/Input';

const AddressInputForm = () => {
  const navigate = useNavigate();

  const [zipCode, setZipCode] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleBackClick = () => {
    navigate('/genderinput');
  };

  const handleNextClick = () => {
    navigate('/familyinput');
  };

  const handleAddressSearch = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: (data) => {
          setZipCode(data.zonecode);
          setRoadAddress(data.roadAddress || data.jibunAddress);
        },
      }).open();
    } else {
      alert('우편번호 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <>
      <div className={styles.backbutton} onClick={handleBackClick}>
        <img src={Backicon} alt="뒤로가기" />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.highlight}>거주지</span>를<br />입력해주세요
        </div>
        <div className={styles.inputGroup}>
          <Input
            type="text"
            value={zipCode}
            placeholder="우편번호"
            className={styles.zipInput}
            readOnly
          />
          <button className={styles.addressBtn} onClick={handleAddressSearch}>
            우편번호 찾기
          </button>
        </div>
        <div className={styles.addressGroup}>
          <Input
            type="text"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            placeholder="상세주소"
            className={styles.addressInput}
          />
        </div>
        <button className={styles.authBtn} onClick={handleNextClick}>
          다음
        </button>
      </div>
    </>
  );
};

export default AddressInputForm;
