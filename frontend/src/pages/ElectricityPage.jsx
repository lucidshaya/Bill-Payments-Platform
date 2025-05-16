import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ElectricityPage() {
  const [meterNumber, setMeterNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [provider, setProvider] = useState('IKEJA'); // Example providers
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const purchaseData = { meterNumber, amount, provider };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/electricity/purchase`,
        purchaseData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const paymentUrl = response.data.data.authorization_url;
      window.location.href = paymentUrl;
    } catch (error) {
      console.error('Electricity payment failed:', error);
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
      </div>
    </div>
  );
}

export default ElectricityPage;