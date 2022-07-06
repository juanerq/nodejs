import Services from '../services/Services.js'
import to from '../helpers/to.js'
import * as response from '../response/response.js'
import { modelList } from '../models/index.js'
const services = new Services()

export const listUsers = async (req, res, next) => {
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

export const createUser = async (req, res, next) => {
  const newUser = req.body

  const [error, result] = await to(services.create(modelList.user, newUser))
  if (error) return next(error)

  response.success(res, 'User created', result)
}

export const updateUser = async (req, res, next) => {
  const userId = req.params.id
  const { id, ...data } = req.body

  const [error, result] = await to(
    services.update(modelList.user, userId, data)
  )
  if (error) return next(error)

  response.success(res, 'User updated', result)
}

export const deleteUser = async (req, res, next) => {
  const userId = req.params.id

  const [error, result] = await to(
    services.delete(modelList.user, userId)
  )
  if (error) return next(error)

  response.success(res, 'Removed user', result)
}
