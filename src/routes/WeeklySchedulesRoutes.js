const express = require('express');
const WeeklySchedulesController = require('../controllers/WeeklySchedulesController');
const router = express.Router();

router.get('/', WeeklySchedulesController.getWeeklySchedule);
module.exports = router;
