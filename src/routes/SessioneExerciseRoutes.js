const express = require('express');
const router = express.Router();
const SessionExercisesController = require('../controllers/SessionExercisesController');

router.post('/sessionexercises', SessionExercisesController.createSessionExercise);
router.get('/sessionexercises/:session_id', SessionExercisesController.getSessionExercises);
router.put('/sessionexercises/:id', SessionExercisesController.updateSessionExercise);
router.delete('/sessionexercises/:id', SessionExercisesController.deleteSessionExercise);

module.exports = router;
