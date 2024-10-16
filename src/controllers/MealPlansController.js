const { Message } = require("twilio/lib/twiml/MessagingResponse");
const { MealPlans, User } = require("../models");

class MealPlansController {
    async getMealPlans(req, res) {
        try {
            const MealPlans = await MealPlans.findAll();
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
            res.status(200).json({ success: true, data: workoutPlans });
        } catch (error) {
            res.status(500).json({ Message: "Internal Server Error" });

        }
    }
    async getMealPlansById(req, res) {
        try {
            const mealPlan = await MealPlans.findByPk(req.params.id, {
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
            if (!mealPlan) return res.status(404).json({ success: false, Message: "Meal Plan Not Found" });
            res.status(200).json({ success: true, data: mealPlan });
        } catch (error) {
            res.status(500).json({success: false, Message: "Internal Server Error" });

        }
    }
}
module.exports = new MealPlansController();