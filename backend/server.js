import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import pool from './config/database.js';
import authRoutes from './route/authRoutes.js';
import airtimeRoutes from './route/airtimeRoutes.js';
import paymentRoutes from './route/paymentsRoute.js';

const app = express();
app.use(cors());

// app.use(cors({ origin: ['https://your-frontend.onrender.com', 'http://localhost:5173'] }));
app.use(express.json());
// app.get('https://bill-payments-platform5.onrender.com/api/health')
app.use('/api/auth', authRoutes);
app.use('/api/airtime', airtimeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', paymentRoutes);


console.log('JWT_SECRET:', process.env.JWT_SECRET); // Debug

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));