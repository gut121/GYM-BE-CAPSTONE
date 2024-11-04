const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
  'User',
  {
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'trainer', 'client'),
      defaultValue: 'client',
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
    },
    bio: {
      type: DataTypes.STRING(100),
    },
    date_of_birth: {
      type: DataTypes.DATE,
    },
    avatar_url: {
      type: DataTypes.STRING(255),
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    last_login: {
      type: DataTypes.DATE,
    },
    reset_password_token: {
      type: DataTypes.STRING(255),
    },
    reset_password_expires_at: {
      type: DataTypes.DATE,
    },
    verification_token: {
      type: DataTypes.STRING(255),
    },
    verification_token_expires_at: {
      type: DataTypes.DATE,
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
    tableName: 'Users',
  }
);

module.exports = User;
