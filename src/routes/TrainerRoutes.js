const express = require('express');
const { UserController, TrainerController } = require('../controllers');
const { TrainerValidation } = require('../validation');
const { validate } = require('node-cron');
const router = express.Router();

router.post(
  '/register',
  TrainerValidation.register,
  TrainerController.register
);
router.get('/', TrainerController.getAllTrains);
router.get(
  '/:id',
  TrainerValidation.getTrainerById,
  TrainerController.getTrainerById
);
router.put('/update/avatar/:id', UserController.updateAvatar);
module.exports = router;
