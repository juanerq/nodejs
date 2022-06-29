const User = require('../../models/user')

const getUsers = (user) => {
  let query
  if (user !== null) {
    const regex = new RegExp( user, 'i' )
    query = { user: regex }
  }

  return User.find(query)
}

const addUser = async (name) => {
  const user = await new User(name)
  user.save()
  return user
}

module.exports = {
  add: addUser,
  list: getUsers
}