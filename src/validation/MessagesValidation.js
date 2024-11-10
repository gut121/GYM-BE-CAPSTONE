const { body, param } = require('express-validator');

const MessagesValidation = {
  // Xác thực khi gửi tin nhắn mới
  sendMessageValidation: [
    body('sender_id')
      .isInt({ gt: 0 })
      .withMessage('Sender ID must be a positive integer.'),
    body('receiver_id')
      .isInt({ gt: 0 })
      .withMessage('Receiver ID must be a positive integer.'),
    body('message')
      .optional()
      .custom((value) => {
        if (value === null || value === '') return true; // Chấp nhận null hoặc chuỗi rỗng
        try {
          return true;
        } catch {
          throw new Error('Message must be a string or null');
        }
      }),
    body('media_url')
      .optional()
      .custom((value) => {
        if (value === null || value === '') return true; // Chấp nhận null hoặc chuỗi rỗng
        try {
          new URL(value); // Kiểm tra xem có phải URL hợp lệ không
          return true;
        } catch {
          throw new Error('Media URL must be a valid URL or null');
        }
      }),
    body('media_type')
      .optional()
      .custom((value) => {
        if (value === null || value === '') return true; // Chấp nhận null hoặc chuỗi rỗng
        try {
          new URL(value); // Kiểm tra xem có phải URL hợp lệ không
          return true;
        } catch {
          throw new Error('Media URL must be a valid URL or null');
        }
      }),
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
