import { query } from '../config/db';

class User {
  static async getAll() {
    try {
      const result = await query(
        `SELECT id, username, email, full_name, first_name, last_name, 
         phone, address, city, state, country, postal_code,
         avatar_url, bio, is_active, is_verified, last_login,
         language, timezone, role_id, created_at, updated_at 
         FROM users ORDER BY created_at DESC`
      );
      return result.rows;
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }

  static async getById(id) {
    try {
      const result = await query(
        `SELECT id, username, email, full_name, first_name, last_name, 
         date_of_birth, gender, phone, address, city, state, country, postal_code,
         avatar_url, bio, is_active, is_verified, last_login,
         language, timezone, role_id, created_at, updated_at 
         FROM users WHERE id = $1`,
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
    }
  }

  static async create(userData) {
    const {
      username, email, password_hash, role_id,
      full_name, first_name, last_name, date_of_birth, gender,
      phone, address, city, state, country = 'Vietnam', postal_code,
      avatar_url, bio, is_active = true, is_verified = false,
      language = 'vi', timezone = 'Asia/Ho_Chi_Minh'
    } = userData;

    try {
      const result = await query(
        `INSERT INTO users (
          username, email, password_hash, role_id,
          full_name, first_name, last_name, date_of_birth, gender,
          phone, address, city, state, country, postal_code,
          avatar_url, bio, is_active, is_verified,
          language, timezone
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
        RETURNING id, username, email, full_name, first_name, last_name, 
                  phone, is_active, is_verified, created_at`,
        [
          username, email, password_hash, role_id,
          full_name, first_name, last_name, date_of_birth, gender,
          phone, address, city, state, country, postal_code,
          avatar_url, bio, is_active, is_verified,
          language, timezone
        ]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  static async update(id, userData) {
    const {
      username, email, role_id,
      full_name, first_name, last_name, date_of_birth, gender,
      phone, address, city, state, country, postal_code,
      avatar_url, bio, is_active, is_verified,
      language, timezone
    } = userData;

    try {
      const result = await query(
        `UPDATE users SET 
          username = $1, email = $2, role_id = $3,
          full_name = $4, first_name = $5, last_name = $6, date_of_birth = $7, gender = $8,
          phone = $9, address = $10, city = $11, state = $12, country = $13, postal_code = $14,
          avatar_url = $15, bio = $16, is_active = $17, is_verified = $18,
          language = $19, timezone = $20,
          updated_at = NOW() 
        WHERE id = $21 
        RETURNING id, username, email, full_name, first_name, last_name, 
                  phone, is_active, is_verified, updated_at`,
        [
          username, email, role_id,
          full_name, first_name, last_name, date_of_birth, gender,
          phone, address, city, state, country, postal_code,
          avatar_url, bio, is_active, is_verified,
          language, timezone, id
        ]
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
