'use strict'

import { PRODUCT_TABLE_NAME, ProductSchema } from '../../models/product.model.js'
import { CATEGORY_TABLE_NAME, CategorySchema } from '../../models/category.model.js'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CATEGORY_TABLE_NAME, CategorySchema)
    await queryInterface.createTable(PRODUCT_TABLE_NAME, ProductSchema)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CATEGORY_TABLE_NAME, CategorySchema)
    await queryInterface.dropTable(PRODUCT_TABLE_NAME, ProductSchema)
  }
}
