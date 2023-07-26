// Routes Coworking Files
const express = require('express')
const router = express.Router()
const coworkingController = require('../controllers/coworkingController');
const authController = require('../controllers/authController');
const { CoworkingModel } = require('../db/sequelize');

// Queries
router
    .route('/')
    .get(coworkingController.findAllCoworkings)
    .post(authController.protect, authController.restrictTo("editor"), coworkingController.createCoworking)

// Queries (Raw)
router
    .route('/rawSql')
    .get(coworkingController.findAllCoworkingsWithRaw)

router
    .route('/:id')
    .get(coworkingController.findCoworkingByPk)
    .put(authController.protect, 
        authController.restrictToOwnerUser(CoworkingModel), 
        coworkingController.updateCoworking)
    .delete(authController.protect, 
        authController.restrictToOwnerUser(CoworkingModel), 
        coworkingController.deleteCoworking)

// Export
module.exports = router;