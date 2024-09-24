import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./pages/signup/SignUp";
import VerificationFailed from "./pages/verificationfailed/VerificationFailed";
import Login from "./pages/login/Login";
import Verify from "./pages/verify/VerifyCode";
import "./App.css"; // 스타일 적용
import Profile from "./pages/profile/Profile";

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
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </header>
      </Router>
    </div>
  );

}

export default App;
