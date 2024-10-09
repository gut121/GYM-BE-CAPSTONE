const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserMedia = sequelize.define(
    'UserMedia',
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        media_url: {
            type: DataTypes.STRING(255),
        },
        media_type: {
            type: DataTypes.ENUM('image', 'video'),
            allowNull: false,
        },
        ai_assessment: {
            type: DataTypes.JSON,
        },
    },
    {
        timestamps: true,
        tableName: 'UserMedia',
    }
);

module.exports = UserMedia;
