const express = require('express');
const {NotificationsValidation} = require('../validation')
const {NotificationsController} = require('../controllers');
const { validate } = require('../middlewares/validate');
const router = express.Router();


router.get(
  '/user/:userId/notifications',
  validate(NotificationsValidationotificationsValidation).getAllNotifications,
  NotificationsController.getAllNotifications
);


router.get(
  '/notifications/:id',
  validate(NotificationsValidation.getNotificationById),
  NotificationsController.getNotificationById
);


router.post(
  '/sessions/:sessionId/reminder',
  validate(NotificationsValidation.sendSessionReminder),
  NotificationsController.sendSessionReminder
);


router.post(
  '/sessions/:sessionId/completion',
  validate(NotificationsValidation.sendNotificationAfterSessionCompletion),
  NotificationsController.sendNotificationAfterSessionCompletion
);


router.delete(
  '/notifications/:id',
  validate(NotificationsValidation.deleteNotification),
  NotificationsController.deleteNotification
);

module.exports = router;
