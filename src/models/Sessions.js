const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sessions = sequelize.define(
    'Sessions',
    {
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
        },
        trainer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
        },
        session_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
            defaultValue: 'pending',
            incomplete_reason: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            incomplete_reason: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
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
        tableName: 'Sessions',
    }
);

module.exports = Sessions;
