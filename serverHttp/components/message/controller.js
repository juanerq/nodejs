const store = require('./store')
const isMongoID = require('../../helpers/isMongoID')

const addMessage = async (messageData) => {
  const { chat, user, message } = messageData

  if (!user || !message || !isMongoID(chat) || !isMongoID(user)) {
    throw new Error('Invalid data')
  }

  const fullMessage = {
    chat,
    user,
    message,
    date: new Date()
  }

  store.add(fullMessage)

  return fullMessage
}

const getMessages = async (user) => {
  return store.list(user)
}

const updateMessage = async (id, message) => {
   if (!id || !message || !isMongoID(id)) {
    throw new Error('Id or Message not found')
  }
  
  const result = await store.updateMessage(id, message)

  return result
}

const deleteMessage = async (id) => {
  if (!id || !isMongoID(id)) {
    throw new Error('Id not found')
  }

  try {
    await store.delete(id)
    return 'Deleted message'

  } catch (error) {
    throw new Error('Could not delete this message')
  }
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage
}