const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ClientSubscriptions = sequelize.define(
    'ClientSubscriptions',
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        subscription_plan_id: {
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
        status: {
            type: DataTypes.STRING(50),
            defaultValue: 'active',
        },
    },
    {
        timestamps: true,
        tableName: 'ClientSubscriptions',
    }
);

module.exports = ClientSubscriptions;
