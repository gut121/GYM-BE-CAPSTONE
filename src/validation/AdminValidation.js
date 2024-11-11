const { body, param, query } = require('express-validator');

const AdminValidation = {
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
  updateAvatar: [
    body('avatar_url')
      .notEmpty()
      .withMessage('Avatar URL is required')
      .isURL()
      .withMessage('Avatar URL must be a valid URL')
      .isLength({ max: 255 })
      .withMessage('Avatar URL must not exceed 255 characters'),
  ],
  getClientPaymentHistory:[
    query('client_id')
      .notEmpty()
      .withMessage('Client ID is required')
      .isInt()
      .withMessage('Client ID must be an integer'),
]
};

module.exports = AdminValidation;
