const { User } = require('../models');

class UserController {
  async updateAvatar(req, res) {
    const { id } = req.params;
    const { newAvatar } = req.body;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.avatar_url = newAvatar;
      await user.save();
      res.status(200).json({ message: 'Avatar updated successfully' });
    } catch (error) {
      console.error('Error occured while updating avatar:', error);
      res.status(500).json({ message: 'Failed to update avatar' });
    }
  }
}

module.exports = new UserController();
