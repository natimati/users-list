const { DataTypes } = require('sequelize');
const sequelize = require('../services/db');

const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    registration_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    last_login_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }, 
    is_blocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    id: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
},{ timestamps: false });

module.exports = User;