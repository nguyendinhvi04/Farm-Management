import pool from '../config/database.js';

export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        username,
        email,
        full_name,
        phone,
        avatar_url,
        gender,
        date_of_birth,
        address,
        farm_area,
        main_crops,
        experience_years,
        farming_method,
        commune_id,
        created_at,
        updated_at
      FROM users
      ORDER BY created_at DESC
    `);

    return res.json(result.rows);
  } catch (error) {
    console.error('❌ DB error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await pool.query(`
      SELECT
        id,
        username,
        email,
        full_name,
        phone,
        avatar_url,
        gender,
        date_of_birth,
        address,
        farm_area,
        main_crops,
        experience_years,
        farming_method,
        commune_id,
        created_at,
        updated_at
      FROM users
      WHERE id = $1
    `, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Lỗi lấy thông tin người dùng:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


export const createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password_hash,
      full_name,
      avatar_url,
      phone,
      gender,
      date_of_birth,
      address,
      farm_area,
      main_crops,
      experience_years,
      farming_method,
      commune_id
    } = req.body;

    const result = await pool.query(
      `INSERT INTO users (
        username,
        email,
        password_hash,
        full_name,
        avatar_url,
        phone,
        gender,
        date_of_birth,
        address,
        farm_area,
        main_crops,
        experience_years,
        farming_method,
        commune_id,
        created_at,
        updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12, $13, $14,
        NOW(), NOW()
      ) RETURNING *`,
      [
        username,
        email,
        password_hash,
        full_name,
        avatar_url,
        phone,
        gender,
        date_of_birth,
        address,
        farm_area,
        main_crops,
        experience_years,
        farming_method,
        commune_id
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Lỗi tạo mới người dùng:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;

  const {
    username,
    email,
    password_hash,
    full_name,
    avatar_url,
    phone,
    gender,
    date_of_birth,
    address,
    farm_area,
    main_crops,
    experience_years,
    farming_method,
    commune_id
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users SET
        username = $1,
        email = $2,
        password_hash = $3,
        full_name = $4,
        avatar_url = $5,
        phone = $6,
        gender = $7,
        date_of_birth = $8,
        address = $9,
        farm_area = $10,
        main_crops = $11,
        experience_years = $12,
        farming_method = $13,
        commune_id = $14,
        updated_at = NOW()
      WHERE id = $15
      RETURNING *`,
      [
        username,
        email,
        password_hash,
        full_name,
        avatar_url,
        phone,
        gender,
        date_of_birth,
        address,
        farm_area,
        main_crops,
        experience_years,
        farming_method,
        commune_id,
        userId
      ]
    );

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Lỗi cập nhật thông tin người dùng:", error.message);
    return res.status(500).json({ error: error.message });
  }
};


export const deleteUser = async (req, res) => {
  const userId = req.params.id;
    
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng này' });
    }
    return res.json({ message: 'Xóa thành công', user: result.rows[0] });
  } catch (error) {
    console.error('❌ Lỗi xóa người dùng:', error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const toggleUserActive = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE users SET is_active = NOT is_active WHERE id = $1 RETURNING *;`,
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error toggling user:", err);
    res.status(500).json({ error: "Server error" });
  }
};
