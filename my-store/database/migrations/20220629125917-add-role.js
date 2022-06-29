'use strict'

const { UserSchema, USER_TABLE_NAME } = require('../../models/user.model')

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(USER_TABLE_NAME, 'role_id', UserSchema.roleId)
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE_NAME, 'role_id')
  }
}
