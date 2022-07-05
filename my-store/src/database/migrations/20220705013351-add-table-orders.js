'use strict'

import { ORDER_TABLE_NAME, OrderSchema } from '../../models/order.model.js'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ORDER_TABLE_NAME, OrderSchema)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_TABLE_NAME, OrderSchema)
  }
}
