const express = require('express');
const { TrainerController } = require('../controllers');
const { TrainerValidation } = require('../validation');
const authenticateJWT = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole'); 
const { validate } = require('../middlewares/validate'); 
const router = express.Router();

router.post(
  '/register',
  validate(TrainerValidation.register),
  TrainerController.register
);

router.get('/', TrainerController.getAllTrains);

router.get(
  '/:id',
  validate(TrainerValidation.getTrainerById),
  TrainerController.getTrainerById
);

router.put(
  '/update/:id',
  authenticateJWT,
  checkRole('trainer'),
  validate(TrainerValidation.updateTrainerProfile),
  TrainerController.updateTrainerProfile
);

router.delete(
  '/delete/:id',
  authenticateJWT,
  checkRole('admin'),
  validate(TrainerValidation.deleteTrainer),
  TrainerController.deleteTrainer
);
router.get(
  '/by-username',
  validate(TrainerValidation.getTrainerByUsername),
  TrainerController.getTrainerByUsername
);

router.get(
  '/by-specialties',
  validate(TrainerValidation.searchTrainersBySpecialties),
  TrainerController.searchTrainersBySpecialties
);
module.exports = router;
