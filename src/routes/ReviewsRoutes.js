const express = require('express');
const { ReviewsController } = require('../controllers');
const { ReviewsValidation } = require('../validation');
const { validate } = require('../middlewares/validate');
const router = express.Router();

router.get('/', ReviewsController.getReviewsAll);
router.get(
  '/search-client/:id',
  validate(ReviewsValidation.getReviewsByClientId),
  ReviewsController.getReviewsByClientId
);
router.get(
  '/:id',
  validate(ReviewsValidation.getReviewById),
  ReviewsController.getReviewById
);
router.get(
  '/searche-trainer/:id',
  validate(ReviewsValidation.getReviewsByTrainerId),
  ReviewsController.getReviewsByTrainerId
);
router.get(
  '/:rating',
  validate(ReviewsValidation.getReviewsByRating),
  ReviewsController.getReviewsByRating
);

module.exports = router;
