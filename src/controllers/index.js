
const UserController = require('./UserController');
const ClientController = require('./ClientController');
const TrainerController = require('./TrainerController');
const SessionsController = require('./SessionsController');
const WorkoutPlansController = require('./WorkoutPlansController');
const MealPlansController = require('./MealPlansController');
const ReviewsController = require('./ReviewsController');
const WeeklySchedulesController = require('./WeeklySchedulesController');
const ExerciseGuidesController = require('./ExerciseGuidesController');
const SessionExercisesController = require('./SessionExercisesController');

// Export các controller để sử dụng ở nơi khác trong ứng dụng
module.exports = {
    UserController,
    ClientController,
    TrainerController,
    SessionsController,
    WorkoutPlansController,
    MealPlansController,
    ReviewsController,
    WeeklySchedulesController,
    ExerciseGuidesController,
    SessionExercisesController,
};
