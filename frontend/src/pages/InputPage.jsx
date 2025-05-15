import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function InputPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [network, setNetwork] = useState('Airtel'); // Default network
  const [purchaseType, setPurchaseType] = useState('airtime'); // Default to airtime
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Retrieve authentication token from local storage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated. Please log in.');
      }

      // Prepare data for the backend
      const purchaseData = {
        phoneNumber,
        amount,
        network,
      };

      // Make API call to the backend
      const response = await axios.post(
        'http://localhost:5000/api/airtime/purchase', // Adjust URL as needed
        purchaseData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
        }
      );

      // Redirect to PayStack payment URL
      const paymentUrl = response.data.data.authorization_url;
      window.location.href = paymentUrl;
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
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your number"
              required
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="network" className="block text-sm font-medium mb-2">
              Choose Your Network
            </label>
            <select
              id="network"
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Airtel">Airtel</option>
              <option value="MTN">MTN</option>
              <option value="9mobile">9mobile</option>
              <option value="Glo">Glo</option>
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
              <option value="airtime">Airtime</option>
              <option value="data">Data</option>
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