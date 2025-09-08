const auth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (token === '123456') {
    next(); // token hợp lệ
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default auth;
