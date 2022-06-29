const store = require('./store')

const getUsers = (user) => {
  return store.list(user)
}

const addUser = async (name) => {
  if(!name || !isNaN(name)) {
    throw new Error('Invalid name')
  }

  return store.add({ name })
}

module.exports = {
  addUser,
  getUsers
}