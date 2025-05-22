import pool from '../config/database.js';

class Transaction {
  static async create({ userId, service, amount, status, reference, metadata }) {
    const query = `
      INSERT INTO transactions (user_id, service, amount, status, reference, metadata)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [userId || null, service, amount, status, reference, metadata ? JSON.stringify(metadata) : null];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findOne({ reference }) {
    const query = 'SELECT * FROM transactions WHERE reference = $1';
    const { rows } = await pool.query(query, [reference]);
    return rows[0];
  }

  static async updateOne({ reference }, { status }) {
    const query = 'UPDATE transactions SET status = $1 WHERE reference = $2 RETURNING *';
    const values = [status, reference];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

export default Transaction;