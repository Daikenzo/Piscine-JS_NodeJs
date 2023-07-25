// Routes Coworking Files
const express = require('express')
const router = express.Router()
const coworkingController = require('../controllers/coworkingController');
const authController = require('../controllers/authController')

// Queries
router
    .route('/')
    .get(coworkingController.findAllCoworkings)
    .post(authController.protect, authController.restrictTo("editor"), coworkingController.createCoworking)

router
    .route('/:id')
    .get(coworkingController.findCoworkingByPk)
    .put(coworkingController.updateCoworking)
    .delete(authController.protect, authController.restrictTo("admin"), coworkingController.deleteCoworking)

// Export
module.exports = router;