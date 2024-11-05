const express = require('express');
const router = express.Router();
const {NotificationsValidation} = require('../validation')
const {NotificationsController} = require('../controllers');

// Route cho lấy tất cả thông báo của một user
router.get(
  '/user/:userId/notifications',
  NotificationsValidationotificationsValidation.getAllNotifications,
  NotificationsController.getAllNotifications
);

// Route cho lấy một thông báo theo ID
router.get(
  '/notifications/:id',
  NotificationsValidation.getNotificationById,
  NotificationsController.getNotificationById
);

// Route cho gửi nhắc nhở buổi tập
router.post(
  '/sessions/:sessionId/reminder',
  NotificationsValidation.sendSessionReminder,
  NotificationsController.sendSessionReminder
);

// Route cho gửi thông báo sau khi hoàn thành buổi tập
router.post(
  '/sessions/:sessionId/completion',
  NotificationsValidation.sendNotificationAfterSessionCompletion,
  NotificationsController.sendNotificationAfterSessionCompletion
);

// Route cho xóa thông báo
router.delete(
  '/notifications/:id',
  NotificationsValidation.deleteNotification,
  NotificationsController.deleteNotification
);

module.exports = router;
