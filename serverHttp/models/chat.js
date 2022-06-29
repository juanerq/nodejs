const { Schema, model } = require('mongoose')

const ChatSchema = Schema({
  users: [{
    type: Schema.ObjectId,
    ref: 'User',
  }],
  description: String
})

ChatSchema.methods.toJSON = function() {
  const { __v, _id: id, ...chat } = this.toObject()
  return { ...chat, id }
}

module.exports = model('Chat', ChatSchema)