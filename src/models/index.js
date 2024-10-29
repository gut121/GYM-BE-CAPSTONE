const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Import các models
const User = require("./User")
const ClientDetails = require("./ClientDetails")
const TrainerDetails = require("./TrainerDetails")
const Sessions = require("./Sessions")
const WorkoutPlans = require("./WorkoutPlans")
const MealPlans = require("./MealPlans")
const Messages = require("./Messages")
const Payments = require("./Payments")
const Reviews = require("./Reviews")
const Notifications = require("./Notifications")
const TrainerAssignments = require("./TrainerAssignments")
const ExerciseGuides = require("./ExerciseGuides")
const SessionExercises = require("./SessionExercises")


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
User.hasMany(Notifications, { foreignKey: "user_id", as: "notifications" });
Notifications.belongsTo(User, { foreignKey: "user_id", as: "user" });

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
User.hasMany(Payments, { foreignKey: "trainer_id", as: "trainerPayments" });
Payments.belongsTo(User, { foreignKey: "client_id", as: "client" });
Payments.belongsTo(User, { foreignKey: "trainer_id", as: "trainer" });
// Thiết lập quan hệ giữa WorkoutPlans và Sessions
WorkoutPlans.hasMany(Sessions, { foreignKey: 'workout_plan_id', as: 'sessions' });
Sessions.belongsTo(WorkoutPlans, { foreignKey: 'workout_plan_id', as: 'workoutPlan' });


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
  TrainerAssignments,
  ExerciseGuides,
  SessionExercises,
  sequelize,
};
