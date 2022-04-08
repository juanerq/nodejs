const bcryptjs = require('bcryptjs')

const bcrypt = (password) => {
  const salt = bcryptjs.genSaltSync()
  return bcryptjs.hashSync( password, salt )
}

module.exports = bcrypt