import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.DB_PORT || 5432;
const host = process.env.DB_HOST || 'localhost';
const database = process.env.DB_NAME || 'user-management';
const user = process.env.DB_USER || 'nguyendv';
const password = process.env.DB_PASSWORD; 
const pool = new Pool({
  user: user, 
  host: host,
  database: database, 
  password: password, 
  port: port, 
});

export default pool;