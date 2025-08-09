import { useState } from 'react';

export const useLoginState = () => {
  const [isChecked, setIsChecked] = useState(() => {
    // 로컬 스토리지에서 초기값 로드
    return localStorage.getItem('isLoginPersistent') === 'true';
  });

  const handleCheckboxClick = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    localStorage.setItem('isLoginPersistent', newCheckedState);
  };

  return { isChecked, handleCheckboxClick };
};