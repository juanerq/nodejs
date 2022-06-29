const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: { type: String, required: [true, 'Mandatory user name'] }
})

UserSchema.methods.toJSON = function() {
  const { __v, _id: id, ...user } = this.toObject()
  return { ...user, id }
}

module.exports = model('User', UserSchema)