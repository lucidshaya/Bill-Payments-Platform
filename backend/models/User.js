import pool from '../config/database.js';

class User {
  static async create({ username, email, password }) {
    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [username, email, password];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }

  static async updatePassword(email, newPassword) {
    const query = 'UPDATE users SET password = $1 WHERE email = $2 RETURNING *';
    const values = [newPassword, email];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

export default User;