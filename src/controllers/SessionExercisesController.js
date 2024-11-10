const { SessionExercises, Sessions, ExerciseGuides } = require('../models');

class SessionExercisesController {
  // Lấy tất cả SessionExercises với thông tin chi tiết
  async getAllSessionExercises(req, res) {
    try {
      const sessionExercises = await SessionExercises.findAll({
        include: [
          {
            model: Sessions,
            as: 'session',
            attributes: ['id', 'client_id', 'trainer_id', 'status', 'session_date'],
          },
          {
            model: ExerciseGuides,
            as: 'exercise',
            attributes: ['id', 'name', 'description', 'muscle_group', 'difficulty_level'],
          },
        ],
      });
      res.status(200).json(sessionExercises);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch Session Exercises', details: error.message });
    }
  }

  // Lấy chi tiết một SessionExercise theo id
  async getSessionExerciseById(req, res) {
    try {
      const { session_id, exercise_id } = req.params;
  
      // Tìm Session Exercise theo session_id và exercise_id
      const sessionExercise = await SessionExercises.findOne({
        where: { session_id, exercise_id },
        include: [
          {
            model: Sessions,
            as: 'session',
            attributes: ['id', 'client_id', 'trainer_id', 'status', 'session_date'],
          },
          {
            model: ExerciseGuides,
            as: 'exercise',
            attributes: ['id', 'name', 'description', 'muscle_group', 'difficulty_level'],
          },
        ],
      });
  
      // Nếu không tìm thấy, trả về lỗi
      if (!sessionExercise) {
        return res.status(404).json({ error: 'Session Exercise not found' });
      }
  
      // Trả về thông tin Session Exercise
      res.status(200).json(sessionExercise);
    } catch (error) {
      // Xử lý lỗi và trả về phản hồi lỗi
      console.error('Error fetching session exercise:', error.message);
      res.status(500).json({
        error: 'Failed to fetch Session Exercise',
        details: error.message,
      });
  }
}
    // Thêm bài tập vào buổi tập
  async addExerciseToSession(req, res) {
    try {
      const { session_id, exercise_id, sets, reps } = req.body;

      const sessionExercise = await SessionExercises.create({
        session_id,
        exercise_id,
        sets,
        reps,
      });

      res.status(201).json(sessionExercise);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add exercise to session', details: error.message });
    }
  }

  // Xóa bài tập khỏi buổi tập
  async removeExerciseFromSession(req, res) {
    try {
      const { sessionId, exerciseId } = req.body;

      const sessionExercise = await SessionExercises.findOne({
        where: { session_id: sessionId, exercise_id: exerciseId },
      });

      if (!sessionExercise) {
        return res.status(404).json({ error: 'Session Exercise not found' });
      }

      await sessionExercise.destroy();
      res.status(200).json({ message: 'Exercise removed from session successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove exercise from session', details: error.message });
    }
  }

  // Cập nhật trạng thái của buổi tập
  async updateSessionStatus(req, res) {
    try {
      const { sessionId } = req.params;
      const { status } = req.body;

      const session = await Sessions.findByPk(sessionId);

      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }

      session.status = status;
      await session.save();

      res.status(200).json({ message: 'Session status updated successfully', session });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update session status', details: error.message });
    }
  }
}

module.exports = new SessionExercisesController();
