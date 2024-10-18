const express = require('express');
const {UserController, ClientController} = require('../controllers');
const ClientValidation = require('../validation/ClientValidation');
const router = express.Router();

router.get('/', ClientController.getAllClient)
router.get('/:id', ClientValidation.getClientProfileById, ClientController.getClientProfileById);
router.put('/update/avatar/:id', UserController.updateAvatar)

module.exports = router;
