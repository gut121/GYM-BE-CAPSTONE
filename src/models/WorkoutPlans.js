const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WorkoutPlans = sequelize.define(
    'WorkoutPlans',
    {
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        trainer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true, 
        },
        week_plan: {
            type: DataTypes.JSON,  
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
        tableName: 'WorkoutPlans',
    }
);

module.exports = WorkoutPlans;
