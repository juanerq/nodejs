const express = require('express')
const cors = require('cors')

const authRouter = require('../routes/auth.routes')
const categoriesRouter = require('../routes/categories.routes')
const userRouter = require('../routes/users.routes')

const { dbConnection } = require('../database/config')
const handleErrors = require('../middlewares/handle-erros')
const notFound = require('../middlewares/notFound')

class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT

    this.paths = {
      auth:       '/api/auth',
      categories: '/api/categories',
      users:      '/api/users'
    }

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
    this.app.use(this.paths.auth, authRouter)
    this.app.use(this.paths.categories, categoriesRouter)
    this.app.use(this.paths.users, userRouter)

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
