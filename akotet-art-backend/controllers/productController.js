
const db = require('../config/db');

exports.getAllProducts = (req, res, next) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Database error:', err.message);
      return next(new Error('Failed to fetch products'));
    }
    res.json(results);
  });
};

exports.getProductById = (req, res, next) => {
  const { id } = req.params;
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Database error:', err.message);
      return next(new Error('Failed to fetch product'));
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(results[0]);
  });
};