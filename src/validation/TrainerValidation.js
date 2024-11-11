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
      .withMessage('Invalid email format'),
  ],

  getTrainerById: [
    param('id')
      .notEmpty()
      .withMessage('Trainer ID is required')
      .isInt()
      .withMessage('Trainer ID must be an integer'),
  ],

  updateTrainerProfile: [
    body('username')
      .optional()
      .isString()
      .withMessage('Username must be a string')
      .isLength({ min: 4 })
      .withMessage('Username must be at least 4 characters long'),
    body('date_of_birth')
      .optional()
      .isDate()
      .withMessage('Date of birth must be a valid date'),
    body('phone')
      .optional()
      .isString()
      .withMessage('Phone must be a string')
      .isLength({ min: 10, max: 15 })
      .withMessage('Phone must be between 10 and 15 characters'),
    body('bio')
      .optional()
      .isString()
      .withMessage('Bio must be a string')
      .isLength({ max: 255 })
      .withMessage('Bio must not exceed 255 characters'),
    body('avatar_url')
      .optional()
      .isURL()
      .withMessage('Avatar URL must be a valid URL'),
    body('specialties')
      .optional()
      .isString()
      .withMessage('Specialties must be a string'),
    body('available_slots')
      .optional()
      .isString()
      .withMessage('Available slots must be a string'),
    body('certification_url')
      .optional()
      .isURL()
      .withMessage('Certification URL must be a valid URL'),
    body('years_of_experience')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Years of experience must be a non-negative integer'),
  ],

  deleteTrainer: [
    param('userId')
      .notEmpty()
      .withMessage('User ID is required')
      .isInt()
      .withMessage('User ID must be an integer'),
  ],

  searchTrainersBySpecialties: [
    query('specialties')
      .notEmpty()
      .withMessage('Specialties is required')
      .isString()
      .withMessage('Specialties must be a string'),
  ],

  getTrainerByUsername: [
    query('username')
      .notEmpty()
      .withMessage('Username is required')
      .isString()
      .withMessage('Username must be a string'),
  ],
  getClientProgress: [
    query('client_id')
      .notEmpty()
      .withMessage('Client ID is required')
      .isInt()
      .withMessage('Client ID must be an integer'),
    query('trainer_id')
      .notEmpty()
      .withMessage('Trainer ID is required')
      .isInt()
      .withMessage('Trainer ID must be an integer'),
  ],
  getClientHealthStats: [
    query('client_id')
      .notEmpty()
      .withMessage('Client ID is required')
      .isInt()
      .withMessage('Client ID must be an integer'),
  ],
  getClientWorkoutPlans: [
    query('client_id')
      .notEmpty()
      .withMessage('Client ID is required')
      .isInt()
      .withMessage('Client ID must be an integer'),
  ],
  getClientReviews: [
    query('client_id')
      .notEmpty()
      .withMessage('Client ID is required')
      .isInt()
      .withMessage('Client ID must be an integer'),
    query('trainer_id')
      .notEmpty()
      .withMessage('Trainer ID is required')
      .isInt()
      .withMessage('Trainer ID must be an integer'),
  ],

  
};

module.exports = TrainerValidation;
