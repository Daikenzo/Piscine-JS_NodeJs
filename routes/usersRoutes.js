// Routes user Files
const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController');

// Queries
router
    .route('/')
    .get(usersController.findAllUsers)
    .post(usersController.createUser)

router
    .route('/:id')
    .get(usersController.findUserByPk)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser)

// Export
module.exports = router;