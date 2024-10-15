const express = require('express');
const MealPlansController = require('../controllers/MealPlansController');
const router = express.Router();

router.get('/', MealPlansController.getMealPlans)
router.get('/:id', MealPlansController.getMealPlansById);

module.exports = router;