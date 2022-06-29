const express = require('express')
const response = require('../network/response')

const { dbConnection } = require('../database/config')

const routerMessages = require('../components/message/network')
const routerUsers = require('../components/user/network')
const routerChats = require('../components/chat/network')



class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 8080

    this.paths = {
      messages: '/messages',
      users: '/users',
      chats: '/chats'
    }

    this.connectDB()

    this.middlewares()

    this.routes()
  }

  async connectDB() {
    await dbConnection()
  }

  middlewares() {
    this.app.use(express.json())
  }

  routes() {
    this.app.use(this.paths.messages, routerMessages)
    this.app.use(this.paths.users, routerUsers)
    this.app.use(this.paths.chats, routerChats)


    this.app.use('/html', express.static('public'))

    this.app.use((req, res) => res.status(404).end())
    this.app.use(response.error)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server rinning on port ${this.port}`)
    })
  }
}

module.exports = Server