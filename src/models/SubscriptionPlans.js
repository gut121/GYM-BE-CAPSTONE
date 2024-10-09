const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SubscriptionPlans = sequelize.define(
    'SubscriptionPlans',
    {
        plan_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        duration_in_months: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        tableName: 'SubscriptionPlans',
    }
);

module.exports = SubscriptionPlans;
