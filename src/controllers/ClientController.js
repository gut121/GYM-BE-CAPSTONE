const { User, ClientDetails } = require('../models');

class ClientController {
  async getClientProfileById(req, res) {
    try {
      const clientId = req.params.id;
      const client = await User.findOne({
        where: { id: clientId, role: 'client' },
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

      if (!client) {
        return res
          .status(404)
          .json({ sucess: false, error: 'Client not found or invalid role' });
      }
      res.status(200).json({ sucess: true, data: client });
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

  async createClientProfile(req, res) {
    try {
      const userId = req.user.id; // sử dụng middleware để xác thực và lấy user ID từ token
  
      const { height, weight, media_url, physical_condition } = req.body;
  
      // Kiểm tra xem user đã tồn tại chưa và có phải là 'client' không
      const user = await User.findOne({ where: { id: userId, role: 'client' } });
      if (!user) {
        return res.status(404).json({ success: false, error: 'Client not found or invalid role' });
      }
  
      // Tạo hồ sơ ClientDetails
      const clientDetails = await ClientDetails.create({
        client_id: userId,
        height,
        weight,
        media_url,
        physical_condition,
      });
  
      res.status(201).json({
        success: true,
        data: clientDetails,
        message: 'Client profile created successfully',
      });
    } catch (error) {
      console.error('Error creating client profile:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
  async updateClientProfile(req, res) {
    try {
      const client_id = req.params.id;
      const {
        username,
        email,
        phone,
        bio,
        height,
        weight,
        media_url,
        physical_condition,
      } = req.body;
  
      const client = await User.findOne({ where: { id: client_id, role: 'client' } });
      if (!client) {
        return res.status(404).json({ success: false, error: 'Client not found' });
      }
  
      // Update user details
      await client.update({ username, email, phone, bio });
  
      // Update client details
      const clientDetails = await ClientDetails.findOne({ where: { client_id: clientId } });
      if (clientDetails) {
        await clientDetails.update({ height, weight, media_url, physical_condition });
      }
  
      res.status(200).json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating client profile:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
  async deleteClientProfile(req, res) {
    try {
      const client_id = req.params;
      const client = await User.findOne({ where: { id: client_id, role: 'client' } });
  
      if (!client) {
        return res.status(404).json({ success: false, error: 'Client not found' });
      }
  
      await ClientDetails.destroy({ where: { client_id: client_id} });
      await client.destroy();
  
      res.status(200).json({ success: true, message: 'Client profile deleted successfully' });
    } catch (error) {
      console.error('Error deleting client profile:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
  async searchClients(req, res) {
    try {
      const { query } = req.query;
      const clients = await User.findAll({
        where: {
          role: 'client',
          [Sequelize.Op.or]: [
            { username: { [Sequelize.Op.like]: `%${query}%` } },
            { email: { [Sequelize.Op.like]: `%${query}%` } },
          ],
        },
        include: [
          {
            model: ClientDetails,
            as: 'clientDetails',
            attributes: ['height', 'weight', 'media_url', 'physical_condition'],
          },
        ],
      });
  
      res.status(200).json({ success: true, data: clients });
    } catch (error) {
      console.error('Error searching clients:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

}
module.exports = new ClientController();
