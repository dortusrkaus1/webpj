import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import VerificationFailed from './pages/VerificationFailed';
import './App.css';  // 스타일 적용

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verification-failed" element={<VerificationFailed />} />
          </Routes>
        </header>
      </Router>
    </div>
  );
}

export default App;
