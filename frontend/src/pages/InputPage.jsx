import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { initiatePayment } from '../services/api.jsx';

function InputPage() {
  const [input, setInput] = useState('');
  const [amount, setAmount] = useState('');
  const [dataLine, setDataLine] = useState('line1'); // State for data line selection
  const [purchaseType, setPurchaseType] = useState('line1'); // State for purchase type selection
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await initiatePayment({ identifier: input, amount, dataLine, purchaseType });
      const paymentUrl = response.data.authorization_url;
      window.location.href = paymentUrl; // Redirect to PayStack payment page
    } catch (error) {
      console.error('Payment initiation failed:', error);
      navigate('/payment-failed');
    }
  };

  return (
    <div className="bg-gray min-h-screen text-white flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-gray rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Phone Number</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Your Phone No:
            </label>
            <input
              type="text"
              id="phone"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your number"
              required
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="dataLine" className="block text-sm font-medium mb-2">
              Choose Your Data Line
            </label>
            <select
              id="dataLine"
              value={dataLine}
              onChange={(e) => setDataLine(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="line1">Airtel</option>
              <option value="line3">MTN</option>
              <option value="line2">9mobile</option>
              <option value="line4">Glo</option>
            </select>
          </div>
          <div>
            <label htmlFor="purchaseType" className="block text-sm font-medium mb-2">
              Choose Your Purchase
            </label>
            <select
              id="purchaseType"
              value={purchaseType}
              onChange={(e) => setPurchaseType(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="line1">Data</option>
              <option value="line3">Airtime</option>
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
            PAY NOW
          </button>
        </form>
      </div>
    </div>
  );
}

export default InputPage;