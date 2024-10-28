const cron = require('node-cron');
const NotificationsController = require('./controllers/NotificationsController');
const { User } = require('./models');

// Thiết lập lịch trình để chạy vào Chủ nhật hàng tuần lúc 23:59
cron.schedule('59 23 * * 0', async () => {
    console.log('Running weekly summary cron job...');

    try {
        // Lấy danh sách tất cả người dùng có vai trò là client
        const clients = await User.findAll({
            attributes: ['id'],
            where: {
                role: 'client' // Lọc những người dùng có vai trò là client
            }
        });

        // Duyệt qua danh sách client và gửi tổng kết tuần cho từng người
        for (const client of clients) {
            await NotificationsController.sendWeeklySummary(client.id);
        }

        console.log('Weekly summary notifications sent successfully.');
    } catch (error) {
        console.error('Error running weekly summary cron job:', error);
    }
});