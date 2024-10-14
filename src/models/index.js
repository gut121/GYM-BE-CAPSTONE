const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./User");
const ClientDetails = require("./ClientDetails");
const TrainerDetails = require("./TrainerDetails");
const Sessions = require("./Sessions");
const WorkoutPlans = require("./WorkoutPlans");
const MealPlans = require("./MealPlans");
const Messages = require("./Messages");
const Payments = require("./Payments");
const Reviews = require("./Reviews");
const Notifications = require("./Notifications");
const WeeklySchedules = require("./WeeklySchedules");
const SubscriptionPlans = require("./SubscriptionPlans");
const ClientSubscriptions = require("./ClientSubscriptions");
const TrainerAssignments = require("./TrainerAssignments");
const ExerciseGuides = require("./ExerciseGuides");
const SessionExercises = require("./SessionExercises");

// Relationships between User and Client/Trainer Details
User.hasOne(ClientDetails, { foreignKey: "client_id", as: "clientDetails" });
ClientDetails.belongsTo(User, { foreignKey: "client_id", as: "userClientDetails" });

User.hasOne(TrainerDetails, { foreignKey: "trainer_id", as: "trainerDetails" });
TrainerDetails.belongsTo(User, { foreignKey: "trainer_id", as: "userTrainerDetails" });

// Relationships between User and Sessions (Client and Trainer)
User.hasMany(Sessions, { foreignKey: "client_id", as: "clientSessions" });
User.hasMany(Sessions, { foreignKey: "trainer_id", as: "trainerSessions" });
Sessions.belongsTo(User, { foreignKey: "client_id", as: "client" });
Sessions.belongsTo(User, { foreignKey: "trainer_id", as: "trainer" });

// Relationships between User and WorkoutPlans/MealPlans
User.hasMany(WorkoutPlans, { foreignKey: "client_id", as: "clientWorkoutPlans" });
User.hasMany(WorkoutPlans, { foreignKey: "trainer_id", as: "trainerWorkoutPlans" });
WorkoutPlans.belongsTo(User, { foreignKey: "client_id", as: "client" });
WorkoutPlans.belongsTo(User, { foreignKey: "trainer_id", as: "trainer" });

User.hasMany(MealPlans, { foreignKey: "client_id", as: "clientMealPlans" });
User.hasMany(MealPlans, { foreignKey: "trainer_id", as: "trainerMealPlans" });
MealPlans.belongsTo(User, { foreignKey: "client_id", as: "client" });
MealPlans.belongsTo(User, { foreignKey: "trainer_id", as: "trainer" });

// Relationships between User and Messages (Sent and Received)
User.hasMany(Messages, { foreignKey: 'sender_id', as: 'sentMessages' });
Messages.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });

User.hasMany(Messages, { foreignKey: 'receiver_id', as: 'receivedMessages' });
Messages.belongsTo(User, { foreignKey: 'receiver_id', as: 'receiver' });

// Relationships between User and Reviews
User.hasMany(Reviews, { foreignKey: "client_id", as: "clientReviews" });
User.hasMany(Reviews, { foreignKey: "trainer_id", as: "trainerReviews" });
Reviews.belongsTo(User, { foreignKey: "client_id", as: "client" });
Reviews.belongsTo(User, { foreignKey: "trainer_id", as: "trainer" });

// Relationships between User and Notifications
User.hasMany(Notifications, { foreignKey: "user_id" });
Notifications.belongsTo(User, { foreignKey: "user_id" });

// Relationships between User and WeeklySchedules
User.hasMany(WeeklySchedules, { foreignKey: "client_id", as: "clientWeeklySchedules" });
WeeklySchedules.belongsTo(User, { foreignKey: "client_id", as: "client" });

User.hasMany(WeeklySchedules, { foreignKey: "trainer_id", as: "trainerWeeklySchedules" });
WeeklySchedules.belongsTo(User, { foreignKey: "trainer_id", as: "trainer" });

// WeeklySchedules và WorkoutPlans
WeeklySchedules.belongsTo(WorkoutPlans, { foreignKey: "workout_plan_id", as: "workoutPlan" });
WorkoutPlans.hasMany(WeeklySchedules, { foreignKey: "workout_plan_id", as: "weeklySchedules" });

// WeeklySchedules và MealPlans
WeeklySchedules.belongsTo(MealPlans, { foreignKey: "meal_plan_id", as: "mealPlan" });
MealPlans.hasMany(WeeklySchedules, { foreignKey: "meal_plan_id", as: "weeklySchedules" });

// Relationships between SubscriptionPlans and ClientSubscriptions
SubscriptionPlans.hasMany(ClientSubscriptions, { foreignKey: "subscription_plan_id" });
ClientSubscriptions.belongsTo(SubscriptionPlans, { foreignKey: "subscription_plan_id" });

// Relationships between User and ClientSubscriptions
User.hasMany(ClientSubscriptions, { foreignKey: "client_id" });
ClientSubscriptions.belongsTo(User, { foreignKey: "client_id" });

// Relationships between User and TrainerAssignments
User.hasMany(TrainerAssignments, { foreignKey: "client_id", as: "clientAssignments" });
User.hasMany(TrainerAssignments, { foreignKey: "trainer_id", as: "trainerAssignments" });
TrainerAssignments.belongsTo(User, { foreignKey: "client_id", as: "client" });
TrainerAssignments.belongsTo(User, { foreignKey: "trainer_id", as: "trainer" });

// Relationships between Sessions and ExerciseGuides through SessionExercises
Sessions.belongsToMany(ExerciseGuides, { through: SessionExercises, foreignKey: "session_id" });
ExerciseGuides.belongsToMany(Sessions, { through: SessionExercises, foreignKey: "exercise_id" });

// Payments relationships
User.hasMany(Payments, { foreignKey: "client_id", as: "clientPayments" });
ClientSubscriptions.hasMany(Payments, { foreignKey: "subscription_id", as: "subscriptionPayments" });

Payments.belongsTo(User, { foreignKey: "client_id", as: "client" });
Payments.belongsTo(ClientSubscriptions, { foreignKey: "subscription_id", as: "subscription" });

module.exports = {
  User,
  ClientDetails,
  TrainerDetails,
  Sessions,
  WorkoutPlans,
  MealPlans,
  Messages,
  Payments,
  Reviews,
  Notifications,
  WeeklySchedules,
  SubscriptionPlans,
  ClientSubscriptions,
  TrainerAssignments,
  ExerciseGuides,
  SessionExercises,
  sequelize,
};

// sequelize
// select u.username, u.email, u.password
// from Users as u
// join ClientDetails as c on u.id = c.client_id

// bth học
// user_id
// join ClientDetails as c on u.user_id = c.user_id
