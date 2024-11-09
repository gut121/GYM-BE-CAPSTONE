const { User, TrainerDetails } = require('../models');
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
        where: { id },
        attributes: ['id', 'username', 'email', 'role', 'phone', 'bio'],
        include: [
          {
            model: TrainerDetails,
            as: 'trainerDetails',
            attributes: ['specialties', 'available_slots'],
            required: true,
          },
        ],
      });
      res.status(200).json({ trainer });
    } catch (error) {
      console.error('Error fetching trainer profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getAllTrains(req, res) {
    try {
      const trainers = await TrainerDetails.findAll({
        attributes: ['id', 'specialties', 'available_slots'],
        include: [
          {
            model: User,
            as: 'userTrainerDetails',
            attributes: ['username', 'email', 'phone', 'bio'],
            required: true,
          },
        ],
      });
      res.status(200).json({ message: 'All Trainers', trainers });
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
        specialties,
        available_slots,
        avatar_url,
      } = req.body;

      const trainer = await User.findOne({
        where: { id: userId },
      });
      if (!trainer) {
        return res.status(404).json({
          success: false,
          message: 'Trainer not found',
        });
      }
      await trainer.update({ username, date_of_birth, phone, bio, avatar_url });
      const TrainerDetails = await ClientDetails.findOne({
        where: { trainer_id: userId },
      });
      if (TrainerDetails) {
        await TrainerDetails.update({
          specialties,
          available_slots,
        });
      } else {
        await TrainerDetails.create({
          trainer_id: userId,
          specialties,
          available_slots,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
      });
    } catch (error) {
      console.error('Error updating client profile:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  async deleteTrainer(req, res) {
    try {
      const { adminId } = req.user; // Lấy thông tin Admin từ token
      const { userId } = req.params; // ID của Trainer cần xóa
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
      const trainer = await User.findOne({
        where: { username, role: 'trainer' },
        include: [
          {
            model: TrainerDetails,
            as: 'trainerDetails',
            attributes: ['specialties', 'available_slots', 'certification_url', 'years_of_experience'],
          },
        ],
        attributes: ['id', 'username', 'email', 'phone', 'bio', 'avatar_url'],
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
            attributes: ['specialties', 'available_slots', 'certification_url', 'years_of_experience'],
          },
        ],
        attributes: ['id', 'username', 'email', 'phone', 'bio', 'avatar_url'],
      });

      if (trainers.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No trainers found for the given specialties',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Trainers found',
        data: trainers,
      });
    } catch (error) {
      console.error('Error searching trainers by specialties:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }
}

module.exports = new TrainerController();
