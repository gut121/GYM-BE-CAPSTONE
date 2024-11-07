const express = require('express');
const { SessionExercisesController } = require('../controllers');
const { SessionExercisesValidation } = require('../validation');
const { validate } = require('../middlewares/validate');
const router = express.Router();

router.get('/', SessionExercisesController.getAllSessionExercises);

router.get(
  '/:id',
  validate(SessionExercisesValidation.getSessionsExercisesById),
  SessionExercisesController.getSessionsExercisesById
);

router.post(
  '/',
  validate(SessionExercisesValidation.addExerciseToSession), 
  SessionExercisesController.addExerciseToSession
);

router.delete(
  '/',
  validate(SessionExercisesValidation.removeExerciseFromSession), 
  SessionExercisesController.removeExerciseFromSession
);

router.patch(
  '/:sessionId/status',
  validate(SessionExercisesValidation.updateSessionStatus), 
  SessionExercisesController.updateSessionStatus
);


module.exports = router;
