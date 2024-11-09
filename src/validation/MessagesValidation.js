const { body, param } = require('express-validator');

const MessagesValidation = {
  // Xác thực khi gửi tin nhắn mới
  createMessageValidation: [
    body('sender_id')
      .isInt({ gt: 0 })
      .withMessage('Sender ID must be a positive integer.'),
    body('receiver_id')
      .isInt({ gt: 0 })
      .withMessage('Receiver ID must be a positive integer.'),
    body('message')
      .optional()
      .isString()
      .withMessage('Message must be a string.'),
    body('media_url')
      .optional()
      .isURL()
      .withMessage('Media URL must be a valid URL.'),
    body('media_type')
      .optional()
      .isIn(['image', 'video'])
      .withMessage('Media type must be either "image" or "video".'),
  ],

  // Xác thực khi xóa tin nhắn
  deleteMessageValidation: [
    param('id')
      .isInt({ gt: 0 })
      .withMessage('Message ID must be a positive integer.'),
  ],

  // Xác thực khi lấy tin nhắn giữa 2 người
  getMessagesValidation: [
    param('sender_id')
      .isInt({ gt: 0 })
      .withMessage('Sender ID must be a positive integer.'),
    param('receiver_id')
      .isInt({ gt: 0 })
      .withMessage('Receiver ID must be a positive integer.'),
  ],

  // Xác thực khi cập nhật trạng thái tin nhắn
  updateMessageStatusValidation: [
    param('id')
      .isInt({ gt: 0 })
      .withMessage('Message ID must be a positive integer.'),
    body('status')
      .isIn(['sent', 'delivered', 'read'])
      .withMessage('Status must be either "sent", "delivered", or "read".'),
  ],
};

module.exports = MessagesValidation;
