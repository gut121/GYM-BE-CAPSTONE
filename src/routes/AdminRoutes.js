const express = require('express');
const { AdminController } = require('../controllers');
const { UserValidation, AdminValidation } = require('../validation');
const { validate } = require('../middlewares/validate');

const router = express.Router();

router.post('/register', validate(AdminValidation.register), AdminController.register);


module.exports = router;
