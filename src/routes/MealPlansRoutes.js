const express = require('express');
const { MealPlansController } = require('../controllers');
const { MealPlansValidation } = require('../validation');
const authenticateJWT = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', MealPlansController.getMealPlans);
router.get(
  '/:id',
  MealPlansValidation.getMealPlansById,
  MealPlansController.getMealPlanById
);
router.post(
  '/create',
  authenticateJWT,
  MealPlansValidation.createMealPlan,
  MealPlansController.createMealPlan
);
router.put(
  '/update/:id',
  MealPlansValidation.updateMealPlan,
  MealPlansController.updateMealPlan
);
router.delete(
  '/delete/:id',
  MealPlansValidation.deleteMealPlan,
  MealPlansController.deleteMealPlan
);

module.exports = router;
