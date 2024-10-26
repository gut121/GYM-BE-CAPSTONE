const { body, param, query } = require('express-validator')

const UserValidation = {
    updateAvatar :[
        param('userId')
           .notEmpty()
           .withMessage('userId is required')
           .isInt()
           .withMessage('userId must be an integer'),
        body('avatarUrl')
           .notEmpty()
           .withMessage('avatarUrl is required')
           .isURL()
           .withMessage('avatarUrl must be a valid URL')
    ]
}

module.exports = UserValidation;