const cron = require('node-cron');
const { Op } = require('sequelize');
const { WorkoutPlans, Sessions, Notifications, User } = require('../models');
const { sendWeeklyNotificationEmail, sendSessionReminderEmail } = require('../mail/emails');
const { transporter } = require('../config/mail');

// Đảm bảo bạn đã cấu hình chính xác

cron.schedule('22 16 * * *', async () => {
    console.log('Đang xử lý tổng kết tuần...');

    // Đặt nội dung cho email
    const content = `Đây là thông báo tổng kết tuần từ Gym-Cap. Chúc bạn đã có một tuần luyện tập thành công!`;

    try {
        await transporter.sendMail({
            to: "duongvantiendtu@gmail.com",
            subject: 'Thông báo Tổng kết Tuần từ Gym-Cap',
            html: `<p>${content}</p>`,
        });

        console.log('Thông báo tổng kết tuần đã được gửi thành công!');
    } catch (error) {
        console.error('Lỗi khi gửi email thông báo tổng kết tuần:', error);
    }

    console.log('Hoàn thành tổng kết tuần!');
});

// Cron job gửi thông báo trước mỗi buổi tập khoảng 1 tiếng
cron.schedule('0 * * * *', async () => {
    console.log('Đang kiểm tra các buổi tập sắp diễn ra trong vòng 1 tiếng...');

    const upcomingSessionsTime = new Date();
    upcomingSessionsTime.setHours(upcomingSessionsTime.getHours() + 1);

    try {
        // Tìm các buổi tập diễn ra trong vòng 1 tiếng tới
        const upcomingSessions = await Sessions.findAll({
            where: {
                session_date: {
                    [Op.between]: [new Date(), upcomingSessionsTime]
                },
                status: 'pending'
            },
            include: [
                {
                    model: User,
                    as: 'client',
                    attributes: ['id', 'username', 'email']
                },
                {
                    model: User,
                    as: 'trainer',
                    attributes: ['id', 'username', 'email']
                }
            ]
        });

        for (const session of upcomingSessions) {
            const { client, trainer, session_date, day_of_week } = session;
            const reminderContent = `Buổi tập của bạn sẽ bắt đầu vào lúc ${session_date.toLocaleTimeString()} (${day_of_week}). Hãy chuẩn bị sẵn sàng!`;

            // Gửi email nhắc nhở tới khách hàng
            await sendSessionReminderEmail(client.email, reminderContent);
            
            // Ghi thông báo vào bảng Notifications
            await Notifications.create({
                user_id: client.id,
                content: reminderContent,
                read_status: false,
                notification_type: 'session_reminder',
            });

            console.log(`Đã gửi nhắc nhở cho buổi tập của khách hàng ${client.username}`);
        }
    } catch (error) {
        console.error('Lỗi khi gửi nhắc nhở buổi tập:', error);
    }
});

// Cron job gửi thông báo tổng kết hàng tuần
cron.schedule('0 18 * * 0', async () => {  // Mỗi tuần vào Chủ Nhật lúc 18:00
    console.log('Đang xử lý tổng kết tuần...');

    // Nội dung tổng kết tuần
    const content = `Đây là thông báo tổng kết tuần từ Gym-Cap. Chúc bạn đã có một tuần luyện tập thành công!`;

    try {
        await generateWeeklySummaryNotifications();

        await transporter.sendMail({
            to: "duongvantiendtu@gmail.com",
            subject: 'Thông báo Tổng kết Tuần từ Gym-Cap',
            html: `<p>${content}</p>`,
        });

        console.log('Thông báo tổng kết tuần đã được gửi thành công!');
    } catch (error) {
        console.error('Lỗi khi gửi email thông báo tổng kết tuần:', error);
    }

    console.log('Hoàn thành tổng kết tuần!');
});

async function generateWeeklySummaryNotifications() {
    try {
        const workoutPlans = await WorkoutPlans.findAll({
            where: { summary_generated: false },
            include: [
                {
                    model: Sessions,
                    as: 'sessions',
                    attributes: ['status', 'day_of_week'],
                },
            ],
        });

        console.log(`Số lượng WorkoutPlans chưa tổng kết: ${workoutPlans.length}`);

        for (const plan of workoutPlans) {
            const { client_id, id: workout_plan_id, sessions } = plan;

            const completedSessions = sessions.filter(s => s.status === 'completed').length;
            const totalSessions = sessions.length;

            let notificationContent;
            if (completedSessions === totalSessions) {
                notificationContent = `Chúc mừng! Bạn đã hoàn thành tất cả ${totalSessions} buổi tập trong tuần này!`;
            } else {
                notificationContent = `Tổng kết tuần: Bạn đã hoàn thành ${completedSessions} trên ${totalSessions} buổi tập. Hãy cố gắng hoàn thành tất cả các buổi tập trong tuần tới, chúc bạn sẽ hoàn thành được mục tiêu của mình mong muốn trong thời gian tới!`;
            }

            const client = await User.findByPk(client_id, { attributes: ['email'] });
            const clientEmail = client.email;

            await sendWeeklyNotificationEmail(clientEmail, notificationContent);

            await Notifications.create({
                user_id: client_id,
                content: notificationContent,
                read_status: false,
                notification_type: 'weekly_summary',
            });

            await plan.update({ summary_generated: true });
            console.log(`Đã cập nhật summary_generated cho WorkoutPlan ID: ${workout_plan_id}`);
        }
    } catch (error) {
        console.error('Lỗi khi tạo thông báo tổng kết tuần:', error);
    }
}
