import { Model, DataTypes, Sequelize } from 'sequelize'
import { ORDER_TABLE_NAME } from './order.model.js'
import { PRODUCT_TABLE_NAME } from './product.model.js'

export const ORDER_PRODUCT_TABLE_NAME = 'orders_products'

export const OrderProductSchema = {
  id: {
    type: DataTypes.INTEGER,
    field: 'order_product_id',
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: DataTypes.INTEGER,
    field: 'order_id',
    allowNull: false,
    references: {
      model: ORDER_TABLE_NAME,
      key: 'order_id'
    },
    onUpdate: 'CASCADE'
  },
  productId: {
    type: DataTypes.INTEGER,
    field: 'product_id',
    allowNull: false,
    references: {
      model: PRODUCT_TABLE_NAME,
      key: 'product_id'
    },
    onUpdate: 'CASCADE'
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  }
}

export class OrderProduct extends Model {
  static modelName = 'OrderProduct'
  static namesAssociations = []

  static associate (models) {

  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE_NAME,
      modelName: this.modelName,
      timestamps: false
    }
  }
}
