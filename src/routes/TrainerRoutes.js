const express = require('express');
const { TrainerController } = require('../controllers');
const { TrainerValidation } = require('../validation');
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
module.exports = router;
