const { body, param } = require('express-validator');

const ClientValidation = {
  getClientProfileById: [
    param('id')
      .notEmpty()
      .withMessage('id is required')
      .isInt()
      .withMessage('id must be an integer'),
  ],
    createClientProfile: [
      body('height')
        .notEmpty()
        .withMessage('Height is required')
        .isFloat()
        .withMessage('Height must be a number'),
      body('weight')
        .notEmpty()
        .withMessage('Weight is required')
        .isFloat()
        .withMessage('Weight must be a number'),
      body('media_url')
        .optional()
        .isIn(['image', 'video'])
        .withMessage('Media URL must be "image" or "video"'),
      body('physical_condition')
        .optional()
        .isString()
        .withMessage('Physical condition must be a string'),
    ],

  updateClientProfile: [
    param('id')
      .notEmpty()
      .withMessage('id is required')
      .isInt()
      .withMessage('id must be an integer'),
    body('username')
      .optional()
      .isString()
      .withMessage('Username must be a string'),
    body('email')
      .optional()
      .isEmail()
      .withMessage('Must be a valid email'),
    body('phone')
      .optional()
      .isString()
      .withMessage('Phone must be a string'),
    body('bio')
      .optional()
      .isString()
      .withMessage('Bio must be a string'),
    body('height')
      .optional()
      .isFloat()
      .withMessage('Height must be a number'),
    body('weight')
      .optional()
      .isFloat()
      .withMessage('Weight must be a number'),
    body('media_url')
      .optional()
      .isIn(['image', 'video'])
      .withMessage('Media URL must be "image" or "video"'),
    body('physical_condition')
      .optional()
      .isString()
      .withMessage('Physical condition must be a string'),
  ],
  deleteClientProfile: [
    param('id')
      .notEmpty()
      .withMessage('id is required')
      .isInt()
      .withMessage('id must be an integer'),
  ],

};


module.exports = ClientValidation;
