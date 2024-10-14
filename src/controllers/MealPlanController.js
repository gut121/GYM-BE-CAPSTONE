const { MealPlans } = require('../models'); 

class MealPlanController {
 
    async getAllMealPlans(req, res) {
        try {
            const mealPlans = await MealPlans.findAll();
            res.status(200).json({ mealPlans });
        } catch (error) {
            console.error('Error fetching meal plans:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    async getMealPlanById(req, res) {
        try {
            const mealPlanId = req.params.id;
            const mealPlan = await MealPlans.findByPk(mealPlanId);
            if (!mealPlan) {
                return res.status(404).json({ error: 'Meal Plan not found' });
            }
            res.status(200).json({ mealPlan });
        } catch (error) {
            console.error('Error fetching meal plan:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    async createMealPlan(req, res) {
        try {
            const { description, week_plan } = req.body;
            const newMealPlan = await MealPlans.create({
                description,
                week_plan
            });
            res.status(201).json({ mealPlan: newMealPlan });
        } catch (error) {
            console.error('Error creating meal plan:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateMealPlan(req, res) {
        try {
            const mealPlanId = req.params.id;
            const { description, week_plan } = req.body;

            const mealPlan = await MealPlans.findByPk(mealPlanId);
            if (!mealPlan) {
                return res.status(404).json({ error: 'Meal Plan not found' });
            }

            await mealPlan.update({
                description,
                week_plan
            });

            res.status(200).json({ mealPlan });
        } catch (error) {
            console.error('Error updating meal plan:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

  
    async deleteMealPlan(req, res) {
        try {
            const mealPlanId = req.params.id;

            const mealPlan = await MealPlans.findByPk(mealPlanId);
            if (!mealPlan) {
                return res.status(404).json({ error: 'Meal Plan not found' });
            }

            await mealPlan.destroy();
            res.status(204).send();
        } catch (error) {
            console.error('Error deleting meal plan:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new MealPlanController();
