
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/dashboard', authenticateToken, isAdmin, adminController.getAdminDashboard);

module.exports = router;