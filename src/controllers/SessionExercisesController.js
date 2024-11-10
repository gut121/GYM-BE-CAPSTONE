const { SessionExercises, Sessions, ExerciseGuides } = require('../models');

class SessionExercisesController {

  async getAllSessionExercises(req, res) {
    try {
      const sessionExercises = await SessionExercises.findAll({
        include: [
          {
            model: Sessions,
            as: 'session',
          },
          {
            model: ExerciseGuides,
            as: 'exerciseDetails',
          },
        ],
      });
      res.status(200).json(sessionExercises);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch Session Exercises', details: error.message });
    }
  }

  async getSessionExerciseById(req, res) {
    try {
      const { id } = req.params;
      const sessionExercise = await SessionExercises.findByPk(id, {
        include: [
          {
            model: Sessions,
            as: 'session',
          },
          {
            model: ExerciseGuides,
            as: 'exerciseDetails',
          },
        ],
      });

      if (!sessionExercise) {
        return res.status(404).json({ error: 'Session Exercise not found' });
      }

      res.status(200).json(sessionExercise);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch Session Exercise', details: error.message });
    }
  }


  async createSessionExercise(req, res) {
    try {
      const { body } = req;
      const sessionExercise = await SessionExercises.create(body);
      res.status(201).json(sessionExercise);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create Session Exercise', details: error.message });
    }
  }

  async updateSessionExercise(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const sessionExercise = await SessionExercises.findByPk(id);
      if (!sessionExercise) {
        return res.status(404).json({ error: 'Session Exercise not found' });
      }
      const updatedSessionExercise = await sessionExercise.update(body);
      res.status(200).json(updatedSessionExercise);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update Session Exercise', details: error.message });
    }
  }


  async deleteSessionExercise(req, res) {
    try {
      const { id } = req.params;
      const sessionExercise = await SessionExercises.findByPk(id);
      if (!sessionExercise) {
        return res.status(404).json({ error: 'Session Exercise not found' });
      }
      await sessionExercise.destroy();
      res.status(204).json({ message: 'Session Exercise deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete Session Exercise', details: error.message });
    }
  }
}

module.exports = new SessionExercisesController();
