const express = require('express');
const ExerciseGuidesController = require('../controllers/ExerciseGuidesController');
const ExercieGuidesValidation = require('../validation/ExerciseGuidesValidation');
const authenticateJWT = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/search', ExercieGuidesValidation.getExercisesByNames, ExerciseGuidesController.getExercisesByNames);
router.get('/', ExerciseGuidesController.getExercises);
router.post('/create', authenticateJWT, ExercieGuidesValidation.createExercise, ExerciseGuidesController.createExercise)

module.exports = router;
