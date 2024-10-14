const express = require('express');
const TrainerController = require('../controllers/TrainerController');
const router = express.Router();


router.get('/:id', TrainerController.getTrainerProfile);

module.exports = router;
