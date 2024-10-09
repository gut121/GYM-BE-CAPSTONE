const { WorkoutPlans } = require("../models");

class WorkoutPlansController {
    async getAllWorkoutPlans(req, res) {
        try {
            const workoutPlans = await WorkoutPlans.findAll();
            if (!workoutPlans) {
                res.status(404).json({ message: 'Not found workoutPlans' })
            }
            res.status(200).json({ message: 'success', workoutPlans: workoutPlans });
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = new WorkoutPlansController();