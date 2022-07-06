import express from 'express'
import cors from 'cors'
import { logErrors, boomErrorHandler, errorHandler, ormErrorHandler, error404 } from '../middlewares/error.handler.js'

import categoriesRouter from '../routes/categories.routes.js'
import productsRouter from '../routes/products.routes.js'
import usersRouter from '../routes/users.routes.js'
import customersRouter from '../routes/customers.routes.js'
import rolesRouter from '../routes/roles.routes.js'
import ordersRouter from '../routes/orders.routes.js'

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT

    this.ports = {
      categories: '/categories',
      customers: '/customers',
      products: '/products',
      roles: '/roles',
      users: '/users',
      orders: '/orders'
    }

    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.app.use(express.json(), cors())
  }

  routes () {
    this.app.use('/static', express.static('src/public'))

    this.app.use(`/api${this.ports.categories}`, categoriesRouter)
    this.app.use(`/api${this.ports.customers}`, customersRouter)
    this.app.use(`/api${this.ports.products}`, productsRouter)
    this.app.use(`/api${this.ports.roles}`, rolesRouter)
    this.app.use(`/api${this.ports.users}`, usersRouter)
    this.app.use(`/api${this.ports.orders}`, ordersRouter)

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
