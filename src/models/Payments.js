const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payments = sequelize.define( 'Payments', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
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
            allowNull: false,
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
        tableName: 'Payments',
    }
);

module.exports = Payments;
