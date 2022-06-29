const { Schema, model } = require('mongoose')

const MessageSchema = Schema({
  chat:    {
    type: Schema.ObjectId,
    ref: 'Chat'
  },
  user:    {
    type: Schema.ObjectId,
    ref: 'User'
  },
  message: { type: String, required: [true, 'Mandatory message'] },
  date:    { type: String, default: new Date() }
})

MessageSchema.methods.toJSON = function() {
  const { __v, _id: id, ...message } = this.toObject()
  return { ...message, id }
}

module.exports = model('Message', MessageSchema)