const { MealPlans , User } = require("../models");

class MealPlansController {
    // Lấy tất cả MealPlans
    async getMealPlans(req, res) {
        try {
            const mealPlans = await MealPlans.findAll({
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

            res.status(200).json({ success: true, data: mealPlans });
        } catch (error) {
            console.error("Error getting meal plans:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    // Lấy MealPlan theo ID
    async getMealPlanById(req, res) {
        try {
            const mealPlan = await MealPlans.findByPk(req.params.id, {
                attributes: [
                    "id", 
                    "week_number", 
                    "day_of_week", 
                    "meal_type", 
                    "meal_name", 
                    "ingredients", 
                    "calories", 
                    "protein", 
                    "carbs", 
                    "fat", 
                    "chef_notes"
                ],
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

            if (!mealPlan) {
                return res.status(404).json({ success: false, message: "Meal Plan Not Found" });
            }

            res.status(200).json({ success: true, data: mealPlan });
        } catch (error) {
            console.error("Error getting meal plan:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
    async createMealPlan(req, res) {
        try {
            const { client_id, week_number, day_of_week, meal_type, meal_name, ingredients, calories, protein, carbs, fat, chef_notes } = req.body;
            const { id } = req.user;

            const trainer = await User.findByPk(id);
            if (!trainer || trainer.role !== 'trainer') {
                return res.status(403).json({ success: false, message: "Only trainers can create meal plans" });
            }

            const mealPlan = await MealPlans.create({
                client_id,
                trainer_id,
                week_number,
                day_of_week,
                meal_type,
                meal_name,
                ingredients,
                calories,
                protein,
                carbs,
                fat,
                chef_notes
            });

            res.status(201).json({ success: true, data: mealPlan });
        } catch (error) {
            console.error("Error creating meal plan:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    async updateMealPlan(req, res) {
        try {
            const { id } = req.params;
            const { week_number, day_of_week, meal_type, meal_name, ingredients, calories, protein, carbs, fat, chef_notes } = req.body;

            const mealPlan = await MealPlans.findByPk(id);
            if (!mealPlan) {
                return res.status(404).json({ success: false, message: "Meal Plan Not Found" });
            }
            if (mealPlan.trainer_id !== req.user.id && mealPlan.client_id !== req.user.id) {
                return res.status(403).json({ message: "You do not have permission to update this meal plan" });
            }
            await mealPlan.save();
            res.status(200).json({ success: true, data: mealPlan });
        } catch (error) {
            console.error("Error updating meal plan:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    async deleteMealPlan(req, res) {
        try {
            const { id } = req.params;
            const mealPlan = await MealPlans.findByPk(id);

            if (!mealPlan) {
                return res.status(404).json({ success: false, message: "Meal Plan Not Found" });
            }

            // Kiểm tra quyền truy cập: chỉ trainer hoặc client liên quan mới được xóa
            if (mealPlan.trainer_id !== req.user.id && mealPlan.client_id !== req.user.id) {
                return res.status(403).json({ message: "You do not have permission to delete this meal plan" });
            }

            await mealPlan.destroy();
            res.status(200).json({ success: true, message: "Meal Plan deleted successfully" });
        } catch (error) {
            console.error("Error deleting meal plan:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
}

module.exports = new MealPlansController();
