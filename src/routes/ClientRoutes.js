const express = require('express');
const ClientController = require('../controllers/ClientController');
const router = express.Router();

router.get('/:id', ClientController.getClientProfile);

module.exports = router;
