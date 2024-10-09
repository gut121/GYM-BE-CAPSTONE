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
        session_date: {
            type: DataTypes.DATE,
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
            defaultValue: 'pending',
        },
    },
    {
        timestamps: true,
        tableName: 'Sessions',
    }
);

module.exports = Sessions;
