import { Model, DataTypes, Sequelize } from 'sequelize'
import { CUSTOMER_TABLE_NAME } from './customer.model.js'

export const ORDER_TABLE_NAME = 'orders'

export const OrderSchema = {
  id: {
    type: DataTypes.INTEGER,
    field: 'order_id',
    primaryKey: true,
    autoIncrement: true
  },
  customerId: {
    type: DataTypes.INTEGER,
    field: 'customer_id',
    allowNull: false,
    references: {
      model: CUSTOMER_TABLE_NAME,
      key: 'customer_id'
    },
    onUpdate: 'CASCADE'
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  total: {
    type: DataTypes.VIRTUAL,
    get () {
      if (this.items && this.items.length > 0) {
        return this.items.reduce((total, item) => total + (item.price * item.OrderProduct.quantity), 0)
      }
    }
  }
}

export class Order extends Model {
  static modelName = 'Order'
  static namesAssociations = [
    {
      association: 'customer',
      include: ['user']
    },
    'items'
  ]

  static associate (models) {
    this.belongsTo(models.Customer, { as: 'customer' })
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE_NAME,
      modelName: this.modelName,
      timestamp: false
    }
  }
}
