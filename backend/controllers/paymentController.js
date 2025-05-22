// controller/paymentController.js
import Paystack from 'paystack-api';
import dotenv from 'dotenv';
import Transaction from '../models/Transaction.js';
import { purchaseAirtime as providerPurchaseAirtime, purchaseData, purchaseElectricity as providerPurchaseElectricity, checkWalletBalance } from '../services/paygoldService.js';

dotenv.config();
const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);

export const purchaseAirtime = async (req, res) => {
  try {
    const { phoneNumber, amount, network, email } = req.body;
    if (!phoneNumber || !amount || !network || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const reference = `airtime-${Date.now()}`;

    const transaction = await paystack.transaction.initialize({
      amount: amount * 100, // Paystack expects kobo
      email,
      reference,
      metadata: { service: 'airtime', network, phoneNumber },
    });

    if (transaction.status) {
      await Transaction.create({
        userId: req.user?.id || null, // Allow unauthenticated purchases
        service: 'airtime',
        amount,
        status: 'pending',
        reference,
        metadata: { phoneNumber, network },
      });
      res.status(200).json({ message: 'Airtime purchase initiated', data: transaction.data });
    } else {
      res.status(400).json({ message: 'Payment initialization failed', data: transaction });
    }
  } catch (error) {
    res.status(500).json({ message: 'Airtime purchase failed', error: error.message });
  }
};

export const purchaseElectricity = async (req, res) => {
  try {
    const { meterNumber, amount, provider, meterType } = req.body;
    if (!meterNumber || !amount || !provider || !meterType) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const reference = `electricity-${Date.now()}`;

    const transaction = await paystack.transaction.initialize({
      amount: amount * 100,
      email: req.user.email,
      reference,
      metadata: { service: 'electricity', meterNumber, provider, meter_type: meterType },
    });

    if (transaction.status) {
      await Transaction.create({
        userId: req.user.id,
        service: 'electricity',
        amount,
        status: 'pending',
        reference,
        metadata: { meterNumber, provider, meter_type: meterType },
      });
      res.status(200).json({ message: 'Electricity payment initiated', data: transaction.data });
    } else {
      res.status(400).json({ message: 'Payment initialization failed', data: transaction });
    }
  } catch (error) {
    res.status(500).json({ message: 'Electricity payment failed', error: error.message });
  }
};

export const initiateDataPayment = async (req, res) => {
  const { phoneNumber, planCode, email, networkId } = req.body;

  if (!phoneNumber || !planCode || !email || !networkId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const plan = { amount: 500 }; // Replace with actual plan lookup based on planCode
    const amount = plan.amount;
    const reference = `data-${Date.now()}-${phoneNumber}`;

    const transaction = await paystack.transaction.initialize({
      amount: amount * 100,
      email,
      reference,
      metadata: { service: 'data', phoneNumber, planCode, network_id: networkId },
    });

    if (!transaction.status) {
      return res.status(400).json({ message: 'Payment initialization failed' });
    }

    await Transaction.create({
      userId: req.user?.id || null, // Allow unauthenticated
      service: 'data',
      amount,
      status: 'pending',
      reference,
      metadata: { phoneNumber, planCode, network_id: networkId },
    });

    res.json({ data: transaction.data });
  } catch (error) {
    res.status(500).json({ message: 'Payment initiation failed', error: error.message });
  }
};

export const verifyTransaction = async (req, res) => {
  const { reference } = req.body;

  if (!reference) {
    return res.status(400).json({ message: 'Reference is required' });
  }

  try {
    const verification = await paystack.transaction.verify({ reference });

    if (verification.data.status === 'success') {
      const transaction = await Transaction.findOne({ reference });
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }

      const balance = await checkWalletBalance();
      if (balance.code !== 'success' || balance.data.balance < transaction.amount) {
        await Transaction.updateOne({ reference }, { status: 'activation_failed' });
        return res.status(503).json({
          message: 'Payment successful but activation failed due to insufficient wallet balance',
          details: `Current balance: ₦${balance.data.balance}`,
        });
      }

      let activationResult;
      switch (transaction.service) {
        case 'airtime':
          activationResult = await providerPurchaseAirtime({
            phone: transaction.metadata.phoneNumber,
            network_id: transaction.metadata.network,
            amount: transaction.amount,
          });
          break;
        case 'data':
          activationResult = await purchaseData({
            phone: transaction.metadata.phoneNumber,
            network_id: transaction.metadata.network_id,
            variation_id: transaction.metadata.planCode,
          });
          break;
        case 'electricity':
          activationResult = await providerPurchaseElectricity({
            meter_number: transaction.metadata.meterNumber,
            disco: transaction.metadata.provider,
            amount: transaction.amount,
            meter_type: transaction.metadata.meter_type,
          });
          break;
        default:
          return res.status(400).json({ message: 'Invalid service type' });
      }

      if (activationResult.code === 'success') {
        await Transaction.updateOne({ reference }, { status: 'success' });
        res.json({ message: 'Payment and activation successful', data: verification.data, activation: activationResult.data });
      } else {
        await Transaction.updateOne({ reference }, { status: 'activation_failed' });
        res.status(500).json({ message: 'Payment successful but activation failed', details: activationResult.message });
      }
    } else {
      await Transaction.updateOne({ reference }, { status: 'failed' });
      res.status(400).json({ message: 'Payment failed', data: verification.data });
    }
  } catch (error) {
    res.status(500).json({ message: 'Verification failed', error: error.message });
  }
};

