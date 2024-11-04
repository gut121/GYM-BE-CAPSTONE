const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notifications = sequelize.define(
  'Notifications',
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    read_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    notification_type: {
      type: DataTypes.ENUM('weekly_summary', 'reminder', 'system'),
      allowNull: false,
      defaultValue: 'system',
    },
  },
  {
    timestamps: true,
    tableName: 'Notifications',
  }
);

module.exports = Notifications;
