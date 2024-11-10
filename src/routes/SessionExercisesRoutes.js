const express = require('express');
const { SessionExercisesController } = require('../controllers');
const { SessionExercisesValidation } = require('../validation');
const authenticateJWT = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');
const { validate } = require('../middlewares/validate');
const router = express.Router();

router.get('/', SessionExercisesController.getAllSessionExercises);

router.get(
  '/:session_id/:exercise_id',
  validate(SessionExercisesValidation.getSessionsExercisesById),
  SessionExercisesController.getSessionExerciseById
);

router.post(
  '/create',
  validate(SessionExercisesValidation.addExerciseToSession),
  authenticateJWT,
  checkRole('trainer'),
  SessionExercisesController.addExerciseToSession
);

router.delete(
  '/',
  validate(SessionExercisesValidation.removeExerciseFromSession),
  authenticateJWT,
  checkRole('trainer'),
  SessionExercisesController.removeExerciseFromSession
);

// Cập nhật trạng thái của buổi tập
router.put(
  '/:sessionId/status',
  validate(SessionExercisesValidation.updateSessionStatus),
  authenticateJWT,
  checkRole(['trainer', 'client']),
  SessionExercisesController.updateSessionStatus
);

module.exports = router;
