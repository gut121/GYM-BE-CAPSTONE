const express = require('express');
const { AdminController } = require('../controllers');
const { AdminValidation } = require('../validation');
const { validate } = require('../middlewares/validate');

const router = express.Router();

router.post(
  '/register',
  validate(AdminValidation.register),
  AdminController.register
);
router.patch(
  '/:userId/avatar',
  validate(AdminValidation.updateAvatar),
  AdminController.updateAvatar
);

module.exports = router;
