const Services = require('../services/Services.js')
const response = require('../response/response.js')
const to = require('../utils/to.js')
const { modelList } = require('../models/index.js')
const services = new Services()

const listRoles = async (req, res, next) => {
  const id = req.params?.id

  const [error, result] = await to(
    !id
      ? services.find(modelList.role)
      : services.findOne(modelList.role, id)
  )
  if (error) return next(error)

  response.success(res, result.length, result)
}

const createRole = async (req, res, next) => {
  const { name } = req.body
  if (!name) return next(new Error('Name is required'))

  const newRole = {
    name
  }

  const [error, result] = await to(services.create(modelList.role, newRole))
  if (error) return next(error)

  response.success(res, 'Role created', result)
}

const deleteRole = async (req, res, next) => {
  const id = req.params.id

  const [error, result] = await to(services.delete(modelList.role, id))
  if (error) return next(error)

  response.success(res, 'Removed role', result)
}

module.exports = {
  listRoles,
  createRole,
  deleteRole
}
