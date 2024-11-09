const Messages = require('../models');
const { Op } = require('sequelize');

class MessagesController  {
  // Lấy tất cả tin nhắn giữa 2 người dùng
  async getMessages(req, res) {
    const { sender_id, receiver_id } = req.params;

    try {
      const messages = await Messages.findAll({
        where: {
          [Op.or]: [
            { sender_id, receiver_id },
            { sender_id: receiver_id, receiver_id: sender_id },
          ],
        },
        order: [['createdAt', 'ASC']],
      });

      return res.status(200).json({ success: true, messages });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Tạo tin nhắn mới
  async createMessage(req, res) {
    const { sender_id, receiver_id, message, media_url, media_type } = req.body;

    try {
      if (!sender_id || !receiver_id) {
        return res.status(400).json({ success: false, message: 'Sender and receiver IDs are required.' });
      }

      const newMessage = await Messages.create({
        sender_id,
        receiver_id,
        message,
        media_url,
        media_type,
      });

      return res.status(201).json({ success: true, message: 'Message sent successfully!', data: newMessage });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Xóa tin nhắn
  async deleteMessage(req, res) {
    const { id } = req.params;

    try {
      const result = await Messages.destroy({ where: { id } });

      if (!result) {
        return res.status(404).json({ success: false, message: 'Message not found.' });
      }

      return res.status(200).json({ success: true, message: 'Message deleted successfully!' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Cập nhật trạng thái tin nhắn (ví dụ: đã xem)
  async updateMessageStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body; // Trạng thái: 'sent', 'delivered', 'read'

    try {
      const message = await Messages.findByPk(id);

      if (!message) {
        return res.status(404).json({ success: false, message: 'Message not found.' });
      }

      message.status = status;
      await message.save();

      return res.status(200).json({ success: true, message: 'Message status updated successfully!', data: message });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = MessagesController;