const mysql = require('mysql')
const config = require('../config/config.js')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}/${config.dbName}`

class ConnectionDB {
  constructor () {
    this.dbClient = mysql
    this.connection = this.setConnection()
  }

  setConnection () {
    return this.dbClient.createConnection(URI)
  }

  getConnection () {
    this.connection.connect((err) => {
      if (err) throw new Error(err)
      console.log('Connected to database')
    })
    return this.connection
  }
}

module.exports = ConnectionDB
