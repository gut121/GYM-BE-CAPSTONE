const { generateWeeklySummaryNotifications } = require('./Cronjobs');

(async () => {
  await generateWeeklySummaryNotifications();
  console.log('Đã chạy xong kiểm tra tổng kết tuần');
})();
