const { body, query, param } = require('express-validator');

const ExerciseGuidesValidation = {
  getExercisesByNames: [
    query('names')
      .notEmpty()
      .withMessage('Names parameter is required')
      .isString()
      .withMessage('Names must be a string of comma-separated values')
      .custom((value) => {
        const namesArray = value.split(',').map((name) => name.trim());
        return namesArray.every((name) => typeof name === 'string' && name.length > 0);
      })
      .withMessage('Each name must be a non-empty string'),
  ],

  createExercise: [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isString()
      .isLength({ max: 255 })
      .withMessage('Name must be a string with a maximum length of 255 characters'),

    body('description')
      .optional()
      .isString()
      .withMessage('Description must be a string'),

    body('muscle_group')
      .optional()
      .isString()
      .isLength({ max: 255 })
      .withMessage('Muscle group must be a string with a maximum length of 255 characters'),

    body('difficulty_level')
      .optional()
      .isString()
      .isLength({ max: 50 })
      .withMessage('Difficulty level must be a string with a maximum length of 50 characters'),

    body('video_url')
      .optional()
      .isURL()
      .withMessage('Video URL must be a valid URL')
      .isLength({ max: 255 })
      .withMessage('Video URL must have a maximum length of 255 characters'),

    body('image_url')
      .optional()
      .isURL()
      .withMessage('Image URL must be a valid URL')
      .isLength({ max: 255 })
      .withMessage('Image URL must have a maximum length of 255 characters'),
  ],

  updateExercise: [
    param('id')
      .notEmpty()
      .withMessage('Exercise ID is required')
      .isInt()
      .withMessage('Exercise ID must be an integer'),

    body('name')
      .optional()
      .isString()
      .isLength({ max: 255 })
      .withMessage('Name must be a string with a maximum length of 255 characters'),

    body('description')
      .optional()
      .isString()
      .withMessage('Description must be a string'),

    body('muscle_group')
      .optional()
      .isString()
      .isLength({ max: 255 })
      .withMessage('Muscle group must be a string with a maximum length of 255 characters'),

    body('difficulty_level')
      .optional()
      .isString()
      .isLength({ max: 50 })
      .withMessage('Difficulty level must be a string with a maximum length of 50 characters'),

    body('video_url')
      .optional()
      .isURL()
      .withMessage('Video URL must be a valid URL')
      .isLength({ max: 255 })
      .withMessage('Video URL must have a maximum length of 255 characters'),

    body('image_url')
      .optional()
      .isURL()
      .withMessage('Image URL must be a valid URL')
      .isLength({ max: 255 })
      .withMessage('Image URL must have a maximum length of 255 characters'),

    body('admin_id')
      .optional()
      .isInt()
      .withMessage('Admin ID must be an integer'),
  ],
};

module.exports = ExerciseGuidesValidation;
