import Services from '../services/Services.js'
import to from '../helpers/to.js'
import { modelList } from '../models/index.js'
import * as response from '../response/response.js'
const services = new Services()

export const listOrders = async (req, res, next) => {
  const id = req.params?.id
  const { limit, from } = req.query

  const [error, result] = await to(
    !id
      ? services.find(modelList.order, { limit, from }, false)
      : services.findOne(modelList.order, id)
  )
  if (error) return next(error)

  response.success(res, result.length, result)
}

export const createOrder = async (req, res, next) => {
  const data = req.body
  const [error, result] = await to(services.create(modelList.order, data))
  if (error) return next(error)

  response.success(res, 'Order created', result)
}

export const addProductToOrder = async (req, res, next) => {
  console.log('addProductToOrder')
  const orderId = req.params.id
  const data = req.body
  console.log(data)
  const [error, result] = await to(services.create(modelList.orderProduct, { ...data, orderId }))
  if (error) return next(error)

  response.success(res, 'Added product', result)
}

export const updateOrder = async (req, res, next) => {
  const id = req.params.id
  const data = req.body

  const [error, result] = await to(services.update(modelList.order, id, data))
  if (error) return next(error)

  response.success(res, 'Order updated', result)
}

export const deleteOrder = async (req, res, next) => {
  const id = req.params.id

  const [error, result] = await to(services.delete(modelList.order, id))
  if (error) return next(error)

  response.success(res, 'Order deleted', result)
}
