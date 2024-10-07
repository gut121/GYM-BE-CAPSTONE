const sequelize = require('../config/database');
const User = require('./User');
const ClientDetails = require('./ClientDetails');
const TrainerDetails = require('./TrainerDetails');

User.hasOne(ClientDetails, { foreignKey: 'user_id', onDelete: 'CASCADE' });
ClientDetails.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

User.hasOne(TrainerDetails, { foreignKey: 'user_id', onDelete: 'CASCADE' });
TrainerDetails.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = {
    User,
    ClientDetails,
    TrainerDetails,
    sequelize
};

