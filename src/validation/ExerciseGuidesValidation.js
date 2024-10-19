const { body, param, query } = require('express-validator');

const ExercieGuidesValidation = {
    getExercisesByNames: [
        query('names')
            .notEmpty().withMessage('names is required')
            .isArray()
            .withMessage('names must be an array')
            .custom((names) => {
                return names.every(name => typeof name === 'string');
            })
            .withMessage('names must be an array of strings')
    ],
    createExercise: [
        body('name')
            .notEmpty().withMessage('name is required')
            .isLength({ min: 3, max: 50 }).withMessage('name must be between 3 and 50 characters long')
            .custom((value, { req }) => {
                return !req.body.names || req.body.names.every(name => name !== value);
            })
            .withMessage('name must be unique'),
        body('description')
            .notEmpty().withMessage('description is required')
            .isLength({ min: 10, max: 200 }).withMessage('description must be between 10 and 200 characters long'),
        body('muscle_group')
            .notEmpty().withMessage('muscles is required')
            .isArray().withMessage('muscles must be an array')
            .custom((muscles) => {
                return muscles.every(muscle => typeof muscle === 'string');
            })
            .withMessage('muscles must be an array of strings'),
        body('difficulty_level')
            .notEmpty().withMessage('difficulty level is required')
            .isInt({ min: 1, max: 5 }).withMessage('difficulty level must be an integer between 1 and 5'),
        body('video_url')
            .optional()
            .isURL().withMessage('video_url must be a valid URL'),
        body(' image_url')
            .optional()
            .isURL().withMessage('image_url must be a valid URL')
    ]

}
module.exports = ExercieGuidesValidation;