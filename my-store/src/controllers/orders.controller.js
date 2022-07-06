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

export const listOrderProducts = async (req, res, next) => {
  const query = {
    orderId: req.params.id,
    productId: req.params?.itemId,
    ...req.query
  }

  if (!req.params?.itemId) delete query.productId

  const [error, result] = await to(services.findOneWhere(modelList.orderProduct, query, true))
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
  const orderId = req.params.id
  const data = req.body

  const [error, result] = await to(services.create(modelList.orderProduct, { ...data, orderId }))
  if (error) return next(error)

  response.success(res, 'Added item', result)
}

export const updateOrder = async (req, res, next) => {
  const id = req.params.id
  const data = req.body

  const [error, result] = await to(services.update(modelList.order, id, data))
  if (error) return next(error)

  response.success(res, 'Order updated', result)
}

export const updateProductFromOrder = async (req, res, next) => {
  const query = {
    orderId: req.params.id,
    productId: req.params.itemId
  }
  const data = req.body
  const [error, result] = await to(services.updateWhere(modelList.orderProduct, query, data))
  if (error) return next(error)

  response.success(res, 'Item updated', result)
}

export const deleteOrder = async (req, res, next) => {
  const id = req.params.id

  const [error, result] = await to(services.delete(modelList.order, id))
  if (error) return next(error)

  response.success(res, 'Order deleted', result)
}

export const deleteProductFromOrder = async (req, res, next) => {
  const orderId = req.params.id
  const productId = req.params.itemId

  const [error, result] = await to(services.deleteWhere(modelList.orderProduct, { orderId, productId }))
  if (error) return next(error)

  response.success(res, 'Product deleted', result)
}
