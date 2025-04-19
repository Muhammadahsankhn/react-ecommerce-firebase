import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginSignup from './components/Auth/Login/LoginSignup';
import Home from './components/Home/Home'; // 👈 Create this component

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
