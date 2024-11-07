const express = require('express');
const { AuthController } = require('../controllers');
const { AuthValidation } = require('../validation');
const { validate } = require('../middlewares/validate');
const { limiterAuth } = require('../utils/rateLimiter');
const router = express.Router();

router.post(
  '/register',
  validate(AuthValidation.register),
  AuthController.register
);
router.post('/login', validate(AuthValidation.login), limiterAuth, AuthController.login);
router.post('/logout', AuthController.logout);

router.post('/verify-email', validate(AuthValidation.verifyEmail), AuthController.verifyEmail);
router.post('/forgot-password',validate(AuthValidation.forgotPassword), AuthController.forgotPassword);
router.post('/reset-password/:token', validate(AuthValidation.resetPassword), AuthController.resetPassword);

router.post('/refresh-token', AuthController.refreshToken);

module.exports = router;
