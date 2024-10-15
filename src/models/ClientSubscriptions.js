const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ClientSubscriptions = sequelize.define( 'ClientSubscriptions',{
        client_id: {
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
            allowNull: false,
            defaultValue: 'active',
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
        tableName: 'ClientSubscriptions',
    }
);

module.exports = ClientSubscriptions;
