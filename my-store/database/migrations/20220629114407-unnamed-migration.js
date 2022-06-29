'use strict'

const { UserSchema, USER_TABLE_NAME } = require('../../models/user.model.js')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE_NAME, UserSchema)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.drop(USER_TABLE_NAME)
  }
}
