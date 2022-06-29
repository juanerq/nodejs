const Services = require('../services/Services.js')
const response = require('../response/response.js')
const to = require('../utils/to.js')
const { modelList } = require('../models')
const services = new Services()

const listUsers = async (req, res, next) => {
  const id = req.params?.id
  const { limit, from } = req.query

  const [error, result] = await to(
    !id
      ? services.find(modelList.user, { limit, from })
      : services.findOne(modelList.user, id)
  )
  if (error) return next(error)

  response.success(res, result.length, result)
}

const createUser = async (req, res, next) => {
  const { name, email, password, image, roleId } = req.body

  const newUser = {
    name,
    email,
    password,
    image,
    roleId
  }

  const [error, result] = await to(services.create(modelList.user, newUser))
  if (error) return next(error)

  response.success(res, 'User created', result)
}

const updateUser = async (req, res, next) => {
  const userId = req.params.id
  const { id, ...data } = req.body

  const [error, result] = await to(
    services.update(modelList.user, userId, data)
  )
  if (error) return next(error)

  response.success(res, 'User updated', result)
}

const deleteUser = async (req, res, next) => {
  const userId = req.params.id

  const [error, result] = await to(
    services.delete(modelList.user, userId)
  )
  if (error) return next(error)

  response.success(res, 'Removed user', result)
}

module.exports = {
  listUsers,
  createUser,
  updateUser,
  deleteUser
}
