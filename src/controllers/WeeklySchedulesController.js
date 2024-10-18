const { WeeklySchedules, WorkoutPlans, MealPlans, User } = require("../models");

class WeeklySchedulesController {
    async getWeeklySchedule(req, res) {
        try {
            const weeklySchedules = await WeeklySchedules.findAll({
                attributes: ['id', 'start_date', 'end_date', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: WorkoutPlans,
                        as: "workoutPlan",
                        attributes: ['description', 'week_plan'],
                    },
                    {
                        model: MealPlans,
                        as: "mealPlan",
                        attributes: ['description', 'week_plan'],
                    },
                    {
                        model: User,
                        as: "trainer",
                        attributes: ["id", "username"],
                        required: true,
                    },

                    {
                        model: User,
                        as: "client",
                        attributes: ["id", "username"],
                    }
                ]
            })
            res.status(200).json({ success: true, data: weeklySchedules })
        } catch (error) {
            res.status(500).json({ success: false, error: error.message })
        }
    }
    async getWeeklyScheduleById(req, res) {
        try {
            const { id } = req.params;
            const weeklySchedule = await WeeklySchedules.findOne({
                where: { id },
                attributes: ['id', 'start_date', 'end_date', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: WorkoutPlans,
                        as: "workoutPlan",
                        attributes: ['description', 'week_plan'],
                    },
                    {
                        model: MealPlans,
                        as: "mealPlan",
                        attributes: ['description', 'week_plan'],
                    },
                    {
                        model: User,
                        as: "trainer",
                        attributes: ["id", "username"],
                        required: true,
                    },
                    {
                        model: User,
                        as: "client",
                        attributes: ["id", "username"],
                    }
                ]
            });

            if (!weeklySchedule) {
                return res.status(404).json({ success: false, message: "Weekly Schedule not found" });
            }
            res.status(200).json({ success: true, data: weeklySchedule });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
    async createWeeklySchedule(req, res) {
        console.log('req', req.user);
        try {
            const { start_date, end_date, workout_plan_id, meal_plan_id, client_id } = req.body;
            const { id } = req.user;
            const trainer = await User.findByPk(id);
            if (!trainer) {
                res.status(404).json({ success: false, message: "Trainer not found" });
            }
            const weeklySchedule = await WeeklySchedules.create({
                start_date,
                end_date,
                workout_plan_id,
                meal_plan_id,
                client_id,
                trainer_id: id
            });
            res.status(201).json({ success: true, data: weeklySchedule });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    }
}
module.exports = new WeeklySchedulesController;
