import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './VerifyCodeForm.module.css';
import BackButton from '../common/BackButton';
import AuthButton from '../common/AuthButton';

const VerifyCodeForm = () => {
  const navigate = useNavigate();
  const inputCount = 4; // 입력 필드 개수
  const inputRefs = useRef([]);
  const storedAuthCode = localStorage.getItem('authCode'); // 저장된 인증 코드
  const storedPhoneNumber = localStorage.getItem('authPhone') || '010-****-1234'; // 저장된 전화번호, 없으면 기본값
  const [timeLeft, setTimeLeft] = useState(20); // 20초 카운트다운

  // inputRefs 초기화 (useLayoutEffect로 DOM 준비 후 실행)
  useLayoutEffect(() => {
    inputRefs.current = Array(inputCount)
      .fill()
      .map((_, i) => React.createRef());
    // DOM이 준비된 후 ref 확인
    setTimeout(() => {
      console.log('inputRefs after layout:', inputRefs.current.map(ref => ref.current));
    }, 0);
  }, []);

  // 타이머 설정
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId); // 컴포넌트 언마운트 시 타이머 정리
    }
  }, [timeLeft]);

  // 입력값 변경 처리
  const handleInput = (e, idx) => {
    const value = e.target.value;
    console.log(`handleInput - Index: ${idx}, Value: ${value}, Target:`, e.target); // 디버깅용 로그

    // 숫자 1자리만 허용
    const regex = /^[0-9]$/;
    if (value && !regex.test(value)) {
      e.target.value = '';
      console.log(`Invalid input at index ${idx}: ${value}`); // 디버깅용
      return;
    }

    // 값이 유효한 숫자일 경우 다음 입력 필드로 포커스 이동
    if (value && idx < inputRefs.current.length - 1) {
      const nextInput = inputRefs.current[idx + 1].current;
      console.log(`Next input at ${idx + 1}:`, nextInput); // 다음 입력 필드 확인
      if (nextInput) {
        setTimeout(() => {
          nextInput.focus();
          console.log(`Moved focus to index ${idx + 1}`); // 디버깅용
        }, 0);
      } else {
        console.error(`No input found at index ${idx + 1}, inputRefs:`, inputRefs.current.map(ref => ref.current)); // 오류 발생 지점
      }
    }
  };

  // 백스페이스 키 처리
  const handleKeyDown = (e, idx) => {
    console.log(`handleKeyDown - Index: ${idx}, Key: ${e.key}, Value: ${e.target.value}`); // 디버깅용 로그
    if (e.key === 'Backspace' && !e.target.value && idx > 0) {
      const prevInput = inputRefs.current[idx - 1].current;
      if (prevInput) {
        prevInput.focus();
        console.log(`Moved focus back to index ${idx - 1}`); // 디버깅용
      }
    }
  };

  // 입력값 수집 및 인증 확인
  const handleVerifyClick = () => {
    const enteredCode = inputRefs.current.map(ref => ref.current?.value || '').join('');
    console.log('Entered code:', enteredCode, 'Stored code:', storedAuthCode); // 디버깅용

    if (enteredCode.length === inputCount) {
      if (enteredCode === storedAuthCode) {
        console.log('인증 성공!');
        navigate('/login'); // 로그인 페이지로 이동
      } else {
        alert('인증 코드가 틀렸습니다. 다시 확인해주세요.');
        console.log('인증 실패');
        // 입력 필드 초기화
        inputRefs.current.forEach(ref => {
          if (ref.current) ref.current.value = '';
        });
        if (inputRefs.current[0].current) inputRefs.current[0].current.focus(); // 첫 번째 필드에 포커스
      }
    } else {
      alert('모든 자리를 입력해주세요.');
      console.log('Incomplete code');
    }
  };

  // 코드 재전송 처리
  const handleResendCode = () => {
    if (timeLeft === 0) {
      const newAuthCode = Math.floor(1000 + Math.random() * 9000).toString(); // 새 4자리 코드
      console.log(`${newAuthCode} 코드가 ${storedPhoneNumber}로 재전송되었습니다.`);
      localStorage.setItem('authCode', newAuthCode); // 새 코드 저장
      setTimeLeft(20); // 타이머 재설정
    }
  };

  // 타이머 형식 변환 (MM:SS)
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `코드 재전송 ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className={styles.wrapper}>
      <BackButton onClick={() => navigate('/join')} />

      <div className={styles.textGroup}>
        <h2 className={styles.title}>인증 번호 확인</h2>
        <p className={styles.subtext}>
          <strong>{storedPhoneNumber}</strong>로 코드를 전송했습니다
        </p>
      </div>

      <div className={styles.codeBoxes}>
        {Array.from({ length: inputCount }, (_, idx) => (
          <input
            key={`input-${idx}`}
            type="text"
            maxLength="1"
            className={styles.codeInput}
            ref={inputRefs.current[idx]}
            onInput={(e) => handleInput(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            autoComplete="off"
            autoFocus={idx === 0}
            disabled={false}
          />
        ))}
      </div>

      <AuthButton onClick={handleVerifyClick}>확인</AuthButton>

      <p className={styles.timer} onClick={handleResendCode} style={{ cursor: timeLeft === 0 ? 'pointer' : 'default' }}>
        {timeLeft > 0 ? formatTime() : '코드 재전송 가능'}
      </p>
    </div>
  );
};

export default VerifyCodeForm;