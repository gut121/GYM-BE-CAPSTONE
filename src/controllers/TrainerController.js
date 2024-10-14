const { User, TrainerDetails } = require("../models");

class TrainerController {
  async getTrainerProfile(req, res) {
    try {
      const trainerId = req.params.id;

      const trainer = await User.findOne({
        where: { id: trainerId, role: "trainer" },
        attributes: ["id", "name", "email", "role", "phone", "bio"],
        include: [
          {
            model: TrainerDetails,
            as: "TrainerDetails",
            attributes: ["specialties", "hourly_rate", "available_slots"],
            required: true,
          },
        ],
      });

      if (!trainer) {
        return res
          .status(404)
          .json({ error: "Trainer not found or invalid role" });
      }

      res.status(200).json({ trainer });
    } catch (error) {
      console.error("Error fetching trainer profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new TrainerController();
