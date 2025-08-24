// src/pages/NaverCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NaverCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');

    if (code) {
      fetch('https://nexusdndn.duckdns.org/auth/login/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginType: 'NAVER', code, state })
      })
        .then((res) => {
          if (!res.ok) throw new Error('네이버 로그인 API 실패');
          return res.json();
        })
        .then((data) => {
          console.log("✅ 백엔드 응답:", data);

          // 👉 백엔드가 내려주는 필드 기준으로 accessToken 사용
          if (data.accessToken) {
            localStorage.setItem('token', data.accessToken);
          }

          // 👉 사용자 정보 가공 (백엔드 응답 구조 맞게 수정)
          const currentUser = {
            name: data.name || "미입력",
            phoneNumber: data.phoneNumber || "미입력",
            profileImageUrl: data.profileImageUrl || null
          };
          localStorage.setItem('userInfo', JSON.stringify(currentUser));

          // 👉 이름/전화번호 입력 여부에 따라 라우팅
          if (currentUser.name !== "미입력" && currentUser.phoneNumber !== "미입력") {
            navigate('/main');
          } else {
            navigate('/nameinput');
          }
        })
        .catch((err) => {
          console.error('❌ 네이버 로그인 backend 연동 실패', err);
          alert('로그인 중 오류가 발생했습니다.');
          navigate('/login'); // 실패 시 로그인 페이지로
        });
    }
  }, [navigate]);

  return <div>네이버 로그인 처리중...</div>;
};

export default NaverCallback;