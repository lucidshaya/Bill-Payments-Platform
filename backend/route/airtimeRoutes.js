import express from 'express';
import { purchaseAirtime } from '../controller/airtimeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/purchase', authMiddleware, purchaseAirtime);

export default router;