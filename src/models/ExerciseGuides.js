const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ExerciseGuides = sequelize.define('ExerciseGuides', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true, 
        },
        muscle_group: {
            type: DataTypes.STRING(255),
            allowNull: true,  
        },
        difficulty_level: {
            type: DataTypes.STRING(50),
            allowNull: true, 
        },
        video_url: {
            type: DataTypes.STRING(255),
            allowNull: true, 
        },
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: true,  
        },
        admin_id: {
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
        tableName: 'ExerciseGuides',
    }
);

module.exports = ExerciseGuides;
