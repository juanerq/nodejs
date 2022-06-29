const Message = require('../../models/message')

const addMessage = async (message) => {
  const myMessage = await new Message(message)
  myMessage.save()
}

const getMessages = (user) => {
  let query

  if (user !== null) {
    const regex = new RegExp( user, 'i' )
    query = { user: regex }
  }

  return Message.find(query).populate('user', {
    __v: 0
  })
}

const updateMessage = async (id, message) => {
  try {
    const foundMessage = await Message.findById(id)

    foundMessage.message = message
    foundMessage.save()
  
    return foundMessage

  } catch (error) {
    console.error(error)
    throw new Error(`This id [${id}] does not exist`)
  }
}

const deleteMessage = async (id) => {
  return Message.findByIdAndRemove(id)

}

module.exports = {
  add: addMessage,
  list: getMessages,
  updateMessage,
  delete: deleteMessage
}