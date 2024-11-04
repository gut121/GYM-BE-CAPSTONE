const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MealPlans = sequelize.define(
  'MealPlans',
  {
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trainer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    week_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day_of_week: {
      type: DataTypes.ENUM(
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ),
      allowNull: false,
    },
    meal_type: {
      type: DataTypes.ENUM('Breakfast', 'Lunch', 'Dinner', 'Snack'),
      allowNull: false,
    },
    meal_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    protein: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    carbs: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chef_notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    tableName: 'MealPlans',
  }
);

module.exports = MealPlans;
