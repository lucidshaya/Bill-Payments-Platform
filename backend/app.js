import express from 'express'; // ES Module import
import cors from 'cors'; // ES Module import
import paymentRoutes from './routes/paymentRoutes.js'; // Adjusted path (no src)

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/payment', paymentRoutes);

export default app; // ES Module export