const { body, param } = require('express-validator');

const MealPlansValidation = {
    getMealPlansById: [
        param('id')
            .notEmpty().withMessage('id is required')
            .isInt().withMessage('id must be an integer')
    ],
    createMealPlan: [
        body('client_id')
            .notEmpty().withMessage('client_id is required')
            .isInt().withMessage('client_id must be an integer'),
        body('week_number')
            .notEmpty().withMessage('week_number is required')
            .isInt().withMessage('week_number must be an integer'),
        body('day_of_week')
            .notEmpty().withMessage('day_of_week is required')
            .isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
            .withMessage('day_of_week must be a valid day of the week'),
        body('meal_type')
            .notEmpty().withMessage('meal_type is required')
            .isIn(['Breakfast', 'Lunch', 'Dinner', 'Snack'])
            .withMessage('meal_type must be one of Breakfast, Lunch, Dinner, or Snack'),
        body('meal_name')
            .notEmpty().withMessage('meal_name is required')
            .isString().withMessage('meal_name must be a string'),
        body('ingredients')
            .notEmpty().withMessage('ingredients is required')
            .isString().withMessage('ingredients must be a string'),
        body('calories')
            .notEmpty().withMessage('calories is required')
            .isInt().withMessage('calories must be an integer'),
        body('protein')
            .notEmpty().withMessage('protein is required')
            .isInt().withMessage('protein must be an integer'),
        body('carbs')
            .notEmpty().withMessage('carbs is required')
            .isInt().withMessage('carbs must be an integer'),
        body('fat')
            .notEmpty().withMessage('fat is required')
            .isInt().withMessage('fat must be an integer'),
        body('chef_notes')
            .optional()
            .isString().withMessage('chef_notes must be a string')
    ],
    updateMealPlan: [
        param('id')
            .notEmpty().withMessage('id is required')
            .isInt().withMessage('id must be an integer'),
        body('week_number')
            .optional()
            .isInt().withMessage('week_number must be an integer'),
        body('day_of_week')
            .optional()
            .isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
            .withMessage('day_of_week must be a valid day of the week'),
        body('meal_type')
            .optional()
            .isIn(['Breakfast', 'Lunch', 'Dinner', 'Snack'])
            .withMessage('meal_type must be one of Breakfast, Lunch, Dinner, or Snack'),
        body('meal_name')
            .optional()
            .isString().withMessage('meal_name must be a string'),
        body('ingredients')
            .optional()
            .isString().withMessage('ingredients must be a string'),
        body('calories')
            .optional()
            .isInt().withMessage('calories must be an integer'),
        body('protein')
            .optional()
            .isInt().withMessage('protein must be an integer'),
        body('carbs')
            .optional()
            .isInt().withMessage('carbs must be an integer'),
        body('fat')
            .optional()
            .isInt().withMessage('fat must be an integer'),
        body('chef_notes')
            .optional()
            .isString().withMessage('chef_notes must be a string')
    ],
    deleteMealPlan: [
        param('id')
            .notEmpty().withMessage('id is required')
            .isInt().withMessage('id must be an integer')
    ]
}

module.exports = MealPlansValidation;
