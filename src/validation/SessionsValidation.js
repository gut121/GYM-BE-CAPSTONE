const { body, param, query } = require('express-validator');

const SessionsValidation = {
    getSessionById: [
        param('id')
            .notEmpty()
            .withMessage('id is required')
            .isInt()
            .withMessage('id must be an integer')
    ],
    createSession: [
        body('trainerId')
            .notEmpty()
            .withMessage('trainerId is required')
            .isInt()
            .withMessage('trainerId must be an integer'),
        body('clientId')
            .notEmpty()
            .withMessage('clientId is required')
            .isInt()
            .withMessage('clientId must be an integer'),
        body('session_date')
            .notEmpty()
            .withMessage('date is required'),
        body('status')
            .notEmpty()
            .withMessage('status is required')
            .isIn(['pending', 'active', 'completed'])
            .withMessage('status must be either pending, active or completed')
    ],

}
module.exports = SessionsValidation;