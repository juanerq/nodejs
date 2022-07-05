'use strict'

import { ORDER_PRODUCT_TABLE_NAME, OrderProductSchema } from '../../models/order-product.model.js'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE_NAME, OrderProductSchema)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE_NAME, OrderProductSchema)
  }
}
