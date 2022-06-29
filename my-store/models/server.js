const express = require('express')
const cors = require('cors')
const { logErrors, boomErrorHandler, errorHandler, ormErrorHandler, error404 } = require('../middlewares/error.handler.js')

const productsRouter = require('../routes/products.routes.js')
const usersRouter = require('../routes/users.routes.js')
const rolesRouter = require('../routes/roles.routes.js')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT

    this.ports = {
      products: '/products',
      users: '/users',
      roles: '/roles'
    }

    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.app.use(express.json(), cors())
  }

  routes () {
    this.app.use('/static', express.static('public'))

    this.app.use(`/api${this.ports.products}`, productsRouter)
    this.app.use(`/api${this.ports.users}`, usersRouter)
    this.app.use(`/api${this.ports.roles}`, rolesRouter)

    this.app.use(logErrors)
    this.app.use(boomErrorHandler)
    this.app.use(ormErrorHandler)
    this.app.use(errorHandler)
    this.app.use(error404)
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}

module.exports = Server
