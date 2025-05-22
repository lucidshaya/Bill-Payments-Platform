import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
 /* 
  improvements 
  6. Observations and Suggestions

    Development vs. Production:
        The API URL (http://localhost:5000) is suitable for development but must be replaced with a production domain (e.g., https://api.example.com) in a live environment.
    Security:
        The Paystack public key is correctly stored in an environment variable, adhering to security best practices.
        Ensure the backend sanitizes and validates inputs to prevent vulnerabilities (e.g., SQL injection).
    Input Validation:
        The phone number field has numeric validation, but additional checks (e.g., email format, required fields) could be added client-side before submission.
    Error Handling:
        Generic error messages ("Payment initiation failed", "Verification failed") could be made more specific (e.g., "Invalid phone number" or "Network error") based on the backend response.
    Accessibility:
        Form fields have labels, which is good for accessibility. Consider adding ARIA attributes or ensuring keyboard navigation works seamlessly.
    User Experience:
        While the loading state updates the button, disabling form fields during processing could prevent unintended changes.
 
 */
const InputPage = () => {
  /* 
  phoneNumber: The phone number to receive the data plan.
  planCode: The selected data plan.
  email: The user's email for payment confirmation.
  networkId: The selected network provider.
  */

  const [formData, setFormData] = useState({
    phoneNumber: '',
    planCode: '',
    email: '',
    networkId: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* 
  The component renders a form that collects user input for purchasing a data plan. 
  The handleChange function updates the formData state whenever the user interacts with the form fields:
  */


  const initiatePayment = async (e) => {
    e.preventDefault(); // stops the default form submission behavior, allowing custom handling.
    setLoading(true);  // updates the UI to indicate that the payment is being processed (e.g., changing the button text to "Processing..." and disabling the button).

    try {
      const response = await axios.post('http://localhost:5000/api/data/initiate', formData); // Sends a POST request to http://localhost:5000/api/verify with the payment reference to confirm the transaction
      const { reference } = response.data.data; // A unique identifier for the payment.

      const handler = window.PaystackPop.setup({
        key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
        email: formData.email,
        amount: response.data.data.amount,  // The payment amount from the backend response.
        ref: reference, // The payment reference from the backend response.
        callback: async (response) => { // An async function triggered when the payment is completed successfully.
          try {
            const verifyResponse = await axios.post('http://localhost:5000/api/verify', {
              reference: response.reference,
            });
            toast.success(verifyResponse.data.message);
            navigate('/success');
          } catch (error) {
            toast.error('Verification failed');
            navigate('/failed');
          }
        },
        onClose: () => { // A function triggered if the payment window is closed without completion.
          toast.info('Payment window closed'); // Displays an info toast with "Payment window closed".
          setLoading(false); 
          navigate('/failed');
        },
      });
      handler.openIframe(); // opens the Paystack payment popup for the user to enter their payment details.
    } catch (error) {
      toast.error('Payment initiation failed');
      setLoading(false);
    }
  };
  /* 
  . UI and User Experience

The component renders a centered form within a styled container:

    Container: A div with a dark background (bg-gray-900), centered using Flexbox, and containing a form card (bg-gray-800).
    Form: Includes labeled input fields and dropdowns, styled with Tailwind CSS for a modern, responsive design.
    Submit Button: A "Pay Now" button that:
        Changes to "Processing..." when loading is true.
        Becomes disabled (disabled={loading}) during payment processing.
    Toast Notifications: Rendered via <ToastContainer />, providing feedback on payment success, failure, or cancellation.

The form is user-friendly, with clear labels and a straightforward layout.
  */

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Buy Data Plan</h2>
        <form onSubmit={initiatePayment} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full p-2 bg-gray-700 rounded border border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              pattern="[0-9]*"
              inputMode="numeric"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              required
              className="w-full p-2 bg-gray-700 rounded border border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Network Line</label>
                  <select
              name="networkId"
              value={formData.networkId}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600"
            >
              <option value="">Select a network</option>
              <option value="1">MTN</option>
              <option value="2">Airtel</option>
              <option value="3">Glo</option>
              <option value="4">9Mobile</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Data Plan</label>
            <select
              name="planCode"
              value={formData.planCode}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600"
            >
              <option value="">Select a plan</option>
              <option value="1GB">1GB - ₦500</option>
              <option value="2GB">2GB - ₦1000</option>
              <option value="5GB">5GB - ₦2500</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default InputPage;
