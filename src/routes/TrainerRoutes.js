const express = require('express');
const TrainerController = require('../controllers/TrainerController');
const TrainerValidation = require('../validation/TrainerValidation');
const router = express.Router();

router.get('/',TrainerController.getAllTrains)
router.get('/:id',TrainerValidation.getTrainerById, TrainerController.getTrainerById);
module.exports = router;
