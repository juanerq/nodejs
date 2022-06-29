const { Sequelize } = require('sequelize')
const setupModels = require('../models/index.js')
const config = require('../config/config.js')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}/${config.dbName}`

const sequelize = new Sequelize(URI, {
  dialect: 'mysql',
  logging: false
})

;(async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error(error)
  }
})()

setupModels(sequelize)

module.exports = sequelize
