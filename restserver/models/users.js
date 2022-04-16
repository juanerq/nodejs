const { Schema, model } = require('mongoose')

const UserSchema = Schema({

  name: { type: String, required: [true, 'Mandatory name'] },
  email: { type: String, required: [true, 'Mandatory email'], unique: true },
  password: { type: String, required: [true, 'Mandatory password'] },
  img: { type: String },
  role: { type: String, required: true, emun: ['ADMIN_ROLE', 'USER_ROLE'] },
  status: { type: Boolean, default: true },
  google: { type: Boolean, default: false }

})

UserSchema.methods.toJSON = function() {
  const { __v, password, _id: uid, ...user } = this.toObject()
  return { ...user, uid }
}

module.exports = model('User', UserSchema)