const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ExerciseGuides = sequelize.define(
  'ExerciseGuides',
  {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    muscle_group: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    difficulty_level: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    video_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: 'ExerciseGuides',
  }
);

module.exports = ExerciseGuides;
