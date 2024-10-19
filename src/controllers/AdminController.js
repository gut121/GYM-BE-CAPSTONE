const { Op } = require('sequelize');
const {User, } = require('../models');
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
    
          const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    
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
}
module.exports = new AdminController();