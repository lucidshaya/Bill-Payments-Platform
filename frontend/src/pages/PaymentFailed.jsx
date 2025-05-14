// import Chatbot from '../components/Chatbot';
import { Link } from 'react-router-dom';

function PaymentFailed() {
  return (
    <div>
      <h2>Payment Failed</h2>
      {/* <Chatbot /> */}
      <Link to="/input">Retry Payment</Link>
      <br />
      <Link to="/home">Back to Home</Link>
    </div>
  );
}

export default PaymentFailed;