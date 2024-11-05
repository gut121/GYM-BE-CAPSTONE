const express = require('express');
const { UserController, ClientController } = require('../controllers');
const { UserValidation, ClientValidation } = require('../validation');
const router = express.Router();

// Lấy danh sách tất cả khách hàng
router.get('/', ClientController.getAllClient);

// Lấy hồ sơ khách hàng theo ID
router.get(
  '/:id',
  ClientValidation.getClientProfileById,
  ClientController.getClientProfileById
);
// Route tìm kiếm khách hàng
router.get(
  '/search',
  ClientController.searchClients
);

// Tạo hồ sơ khách hàng mới
router.post(
  '/create',
  ClientValidation.createClientProfile,
  ClientController.createClientProfile
);

// Cập nhật hồ sơ khách hàng
router.put(
  '/update/:id',
  ClientValidation.updateClientProfile,
  ClientController.updateClientProfile
);

// Xóa hồ sơ khách hàng
router.delete(
  '/delete/:id',
  ClientValidation.deleteClientProfile,
  ClientController.deleteClientProfile
);

// Cập nhật avatar người dùng
router.put(
  '/update/avatar/:id',
  UserValidation.updateAvatar,
  UserController.updateAvatar
);

module.exports = router;
