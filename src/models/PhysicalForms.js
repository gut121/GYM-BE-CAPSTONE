const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PhysicalForms = sequelize.define(
    'PhysicalForms',
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        form_data: {
            type: DataTypes.JSON,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        tableName: 'PhysicalForms',
    }
);

module.exports = PhysicalForms;
