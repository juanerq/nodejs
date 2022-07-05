import { Product, ProductSchema } from './product.model.js'
import { Category, CategorySchema } from './category.model.js'
import { User, UserSchema } from './user.model.js'
import { Customer, CustomerSchema } from './customer.model.js'
import { Role, RoleSchema } from './role.model.js'
import { Order, OrderSchema } from './order.model.js'
import { OrderProduct, OrderProductSchema } from './order-product.model.js'

const setupModels = async (sequelize) => {
  Role.init(RoleSchema, Role.config(sequelize))
  User.init(UserSchema, User.config(sequelize))
  Customer.init(CustomerSchema, Customer.config(sequelize))
  Product.init(ProductSchema, Product.config(sequelize))
  Category.init(CategorySchema, Category.config(sequelize))
  Order.init(OrderSchema, Order.config(sequelize))
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize))

  User.associate(sequelize.models)
  Customer.associate(sequelize.models)
  Category.associate(sequelize.models)
  Product.associate(sequelize.models)
  Order.associate(sequelize.models)
}

export const modelList = {
  product: Product.modelName,
  category: Category.modelName,
  user: User.modelName,
  customer: Customer.modelName,
  role: Role.modelName,
  order: Order.modelName,
  orderProduct: OrderProduct.modelName
}

export default setupModels
