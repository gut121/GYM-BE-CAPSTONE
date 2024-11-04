const { Sessions, User, WorkoutPlans } = require('../models');
const sequelize = require('../config/database');
const { Op } = require('sequelize');

class SessionsController {
  async createSession(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const {
        client_id,
        trainer_id,
        workout_plan_id,
        session_date,
        status,
        day_of_week,
      } = req.body;
      const trainer = await User.findByPk(trainer_id);
      if (!trainer || trainer.role !== 'trainer') {
        return res
          .status(403)
          .json({ error: 'Only trainers can create sessions' });
      }

      const session = await Sessions.create(
        {
          client_id,
          trainer_id,
          workout_plan_id,
          session_date,
          status: status || 'pending',
          day_of_week,
        },
        { transaction }
      );

      await transaction.commit();
      res.status(201).json({ success: true, data: session });
    } catch (error) {
      await transaction.rollback();
      console.error('Error creating session:', error);
      res.status(500).json({ error: 'Failed to create session' });
    }
  }

  async getSessions(req, res) {
    try {
      const sessions = await Sessions.findAll({
        attributes: [
          'id',
          'session_date',
          'status',
          'day_of_week',
          'createdAt',
          'updatedAt',
        ],
        include: [
          { model: User, as: 'client', attributes: ['id', 'username'] },
          { model: User, as: 'trainer', attributes: ['id', 'username'] },
          {
            model: WorkoutPlans,
            as: 'workoutPlan',
            attributes: ['id', 'description'],
          },
        ],
      });
      res.status(200).json({ success: true, data: sessions });
    } catch (error) {
      console.error('Error fetching sessions:', error);
      res.status(500).json({ error: 'Failed to retrieve sessions' });
    }
  }

  async getSessionById(req, res) {
    try {
      const { id } = req.params;
      const session = await Sessions.findByPk(id, {
        include: [
          { model: User, as: 'client', attributes: ['id', 'username'] },
          { model: User, as: 'trainer', attributes: ['id', 'username'] },
          {
            model: WorkoutPlans,
            as: 'workoutPlan',
            attributes: ['id', 'description'],
          },
        ],
      });
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }
      res.status(200).json({ success: true, data: session });
    } catch (error) {
      console.error('Error fetching session:', error);
      res.status(500).json({ error: 'Failed to retrieve session' });
    }
  }

  async getSessionSummary(req, res) {
    try {
      const { clientId } = req.params;

      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      const completedSessionsCount = await Sessions.count({
        where: {
          client_id: clientId,
          status: 'completed',
          session_date: {
            [Op.between]: [startOfWeek, endOfWeek],
          },
        },
      });

      const canceledSessionsCount = await Sessions.count({
        where: {
          client_id: clientId,
          status: 'cancelled',
          session_date: {
            [Op.between]: [startOfWeek, endOfWeek],
          },
        },
      });

      res.status(200).json({
        success: true,
        data: {
          completedSessionsCount,
          canceledSessionsCount,
        },
      });
    } catch (error) {
      console.error('Error fetching session summary:', error);
      res.status(500).json({ error: 'Failed to retrieve session summary' });
    }
  }

  async updateSession(req, res) {
    try {
      const { id } = req.params;
      const { session_date, status, day_of_week, incomplete_reason } = req.body;

      const session = await Sessions.findByPk(id);
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }

      session.session_date = session_date || session.session_date;
      session.status = status || session.status;
      session.day_of_week = day_of_week || session.day_of_week;
      session.incomplete_reason =
        incomplete_reason || session.incomplete_reason;

      await session.save();
      res.status(200).json({ success: true, data: session });
    } catch (error) {
      console.error('Error updating session:', error);
      res.status(500).json({ error: 'Failed to update session' });
    }
  }

  async deleteSession(req, res) {
    try {
      const { id } = req.params;

      const session = await Sessions.findByPk(id);
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }

      await session.destroy();
      res
        .status(200)
        .json({ success: true, message: 'Session deleted successfully' });
    } catch (error) {
      console.error('Error deleting session:', error);
      res.status(500).json({ error: 'Failed to delete session' });
    }
  }
}

module.exports = new SessionsController();
