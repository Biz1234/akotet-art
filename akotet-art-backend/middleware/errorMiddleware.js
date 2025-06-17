const errorMiddleware = (err, req, res, next) => {
  console.error('Server error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });
  res.status(500).json({ error: err.message || 'Internal server error' });
};

module.exports = errorMiddleware;