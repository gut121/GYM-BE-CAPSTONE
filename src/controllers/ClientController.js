const { User, ClientDetails } = require('../models');
const { Op } = require('sequelize');

class ClientController {
  async getClientProfile(req, res) {
    try {
      const { userId } = req.params;
      const client = await User.findOne({
        where: { id: userId },
        attributes: ['id', 'username', 'email', 'role', 'phone', 'bio'],
        include: [
          {
            model: ClientDetails,
            as: 'clientDetails',
            attributes: ['height', 'weight', 'media_url', 'physical_condition'],
          },
        ],
      });

      if (!client) {
        return res
          .status(404)
          .json({ sucess: false, error: 'Client not found or invalid role' });
      }
      res.status(200).json({ sucess: true, data: userId });
    } catch (error) {
      console.error('Error fetching client profile:', error);
      res.status(500).json({ sucess: false, error: 'Internal Server Error' });
    }
  }
  async getAllClient(req, res) {
    try {
      const clients = await User.findAll({
        attributes: ['id', 'username', 'email', 'role', 'phone', 'bio'],
        include: [
          {
            model: ClientDetails,
            as: 'clientDetails',
            attributes: ['height', 'weight', 'media_url', 'physical_condition'],
            required: true,
          },
        ],
      });
      res.status(200).json({ sucess: true, data: clients });
    } catch (error) {
      console.error('Error fetching clients:', error);
      res
        .status(500)
        .json({ sucess: false, error: 'Failed to retrieve clients' });
    }
  }

  async updateClientProfile(req, res) {
    try {
      const { userId } = req.user;
      const {
        username,
        date_of_birth,
        phone,
        bio,
        height,
        weight,
        media_url,
        physical_condition,
        avatar_url,
      } = req.body;

      const client = await User.findOne({
        where: { id: userId },
      });
      if (!client) {
        return res
          .status(404)
          .json({ success: false, error: 'Client not found' });
      }

      // Update user details
      await client.update({ username, date_of_birth, phone, bio, avatar_url });

      // Update client details
      const clientDetails = await ClientDetails.findOne({
        where: { client_id: userId },
      });
      if (clientDetails) {
        await clientDetails.update({
          height,
          weight,
          media_url,
          physical_condition,
        });
      } else {
        await ClientDetails.create({
          client_id: userId,
          height,
          weight,
          media_url,
          physical_condition,
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
  async searchClients(req, res) {
    try {
      const { username } = req.query;
      if (!username) {
        return res.status(400).json({
          success: false,
          message: 'Username is required for searching clients',
        });
      }
      const clients = await User.findOne({
        where: {
          username: { [Op.like]: `%${username}%` }, 
        },
        include: [
          {
            model: ClientDetails,
            as: 'clientDetails',
            attributes: ['height', 'weight', 'media_url', 'physical_condition'],
          },
        ],
        attributes: ['id', 'username', 'email', 'phone', 'bio', 'avatar_url'],
      });

      if (clients.length === 0) {
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
