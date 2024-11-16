const { User, ClientDetails } = require('../models');
const { Op } = require('sequelize');

class ClientController {
  // Lấy thông tin chi tiết hồ sơ khách hàng
  async getClientProfile(req, res) {
    try {
      const { userId } = req.params;

      const client = await User.findOne({
        where: { id: userId },
        attributes: [
          'id',
          'username',
          'email',
          'role',
          'phone',
          'bio',
          'age',
          'gender',
          'date_of_birth',
        ],
        include: [
          {
            model: ClientDetails,
            as: 'clientDetails',
            attributes: [
              'height',
              'weight',
              'fitness_goal',
              'desired_time_to_achieve',
              'current_fitness_level',
              'weekly_training_days',
              'session_duration',
              'media_url',
              'physical_condition',
            ],
          },
        ],
      });

      if (!client) {
        return res.status(404).json({
          success: false,
          error: 'Client not found or invalid role',
        });
      }

      res.status(200).json({ success: true, data: client });
    } catch (error) {
      console.error('Error fetching client profile:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  // Lấy danh sách tất cả khách hàng
  async getAllClients(req, res) {
    try {
      const clients = await User.findAll({
        where: { role: 'client' },
        attributes: [
          'id',
          'username',
          'email',
          'role',
          'phone',
          'bio',
          'age',
          'gender',
          'date_of_birth',
        ],
        include: [
          {
            model: ClientDetails,
            as: 'clientDetails',
            attributes: [
              'height',
              'weight',
              'fitness_goal',
              'desired_time_to_achieve',
              'current_fitness_level',
              'weekly_training_days',
              'session_duration',
              'media_url',
              'physical_condition',
            ],
          },
        ],
      });

      res.status(200).json({ success: true, data: clients });
    } catch (error) {
      console.error('Error fetching clients:', error);
      res
        .status(500)
        .json({ success: false, error: 'Failed to retrieve clients' });
    }
  }

  // Cập nhật hồ sơ khách hàng
  async updateClientProfile(req, res) {
    try {
      const { userId } = req.user;
      const {
        username,
        date_of_birth,
        phone,
        bio,
        age,
        gender,
        height,
        weight,
        fitness_goal,
        desired_time_to_achieve,
        current_fitness_level,
        weekly_training_days,
        session_duration,
        media_url,
        physical_condition,
        avatar_url,
      } = req.body;

      const client = await User.findByPk(userId);
      if (!client) {
        return res.status(404).json({ success: false, error: 'Client not found' });
      }

      // Cập nhật thông tin User
      await client.update({
        username,
        date_of_birth,
        phone,
        bio,
        age,
        gender,
        avatar_url,
      });

      // Cập nhật hoặc tạo mới thông tin ClientDetails
      await ClientDetails.upsert({
        client_id: userId,
        height,
        weight,
        fitness_goal,
        desired_time_to_achieve,
        current_fitness_level,
        weekly_training_days,
        session_duration,
        media_url,
        physical_condition,
      });

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
      });
    } catch (error) {
      console.error('Error updating client profile:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  // Tìm kiếm khách hàng theo tên
  async searchClients(req, res) {
    try {
      const { username } = req.query;

      if (!username) {
        return res.status(400).json({
          success: false,
          message: 'Username is required for searching clients',
        });
      }

      const clients = await User.findAll({
        where: {
          username: { [Op.like]: `%${username}%` },
          role: 'client',
        },
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
            model: ClientDetails,
            as: 'clientDetails',
            attributes: [
              'height',
              'weight',
              'fitness_goal',
              'desired_time_to_achieve',
              'current_fitness_level',
              'weekly_training_days',
              'session_duration',
              'media_url',
              'physical_condition',
            ],
          },
        ],
      });

      if (!clients.length) {
        return res.status(404).json({
          success: false,
          message: 'No clients found with the given username',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Clients found',
        data: clients,
      });
    } catch (error) {
      console.error('Error searching clients by username:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
      });
    }
  }
}

module.exports = new ClientController();
