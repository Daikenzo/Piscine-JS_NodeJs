// Routes of Review
const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')
const authController = require('../controllers/authController')
const { ReviewModel } = require('../db/sequelize');

// All
router
    .route('/')
    .get(reviewController.findAllReviews)
// ById
router
    .route('/:id')
    .post(authController.protect, reviewController.createReview)
    .put(authController.protect, 
        authController.restrictToOwnerUser(ReviewModel), 
        reviewController.updateReview)

// Export
module.exports = router