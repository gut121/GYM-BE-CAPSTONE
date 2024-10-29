const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sessions = sequelize.define(
    'Sessions',
    {
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        trainer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        workout_plan_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        session_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
            defaultValue: 'pending',
        },
        incomplete_reason: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        day_of_week: {
            type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
            allowNull: false,
        },
    },
    {
        timestamps: true,
        tableName: 'Sessions',
    }
);

module.exports = Sessions;
