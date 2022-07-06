'use strict'
import { DataTypes } from 'sequelize'

import { ROLE_TABLE_NAME, RoleSchema } from '../../models/role.model.js'
import { USER_TABLE_NAME, UserSchema } from '../../models/user.model.js'
import { CUSTOMER_TABLE_NAME, CustomerSchema } from '../../models/customer.model.js'
import { CATEGORY_TABLE_NAME, CategorySchema } from '../../models/category.model.js'
import { PRODUCT_TABLE_NAME, ProductSchema } from '../../models/product.model.js'
import { ORDER_TABLE_NAME, OrderSchema } from '../../models/order.model.js'
import { ORDER_PRODUCT_TABLE_NAME, OrderProductSchema } from '../../models/order-product.model.js'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ROLE_TABLE_NAME, RoleSchema)
    await queryInterface.createTable(USER_TABLE_NAME, UserSchema)
    await queryInterface.createTable(CUSTOMER_TABLE_NAME, CustomerSchema)
    await queryInterface.createTable(CATEGORY_TABLE_NAME, CategorySchema)
    await queryInterface.createTable(PRODUCT_TABLE_NAME, ProductSchema)
    await queryInterface.createTable(ORDER_TABLE_NAME, {
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
      }
    })
    await queryInterface.createTable(ORDER_PRODUCT_TABLE_NAME, OrderProductSchema)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ROLE_TABLE_NAME, RoleSchema)
    await queryInterface.dropTable(USER_TABLE_NAME, UserSchema)
    await queryInterface.dropTable(CUSTOMER_TABLE_NAME, CustomerSchema)
    await queryInterface.dropTable(CATEGORY_TABLE_NAME, CategorySchema)
    await queryInterface.dropTable(PRODUCT_TABLE_NAME, ProductSchema)
    await queryInterface.dropTable(ORDER_TABLE_NAME, OrderSchema)
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE_NAME, OrderProductSchema)
  }
}
