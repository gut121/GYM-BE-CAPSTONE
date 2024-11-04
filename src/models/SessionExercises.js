const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SessionExercises = sequelize.define(
  'SessionExercises',
  {
    session_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exercise_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: 'SessionExercises',
  }
);

module.exports = SessionExercises;
