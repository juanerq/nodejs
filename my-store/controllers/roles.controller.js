import Services from '../services/Services.js'
import * as response from '../response/response.js'
import to from '../utils/to.js'
import { modelList } from '../models/index.js'
const services = new Services()

export const listRoles = async (req, res, next) => {
  const id = req.params?.id

  const [error, result] = await to(
    !id
      ? services.find(modelList.role)
      : services.findOne(modelList.role, id)
  )
  if (error) return next(error)

  response.success(res, result.length, result)
}

export const createRole = async (req, res, next) => {
  const { name } = req.body
  if (!name) return next(new Error('Name is required'))

  const newRole = {
    name
  }

  const [error, result] = await to(services.create(modelList.role, newRole))
  if (error) return next(error)

  response.success(res, 'Role created', result)
}

export const deleteRole = async (req, res, next) => {
  const id = req.params.id

  const [error, result] = await to(services.delete(modelList.role, id))
  if (error) return next(error)

  response.success(res, 'Removed role', result)
}
