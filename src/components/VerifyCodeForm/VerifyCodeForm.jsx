import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './VerifyCodeForm.module.css';
import BackButton from '../common/BackButton';
import AuthButton from '../common/AuthButton';

const VerifyCodeForm = () => {
  const navigate = useNavigate();
  const inputCount = 4; // 입력 필드 개수
  const inputRefs = useRef([]);

  // inputRefs 초기화
  useEffect(() => {
    inputRefs.current = Array(inputCount)
      .fill()
      .map((_, i) => inputRefs.current[i] || React.createRef());
    console.log('inputRefs initialized:', inputRefs.current.map(ref => ref.current)); // 디버깅용
  }, []);

  // 입력값 변경 처리
  const handleChange = (e, idx) => {
    const value = e.target.value;
    console.log(`handleChange - Index: ${idx}, Value: ${value}`); // 디버깅용 로그

    // 숫자 1자리만 허용
    const regex = new RegExp('^[0-9]$');
    if (value && !regex.test(value)) {
      e.target.value = '';
      console.log(`Invalid input at index ${idx}: ${value}`); // 디버깅용
      return;
    }

    // 값이 유효한 숫자이고 다음 입력 필드가 있으면 포커스 이동
    if (value && idx < inputRefs.current.length - 1) {
      const nextInput = inputRefs.current[idx + 1].current;
      if (nextInput) {
        nextInput.focus();
        console.log(`Moved focus to index ${idx + 1}`); // 디버깅용
      } else {
        console.error(`No input found at index ${idx + 1}`); // 오류 발생 지점
        console.log('Current inputRefs:', inputRefs.current.map(ref => ref.current)); // 추가 디버깅
      }
    }
  };

  // 백스페이스 키 처리
  const handleKeyDown = (e, idx) => {
    console.log(`handleKeyDown - Index: ${idx}, Key: ${e.key}`); // 디버깅용 로그
    if (e.key === 'Backspace' && !e.target.value && idx > 0) {
      const prevInput = inputRefs.current[idx - 1].current;
      if (prevInput) {
        prevInput.focus();
        console.log(`Moved focus back to index ${idx - 1}`); // 디버깅용
      }
    }
  };

  // 입력 이벤트 디버깅
  const handleInput = (e, idx) => {
    console.log(`Input event triggered at index ${idx}, Value: ${e.target.value}`); // 입력 이벤트 확인
    handleChange(e, idx);
  };

  return (
    <div className={styles.wrapper}>
      <BackButton onClick={() => navigate(-1)} />

      <div className={styles.textGroup}>
        <h2 className={styles.title}>인증 번호 확인</h2>
        <p className={styles.subtext}>
          <strong>010-****-1234</strong>로 코드를 전송했습니다
        </p>
      </div>

      <div className={styles.codeBoxes}>
        {Array.from({ length: inputCount }, (_, idx) => (
          <input
            key={`input-${idx}`} // 고유 키
            type="text"
            maxLength="1"
            className={styles.codeInput} // CSS 모듈 스타일
            ref={(el) => {
              inputRefs.current[idx] = el;
              console.log(`Ref set for index ${idx}:`, el); // ref 설정 확인
            }}
            onChange={(e) => handleInput(e, idx)}
            onInput={(e) => handleInput(e, idx)} // 추가 이벤트 핸들러
            onKeyDown={(e) => handleKeyDown(e, idx)}
            autoComplete="off" // 자동 완성 비활성화
            autoFocus={idx === 0} // 첫 번째 입력 필드에 초점
            disabled={false} // 입력 필드 활성화 보장
          />
        ))}
      </div>

      <AuthButton>확인</AuthButton>

      <p className={styles.timer}>코드 재전송 00:20</p>
    </div>
  );
};

export default VerifyCodeForm;