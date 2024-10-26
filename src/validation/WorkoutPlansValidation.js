const { body, param } = require('express-validator');

const WorkoutPlansValidation = {
    getWorkoutPlanById: [
        param('id')
            .notEmpty()
            .withMessage('id is required')
            .isInt()
            .withMessage('id must be an integer')
    ],
    createWorkoutPlan: [
        body('client_id')
            .notEmpty()
            .withMessage('client_id is required')
            .isInt()
            .withMessage('client_id must be an integer'),
        body('week_number')
            .notEmpty()
            .withMessage('week_number is required')
            .isInt()
            .withMessage('week_number must be an integer'),
        body('day_of_week')
            .notEmpty()
            .withMessage('day_of_week is required')
            .isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
            .withMessage('day_of_week must be a valid day of the week'),
        body('description')
            .optional()  
            .isString()
            .withMessage('description must be a string')
    ],
    updateWorkoutPlan: [
        param('id')
            .notEmpty()
            .withMessage('id is required')
            .isInt()
            .withMessage('id must be an integer'),
        body('week_number')
            .optional()
            .isInt()
            .withMessage('week_number must be an integer'),
        body('day_of_week')
            .optional()
            .isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
            .withMessage('day_of_week must be a valid day of the week'),
        body('description')
            .optional()
            .isString()
            .withMessage('description must be a string')
    ],
    deleteWorkoutPlan: [
        param('id')
            .notEmpty()
            .withMessage('id is required')
            .isInt()
            .withMessage('id must be an integer')
    ],
}

module.exports = WorkoutPlansValidation;
