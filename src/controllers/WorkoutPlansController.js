const { WorkoutPlans, User, Sessions } = require("../models");
const sequelize = require('../config/database');

class WorkoutPlansController {
    async getWorkoutPlans(req, res) {
        try {
            const workoutPlans = await WorkoutPlans.findAll({
                include: [
                    {
                        model: Sessions,
                        as: 'sessions',
                        attributes: ["workout_plan_id", "session_date", "status", "incomplete_reason", "day_of_week", "createdAt"]
                    },
                ]
            });
            res.status(200).json({ success: true, data: workoutPlans });
        } catch (error) {
            console.error("Error getting workout plans", error);
            res.status(500).json({ message: error.message });
        }
    }

    async getWorkoutPlanById(req, res) {
        const { id } = req.params;
        try {
            const workoutPlan = await WorkoutPlans.findByPk(id, {
                attributes: ["id", "description", "week_number", "day_of_week"],
                include: [
                    {
                        model: User,
                        as: 'client',
                        attributes: ["id", "name"]
                    },
                    {
                        model: User,
                        as: 'trainer',
                        attributes: ["id", "name"]
                    },
                ]
            });
            if (!workoutPlan) {
                return res.status(404).json({ message: "Workout Plan not found" });
            }
            res.status(200).json({ success: true, data: workoutPlan });
        } catch (error) {
            console.error("Error getting workout plan", error);
            res.status(500).json({ message: error.message });
        }
    }

    async createWorkoutPlan(req, res) {
        const { id } = req.user;
        try {
            const trainer = await User.findByPk(id);
            if (!trainer) {
                return res.status(404).json({ success: false, message: "Trainer not found" });
            }
            const { client_id, description, week_number, day_of_week } = req.body;
            const workoutPlan = await WorkoutPlans.create({
                client_id,
                trainer_id: id,
                description,
                week_number,
                day_of_week,
            });
            res.status(201).json({ success: true, data: workoutPlan });
        } catch (error) {
            console.error("Error creating workout plan", error);
            res.status(500).json({ message: error.message });
        }
    }

    async updateWorkoutPlan(req, res) {
        const { id } = req.params;
        const { description, week_number, day_of_week } = req.body;

        if (!description && !week_number && !day_of_week) {
            return res.status(400).json({ message: "Please provide description, week_number, or day_of_week to update." });
        }

        try {
            const workoutPlan = await WorkoutPlans.findByPk(id);
            if (!workoutPlan) {
                return res.status(404).json({ message: "Workout Plan not found" });
            }
            if (workoutPlan.client_id !== req.user.id && workoutPlan.trainer_id !== req.user.id) {
                return res.status(403).json({ message: "You do not have permission to update this workout plan" });
            }

            await sequelize.transaction(async (transaction) => {
                workoutPlan.description = description || workoutPlan.description;
                workoutPlan.week_number = week_number || workoutPlan.week_number;
                workoutPlan.day_of_week = day_of_week || workoutPlan.day_of_week;

                await workoutPlan.save({ transaction });
            });

            res.status(200).json({ success: true, data: workoutPlan });
        } catch (error) {
            console.error("Error updating workout plan", error);
            res.status(500).json({ message: error.message });
        }
    }

    async deleteWorkoutPlan(req, res) {
        const { id } = req.params;
        try {
            const workoutPlan = await WorkoutPlans.findByPk(id);
            if (!workoutPlan) {
                return res.status(404).json({ message: "Workout Plan not found" });
            }
            if (workoutPlan.trainer_id !== req.user.id && workoutPlan.client_id !== req.user.id) {
                return res.status(403).json({ message: "You do not have permission to delete this workout plan" });
            }
            await workoutPlan.destroy();
            res.status(200).json({ success: true, message: "Workout Plan deleted successfully" });
        } catch (error) {
            console.error("Error deleting workout plan", error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new WorkoutPlansController();
