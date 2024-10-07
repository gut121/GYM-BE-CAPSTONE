// models/ClientDetails.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ClientDetails = sequelize.define(
    'ClientDetails',
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        height: {
            type: DataTypes.FLOAT,
        },
        weight: {
            type: DataTypes.FLOAT,
        },
        body_image_url: {
            type: DataTypes.STRING(255),
        },
        physical_condition: {
            type: DataTypes.TEXT,
        },
    },
    {
        timestamps: true,
        tableName: 'ClientDetails',
    }
);

module.exports = ClientDetails;
