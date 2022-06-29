import express from 'express'
import cors from 'cors'
import { logErrors, boomErrorHandler, errorHandler, ormErrorHandler, error404 } from '../middlewares/error.handler.js'

import productsRouter from '../routes/products.routes.js'
import usersRouter from '../routes/users.routes.js'
import rolesRouter from '../routes/roles.routes.js'

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

export default Server
