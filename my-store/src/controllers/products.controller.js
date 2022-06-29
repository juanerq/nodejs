import Services from '../services/Services.js'
import * as response from '../response/response.js'
import to from '../utils/to.js'
import { modelList } from '../models/index.js'
const services = new Services()

export const listProducts = async (req, res, next) => {
  const id = req.params?.id
  const { limit, from } = req.query

  const [error, result] = await to(
    !id
      ? services.find(modelList.product, { limit, from })
      : services.findOne(modelList.product, id)
  )

  if (error) return next(error)

  response.success(res, result.length, result)
}

export const createProduct = async (req, res, next) => {
  const { name, price, image } = req.body

  const newProduct = {
    name,
    price,
    image
  }

  const [error, result] = await to(services.create(modelList.product, newProduct))
  if (error) return next(error)

  response.success(res, 'Product created', result)
}

export const updateProduct = async (req, res, next) => {
  const id = req.params.id

  const [error, result] = await to(services.update(modelList.product, id, req.body))
  if (error) return next(error)

  response.success(res, 'Product updated', result)
}

export const deleteProduct = async (req, res, next) => {
  const id = req.params.id

  const [error, result] = await to(services.delete(modelList.product, id))
  if (error) return next(error)

  response.success(res, 'Removed product', result)
}
