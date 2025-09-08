import { query } from '../config/db';

class User {
  static async getAll() {
    try {
      const result = await query('SELECT id, username, email, full_name, phone, role, created_at FROM users ORDER BY created_at DESC');
      return result.rows;
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }

  static async getById(id) {
    try {
      const result = await query('SELECT id, username, email, full_name, phone, role, created_at FROM users WHERE id = $1', [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
    }
  }

  static async create(userData) {
    const { username, email, password_hash, full_name, phone, role = 'user' } = userData;
    try {
      const result = await query(
        'INSERT INTO users (username, email, password_hash, full_name, phone, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, username, email, full_name, phone, role, created_at',
        [username, email, password_hash, full_name, phone, role]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  static async update(id, userData) {
    const { username, email, full_name, phone, role } = userData;
    try {
      const result = await query(
        'UPDATE users SET username = $1, email = $2, full_name = $3, phone = $4, role = $5, updated_at = NOW() WHERE id = $6 RETURNING id, username, email, full_name, phone, role, created_at, updated_at',
        [username, email, full_name, phone, role, id]
      );
      return result.rows[0] || null;
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }

  static async delete(id) {
    try {
      const result = await query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }
}

export default User;
