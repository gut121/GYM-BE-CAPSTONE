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
