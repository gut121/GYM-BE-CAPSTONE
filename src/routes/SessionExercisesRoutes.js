const express = require('express');
const SessionExercisesController = require('../controllers/SessionExercisesController');
const SessionsExercisesValidation = require('../validation/SessionExercisesValidation');
const router = express.Router();


router.get('/', SessionExercisesController.getAllSessionExercises);
router.get('/:id',SessionsExercisesValidation.getSessionsExercisesById, SessionExercisesController.getSessionExercisesBySessionId);


module.exports = router;
