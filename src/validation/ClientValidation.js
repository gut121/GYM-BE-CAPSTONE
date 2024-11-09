const { body, param } = require('express-validator');

const ClientValidation = {
  getClientProfile: [
    param('id')
      .notEmpty()
      .withMessage('id is required')
      .isInt()
      .withMessage('id must be an integer'),
  ],

  updateClientProfile: [
    body('username')
      .optional()
      .isString()
      .withMessage('Username must be a string'),
    body('date_of_birth')
      .optional()
      .isDate()
      .withMessage('Date of birth must be a valid date'),
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
      .notEmpty()
      .withMessage('Media URL is required'),
    body('physical_condition')
      .optional()
      .isString()
      .withMessage('Physical condition must be a string'),
    body('avatar_url')
      .notEmpty()
      .withMessage('avatarUrl is required')
      .isURL()
      .withMessage('avatarUrl must be a valid URL'),
  ],

};


module.exports = ClientValidation;
