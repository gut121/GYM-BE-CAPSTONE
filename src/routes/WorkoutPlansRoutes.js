const express = require('express');
const { WorkoutPlansController } = require('../controllers');
const { WorkoutPlansValidation } = require('../validation');
const authenticateJWT = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');
const { validate } = require('../middlewares/validate');
const router = express.Router();

router.get('/', WorkoutPlansController.getWorkoutPlans);
router.get(
  '/:id',
  validate(WorkoutPlansValidation.getWorkoutPlanById),
  WorkoutPlansController.getWorkoutPlanById
);
router.post(
  '/create',
  authenticateJWT,
  checkRole('trainer'),
  validate(WorkoutPlansValidation.createWorkoutPlan),
  WorkoutPlansController.createWorkoutPlan
);
router.put(
  '/:id',
  validate(WorkoutPlansValidation.updateWorkoutPlan),
  authenticateJWT,
  checkRole(['trainer', 'client']),
  WorkoutPlansController.updateWorkoutPlan
);
router.delete(
  '/:id',
  validate(WorkoutPlansValidation.deleteWorkoutPlan),
  WorkoutPlansController.deleteWorkoutPlan
);
module.exports = router;
