'use strict'

import { CUSTOMER_TABLE_NAME, CustomerSchema } from '../../models/customer.model.js'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CUSTOMER_TABLE_NAME, CustomerSchema)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CUSTOMER_TABLE_NAME, CustomerSchema)
  }
}
