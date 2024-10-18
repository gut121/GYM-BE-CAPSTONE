const express = require('express');
const WorkoutPlansController = require('../controllers/WorkoutPlansController');
const WorkoutPlansValidation = require('../validation/WorkoutPlansValidation');
const router = express.Router();

router.get('/', WorkoutPlansController.getWorkoutPlans)
router.get('/:id',WorkoutPlansValidation.getWorkoutPlanById, WorkoutPlansController.getWorkoutPlanById);

module.exports = router;
