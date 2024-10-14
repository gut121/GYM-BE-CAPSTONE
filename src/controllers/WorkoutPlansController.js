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
 
     async getWorkoutPlanById(req, res) {
        try {
            const workoutPlanId = req.params.id;
            const workoutPlan = await WorkoutPlans.findByPk(workoutPlanId);
            if (!workoutPlan) {
                return res.status(404).json({ message: 'Workout plan not found' });
            }
            res.status(200).json({ message: 'success', workoutPlan });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    async createWorkoutPlan(req, res) {
        try {
            const { description, week_plan } = req.body;
            const newWorkoutPlan = await WorkoutPlans.create({
                description,
                week_plan
            });
            res.status(201).json({ message: 'Workout plan created', workoutPlan: newWorkoutPlan });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    async updateWorkoutPlan(req, res) {
        try {
            const workoutPlanId = req.params.id;
            const { description, week_plan } = req.body;

            const workoutPlan = await WorkoutPlans.findByPk(workoutPlanId);
            if (!workoutPlan) {
                return res.status(404).json({ message: 'Workout plan not found' });
            }

            await workoutPlan.update({
                description,
                week_plan
            });

            res.status(200).json({ message: 'Workout plan updated', workoutPlan });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    async deleteWorkoutPlan(req, res) {
        try {
            const workoutPlanId = req.params.id;

            const workoutPlan = await WorkoutPlans.findByPk(workoutPlanId);
            if (!workoutPlan) {
                return res.status(404).json({ message: 'Workout plan not found' });
            }

            await workoutPlan.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }
}

module.exports = new WorkoutPlansController();