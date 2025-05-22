import express from 'express';
import { purchaseAirtime } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/purchase', purchaseAirtime);

export default router;
