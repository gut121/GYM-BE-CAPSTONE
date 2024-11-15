const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ClientDetails = sequelize.define(
  'ClientDetails',
  {
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    fitness_goal: {
      type: DataTypes.ENUM(
        'Lose Weight',
        'Build Muscle',
        'Increase Endurance',
        'Improve Overall Health',
        'Improve Flexibility',
        'Rehabilitation',
        'Sports Performance',
        'Stress Relief',
        'Weight Maintenance',
        'Post-Pregnancy Fitness',
        'Pre-Wedding Fitness',
        'Body Toning',
        'Senior Fitness',
        'Boost Energy Levels'
      ),
      allowNull: true,
    },
    desired_time_to_achieve: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    current_fitness_level: {
      type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'), 
      allowNull: true,
    },
    weekly_training_days: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    session_duration: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    media_url: {
      type: DataTypes.ENUM('image', 'video'),
      allowNull: true,
    },
    physical_condition: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    tableName: 'ClientDetails',
  }
);

module.exports = ClientDetails;
