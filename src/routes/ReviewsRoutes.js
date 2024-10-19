const express = require('express');
const ReviewsController = require('../controllers/ReviewsController');
const ReviewsValidation = require('../validation/ReviewsValidation');
const router = express.Router();

router.get('/', ReviewsController.getReviewsAll);
router.get('/search-client/:id',ReviewsValidation.getReviewsByClientId, ReviewsController.getReviewsByClientId);
router.get('/:id',ReviewsValidation.getReviewById ,ReviewsController.getReviewById);
router.get('/searche-trainer/:id',ReviewsValidation.getReviewsByTrainerId, ReviewsController.getReviewsByTrainerId);
router.get('/:rating',ReviewsValidation.getReviewsByRating,ReviewsController.getReviewsByRating);

module.exports = router;