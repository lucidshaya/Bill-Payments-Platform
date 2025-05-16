import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import InputPage from './pages/InputPage';
// import ElectricityPage from './pages/ElectricityPage'; // New page
import ElectricityPage from './pages/ElectricityPage';
import PaymentSuccess from './pages/PaymentSucess'; // Fixed typo
import PaymentFailed from './pages/PaymentFailed';
import Navbar from './components/Navbar';
import ComingSoon from './pages/ComingSoon'; // Fixed casing
import Footer from './components/Footer';
import axios from 'axios';
import cors from 'cors';

// const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <hr />
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
        <Route path="/signup" element={<SignupPage onSignup={handleLogin} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/input" element={<InputPage isLoggedIn={isLoggedIn} />} />
        <Route
          path="/electricity"
          element={isLoggedIn ? <ElectricityPage />: <Navigate to="/login" replace />}
        />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/comingsoon" element={<ComingSoon />} />
      </Routes>
      <hr />
      <Footer />
    </Router>
  );
}

export default App;