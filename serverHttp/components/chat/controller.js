const store = require('./store')
const isMongoID = require('../../helpers/isMongoID')

const addChat = (chat) => {
  const { users, description = '' } = chat ?? {}

  if (!users || !Array.isArray(users) || users.length === 0) {
    throw new Error('Invalid users')
  }

  const chatData = {
    users,
    description
  }

  return store.add(chatData)
}

const listChats = (userId) => {
  if (userId && !isMongoID(userId)) {
    throw new Error('Invalid user id')
  }

  return store.list(userId)
}

module.exports = {
  addChat,
  listChats
}