const cron = require('node-cron');
const { Op } = require('sequelize');
const { Sessions, Notifications, User } = require('../models');
const {
  sendSessionReminderEmail,
  sendWeeklyNotificationEmail,
} = require('../mail/emails');

// Cron job: Gửi nhắc nhở trước mỗi buổi tập (chạy mỗi 10 phút)
cron.schedule('*/10 * * * *', async () => {
  console.log('Cron Job - Kiểm tra các buổi tập sắp diễn ra...');

  const upcomingSessionsTime = new Date();
  upcomingSessionsTime.setHours(upcomingSessionsTime.getHours() + 1);

  try {
    const sessions = await Sessions.findAll({
      where: {
        session_date: {
          [Op.between]: [new Date(), upcomingSessionsTime],
        },
        status: 'pending',
        reminder_sent: false,
      },
      include: [
        {
          model: User,
          as: 'client',
          attributes: ['id', 'username', 'email'],
        },
      ],
    });

    if (!sessions.length) {
      console.log('Không có buổi tập nào cần nhắc nhở.');
      return;
    }

    for (const session of sessions) {
      try {
        const { client, session_date } = session;
        const formattedTime = session_date.toLocaleTimeString();
        const formattedDate = session_date.toLocaleDateString();

        // Gửi email nhắc nhở
        await sendSessionReminderEmail(
          client.email,
          formattedTime,
          formattedDate
        );

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
      } catch (error) {
        console.error(
          `Lỗi khi xử lý nhắc nhở cho buổi tập: ${session.id}`,
          error.message
        );
      }
    }
  } catch (error) {
    console.error('Lỗi khi gửi nhắc nhở buổi tập:', error.message);
  }
});

// Cron job: Gửi thông báo tổng kết tuần (chạy vào Chủ nhật lúc 18:00)
cron.schedule('0 18 * * 0', async () => {
  console.log('Cron Job - Xử lý gửi thông báo tổng kết tuần...');

  try {
    const users = await User.findAll({ where: { role: 'client' } });

    if (!users.length) {
      console.log('Không có khách hàng nào để gửi tổng kết tuần.');
      return;
    }

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    for (const user of users) {
      try {
        const completedSessions = await Sessions.count({
          where: {
            client_id: user.id,
            status: 'completed',
            session_date: { [Op.between]: [startOfWeek, endOfWeek] },
          },
        });

        const canceledSessions = await Sessions.count({
          where: {
            client_id: user.id,
            status: 'canceled',
            session_date: { [Op.between]: [startOfWeek, endOfWeek] },
          },
        });

        const content = `Tổng kết tuần: Bạn đã hoàn thành ${completedSessions} buổi tập và hủy ${canceledSessions} buổi. Hãy tiếp tục nỗ lực để đạt kết quả tốt nhất!`;

        // Gửi email tổng kết tuần
        await sendWeeklyNotificationEmail(
          user.email,
          completedSessions,
          canceledSessions
        );

        // Tạo thông báo tổng kết tuần
        await Notifications.create({
          user_id: user.id,
          content,
          read_status: false,
          notification_type: 'weekly_summary',
        });

        console.log(`Đã gửi tổng kết tuần cho khách hàng ${user.username}.`);
      } catch (error) {
        console.error(
          `Lỗi khi xử lý tổng kết tuần cho khách hàng ${user.username}:`,
          error.message
        );
      }
    }
  } catch (error) {
    console.error('Lỗi khi xử lý tổng kết tuần:', error.message);
  }
});
