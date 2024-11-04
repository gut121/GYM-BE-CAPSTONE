const { body, param, query } = require('express-validator');

const AuthValidation = {
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
  verifyEmail: [
    param('code')
      .notEmpty()
      .withMessage('Code must be')
      .isLength({ min: 6, max: 6 })
      .withMessage('Invalid code'),
  ],
  login: [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 4 })
      .withMessage('Password must be at least 4 characters long'),
  ],
  forgotPassword: [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email'),
  ],
  resetPassword: [
    query('token')
      .notEmpty()
      .withMessage('Token is required')
      .isEmail()
      .withMessage('Invalid token'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 4 })
      .withMessage('Password must be at least 4 characters long'),
  ],
};

module.exports = AuthValidation;
