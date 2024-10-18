const { User, TrainerDetails } = require("../models");

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

  async getTrainerById(req, res) {
    try {
      const { id } = req.params;
      const trainer = await User.findOne({
        where: { id },
        attributes: ["id", "username", "email", "role", "phone", "bio"],
        include: [
          {
            model: TrainerDetails,
            as: "trainerDetails",
            attributes: ["specialties", "available_slots"],
            required: true,
          },
        ],
      });
      res.status(200).json({ trainer });
    } catch (error) {
      console.error("Error fetching trainer profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllTrains(req, res) {
    try {
      const trainers = await TrainerDetails.findAll({
        attributes: ["id", "specialties", "available_slots"],
        include: [
          {
            model: User,
            as: "userTrainerDetails",
            attributes: ["username", "email", "phone", "bio"],
            required: true,
          }
        ]
      })
      res.status(200).json({ message: "All Trainers", trainers })
    } catch (error) {
      console.error("Error fetching all trainers:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
module.exports = new TrainerController();
