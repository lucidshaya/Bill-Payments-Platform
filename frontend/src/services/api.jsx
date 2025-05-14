import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const login = (email, password) =>
  api.post('/auth/login', { email, password });
export const signup = (email, password) =>
  api.post('/auth/signup', { email, password });
export const getBillOptions = () => api.get('/bill-options');
export const initiatePayment = (data) => api.post('/payment/pay', data);