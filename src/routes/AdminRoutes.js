const express = require('express');
const { UserController, AdminController } = require('../controllers');
const { validate } = require('node-cron');
const router = express.Router();
router.post(
    '/register',
    AdminController.register
);

module.exports = router;