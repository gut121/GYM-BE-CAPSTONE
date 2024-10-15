const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WeeklySchedules = sequelize.define(
    'WeeklySchedules',
    {
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        trainer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,  
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,  
        },
        workout_plan_id: {
            type: DataTypes.INTEGER,
            allowNull: true, 
        },
        meal_plan_id: {
            type: DataTypes.INTEGER,
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
        tableName: 'WeeklySchedules',
    }
);

module.exports = WeeklySchedules;
