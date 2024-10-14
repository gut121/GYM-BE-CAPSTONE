const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notifications = sequelize.define('Notifications',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        read_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
        tableName: 'Notifications',
    }
);

module.exports = Notifications;
