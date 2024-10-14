const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ClientDetails = sequelize.define( "ClientDetails",{
    client_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    media_type: {
      type: DataTypes.ENUM("image", "video"),
      allowNull: true,
    },
    physical_condition: {
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
    tableName: "ClientDetails",
  }
);

module.exports = ClientDetails;
