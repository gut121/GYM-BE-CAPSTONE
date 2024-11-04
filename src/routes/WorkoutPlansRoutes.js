const express = require('express');
const { WorkoutPlansController } = require('../controllers');
const { WorkoutPlansValidation } = require('../validation');
const authenticateJWT = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', WorkoutPlansController.getWorkoutPlans);
router.get(
  '/:id',
  WorkoutPlansValidation.getWorkoutPlanById,
  WorkoutPlansController.getWorkoutPlanById
);
router.post(
  '/create',
  authenticateJWT,
  WorkoutPlansValidation.createWorkoutPlan,
  WorkoutPlansController.createWorkoutPlan
);
router.put(
  '/:id',
  WorkoutPlansValidation.updateWorkoutPlan,
  WorkoutPlansController.updateWorkoutPlan
);
router.delete(
  '/:id',
  WorkoutPlansValidation.deleteWorkoutPlan,
  WorkoutPlansController.deleteWorkoutPlan
);
module.exports = router;
