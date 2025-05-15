import pool from '../config/database.js';

class Transaction {
  static async create({ userId, service, amount, status, reference }) {
    const query = 'INSERT INTO transactions (user_id, service, amount, status, reference) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [userId, service, amount, status, reference];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

export default Transaction;