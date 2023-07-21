// Routes user Files
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');

// Queries
router
    .route('/')
    .get(userController.findAllUsers)
    .post(userController.createUser)

router
    .route('/:id')
    .get(userController.findUserByPk)
    .put(userController.updateUser)
    .delete(userController.deleteUser)

// Export
module.exports = router;