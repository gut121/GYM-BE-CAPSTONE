const express = require('express');
const AuthController = require('../controllers/AuthController');
const AuthValidation = require('../validation/AuthValidation');
const { validate } = require('../middlewares/validate');
const { limiterAuth } = require('../utils/rateLimiter');
const router = express.Router();

router.post(
    '/register', validate(AuthValidation.register),
    AuthController.register
);
router.post(
    '/login',
    AuthController.login
);
router.post('/logout', AuthController.logout);

router.post('/verify-email', AuthController.verifyEmail);
router.post(
    '/forgot-password',
    AuthController.forgotPassword
);
router.post(
    '/reset-password/:token',
    AuthController.resetPassword
);

router.post('/refresh-token', AuthController.refreshToken);

module.exports = router;
