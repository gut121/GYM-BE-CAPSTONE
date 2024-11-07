const AuthController = require('./AuthController');
const AdminController = require('./Admincontroller');
const ClientController = require('./ClientController');
const TrainerController = require('./TrainerController');
const SessionsController = require('./SessionsController');
const WorkoutPlansController = require('./WorkoutPlansController');
const MealPlansController = require('./MealPlansController');
const ReviewsController = require('./ReviewsController');
const ExerciseGuidesController = require('./ExerciseGuidesController');
const SessionExercisesController = require('./SessionExercisesController');

// Export các controller để sử dụng ở nơi khác trong ứng dụng
module.exports = {
  AuthController,
  AdminController,
  ClientController,
  TrainerController,
  SessionsController,
  WorkoutPlansController,
  MealPlansController,
  ReviewsController,
  ExerciseGuidesController,
  SessionExercisesController,
};
