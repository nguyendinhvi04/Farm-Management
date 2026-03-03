import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  user: process.env.DB_USER || 'nguyendv',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'farm-management',
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT) || 5432,
  // SSL required for Railway PostgreSQL
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

export default pool;