const { WeeklySchedules, User, WorkoutPlans, MealPlans } = require('../models'); // Import models

class WeeklySchedulesController {
    async getAllWeeklySchedules(req, res) {
        try {
            const schedules = await WeeklySchedules.findAll({
                include: [
                    {
                        model: User,
                        as: 'Client',
                        attributes: ['id', 'username'],
                    },
                    {
                        model: User,
                        as: 'Trainer',
                        attributes: ['id', 'username'],
                    },
                    {
                        model: WorkoutPlans,
                        attributes: ['id', 'description', 'week_plan', 'createdAt', 'updatedAt'],
                    },
                    {
                        model: MealPlans,
                        attributes: ['id', 'description', 'week_plan', 'createdAt', 'updatedAt'],
                    },
                ],
            });
            res.status(200).json({ schedules: schedules });
        } catch (error) {
            console.error('Error fetching weekly schedules:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new WeeklySchedulesController();
