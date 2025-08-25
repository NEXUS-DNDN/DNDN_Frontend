// src/pages/NaverCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NaverCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code'); // 네이버로부터 받은 인가 코드
    const state = params.get('state'); // 네이버로부터 받은 state 값

    if (code) {
      // ⭐ 인가 코드를 백엔드로 보내 토큰 교환 요청
      fetch('https://nexusdndn.duckdns.org/auth/login/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginType: 'NAVER', code, state }) // 백엔드에 인가 코드와 state 전달
      })
        .then((res) => {
          if (!res.ok) {
            // 서버 응답이 OK가 아니면 에러 발생 및 백엔드 메시지 확인
            return res.json().then(errorData => {
                throw new Error(errorData.message || `네이버 로그인 API 실패: ${res.status}`);
            });
          }
          return res.json();
        })
        .then((data) => {
          console.log("✅ 백엔드 응답 (Naver):", data); // 백엔드 응답 전체 로그

          // ⭐ 백엔드 응답 구조에 맞춰 accessToken과 refreshToken 추출
          const accessToken = data.result?.accessToken;
          const refreshToken = data.result?.refreshToken;
          const currentUser = data.result || {}; // 사용자 정보 객체

          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken); // refreshToken도 저장
            localStorage.setItem('userInfo', JSON.stringify(currentUser)); // 사용자 정보 저장
          } else {
              console.error("백엔드 응답에 accessToken이 없습니다:", data);
              throw new Error('네이버 로그인 실패: 유효한 토큰을 받지 못했습니다.');
          }
          
          // ⭐ 사용자 정보에 따라 라우팅
          if (currentUser.newUser) { // 백엔드가 신규 유저 여부를 알려주는 경우
            navigate('/register'); // 신규 유저면 추가 정보 입력 페이지로
          } else if (currentUser.name && currentUser.phoneNumber) { // 기존 유저이면서 필수 정보가 있다면
            navigate('/mainpage'); // 메인 페이지로 이동
          } else {
            navigate('/register'); // 기존 유저라도 정보가 불완전하면 추가 정보 입력 페이지로
          }
        })
        .catch((err) => {
          console.error('❌ 네이버 로그인 backend 연동 실패', err);
          alert(`네이버 로그인 중 오류가 발생했습니다: ${err.message}`);
          navigate('/login'); // 실패 시 로그인 페이지로
        });
    } else {
        console.error('네이버로부터 인가 코드를 받지 못했습니다.');
        alert('네이버 로그인 요청에 문제가 발생했습니다.');
        navigate('/login');
    }
  }, [navigate]);

  return <div>네이버 로그인 처리중...</div>;
};

export default NaverCallback;
