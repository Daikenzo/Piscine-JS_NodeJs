// Routes user Files
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Queries Table
router
    .route('/')
    .get(userController.findAllUsers)

router
    .route('/:id')
    .get(userController.findUserByPk)
    .put(userController.updateUser)
    .delete(authController.protect, userController.deleteUser)

// Authentificate Route
router
    .route('/signup')
    .post(authController.signUp)

router
    .route('/login')
    .post(authController.login)
// Export
module.exports = router;