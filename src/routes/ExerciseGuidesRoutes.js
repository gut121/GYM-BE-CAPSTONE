const express = require('express');
const { ExerciseGuidesController } = require('../controllers');
const { ExerciseGuidesValidation } = require('../validation');
const { validate } = require('../middlewares/validate');
const authenticateJWT = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');
const router = express.Router();

router.get(
  '/search',
  validate(ExerciseGuidesValidation.getExercisesByNames),
  ExerciseGuidesController.getExercisesByNames
);
router.get('/', ExerciseGuidesController.getExercises);
router.post(
  '/create',
  authenticateJWT,checkRole('admin'),
  validate(ExerciseGuidesValidation.createExercise),
  ExerciseGuidesController.createExercise
);
router.put(
  '/update/:id',
  authenticateJWT,checkRole('admin'),
  validate(ExerciseGuidesValidation.updateExercise),
  ExerciseGuidesController.updateExercise
);

// Xóa bài tập
router.delete(
  '/delete/:id',
  authenticateJWT,
  ExerciseGuidesController.deleteExercise
);

module.exports = router;
