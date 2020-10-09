const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'classicmodels.sqlite'
  });

  module.exports = sequelize;