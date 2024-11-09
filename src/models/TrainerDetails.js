const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TrainerDetails = sequelize.define(
  'TrainerDetails',
  {
    specialties: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    available_slots: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    certification_url: {
      type: DataTypes.STRING(255), 
      allowNull: true,
    },
    years_of_experience: {
      type: DataTypes.INTEGER, 
      allowNull: true,
      },
    trainer_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    tableName: 'TrainerDetails',
  }
);

module.exports = TrainerDetails;
