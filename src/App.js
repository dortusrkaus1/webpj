import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./pages/signup/SignUp";
import VerificationFailed from "./pages/verificationfailed/VerificationFailed";
import Login from "./pages/login/Login";
import Verify from "./pages/verify/VerifyCode";
import ProfileRegister from "./pages/profile/ProfileRegister";
import ProfileUpdate from "./pages/profile/ProfileUpdate";
import "./App.css"; // 스타일 적용

function App() {


  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verification-failed" element={<VerificationFailed />} />
            <Route path="/verify-code" element={<Verify />} />
            <Route path="/profile-register" element={<ProfileRegister />} />
            <Route path="/profile-update" element={<ProfileUpdate />} />
          </Routes>
        </header>
      </Router>
    </div>
  );
}

export default App;
