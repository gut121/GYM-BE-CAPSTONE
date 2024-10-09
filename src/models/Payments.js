const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payments = sequelize.define(
    'Payments',
    {
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        trainer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
        },
    },
    {
        timestamps: true,
        tableName: 'Payments',
    }
);

module.exports = Payments;
