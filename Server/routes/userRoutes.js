const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// POST /api/Users - Add a new user
router.post('/', UserController.CreateUser);

// GET /api/Users/{username} - Get user details
router.get('/:username', UserController.getUserByUsername);

module.exports = router;
