const {
  User,
  TrainerDetails,
  WorkoutPlans,
  ClientDetails,
  Sessions,
} = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { generateRefreshTokenAndSetCookie } = require('../utils/generateToken');
const { sendVerificationEmail } = require('../mail/emails');

class TrainerController {
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

  async getTrainerById(req, res) {
    try {
      const { id } = req.params;

      const trainer = await User.findOne({
        where: { id, role: 'trainer' },
        attributes: [
          'id',
          'username',
          'email',
          'phone',
          'bio',
          'age',
          'gender',
          'date_of_birth',
          'avatar_url',
        ],
        include: [
          {
            model: TrainerDetails,
            as: 'trainerDetails',
            attributes: [
              'specialties',
              'available_slots',
              'certification_url',
              'years_of_experience',
            ],
          },
        ],
      });

      if (!trainer) {
        return res.status(404).json({
          success: false,
          message: 'Trainer not found',
        });
      }

      res.status(200).json({ success: true, data: trainer });
    } catch (error) {
      console.error('Error fetching trainer profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async getAllTrainers(req, res) {
    try {
      const trainers = await TrainerDetails.findAll({
        attributes: [
          'id',
          'specialties',
          'available_slots',
          'certification_url',
          'years_of_experience',
        ],
        include: [
          {
            model: User,
            as: 'userTrainerDetails',
            attributes: [
              'username',
              'email',
              'phone',
              'bio',
              'age',
              'gender',
              'date_of_birth',
              'avatar_url',
            ],
          },
        ],
      });

      res.status(200).json({ success: true, data: trainers });
    } catch (error) {
      console.error('Error fetching all trainers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async updateTrainerProfile(req, res) {
    try {
      const { userId } = req.user;
      const {
        username,
        date_of_birth,
        phone,
        bio,
        age,
        gender,
        specialties,
        available_slots,
        avatar_url,
      } = req.body;

      const trainer = await User.findByPk(userId);
      if (!trainer) {
        return res.status(404).json({ success: false, message: 'Trainer not found' });
      }

      // Cập nhật thông tin User
      await trainer.update({
        username,
        date_of_birth,
        phone,
        bio,
        age,
        gender,
        avatar_url,
      });

      // Sử dụng upsert để cập nhật hoặc tạo TrainerDetails
      await TrainerDetails.upsert({
        trainer_id: userId,
        specialties,
        available_slots,
      });

      res.status(200).json({
        success: true,
        message: 'Trainer profile updated successfully',
      });
    } catch (error) {
      console.error('Error updating trainer profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async deleteTrainer(req, res) {
    try {
      const { adminId } = req.user; 
      const { userId } = req.params; 
      const admin = await User.findByPk(adminId);
      if (!admin) {
        return res.status(403).json({
          success: false,
          message: 'Permission denied. Only admins can delete trainers.',
        });
      }
      // Tìm Trainer theo ID
      const trainer = await User.findByPk(userId);
      if (!trainer) {
        return res.status(404).json({
          success: false,
          message: 'Trainer not found',
        });
      }
      await TrainerDetails.destroy({
        where: { trainer_id: userId },
      });
      await trainer.destroy();

      res.status(200).json({
        success: true,
        message: 'Trainer deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting trainer:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }
  async getTrainerByUsername(req, res) {
    try {
      const { username } = req.query;
  
      if (!username) {
        return res.status(400).json({
          success: false,
          message: 'Username is required',
        });
      }
  
      // Tìm trainer theo username
      const trainer = await User.findOne({
        where: { username, role: 'trainer' },
        attributes: [
          'id',
          'username',
          'email',
          'phone',
          'bio',
          'avatar_url',
          'age',
          'gender',
          'date_of_birth',
        ],
        include: [
          {
            model: TrainerDetails,
            as: 'trainerDetails',
            attributes: [
              'specialties',
              'available_slots',
              'certification_url',
              'years_of_experience',
            ],
          },
        ],
      });
  
      if (!trainer) {
        return res.status(404).json({
          success: false,
          message: 'Trainer not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Trainer found',
        data: trainer,
      });
    } catch (error) {
      console.error('Error fetching trainer by username:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }
  async searchTrainersBySpecialties(req, res) {
    try {
      const { specialties } = req.query;

      if (!specialties) {
        return res.status(400).json({
          success: false,
          message: 'Specialties is required',
        });
      }

      const trainers = await User.findAll({
        where: { role: 'trainer' },
        include: [
          {
            model: TrainerDetails,
            as: 'trainerDetails',
            where: { specialties: { [Op.like]: `%${specialties}%` } },
            attributes: [
              'specialties',
              'available_slots',
              'certification_url',
              'years_of_experience',
            ],
          },
        ],
        attributes: [
          'id',
          'username',
          'email',
          'phone',
          'bio',
          'age',
          'gender',
          'date_of_birth',
          'avatar_url',
        ],
      });

      if (!trainers.length) {
        return res.status(404).json({
          success: false,
          message: 'No trainers found for the given specialties',
        });
      }

      res.status(200).json({ success: true, data: trainers });
    } catch (error) {
      console.error('Error searching trainers by specialties:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async getClientProgress(req, res) {
    try {
      const { trainer_id, client_id } = req.query;

      const totalSessions = await Sessions.count({
        where: { trainerId: trainer_id, clientId: client_id },
      });

      const completedSessions = await Sessions.count({
        where: {
          trainerId: trainer_id,
          clientId: client_id,
          status: 'completed',
        },
      });

      const cancelledSessions = await Sessions.findAll({
        where: {
          trainer_id: trainerId,
          client_id: clientId,
          status: 'cancelled',
        },
        attributes: ['incomplete_reason'],
      });

      res.status(200).json({
        totalSessions,
        completedSessions,
        completionRate: ((completedSessions / totalSessions) * 100).toFixed(2),
        cancelledSessions,
      });
    } catch (error) {
      console.error('Error fetching client progress:', error);
      res.status(500).json({ error: 'Error fetching client progress' });
    }
  }
  async getClientHealthStats(req, res) {
    try {
      const { client_id } = req.query;

      const healthData = await ClientDetails.findOne({
        where: { clientId: client_id },
        attributes: ['height', 'weight', 'physical_condition', 'updatedAt'],
      });

      res.status(200).json({ healthData });
    } catch (error) {
      console.error('Error fetching client health stats:', error);
      res.status(500).json({ error: 'Error fetching client health stats' });
    }
  }
  async getClientWorkoutPlans(req, res) {
    try {
      const { client_id } = req.query;

      const workoutPlans = await WorkoutPlans.findAll({
        where: { clientId: client_id },
        attributes: ['week_number', 'description', 'summary_generated'],
        include: [
          {
            model: Sessions,
            as: 'sessions',
            attributes: [
              [sequelize.fn('COUNT', sequelize.col('id')), 'completedSessions'],
            ],
            where: { status: 'completed' },
          },
        ],
      });

      res.status(200).json({ workoutPlans });
    } catch (error) {
      console.error('Error fetching client workout plans:', error);
      res.status(500).json({ error: 'Error fetching client workout plans' });
    }
  }
  async getClientReviews(req, res) {
    try {
      const { trainer_id, client_id } = req.query;

      const reviews = await Reviews.findAll({
        where: { trainerId: trainer_id, clientId: client_id },
        attributes: ['rating', 'comment', 'createdAt'],
      });

      res.status(200).json({ reviews });
    } catch (error) {
      console.error('Error fetching client reviews:', error);
      res.status(500).json({ error: 'Error fetching client reviews' });
    }
  }
}

module.exports = new TrainerController();
