const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SubscriptionPlans = sequelize.define(
  "SubscriptionPlans",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    plan_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    duration_in_months: {
      type: DataTypes.INTEGER,
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
    tableName: "SubscriptionPlans",
  }
);

module.exports = SubscriptionPlans;
