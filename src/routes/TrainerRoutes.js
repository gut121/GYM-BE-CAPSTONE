const express = require('express');
const{ UserController, TrainerController} = require('../controllers');
const TrainerValidation = require('../validation/TrainerValidation');
const router = express.Router();

router.get('/',TrainerController.getAllTrains)
router.get('/:id',TrainerValidation.getTrainerById, TrainerController.getTrainerById);
router.put('/update/avatar/:id', UserController.updateAvatar)
module.exports = router;
