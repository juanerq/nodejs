'use strict'

import { RoleSchema, ROLE_TABLE_NAME } from '../../models/role.model.js'
import { UserSchema, USER_TABLE_NAME } from '../../models/user.model.js'

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ROLE_TABLE_NAME, RoleSchema)
    await queryInterface.createTable(USER_TABLE_NAME, UserSchema)
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ROLE_TABLE_NAME)
    await queryInterface.dropTable(USER_TABLE_NAME)
  }
}
