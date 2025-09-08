import express from 'express';
import cors from 'cors';
import logger from './middleware/logger.js';
import auth from './middleware/auth.js';
import errorHandler from './middleware/errorHandler.js';
import routes from './routes/index.js';

const app = express();

// 1. Middleware global
app.use(cors());
app.use(express.json());
app.use(logger);

// 2. Public routes (không cần auth)
app.get('/public', (req, res) => {
  res.send("Public route");
});

// 3. Authenticated routes
app.get('/private', auth, (req, res) => {
  res.send("Private route: Access granted");
});

// 4. API routes
app.use(routes);

// 5. Route thử lỗi
app.get('/error', (req, res, next) => {
  const err = new Error("Something went wrong!");
  next(err);
});

// 6. Cuối cùng là xử lý lỗi
app.use(errorHandler);

export default app;

