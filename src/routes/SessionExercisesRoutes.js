const express = require('express');

const SessionExercisesController = require('../controllers/SessionExercisesController');
const router = express.Router();


router.get('/', SessionExercisesController.getAllSessionExercises);
router.get('/:id', SessionExercisesController.getSessionExercisesBySessionId);


module.exports = router;
