import express from 'express'
import cors from 'cors'
import { boomErrorHandler, errorHandler } from '../middlewares/error.handler.js'
import productsRouter from '../routes/products.routes.js'

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT

    this.ports = {
      products: '/products'
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

    this.app.use(boomErrorHandler)
    this.app.use(errorHandler)
    this.app.use((req, res) => res.status(404).end())
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}

export default Server
