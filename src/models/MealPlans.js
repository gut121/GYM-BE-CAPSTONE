const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MealPlans = sequelize.define(
    'MealPlans',
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
        },
        week_plan: {
            type: DataTypes.JSON,
        },
    },
    {
        timestamps: true,
        tableName: 'MealPlans',
    }
);

module.exports = MealPlans;
