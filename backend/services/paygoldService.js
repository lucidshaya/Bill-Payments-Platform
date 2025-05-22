// service/paygoldService.js
import dotenv from 'dotenv';

dotenv.config();

const PAYGOLD_BASE_URL = 'https://paygold.ng/wp-json/api/v1';

const makePaygoldRequest = async (endpoint, params) => {
  const url = new URL(`${PAYGOLD_BASE_URL}/${endpoint}`);
  url.searchParams.append('username', process.env.PAYGOLD_USERNAME);
  url.searchParams.append('password', process.env.PAYGOLD_PASSWORD);
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));

  const response = await fetch(url, { method: 'GET' });
  if (!response.ok) {
    throw new Error(`Paygold API error: ${response.statusText}`);
  }
  const result = await response.json();
  return result;
};

export const checkWalletBalance = async () => {
  return makePaygoldRequest('balance', {});
};

export const purchaseAirtime = async ({ phone, network_id, amount }) => {
  return makePaygoldRequest('airtime', { phone, network_id, amount });
};

export const purchaseData = async ({ phone, network_id, variation_id }) => {
  return makePaygoldRequest('data', { phone, network_id, variation_id });
};

export const purchaseElectricity = async ({ meter_number, disco, amount, meter_type }) => {
  return makePaygoldRequest('electricity', { meter_number, disco, amount, meter_type });
};

export const verifyCustomer = async ({ customer_id, service_type, disco }) => {
  return makePaygoldRequest('verify-customer', { customer_id, service_type, disco });
};