const express = require('express');
const router = express.Router();
const notificationsValidation = require('../validation/NotificationsValidation');
const NotificationsController = require('../controllers/NotificationsController');

// Route cho lấy tất cả thông báo của một user
router.get(
  '/user/:userId/notifications',
  notificationsValidation.getAllNotifications,
  NotificationsController.getAllNotifications
);

// Route cho lấy một thông báo theo ID
router.get(
  '/notifications/:id',
  notificationsValidation.getNotificationById,
  NotificationsController.getNotificationById
);

// Route cho gửi nhắc nhở buổi tập
router.post(
  '/sessions/:sessionId/reminder',
  notificationsValidation.sendSessionReminder,
  NotificationsController.sendSessionReminder
);

// Route cho gửi thông báo sau khi hoàn thành buổi tập
router.post(
  '/sessions/:sessionId/completion',
  notificationsValidation.sendNotificationAfterSessionCompletion,
  NotificationsController.sendNotificationAfterSessionCompletion
);

// Route cho xóa thông báo
router.delete(
  '/notifications/:id',
  notificationsValidation.deleteNotification,
  NotificationsController.deleteNotification
);

module.exports = router;
