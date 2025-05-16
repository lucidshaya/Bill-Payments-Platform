import { Link } from 'react-router-dom';

function PaymentSuccess() {
  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
        <p>Your transaction was completed successfully.</p>
        <Link
          to="/"
          className="mt-4 inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;