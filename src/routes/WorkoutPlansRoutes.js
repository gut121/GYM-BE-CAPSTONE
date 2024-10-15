const express = require('express');
const WorkoutPlansController = require('../controllers/WorkoutPlansController');
const router = express.Router();

router.get('/', WorkoutPlansController.getWorkoutPlans)
router.get('/:id', WorkoutPlansController.getWorkoutPlanById);

module.exports = router;
