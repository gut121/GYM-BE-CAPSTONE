const { Op } = require('sequelize');
const sequelize = require('../config/database');
const {
  User,
  ClientDetails,
  TrainerDetails,
  Sessions,
  Payments,
  ExerciseGuides,
  Reviews,
  TrainerAssignments,
} = require('../models');
const bcrypt = require('bcrypt');
const { generateRefreshTokenAndSetCookie } = require('../utils/generateToken');
const { sendVerificationEmail } = require('../mail/emails');
class AdminController {
  async register(req, res) {
    try {
      const { username, password, email, role } = req.body;

      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (existingUser) {
        return res.status(400).json({
          error: 'Username or email already taken',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const verificationToken = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      const newUser = await User.create({
        username,
        password: hashedPassword,
        email,
        role,
        verification_token: verificationToken,
        verification_token_expires_at: Date.now() + 24 * 60 * 60 * 1000,
      });

      generateRefreshTokenAndSetCookie(res, newUser.id);

      await sendVerificationEmail(newUser.email, verificationToken);

      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error in register:', error);
      res.status(500).json({
        error: 'Error registering user',
      });
    }
  }
  async updateAvatar(req, res) {
    const { userId } = req.params;
    const { avatar_url } = req.body;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.avatar_url = avatar_url;
      await user.save();

      res.status(200).json({ message: 'Avatar updated successfully', user });
    } catch (error) {
      console.error('Error updating avatar:', error);
      res.status(500).json({ error: 'Error updating avatar' });
    }
  }
  async getTotalUsers(req, res) {
    try {
      const totalUsers = await User.count();
      res.status(200).json({ totalUsers });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Số lượng khách hàng, huấn luyện viên, quản trị viên
  async getUsersByRole(req, res) {
    try {
      const usersByRole = await User.findAll({
        attributes: [
          'role',
          [sequelize.fn('COUNT', sequelize.col('role')), 'total'],
        ],
        group: ['role'],
      });
      res.status(200).json({ usersByRole });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Tổng số huấn luyện viên và kinh nghiệm trung bình
  async getTrainersStats(req, res) {
    try {
      const trainersStats = await TrainerDetails.findAll({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('trainer_id')), 'totalTrainers'],
          [
            sequelize.fn('AVG', sequelize.col('years_of_experience')),
            'avgExperience',
          ],
        ],
      });
      res.status(200).json({ trainersStats });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //thống kê huấn luyện viên cho từng thể loại
  async getTrainersByCategory(req, res) {
    try {
      const trainersByCategory = await TrainerDetails.findAll({
        attributes: [
          'specialties',
          [
            sequelize.fn('COUNT', sequelize.col('trainer_id')),
            'totalTrainers',
          ],
        ],
        group: ['specialties'],
      });
      res.status(200).json({ trainersByCategory });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Tổng số khách hàng, số lượng khách hàng đang hoạt động, số lượng khách hàng không hoạt động
  async getClientStats(req, res) {
    try {
      const totalClients = await User.count({ where: { role: 'client' } });

      const averageHeightAndWeight = await ClientDetails.findAll({
        attributes: [
          [sequelize.fn('AVG', sequelize.col('height')), 'avgHeight'],
          [sequelize.fn('AVG', sequelize.col('weight')), 'avgWeight'],
        ],
      });

      const activeClients = await User.count({
        where: { role: 'client', is_active: true },
      });

      const inactiveClients = totalClients - activeClients;

      res.status(200).json({
        totalClients,
        activeClients,
        inactiveClients,
        averageHeightAndWeight: averageHeightAndWeight[0].dataValues,
      });
    } catch (error) {
      console.error('Error fetching client statistics:', error);
      res.status(500).json({ error: 'Error fetching client statistics' });
    }
  }

  // Danh sách huấn luyện viên và số lượng khách hàng
  async getTrainersClients(req, res) {
    try {
      const trainersClients = await TrainerAssignments.findAll({
        attributes: [
          'trainer_id',
          [sequelize.fn('COUNT', sequelize.col('client_id')), 'totalClients'],
        ],
        include: [{ model: User, as: 'trainer', attributes: ['username'] }],
        group: ['trainer_id', 'trainer.username'],
      });
      res.status(200).json({ trainersClients });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Tổng doanh thu
  async getTotalRevenue(req, res) {
    try {
      const totalRevenue = await Payments.sum('amount');
      res.status(200).json({ totalRevenue });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Doanh thu theo huấn luyện viên
  async getRevenueByTrainer(req, res) {
    try {
      const revenueByTrainer = await Payments.findAll({
        attributes: [
          'trainer_id',
          [sequelize.fn('SUM', sequelize.col('amount')), 'revenue'],
        ],
        include: [{ model: User, as: 'trainer', attributes: ['username'] }],
        group: ['trainer_id', 'trainer.username'],
      });
      res.status(200).json({ revenueByTrainer });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Tổng số bài tập và bài tập phổ biến nhất
  async getExerciseStats(req, res) {
    try {
      const totalExercises = await ExerciseGuides.count();
      const popularExercise = await ExerciseGuides.findAll({
        attributes: [
          'name',
          [sequelize.fn('COUNT', sequelize.col('id')), 'usageCount'],
        ],
        include: [{ model: Sessions, as: 'sessions', attributes: [] }],
        group: ['id', 'name'],
        order: [[sequelize.literal('usageCount'), 'DESC']],
        limit: 1,
      });
      res.status(200).json({ totalExercises, popularExercise });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Tổng số đánh giá và điểm đánh giá trung bình của khách hàng
  async getOverallReviewStats(req, res) {
    try {
      // Tổng số đánh giá và điểm đánh giá trung bình toàn hệ thống
      const totalReviews = await Reviews.count();
      const averageRating = await Reviews.findAll({
        attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']],
      });
  
      // Comment mới nhất
      const latestComment = await Reviews.findOne({
        attributes: ['rating', 'review'],
        include: [
          { model: User, as: 'client', attributes: ['username'] },
          { model: User, as: 'trainer', attributes: ['username'] },
        ],
        order: [['createdAt', 'DESC']],
      });
  
      res.status(200).json({
        totalReviews,
        averageRating: averageRating[0].dataValues.averageRating,
        latestComment,
      });
    } catch (error) {
      console.error('Error fetching overall review stats:', error);
      res.status(500).json({ error: 'Error fetching overall review stats' });
    }
  }
  //thống kê đánh giá theo huấn luyện viên
  async getTrainerReviewStats(req, res) {
    try {
      // Thống kê trung bình đánh giá và tổng số đánh giá
      const trainerReviewStats = await Reviews.findAll({
        attributes: [
          'trainer_id',
          [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating'],
          [sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'totalReviews'], // Đếm rõ ràng Reviews.id
          [sequelize.col('trainer.username'), 'trainerUsername'], // Lấy username của huấn luyện viên
        ],
        include: [
          { model: User, as: 'trainer', attributes: [] }, // Chỉ lấy trainer.username
        ],
        group: ['Reviews.trainer_id', 'trainer.username'], // Group đúng cột
      });
  
      // Lấy danh sách các comment của khách hàng
      const clientComments = await Reviews.findAll({
        attributes: ['client_id', 'trainer_id', 'rating', 'review'], // Định danh cột đúng
        include: [
          { model: User, as: 'client', attributes: ['username'] }, // Lấy username của khách hàng
          { model: User, as: 'trainer', attributes: ['username'] }, // Lấy username của huấn luyện viên
        ],
        order: [['createdAt', 'DESC']], // Lấy comment mới nhất
      });
  
      res.status(200).json({
        trainerReviewStats,
        clientComments,
      });
    } catch (error) {
      console.error('Error fetching trainer review stats:', error);
      res.status(500).json({ error: 'Error fetching trainer review stats' });
    }
  }
    
  async getClientPaymentHistory(req, res) {
    try {
      const { client_id } = req.query;
  
      if (!client_id) {
        return res.status(400).json({ error: 'Client ID is required' });
      }
      // Lấy danh sách thanh toán của Client
      const paymentHistory = await Payments.findAll({
        where: { client_id: client_id },
        attributes: ['amount', 'payment_date', 'createdAt'],
        order: [['payment_date', 'DESC']],
      });
  
      // Tổng số tiền và số lần thanh toán
      const totalAmount = await Payments.sum('amount', {
        where: { client_id: client_id },
      });
  
      const totalPayments = await Payments.count({
        where: { client_id: client_id },
      });
  
      res.status(200).json({
        client_id,
        totalPayments,
        totalAmount,
        paymentHistory,
      });
    } catch (error) {
      console.error('Error fetching client payment history:', error);
      res.status(500).json({ error: 'Error fetching client payment history' });
    }
  }
  
}
module.exports = new AdminController();
