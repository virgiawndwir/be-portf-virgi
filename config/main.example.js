const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'db_name', // db name
  'root', // username
  'default_password', // password
{
  host: 'localhost', // host
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'local', // Used local timezone
  },
  timezone: '+07:00' // Set by local timezone
})

module.exports = sequelize;