const { Notifications, User, Sessions } = require('../models');
const {
  sendSessionReminderEmail,
  sendWeeklyNotificationEmail,
} = require('../mail/emails');
const { Op } = require('sequelize');

class NotificationsController {
  // Lấy tất cả thông báo của một user
  async getAllNotifications(req, res) {
    try {
      const { userId } = req.params;
      const notifications = await Notifications.findAll({
        where: { user_id: userId },
        include: [{ model: User, as: 'user', attributes: ['id', 'username'] }],
        order: [['createdAt', 'DESC']],
      });
      res.status(200).json({ success: true, data: notifications });
    } catch (error) {
      console.error('Error fetching notifications:', error.message);
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  }

  // Lấy một thông báo theo ID
  async getNotificationById(req, res) {
    try {
      const { id } = req.params;
      const notification = await Notifications.findByPk(id, {
        include: [{ model: User, as: 'user', attributes: ['id', 'username'] }],
      });
      if (!notification) {
        return res
          .status(404)
          .json({ success: false, message: 'Notification not found' });
      }
      res.status(200).json({ success: true, data: notification });
    } catch (error) {
      console.error('Error fetching notification:', error.message);
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  }

  // Gửi nhắc nhở trước buổi tập
  async sendSessionReminder(req, res) {
    try {
      const { sessionId } = req.params;
      const session = await Sessions.findByPk(sessionId, {
        include: [
          {
            model: User,
            as: 'client',
            attributes: ['id', 'username', 'email'],
          },
        ],
      });

      if (!session) {
        return res
          .status(404)
          .json({ success: false, message: 'Session not found' });
      }

      if (session.reminder_sent) {
        return res
          .status(400)
          .json({ success: false, message: 'Session reminder already sent' });
      }

      const sessionTime = new Date(session.session_date);
      const currentTime = new Date();

      if (
        sessionTime - currentTime <= 3600000 &&
        sessionTime - currentTime > 0
      ) {
        const formattedTime = sessionTime.toLocaleTimeString();
        const formattedDate = sessionTime.toLocaleDateString();

        await sendSessionReminderEmail(
          session.client.email,
          formattedTime,
          formattedDate
        );

        await Notifications.create({
          user_id: session.client.id,
          content: `Nhắc nhở: Buổi tập của bạn sẽ bắt đầu vào lúc ${formattedTime} ngày ${formattedDate}.`,
          read_status: false,
          notification_type: 'session_reminder',
        });

        await session.update({ reminder_sent: true });

        return res
          .status(200)
          .json({
            success: true,
            message: 'Session reminder sent successfully',
          });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Session is not within the reminder window.',
        });
      }
    } catch (error) {
      console.error('Error sending session reminder:', error.message);
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  }

  // Gửi tổng kết tuần
  async sendWeeklySummary(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId);

      if (!user || user.role !== 'client') {
        return res.status(404).json({
          success: false,
          message: 'User not found or not a client',
        });
      }

      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      const completedSessions = await Sessions.count({
        where: {
          client_id: userId,
          status: 'completed',
          session_date: { [Op.between]: [startOfWeek, endOfWeek] },
        },
      });

      const canceledSessions = await Sessions.count({
        where: {
          client_id: userId,
          status: 'canceled',
          session_date: { [Op.between]: [startOfWeek, endOfWeek] },
        },
      });

      const content = `Tổng kết tuần: Bạn đã hoàn thành ${completedSessions} buổi tập và hủy ${canceledSessions} buổi.`;

      await sendWeeklyNotificationEmail(
        user.email,
        completedSessions,
        canceledSessions
      );

      await Notifications.create({
        user_id: userId,
        content,
        read_status: false,
        notification_type: 'weekly_summary',
      });

      return res.status(200).json({
        success: true,
        message: 'Weekly summary sent successfully',
        data: { completedSessions, canceledSessions },
      });
    } catch (error) {
      console.error('Error sending weekly summary:', error.message);
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  }

  // Gửi thông báo sau khi hoàn thành buổi tập
  async sendNotificationAfterSessionCompletion(req, res) {
    try {
      const { sessionId } = req.params;
      const session = await Sessions.findByPk(sessionId, {
        include: [
          { model: User, as: 'client', attributes: ['id', 'username'] },
        ],
      });

      if (!session || session.status !== 'completed') {
        return res.status(400).json({
          success: false,
          message: 'Session not found or not completed',
        });
      }

      const content = `Chúc mừng! Bạn đã hoàn thành buổi tập.`;
      await Notifications.create({
        user_id: session.client.id,
        content,
        read_status: false,
      });

      return res
        .status(200)
        .json({ success: true, message: 'Notification sent successfully' });
    } catch (error) {
      console.error(
        'Error sending session completion notification:',
        error.message
      );
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  }

  // Xóa thông báo
  async deleteNotification(req, res) {
    try {
      const { id } = req.params;
      const notification = await Notifications.findByPk(id);
      if (!notification) {
        return res
          .status(404)
          .json({ success: false, message: 'Notification not found' });
      }
      await notification.destroy();
      res
        .status(200)
        .json({ success: true, message: 'Notification deleted successfully' });
    } catch (error) {
      console.error('Error deleting notification:', error.message);
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  }
}

module.exports = new NotificationsController();
