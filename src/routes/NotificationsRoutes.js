const express = require('express');
const { validate } = require('../middlewares/validate');
const { NotificationsValidation } = require('../validation');
const { NotificationsController } = require('../controllers');
const router = express.Router();

// Lấy tất cả thông báo của một user
router.get(
  '/user/:userId/notifications',
  validate(NotificationsValidation.getAllNotifications),
  NotificationsController.getAllNotifications
);

// Lấy một thông báo theo ID
router.get(
  '/notifications/:id',
  validate(NotificationsValidation.getNotificationById),
  NotificationsController.getNotificationById
);

// Gửi nhắc nhở trước buổi tập
router.post(
  '/sessions/:sessionId/reminder',
  validate(NotificationsValidation.sendSessionReminder),
  NotificationsController.sendSessionReminder
);

// Gửi thông báo sau khi hoàn thành buổi tập
router.post(
  '/sessions/:sessionId/completion',
  validate(NotificationsValidation.sendNotificationAfterSessionCompletion),
  NotificationsController.sendNotificationAfterSessionCompletion
);

// Gửi tổng kết tuần
router.post(
  '/user/:userId/weekly-summary',
  validate(NotificationsValidation.sendWeeklySummary),
  NotificationsController.sendWeeklySummary
);

// Xóa một thông báo
router.delete(
  '/notifications/:id',
  validate(NotificationsValidation.deleteNotification),
  NotificationsController.deleteNotification
);

module.exports = router;