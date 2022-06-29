const { ObjectId } = require('mongoose').Types

const isMongoID = (id) => {
  return ObjectId.isValid(id)
}

module.exports = isMongoID