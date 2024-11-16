const { body, param } = require('express-validator');

const ClientValidation = {
  // Validation cho API lấy hồ sơ khách hàng
  getClientProfile: [
    param('id')
      .notEmpty()
      .withMessage('id is required')
      .isInt()
      .withMessage('id must be an integer'),
  ],

  // Validation cho API cập nhật hồ sơ khách hàng
  updateClientProfile: [
    body('username')
      .optional()
      .isString()
      .withMessage('Username must be a string'),
    body('date_of_birth')
      .optional()
      .isISO8601()
      .withMessage('Date of birth must be a valid date in ISO8601 format'),
    body('phone')
      .optional()
      .isString()
      .withMessage('Phone must be a string'),
    body('bio')
      .optional()
      .isString()
      .withMessage('Bio must be a string'),
    body('age')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Age must be a positive integer'),
    body('gender')
      .optional()
      .isIn(['Male', 'Female', 'Other'])
      .withMessage('Gender must be Male, Female, or Other'),
    body('height')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Height must be a positive number'),
    body('weight')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Weight must be a positive number'),
    body('fitness_goal')
      .optional()
      .isIn([
        'Lose Weight',
        'Build Muscle',
        'Increase Endurance',
        'Improve Overall Health',
        'Improve Flexibility',
        'Rehabilitation',
        'Sports Performance',
        'Stress Relief',
        'Weight Maintenance',
        'Post-Pregnancy Fitness',
        'Pre-Wedding Fitness',
        'Body Toning',
        'Senior Fitness',
        'Boost Energy Levels',
      ])
      .withMessage('Fitness goal must be a valid value'),
    body('desired_time_to_achieve')
      .optional()
      .isString()
      .withMessage('Desired time to achieve must be a string'),
    body('current_fitness_level')
      .optional()
      .isIn(['Beginner', 'Intermediate', 'Advanced'])
      .withMessage('Current fitness level must be Beginner, Intermediate, or Advanced'),
    body('weekly_training_days')
      .optional()
      .isInt({ min: 0, max: 7 })
      .withMessage('Weekly training days must be between 0 and 7'),
    body('session_duration')
      .optional()
      .isString()
      .withMessage('Session duration must be a string'),
    body('media_url')
      .optional()
      .notEmpty()
      .withMessage('Media URL is required')
      .isIn(['image', 'video'])
      .withMessage('Media URL must be either image or video'),
    body('physical_condition')
      .optional()
      .isString()
      .withMessage('Physical condition must be a string'),
    body('avatar_url')
      .optional()
      .notEmpty()
      .withMessage('Avatar URL is required')
      .isURL()
      .withMessage('Avatar URL must be a valid URL'),
  ],
};

module.exports = ClientValidation;
