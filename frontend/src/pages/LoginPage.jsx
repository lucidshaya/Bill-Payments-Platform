import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [resetStep, setResetStep] = useState('enter_email');
  const [resetEmail, setResetEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
 /* 
 State Management

The component uses several state variables:

    email and password: Store login form inputs.
    isResetting: Toggles between login and password reset modes (false for login, true for reset).
    resetStep: Tracks the password reset stage (enter_email, enter_otp, or success).
    resetEmail, otp, and newPassword: Store inputs for the password reset process.
 */


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password, // Sends a POST request to http://localhost:5000/api/auth/login with email and password.
      }); 
      localStorage.setItem('token', response.data.token); // On success: Stores the token in localStorage, shows a "Welcome back!" toast, and navigates to / after a 1-second delay.
      toast.success('Welcome back!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate('/');
      }, 1000); // Delay navigation to show toast
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials.');
    }
  };
    /* 
    UI Structure

The UI adapts based on isResetting and resetStep:

    Login Mode (isResetting === false):
        Displays a form with email and password fields.
        Includes a "Login" button, a "Sign up" link, and a "Forgot Password?" link to toggle isResetting.
    Password Reset Mode (isResetting === true):
        Step 1 (enter_email): Form to enter resetEmail and a "Send OTP" button.
        Step 2 (enter_otp): Form to enter otp and newPassword with a "Reset Password" button.
        Step 3 (success): Success message and a "Go to Login" button to return to login mode.
    */
   
  const handleSendOtp = async (e) => { // Initiates password reset by sending a POST request to http://localhost:5000/api/auth/
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email: resetEmail });
      toast.success('OTP sent to your email.');
      setResetStep('enter_otp');
    } catch (error) {
      console.error('Failed to send OTP:', error);
      toast.error('Failed to send OTP. Please try again.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/reset-password', {
        email: resetEmail,
        otp,
        newPassword,
      });
      toast.success('Password reset successfully.');
      setResetStep('success');
    } catch (error) {
      console.error('Failed to reset password:', error);
      toast.error('Failed to reset password. Please check your OTP.');
    }
  };

  if (isResetting) {
    if (resetStep === 'enter_email') {
      return (
        <div className="bg-black min-h-screen text-white flex items-center justify-center">
          <div className="w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6">Reset Password</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="reset-email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="reset-email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleSendOtp}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Send OTP
              </button>
            </div>
            <button
              onClick={() => setIsResetting(false)}
              className="mt-4 text-blue-400 hover:text-blue-300 underline"
            >
              Back to Login
            </button>
          </div>
          <ToastContainer />
        </div>
      );
    } else if (resetStep === 'enter_otp') {
      return (
        <div className="bg-black min-h-screen text-white flex items-center justify-center">
          <div className="w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6">Enter OTP and New Password</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium mb-2">
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  required
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleResetPassword}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Reset Password
              </button>
            </div>
            <button
              onClick={() => setIsResetting(false)}
              className="mt-4 text-blue-400 hover:text-blue-300 underline"
            >
              Back to Login
            </button>
          </div>
          <ToastContainer />
        </div>
      );
    } else if (resetStep === 'success') {
      return (
        <div className="bg-black min-h-screen text-white flex items-center justify-center">
          <div className="w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6">Password Reset Successful</h2>
            <p className="text-center">Your password has been reset. You can now login with your new password.</p>
            <button
              onClick={() => setIsResetting(false)}
              className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Go to Login
            </button>
          </div>
          <ToastContainer />
        </div>
      );
    }
  }

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Login
          </button>
        </div>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-400 hover:text-blue-300 underline">
            Sign up
          </a>
        </p>
        <p className="mt-2 text-center text-sm">
          <a href="#" onClick={() => setIsResetting(true)} className="text-blue-400 hover:text-blue-300 underline">
            Forgot Password?
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;