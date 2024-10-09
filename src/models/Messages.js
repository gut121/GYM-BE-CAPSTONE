const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Messages = sequelize.define(
    'Messages',
    {
        sender_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiver_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
        },
    },
    {
        timestamps: true,
        tableName: 'Messages',
    }
);

module.exports = Messages;
