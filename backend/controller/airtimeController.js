import Paystack from 'paystack-api';
import Transaction from '../model/Transaction.js';

const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);

export const purchaseAirtime = async (req, res) => {
  try {
    const { phoneNumber, amount, network } = req.body;
    const reference = `airtime-${Date.now()}`;

    const transaction = await paystack.transaction.initialize({
      amount: amount * 100, // Paystack expects kobo
      email: req.user.email,
      reference,
      metadata: { service: 'airtime', network, phoneNumber },
    });
console.log(await paystack.transaction.initialize({
  amount: 1000 * 100,
  email: 'test@example.com',
  reference: 'test-ref'
}));
    if (transaction.status) {
      await Transaction.create({
        userId: req.user.id,
        service: 'airtime',
        amount,
        status: 'success', // Simulate success; verify with webhook in production
        reference,
      });
      res.status(200).json({ message: 'Airtime purchase initiated', data: transaction.data });
    } else {
      res.status(400).json({ message: 'Payment initialization failed', data: transaction });
    }
  } catch (error) {
    res.status(500).json({ message: 'Airtime purchase failed', error: error.message });
  }
};
