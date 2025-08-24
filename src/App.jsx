import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JoinPage from './pages/JoinPage';
import VerifyPage from './pages/VerifyPage';
import LoginPage from './pages/LoginPage';
import NameInputPage from './pages/NameInputPage';
import BirthdayInputPage from './pages/BirthdayInputPage';
import GenderInputPage from './pages/GenderInputPage';
import AddressInputPage from './pages/AddressInputPage';
import FamilyInputPage from './pages/FamilyInputPage';
import SalaryInputPage from './pages/SalaryInputPage';
import HireInputPage from './pages/HireInputPage';
import AdditionalInputPage from './pages/AdditionalInputPage';
import AdditionalTypeInputPage from './pages/AdditionalTypeInputPage';
import DisabilityPage from './pages/DisabilityPage';
import DisabilityGradePage from './pages/DisabilityGradePage';
import DisabilityTypePage from './pages/DisabilityTypePage';
import AgedPage from './pages/AgedPage';
import AgedAlonePage from './pages/AgedAlonePage';
import AgedAdditionalPage from './pages/AgedAdditionalPage';
import MyPage from './pages/MyPage';
import ChangeMyInfoPage from './pages/ChangeMyInfoPage';
import { AdditionalProvider } from './context/AdditionalContext';
import FindPage from './pages/FindPage';
import SettingPage from './pages/SettingPage';
import NaverCallback from './pages/NaverCallback';


function App() {
  return (
    <Router>
      <AdditionalProvider>
      <Routes>
        <Route path="/join" element={<JoinPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/nameinput" element={<NameInputPage />} />
        <Route path="/birthdayinput" element={<BirthdayInputPage />} />
        <Route path="/genderinput" element={<GenderInputPage />} />
        <Route path="/addressinput" element={<AddressInputPage />} />
        <Route path="/familyinput" element={<FamilyInputPage />} />
        <Route path="/salaryinput" element={<SalaryInputPage />} />
        <Route path="/hireinput" element={<HireInputPage />} />
        <Route path="/additionalinput" element={<AdditionalInputPage />} />
        <Route path="/additionaltypeinput" element={<AdditionalTypeInputPage />} />
        <Route path="/disability" element={<DisabilityPage />} />
        <Route path="/disabilitygrade" element={<DisabilityGradePage />} />
        <Route path="/disabilitytype" element={<DisabilityTypePage />} />
        <Route path="/aged" element={<AgedPage />} />
        <Route path="/agedalone" element={<AgedAlonePage />} />
        <Route path="/agedadditional" element={<AgedAdditionalPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/changemyinfo" element={<ChangeMyInfoPage />} />
        <Route path="/find" element={<FindPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/naver/callback" element={<NaverCallback />} />
      </Routes>
      </AdditionalProvider>
    </Router>
  );
}

export default App;