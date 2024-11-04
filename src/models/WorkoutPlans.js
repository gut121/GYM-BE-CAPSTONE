const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WorkoutPlans = sequelize.define(
  'WorkoutPlans',
  {
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trainer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    week_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    summary_generated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: 'WorkoutPlans',
  }
);

module.exports = WorkoutPlans;
