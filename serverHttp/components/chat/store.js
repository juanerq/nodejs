const Chat = require('../../models/chat')

const addChats = async (chat) => {
  const myChat = await new Chat(chat)
  return myChat.save()
}

const getChats = (userId) => {
  let filter = {}
  if (userId) {
    filter = { users: userId }
  }

  return Chat.find(filter).populate('users', {
    __v: 0
  })
}

module.exports = {
  add: addChats,
  list: getChats
}