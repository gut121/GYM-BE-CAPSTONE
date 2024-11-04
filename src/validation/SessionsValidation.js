const { body, param } = require('express-validator');

const SessionsValidation = {
  getSessionById: [
    param('id')
      .notEmpty()
      .withMessage('id is required')
      .isInt()
      .withMessage('id must be an integer'),
  ],
  createSession: [
    body('trainer_id')
      .notEmpty()
      .withMessage('trainer_id is required')
      .isInt()
      .withMessage('trainer_id must be an integer'),
    body('client_id')
      .notEmpty()
      .withMessage('client_id is required')
      .isInt()
      .withMessage('client_id must be an integer'),
    body('workout_plan_id')
      .notEmpty()
      .withMessage('workout_plan_id is required')
      .isInt()
      .withMessage('workout_plan_id must be an integer'),
    body('session_date')
      .notEmpty()
      .withMessage('session_date is required')
      .isISO8601()
      .withMessage('session_date must be a valid date in ISO 8601 format'),
    body('status')
      .optional()
      .isIn(['pending', 'completed', 'cancelled'])
      .withMessage('status must be either pending, completed, or cancelled'),
    body('day_of_week')
      .optional()
      .isIn([
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ])
      .withMessage('day_of_week must be a valid day of the week'),
  ],
  updateSession: [
    param('id')
      .notEmpty()
      .withMessage('id is required')
      .isInt()
      .withMessage('id must be an integer'),
    body('session_date')
      .optional()
      .isISO8601()
      .withMessage('session_date must be a valid date in ISO 8601 format'),
    body('status')
      .optional()
      .isIn(['pending', 'completed', 'cancelled'])
      .withMessage('status must be either pending, completed, or cancelled'),
    body('day_of_week')
      .optional()
      .isIn([
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ])
      .withMessage('day_of_week must be a valid day of the week'),
    body('incomplete_reason')
      .optional()
      .isString()
      .withMessage('incomplete_reason must be a string'),
  ],
  deleteSession: [
    param('id')
      .notEmpty()
      .withMessage('id is required')
      .isInt()
      .withMessage('id must be an integer'),
  ],
};

module.exports = SessionsValidation;
