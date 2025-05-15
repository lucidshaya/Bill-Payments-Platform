import express from 'express';
import { signup, login,forgotPassword} from '../controller/authController.js';



const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);



// Forgot Password - Send OTP

export default router;
