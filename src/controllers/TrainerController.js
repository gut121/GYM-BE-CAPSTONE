const { User, TrainerDetails } = require("../models");

class TrainerController {

  async getTrainerProfile(req, res) {
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
