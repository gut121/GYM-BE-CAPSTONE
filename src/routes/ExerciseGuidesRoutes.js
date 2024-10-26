const express = require('express');
const {ExerciseGuidesController} = require('../controllers');
const {ExerciseGuidesValidation} = require('../validation');
const authenticateJWT = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/search', ExerciseGuidesValidation.getExercisesByNames, ExerciseGuidesController.getExercisesByNames);
router.get('/', ExerciseGuidesController.getExercises);
router.post('/create', authenticateJWT, ExerciseGuidesValidation.createExercise, ExerciseGuidesController.createExercise)

module.exports = router;
