// src/contexts/SettingsContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(() => {
    // 로컬 스토리지에서 폰트 크기 불러오기 (사용자별 저장)
    const savedFontSize = localStorage.getItem('fontSize');
    return savedFontSize ? parseInt(savedFontSize, 10) : 16; // 기본값 16px
  });

  // 폰트 크기가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);

  return (
    <SettingsContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);