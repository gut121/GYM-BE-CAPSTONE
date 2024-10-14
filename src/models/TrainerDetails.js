const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TrainerDetails = sequelize.define(
  "TrainerDetails",
  {
    trainer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    specialties: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    available_slots: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    tableName: "TrainerDetails",
  }
);

module.exports = TrainerDetails;
