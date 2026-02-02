const express = require('express');
const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    getUsers, 
    deleteUser 
} = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Private/Admin Routes
router.get('/users', protect, admin, getUsers);
router.delete('/users/:id', protect, admin, deleteUser);

module.exports = router;