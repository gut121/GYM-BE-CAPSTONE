const express = require('express');
const {SessionExercisesController} = require('../controllers');
const {SessionExercisesValidation} = require('../validation');
const router = express.Router();


router.get('/', SessionExercisesController.getAllSessionExercises);
router.get('/:id',SessionExercisesValidation.getSessionsExercisesById, SessionExercisesController.getSessionsExercisesById);


module.exports = router;
