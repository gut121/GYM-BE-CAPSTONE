// validation/notificationsValidation.js
const { body, param } = require('express-validator');

const notificationsValidation = {
  // Validation cho lấy tất cả thông báo của một user
  getAllNotifications: [
    param('userId')
      .isInt({ gt: 0 })
      .withMessage('User ID must be a positive integer'),
  ],

  // Validation cho lấy một thông báo theo ID
  getNotificationById: [
    param('id')
      .isInt({ gt: 0 })
      .withMessage('Notification ID must be a positive integer'),
  ],

  // Validation cho gửi nhắc nhở buổi tập
  sendSessionReminder: [
    param('sessionId')
      .isInt({ gt: 0 })
      .withMessage('Session ID must be a positive integer'),
  ],

  // Validation cho gửi thông báo sau khi hoàn thành buổi tập
  sendNotificationAfterSessionCompletion: [
    param('sessionId')
      .isInt({ gt: 0 })
      .withMessage('Session ID must be a positive integer'),
  ],

  // Validation cho xóa thông báo
  deleteNotification: [
    param('id')
      .isInt({ gt: 0 })
      .withMessage('Notification ID must be a positive integer'),
  ],
};

module.exports = notificationsValidation;
