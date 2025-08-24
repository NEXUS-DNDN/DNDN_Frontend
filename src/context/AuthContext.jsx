import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // 1. 컴포넌트가 처음 마운트될 때, 로컬 스토리지에서 토큰을 불러옵니다.
    // 이렇게 하면 앱을 새로고침해도 로그인 상태가 유지됩니다.
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  // 2. 로그인 함수. 이 함수를 호출하면 토큰이 상태와 로컬 스토리지에 저장됩니다.
  const login = (token) => {
    setAccessToken(token);
    localStorage.setItem('accessToken', token);
  };

  // 3. 로그아웃 함수. 토큰을 상태와 로컬 스토리지에서 제거합니다.
  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem('accessToken');
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};