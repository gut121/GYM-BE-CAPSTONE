const express = require('express');
const { MealPlansController } = require('../controllers');
const { MealPlansValidation } = require('../validation');
const { validate } = require('../middlewares/validate');
const authenticateJWT = require('../middlewares/authMiddleware');
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
  validate(MealPlansValidation.createMealPlan),
  MealPlansController.createMealPlan
);
router.put(
  '/update/:id', authenticateJWT,
  validate(MealPlansValidation.updateMealPlan),
  MealPlansController.updateMealPlan
);
router.delete(
  '/delete/:id',
  validate(MealPlansValidation.deleteMealPlan),
  MealPlansController.deleteMealPlan
);

module.exports = router;
