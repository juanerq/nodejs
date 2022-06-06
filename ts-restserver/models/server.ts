import express, { Application } from 'express'
import cors from 'cors'

import getUsers from '../routes/user.routes'
import db from '../db/connection'

class Server {

  private app: Application
  private port: string
  private apiPaths = {
    users: '/api/users'
  }

  constructor() {
    this.app = express()
    this.port = process.env.PORT || '8080'

    this.dbConnection()
    this.middlewares()
    this.routes()
  }

  async dbConnection() {
    try {
      
      await db.authenticate()
      console.log('Database online')

    } catch (error) {
      console.error(error)
      return error
    }
  }

  middlewares() {
    this.app.use( express.json(), cors() )

    this.app.use( express.static('public') )
  }

  routes() {
    this.app.use(this.apiPaths.users, getUsers)
  }
  
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
      
    })
  }

}

export default Server