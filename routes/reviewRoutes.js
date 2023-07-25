// Routes of Review
const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')
const authController = require('../controllers/authController')

// All
router
    .route('/')
    .get(reviewController.findAllReviews)
// ById
router
    .route('/:coworkingId')
    .post(authController.protect, reviewController.createReview)

// Export
module.exports = router