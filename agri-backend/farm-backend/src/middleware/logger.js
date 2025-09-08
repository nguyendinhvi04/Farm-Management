// middlewares/logger.js
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next(); // chuyển tiếp
};

export default logger;
