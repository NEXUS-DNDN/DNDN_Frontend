import React, { createContext, useContext, useState } from 'react';

const AdditionalContext = createContext();

export const AdditionalProvider = ({ children }) => {
  const [additional, setAdditional] = useState([]);
  const [currentStep, setCurrentStep] = useState(null);

  return (
    <AdditionalContext.Provider value={{ additional, setAdditional, currentStep, setCurrentStep }}>
      {children}
    </AdditionalContext.Provider>
  );
};

export const useAdditional = () => useContext(AdditionalContext);