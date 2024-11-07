const express = require('express');
const { ClientController } = require('../controllers');
const { ClientValidation } = require('../validation');
const authenticateJWT = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');
const { validate } = require('../middlewares/validate');
const router = express.Router();

// Lấy danh sách tất cả khách hàng
router.get('/', ClientController.getAllClient);

// Lấy hồ sơ khách hàng theo ID
router.get(
  '/:id',validate(
  ClientValidation.getClientProfile),
  authenticateJWT,
  checkRole('client'),
  ClientController.getClientProfile
);
// Route tìm kiếm khách hàng
router.get(
  '/search',
  ClientController.searchClients
);

router.put(
  '/update',
  validate(ClientValidation.updateClientProfile),
  authenticateJWT,
  checkRole('client'),
  ClientController.updateClientProfile
);

module.exports = router;
