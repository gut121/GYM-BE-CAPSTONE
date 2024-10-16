const express = require('express');
const WeeklySchedulesController = require('../controllers/WeeklySchedulesController');
const router = express.Router();

router.get('/', WeeklySchedulesController.getWeeklySchedule);
router.get('/:id', WeeklySchedulesController.getWeeklyScheduleById)

module.exports = router;
