const { WeeklySchedules, User, WorkoutPlans, MealPlans } = require("../models");

class WeeklySchedulesController {
    
  async getAllWeeklySchedules(req, res) {
    try {
      const schedules = await WeeklySchedules.findAll({
        include: [
          {
            model: User,
            as: "Client",
            attributes: ["id", "username"],
          },
          {
            model: User,
            as: "Trainer",
            attributes: ["id", "username"],
          },
          {
            model: WorkoutPlans,
            attributes: [
              "id",
              "description",
              "week_plan",
              "createdAt",
              "updatedAt",
            ],
          },
          {
            model: MealPlans,
            attributes: [
              "id",
              "description",
              "week_plan",
              "createdAt",
              "updatedAt",
            ],
          },
        ],
      });

      const fullSchedules = schedules.map((schedule) => {
        const workoutPlan = schedule.WorkoutPlans?.week_plan || {};
        const mealPlan = schedule.MealPlans?.week_plan || {};

        const fullWeekPlan = {
          monday: {
            workout: workoutPlan.monday || "Rest day",
            meal: mealPlan.monday || "No meal plan",
          },
          tuesday: {
            workout: workoutPlan.tuesday || "Rest day",
            meal: mealPlan.tuesday || "No meal plan",
          },
          wednesday: {
            workout: workoutPlan.wednesday || "Rest day",
            meal: mealPlan.wednesday || "No meal plan",
          },
          thursday: {
            workout: workoutPlan.thursday || "Rest day",
            meal: mealPlan.thursday || "No meal plan",
          },
          friday: {
            workout: workoutPlan.friday || "Rest day",
            meal: mealPlan.friday || "No meal plan",
          },
          saturday: {
            workout: workoutPlan.saturday || "Rest day",
            meal: mealPlan.saturday || "No meal plan",
          },
          sunday: {
            workout: workoutPlan.sunday || "Rest day",
            meal: mealPlan.sunday || "No meal plan",
          },
        };
        return {
          id: schedule.id,
          client: schedule.Client,
          trainer: schedule.Trainer,
          fullWeekPlan: fullWeekPlan,
          createdAt: schedule.createdAt,
          updatedAt: schedule.updatedAt,
        };
      });

      res.status(200).json({ schedules: fullSchedules });
    } catch (error) {
      console.error("Error fetching weekly schedules:", error);
      res
        .status(500)
        .json({
          error:
            "An error occurred while fetching weekly schedules. Please try again later.",
        });
    }
  }
}

module.exports = new WeeklySchedulesController();
