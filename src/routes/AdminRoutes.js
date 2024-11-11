const express = require('express');
const { AdminController } = require('../controllers');
const { AdminValidation } = require('../validation');
const { validate } = require('../middlewares/validate');
const router = express.Router();

router.post(
  '/register',
  validate(AdminValidation.register),
  AdminController.register
);
router.patch(
  '/:userId/avatar',
  validate(AdminValidation.updateAvatar),
  AdminController.updateAvatar
);
// Thống kê tổng số người dùng
router.get('/stats/total-users', AdminController.getTotalUsers);
// Thống kê người dùng theo vai trò (role)
router.get('/stats/users-by-role', AdminController.getUsersByRole);
// Thống kê tổng số huấn luyện viên và kinh nghiệm trung bình
router.get('/stats/trainers', AdminController.getTrainersStats);
// Thống kê khách hàng
router.get('/stats/clients', AdminController.getClientStats);
// Thống kê khách hàng theo từng huấn luyện viên
router.get('/stats/trainers-clients', AdminController.getTrainersClients);
// thống kê luyện viên và kinh nghiệm trung bình
router.get('/stats/trainers-experience', AdminController.getTrainersStats);
// thống kê huấn luyện viên cho từng thể loại 
router.get('/stats/trainers-types', AdminController.getTrainersByCategory);
// Thống kê doanh thu tổng
router.get('/stats/revenue', AdminController.getTotalRevenue);
// Thống kê doanh thu theo từng huấn luyện viên
router.get('/stats/revenue-by-trainer', AdminController.getRevenueByTrainer);
// Thống kê bài tập
router.get('/stats/exercises', AdminController.getExerciseStats);
//Thống kê Tổng số đánh giá và điểm đánh giá trung bình của khách hàng
router.get('/stats/reviews', AdminController.getOverallReviewStats);
//thống kê đánh giá theo huấn luyện viên
router.get('/stats/reviews-by-trainer', AdminController.getTrainerReviewStats);


module.exports = router;
