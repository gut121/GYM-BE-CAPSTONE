const express = require('express');
const ExerciseGuidesController = require('../controllers/ExerciseGuidesController');
const router = express.Router();

router.get('/search', ExerciseGuidesController.getExercisesByNames);

router.get('/', ExerciseGuidesController.getExercises);
router.post('/create', ExerciseGuidesController.createExercise)

module.exports = router;
