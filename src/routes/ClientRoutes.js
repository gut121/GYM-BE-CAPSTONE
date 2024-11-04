const express = require('express');
const { UserController, ClientController } = require('../controllers');
const { UserValidation, ClientValidation } = require('../validation');
const router = express.Router();

router.get('/', ClientController.getAllClient);
router.get(
  '/:id',
  ClientValidation.getClientProfileById,
  ClientController.getClientProfileById
);
router.put(
  '/update/avatar/:id',
  UserValidation.updateAvatar,
  UserController.updateAvatar
);

module.exports = router;
