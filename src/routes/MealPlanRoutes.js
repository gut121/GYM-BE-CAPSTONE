const express = require('express');
const router = express.Router();
const MealPlanController = require('../controllers/MealPlanController');

router.get('/', MealPlanController.getAllMealPlans);
router.get('/:id', MealPlanController.getMealPlanById);
router.post('/', MealPlanController.createMealPlan);
router.put('/:id', MealPlanController.updateMealPlan);
router.delete('/:id', MealPlanController.deleteMealPlan);

module.exports = router;
