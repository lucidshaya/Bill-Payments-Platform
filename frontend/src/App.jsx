import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import InputPage from './pages/InputPage';
import PaymentSuccess from './pages/PaymentSucess';
import PaymentFailed from './pages/PaymentFailed';
import Navbar from './components/Navbar';
import Comingsoon from './pages/comingsoon';
import Footer from './components/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <hr />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage onSignup={handleLogin} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/input"
          element={
            isLoggedIn ? <InputPage /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/comingsoon" element={<Comingsoon />} />
      </Routes>
      <hr />
      <Footer />
    </Router>
  );
}

export default App;