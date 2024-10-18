const express = require('express');
const WeeklySchedulesController = require('../controllers/WeeklySchedulesController');
const WeeklySchedulesValidation = require('../validation/WeeklySchedulesValidation');
const authenticateJWT = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', WeeklySchedulesController.getWeeklySchedule);
router.get('/:id',WeeklySchedulesValidation.getWeeklyScheduleById, WeeklySchedulesController.getWeeklyScheduleById)
router.post('/create',authenticateJWT, WeeklySchedulesController.createWeeklySchedule)

module.exports = router;
