import ProductsServices from '../services/products.services.js'
import * as response from '../response/response.js'
import to from '../utils/to.js'
const service = new ProductsServices()

export const listProducts = async (req, res, next) => {
  const id = req.params?.id
  const { limit, from } = req.query

  const [error, result] = await to(!id
    ? service.find({ limit, from })
    : service.findOne(id))

  if (error) return next(error)

  response.success(res, result.length, result)
}

export const createProduct = async (req, res, next) => {
  const { name, price, image, isBlock } = req.body

  if (Object.keys(req.body).length === 0) {
    return next(new Error('Missing product information'))
  }

  const newProduct = {
    name: name || 'Not name',
    price: price || 0,
    image: image || 'Not image',
    isBlock: isBlock || false
  }

  const [error, result] = await to(service.create(newProduct))
  if (error) return next(error)

  response.success(res, 'Product created', result)
}

export const updateProduct = async (req, res, next) => {
  const id = req.params.id

  if (Object.keys(req.body).length === 0) {
    return next(new Error('Missing product information'))
  }

  const [error, result] = await to(service.update(id, req.body))
  if (error) return next(error)

  response.success(res, 'Edited product', result)
}

export const deleteProduct = async (req, res, next) => {
  const id = req.params.id

  const [error, result] = await to(service.delete(id))
  if (error) return next(error)

  response.success(res, 'Removed product', result)
}
