const {
  Sessions,
  SessionExercises,
  ExerciseGuides,
  User,
  sequelize,
} = require("../models");

class SessionController {
  async createSession(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const { client_id, trainer_id, session_date, exercises } = req.body;

      const session = await Sessions.create(
        {
          client_id,
          trainer_id,
          session_date,
          status: "pending",
        },
        { transaction }
      );

      if (exercises && exercises.length > 0) {
        const sessionExercises = exercises.map((exercise) => ({
          session_id: session.id,
          exercise_id: exercise.exercise_id,
          sets: exercise.sets,
          reps: exercise.reps,
        }));

        await SessionExercises.bulkCreate(sessionExercises, { transaction });
      }

      await transaction.commit();

      res.status(201).json({ session });
    } catch (error) {
      await transaction.rollback();
      console.error("Error creating session:", error);
      res.status(500).json({ error: "Failed to create session" });
    }
  }

  async getSessions(req, res) {
    try {
      const sessions = await Sessions.findAll({
        include: [
          { model: User, as: "Client", attributes: ["id", "name"] },
          { model: User, as: "Trainer", attributes: ["id", "name"] },
          {
            model: SessionExercises,
            include: [
              {
                model: ExerciseGuides,
                attributes: ["name"],
              },
            ],
            attributes: ["sets", "reps"],
          },
        ],
      });
      res.status(200).json(sessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      res.status(500).json({ error: "Failed to retrieve sessions" });
    }
  }

  async updateSession(req, res) {
    try {
      const { id } = req.params;
      const { session_date, status } = req.body;

      const session = await Sessions.findByPk(id);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      session.session_date = session_date || session.session_date;
      session.status = status || session.status;
      await session.save();

      res.status(200).json({ session });
    } catch (error) {
      console.error("Error updating session:", error);
      res.status(500).json({ error: "Failed to update session" });
    }
  }

  async deleteSession(req, res) {
    try {
      const { id } = req.params;

      const session = await Sessions.findByPk(id);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      await session.destroy();
      res.status(200).json({ message: "Session deleted successfully" });
    } catch (error) {
      console.error("Error deleting session:", error);
      res.status(500).json({ error: "Failed to delete session" });
    }
  }
}

module.exports = new SessionController();
