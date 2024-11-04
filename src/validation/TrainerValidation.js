const { body, param, query } = require('express-validator');

const TrainerValidation = {
  register: [
    body('username')
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 4 })
      .withMessage('Username must be at least 4 characters long'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 4 })
      .withMessage('Password must be at least 4 characters long'),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email '),
  ],

  getTrainerById: [
    param('id')
      .notEmpty()
      .withMessage('id is required')
      .isInt()
      .withMessage('id must be an integer'),
  ],
};
module.exports = TrainerValidation;
