import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import InputPage from './pages/InputPage';
import ElectricityPage from './pages/ElectricityPage';
import PaymentSuccess from './pages/PaymentSucess'; // Fixed typo
import PaymentFailed from './pages/PaymentFailed';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });


/*              Authentication Flow:

    Users sign up (/signup) or log in (/login), triggering handleLogin.
    Logged-in users can access /electricity; others are redirected to /login.
    Logging out via handleLogout clears the token and updates the state.

    ---Improvements to make 
   *  Security: Storing tokens in localStorage is common but vulnerable to XSS attacks. Consider HttpOnly cookies if your backend supports them.
   *  Payment Pages: /payment-success and /payment-failed are public. You might want to protect them or pass transaction data to ensure they’re accessed appropriately.
   *  Token Validation: The app only checks if a token exists. Add expiration checks or validation for better security.

*/


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // if user is logged in. initially set to false 

  useEffect(() => {
    const token = localStorage.getItem('token'); // Checks localStorage for a token (typically set after a successful login).
    if (token) {
      setIsLoggedIn(true); // If a token exists, sets isLoggedIn to true.
    }
  }, []);
  
  const handleLogin = () => setIsLoggedIn(true); // Called when the user logs in or signs up successfully, setting isLoggedIn to true.
  const handleLogout = () => { // Removes the token from localStorage and sets isLoggedIn to false.
    localStorage.removeItem('token'); 
    setIsLoggedIn(false);
  };
  // isLoggedIn -> for if the user is logged in 
  // setIsLoggedIn -> default on false
  // handleLogin -> logs in or signs up 
  // handleLogout -> removes the token from local storage   

  return (
    // The Router component wraps the app’s content to enable navigation:
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} /> 
      {/* the navbar if the user is logged in and logout btn handle logout remove the token and logout */}
      <hr />
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
        {/* on the home page if the user is logged in  */}
        <Route path="/signup" element={<SignupPage onSignup={handleLogin} />} />
        {/* handleLogin handles the login or signup tokens */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        {/* handleLogin handles the login or signup tokens */}
        <Route path="/input" element={<InputPage isLoggedIn={isLoggedIn} />} />
        {/* page will be accessed if the user is logged in  */}
        <Route
          path="/electricity"
          element={isLoggedIn ? <ElectricityPage />: <Navigate to="/login" replace />}
        />
        {/* Checks isLoggedIn:

    If true, renders ElectricityPage.
    If false, redirects to /login using Navigate (with replace to avoid adding to browser history). */}

        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />

      </Routes>
      <hr />
      <Footer />
    </Router>
  );
}

export default App;