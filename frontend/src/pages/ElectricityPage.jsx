import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* Observations and Suggestions

    Environment Variables:
        The component uses process.env.REACT_APP_PAYSTACK_PUBLIC_KEY and process.env.REACT_APP_API_URL, which should be defined in a .env file for security and configurability (e.g., REACT_APP_PAYSTACK_PUBLIC_KEY=pk_test_xxx).
    Security:
        The token is stored in localStorage, which is vulnerable to XSS attacks. Consider using HttpOnly cookies for better security.
        The Paystack public key is securely handled via an environment variable.
    Input Validation:
        The form uses the required attribute, but lacks additional validation (e.g., ensuring meterNumber is numeric or amount is positive).
        Suggestion: Add client-side validation (e.g., regex for meter number) or use a library like react-hook-form.
    Error Handling:
        Errors are caught and displayed as generic toasts ("Payment initiation failed.", "Payment verification failed.").
        Suggestion: Parse error responses from the backend to provide specific feedback (e.g., "Invalid meter number").
    Loading States:
        The component does not disable the form or show a loading indicator during API requests, risking multiple submissions.
        Suggestion: Add a loading state to disable the button and display a spinner.
    User Experience:
        Real-time input validation or a confirmation step before payment could enhance usability.*/

function ElectricityPage() {
  const [meterNumber, setMeterNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [provider, setProvider] = useState('IKEJA');
  const navigate = useNavigate();
  /* 
  The component uses three state variables managed with the useState hook:

    meterNumber: Stores the user's meter number, initialized as an empty string.
    amount: Stores the payment amount in Naira, initialized as an empty string.
    provider: Stores the selected electricity provider, defaulting to 'IKEJA'.
  */

  const handlePaystackPayment = (reference, amount, email) => { // This function sets up and opens the Paystack payment popup:
    /* 
    reference: A unique transaction reference provided by the backend.
    amount: The payment amount in Naira.
    email: The user's email for payment confirmation.
    */
    const handler = window.PaystackPop.setup({
      key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
      email,
      amount: amount * 100,
      ref: reference,
      callback: async (response) => {
        try {
          const verifyResponse = await axios.post(
            `${process.env.REACT_APP_API_URL}/verify`,
            { reference: response.reference }
          );
          toast.success('Payment successful!');
          navigate('/payment-success');
        } catch (error) {
          toast.error('Payment verification failed.');
          navigate('/payment-failed');
        }
      },
      onClose: () => {
        toast.info('Payment cancelled.');
        navigate('/payment-failed');
      },
    });
    handler.openIframe(); // Calls handler.openIframe() to display the Paystack payment popup.
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to proceed.');
        navigate('/login');
        return;
      }
      const purchaseData = { meterNumber, amount, provider };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/electricity/purchase`,
        purchaseData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { reference, email } = response.data.data;
      handlePaystackPayment(reference, amount, email);
    } catch (error) {
      console.error('Electricity payment failed:', error);
      toast.error('Payment initiation failed.');
      navigate('/payment-failed');
    }
  };

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Electricity Purchase</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="meterNumber" className="block text-sm font-medium mb-2">
              Meter Number
            </label>
            <input
              type="text"
              id="meterNumber"
              value={meterNumber}
              onChange={(e) => setMeterNumber(e.target.value)}
              placeholder="Enter your meter number"
              required
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="provider" className="block text-sm font-medium mb-2">
              Provider
            </label>
            <select
              id="provider"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="IKEJA">IKEJA Electric</option>
              <option value="EKEDC">EKEDC</option>
              <option value="KEDCO">KEDCO</option>
            </select>
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-2">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Pay Now
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default ElectricityPage;