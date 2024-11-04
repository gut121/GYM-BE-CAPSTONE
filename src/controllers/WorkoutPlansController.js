const { WorkoutPlans, User, Sessions } = require('../models');
const sequelize = require('../config/database');

class WorkoutPlansController {
  async getWorkoutPlans(req, res) {
    try {
      const workoutPlans = await WorkoutPlans.findAll({
        include: [
          {
            model: Sessions,
            as: 'sessions',
            attributes: [
              'workout_plan_id',
              'session_date',
              'status',
              'incomplete_reason',
              'createdAt',
            ],
          },
          {
            model: User,
            as: 'client',
            attributes: ['id', 'name'],
          },
          {
            model: User,
            as: 'trainer',
            attributes: ['id', 'name'],
          },
        ],
      });
      res.status(200).json({ success: true, data: workoutPlans });
    } catch (error) {
      console.error('Error getting workout plans', error);
      res.status(500).json({ message: error.message });
    }
  }

  async getWorkoutPlanById(req, res) {
    const { id } = req.params;
    try {
      const workoutPlan = await WorkoutPlans.findByPk(id, {
        include: [
          {
            model: User,
            as: 'client',
            attributes: ['id', 'name'],
          },
          {
            model: User,
            as: 'trainer',
            attributes: ['id', 'name'],
          },
          {
            model: Sessions,
            as: 'sessions',
            attributes: [
              'session_date',
              'status',
              'incomplete_reason',
              'createdAt',
            ],
          },
        ],
      });
      if (!workoutPlan) {
        return res.status(404).json({ message: 'Workout Plan not found' });
      }
      res.status(200).json({ success: true, data: workoutPlan });
    } catch (error) {
      console.error('Error getting workout plan', error);
      res.status(500).json({ message: error.message });
    }
  }

  async createWorkoutPlan(req, res) {
    const { userId } = req.user;
    try {
      const trainer = await User.findByPk(userId);
      if (!trainer) {
        return res
          .status(404)
          .json({ success: false, message: 'Trainer not found' });
      }
      const { client_id, description, week_number } = req.body;
      const workoutPlan = await WorkoutPlans.create({
        client_id,
        trainer_id: userId,
        description,
        week_number,
      });
      res.status(201).json({ success: true, data: workoutPlan });
    } catch (error) {
      console.error('Error creating workout plan', error);
      res.status(500).json({ message: error.message });
    }
  }

  async updateWorkoutPlan(req, res) {
    const { id } = req.params;
    const { description, week_number } = req.body;

    try {
      const workoutPlan = await WorkoutPlans.findByPk(id);
      if (!workoutPlan) {
        return res.status(404).json({ message: 'Workout Plan not found' });
      }
      await sequelize.transaction(async (transaction) => {
        workoutPlan.description = description || workoutPlan.description;
        workoutPlan.week_number = week_number || workoutPlan.week_number;

        await workoutPlan.save({ transaction });
      });

      res.status(200).json({ success: true, data: workoutPlan });
    } catch (error) {
      console.error('Error updating workout plan', error);
      res.status(500).json({ message: error.message });
    }
  }

  async deleteWorkoutPlan(req, res) {
    const { id } = req.params;
    try {
      const workoutPlan = await WorkoutPlans.findByPk(id);
      if (!workoutPlan) {
        return res.status(404).json({ message: 'Workout Plan not found' });
      }
      await workoutPlan.destroy();
      res
        .status(200)
        .json({ success: true, message: 'Workout Plan deleted successfully' });
    } catch (error) {
      console.error('Error deleting workout plan', error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new WorkoutPlansController();
