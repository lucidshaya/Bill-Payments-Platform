// route/payments.js
import express from 'express';
import { purchaseAirtime, purchaseElectricity, initiateDataPayment, verifyTransaction } from '../controllers/paymentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/airtime/purchase', purchaseAirtime);
router.post('/electricity/purchase', authMiddleware, purchaseElectricity);
router.post('/data/initiate', initiateDataPayment);
router.post('/verify', verifyTransaction);

export default router;