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
            res.status(200).json({success: true, data: weeklySchedules })
        } catch (error) {
            res.status(500).json({success: false, error: error.message})
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

            const workoutPlan = JSON.parse(weeklySchedule.workoutPlan.week_plan);
            const mealPlan = JSON.parse(weeklySchedule.mealPlan.week_plan);

            const schedule = {
                "Monday": {
                    workoutPlan: {
                        description: weeklySchedule.workoutPlan.description,
                        activity: workoutPlan["Monday"]
                    },
                    mealPlan: {
                        description: weeklySchedule.mealPlan.description,
                        meal: mealPlan["Monday"]
                    }
                },
                "Tuesday": {
                    workoutPlan: {
                        description: weeklySchedule.workoutPlan.description,
                        activity: workoutPlan["Tuesday"]
                    },
                    mealPlan: {
                        description: weeklySchedule.mealPlan.description,
                        meal: mealPlan["Tuesday"]
                    }
                },
                "Wednesday": {
                    workoutPlan: {
                        description: weeklySchedule.workoutPlan.description,
                        activity: workoutPlan["Wednesday"]
                    },
                    mealPlan: {
                        description: weeklySchedule.mealPlan.description,
                        meal: mealPlan["Wednesday"]
                    }
                },
                "Thursday": {
                    workoutPlan: {
                        description: weeklySchedule.workoutPlan.description,
                        activity: workoutPlan["Thursday"]
                    },
                    mealPlan: {
                        description: weeklySchedule.mealPlan.description,
                        meal: mealPlan["Thursday"]
                    }
                },
                "Friday": {
                    workoutPlan: {
                        description: weeklySchedule.workoutPlan.description,
                        activity: workoutPlan["Friday"]
                    },
                    mealPlan: {
                        description: weeklySchedule.mealPlan.description,
                        meal: mealPlan["Friday"]
                    }
                },
                "Saturday": {
                    workoutPlan: {
                        description: weeklySchedule.workoutPlan.description,
                        activity: workoutPlan["Saturday"]
                    },
                    mealPlan: {
                        description: weeklySchedule.mealPlan.description,
                        meal: mealPlan["Saturday"]
                    }
                },
                "Sunday": {
                    workoutPlan: {
                        description: weeklySchedule.workoutPlan.description,
                        activity: workoutPlan["Sunday"]
                    },
                    mealPlan: {
                        description: weeklySchedule.mealPlan.description,
                        meal: mealPlan["Sunday"]
                    }
                }
            };

            res.status(200).json({
                success: true,
                data: {
                    id: weeklySchedule.id,
                    start_date: weeklySchedule.start_date,
                    end_date: weeklySchedule.end_date,
                    schedule: schedule,
                    trainer: weeklySchedule.trainer,
                    client: weeklySchedule.client
                }
            });

        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}
module.exports = new WeeklySchedulesController;
