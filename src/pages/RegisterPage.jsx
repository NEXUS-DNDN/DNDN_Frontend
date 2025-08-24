// src/pages/RegisterPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css'; // RegisterPage.css 파일 직접 import
import BackIcon from '../assets/back.svg'; // assets 폴더 경로 확인 (pages 기준)
import SendButton from '../assets/send.PNG';
import ActiveSendButton from '../assets/Activesend.PNG';
import NextButton from '../assets/다음.PNG';
import ActiveNextButton from '../assets/Active다음.PNG';
import CertButton from '../assets/certification.PNG';
import ActiveCertButton from '../assets/Activecertification.PNG';
import { useAuth } from '../context/AuthContext.jsx'; // useAuth 훅 import

const RegisterPage = () => {
    const navigate = useNavigate();
    const { login, accessToken } = useAuth(); // useAuth 훅에서 login 함수와 accessToken 가져오기

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);
    const [isVerifyButtonDisabled, setIsVerifyButtonDisabled] = useState(true);
    const [timer, setTimer] = useState(180); // 3분 타이머 (180초)
    const [verificationMessage, setVerificationMessage] = useState(''); // 인증 결과 메시지 상태 추가

    const API_BASE_URL = 'https://nexusdndn.duckdns.org';

    // 이름과 전화번호가 유효한지 확인하여 '보내기' 버튼 활성화
    useEffect(() => {
        const cleanedPhoneNumber = phoneNumber.replace(/-/g, '');
        // 디버깅: 이름, 정리된 전화번호, 유효성 상태를 콘솔에 출력
        console.log('--- Send Button Check ---');
        console.log('Name:', name, 'Cleaned Phone:', cleanedPhoneNumber, 'Is valid?', name.length > 0 && cleanedPhoneNumber.length === 11);
        
        if (name.length > 0 && cleanedPhoneNumber.length === 11) {
            setIsSendButtonDisabled(false);
        } else {
            setIsSendButtonDisabled(true);
        }
    }, [name, phoneNumber]);

    // 인증번호 입력 시 '인증' 버튼 활성화
    useEffect(() => {
        // 디버깅: 인증 코드 길이와 버튼 비활성화 상태를 콘솔에 출력
        console.log('--- Verify Button Check ---');
        console.log('Auth Code Length:', authCode.length, 'Is valid?', authCode.length === 6);

        if (authCode.length === 6) { // 인증번호 6자리
            setIsVerifyButtonDisabled(false);
        } else {
            setIsVerifyButtonDisabled(true);
        }
    }, [authCode]);

    // 타이머 관리
    useEffect(() => {
        let intervalId; 
        if (isCodeSent && timer > 0) {
            intervalId = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0 && isCodeSent) { 
            alert('인증 시간이 초과되었습니다. 다시 시도해주세요.'); // 알림 팝업은 유지
            setIsCodeSent(false); // 상태 변경으로 useEffect가 다시 실행되는 것을 방지
            setAuthCode(''); 
            setTimer(180); 
            setVerificationMessage('인증 시간이 초과되었습니다.'); // 메시지 업데이트
        }
        
        console.log('Timer:', timer, 'Is code sent:', isCodeSent); // 디버깅 로그

        // cleanup 함수
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isCodeSent, timer]); 

    const formatTimer = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const handlePhoneNumberChange = (e) => {
        // 숫자만 입력되도록 필터링하고, 최대 11자리까지만 허용
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11); 
        
        // 010-XXXX-XXXX 형식으로 자동 변환
        let formattedValue = value;
        if (value.length > 3 && value.length <= 7) {
            formattedValue = `${value.slice(0, 3)}-${value.slice(3)}`;
        } else if (value.length > 7) {
            formattedValue = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
        }
        setPhoneNumber(formattedValue);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAuthCodeChange = (e) => {
        // 숫자만 입력되도록 필터링하고, 최대 6자리까지만 허용
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
        setAuthCode(value);
    };

    const handleSendCode = async () => {
        const cleanedPhoneNumber = phoneNumber.replace(/-/g, '');
        if (name.length === 0 || cleanedPhoneNumber.length !== 11) {
            alert('이름과 유효한 11자리 전화번호를 입력해주세요.'); // 유효성 검사 팝업은 유지
            return;
        }

        // 소셜 로그인으로 받은 accessToken이 있는지 확인
        if (!accessToken) {
            alert('소셜 로그인 정보가 없습니다. 다시 로그인해주세요.');
            console.error('Access token not available from social login.');
            return;
        }

        console.log("handleSendCode 함수 시작!"); // 함수 실행 여부 확인용 로그
        console.log('Sending user data:', { name, phoneNumber: cleanedPhoneNumber }); // 요청 데이터 로그
        console.log('Current accessToken from AuthContext:', accessToken); // ⭐ accessToken 값 디버깅 추가

        try {
            // 1. 이름과 전화번호 저장 API 호출 (소셜 로그인 accessToken 사용)
            // 이 API는 백엔드에서 소셜 로그인 후 발급된 accessToken을 기대하고 있습니다.
            const saveUserResponse = await axios.post(`${API_BASE_URL}/user`, {
                name: name,
                phoneNumber: cleanedPhoneNumber,
                birthday: '2025-08-24', // 임시 값
                address: 'string', // 임시 값
                householdNumber: 0, // 임시 값
                monthlyIncome: 'UNDER_100', // 임시 값
                gender: 'MALE', // 임시 값
                employment: 'EMPLOYED', // 임시 값
                lifeCycle: 'INFANT', // 임시 값
                householdTypes: ['MULTICULTURAL'] // 임시 값
            }, {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${accessToken}`, // ⭐ 소셜 로그인으로 받은 accessToken 사용
                    'Content-Type': 'application/json'
                }
            });

            console.log('User saved successfully:', saveUserResponse.data);

            // ⭐ 사용자 이름과 전화번호를 로컬 스토리지에 저장 (InputPage에서 사용하기 위해)
            localStorage.setItem('userName', name);
            localStorage.setItem('userPhoneNumber', cleanedPhoneNumber);

            // 2. 인증번호 발송 API 호출 (소셜 로그인 accessToken 사용)
            // 이 API도 소셜 로그인으로 인증된 사용자의 요청으로 간주하여 accessToken을 보냅니다.
            console.log('Sending verification code request for:', { name, phone: cleanedPhoneNumber }); // 요청 데이터 로그
            const sendCodeResponse = await axios.post(`${API_BASE_URL}/auth/send-code?name=${name}&phone=${cleanedPhoneNumber}`, null, {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${accessToken}` // ⭐ 소셜 로그인으로 받은 accessToken 사용
                }
            });

            if (sendCodeResponse.data.isSuccess) {
                setVerificationMessage('인증번호가 발송되었습니다.'); // 메시지 업데이트
                setIsCodeSent(true); 
                setTimer(180); // 타이머 재시작
            } else {
                setVerificationMessage('인증번호 발송에 실패했습니다.'); // 메시지 업데이트
                console.error('인증번호 발송 실패 (서버 응답):', sendCodeResponse.data.message);
            }
        } catch (error) {
            console.error('API 호출 실패:', error); 
            
            if (axios.isAxiosError(error)) {
                console.error('Axios Error Details:', error.response?.data || error.message);
                if (error.response?.status === 401) {
                    setVerificationMessage('인증 정보가 유효하지 않습니다. 다시 로그인해주세요.');
                } else if (error.response?.status === 403) {
                    setVerificationMessage('인증 권한이 없습니다. (백엔드 확인 필요)');
                } else if (error.response?.status === 400) {
                    setVerificationMessage('잘못된 요청입니다. (입력 데이터 확인)');
                } else if (error.response?.status === 500) { // 500 에러 메시지 상세화
                    setVerificationMessage('서버 내부 오류가 발생했습니다. 백엔드 개발자에게 문의해주세요.');
                }
                else if (error.response?.status) {
                    setVerificationMessage(`서버 응답 오류: ${error.response.status}`);
                }
                else if (error.code === 'ERR_NETWORK') {
                    setVerificationMessage('네트워크 연결 오류입니다. 서버가 실행 중인지 확인해주세요.');
                }
                else {
                    setVerificationMessage('요청 중 알 수 없는 오류가 발생했습니다.');
                }
            } else {
                setVerificationMessage('알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    const handleVerifyCode = async () => {
        const cleanedPhoneNumber = phoneNumber.replace(/-/g, '');
        if (authCode.length !== 6) {
            alert('6자리의 인증번호를 입력해주세요.'); // 유효성 검사 팝업은 유지
            return;
        }

        try {
            console.log('Verifying code:', { phone: cleanedPhoneNumber, code: authCode }); // 요청 데이터 로그
            // SMS 로그인 API 호출 (이 API는 새로운 최종 accessToken을 발급하는 역할을 하므로,
            // 기존 소셜 로그인 accessToken을 보내지 않을 가능성이 높습니다.
            // 백엔드 설계에 따라 달라질 수 있으나, 일반적으로는 이 단계에서 기존 토큰을 보내지 않습니다.)
            const verifyResponse = await axios.post(`${API_BASE_URL}/auth/sms-login?phone=${cleanedPhoneNumber}&code=${authCode}`, null, {
                headers: {
                    'accept': '*/*',
                    // 'Authorization': `Bearer ${accessToken}` // 일반적으로 이 단계에서는 기존 토큰을 보내지 않습니다.
                }
            });

            if (verifyResponse.data.isSuccess) {
                setIsVerified(true);
                setVerificationMessage('인증이 완료되었습니다.'); // 메시지 업데이트

                // API 응답에서 받은 새로운 accessToken을 AuthContext에 저장 (동적 토큰 사용)
                const { accessToken: newAccessToken, refreshToken } = verifyResponse.data.result;
                login(newAccessToken); // AuthContext의 login 함수 호출 (최종 토큰으로 업데이트)
                localStorage.setItem('refreshToken', refreshToken); // Refresh Token은 로컬 스토리지에 직접 저장

            } else {
                setVerificationMessage('인증번호가 일치하지 않습니다.'); // 메시지 업데이트
                console.error('인증 실패 (서버 응답):', verifyResponse.data.message);
            }
        } catch (error) {
            console.error('인증 실패:', error);
            if (axios.isAxiosError(error)) {
                console.error('Axios Error Details:', error.response?.data || error.message);
                if (error.response?.status === 401) {
                    setVerificationMessage('인증 정보가 유효하지 않습니다. 다시 로그인해주세요.');
                } else if (error.response?.status === 403) {
                    setVerificationMessage('인증 권한이 없습니다. (백엔드 확인 필요)');
                } else if (error.response?.status === 400) {
                    setVerificationMessage('인증번호가 유효하지 않거나 만료되었습니다.');
                } else if (error.response?.status === 500) { // 500 에러 메시지 상세화
                    setVerificationMessage('서버 내부 오류가 발생했습니다. 백엔드 개발자에게 문의해주세요.');
                }
                else if (error.response?.status) {
                    setVerificationMessage(`서버 응답 오류: ${error.response.status}`);
                } else if (error.code === 'ERR_NETWORK') {
                    setVerificationMessage('네트워크 연결 오류입니다. 서버가 실행 중인지 확인해주세요.');
                }
                 else {
                    setVerificationMessage('인증 중 알 수 없는 오류가 발생했습니다.');
                }
            } else {
                setVerificationMessage('알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    const handleNext = () => {
        // 인증 완료 후 '/input' 페이지로 이동
        navigate('/input'); 
    };

    return (
        <div className="container">
            <div className="header">
                <div className="backbutton" onClick={() => navigate(-1)}>
                    <img src={BackIcon} alt="뒤로가기" />
                </div>
                <div className="headerTitle">회원가입</div>
            </div>
            <div className="content">
                <div className="mainTitle">
                    본인 확인을 위해<br />정보를 입력해주세요
                </div>

                <div className="inputGroup">
                    <label className="label">이름</label>
                    <input
                        type="text"
                        className="inputField"
                        placeholder="홍길동"
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>

                <div className="inputGroup">
                    <label className="label">전화번호</label>
                    <div className="phoneInputContainer">
                        <input
                            type="tel"
                            className="inputField"
                            placeholder="010-1234-5678"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            disabled={isCodeSent}
                        />
                        <button
                            className="sendButton"
                            onClick={handleSendCode}
                            disabled={isSendButtonDisabled || isCodeSent}
                        >
                            <img src={isSendButtonDisabled || isCodeSent ? SendButton : ActiveSendButton} alt="보내기" />
                        </button>
                    </div>
                </div>

                {isCodeSent && (
                    <div className="verificationSection">
                        <div className="timer">{formatTimer(timer)}</div>
                        <div className="verificationInputContainer">
                            <input
                                type="text"
                                className="inputField"
                                placeholder="인증하기"
                                value={authCode}
                                onChange={handleAuthCodeChange}
                                disabled={isVerified}
                            />
                            <button
                                className="certButton"
                                onClick={handleVerifyCode}
                                disabled={isVerifyButtonDisabled || isVerified}
                            >
                                <img src={isVerifyButtonDisabled || isVerified ? CertButton : ActiveCertButton} alt="인증" />
                            </button>
                        </div>
                        {verificationMessage && ( // 메시지 상태가 있을 때만 표시
                            <div className={`verificationMessage ${isVerified ? 'success' : 'failure'}`}>
                                {verificationMessage}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <button
                className="nextButton"
                onClick={handleNext}
                disabled={!isVerified}
            >
                <img
                    src={isVerified ? ActiveNextButton : NextButton}
                    alt="다음 버튼"
                />
            </button>
        </div>
    );
};

export default RegisterPage;
