const cron = require('node-cron');
const { Op } = require('sequelize');
const { WorkoutPlans, Sessions, Notifications } = require('../models');
const { sendWeeklyNotificationEmail } = require('../mail/emails');
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

            // Đếm số buổi tập hoàn thành
            const completedSessions = sessions.filter(s => s.status === 'completed').length;
            const totalSessions = sessions.length;

            // Xác định nội dung thông báo
            let notificationContent;
            if (completedSessions === totalSessions) {
                notificationContent = `Chúc mừng! Bạn đã hoàn thành tất cả ${totalSessions} buổi tập trong tuần này!`;
            } else {
                notificationContent = `Tổng kết tuần: Bạn đã hoàn thành ${completedSessions} trên ${totalSessions} buổi tập. Hãy cố gắng hoàn thành tất cả các buổi tập trong tuần tới!`;
            }

            // Tìm email khách hàng từ client_id (giả sử bạn đã có quan hệ giữa `WorkoutPlans` và `User` model)
            // const client = await plan.getClient(); // Lấy khách hàng liên kết với workout plan
            const clientEmail = "duongvantiendtu@gmail.com"

            // Gửi thông báo qua email
            await sendWeeklyNotificationEmail(clientEmail, notificationContent);

            // Ghi thông báo vào bảng Notifications
            await Notifications.create({
                user_id: client_id,
                content: notificationContent,
                read_status: false,
                notification_type: 'weekly_summary',
            });

            // Cập nhật trạng thái summary_generated
            await plan.update({ summary_generated: true });
            console.log(`Đã cập nhật summary_generated cho WorkoutPlan ID: ${workout_plan_id}`);
        }
    } catch (error) {
        console.error('Lỗi khi tạo thông báo tổng kết tuần:', error);
    }
}