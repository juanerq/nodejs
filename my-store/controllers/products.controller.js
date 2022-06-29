const Services = require('../services/Services.js')
const response = require('../response/response.js')
const to = require('../utils/to.js')
const { modelList } = require('../models/index.js')
const services = new Services()

const listProducts = async (req, res, next) => {
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

const createProduct = async (req, res, next) => {
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

const updateProduct = async (req, res, next) => {
  const id = req.params.id

  const [error, result] = await to(services.update(modelList.product, id, req.body))
  if (error) return next(error)

  response.success(res, 'Product updated', result)
}

const deleteProduct = async (req, res, next) => {
  const id = req.params.id

  const [error, result] = await to(services.delete(modelList.product, id))
  if (error) return next(error)

  response.success(res, 'Removed product', result)
}

module.exports = {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct
}
