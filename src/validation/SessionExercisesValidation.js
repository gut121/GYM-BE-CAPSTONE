const { body, param } = require('express-validator');

const SessionsExercisesValidation = {
  getSessionsExercisesById: [
    param('id')
      .notEmpty()
      .withMessage('id is required')
      .isInt()
      .withMessage('id must be an integer'),
  ],
  addExerciseToSession: [
    body('sessionId')
      .notEmpty()
      .withMessage('sessionId is required')
      .isInt()
      .withMessage('sessionId must be an integer'),
    body('exerciseId')
      .notEmpty()
      .withMessage('exerciseId is required')
      .isInt()
      .withMessage('exerciseId must be an integer'),
  ],
  removeExerciseFromSession: [
    body('sessionId')
      .notEmpty()
      .withMessage('sessionId is required')
      .isInt()
      .withMessage('sessionId must be an integer'),
    body('exerciseId')
      .notEmpty()
      .withMessage('exerciseId is required')
      .isInt()
      .withMessage('exerciseId must be an integer'),
  ],
  updateSessionStatus: [
    param('sessionId')
      .notEmpty()
      .withMessage('sessionId is required')
      .isInt()
      .withMessage('sessionId must be an integer'),
    body('status')
      .notEmpty()
      .withMessage('status is required')
      .isString()
      .withMessage('status must be a string'),
  ],
};

module.exports = SessionsExercisesValidation;
