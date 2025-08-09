import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddressInputForm.module.css';
import Backicon from '../../assets/back.svg';
import Input from '../common/Input';

const AddressInputForm = () => {
  const handleBackClick = () => {
    console.log('뒤로가기 클릭');
    navigate('/genderinput');
  };

  const navigate = useNavigate();
  const handleNextClick = () => {
    navigate('/familyinput');
  };

  const [zipCode, setZipCode] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  };

  const handleDetailAddressChange = (e) => {
    setDetailAddress(e.target.value);
  };

  const handleAddressSearch = () => {
    const selectedAddress = prompt('대한민국 주소를 입력하세요 (예: 서울특별시 강남구):');
    if (selectedAddress) {
      const simulatedZipCode = '123-456'; // 실제 API 로직으로 대체해야 함
      setZipCode(simulatedZipCode);
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
            onChange={handleZipCodeChange}
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
            onChange={handleDetailAddressChange}
            placeholder="상세주소"
            className={styles.addressInput}
          />
        </div>
        <button className={styles.authBtn} onClick={handleNextClick}>다음</button>
      </div>
    </>
  );
};

export default AddressInputForm;