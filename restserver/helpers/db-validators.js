const Role = require('../models/role')
const User = require('../models/users') 

const isRoleValid = async (role = '') => {
  const roleExists = await Role.findOne({ role })
  if( !roleExists ) 
    throw new Error(`The role ${role} not registered in the DB`)
}

const existsEmail = async (email = '') => {
  const emailExists = await User.findOne({ email })
  if( emailExists )
    throw new Error(`The email ${email}, is already registered`)
}

const existsUserById = async (id = '') => {
  const existsUser = await User.findById(id)
  if( !existsUser ) 
    throw new Error(`Id not found ${id}`)
}

module.exports = {
  isRoleValid,
  existsEmail,
  existsUserById
}