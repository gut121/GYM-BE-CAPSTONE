const cron = require('node-cron');
const { Op } = require('sequelize');
const { WorkoutPlans, Sessions, Notifications, User } = require('../models');
const {
  sendWeeklyNotificationEmail,
  sendSessionReminderEmail,
} = require('../mail/emails');
const { transporter } = require('../config/mail');

// Cron job: Gửi nhắc nhở trước mỗi buổi tập (chạy mỗi 10 phút)
cron.schedule('*/10 * * * *', async () => {
  console.log('Đang kiểm tra các buổi tập sắp diễn ra...');

  const upcomingSessionsTime = new Date();
  upcomingSessionsTime.setHours(upcomingSessionsTime.getHours() + 1);

  try {
    const sessions = await Sessions.findAll({
      where: {
        session_date: {
          [Op.between]: [new Date(), upcomingSessionsTime],
        },
        status: 'pending',
        reminder_sent: false, // Chỉ chọn các buổi tập chưa được nhắc nhở
      },
      include: [
        {
          model: User,
          as: 'client',
          attributes: ['id', 'username', 'email'],
        },
      ],
    });

    for (const session of sessions) {
      const { client, session_date } = session;
      const formattedTime = session_date.toLocaleTimeString();
      const formattedDate = session_date.toLocaleDateString();

      // Gửi email nhắc nhở
      await sendSessionReminderEmail(client.email, formattedTime, formattedDate);

      // Gửi thông báo
      await Notifications.create({
        user_id: client.id,
        content: `Nhắc nhở: Buổi tập của bạn sẽ bắt đầu vào lúc ${formattedTime} ngày ${formattedDate}. Hãy chuẩn bị sẵn sàng!`,
        read_status: false,
        notification_type: 'session_reminder',
      });

      // Đánh dấu buổi tập đã được nhắc nhở
      await session.update({ reminder_sent: true });

      console.log(`Đã gửi nhắc nhở cho khách hàng ${client.username}.`);
    }
  } catch (error) {
    console.error('Lỗi khi gửi nhắc nhở buổi tập:', error);
  }
});

// Cron job: Gửi thông báo tổng kết tuần (chạy vào Chủ nhật lúc 18:00)
cron.schedule('0 18 * * 0', async () => {
  console.log('Đang xử lý gửi thông báo tổng kết tuần...');

  try {
    const users = await User.findAll({ where: { role: 'client' } });

    for (const user of users) {
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
      await sendWeeklyNotificationEmail(user.email, completedSessions, canceledSessions);

      console.log(`Đã gửi tổng kết tuần cho khách hàng ${user.username}.`);
    }
  } catch (error) {
    console.error('Lỗi khi gửi thông báo tổng kết tuần:', error);
  }
});
