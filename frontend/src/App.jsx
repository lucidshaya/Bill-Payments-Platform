import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import InputPage from './pages/InputPage';
import PaymentSuccess from './pages/PaymentSucess';
import PaymentFailed from './pages/PaymentFailed';
import Navbar from './components/Navbar';
import Comingsoon from './pages/comingsoon';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<LoginPage />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login"element={<LoginPage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/comingsoon" element={<Comingsoon />} />
      </Routes>
    </Router>
  );
}

export default App;