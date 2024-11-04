const { body, param, query } = require('express-validator');

const ReviewsValidation = {
  getReviewsByClientId: [
    param('client_id')
      .notEmpty()
      .withMessage('client_id is required')
      .isInt()
      .withMessage('client_id must be an integer'),
  ],
  getReviewsByTrainerId: [
    param('trainer_id')
      .notEmpty()
      .withMessage('trainer_id is required')
      .isInt()
      .withMessage('trainer_id must be an integer'),
  ],
  getReviewById: [
    param('id')
      .notEmpty()
      .withMessage('id is required')
      .isInt()
      .withMessage('id must be an integer'),
  ],
  getReviewsByRating: [
    query('rating')
      .notEmpty()
      .withMessage('rating is required')
      .isInt()
      .withMessage('rating must be an integer'),
  ],
};
module.exports = ReviewsValidation;
