const { body, param } = require('express-validator');

const NotificationsValidation = {
  // Validation cho lấy tất cả thông báo của một user
  getAllNotifications: [
    param('userId')
      .exists()
      .withMessage('User ID is required')
      .isInt({ gt: 0 })
      .withMessage('User ID must be a positive integer'),
  ],

  // Validation cho lấy một thông báo theo ID
  getNotificationById: [
    param('id')
      .exists()
      .withMessage('Notification ID is required')
      .isInt({ gt: 0 })
      .withMessage('Notification ID must be a positive integer'),
  ],

  // Validation cho gửi nhắc nhở buổi tập
  sendSessionReminder: [
    param('sessionId')
      .exists()
      .withMessage('Session ID is required')
      .isInt({ gt: 0 })
      .withMessage('Session ID must be a positive integer'),
  ],

  // Validation cho gửi thông báo sau khi hoàn thành buổi tập
  sendNotificationAfterSessionCompletion: [
    param('sessionId')
      .exists()
      .withMessage('Session ID is required')
      .isInt({ gt: 0 })
      .withMessage('Session ID must be a positive integer'),
  ],

  // Validation cho gửi tổng kết tuần
  sendWeeklySummary: [
    param('userId')
      .exists()
      .withMessage('User ID is required')
      .isInt({ gt: 0 })
      .withMessage('User ID must be a positive integer'),
  ],

  // Validation cho xóa thông báo
  deleteNotification: [
    param('id')
      .exists()
      .withMessage('Notification ID is required')
      .isInt({ gt: 0 })
      .withMessage('Notification ID must be a positive integer'),
  ],
};

module.exports = NotificationsValidation;
