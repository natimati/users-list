const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, { dialect: 'mysql' });

module.exports = sequelize;
