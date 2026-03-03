import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },  // Always use SSL for Railway
    }
    : {
      user: process.env.DB_USER || 'nguyendv',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'farm-management',
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT) || 5432,
      ssl: false,
    }
);

// Log connection status on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ DB connection failed:', err.message);
  } else {
    console.log('✅ DB connected successfully');
    release();
  }
});

export default pool;