import ProductsServices from '../services/products.services.js'
import * as response from '../response/response.js'
const service = new ProductsServices()

export const listProducts = (req, res) => {
  const id = req.params?.id
  const { limit, from } = req.query

  const result = !id
    ? service.find({ limit, from })
    : service.findOne(id) ?? []

  response.success(res, result.length, result)
}

export const createProduct = (req, res, next) => {
  const { name = 'Not name', price = 0, image = 'Not image', isBlock = false } = req.body

  if (Object.keys(req.body).length === 0) {
    return next(new Error('Missing product information'))
  }

  const newProduct = {
    name,
    price,
    image,
    isBlock
  }

  const product = service.create(newProduct)

  response.success(res, 'Product created', product)
}

export const updateProduct = (req, res, next) => {
  const id = req.params.id
  if (!id) return next(new Error('Missing product id'))

  if (Object.keys(req.body).length === 0) {
    return next(new Error('Missing product information'))
  }

  try {
    const product = service.update(id, req.body)
    response.success(res, 'Edited product', product)
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = (req, res, next) => {
  const id = req.params.id
  if (!id) return next(new Error('Missing product id'))

  const result = service.delete(id)
  response.success(res, 'Removed product', result)
}
