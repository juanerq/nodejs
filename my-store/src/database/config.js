import config from '../config/config.js'

module.exports = {
  development: {
    url: config.dbUrl,
    dialect: 'mysql'
  },
  production: {
    url: config.dbUrl,
    dialect: 'mysql'
  }
}
