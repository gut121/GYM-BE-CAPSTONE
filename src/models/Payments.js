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
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM(
        'Credit Card',
        'PayPal',
        'Bank Transfer',
        'Cash',
        'Other'
      ),
      allowNull: false,
    },
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
