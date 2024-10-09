const express = require('express');
const WorkoutPlansController = require('../controllers/WorkoutPlansController');
const router = express.Router();

router.get('/', WorkoutPlansController.getAllWorkoutPlans);

module.exports = router;
