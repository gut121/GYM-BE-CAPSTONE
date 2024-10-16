const { WorkoutPlans, User } = require("../models");

class WorkoutPlansController {
    async getWorkoutPlans(req, res) {
        try {
            const workoutPlans = await WorkoutPlans.findAll({
                include: [
                    {
                        model: User,
                        as: 'client',
                        attributes: ["id", "username"]
                    },
                    {
                        model: User,
                        as: 'trainer',
                        attributes: ["id", "username"]
                    },
                ]
            });
            res.status(200).json({ success: true, data: workoutPlans });
        } catch (error) {
            conslog.error("error getting workout plans", error)
            res.status(500).json({ message: error.message });
        }
    }
    async getWorkoutPlanById(req, res) {
        const { id } = req.params;
        try {
            const workoutPlan = await WorkoutPlans.findByPk(id, {
                attributes: ["id", "description", "week_plan"],
                include: [
                    {
                        model: User,
                        as: 'client',
                        attributes: ["id", "username"]
                    },
                    {
                        model: User,
                        as: 'trainer',
                        attributes: ["id", "username"]
                    },
                ]
            });
            if (!workoutPlan) {
                return res.status(404).json({ message: "Workout Plan not found" });
            }
            res.status(200).json({ success: true, data: workoutPlan });

        } catch (error) {
            conslog.error("error getting workout plan", error)
            res.status(500).json({ message: error.message });
        }
    }
    
}

module.exports = new WorkoutPlansController();