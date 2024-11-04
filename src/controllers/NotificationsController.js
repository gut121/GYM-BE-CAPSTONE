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

  async sendSessionReminder(sessionId) {
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

      if (!session) {
        console.error('Session not found');
        return;
      }

      const sessionTime = new Date(session.session_date);
      const currentTime = new Date();

      // Kiểm tra nếu thời gian hiện tại gần với thời gian của buổi tập (ví dụ: trước 1 giờ)
      if (
        sessionTime - currentTime <= 3600000 &&
        sessionTime - currentTime > 0
      ) {
        const content = `Nhắc nhở: Bạn có buổi tập vào lúc ${sessionTime.toLocaleTimeString()} ngày ${sessionTime.toLocaleDateString()}.`;
        await Notifications.create({
          user_id: session.client.id,
          content,
          read_status: false,
        });

        console.log('Session reminder sent successfully.');
      }
    } catch (error) {
      console.error('Error sending session reminder:', error);
    }
  }
  //Gửi thông báo tổng kết hiệu suất của khách hàng hàng tuần:const { Op } = require('sequelize'); // Import Sequelize operators
  async sendWeeklySummary() {
    try {
      // Tìm kiếm người dùng dựa trên userId
      const { id } = req.user;
      const user = await User.findByPk(id);
      if (!user) {
        console.error('User not found');
        return;
      }

      // Kiểm tra nếu vai trò của người dùng không phải là 'client', không gửi thông báo
      if (user.role !== 'client') {
        console.log('User is not a client, no summary will be sent.');
        return;
      }

      // Xác định khoảng thời gian của tuần hiện tại
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Đặt về ngày đầu tuần (Chủ nhật)
      startOfWeek.setHours(0, 0, 0, 0); // Đặt giờ về 0:00:00

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Đặt ngày cuối tuần (Thứ Bảy)
      endOfWeek.setHours(23, 59, 59, 999); // Đặt giờ về 23:59:59

      // Lấy số buổi đã hoàn thành của người dùng trong tuần
      const completedSessionsCount = await Sessions.count({
        where: {
          client_id: user.id,
          status: 'completed',
          session_date: {
            [Op.between]: [startOfWeek, endOfWeek], // Trong khoảng thời gian của tuần
          },
        },
      });

      // Lấy số buổi bị hủy của người dùng trong tuần
      const canceledSessionsCount = await Sessions.count({
        where: {
          client_id: user.id,
          status: 'canceled',
          session_date: {
            [Op.between]: [startOfWeek, endOfWeek], // Trong khoảng thời gian của tuần
          },
        },
      });

      // Tạo nội dung thông báo dựa trên dữ liệu tính toán
      const content = `Tổng kết tuần: Bạn đã hoàn thành ${completedSessionsCount} buổi tập và hủy ${canceledSessionsCount} buổi. Hãy tiếp tục nỗ lực nhé để đạt được kết quả tốt nhất !`;

      // Tạo một thông báo mới trong bảng Notifications với nội dung đã tạo
      await Notifications.create({
        user_id: user.id,
        content,
        read_status: false,
      });

      console.log('Weekly summary sent successfully.');
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
