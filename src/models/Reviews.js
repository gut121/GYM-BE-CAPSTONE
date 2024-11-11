const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reviews = sequelize.define(
  'Reviews',
  {
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trainer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

  },
  {
    timestamps: true,
    tableName: 'Reviews',
  }
);

module.exports = Reviews;
