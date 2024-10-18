const express = require('express');
const MealPlansController = require('../controllers/MealPlansController');
const MealPlansValidation = require('../validation/MealPlansValidation');
const router = express.Router();

router.get('/', MealPlansController.getMealPlans)
router.get('/:id',MealPlansValidation.getMealPlansById, MealPlansController.getMealPlansById);

module.exports = router;