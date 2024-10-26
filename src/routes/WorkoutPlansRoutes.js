const express = require('express');
const {WorkoutPlansController} = require('../controllers');
const {WorkoutPlansValidation} = require('../validation');
const router = express.Router();

router.get('/', WorkoutPlansController.getWorkoutPlans)
router.get('/:id',WorkoutPlansValidation.getWorkoutPlanById, WorkoutPlansController.getWorkoutPlanById);
router.post('/create',WorkoutPlansValidation.createWorkoutPlan, WorkoutPlansController.createWorkoutPlan)
router.put('/update',WorkoutPlansValidation.updateWorkoutPlan, WorkoutPlansController.updateWorkoutPlan)
router.delete('/delete/:id',WorkoutPlansValidation.deleteWorkoutPlan, WorkoutPlansController.deleteWorkoutPlan)
module.exports = router;
