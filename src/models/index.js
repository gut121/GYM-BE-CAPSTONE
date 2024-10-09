const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

// Import models
const User = require('./User');
const ClientDetails = require('./ClientDetails');
const TrainerDetails = require('./TrainerDetails');
const Sessions = require('./Sessions');
const WorkoutPlans = require('./WorkoutPlans');
const MealPlans = require('./MealPlans');
const Messages = require('./Messages');
const Payments = require('./Payments');
const Reviews = require('./Reviews');
const Notifications = require('./Notifications');
const PhysicalForms = require('./PhysicalForms');
const UserMedia = require('./UserMedia');
const WeeklySchedules = require('./WeeklySchedules');
const SubscriptionPlans = require('./SubscriptionPlans');
const ClientSubscriptions = require('./ClientSubscriptions');
const TrainerAssignments = require('./TrainerAssignments');

User.hasOne(ClientDetails, { foreignKey: 'user_id' });
ClientDetails.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(TrainerDetails, { foreignKey: 'user_id' });
TrainerDetails.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Sessions, { foreignKey: 'client_id', as: 'ClientSessions' });
User.hasMany(Sessions, { foreignKey: 'trainer_id', as: 'TrainerSessions' });
Sessions.belongsTo(User, { foreignKey: 'client_id', as: 'Client' });
Sessions.belongsTo(User, { foreignKey: 'trainer_id', as: 'Trainer' });

User.hasMany(WorkoutPlans, { foreignKey: 'client_id', as: 'ClientWorkoutPlans' });
User.hasMany(WorkoutPlans, { foreignKey: 'trainer_id', as: 'TrainerWorkoutPlans' });
WorkoutPlans.belongsTo(User, { foreignKey: 'client_id', as: 'Client' });
WorkoutPlans.belongsTo(User, { foreignKey: 'trainer_id', as: 'Trainer' });

User.hasMany(MealPlans, { foreignKey: 'client_id', as: 'ClientMealPlans' });
User.hasMany(MealPlans, { foreignKey: 'trainer_id', as: 'TrainerMealPlans' });
MealPlans.belongsTo(User, { foreignKey: 'client_id', as: 'Client' });
MealPlans.belongsTo(User, { foreignKey: 'trainer_id', as: 'Trainer' });

User.hasMany(Messages, { foreignKey: 'sender_id', as: 'SentMessages' });
User.hasMany(Messages, { foreignKey: 'receiver_id', as: 'ReceivedMessages' });
Messages.belongsTo(User, { foreignKey: 'sender_id', as: 'Sender' });
Messages.belongsTo(User, { foreignKey: 'receiver_id', as: 'Receiver' });

User.hasMany(Payments, { foreignKey: 'client_id', as: 'ClientPayments' });
User.hasMany(Payments, { foreignKey: 'trainer_id', as: 'TrainerPayments' });
Payments.belongsTo(User, { foreignKey: 'client_id', as: 'Client' });
Payments.belongsTo(User, { foreignKey: 'trainer_id', as: 'Trainer' });

User.hasMany(Reviews, { foreignKey: 'client_id', as: 'ClientReviews' });
User.hasMany(Reviews, { foreignKey: 'trainer_id', as: 'TrainerReviews' });
Reviews.belongsTo(User, { foreignKey: 'client_id', as: 'Client' });
Reviews.belongsTo(User, { foreignKey: 'trainer_id', as: 'Trainer' });

User.hasMany(Notifications, { foreignKey: 'user_id' });
Notifications.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(PhysicalForms, { foreignKey: 'user_id' });
PhysicalForms.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(UserMedia, { foreignKey: 'user_id' });
UserMedia.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(WeeklySchedules, { foreignKey: 'client_id', as: 'ClientWeeklySchedules' });
User.hasMany(WeeklySchedules, { foreignKey: 'trainer_id', as: 'TrainerWeeklySchedules' });
WeeklySchedules.belongsTo(User, { foreignKey: 'client_id', as: 'Client' });
WeeklySchedules.belongsTo(User, { foreignKey: 'trainer_id', as: 'Trainer' });
WeeklySchedules.belongsTo(WorkoutPlans, { foreignKey: 'workout_plan_id' });
WeeklySchedules.belongsTo(MealPlans, { foreignKey: 'meal_plan_id' });

SubscriptionPlans.hasMany(ClientSubscriptions, { foreignKey: 'subscription_plan_id' });
ClientSubscriptions.belongsTo(SubscriptionPlans, { foreignKey: 'subscription_plan_id' });

User.hasMany(ClientSubscriptions, { foreignKey: 'user_id' });
ClientSubscriptions.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(TrainerAssignments, { foreignKey: 'client_id', as: 'ClientAssignments' });
User.hasMany(TrainerAssignments, { foreignKey: 'trainer_id', as: 'TrainerAssignments' });
TrainerAssignments.belongsTo(User, { foreignKey: 'client_id', as: 'Client' });
TrainerAssignments.belongsTo(User, { foreignKey: 'trainer_id', as: 'Trainer' });

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
    PhysicalForms,
    UserMedia,
    WeeklySchedules,
    SubscriptionPlans,
    ClientSubscriptions,
    TrainerAssignments,
    sequelize,
};
