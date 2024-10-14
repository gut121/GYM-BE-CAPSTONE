const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TrainerAssignments = sequelize.define(
  "TrainerAssignments",
  {
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
    assigned_at: {
      type: DataTypes.DATE,
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
    tableName: "TrainerAssignments",
  }
);

module.exports = TrainerAssignments;
