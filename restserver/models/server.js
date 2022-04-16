const express = require('express')
const cors = require('cors')

const userRouter = require('../routes/users.routes')
const authRouter = require('../routes/auth.routes')

const { dbConnection } = require('../database/config')
const handleErrors = require('../middlewares/handle-erros')
const notFound = require('../middlewares/notFound')

class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT

    this.usersPath = '/api/users'
    this.auntPath = '/api/auth'

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
    this.app.use(this.usersPath, userRouter)
    this.app.use(this.auntPath, authRouter)

    this.app.use( notFound )
    this.app.use( handleErrors )
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    })
  }
}

module.exports = Server
