import Services from '../services/Services.js'
import to from '../helpers/to.js'
import * as response from '../response/response.js'
import { modelList } from '../models/index.js'
const services = new Services()

export const listCustomers = async (req, res, next) => {
  const id = req.params?.id
  const { limit, from } = req.query

  const [error, result] = await to(
    !id
      ? services.find(modelList.customer, { limit, from }, false)
      : services.findOne(modelList.customer, id)
  )
  if (error) return next(error)

  response.success(res, result.length, result)
}

export const createCustomer = async (req, res, next) => {
  const { userId, ...data } = req.body

  try {
    const user = await services.create(modelList.user, userId)
    const customer = await services.create(modelList.customer, {
      ...data,
      userId: user.id
    })

    response.success(res, 'Customer and User created', { customer, user })
  } catch (error) {
    return next(error)
  }
}

export const updateCustomer = async (req, res, next) => {
  const customerId = req.params.id
  const { id, ...data } = req.body

  const [error, result] = await to(
    services.update(modelList.customer, customerId, data)
  )
  if (error) return next(error)

  response.success(res, 'Customer updated', result)
}
