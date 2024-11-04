const express = require('express');
const { UserController, AdminController } = require('../controllers');
const { UserValidation, AdminValidation } = require('../validation');
const { validate } = require('node-cron');
const router = express.Router();

router.post('/register', AdminValidation.register, AdminController.register);
router.put(
  '/update/avatar/:id',
  UserValidation.updateAvatar,
  UserController.updateAvatar
);

module.exports = router;
