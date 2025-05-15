import Paystack from 'paystack-api';
import Transaction from '../model/Transaction.js';

const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);

export const payElectricity = async (req, res) => {
  try {
    const { meterNumber, amount, provider } = req.body;
    const reference = `electricity-${Date.now()}`;

    const transaction = await paystack.transaction.initialize({
      amount: amount * 100,
      email: req.user.email,
      reference,
      metadata: { service: 'electricity', meterNumber, provider },
    });

    if (transaction.status) {
      await Transaction.create({
        userId: req.user.id,
        service: 'electricity',
        amount,
        status: 'success',
        reference,
      });
      res.status(200).json({ message: 'Electricity payment initiated', data: transaction.data });
    } else {
      res.status(400).json({ message: 'Payment initialization failed', data: transaction });
    }
  } catch (error) {
    res.status(500).json({ message: 'Electricity payment failed', error: error.message });
  }
};