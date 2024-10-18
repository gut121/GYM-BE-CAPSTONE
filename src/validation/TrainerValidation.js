const { body, param, query } = require('express-validator');

const TrainerValidation = {
    getTrainerById: [
        param('id')
            .notEmpty()
            .withMessage('id is required')
            .isInt()
            .withMessage('id must be an integer')
    ]
}
module.exports = TrainerValidation;