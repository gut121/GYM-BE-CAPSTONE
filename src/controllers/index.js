
const UserController = require('./UserController');
const ClientController = require('./ClientController');
const TrainerController = require('./TrainerController');
const SessionsController = require('./SessionsController');
const WorkoutPlansController = require('./WorkoutPlansController');
const MealPlansController = require('./MealPlansController');
const MessagesController = require('./MessagesController');
const PaymentsController = require('./PaymentsController');
const ReviewsController = require('./ReviewsController');
const NotificationsController = require('./NotificationsController');
const WeeklySchedulesController = require('./WeeklySchedulesController');
const SubscriptionPlansController = require('./SubscriptionPlansController');
const ClientSubscriptionsController = require('./ClientSubscriptionsController');
const TrainerAssignmentsController = require('./TrainerAssignmentsController');
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
    MessagesController,
    PaymentsController,
    ReviewsController,
    NotificationsController,
    WeeklySchedulesController,
    SubscriptionPlansController,
    ClientSubscriptionsController,
    TrainerAssignmentsController,
    ExerciseGuidesController,
    SessionExercisesController,
};
