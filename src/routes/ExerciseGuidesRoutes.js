const express = require('express');
const ExerciseGuidesController = require('../controllers/ExerciseGuidesController');
const router = express.Router();


router.post('/', ExerciseGuidesController.createExercise);
router.get('/', ExerciseGuidesController.getExercises);
router.put('/:id', ExerciseGuidesController.updateExercise);
router.delete('/:id', ExerciseGuidesController.deleteExercise);

module.exports = router;
