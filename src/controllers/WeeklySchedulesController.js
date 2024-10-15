const { WeeklySchedules, WorkoutPlans, MealPlans, User } = require("../models");

class WeeklySchedulesController {
    async getWeeklySchedule(req, res) {
        try {
            const weeklySchedules = await WeeklySchedules.findAll({
            attributes: ["id", ],
                include: [
                    {
                        model: WorkoutPlans,
                        as: "workoutPlan",
                        attributes: ["id", "description"],
                    },
                    {
                        model: MealPlans,
                        as: "mealPlan",
                        attributes: ["id" , "description"],
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
            res.status(200).json({success: true, data: weeklySchedules })
        } catch (error) {
            res.status(500).json({success: false, error: error.message})
        }
    }
}
module.exports = new WeeklySchedulesController;
