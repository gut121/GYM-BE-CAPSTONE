const express = require('express');
const ClientController = require('../controllers/ClientController');
const UserController = require('../controllers/UserController');
const ClientValidation = require('../validation/ClientValidation');
const router = express.Router();

router.get('/', ClientController.getAllClient);

router.get('/:id', ClientValidation.getClientProfileById, ClientController.getClientProfileById);


router.put('/update/avatar/:id', UserController.updateAvatar)

module.exports = router;
