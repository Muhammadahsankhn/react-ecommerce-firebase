import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginSignup from './components/Auth/Login/LoginSignup';
import Home from './components/Home/Home'; // 👈 Create this component
import Cart from './components/Home/Cart';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cart" element={<Cart />} />

    </Routes>
  );
};

export default App;
