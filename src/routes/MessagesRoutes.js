const express = require('express');
const {MessagesController} = require('../controllers');
const {MessagesValidation} = require('../Validations');
const { validate } = require('../middlewares/validate');
const router = express.Router();


// Lấy tất cả tin nhắn giữa 2 người dùng
router.get(
  '/:sender_id/:receiver_id',
  validate(MessagesValidation.getMessagesValidation),

  MessagesController.getMessages
);

// Gửi tin nhắn mới
router.post(
  '/',
  validate(MessagesValidation.createMessageValidation),
  MessagesController.createMessage
);

// Xóa tin nhắn
router.delete(
  '/:id',
  validate(MessagesValidation.deleteMessageValidation),
  MessagesController.deleteMessage
);

// Cập nhật trạng thái tin nhắn
router.put(
  '/:id/status',
  validate( MessagesValidation.updateMessageStatusValidation),
  MessagesController.updateMessageStatus
);

module.exports = router;
