const { body, param } = require('express-validator');

const SessionsExercisesValidation = {
  getSessionsExercisesById: [
    param('session_id')
      .notEmpty()
      .withMessage('Session ID is required.')
      .isInt()
      .withMessage('Session ID must be an integer.'),
    param('exercise_id')
      .notEmpty()
      .withMessage('Exercise ID is required.')
      .isInt()
      .withMessage('Exercise ID must be an integer.'),
  ],
   // Validation cho thêm bài tập vào buổi tập
   addExerciseToSession: [
    body('session_id')
      .notEmpty()
      .withMessage('Session ID is required')
      .isInt()
      .withMessage('Session ID must be an integer'),
    body('exercise_id')
      .notEmpty()
      .withMessage('Exercise ID is required')
      .isInt()
      .withMessage('Exercise ID must be an integer'),
    body('sets')
      .notEmpty()
      .withMessage('Sets is required')
      .isInt({ min: 1 })
      .withMessage('Sets must be a positive integer'),
    body('reps')
      .notEmpty()
      .withMessage('Reps is required')
      .isInt({ min: 1 })
      .withMessage('Reps must be a positive integer'),
  ],

  // Validation cho xóa bài tập khỏi buổi tập
  removeExerciseFromSession: [
    body('sessionId')
      .notEmpty()
      .withMessage('Session ID is required')
      .isInt()
      .withMessage('Session ID must be an integer'),
    body('exerciseId')
      .notEmpty()
      .withMessage('Exercise ID is required')
      .isInt()
      .withMessage('Exercise ID must be an integer'),
  ],

  // Validation cho cập nhật trạng thái của buổi tập
  updateSessionStatus: [
    param('sessionId')
      .notEmpty()
      .withMessage('Session ID is required')
      .isInt()
      .withMessage('Session ID must be an integer'),
    body('status')
      .notEmpty()
      .withMessage('Status is required')
      .isString()
      .withMessage('Status must be a string')
      .isIn(['pending', 'completed', 'cancelled'])
      .withMessage('Status must be one of: pending, completed, or cancelled'),
  ],
};

module.exports = SessionsExercisesValidation;
