const { Notifications, User, Sessions } = require('../models');

class NotificationsController {
  // Lấy tất cả thông báo của một user
  async getAllNotifications(req, res) {
    try {
      const { userId } = req.params;
      const notifications = await Notifications.findAll({
        where: { user_id: userId },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'username'],
          },
        ],
        order: [['createdAt', 'DESC']],
      });

      res.status(200).json({ success: true, data: notifications });
    } catch (error) {
      console.error('Error fetching notifications:', error);
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
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'username'],
          },
        ],
      });

      if (!notification) {
        return res
          .status(404)
          .json({ success: false, message: 'Notification not found' });
      }

      res.status(200).json({ success: true, data: notification });
    } catch (error) {
      console.error('Error fetching notification:', error);
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  }

  // Gửi nhắc nhở trước buổi tập theo sessionId
  async sendSessionReminder(sessionId) {
    try {
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
        console.error('Session not found');
        return;
      }

      if (session.reminder_sent) {
        console.error('Session reminder already sent');
        return;
      }

      const sessionTime = new Date(session.session_date);
      const currentTime = new Date();

      // Kiểm tra nếu buổi tập sắp diễn ra trong vòng 1 tiếng
      if (
        sessionTime - currentTime <= 3600000 && // 1 giờ (3600 giây * 1000 ms)
        sessionTime - currentTime > 0
      ) {
        const formattedTime = sessionTime.toLocaleTimeString();
        const formattedDate = sessionTime.toLocaleDateString();

        // Gửi email nhắc nhở
        await sendSessionReminderEmail(
          session.client.email,
          formattedTime,
          formattedDate
        );

        // Gửi thông báo
        await Notifications.create({
          user_id: session.client.id,
          content: `Nhắc nhở: Buổi tập của bạn sẽ bắt đầu vào lúc ${formattedTime} ngày ${formattedDate}. Hãy chuẩn bị sẵn sàng!`,
          read_status: false,
          notification_type: 'session_reminder',
        });

        // Đánh dấu buổi tập đã được nhắc nhở
        await session.update({ reminder_sent: true });

        console.log(
          `Session reminder sent successfully for user ${session.client.username}.`
        );
      } else {
        console.log('Session is not within the reminder window.');
      }
    } catch (error) {
      console.error('Error sending session reminder:', error);
    }
  }

  // Gửi tổng kết tuần cho một user cụ thể
  async sendWeeklySummary(userId) {
    try {
      const user = await User.findByPk(userId);

      if (!user || user.role !== 'client') {
        console.error('User not found or not a client');
        return;
      }

      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      const completedSessions = await Sessions.count({
        where: {
          client_id: user.id,
          status: 'completed',
          session_date: {
            [Op.between]: [startOfWeek, endOfWeek],
          },
        },
      });

      const canceledSessions = await Sessions.count({
        where: {
          client_id: user.id,
          status: 'canceled',
          session_date: {
            [Op.between]: [startOfWeek, endOfWeek],
          },
        },
      });

      const content = `Tổng kết tuần: Bạn đã hoàn thành ${completedSessions} buổi tập và hủy ${canceledSessions} buổi. Hãy tiếp tục nỗ lực để đạt kết quả tốt nhất!`;

      // Gửi email tổng kết tuần
      await sendWeeklyNotificationEmail(
        user.email,
        completedSessions,
        canceledSessions
      );

      // Gửi thông báo
      await Notifications.create({
        user_id: user.id,
        content,
        read_status: false,
        notification_type: 'weekly_summary',
      });

      console.log(
        `Weekly summary sent successfully for user ${user.username}.`
      );
    } catch (error) {
      console.error('Error sending weekly summary:', error);
    }
  }
  // Tạo thông báo sau khi buổi tập hoàn thành
  async sendNotificationAfterSessionCompletion(sessionId) {
    try {
      const session = await Sessions.findByPk(sessionId, {
        include: [
          {
            model: User,
            as: 'client',
            attributes: ['id', 'username'],
          },
        ],
      });

      if (!session || session.status !== 'completed') {
        console.error('Session not found or not completed');
        return;
      }

      const content = `Chúc mừng! Bạn đã hoàn thành buổi tập.`;
      await Notifications.create({
        user_id: session.client.id,
        content,
        read_status: false,
      });

      console.log('Notification created successfully for session completion.');
    } catch (error) {
      console.error(
        'Error creating notification after session completion:',
        error
      );
    }
  }

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
      console.error('Error deleting notification:', error);
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  }
}
module.exports = new NotificationsController();
