import boom from '@hapi/boom'
import sequelize from '../database/sequelize.js'
const models = sequelize.models

export const isRoleValid = async (req, res, next) => {
  const role = req.body.roleId ?? req.body.userId.roleId
  if (!role) return next()
  const roleName = role.toUpperCase()

  const roleExists = await models.Role.findAll()
  const roles = {}

  roleExists.forEach(({ dataValues }) => {
    const roleName = dataValues.name.toUpperCase()
    roles[roleName] = dataValues.id
  })

  if (!roles?.[roleName]) {
    next(boom.notFound(`Role not found. Available: ${Object.keys(roles)}`))
    return
  }

  req.body.role
    ? req.body.roleId = roles[roleName]
    : req.body.userId.roleId = roles[roleName]

  next()
}

export const userExists = async (req, res, next) => {
  const { userId } = req.body
  if (!userId) return next()

  const user = await models.User.findByPk(userId)
  if (!user) return next(boom.notFound('User not found'))

  next()
}

export const categoryExists = async (req, res, next) => {
  const { categoryId } = req.body
  if (!categoryId) return next()

  const category = await models.Category.findByPk(categoryId)
  if (!category) return next(boom.notFound('Category not found'))

  next()
}

export const customerExists = async (req, res, next) => {
  const { customerId } = req.body
  if (!customerId) return next()

  const customer = await models.Customer.findByPk(customerId)
  if (!customer) return next(boom.notFound('Customer not found'))

  next()
}

export const productExists = async (req, res, next) => {
  const { productId } = req.body
  console.log({ productId })
  if (!productId) return next()

  const product = await models.Product.findByPk(productId)
  if (!product) return next(boom.notFound('Product not found'))

  next()
}

export const orderExists = async (req, res, next) => {
  const orderId = req.body.orderId ?? req.params.id
  console.log({ orderId })
  if (!orderId) return next()

  const order = await models.Order.findByPk(orderId)
  if (!order) return next(boom.notFound('Order not found'))

  next()
}
