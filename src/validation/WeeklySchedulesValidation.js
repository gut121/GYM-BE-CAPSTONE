const { body, param, query } = require('express-validator');
const WeeklySchedulesValidation = {
   getWeeklyScheduleById: [
      param('id')
         .notEmpty()
         .withMessage('id is required')
         .isInt()
         .withMessage('id must be an integer')
   ],
   createWeeklySchedule: [
      body('start_date')
         .notEmpty()
         .withMessage('start_date is required')
         .isDate()
         .withMessage('start_date must be a date'),
      body('end_date')
         .notEmpty()
         .withMessage('end_date is required')
         .isDate()
         .withMessage('end_date must be a date'),
      body(' workout_plan_id')
         .notEmpty()
         .withMessage('workout_plan_id is required')
         .isInt()
         .withMessage('workout_plan_id must be an integer'),
      body('meal_plan_id')
         .notEmpty()
         .withMessage('meal_plan_id is required')
         .isInt()
         .withMessage('meal_plan_id must be an integer'),
      body('client_id')
         .notEmpty()
         .withMessage('client_id is required')
         .isInt()
         .withMessage('client_id must be an integer'),
      body('trainer_id')
         .notEmpty()
         .withMessage('trainer_id is required')
         .isInt()
         .withMessage('trainer_id must be an integer')
   ]
}
module.exports = WeeklySchedulesValidation;