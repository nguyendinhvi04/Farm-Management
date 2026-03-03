import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
      // Railway cung cấp DATABASE_URL — dùng thẳng
      connectionString: process.env.DATABASE_URL,
      ssl: isProduction ? { rejectUnauthorized: false } : false,
    }
    : {
      // Local dev — dùng biến riêng lẻ
      user: process.env.DB_USER || 'nguyendv',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'farm-management',
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT) || 5432,
      ssl: false,
    }
);

export default pool;