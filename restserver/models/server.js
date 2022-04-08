const express = require('express')
const cors = require('cors')

const router = require('../routes/users.routes')

const { dbConnection } = require('../database/config')
const handleErrors = require('../middlewares/handle-erros')

class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.usersPath = '/api/users'

    // Connect database
    this.connectDB()

    // Middlewares
    this.middlewares()

    // Routes of my application
    this.routes()
  }

  async connectDB() {
    await dbConnection()
  }

  middlewares() {
    // CORS
    this.app.use(cors())
    // Lectura y parseo de body
    this.app.use(express.json())
    // Public directory
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.usersPath, router)

    // this.app.use((req, res) => res.status(404).end())
    this.app.use( handleErrors )
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    })
  }
}

module.exports = Server
