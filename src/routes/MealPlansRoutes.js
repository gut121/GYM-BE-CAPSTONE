const express = require('express');
const { MealPlansController } = require('../controllers');
const { MealPlansValidation } = require('../validation');
const authenticateJWT = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');
const { validate } = require('../middlewares/validate');
const router = express.Router();

router.get('/', MealPlansController.getMealPlans);
router.get(
  '/:id',
  validate(MealPlansValidation.getMealPlansById),
  MealPlansController.getMealPlanById
);
router.post(
  '/create',
  authenticateJWT,
  checkRole('trainer'),
  validate(MealPlansValidation.createMealPlan),
  MealPlansController.createMealPlan
);
router.put(
  '/update/:id', 
  authenticateJWT,
  checkRole(['trainer', 'client']),
  validate(MealPlansValidation.updateMealPlan),
  MealPlansController.updateMealPlan
);
router.delete(
  '/delete/:id',
  validate(MealPlansValidation.deleteMealPlan),
  MealPlansController.deleteMealPlan
);

module.exports = router;
